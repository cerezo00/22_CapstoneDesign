from flask import Flask, Blueprint
from apis import api # apis 폴더의 __init__.py 에서 모든 라우터 통합한다.
from flask_sqlalchemy import SQLAlchemy
from config import DBINFO # uri 필드에 'http://<host경로>:<port번호>' 추가했음.

app = Flask(__name__)
db = SQLAlchemy() # SQLAlchemy 객체 생성

app.config["SQLALCHEMY_DATABASE_URI"] = DBINFO['uri']
db.init_app(app)
# 이제부터 db 객체는 모델을 정의하기 위한 db.Model 객체와, 쿼리실행을 제공하기 위한 db.session 객체를 제공할 것이다.
# 아마, config설정을 변경하여, 한 단계 더 원시적인 SQL추상계층 정도만 사용하는 방법이 있다고 함.

api.init_app(app) 



# 서버 실행 로직
if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000", debug=True)
  # 반드시 poetry run python -m app (파일이름) 커맨드로 실행할것.
  # No module named 에러 나와서 vscode 재실행 했더니 해결됨. -> 이게 말이 되나?