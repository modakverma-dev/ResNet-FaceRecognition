# Use official Python 3.10 slim image (ARM-compatible)
FROM python:3.10-slim

# Prevent Python from writing pyc files & enable unbuffered logs
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies for dlib & OpenCV
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    libopenblas-dev \
    liblapack-dev \
    libx11-dev \
    libgtk-3-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip setuptools wheel

# Copy requirements first (for Docker layer caching)
COPY requirements.txt .

# Force source build of dlib (CRITICAL)
RUN pip install --no-binary=dlib dlib

# Install remaining dependencies
RUN pip install -r requirements.txt

# Copy project files
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
