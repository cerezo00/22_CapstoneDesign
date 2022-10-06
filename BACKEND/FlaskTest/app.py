from flask import Flask, make_response, request

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
# 위 URL로 접속하고, 개발자도구(F12)를 열어 Application, Cookies 를 확인하면 쿠키가 등록된것을 볼수있음.


if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000", debug=True)
  # 반드시 poetry run python app.py(파일이름) 커맨드로 실행할것.