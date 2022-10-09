
import 문이 상호참조하게 되면 순환 참조 문제 발생.  

__init__.py 파일을 가지고있는 디렉토리는 패키지가 됨.(다른 방식으로도 패키지는 만들 수 있다고 함.)  

모듈이란  
하나의 .py 파일이다. import 모듈 할때는 .py 부분만 빼고 작성하면 된다.  

import 패키지  
하면, __init__.py 만 가져옴.  
패키지는 여러 개의 모듈을 가지고 있는 것.  
패키지는 여러 개의 패키지를 가지고 있을 수도 있다.  


from package import module  
from package.package.module import (class or function or variable)
from module import (class or function or variable)  
import module  
이 방식을 약속하고 사용하는 것이 좋겠다.  
크기순 정렬: package > module > class, function, variable
쉽게 암기하는 법 : import 뒤에는 최대 module 까지만 올수있음.  

import module as myName  
파이썬은 이러한 방식들 때문에 이름이 겹쳐서 잘못 참조되는 상황이 꽤 자주 발생하는 것 같음.  
따라서 이렇게 as 를 잘 사용해주는 것이 좋을듯.