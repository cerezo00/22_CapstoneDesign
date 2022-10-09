from dataclasses import dataclass
from . import db

# 이 부분은 자프링 진영에서 도메인, DAO 라고 부르는 개념이 섞여있음.
class Store(db.Model):
  __tablename__ = "store"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id: int = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
  name: str = db.Column(db.String(120), nullable=False)
  contact: str = db.Column(db.String(13))
  image_path: str = db.Column(db.String(500))

# 쿼리 함수를 여기다쓰는건가 라우트함수에다 쓰는건가,,, ???