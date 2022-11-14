from flask import send_file
from flask_restx import Resource, Namespace
import qrcode, io
from prototypeserver1.model import db
from prototypeserver1.config import SERVER_PATH

api = Namespace('Order Server', description="주문 처리 관련 서버") 




# custom api model
# param=1-10,2-5,8-3...
# 옵션메뉴아이디 1 인 상품을 10개 주문, 2인상품을 5개주문, 8인상품을 3개 주문...
@api.route('')
class orderCheck(Resource):
  formOrders = api.parser()
  formOrders.add_argument("param", type=str, action="split", location='args', required=True, help="?param=1-10,2-5,8-3... optionMenuID 1 인 상품을 10개 주문, 2 인 상품을 5개주문, 8 인 상품을 3개 주문...")
  @api.expect(formOrders)
  def get(self): 
    '''최종 주문 정보 확인(키오스크 입장)'''
    optionMenus = orderCheck.formOrders.parse_args()["param"]
    
    if not optionMenus or optionMenus[0] == '':
      return "No parameters", 400

    # 여기서부터는 파라미터가 1개 이상임이 보장된다.

    resp = { 
      "storeName" : "", 
      "storeContact" : "",
      "orders" : [
        {
          'menuName' : "",
          'optionMenuName' : "",
          'count' : 0,
          'totalPrice' : 0,
        }
      ]
    }

    # 먼저 첫번째 아이템을 등록하며, 가게이름도 쿼리한다. 이후 아이템이 2개 이상이라면 가게이름 쿼리는 생략하고 반복한다.

    # 1. - 로 구분된 두개의 영역을로 나뉘지 않는다면 에러.(음수가 들어와도 안되기 때문에 괜찮다.)
    if len( optionMenus[0].split('-') ) != 2:
      return "Wrong Params Error", 400

    # 2. 두 영역 중 하나라도 integer로 변환할수 없으면 에러.(Type Validation)
    try:
      optionMenuID, count = map(int, optionMenus[0].split('-') )
    except:
      return "Wrong Parameter Type Error", 400
    
    # 3. 쿼리
    result = db.execute('''
      SELECT id as menu_id, name as menu_name, option_menu_name, price 
      FROM foodservice.menu
      JOIN (SELECT menu_id, c1.option_menu_id, option_menu_name, price 
          FROM foodservice.`menu-option_menu-map` as c1
          JOIN (SELECT id as option_menu_id, name as option_menu_name, price 
              FROM foodservice.option_menu
              WHERE id = :optionMenuID ) as v1
          ON v1.option_menu_id = c1.option_menu_id) as v2	
      ON v2.menu_id = id
      ;
      ''', 
      { 
        'optionMenuID' : optionMenuID
      }).fetchone()

    if result == None:
      return "DB Error", 404
    
    menuID = result.menu_id
    resp['orders'][0]['menuName'] = result.menu_name
    resp['orders'][0]['optionMenuName'] = result.option_menu_name
    resp['orders'][0]['count'] = count
    resp['orders'][0]['totalPrice'] = count * result.price
    
    # 메뉴ID로 매장정보 가져오기
    result = db.execute('''
      SELECT name, contact
      FROM foodservice.store
      JOIN (SELECT store_id as sid
          FROM foodservice.`store-category-map`
          JOIN (SELECT category_id as cid
              FROM foodservice.`category-menu-map`
              WHERE menu_id = :menuID) as v1
          ON v1.cid = category_id) as v2
      ON v2.sid = id
      ;
      ''',
      {
        'menuID' : menuID
      }).fetchone()
    storeName = result.name
    storeContact = result.contact
    resp['storeName']    = result.name
    resp['storeContact'] = result.contact


    # item 이 1개라면 여기서 리턴.
    if len(optionMenus) == 1:
      return resp
    
    #반복.
    for index, item in enumerate(optionMenus[1:], start=1 ):
      resp['orders'].append(dict())
      # 1
      if len( item.split('-') ) != 2:
        return "Wrong Params Error", 400
      # 2
      try:
        optionMenuID, count = map(int, item.split('-') ) # 비싼 문자열 파싱 연산을 두번씩이나 해야하나?
      except:
        return "Wrong Parameter Type Error", 400

      # 3. 쿼리
      result = db.execute('''
        SELECT id as menu_id, name as menu_name, option_menu_name, price 
        FROM foodservice.menu
        JOIN (SELECT menu_id, c1.option_menu_id, option_menu_name, price 
            FROM foodservice.`menu-option_menu-map` as c1
            JOIN (SELECT id as option_menu_id, name as option_menu_name, price 
                FROM foodservice.option_menu
                WHERE id = :optionMenuID ) as v1
            ON v1.option_menu_id = c1.option_menu_id) as v2	
        ON v2.menu_id = id
        ;
        ''', 
        { 
          'optionMenuID' : optionMenuID
        }).fetchone()

      if result == None:
        return "DB Error", 404
      
      menuID = result.menu_id
      resp['orders'][index]['menuName'] = result.menu_name
      resp['orders'][index]['optionMenuName'] = result.option_menu_name
      resp['orders'][index]['count'] = count
      resp['orders'][index]['totalPrice'] = count * result.price
    
    return resp


# QR 생성 및 전달
@api.route('/QR')
class QRServer(Resource):
  formQRServer = api.parser()
  formQRServer.add_argument("param", type=str, location='args', required=True, help="?param=1-10,2-5,8-3... optionMenuID 1 인 상품을 10개 주문, 2 인 상품을 5개주문, 8 인 상품을 3개 주문...")
  @api.expect(formQRServer)
  def get(self): 
    '''최종 주문 정보 확인(전달 받은 URL로 QR 제공 웹페이지 입장 -> 서버 사이드 템플릿을 이용할 필요가 있겠다?) -> 현재 예외처리 없음(단순 URL을 QR 변환하여 제공)'''
    optionMenus = QRServer.formQRServer.parse_args()["param"]


    file = qrcode.make(f'{SERVER_PATH}/api/v1/order?param={optionMenus}')
    buffer = io.BytesIO()
    file.save(buffer)
    buffer.seek(0)
    return send_file(buffer, mimetype='image/jpeg')




