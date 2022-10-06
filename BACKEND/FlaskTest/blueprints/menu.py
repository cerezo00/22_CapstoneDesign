from flask import Blueprint  # 내장 모듈을 import 한다.

blueprint = Blueprint('menu', __name__, url_prefix='/menu/')

# blueprint : 변수 이름은 자유.
# menu : 이 블루프린트의 이름.
# __name__ : "menu"    -> 파일 이름임.
# url_prefix : 이 파일내의 라우팅함수들은 명시하지 않아도 기본적으로 /menu/ 로 시작한다.


@blueprint.route('/apple')
def apple(): # 함수이름은 URL과 일치해야할 필요없음!
    return '<h1 style="color:#ff0000;">Apple !<h1>'

@blueprint.route('/pizza')
def pizza(): 
    return "<h1>Pizza !<h1>"

@blueprint.route('/coffee')
def coffee(): # 함수이름은 URL과 일치해야할 필요없음!
    return "Coffee !"