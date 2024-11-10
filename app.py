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
    print("response >>>", response)
    main_ingredient = response['choices'][0]['message']['content'].strip()
    print("main >>", main_ingredient)
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
        print("We got the main ingredient >>>", main_ingredient)
        crop = main_ingredient
        yield_value = 0

        predicted_year, predicted_temp, predicted_rainfall = predict_year_temperature_humidity_nn(crop, yield_value)
        print(predicted_year, predicted_temp, predicted_rainfall)
        return jsonify({
            "predicted_year": int(predicted_year.astype(float)),
            "predicted_temperature": round(predicted_temp.astype(float), 2),
            "predicted_rainfall": round(predicted_rainfall.astype(float), 2)
        })
    except Exception as e:
        return f"Error: {str(e)}", 500

@app.route('/generate-image', methods=['POST'])
def generate_image():
    openai.api_key = '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'
    data = request.json
    
    # Ensure prompt is provided
    prompt = data.get('prompt')
    if not prompt:
        return jsonify({'error': 'Missing "prompt" parameter'}), 400

    # Optional: Allow size customization
    size = data.get('size', '1024x1024')

    try:
        # Request image generation
        response = openai.Image.create(
            prompt=prompt,
            n=1,
            size=size
        )

        # Get the image URL
        image_url = response['data'][0]['url']

        # Download the image from the URL
        image_response = requests.get(image_url)
        image = Image.open(BytesIO(image_response.content))

        # Save the image to a buffer
        img_buffer = BytesIO()
        image.save(img_buffer, format='PNG')
        img_buffer.seek(0)

        # Return the image as a response
        return send_file(img_buffer, mimetype='image/png')

    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
