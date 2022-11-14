from flask_restx import Api # RestX

from .imageServer import api as imageServer
from .storeServer import api as storeServer
from .adminServer import api as adminServer
from .orderServer import api as orderServer
# from .cookieSet import api as cookieSet

api = Api(
  # 모두 생략가능한 필드들.
  version='1.0', # 서버의 버전 명시
  title="Semicolon API Server", # 서버 이름
  description="", # 설명
  terms_url="", # Terms of Service 페이지의 url 인듯..?
  contact="", # 제작자 email 등을 명시하는데 사용하라고함.
  license="", # 라이센스 명시
  license_url="", # 라이센스 링크 명시
  doc="/api/v1/docs", # Swagger 가 나오는 URL.
  prefix="/api/v1", # 모든 서버의 url prefix가 됨.
) # For RestX. doc=False 를 추가하면 Swagger가 사라짐.(운영환경)


# 여기서 모든 라우터 통합.
api.add_namespace(imageServer, path='/image') # 메인에서 URL을 명시하면 한눈에 관리하기 쉽다.
api.add_namespace(storeServer, path='/store')
api.add_namespace(adminServer, path='/admin')
api.add_namespace(orderServer, path='/order')
# api.add_namespace(cookieSet, path='/storeKeySet')



# http return
# return {body : bodyContent..} , status code , {header : headerContent..}