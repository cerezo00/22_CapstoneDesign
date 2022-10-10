from flask_restx import Resource, Namespace
from model import db
from model.testModel import Test # 네이밍에 대한 고민필요

api = Namespace('/example', description="네임스페이스 사용 예제") 

@api.route('/echo/<string:message>')
class echo(Resource): 
  def get(self, message): 
    return { "your_message": message}

@api.route('/test') 
class TestShow(Resource):
  def get(self):
    units = Test.query.all()

    resp = { "units" : list() }
    for s in units:
      row =  s.__dict__
      row.pop('_sa_instance_state', None)
      resp["units"].append(row)
    
    return resp
