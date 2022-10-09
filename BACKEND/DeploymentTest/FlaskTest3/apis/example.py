import json
from flask_restx import Resource, Namespace
from model import db
#from model.store import Store # 네이밍에 대한 고민필요


api = Namespace('/example', description="네임스페이스 사용 예제") 

# 앞부분 변수명이 api 인것에 주목. Api() 객체로 호출된 라우터는 flask_restx 라이브러리의 것이라는 뜻인듯.
@api.route('/echo/<string:message>')
class HelloSwagger(Resource): # 함수 대신 클래스를 등록한다.
  def get(self, message):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
    return { "your_message": message} # api 문서 확인을 위해 임의로 json을 리턴해보겠다.

# @api.route('/stores') 
# class Stores(Resource):
#   def get(self):
#     stores = Store.query.all()
#     # resultset 이다.
#     # stores = <Store 1> , <Store 2> , <Store 3>

#     # 1. 가장 코드가 간결하지만 성능상으로 최선의 방법인가? -> Python Json 직렬화 에 대하여 검색할것.
#     resp = { "stores" : list() }
#     for s in stores:
#       row =  s.__dict__
#       row.pop('_sa_instance_state', None)
#       resp["stores"].append(row)
    
#     # 한가지 더 생각해볼것: 이 처리 로직을 여기에 작성하는것이 맞는가 ?

#     return resp
