from flask import Flask, Blueprint
from apis import api # apis 폴더의 __init__.py 에서 모든 라우터 통합한다.

app = Flask(__name__)
blueprint = Blueprint('api', __name__, url_prefix='/api/v1') # 이렇게 하면 현재 서버의 모든 URL의 prefix 가 되겠음.
app.register_blueprint(blueprint)

api.init_app(app) 



# 서버 실행 로직
if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000", debug=True)
  # 반드시 poetry run python -m app (파일이름) 커맨드로 실행할것.
  # No module named 에러 나와서 vscode 재실행 했더니 해결됨. -> 이게 말이 되나?