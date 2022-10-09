# 배포 테스트 용 샘플 프로젝트 디렉토리  

**0. 3번까지는 도커 우분투 컨테이너를 이용하여 수동으로 작업. nginx+React , gunicorn+Flask 가 각자 다른 컨테이너여야 함에 주의.**
**1. 리액트앱(ReactTest) 을 만들고 nginx 를 이용하여 배포**  
OK
**2. gunicorn 과 Flask앱을 추가하여 연결**  
컨테이너간 통신이 복잡해서, nginx 컨테이너를 내리고 일단 80포트로 gunicorn 배포 테스트 부터.(docs페이지로 확인)  
**3. MySQL 컨테이너 추가 연결**
**4. Dockerfile로 각 컨테이너 자동화**
**5. Docker Compose 를 이용하여 전체 컨테이너를 단일 서비스화.**  