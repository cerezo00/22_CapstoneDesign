from flask_restx import Resource, Namespace
from flask import request

api = Namespace('CookieSet', description="매장 식별 쿠키 세팅") 



       
@api.route('/')
class storeKeyInit(Resource):
  def get(self): 
    '''?storeKey=<int:storeKey>   첫 페이지 진입 시 호출하여 매장 식별 키를 쿠키에 세팅'''
    storeKey = request.args.get('storeKey')
    return 200, {'Set-Cookie': f'storeKey={storeKey}'}






