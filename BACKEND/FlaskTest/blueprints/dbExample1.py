from flask import Blueprint
import pymysql
from config import DBINFO # 아까 만든 db설정정보가 담긴파일의 DBINFO 변수를 가져옴
# python import 언젠가 제대로공부하고 넘어가야할 필요가있을것같음
# poetry run python -m app 으로 실행할것.

blueprint = Blueprint('dbExample1', __name__, url_prefix='/dbExample1/')

@blueprint.route('/store')
def store():
  query = "SELECT * FROM `semicolondb`.`store`;"

  results = dbCall(query)
  print(results)
  htmlString = ""
  for r in results:
    name = r[1]
    contact = r[2]
    imagePath = r[3]
    htmlString += f"<h2>이름: {name} , 연락처: {contact}</h2>"

  return htmlString



def dbCall(query):
  db = pymysql.connect(
    user = DBINFO['user'],
    host = DBINFO['host'],  
    port = DBINFO['port'],
    db = DBINFO['database'],
    password = DBINFO['password'],
    charset = 'utf8'
  ) # 그대로 가져온다.

  curs = db.cursor() # DB 커서 (DB이론에나옴)

  curs.execute(query) # 쿼리실행

  result = curs.fetchall()

  db.commit() # DB를 변경했을시 반영.
  db.close()  # 연결 종료.

  return result
