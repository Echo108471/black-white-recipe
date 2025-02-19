# Demo Backend

## Setup

```sh
python3 -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
```

## Running
```sh
uvicorn main:app
python -m app.writeDb
```

## Routes Docs
http://127.0.0.1:8000/docs
