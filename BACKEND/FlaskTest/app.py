from flask import Flask, make_response, request, send_file


#Flask 객체 인스턴스 생성
app = Flask(__name__)

# 라우팅 예제 
'''
이 부분은 여러줄 주석임.

라우팅 예제
@app.route('클라이언트에게 요청을 받을 URL경로')
def 적절한함수이름():
  함수 내에서 다양한 처리
  ....
  ....

  return 응답할 데이터를 리턴(html파일, image파일, 단순문자열, json데이터 ...)

'''
@app.route('/')
def index():
  return "<h1>Hello Flask</h1>"

@app.route('/abcd')
def abcdefg(): # 적절하지 못한 함수이름. 즉, 임의로 설정가능.
  return "<h1>Hello Python</h1>"

# RESTful 하지않은 API설계의 대표적 예시. 동사를 사용하지 말고 명사를 써야함. 즉, /cookie 등이 올바름.
# 왜? -> 사용자는 get method 로 http 요청을 보낼것이고 이 자체가 give me(동사부분) 라는 의미를 담고 있음.
@app.route('/giveMeCookie') 
def cookieHandle():
  res = make_response("Create Cookie!!")
  res.set_cookie("myCookieName", "FunnyCookie")
  return res
# 위 URL로 접속하고, 개발자도구(F12)를 열어 Application -> Cookies 를 확인하면 쿠키가 등록된것을 볼수있음.

# 이미지 서빙 + 동적 라우팅(route paramter) 예제
@app.route('/image/<string:fileName>') # <> 안의 가변문자열을 fileName 이라는 변수로 받아온다 (argument) 여기서 string: 은 Type Hinting 기능. int, float, path(슬래시허용=하위경로탐색만허용?) 등이 있다고함.
def imageExample(fileName): # 처리하는 라우트함수에 fileName 을 넘겨준다 (parameter)
  # .. 이나 / 등을 이용한 파일시스템 접근 취약점은 프레임워크 단에서 잘 처리해주는 듯? + URL Encoding 을 이용한 공격도 안통하는거같음.
  # 파일존재여부 검사할것.
  return send_file(f'./image/{fileName}')
# fileName 에 image폴더 안 사진들의 이름(확장자까지)을 쳐서 접속하면 모두 확인가능.


## Blueprint 예제 시작
from blueprints import menu
# 모듈 가져오기. 보기 쉽게 이곳에 썼으나, import문은 가능하면 항상 파일 맨위에 위치.

# blueprint 등록
app.register_blueprint(menu.blueprint) 
# 여기서 blueprint는 menu 파일에서 변수이름을 blueprint로 했기때문.
# (menu.py 의 blueprint 라는 변수를 등록하는것임.)
## Bluprint 예제 끝


## DB Control 예제 시작
from blueprints import dbExample1, dbExample2, dbExample3
app.register_blueprint(dbExample1.blueprint)

## DB Control 예제 끝

## 원시적인 방법을 이용한 HTTP Method 처리 예제 시작
from blueprints import httpMethod1
app.register_blueprint(httpMethod1.blueprint)
## 원시적인 방법을 이용한 HTTP Method 처리 예제 끝


# 서버 실행 로직
if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000", debug=True)
  # 반드시 poetry run python -m app (파일이름) 커맨드로 실행할것.
  # No module named 에러 나와서 vscode 재실행 했더니 해결됨. -> 이게 말이 되나?