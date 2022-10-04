from flask import Flask, render_template

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