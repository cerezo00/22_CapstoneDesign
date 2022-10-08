# GET, POST, PUT, DELETE 처리 그리고 Flask RestX

RestX 는 Swagger 를 지원한다고 함. (restful 과 차이점 더 알아보면 좋을듯)  

이 문서에서는 하나의 URL 요청을 처리하는 라우트 함수에서 서로 다른 HTTP Method (GET, POST, PUT, DELETE 등)에 대한 처리를 구현하는 것을 실습함.  
그리고 이를 편하게 해주는 라이브러리인 Flask restful 혹은 RestX 등의 외부 라이브러리 를 설치하여 사용해본다.  
그리고 마지막으로 이 라이브러리의 도움을 받아 Swagger UI ? 라고 불리는 프론트엔드-백엔드 간 통신 형식을 약속하는 API 문서를 작성해 본다.  
<br>  

**1. Flask 의 원시적인 방법을 이용한 HTTP Method 처리**  
blueprints 에 httpMethod1.py 를 작성한다.  
app.py 에 블루프린트를 등록한다.  
example 폴더의 httpMethod1.html 을 실행하여 각 버튼을 눌러 테스트 해본다.(Form tag로 각 메소드에 대한 요청을 보냄)  
자세한 설명은 주석 참고.
코드 Github 업로드 되어 있음.  
<br>  

**2. Flask RestX**  

<br>  

**3. Swagger UI 기반 API 문서 작성**  

<br>  

