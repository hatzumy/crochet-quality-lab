import pytest
import time
import json

def test_registro_y_verificacion_email(playwright):
    # dirección del servidor
    BASE_URL = "http://127.0.0.1:3000/api"
    
    # Se crea el contexto 
    api_context = playwright.request.new_context()
    
    # Datos únicos para evitar el error de "email duplicado"
    timestamp = str(int(time.time() * 1000))[-6:]
    user_data = {
        "username": f"Tejedora_{timestamp}",
        "email": f"qa_{timestamp}@crochetlab.com",
        "password": "QA_test_2026_!"
    }

    # --- REGISTRO ---
    register_response = api_context.post(
        f"{BASE_URL}/register", 
        data=json.dumps(user_data),
        headers={"Content-Type": "application/json"}
    )

    # Debugging 
    if register_response.status != 201:
        print(f"\nRespuesta del servidor: {register_response.text()}")
    
    assert register_response.status == 201, f"Falló el registro: {register_response.status}"
    
    # Guardamos la respuesta para sacar el token
    register_body = register_response.json()
    assert "token" in register_body, "El backend no devolvió el token"
    token_generado = register_body["token"]

    # --- VERIFICACIÓN POSITIVA ---
    # Usamos la URL completa para no fallar
    verify_response = api_context.get(f"{BASE_URL}/verify-email/{token_generado}")
    
    assert verify_response.status == 200, f"Error en verificación: {verify_response.status}"
    verify_body = verify_response.json()
    assert "exito" in verify_body["message"].lower()

    # --- VERIFICACIÓN NEGATIVA (Seguridad) ---
    verify_again_response = api_context.get(f"{BASE_URL}/verify-email/{token_generado}")
    assert verify_again_response.status == 400, "Vulnerabilidad: El token se usó dos veces"

    # 4. Cerramos la conexión
    api_context.dispose()