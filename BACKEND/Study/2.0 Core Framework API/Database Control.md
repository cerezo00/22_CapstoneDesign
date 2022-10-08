# Database Control

## **MySQL Connection , Raw SQL Query 그리고 ORM**

이 문서에서는 가장 원시적인 라이브러리들만을 이용하여 순수한 SQL쿼리를 문자열로 작성하여 DB에 넘겨주고, 데이터를 받아오는 방법을 실습해보고,  
그 다음에는 DAO(Data Access Object), DTO(Data Transfer Object) 등을 이용한 객체지향 기법을 이용하여 데이터베이스 입출력을 효율적으로 관리하는 방법을 실습,  
그리고 마지막으로 ORM (Object Relational Mapping) 라이브러리를 이용하여 실제 업무에서 사용되는 방식을 실습해 볼 것이다.  
추가로 ORM 사용의 필요성을 직접 체감해보고, 장단점을 이해할 수 있는 수준까지 공부할 수 있으면 좋을 것 같다.
<br>  
파이썬(또는 어떤 다른 프로그래밍 언어)으로 작성된 프로그램에서 DBMS 와 통신하기 위해서는 복잡한 절차가 필요하다고 함.  
이를 간편하게 지원해주는 라이브러리가 대부분의 상용 프로그래밍 언어 차원에서 제공된다. (JDBC 등..)  
파이썬에서는 mysqlclient, mysql-connector-python , pymysql 정도가 있는 듯.  
이 정도조차 사용하지 않는 원시적인 방법을 사용한다는 웹 응용 프로그래머 이야기는 본 적도 없고, 들어본 적도 없고, 읽어본 적도 없다.  
각자의 장단점, 차이점 등을 열심히 검색해보면서 공부해보면 좋겠지만, 대충 훑어보고 pymysql 을 사용하기로 결정했다.(더 좋은게 있으면 제안 바람)  
<br>  
## **0. MySQL 설치 및 서버 구동**
(생략)

## **1. TCP 방식 MySQL 연결 설정 및 .gitignore**
app.py 와 같은 경로에 config.py 파일을 만들어준다.  
여기에 DB 의 정보를 딕셔너리로 작성해줄것임.  
<pre>
  <code>
    DBINFO = {  
      'user'     : 'root(연결할계정이름)',  
      'password' : 'mysql의 비밀번호',  
      'host'     : '49.50.165.150(mysql이 구동중인   호스트 ip주소)',  
      'port'     : '3306(작동중인 포트)',  
      'database' : 'semicolondb  (접근할데이터베이스==스키마 이름)'  
    }
  </code>
</pre>
이렇게 작성했음.  

이 정보들(특히 비밀번호)은 github에 한번 올라가는 순간 끝난다고 함. 삭제하거나, 이전버전으로 되돌리거나, 심지어 history를 지워도 어떻게든 접근할 수 있다고 함.  
따라서 .gitignore (github에 올라가지않도록 관리) 해줘야함.  

config.py 와 같은 경로에 .gitignore 라는 파일을 만든다(확장자없음)  
그리고 그냥 config.py 라고 쓰고 저장해주면 끝이다.  
이 작업은 git add . (스테이징) 이전에 반드시 수행되어야 함.  
## **서비스 전체가 무너져 내릴 수 있는 중요한 부분이므로 이부분 각별히 주의 !**  
<br>  

## **2. pymysql 을 이용한 DB 연결**  
pymysql 은 외장 모듈이므로 설치해주어야 한다.  
poetry add pymysql 로 간단하게 가상환경에 추가한다.  
또는 pyproject.toml 파일에 이미 팀원이 추가해뒀는지 확인해본다.  
<br>  
blueprints 폴더에 dbExample1.py 를 추가한다.  
app.py 에 라우터 등록.  
코드와 주석 Github 예제 참고.  
실행 결과. 221008 기준 store 테이블에 레코드 3개를 불러왔다.
![](img/4.jpg)  
<br>  

## **3. DAO와 DTO를 활용한 객체지향 테크닉**  

<br>  

## **4. Flask 의 ORM, SQLAlchemy **  

<br>  

... 계속