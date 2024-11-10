from flask import Flask, request, jsonify, send_file
import openai
from flask_cors import CORS
from predict import predict_year_temperature_humidity_nn  
import requests
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app) 
# Set your OpenAI API key
openai.api_key = 'sk-svcacct-cNpEjHaToqE8f1_oq5mtOav-MW58kAAPPnY2lzO3W3FdX1lTM4-B88AF-DU36xuVT3BlbkFJiYStWmktQpsH4HTId447QBQGCh4jmzqdiyzaD-Lk-hudqrQbinAEXD8tlcRAO9kA'  # Replace with your OpenAI API key

# Predefined available ingredients
available_ingredients = [
    "Maize", "Potatoes", "Rice", "Sorghum",
    "Soybeans", "Wheat", "Cassava", "Sweet potatoes", "Plantains", "Yams"
]

def find_ingredient(dish_name):
    prompt = f"""
    Given a list of available ingredients, determine the main ingredient(s) used to make the following dish.

    Available Ingredients: {", ".join(available_ingredients)}

    Dish: {dish_name}

    Return only the name of the main ingredient without any additional text"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use "gpt-4" if available and you have access
        messages=[
            {"role": "system", "content": "You are a helpful assistant for identifying ingredients."},
            {"role": "user", "content": prompt}
        ]
    )
    main_ingredient = response['choices'][0]['message']['content'].strip()
    return main_ingredient

def find_list_ingredients(dish_name):
    prompt = f"""
    Determine the main ingredient(s) used to make the following dish.

    Dish: {dish_name}

    Return only the list of ingredients without any additional text and within one word"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use "gpt-4" if available and you have access
        messages=[
            {"role": "system", "content": "You are a helpful assistant for identifying ingredients."},
            {"role": "user", "content": prompt}
        ]
    )

    main_ingredient = response['choices'][0]['message']['content'].strip()
    return main_ingredient

def find_replacement_ingredient(dish, ingredient):
    prompt = f"""
    Determine the replacement ingredient(s) used to make the following dish if the following ingredient is extinct or not available.

    Dish: {dish}
    Ingredient: {ingredient}

    Return only the replacement ingredient that can be used without any additional text and within one or two words"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use "gpt-4" if available and you have access
        messages=[
            {"role": "system", "content": "You are a helpful assistant for identifying ingredients."},
            {"role": "user", "content": prompt}
        ]
    )

    replacement_ingredient = response['choices'][0]['message']['content'].strip()
    return replacement_ingredient

def get_fun_fact(ingredient):
    """
    Uses OpenAI to retrieve a fun fact about a given ingredient.
    """
    prompt = f"Provide a funny fact about the ingredient: {ingredient}. Limit it to one sentence"

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a knowledgeable assistant for providing fun facts."},
            {"role": "user", "content": prompt}
        ]
    )

    fun_fact = response['choices'][0]['message']['content'].strip()
    return fun_fact

@app.route('/list-ingredients', methods=['POST'])
def list_ingredients():
    # Accept dish name via form data
    dish_name = request.form.get('dish_name', '').strip()

    # Input validation
    if not dish_name:
        return jsonify({"error": "Dish name is required."}), 400

    try:
        # Assuming find_ingredient returns a list of ingredients
        main_ingredients = find_list_ingredients(dish_name)
        
        # Return ingredients as JSON
        ingredients_list = [ingredient.strip() for ingredient in main_ingredients.split(',')]
        return jsonify({"ingredients": ingredients_list})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/replacement-ingredient', methods=['POST'])
def replacement_ingredient():
    dish_name = request.form.get('dish_name', '').strip()
    ingredient = request.form.get('ingredient', '').strip()

    if not dish_name:
        return jsonify({"error": "Dish name is required."}), 400
    if not ingredient:
        return jsonify({"error": "Ingredient is required."}), 400

    try:
        # Assuming find_replacement_ingredient returns an ingredient
        replacement_ingredient = find_replacement_ingredient(dish_name,ingredient)
        print("We got the replacement ingredient >>>", replacement_ingredient)

        # Return ingredients as JSON
        return jsonify({"replacementIngredient": replacement_ingredient})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    dish_name = request.form.get('dish_name', '').strip()

    if not dish_name:
        return "Error: Dish name is required.", 400

    try:
        main_ingredient = find_ingredient(dish_name)
        crop = main_ingredient
        yield_value = 0

        predicted_year, predicted_temp, predicted_rainfall = predict_year_temperature_humidity_nn(crop, yield_value)
        print(predicted_year, predicted_temp, predicted_rainfall)
        return jsonify({
            "dish": dish_name,
            "main_ingredient": main_ingredient,
            "predicted_year": int(predicted_year.astype(float)),
            "predicted_temperature": round(predicted_temp.astype(float), 2),
            "predicted_rainfall": round(predicted_rainfall.astype(float), 2)
        })
    except Exception as e:
        return f"Error: {str(e)}", 500

@app.route('/generate-image', methods=['POST'])
def generate_image():
    #  Ensure prompt is provided
    ingredient = request.form.get('ingredient', '').strip()

    if not ingredient:
        return jsonify({'error': 'Missing "ingredient" parameter'}), 400

    url = "https://api.freepik.com/v1/ai/text-to-image"

    payload = {
    "prompt": "Crazy dog in the space",
    "negative_prompt": "b&w, earth, cartoon, ugly",
    "guidance_scale": 2,
    "seed": 42,
    "num_images": 1,
    "image": {"size": "square_1_1"},
    "styling": {
        "style": "anime",
        "color": "pastel",
        "lightning": "warm",
        "framing": "portrait"
    }
    }
    headers = {
    "Content-Type": "application/json",
    "x-freepik-api-key": "FPSXcb802234c5cf4c1a85a680749d117169"
    }

    response = requests.request("POST", url, json=payload, headers=headers)

    print(response.text)
    
    return response

@app.route('/get-fun-fact', methods=['POST'])
def get_fun_fact_endpoint():
    dish_name = request.form.get('dish_name', '').strip()

    if not dish_name:
        return jsonify({"error": "Dish name is required."}), 400
    
    answerJson = {}

    try:
        ingredientsList = [ingredient.strip() for ingredient in find_list_ingredients(dish_name).split(',')]
        print(ingredientsList)
        for ingredient in ingredientsList:
            fun_fact = get_fun_fact(ingredient)
            answerJson[ingredient] = fun_fact
        return jsonify(answerJson)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
