import json
from flask_restx import Resource, Namespace
from service.auth import *
from flask import Response, request, jsonify

api = Namespace('/authExample', description="JWT 예제") 

@api.route('/')
class login(Resource): 
  def get(self): 
    return Response('''<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Sign Up</title>
              </head>
              <body>
                <form action="http://127.0.0.1:8000/api/v1/auth" method="POST">
                  <fieldset style = "width:150">
                    <legend>ID 입력</legend>
                        ID : <input type = "text" name = "ID"/><br><br>     
                        <button type="submit">SIGN UP</button>     
                  </fieldset>
                  
                </form>
              </body>
              </html>''', mimetype='text/html')
  def post(self):
    #사용자 입력 또는 Oauth Access Token을 이용해 전달받은 카카오 이메일, 회원번호 등의 정보
    userID = request.form['ID']
    access_token = create_access_token(identity = userID, expires_delta = False)
    
    response = jsonify( { 'msg' : 'Success' } )
    set_access_cookies(response=response, encoded_access_token=access_token)
    # set_refresh_cookies(response=response, encoded_refresh_token=refresh_token)
    # JWT를 JS변수(브라우저메모리), 쿠키, 웹스토리지 등 어디에 저장해두고 어떻게 주고받으며 사용할것인가는 자유롭게 구현.

    return response


@api.route('/user-only')
class user_only(Resource): 
  @jwt_required()
  def get(self): 
    return "Authorized User"