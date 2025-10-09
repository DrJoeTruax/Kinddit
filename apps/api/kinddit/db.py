import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
DB_URL = os.getenv("DATABASE_URL","postgresql://app:app@db:5432/app")
engine = create_engine(DB_URL, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
