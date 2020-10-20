from config import *

class Headset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    led = db.Column(db.String(254))
    modelo = db.Column(db.String(254))    

    def __str__(self):
        return f'''
                - headset({self.id}) 
                - marca: {self.marca} 
                - cor: {self.cor} 
                - led: {self.led}
                - modelo: {self.modelo}
                '''
    
    def json(self):
        return ({
            "id": self.id,
            "marca": self.marca,
            "cor": self.cor,
            "led": self.led,
            "modelo": self.modelo,
        })

