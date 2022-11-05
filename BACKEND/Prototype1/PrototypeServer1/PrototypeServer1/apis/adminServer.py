from flask_restx import Resource, Namespace, abort, fields
from flask import request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import json
from model import db
from service.auth import *


api = Namespace('AdminServer', description="사업자 매장 메뉴 관리 서버") 


formLogin = api.model('로그인 요청', strict=True, model={
    'name'    : fields.String(title='이름', max_length=36, default='Store Manager Name', required=True),
    'password': fields.String(title='비밀번호', max_length=400, default='PASSWORD', required=True),
})
@api.route('/login')
class login(Resource):
  @staticmethod
  @api.expect(formLogin, validate=True)
  def post(): 
    '''로그인 요청''' 

    # # 로그인 시도 횟수 제한 처리 <보류>
    # if not session.get('attempt'):
    #   session['attempt'] = 5
    # attempt = session.get('attempt')
    # attempt -= 1
    # if attempt == 0:
    #   return abort(403, 'Blocked')
    # session['attempt'] = attempt
    # ... 세션 타임아웃 등 설정필요(영구세션이 아닌경우, 브라우저 닫으면 초기화), 더 고민필요.

    name = request.get_json().get('name') # request.form.get('') 가 안먹힘. html form body 와 application/json 의 차이???
    password = request.get_json().get('password')
    account = db.execute('''SELECT id, name, password
                            FROM foodservice.store_manager
                            WHERE name = :name
                            ;''', { 'name' : name }).fetchone() # SQL INJECTION 방어에 대해 더 깊이 알아볼것.
                            
    if account == None: # 이름이 존재하지 않는 경우
      return abort(401, "Incorrect User Name or Password")

    if check_password_hash(account.password, password): # 로그인 성공
      result = db.execute('''
                  SELECT store_id
                  FROM foodservice.`store-store_manager-map`
                  WHERE store_manager_id = :id
                  ;''', { 'id' : account.id}).fetchone() # 1대1 매핑일때만 가능
      store_id = result.store_id
      # JWT 생성 및 등록절차      
      access_token = create_access_token(identity = store_id) # 현재 어드민 : 가게, 1대1 구조를 가정하여 가게 ID를 토큰에저장.
      
      response = jsonify( { 'msg' : 'Success' } )
      set_access_cookies(response=response, encoded_access_token=access_token) # 브라우저 쿠키에 jwt 등록

      return response # JWT 발급.
    else: # 비밀번호 불일치
      return abort(401, "Incorrect User Name or Password")
    

# 가게 정보 (가게이름 등) 관리 API도 필요할듯?

##
formCategory = api.model('신규 카테고리 등록', strict=True, model={
    'categoryName': fields.String(title='카테고리 이름', max_length=50 ,default='New Category', required=True),
})

@api.route('/category')
class manageCategory(Resource): 
  @staticmethod # 모든, "클래스와 무관한 함수"에는 이걸 붙여주는게 좋은듯..?
  @jwt_required()
  @api.expect(formCategory, validate=True)
  def post(): # staticmethod 의 경우 self가 필요없음. -> 성능상 이점이 있는지 찾아볼것
    '''신규 카테고리 등록'''
    store_id = get_jwt_identity() # get store_manger id

    categoryName = request.get_json().get('categoryName')
    db.execute('''
      INSERT INTO foodservice.`category`(name)
      VALUES (:categoryName);

      INSERT INTO foodservice.`store-category-map`(store_id, category_id)
      VALUES (:sid, ( LAST_INSERT_ID() ));
      ''', 
      {
        'categoryName' : categoryName,
        'sid' : store_id,
      }
    )
    db.commit()

    # 다양한 예외 상황에 대한 처리필요.

    return f'''Category Name is {categoryName}'''
  def patch(self):
    return 1
##

# <GET store_id , store_name>
# SELECT id as store_id, name as store_name
# FROM foodservice.store
# JOIN (SELECT store_manager_id
# 		FROM foodservice.`store-store_manager-map`
# 		WHERE store_id = 1) as v1
# ON id = v1.store_manager_id		
# ;
