# last-bite

To run the React App

run commands

```
cd last-bite
npm start
```


To start the python server
```
pip install -r requirements.txt
py app.py
```

CURL Requests that can be doene:

1. curl -X POST -d "dish_name=bread" http://127.0.0.1:5000/list-ingredients

2. curl -X POST -d "dish_name=bread" http://127.0.0.1:5000/predict

3. curl -X POST -d "dish_name=bread" http://127.0.0.1:5000/generate-image

4. curl -X POST -d "ingredient=tomato" http://127.0.0.1:5000/generate-image

5. curl -X POST -d "ingredient=rice" -d "dish_name=egg fried rice" http://127.0.0.1:5000/replacement-ingredient