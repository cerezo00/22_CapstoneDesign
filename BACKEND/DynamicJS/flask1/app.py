from flask import Flask, render_template

app = Flask(__name__)


@app.route('/<string:storeKey>')
def index(storeKey):
  return render_template("dynamicjs.html")




# 서버 실행 로직
if __name__=="__main__":
  app.run(host="127.0.0.1", port="8000", debug=True)
