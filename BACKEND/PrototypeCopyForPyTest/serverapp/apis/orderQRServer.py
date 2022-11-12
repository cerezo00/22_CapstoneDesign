from flask_restx import Resource, Namespace
from flask import request

api = Namespace('QR code', description="작성완료된 주문의 QR코드 제공") 


@api.route('/<int:optionMenuId>')
class orderQRMake(Resource):
  def get(self): 
    '''  '''
    return 1






