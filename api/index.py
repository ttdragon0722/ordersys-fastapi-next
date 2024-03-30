from fastapi import FastAPI,Request
from json import load,loads

app = FastAPI()

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World"}

@app.get("/api/getSourceData")
def getSourceData():
    with open("api/source/db.json","r",encoding="utf-8") as f:
        data = load(f)
    return data

@app.post("/api/saveData")
async def saveData(request:Request):
    data = await request.body()
    data_str = data.decode("utf-8")
    with open("api/source/db.json", "w", encoding="utf-8") as f:
        f.write(data_str)
