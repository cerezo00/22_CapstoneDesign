from flask_restx import Resource, Namespace, abort
from model import db
from model.models import *


api = Namespace('Menu', description="매장 관련 정보") 

@api.route('/name/<int:storeKey>')
class name(Resource):  
  def get(self, storeKey):
    '''매장 이름'''
    result = db.session.query(Store.name).filter_by(id=f"{storeKey}").first()
    if result == None:
      return abort(404, "해당하는 매장이 존재하지 않습니다.")
    else:
      return {'name' : result[0] }

@api.route('/categories/<int:storeKey>')
class categories(Resource):  
  def get(self, storeKey):
    '''Deprecated 매장의 카테고리 목록'''

    resultset = db.session.execute(f'''SELECT id, name
                                        FROM foodservice.category
                                        JOIN (SELECT *
                                            FROM foodservice.`store-category-map` as scmap
                                            WHERE scmap.store_id = {storeKey}) as v1
                                        ON v1.category_id = id;''')
    resp = { 'categories' : list() }
    for record in resultset:
      resp["categories"].append({
        'id': record.id,
        'name': record.name
      })
      
    return resp

@api.route('/menus/<categoryId>')
class menus(Resource):  
  def get(self, categoryId):
    '''Deprecated 카테고리에 해당하는 메뉴 목록'''

    resultset = db.session.execute(f'''SELECT id, name, description
                                        FROM foodservice.menu
                                        JOIN (SELECT menu_id
                                            FROM foodservice.`category-menu-map` as cmmap
                                            WHERE cmmap.category_id = {categoryId}) as v1
                                        ON id = v1.menu_id;''')
    resp = { 'menus' : list() }
    for record in resultset:
      resp["menus"].append({
                            'id': record.id,
                            'name': record.name,
                            'description': record.description,
                          })      
    return resp

@api.route('/categoriesWithMenus/<int:storeKey>')
class categoriesWithMenus(Resource):  
  def get(self, storeKey):
    '''카테고리와 그에 해당하는 메뉴들 목록'''

    resultset = db.session.execute(f'''SELECT category_id, category_name, menu_id, name, description
                                        FROM foodservice.menu
                                        JOIN (SELECT category_id, category_name, menu_id
                                            FROM foodservice.`category-menu-map`
                                            JOIN (SELECT id , name as category_name
                                                FROM foodservice.category
                                                JOIN (SELECT category_id
                                                    FROM foodservice.`store-category-map`
                                                    WHERE store_id = {storeKey}) as v1
                                                ON id = v1.category_id) as v2
                                            ON category_id = v2.id) as v3
                                        ON v3.menu_id = id
                                        ORDER BY category_id;''')
    if resultset.rowcount == 0: # Null 에 대한 정확한 예외 처리가 맞는가?
      return abort(404, "해당 매장의 카테고리와 메뉴가 존재하지 않습니다.")
    else:
      resp = { 'categories' : [] }
      prevId = -1 # category_id 가 -1 이 존재하면 안됨.(정확한 처리가 맞는가?)
      for record in resultset:
        if record.category_id != prevId:
          prevId = record.category_id # category_id 로 정렬되어 있기 때문에 카테고리 id가 변화할때 json 추가
          resp['categories'].append( # 새로운 카테고리면 추가.
            {
              'category_name' : record.category_name,
              'menus' : []
            }
          )
        resp['categories'][-1]['menus'].append( # 메뉴 json 추가
          {
            'menu_id' : record.menu_id,
            'name' : record.name,
            'description' : record.description
          }
        )
    return resp


@api.route('/optionMenus/<menuId>')
class optionMenus(Resource):  
  def get(self, menuId):
    '''메뉴에 해당하는 옵션메뉴 목록'''

    resultset = db.session.execute(f'''SELECT id, name, price
                                        FROM foodservice.option_menu
                                        JOIN (SELECT option_menu_id as omid
                                            FROM foodservice.`menu-option_menu-map`
                                            WHERE menu_id = {menuId}) as mommap
                                        ON id = mommap.omid;''')
    resp = { 'optionMenus' : list() }
    for record in resultset:
      resp["optionMenus"].append({
        'id': record.id,
        'name': record.name,
        'price': record.price,
      })      
    return resp



# '''SELECT category_name, menu_id, menu_name, description, option_menu.id as option_menu_id, option_menu.name, option_menu.price
#                                         FROM foodservice.option_menu
#                                         JOIN (SELECT menu_id, option_menu_id, menu_name, description, category_name
#                                             FROM foodservice.`menu-option_menu-map`
#                                             JOIN (SELECT menu.id, menu.name as menu_name, menu.description, c3.name as category_name
#                                                 FROM foodservice.menu
#                                                 JOIN (SELECT category_id, menu_id, name
#                                                     FROM foodservice.`category-menu-map` as cmmap
#                                                     JOIN (SELECT id, name
#                                                         FROM foodservice.category as c
#                                                         JOIN (SELECT category_id
#                                                             FROM foodservice.`store-category-map`
#                                                             WHERE store_id = {storeKey}) as scmap
#                                                         ON scmap.category_id = c.id) as c2
#                                                     ON cmmap.category_id = c2.id) as c3
#                                                 ON menu.id = c3.menu_id) as c4
#                                             ON menu_id = c4.id) as c5
#                                         ON option_menu.id = c5.option_menu_id;'''


# @api.route('/stores') 
# class Stores(Resource):
#   def get(self):
#     stores = Store.query.all()
    # resultset 이다.
    # stores = <Store 1> , <Store 2> , <Store 3>

    # 1. 가장 코드가 간결하지만 성능상으로 최선의 방법인가? -> Python Json 직렬화 에 대하여 검색할것.
    # resp = { "stores" : list() }
    # for s in stores:
    #   row =  s.__dict__
    #   row.pop('_sa_instance_state', None)
    #   resp["stores"].append(row)
    
    # 한가지 더 생각해볼것: 이 처리 로직을 여기에 작성하는것이 맞는가 ?

    # return resp
  # 등록 예제. 위험하므로 주석처리해둠.
  # def post(self):
  #   newStore = Store(name="BBQ", contact="010-9999-2212")
  #   db.session.add(newStore)
  #   db.session.commit()
  #   return "Added"

  # 수정 예제
  # def put(self):
  #   bbq = Store.query.filter_by(name="BBQ").first() # 대소문자 주의할것!
  #   bbq.contact = "010-3434-2081" # modify 
  #   db.session.commit()
  #   return "Updated !"

  # 삭제 예제
  # def delete(self):
  #   bbq = Store.query.filter_by(name="BBQ").first()
  #   db.session.delete(bbq)
  #   db.session.commit()
  #   return "Deleted !"