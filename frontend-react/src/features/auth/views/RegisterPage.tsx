import React, { useState } from 'react';

// Definimos la interfaz para los errores del backend
interface BackendError {
  message: string;
}

const RegisterPage: React.FC = () => {
  // 1. Estado del formulario
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  // 2. Estados de UI (Críticos para UX y QA)
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      setIsSuccess(true);
      console.log('Usuario registrado:', data);
    } catch (error) {
      const err = error as Error;
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container" style={{ maxWidth: '400px', margin: 'auto' }}>
      <h1>Crear cuenta en CrochetLab</h1>
      
      {isSuccess && (
        <div data-testid="success-message" style={{ color: 'green' }}>
          ¡Registro exitoso! Ya puedes iniciar sesión.
        </div>
      )}

      <form onSubmit={handleSubmit} data-testid="register-form">
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            data-testid="input-username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            data-testid="input-email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            data-testid="input-password"
          />
        </div>

        {errorMessage && (
          <p data-testid="error-message" style={{ color: 'red' }}>
            {errorMessage}
          </p>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          data-testid="btn-register-submit"
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;