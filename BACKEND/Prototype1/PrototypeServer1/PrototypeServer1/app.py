from flask import Flask
from apis import api 
from model import db
from config import DBINFO, DBURI, secret_key 
from flask_cors import CORS

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = DBURI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False # 뭔지 정확히는 모르겠는데 성능상 안좋고 설정안하면 Warning 뜸
app.config['JSON_AS_ASCII'] = False # 한글 데이터를 주고받을때 용이.
app.secret_key = secret_key # 실제 운영시에는 복잡한 문자열로 사용해야함.

db.init_app(app)

api.init_app(app) 

CORS(app)

# 서버 실행 로직
if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000", debug=True)