# predict.py
import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from tensorflow.keras.models import load_model

# Load the pre-trained models
nn_model_temp_rainfall = load_model('./Models/temp_rainfall_model.h5')
nn_model_year = load_model('./Models/year_model.h5')

# Load the scaler and encoder, assuming they were fit during the training
scaler = StandardScaler()
encoder = OneHotEncoder()

# Load the dataset for consistent preprocessing (adapt as needed)
yield_df = pd.read_csv('./Models/yield_df.csv')
numerical_features = ['hg/ha_yield', 'yield_squared', 'yield_log', 'yield_temp_interaction']
categorical_features = ['Item']

# Fit scaler and encoder on original data
scaler.fit(yield_df[numerical_features])
encoder.fit(yield_df[categorical_features])

# Prediction function for new input using Neural Network
def predict_year_temperature_humidity_nn(crop, yield_value):
    yield_squared = yield_value ** 2
    yield_log = np.log1p(yield_value)
    yield_temp_interaction = yield_value * np.mean(yield_df['avg_temp'])  # Example interaction term

    input_data = pd.DataFrame({
        'hg/ha_yield': [yield_value],
        'yield_squared': [yield_squared],
        'yield_log': [yield_log],
        'yield_temp_interaction': [yield_temp_interaction],
        'Item': [crop]
    })

    # Preprocess input data
    input_data[numerical_features] = scaler.transform(input_data[numerical_features])
    input_encoded = encoder.transform(input_data[categorical_features]).toarray()
    input_combined = np.hstack([input_data[numerical_features].values, input_encoded])

    # Predict using the loaded models
    prediction_temp_rainfall = nn_model_temp_rainfall.predict(input_combined)
    prediction_year = nn_model_year.predict(input_combined)

    predicted_temp = prediction_temp_rainfall[0][0]
    predicted_rainfall = prediction_temp_rainfall[0][1]
    predicted_year = prediction_year[0][0]

    return predicted_year, predicted_temp, predicted_rainfall
