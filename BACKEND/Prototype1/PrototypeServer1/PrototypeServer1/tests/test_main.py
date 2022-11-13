import json
import pytest

@pytest.fixture(scope='session') # 테스트 실행시 한번만 실행
def create_app():
  from prototypeserver1.config import SET_DBURI
  SET_DBURI('TESTING') # 테스트용 DB로 전환 ! 매우중요.
  from datetime import timedelta
  from flask import Flask
  from prototypeserver1.apis import api 
  from prototypeserver1.config import secret_key
  from prototypeserver1.service.auth import jwt
  
  app = Flask(__name__)
  app.config['TESTING'] = True
  app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # 뭔지 정확히는 모르겠는데 성능상 안좋고 설정안하면 Warning 뜸
  # 이 설정이 flask-sqlalchemy 용이라면 제거할 필요있음.
  app.config['JSON_AS_ASCII'] = False # 한글 데이터를 주고받을때 용이.
  app.secret_key = secret_key # 실제 운영시에는 복잡한 문자열로 사용해야함.
  # JWT토큰 생성에 사용될 Secret Key를 flask 환경 변수에 등록
  app.config["JWT_SECRET_KEY"] = secret_key
  app.config["JWT_COOKIE_SECURE"] = False # https 일때 true
  app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
  app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(minutes=60) 
  app.config["JWT_COOKIE_CSRF_PROTECT"] = False # CSRF Token 의 필요성, CSRF 공격 구현 경험, 보호 기법 작동원리에 대한 정확한 이해, 갖춰지지않은 경우 즉, 제대로 모르면 쓸 자격도 없다.
  app.config['MAX_CONTENT_LENGTH'] = 16 * 1000 * 1000 # 파일 최대 업로드 크기 16MB 제한.
  jwt.init_app(app)
  api.init_app(app) 

  if __name__=="__main__":
    app.run(host="127.0.0.1", port=8000, debug=True)
  return app

@pytest.fixture # 매 테스트 실행 마다 실행
def client(create_app):
    client = create_app.test_client()
    return client

def test_example(client):

  response = client.get('/api/v1/store/name/1')

  resp = json.loads(response.data.decode('utf-8'))  
  print(resp)
  assert response.status_code == 200
  assert resp['name'] == "스타벅스 XX점"