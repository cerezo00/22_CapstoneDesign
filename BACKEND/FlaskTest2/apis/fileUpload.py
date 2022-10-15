import json
from flask_restx import Resource, Namespace
from service.auth import *
from flask import Response, request, redirect, url_for
from werkzeug.utils import secure_filename

import os

base_path = "./images/" # . 은 프로젝트 루트경로.


api = Namespace('/fileUpload', description="파일 업로드 예제") 

@api.route('/')
class upload(Resource): 
  def get(self): 
    return Response('''<!DOCTYPE html>
                        <html>
                        <body>
                          <form action = "http://localhost:8000/api/v1/fileUpload" method = "POST"
                                enctype = "multipart/form-data">
                            <input type = "file" name = "file" id="file" />
                            <input type = "submit"/>
                          </form>
                        </body>
                        </html>''', mimetype='text/html')
  def post(self):
    file = request.files['file'] # request 에서 꺼낸다.
    
    	
    filename = secure_filename(file.filename) # request로 전달받은 파일 이름 그대로.
    save_path = base_path # 문자열 파싱으로 최종 저장경로설정할것
    os.makedirs(save_path, exist_ok=True)  #존재하지않는 경로의 폴더 자동생성 허용
    file.save(os.path.join(save_path, filename) )

    return redirect( "http://127.0.0.1:8000/api/v1/fileUpload" , code=302)

@api.route('/multi') # 파일 여러개 예제
class upload(Resource): 
  def get(self): 
    return Response('''<!DOCTYPE html>
                        <html>
                        <body>
                          <form action = "http://localhost:8000/api/v1/fileUpload/multi" method = "POST"
                                enctype = "multipart/form-data">
                            <input type = "file" name = "files" multiple />
                            <input type = "submit"/>
                          </form>
                        </body>
                        </html>''', mimetype='text/html')
  def post(self):
    files = request.files.getlist("files") # 파일 여러개 예제
    for file in files:
      filename = secure_filename(file.filename) # 전달받은 이름 그대로(한글이면 에러남)
      save_path = base_path 
      os.makedirs(save_path, exist_ok=True)  #존재하지않는 경로의 폴더 자동생성 허용
      file.save(os.path.join(save_path, filename) ) # 파일이름 한글들어가면 안됨.

    return redirect( "http://127.0.0.1:8000/api/v1/fileUpload/multi" , code=302)

