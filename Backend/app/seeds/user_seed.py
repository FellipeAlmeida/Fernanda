from app.models.user_model import User
from app.database.database import SessionLocal

def cria_usuario():
    db = SessionLocal()
    admin_existe = db.query(User).filter(User.email == "admin@email.com").first()

    if admin_existe:
        db.close()
        return
    
    admin = User(
        nome='Fellipe',
        email='admin@email.com',
        senha="scrypt:32768:8:1$J9T415Att1i6g6Kc$b95ebee4bb2285366ad8fcfea98be1795a637abb2e708be1ddc3a85e8f81486862b31cd9c865a1a96923a89334c234e7961d36ee0ade07765a06cf79e48b5f20",
        ativo=True,
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)