from flask_restx import Resource, Namespace, abort
from flask import request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import json
from model import db
from service.auth import *


api = Namespace('AdminServer', description="사업자 매장 메뉴 관리 서버") 

@api.route('/login')
class login(Resource):
  def post(self): 
    '''로그인 요청 form name = { 'name' : <name>, 'password' : <password> }'''

    # # 로그인 시도 횟수 제한 처리
    # if not session.get('attempt'):
    #   session['attempt'] = 5
    # attempt = session.get('attempt')
    # attempt -= 1
    # if attempt == 0:
    #   return abort(403, 'Blocked')
    # session['attempt'] = attempt
    # ... 세션 타임아웃 등 설정필요(영구세션이 아닌경우, 브라우저 닫으면 초기화), 더 고민필요.

    name = request.form.get('name')
    password = request.form.get('password')

    account = db.session.execute('''SELECT name, password
                            FROM foodservice.store_manager
                            WHERE name = :name
                            ;''', { 'name' : name }).fetchone() # SQL INJECTION 방어에 대해 더 깊이 알아볼것.
                            
    if account == None: # 이름이 존재하지 않는 경우
      return abort(401, "Incorrect User Name or Password")

    if check_password_hash(account.password, password): # 로그인 성공
      # JWT 생성 및 등록절차
      access_token = create_access_token(identity = name)
      
      response = jsonify( { 'msg' : 'Success' } )
      set_access_cookies(response=response, encoded_access_token=access_token) # 브라우저 쿠키에 jwt 등록

      return response # JWT 발급.
    else: # 비밀번호 불일치
      return abort(401, "Incorrect User Name or Password")
    

@api.route('/userName')
class userName(Resource): 
  @jwt_required()
  def get(self): 
    name = get_jwt_identity() # get user name
    return f'''your name is {name}'''



