from . import db

class Store(db.Model):
  __tablename__ = "store"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id: int = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
  name: str = db.Column(db.String(150), nullable=False)
  contact: str = db.Column(db.String(13))

class StoreCategoryMap(db.Model):
  __tablename__ = "store-category-map"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  store_id: int = db.Column(db.Integer, primary_key=True, nullable=False)
  category_id: int = db.Column(db.Integer, primary_key=True, nullable=False)

class Category(db.Model):
  __tablename__ = "category"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id: int = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
  name: str = db.Column(db.String(150), nullable=False)

class CategoryMenuMap(db.Model):
  __tablename__ = "category-menu-map"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  category_id: int = db.Column(db.Integer, primary_key=True, nullable=False)
  menu_id: int = db.Column(db.Integer, primary_key=True, nullable=False)

class Menu(db.Model):
  __tablename__ = "menu"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id: int = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
  name: str = db.Column(db.String(150), nullable=False)
  description: str = db.Column(db.String(300))

class MenuOptionMenuMap(db.Model):
  __tablename__ = "menu-option_menu-map"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  menu_id: int = db.Column(db.Integer, primary_key=True, nullable=False)
  option_menu_id: int = db.Column(db.Integer, primary_key=True, nullable=False)

class OptionMenu(db.Model):
  __tablename__ = "option_menu"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id: int = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
  name: str = db.Column(db.String(150), nullable=False)
  price: int = db.Column(db.Integer, nullable=False)