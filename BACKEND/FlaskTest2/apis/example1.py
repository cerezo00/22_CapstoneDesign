import json
from flask_restx import Resource, Namespace
from model.store import Store # 네이밍에 대한 고민필요
from flask import jsonify

api = Namespace('/example1', description="네임스페이스 사용 예제") 
# 첫번째 인자에 들어가는 이름이 swagger에 표시되기때문에 저렇게 써주면 보기 편함.
# 이곳에서 URL_prefix를 명시하지 않고(할수는있음) 메인에서 명시할 수 있고, 그게 더 관리에 용이하다.

# 앞부분 변수명이 api 인것에 주목. Api() 객체로 호출된 라우터는 flask_restx 라이브러리의 것이라는 뜻인듯.
@api.route('/hello')
class HelloSwagger(Resource): # 함수 대신 클래스를 등록한다.
  def get(self):  # GET 요청시 리턴 값에 해당 하는 dict를 JSON 형태로 반환
    return {"hello": "swagger!"} # api 문서 확인을 위해 임의로 json을 리턴해보겠다.
  def post(self): # 각 메소드에 대한 함수를 작성해주면 된다.
    return "<h1>POST Method Return!</h1>"
  def put(self):
    return "<h1>PUT Method Return!</h1>"
  def delete(self):
    return "<h1>DELETE Method Return!</h1>"
# 결과적으로 들여쓰기가 들어가야하는건 같다..



@api.route('/')
class HelloNameSpace(Resource):  
  def get(self):
    return {"hello" : "namespace!"}, 201, {"hi":"hello"}

@api.route('/<int:number>')
class NumberEchoExample(Resource): 
  def get(self, number):  
    return {"Number": f"{number}"}

@api.route('/stores')
class Stores(Resource):
  def get(self):
    stores = Store.query.all()
    # resultset 이다.
    # stores = <Store 1> , <Store 2> , <Store 3>

    # 1. 가장 코드가 간결하지만 성능상으로 최선의 방법인가? -> Python Json 직렬화 에 대하여 검색할것.
    resp = { "stores" : list() }
    for s in stores:
      row =  s.__dict__
      row.pop('_sa_instance_state', None)
      resp["stores"].append(row)
    
    # 한가지 더 생각해볼것: 이 처리 로직을 여기에 작성하는것이 맞는가 ?

    return resp