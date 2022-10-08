from flask import Blueprint, request # request 추가 ! 

blueprint = Blueprint('httpMethod1', __name__, url_prefix='/method/')



# 허용할 method 를 route 함수의 인자로 명시해준다. 아무것도 명시하지 않으면 기본 GET만 허용된다.
# 웹 브라우저 주소창에 URL을 입력하고 ENTER 를 치면 GET method 로 요청이 수행됨.
# 추가로 다른 method 를 이용하여 요청을 보내려면 cURL 등의 소프트웨어를 이용하여 수기로 HTTP Request를 작성,
# 또는 자바스크립트를 이용하거나, html form tag (GET과 POST만 지원)
# 또는 BurpSuite 등의 소프트웨어를 이용하여 프록시 서버를 두어 호스트에서 빠져나가는 패킷을 강제로 캡쳐하여 수정하는 방법 등이 있다.
@blueprint.route('/url1', methods = ['GET', 'POST', 'PUT', 'DELETE'])
def url(): 
  if request.method == 'GET': # GET일 때의 처리
    return '<h1 style="color:#ff0000;">GET 요청에 대한 응답 입니다.<h1>'
  elif request.method == 'POST': # POST일 때의 처리
    return '<h1 style="color:#00ff00;">POST 요청에 대한 응답 입니다.<h1>'  
  elif request.method == 'PUT': # PUT일 때의 처리
    return '<h1 style="color:#0000ff;">PUT 요청에 대한 응답 입니다.<h1>' 
  elif request.method == 'DELETE': # DELETE일 때의 처리
    return '<h1 style="color:#f000f0;">DELETE 요청에 대한 응답 입니다.<h1>' 

  return

# 위 코드를 보면 알수 있듯이, HTTP Method 가 GET, POST, PUT, DELETE 인 것은 기능적인 차이가 거의 아무것도 없다.  
# 단지 의미에 맞게 처리를 하자고 약속하고 사용하는 것이 RESTful 한 설계이다.  

# 문제상황: 코드가 매우 길어질 경우 if문 하나를 들여쓰기 하여 들어가야하는 부분을 없애고 관리하기 쉽고 깔끔하게 처리하고 싶다.  
# -> RESTful 라이브러리를 사용해보자.   

