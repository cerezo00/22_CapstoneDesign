

DBINFO = {
  'user'     : 'root',

  'password' : 'c2VtaWNvbG9u',
  'host'     : '34.64.105.72', # 로컬에 위치한 경우 127.0.0.1 로 하면 성능이 더 좋아지나?

  'port'     :  3306,
  'database' : 'foodservice', 
}

# FOR LOCAL TEST
# DBINFO = {
#   'user'     : 'test',
#   'password' : '1qazxsw23edcvfr4', # for local test
#   'host'     : '127.0.0.1', # for local test
#   'port'     :  3306,
#   'database' : 'foodservice', 
# }

DBURI = f"mysql+pymysql://{DBINFO['user']}:{DBINFO['password']}@{DBINFO['host']}:{DBINFO['port']}/{DBINFO['database']}"


STORAGE_PATH = "./static/"  
TEST_STORAGE_PATH = "./tests/static/" 

secret_key = "a12m3dk2osmzzos29c38djv8fh2hd8"


# 스타벅스 계정 비밀번호 : ch7mxs@1a0@aq8