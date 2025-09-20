from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # Database
    postgres_user: str
    postgres_password: str
    postgres_host: str
    postgres_port: str
    postgres_db: str
    database_url: str

    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000

    # Logging
    log_level: str = "INFO"

    # Application
    app_name: str = "Bank Admin Backend"
    version: str = "1.0.0"
    dev: bool = True

    class Config:
        case_sensitive: bool = False


# Global settings instance
settings = Settings()  # type: ignore  # pyright: ignore[reportCallIssue]