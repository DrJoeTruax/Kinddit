"""Application settings and configuration helpers."""

from functools import lru_cache
from pydantic import BaseSettings, Field, AnyUrl


class Settings(BaseSettings):
    database_url: AnyUrl = Field(
        "postgresql://app:app@db:5432/app", alias="DATABASE_URL"
    )
    redis_url: AnyUrl | str = Field("redis://redis:6379/0", alias="REDIS_URL")
    minio_endpoint: AnyUrl | str = Field("http://minio:9000", alias="MINIO_ENDPOINT")
    minio_access_key: str = Field("minio", alias="MINIO_ACCESS_KEY")
    minio_secret_key: str = Field("minio123", alias="MINIO_SECRET_KEY")
    opensearch_url: AnyUrl | str = Field("http://search:9200", alias="OPENSEARCH_URL")
    mailhog_url: AnyUrl | str = Field("http://mailhog:8025", alias="MAILHOG_URL")
    jwt_secret: str = Field("dev_only_change_me", alias="JWT_SECRET")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache
def get_settings() -> Settings:
    """Return cached settings instance."""

    return Settings()  # type: ignore[arg-type]


__all__ = ["Settings", "get_settings"]
