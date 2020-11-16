from config import *

class Headset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    marca = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    led = db.Column(db.String(254))
    modelo = db.Column(db.String(254))    


    def __str__(self):
        return f'''
                - id({self.id}) 
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
    

class Embalagem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    material = db.Column(db.String(254))
    cor = db.Column(db.String(254))
    headset_id = db.Column(db.Integer, db.ForeignKey(Headset.id), nullable=False)
    headset = db.relationship("Headset")


    def __str__(self): 
        return self.material + ", " + self.cor + \
            ", " + str(self.headset) 


    def json(self):
        return ({
            "id": self.id,
            "material": self.material,
            "cor": self.cor,
            "headset": self.headset.json()
        })

class Microfone(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    led = db.Column(db.String(254))
    decibeis = db.Column(db.String(254))

    microfone_id = db.Column(db.Integer, db.ForeignKey(Headset.id), nullable=False)

    headset = db.relationship("Headset")


    def __str__(self): 
        return self.led + ", " + self.decibeis + \
            ", " + str(self.headset)

    def json(self):
        return {
            "id": self.id,
            "led": self.led,
            "decibeis": self.decibeis,
            "headset": self.headset.json(),
        }