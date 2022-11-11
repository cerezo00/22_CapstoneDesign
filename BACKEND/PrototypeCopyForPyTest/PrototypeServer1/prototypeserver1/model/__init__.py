from pymysql.constants.CLIENT import MULTI_STATEMENTS

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

from prototypeserver1.config import DBINFO, DBURI, secret_key 


engine = create_engine(DBURI, connect_args={"client_flag": MULTI_STATEMENTS}) # multiple queries at once

db = scoped_session(sessionmaker(autocommit=False,
                                  autoflush=False,
                                  bind=engine))
                                         
#scoped_session : 전역변수로 세션하나를 두고 관리 ? for Thread Safe 라고하는데, 모든요청에 대해 세션을 닫는게 안전하고 권장된다고 함.
# 비동기처리를 위한 async_scoped_session 도 있음
Base = declarative_base()
Base.query = db.query_property()