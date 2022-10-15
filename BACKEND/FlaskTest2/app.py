from flask import Flask, Blueprint
from apis import api # apis 폴더의 __init__.py 에서 모든 라우터 통합한다.
from model import db # 패키지에서 이미 생성된 SQLAlchemy 객체를 가져온다. (6개월 이상 짜리 삽질의 가치를 지니는 한 문장)
from config import DBINFO, DBURI, secret_key # uri 필드에 'http://<host경로>:<port번호>' 추가했음.
from service.auth import jwt

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = DBURI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # 뭔지 정확히는 모르겠는데 성능상 안좋고 설정안하면 Warning 뜸
app.config['JSON_AS_ASCII'] = False # 한글 데이터를 주고받을때 용이.
app.secret_key = secret_key # 실제 운영시에는 복잡한 문자열로 사용해야함.

# JWT토큰 생성에 사용될 Secret Key를 flask 환경 변수에 등록
app.config["JWT_SECRET_KEY"] = secret_key

jwt.init_app(app)

db.init_app(app)
# 이제부터 db 객체는 모델을 정의하기 위한 db.Model 객체와, 쿼리실행을 제공하기 위한 db.session 객체를 제공할 것이다.
# 아마, config설정을 변경하여, 한 단계 더 원시적인 SQL추상계층 정도만 사용하는 방법이 있다고 함.

api.init_app(app) 

# 서버 실행 로직
if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000", debug=True)
  # 반드시 poetry run python -m app (파일이름) 커맨드로 실행할것.
  # No module named 에러 나와서 vscode 재실행 했더니 해결됨. -> 이게 말이 되나?