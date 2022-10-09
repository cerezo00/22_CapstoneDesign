from . import db
class Test(db.Model):
  __tablename__ = "test"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id: int = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
  name: str = db.Column(db.String(45), nullable=False)


