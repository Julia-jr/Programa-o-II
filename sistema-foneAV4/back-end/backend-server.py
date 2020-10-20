from config import *
from models import Headset


@app.route('/get-headsets', methods=['get'])
def get_headsets():
    db_headsets = db.session.query(Headset).all()
    json_headsets = [ headset.json() for headset in db_headsets ]
    response = jsonify(json_headsets)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/create-headsets', methods=['post'])
def create_headset():
    response = jsonify({"status": "201", "result": "ok", "details": "Headset created"})
    data = request.get_json()
    try:
        new_headset = Headset(**data)
        db.session.add(new_headset)
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 

@app.route('/delete-headsets/<int:id>', methods=['DELETE'] )
def delete_headsets(id):
    response = jsonify({"status": "200", "result": "ok", "details": "Headset deleted"})
    try:
        Headset.query.filter(Headset.id == id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"status": "400" , "result": "error", "details": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(debug=True)