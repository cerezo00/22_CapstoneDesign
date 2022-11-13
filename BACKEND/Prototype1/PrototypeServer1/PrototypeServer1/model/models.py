from . import Base
from sqlalchemy import Column, Integer, String

class Store(Base):
  __tablename__ = "store"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
  nam = Column(String(150), nullable=False)
  contact = Column(String(13))

class StoreCategoryMap(Base):
  __tablename__ = "store-category-map"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  store_id = Column(Integer, primary_key=True, nullable=False)
  category_id = Column(Integer, primary_key=True, nullable=False)

class Category(Base):
  __tablename__ = "category"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
  name = Column(String(150), nullable=False)

class CategoryMenuMap(Base):
  __tablename__ = "category-menu-map"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  category_id = Column(Integer, primary_key=True, nullable=False)
  menu_id = Column(Integer, primary_key=True, nullable=False)

class Menu(Base):
  __tablename__ = "menu"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
  name = Column(String(150), nullable=False)
  description = Column(String(300))

class MenuOptionMenuMap(Base):
  __tablename__ = "menu-option_menu-map"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  menu_id = Column(Integer, primary_key=True, nullable=False)
  option_menu_id = Column(Integer, primary_key=True, nullable=False)

class OptionMenu(Base):
  __tablename__ = "option_menu"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
  name = Column(String(150), nullable=False)
  price = Column(Integer, nullable=False)

class StoreManager(Base):
  __tablename__ = "store_manager"
  __table_args__ = {'mysql_collate': 'utf8_general_ci'}

  id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
  name = Column(String(36), nullable=False)
  password = Column(String(400), nullable=False)
  contact = Column(String(13))