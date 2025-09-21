FROM python:3.11-slim

WORKDIR /app

COPY apps/api/pyproject.toml ./pyproject.toml
RUN pip install poetry && poetry config virtualenvs.create false && poetry install --only main --no-interaction --no-ansi

COPY apps/api /app/apps/api

ENV PYTHONPATH=/app

CMD ["uvicorn", "apps.api.main:app", "--host", "0.0.0.0", "--port", "8000"]
