from flask import Flask
from apis import api 
from model import db 
from config import DBINFO, DBURI 

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = DBURI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False 
app.config['JSON_AS_ASCII'] = False 
app.secret_key = 'abcdefgfedcba'

db.init_app(app)


api.init_app(app) 

# 서버 실행 로직
if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000")
  # 반드시 poetry run python -m app (파일이름) 커맨드로 실행할것.
  # No module named 에러 나와서 vscode 재실행 했더니 해결됨. -> 이게 말이 되나?