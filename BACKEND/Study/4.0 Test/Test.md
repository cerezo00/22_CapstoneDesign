# Test

Unittest (70), Integration Test (20), UI/End-to-End/Scenario Test(10)

pytest

**Python 의 테스트 자동화 프레임워크**  
unittest : 내장 라이브러리  
pytest 
<br>  

**Flask + pytest**  
Flask 의 Application Factory 기법은 사용 불가능 하다고 판정함.  
공식문서에서 제공하는 명령어들이 애초에 작동하지 않음.  
결국 수작업으로 순환참조 문제를 해결하고 프로젝트 구조를 맞춤형으로 짜둔 환경에서 pytest를 사용하여 End-to-End 테스트를 하려고 하니, 자동화에 어려움이 있음.  
대표적으로 Test 전용 DB를 사용하도록 test code에서 명시해주는 것이 불가능.  
결론 : 장난감을 만드는것이 아닌 상용 소프트웨어를 제작하려는 목적으로는 가장 보수적인 관점에서 프레임워크를 선택하라.  
테스트는 매번 config의 DBURL 변수를 수정해주는 것으로 할수는 있겠다.  
-> 일종의 싱글톤 기법을 사용하여 해결한다.  
파이썬의 import구문 동작 방식에 대해 정확하게 이해하고, import 하여 가져온 객체가 참조인지 복사인지, 런타임에 메모리상에 얼마나 유지되는지 등을  
정확히 이해하고 사용한다.  