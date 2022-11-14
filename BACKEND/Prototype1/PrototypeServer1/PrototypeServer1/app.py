from flask import Flask

from datetime import timedelta
from prototypeserver1.apis import api 

from pymysql.constants import CLIENT
from prototypeserver1.model import db
from prototypeserver1.config import secret_key 

from prototypeserver1.service.auth import jwt


def create_app():
  app = Flask(__name__)

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

  @app.teardown_request
  def shutdown_session(exception=None):
    db.remove() # 어플리케이션의 모든 엔드포인트 요청이 끝날때마다 DB세션 종료
  return app

# 서버 실행 로직
# 프로덕션 환경에서는 0.0.0.0 으로 하고, debug=True는 없애야함
if __name__=="__main__":
  create_app().run(host="127.0.0.1", port=8000, debug=True)
  #app.run(host="0.0.0.0", port="8000") # for production
  # 여기서 IP는 수정안해도 배포할때 gunicorn 으로 잘되는듯? debug모드는 해제해야함.

# 배포전 변경작업:
# app.py : host ip, debug=True 제거
# config.py : db ip , password