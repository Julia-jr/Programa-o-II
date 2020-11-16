import os
from models import Headset, Embalagem, Microfone
from config import db, db_file


if __name__ == '__main__':
    if os.path.exists(db_file):
        os.remove(db_file)

    db.create_all()

    h1 = Headset(marca ='Hyper X',
                led ='red',
                cor ='black',
                modelo ='Cloud Stinger')
    h2 = Headset(marca ='Logitech',
                led ='red',
                cor ='black',
                modelo ='fone da cristina')
    h3 = Headset(marca ='Razer',
                led ='green',
                cor ='black',
                modelo ='fone que vou ter quando for rica')
    h4 = Headset(marca ='Razer',
                led ='rgb',
                cor ='pink',
                modelo ='vou dar de presente pra cristina')
    h5 = Headset(marca ='Multilaser',
                led ='null',
                cor ='black',
                modelo ='basic')
    
    db.session.add(h1)
    db.session.add(h2)
    db.session.commit()
    
    #print(h1)
    #print(h2)
    #print(h2.json())

    e1 = Embalagem(material = "papel",
                   cor = "cor de papelão", 
                   headset = h1)

    m1 = Microfone(led = "azul",
                   decibeis = "666",
                   headset = h1)
    
    db.session.add(e1)
    db.session.add(m1)
    db.session.commit()


    print(e1)
    print(m1)
    print(e1.json())
    print(e1.json())
    