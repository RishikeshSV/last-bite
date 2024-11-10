from flask import Flask, request
import openai

app = Flask(__name__)

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

    Main Ingredient(s):"""

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",  # Use "gpt-4" if available and you have access
        messages=[
            {"role": "system", "content": "You are a helpful assistant for identifying ingredients."},
            {"role": "user", "content": prompt}
        ]
    )

    main_ingredient = response['choices'][0]['message']['content'].strip()
    return main_ingredient

@app.route('/get_ingredient', methods=['POST'])
def get_ingredient():
    # Accept dish name via form data
    dish_name = request.form.get('dish_name', '').strip()

    # Input validation
    if not dish_name:
        return "Error: Dish name is required.", 400

    try:
        main_ingredient = find_ingredient(dish_name)
        return f"The main ingredient(s) for {dish_name}: {main_ingredient}"
    except Exception as e:
        return f"Error: {str(e)}", 500

if __name__ == '__main__':
    app.run(debug=True)
