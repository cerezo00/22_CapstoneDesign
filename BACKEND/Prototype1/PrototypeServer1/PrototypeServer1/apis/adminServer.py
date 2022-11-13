import os
from flask_restx import Resource, Namespace, abort, fields
from werkzeug.datastructures import FileStorage
from flask import request, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import json
from prototypeserver1.model import db
from prototypeserver1.service.auth import *
from prototypeserver1.config import STORAGE_PATH


api = Namespace('AdminServer', description="사업자 매장 메뉴 관리 서버") 

base_path = STORAGE_PATH
# 파일 저장을 위한 경로 지정.

@api.route('/login')
class Login(Resource):
  formLogin = api.parser()
  formLogin.add_argument('name', location='json', type=str, required=True)
  formLogin.add_argument('password', location='json', type=str, required=True)
  @api.expect(formLogin, validate=True)
  def post(self): 
    '''로그인 요청''' 

    # # 로그인 시도 횟수 제한 처리 <보류>
    # if not session.get('attempt'):
    #   session['attempt'] = 5
    # attempt = session.get('attempt')
    # attempt -= 1
    # if attempt == 0:
    #   return abort(403, 'Blocked')
    # session['attempt'] = attempt
    # ... 세션 타임아웃 등 설정필요(영구세션이 아닌경우, 브라우저 닫으면 초기화), 더 고민필요.

    args = Login.formLogin.parse_args()
    name = args['name']
    password = args['password']
    print(name)

    account = db.execute('''SELECT id, name, password
                            FROM foodservice.store_manager
                            WHERE name = :name
                            ;''', { 'name' : name }).fetchone() # SQL INJECTION 방어에 대해 더 깊이 알아볼것.
                            
    if account == None: # 이름이 존재하지 않는 경우
      return "Incorrect User Name or Password" ,  401

    if check_password_hash(account.password, password): # 로그인 성공
      result = db.execute('''
                  SELECT store_id
                  FROM foodservice.`store-store_manager-map`
                  WHERE store_manager_id = :id
                  ;''', { 'id' : account.id}).fetchone() # 1대1 매핑일때만 가능
      store_id = result.store_id
      # JWT 생성 및 등록절차      
      access_token = create_access_token(identity = store_id) # 현재 어드민 : 가게, 1대1 구조를 가정하여 가게 ID를 토큰에저장.
      
      response = jsonify( { 'msg' : 'Login Successed' } )
      set_access_cookies(response=response, encoded_access_token=access_token) # 브라우저 쿠키에 jwt 등록

      return response # JWT 발급.
    else: # 비밀번호 불일치
      return "Incorrect User Name or Password" ,  401
    

# 가게 정보 (가게이름 등) 관리 API도 필요할듯?

##

@api.route('/category')
class Category(Resource): 
  def get(self):
    '''매장의 카테고리 조회 Under development'''
    return 0

  formPostCategory = api.parser()
  formPostCategory.add_argument('categoryName', location='json', type=str, required=True)
  @jwt_required()
  @api.expect(formPostCategory)
  def post(self):
    '''신규 카테고리 등록'''
    store_id = get_jwt_identity() # get store_manger id

    args = Category.formPostCategory.parse_args()
    categoryName = args['categoryName']

    db.execute('''
      INSERT INTO foodservice.`category`(name)
      VALUES (:category_name);

      INSERT INTO foodservice.`store-category-map`(store_id, category_id)
      VALUES (:sid, ( LAST_INSERT_ID() ));
      ''', 
      {
        'category_name' : categoryName,
        'sid' : store_id,
      }
    )
    db.commit()

    # 다양한 예외 상황에 대한 처리필요.

    return f'''{categoryName} 등록되었습니다.''', 201

  formPatchCategory = api.parser()
  formPatchCategory.add_argument('categoryKey', location='json', type=int, required=True)
  formPatchCategory.add_argument('categoryName', location='json', type=str, required=True)
  @jwt_required()
  @api.expect(formPatchCategory)
  def patch(self):
    '''기존 카테고리 이름 변경'''
    store_id = get_jwt_identity() # get store_manger id

    args = Category.formPatchCategory.parse_args()
    category_id = args['categoryKey']
    categoryName = args['categoryName']

    ## 중복되는 서비스 로직 모듈화 할것.
    storeIdCheck = db.execute('''
                      SELECT store_id
                      FROM foodservice.`store-category-map`
                      WHERE category_id = (:input_category_id);
                    ''',
                    {
                      'input_category_id' : category_id      
                    }
                    ).fetchone()

    if storeIdCheck == None:
      return "Not Found", 404 # 존재하지 않는 카테고리를 수정하려고 시도한 경우.
    if storeIdCheck.store_id != store_id:
      return "Forbidden" , 403 # 다른 매장의 카테고리를 수정하려고 시도한 경우.
    ##

    db.execute('''
      UPDATE foodservice.`category`
      SET name = (:category_name)
      WHERE id = (:category_id);
      ''', 
      {
        'category_name' : categoryName,
        'category_id' : category_id,
      }
    )
    db.commit()

    # 다양한 예외 상황에 대한 처리필요.

    return f'''{categoryName} (으)로 수정되었습니다.''', 201

  @jwt_required()
  def delete(self):
    '''카테고리 삭제 Under Development'''
    return 0
##
  

# 메뉴 이미지 등이 필수로 입력되지 않는 경우들에 대한 처리도 해야함.
@api.route('/menu')
class Menu(Resource): 
  @jwt_required()
  def get():
    '''매장의 메뉴 조회 Under Development'''
    return 0

  formPostMenu = api.parser()
  formPostMenu.add_argument('categoryKey', location='form', type=int, required=True)
  formPostMenu.add_argument('menuName', location='form', type=str, required=True)
  formPostMenu.add_argument('menuDescription', location='form', type=str, required=True)
  formPostMenu.add_argument('menuImage', location='files', type=FileStorage, required=True)
  @jwt_required()
  @api.expect(formPostMenu)
  @api.doc(responses={201: '등록 완료'})
  @api.doc(responses={403: 'Forbidden'})
  @api.doc(responses={404: 'Not found'})
  @api.doc(responses={500: 'DB Error, File Upload Error'})
  def post(self):
    '''신규 메뉴 등록 (사진 필수, JPG 포맷만 가능)'''
    store_id = get_jwt_identity() # get store_manger id
    
    args = Menu.formPostMenu.parse_args()
    category_id = args['categoryKey']
    menuName = args['menuName']
    menuDescription = args['menuDescription']
    menuImage = args['menuImage']
    fileType = menuImage.content_type

    if fileType != 'image/jpg' and fileType != 'image/jpeg': # 잘못된 파일 업로드 처리
      return "Only JPG, JPEG file can be uploaded" , 403
    
    # 업로드 파일 최대크기 제한은 app.py 에 설정되어있음.

    ## 중복되는 서비스 로직 모듈화 할것.
    storeIdCheck = db.execute('''
                      SELECT store_id
                      FROM foodservice.`store-category-map`
                      WHERE category_id = (:input_category_id);
                    ''',
                    {
                      'input_category_id' : category_id      
                    }
                    ).fetchone()

    if storeIdCheck == None:
      return "Not Found", 404 # 존재하지 않는 매장의 카테고리에 메뉴를 등록하려고 시도한 경우.
    if storeIdCheck.store_id != store_id:
      return "Forbidden" , 403 # 다른 매장의 카테고리를 수정하려고 시도한 경우.
    ## 

    try:
      menu_id = db.execute('''
        INSERT INTO foodservice.`menu`(name, description)
        VALUES (:menu_name, :menu_description);                                            
        ''', 
        {
          'menu_name' : menuName,
          'menu_description' : menuDescription,
        }
      ).lastrowid

      db.execute('''
        INSERT INTO foodservice.`category-menu-map`(category_id, menu_id)
        VALUES (:cid, :mid);
        ''', 
        {
          'cid' : category_id,
          'mid' : menu_id,
        }
      )
    except:
      return "DB Error", 500

    try:
      # filename = secure_filename(file.filename)  # secure_filname: 유저에게 입력받은 이름을 그대로 사용할때, File Upload 취약점 방지
      save_path = base_path + f"{store_id}/"
      os.makedirs(save_path, exist_ok=True)  #존재하지않는 경로의 폴더 자동생성 허용
      menuImage.save(os.path.join(save_path, f"{menu_id}.jpg") ) # 파일경로 주의해서 볼것.
    except:
      return "File Upload Error", 500

    db.commit()
    return f"{menuName} 등록 완료", 201

  formPatchMenu = api.parser()
  formPatchMenu.add_argument('menuKey', location='form', type=int, required=True)
  formPatchMenu.add_argument('menuName', location='form', type=str, required=True)
  formPatchMenu.add_argument('menuDescription', location='form', type=str, required=True)
  formPatchMenu.add_argument('menuImage', location='files', type=FileStorage)
  @jwt_required()
  @api.expect(formPatchMenu)
  def patch(self):
    '''기존 메뉴 정보 수정'''
    store_id = get_jwt_identity() # get store_manger id
    
    args = Menu.formPatchMenu.parse_args()
    menuID = args['menuKey']
    menuName = args['menuName']
    menuDescription = args['menuDescription']
    menuImage = args['menuImage']

    if menuImage != None:
      fileType = menuImage.content_type
      if fileType != 'image/jpg' and fileType != 'image/jpeg': # 잘못된 파일 업로드 처리
        return "Only JPG, JPEG file can be uploaded" , 403
    
    # 업로드 파일 최대크기 제한은 app.py 에 설정되어있음.

    ## 권한 검사
    categoryIdCheck = db.execute('''
      SELECT category_id
      FROM foodservice.`category-menu-map`
      WHERE menu_id = :menuID
      ;
    ''',
    {
      'menuID' : menuID      
    }
    ).fetchone()

    if categoryIdCheck == None:
      return "Not Found", 404 # 존재하지 않는 카테고리의 메뉴를 수정하려고 시도한 경우.
    
    categoryID = categoryIdCheck.category_id
    storeIdCheck = db.execute('''
      SELECT store_id
      FROM foodservice.`store-category-map`
      WHERE category_id = :categoryID
      ;
    ''',
    {
      'categoryID' : categoryID    
    }
    ).fetchone()
    
    if storeIdCheck == None:
      return "Not Found", 404 # 존재하지 않는 매장
    if storeIdCheck.store_id != store_id:
      return "Forbidden" , 403 # 다른 매장의 카테고리를 수정하려고 시도한 경우.
    ## 권한 검사 끝


    try:
      db.execute('''
        UPDATE foodservice.`menu`
        SET name = :menu_name, description = :menu_description
        WHERE id = :menuID                                       
        ''', 
        {
          'menuID' : menuID,
          'menu_name' : menuName,
          'menu_description' : menuDescription,
        }
      )
    except:
      return "DB Error", 500

    if menuImage != None:
      try:
        save_path = base_path + f"{store_id}/"
        os.makedirs(save_path, exist_ok=True)  #존재하지않는 경로의 폴더 자동생성 허용
        menuImage.save(os.path.join(save_path, f"{menuID}.jpg") ) # 파일경로 주의해서 볼것.
      except:
        return "File Upload Error", 500

    db.commit()
    return f"{menuName} 수정 완료", 201

  @jwt_required()
  def delete(self):
    '''메뉴 삭제 Under Development'''
    return 0


@api.route('/tag')
class Tag(Resource): 
  @jwt_required()
  def get(self):
    '''매장의 태그 조회 Under Development'''
    return 0

  formPostTag = api.parser()
  formPostTag.add_argument('tagName', location='json', type=str, required=True)
  @jwt_required()
  @api.expect(formPostTag)
  def post(self):
    '''매장에 신규 태그 추가'''
    store_id = get_jwt_identity() # get store_manger id
    
    args = Tag.formPostTag.parse_args()
    tagName = args['tagName']

    try:
      db.execute('''
        INSERT INTO foodservice.`tag`(name)
        VALUES (:tag_name);   

        INSERT INTO foodservice.`store-tag-map`
        VALUES store_id = :storeID, tag_id = LAST_INSERT_ID() ;
        ''', 
        {
          'tag_name' : tagName,
          'storeID' : store_id,
        }
      )
    except:
      return "DB Error", 500

    db.commit()
    return f"{tagName} 등록 완료", 201


  @jwt_required()
  def patch(self):
    '''기존 태그 이름 수정 Under Development'''
    return 0

  @jwt_required()
  def delete(self):
    '''태그 삭제 Under Development'''
    return 0

@api.route('/tagging')
class Tagging(Resource): 

  formPostTagging = api.parser()
  formPostTagging.add_argument('menuID', location='json', type=int, required=True)
  formPostTagging.add_argument('tagID',  location='json', type=int, required=True) # 여러개의 태그를 한번에 입력받아 처리하는 기능도 필요.
  @jwt_required()
  @api.expect(formPostTagging)
  def post(self):
    '''기존 메뉴에 태그를 새로 연결'''
    store_id = get_jwt_identity() # get store_manger id

    args = Tagging.formPostTagging.parse_args()
    menuID = args['menuID']
    tagID = args['tagID']

    ## 중복되는 서비스 로직 모듈화 할것.
    try:
      menuCheck = db.execute('''
        SELECT store_id
        FROM foodservice.`store-category-map`
        JOIN (SELECT category_id as cid
            FROM foodservice.`category-menu-map`
            WHERE menu_id = :menuID) as v1
        ON v1.cid = category_id
        ;
      ''',
      {
        'menuID' : menuID      
      }
      ).fetchone()
    except:
      return "DB Error", 500 # 아마도 존재하지 않는 메뉴ID 이거나..

    if menuCheck == None:
      return "Not Found", 404 # 존재하지 않는 매장의 태그 조작 시도.
    if menuCheck.store_id != store_id:
      return "Forbidden" , 403 # 다른 매장의 정보를 수정하려고 시도.

    tagCheck = db.execute('''
      SELECT store_id
      FROM foodservice.`store-tag-map`
      WHERE tag_id = (:tagID);
    ''',
    {
      'tagID' : tagID      
    }
    ).fetchone()

    if tagCheck == None:
      return "Not Found", 404 # 존재하지 않는 매장의 태그 조작 시도.
    if tagCheck.store_id != store_id:
      return "Forbidden" , 403 # 다른 매장의 정보를 수정하려고 시도.
    ## 

    try:
      db.execute('''
        INSERT INTO foodservice.`menu-tag-map`(menu_id, tag_id)
        VALUES (:menuID, :tagID);                                            
        ''', 
        {
          'menuID' : menuID,
          'tagID'  : tagID,
        }
      )
    except:
      return "DB Error", 500

    db.commit()
    return f"태그 연결 완료", 201

  @jwt_required()
  def delete(self):
    '''기존 메뉴에 연결된 태그를 삭제(연결해제) Under Development'''
    return 0

@api.route('/optionMenu')
class OptionMenu(Resource): 
  def get(self):
    '''해당 메뉴의 옵션 메뉴 조회 Under Development'''
    return 0
  
  def post(self):
    '''메뉴에 신규 옵션 메뉴 추가 Under Development'''
    return 0

  def patch(self):
    '''기존 옵션 메뉴 정보 수정 Under Development'''
    return 0
  
  def delete(self):
    '''옵션 메뉴 삭제 Under Development'''
    return 0