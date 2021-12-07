#%%
# -*- coding:utf-8 -*-
from flask import Flask
from flask import request
from flask import render_template
from flask import jsonify
import time,os,sqlite3
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

DATABASE = 'H:/Python/API-Flask/excel/last.sqlite'

app = Flask(__name__, instance_relative_config=True)    #工厂模式

app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

#防止中文被转义
app.config['JSON_AS_ASCII'] = False

test_config=None
if test_config is None:
    # load the instance config, if it exists, when not testing
    app.config.from_pyfile('config.py', silent=True)
else:
    # load the test config if passed in
    app.config.from_mapping(test_config)

# ensure the instance folder exists
try:
    os.makedirs(app.instance_path)
except OSError:
    pass

#首页
@app.route('/')
#@limiter.limit("20 per hour")  #自定义访问速率
def index():
    return render_template("userProfile.html")

@app.route('/ranks', methods=('GET','POST'))
#@limiter.limit("50 per hour")  #自定义访问速率
def ranking():
    sql = 'SELECT * from  data  group by 学号 order by 次数 desc limit 10'
    sqliteDB = sqlite3.connect(DATABASE)
    ranks = ''
    cur = sqliteDB.execute(sql)
    ranks = cur.fetchall()
    #for row in cur.fetchall():
    #    ranks = str(row)
    print(ranks)
    return jsonify(ranks)

#排名
@app.route('/rank', methods=('GET','POST'))
#@limiter.limit("50 per hour")  #自定义访问速率
def rank():
    page = request.args.get('page','')
    page_index = (int(page)-1) * 10
    page = int(page) * 10
    #sql = ('SELECT * from  data  group by 学号 order by 次数 desc limit %d' % page)
    sql = 'SELECT * from  data  group by 学号 order by 次数 desc limit '+ str(page_index) + ',' + str('10')
    print(sql)
    sqliteDB = sqlite3.connect(DATABASE)
    ranks = ''
    cur = sqliteDB.execute(sql)
    ranks = cur.fetchall()
    print(ranks)
    return jsonify(ranks)


#用户数据
@app.route('/userProfile', methods=('GET','POST'))
#@limiter.limit("20 per hour")  #自定义访问速率
def get_profile():
    name = request.args.get('name','')
    number = request.args.get('number','')
    print(name,number)

    if name == '':
        sql = ("SELECT * FROM data WHERE 学号 = %s" % (number))
    if number == '':
        sql = ("SELECT * FROM data WHERE 姓名 = '%s'" % (name))

    try:
        propose = ""
        description = "“早安经贸 不负晨光”晨间锻炼次数查询表（截至2021.5.14）"
        sqliteDB = sqlite3.connect(DATABASE)
        print(sql)
        #sql查询
        cur = sqliteDB.execute(sql)
        for row in cur.fetchall():
            number = str(row[0])
            u_name = str(row[1])
            classes = str(row[2])
            counts = str(row[3])
        sqliteDB.close()
        return {'now_time':time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) , 'class':classes ,'name':u_name,\
            'counts':counts,'number':number,'state_code':'200'\
                ,'description':description}
    except Exception:
        return {'now_time':time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) , 'class':'' ,'name':'',\
            'counts':'','number':'','state_code':'-1'\
                ,'description':description}


if __name__ == "__main__":
    #app.run()
	app.run(host='0.0.0.0',port=8080)
    #app.run(ssl_context=('cn-cd-dx-4.natfrp.cloud+2.pem', 'cn-cd-dx-4.natfrp.cloud+2-key.pem'),host='127.0.0.1',port=443)

# %%
