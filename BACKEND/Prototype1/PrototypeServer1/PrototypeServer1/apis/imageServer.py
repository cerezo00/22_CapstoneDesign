from flask import send_file
from flask_restx import Resource, Namespace, abort
import os.path

api = Namespace('imageServer', description="이미지 파일 다운로드") 

@api.route('/<int:storeId>/<string:fileId>')
class ImageServer(Resource):
  def get(self, storeId, fileId): # 매장로고는 logo.jpg, 메뉴는 메뉴id.jpg -> 확장자는 jpg통일할것.
    '''파일Id의 경우, 매장 로고 일때는 logo, 메뉴 이미지일때는 메뉴Id 입력'''
    fileName = f'./static/{storeId}/{fileId}.jpg'

    if os.path.exists(fileName):
      return send_file(fileName)
    else:
      return abort(404, "해당하는 이미지가 존재하지 않습니다.")
