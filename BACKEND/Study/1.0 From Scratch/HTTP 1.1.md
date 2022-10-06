# HTTP/1.1

Hyper Text Transfer Protocol : 7계층 네트워크 프로토콜.

웹 백엔드 프로그래밍 → “HTTP API + DB 엔지니어링” 이라고 할 수 있겠다 싶을 정도로 중요하다고 생각.

클라이언트-서버 (다 대 일) 아키텍쳐에서 클라이언트의 요청 - 서버의 응답 구조로 사용됨.

Header 와 Body 로 나뉨.<br>
아래는 HTTP Request 예시.

![Untitled](./img/9.png)

**Header**

    POST : Request Method(하단에 설명)

    HTTP/1.1 : 프로토콜 종류

    Host.. Content-Type.. Contenty-Length.. : Header (주요 정보(메타데이터) 명시)

    여러가지 필드에 대한 값을 넣어줄 수 있고, 표준으로 정해진 필드들이 있는가 하면 직접 필드를 만들 수도 있는걸로 알고있음.

    빈줄 1개로 Header 와 Body를 구분,

**Body**

    say=Hi… : Body. 전달할 텍스트 데이터(형식은 약속하고사용)
<br><br>
### **HTTP Request**

HTTP Request 에는 여러가지 Method 가 있는데, 그 중에 많으면 4가지 정도를 사용할 것임.

GET : 정보 읽기에 대한 요청

POST : 정보 등록에 대한 요청

PUT : 정보 수정에 대한 요청

DELETE : 정보 삭제에 대한 요청

위 용도는 RFC 상에서 이렇게 쓰라고 약속되어있는것. **메소드자체를 다르게 사용해서 발생하는 기능적인 차이는 없음**(이해하는데 굉장히 오랜 시간이 걸렸던 개념). GET 으로 삭제요청을 할수도있으나, 코드 유지보수 및 관리 차원에서 위 용도에 맞추어 사용하기를 권장하는 것. → RESTful 한 API 설계라고 부름

HTTP API : 내 서비스에서 어떤 URL경로(=어떤 엔드포인트) /name/1, /api/v/id … 에 대하여  어떤 값을 전달해주겠다는 것에 대한 접근안내이자 사용법 제공(Interface)

REST API : HTTP API + 이것저것 공학적으로 설계를 잘 하자

API : 위 내용을 서버 개발자들은 그냥 API 라고 부르는 것도 이 맥락에서는 동일하겠다.

즉, 동일한 URL (www.naver.com/123/456) 에 대해서 서로 다른 method 개수만큼 서로 다른 처리 가능(구분 가능)
<br><br>
### **HTTP Response**

.. 계속