from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
import os
from .models import Base
config = context.config
if config.config_file_name: fileConfig(config.config_file_name)
target_metadata = Base.metadata
DB_URL = os.getenv("DATABASE_URL","postgresql://app:app@db:5432/app")
def run_migrations_offline():
    context.configure(url=DB_URL, target_metadata=target_metadata, literal_binds=True)
    with context.begin_transaction(): context.run_migrations()
def run_migrations_online():
    connectable = engine_from_config({"sqlalchemy.url": DB_URL}, prefix="sqlalchemy.", poolclass=pool.NullPool)
    with connectable.connect() as conn:
        context.configure(connection=conn, target_metadata=target_metadata)
        with context.begin_transaction(): context.run_migrations()
if context.is_offline_mode(): run_migrations_offline()
else: run_migrations_online()
