from flask import Flask, request,jsonify
from insertData import rangeWaist,insertData
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins='http://localhost:3000')

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/range', methods=['POST'])
def range():
    height = request.form.get('height')
    weight = request.form.get('weight')
    age = request.form.get('age')
    print(height,weight,age)
    data=[height,weight,age]
    result=rangeWaist(data)
    print("result",result)
    data = {
        'Max': max(result),
        'Min': min(result)
        
    }
    return jsonify(data)
    
    # return f'{result[0],result[1]}'
@app.route('/insert', methods=['POST'])
def insert():
    height = request.form.get('height')
    weight = request.form.get('weight')
    age = request.form.get('age')
    waist=request.form.get('waist')
    data=[height,weight,age,waist]
    result=insertData(data)
    # print(result,type(result),"check")
    
    return f'{result}'



if __name__ == '__main__':
    app.run(debug=True,port=4000)
