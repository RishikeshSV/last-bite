from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
from predict import predict_year_temperature_humidity_nn  

app = Flask(__name__)
CORS(app) 
# Set your OpenAI API key
openai.api_key = 'sk-svcacct-cNpEjHaToqE8f1_oq5mtOav-MW58kAAPPnY2lzO3W3FdX1lTM4-B88AF-DU36xuVT3BlbkFJiYStWmktQpsH4HTId447QBQGCh4jmzqdiyzaD-Lk-hudqrQbinAEXD8tlcRAO9kA'  # Replace with your OpenAI API key

# Predefined available ingredients
available_ingredients = [
    "maize", "potatoes", "rice", "paddy", "sorghum",
    "soybeans", "wheat", "cassava", "sweet potatoes", "plantains", "yams"
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

    Return only the list of ingredients without any additional text and within one or two words"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use "gpt-4" if available and you have access
        messages=[
            {"role": "system", "content": "You are a helpful assistant for identifying ingredients."},
            {"role": "user", "content": prompt}
        ]
    )

    main_ingredient = response['choices'][0]['message']['content'].strip()
    return main_ingredient

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
        return jsonify({
            "predicted_year": int(predicted_year),
            "predicted_temperature": round(predicted_temp, 2),
            "predicted_rainfall": round(predicted_rainfall, 2)
        })
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
