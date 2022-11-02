from flask_restx import Resource, Namespace, abort
from flask import request
from werkzeug.security import generate_password_hash, check_password_hash

from model import db
from model.models import StoreManager

api = Namespace('AdminServer', description="사업자 매장 메뉴 관리 서버") 

@api.route('/login')
class login(Resource):
  def post(self): 
    '''로그인 form name = { 'name' : <name>, 'password' : <password> }'''
    name = request.form.get('name')
    password = request.form.get('password')

    account = db.session.execute('''SELECT name, password
                            FROM foodservice.store_manager
                            WHERE name = :name
                            ;''', { 'name' : name }).fetchone() # SQL INJECTION 방어에 대해 더 깊이 알아볼것.
    if account == None:
      return abort(401, "Incorrect User Name or Password")

    if check_password_hash(account.password, password):
      return "SUCCESS" # JWT 발급.
    else:
      return abort(401, "Incorrect User Name or Password")
    
 





