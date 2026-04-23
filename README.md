# CrochetLab - Backend Quality Project

Este proyecto es una plataforma de gestión para artesanos del crochet, desarrollada con un enfoque integral en **Calidad de Software (QA)** y **Seguridad (DevSecOps)**.

## 🚀 Enfoque en Calidad (QA)
Como parte de mi formación en **QA Automation**, este repositorio implementa:

- **Análisis Estático de Código (SAST):** Configuración profesional de **ESLint v9+** (Flat Config) para garantizar un código limpio y mantenible.
- **Seguridad:** Escaneo de vulnerabilidades en dependencias y código fuente mediante **Snyk**.
- **Calidad en la Nube:** Integración con **SonarCloud** para la medición de deuda técnica, bugs y hotspots de seguridad.
- **Validación de Datos:** Uso de esquemas de validación para prevenir inyecciones y errores lógicos.

## 🛠️ Tecnologías
- **Backend:** Node.js, Express.
- **Base de Datos:** MongoDB.
- **Seguridad:** Snyk, ESLint-plugin-security.
- **Calidad:** SonarCloud.

## ⚖️ Licencia
Este proyecto está bajo la **Licencia MIT**. Esto significa que puedes usar el código para fines educativos siempre que se mantenga la autoría original. 
*Nota: Este es un proyecto con fines de aprendizaje y portafolio.

## Inicializacion de proyecto 
- **Backend-node** Desde la carpeta raiz
    cd backend-node
    npm run dev
- **n8n** Desde Backend node 
    - Si no está instalado: npm install -g n8n
    - Si ya está instalado: n8n start
    - Al iniciar n8n se podrá usar la tecla "o" para abrir el panel en el navegador 
## Ejecución de Tests (Unitarios)
- **Desde la raíz del proyecto, entra al backend**
    cd backend-node
- **Instalación (Solo la primera vez)**
    Asegúrate de tener Jest y las dependencias instaladas: npm install
- **Ejecutar el Test de Auth (Esquemas)**
    Ejecutar solo el archivo de esquemas de autenticación: npm test
- **Comandos Útiles Adicionales**
    - Modo Observador
        Para que los tests se ejecuten automáticamente cada vez que se guarde un cambio: npx jest tests/unit/auth.schema.test.js --watch
    - Ver solo Errores
        Si se tiene muchos tests y solo se quiere ver qué falló: npx jest tests/unit/auth.schema.test.js --verbose false 
    - Cobertura: npm test -- --coverage
        Stmts / Lines: Debe estar lo más cerca posible al 100%.
        Uncovered Lines: Dirá exactamente qué números de línea en tu auth.schema.js no han sido tocadas por los tests.


## Inicializacion de Pruebas de integracion en python
Esta sección describe cómo configurar el entorno de pruebas en Python y ejecutar los tests de integración y unitarios.
- **Crear el Entorno Virtual**
    python -m venv venv 
- **Activar el Entorno Virtual**
Dependiendo del sistema operativo:
    - Windows (PowerShell): .\venv\Scripts\Activate.ps1
    - Windows (CMD): venv\Scripts\activate
    - Mac/Linux: source venv/bin/activate
- **Instalar Dependencias**
    pip install pytest playwright allure-pytest
- **Ejecución de Tests**
Los tests se encuentran en la carpeta /tests. Se ejecutan desde la raíz del proyecto. Los test usan timestamps para la generacion de datos 
    - Ejecutar todos los tests: pytest
    - Ejecutar un archivo específico (ej: Autenticación): pytest tests/test_auth.py
    - Ejecutar en modo detallado (Ver logs de i18next):
        Si se quiere ver los mensajes de error en español y los print del JSON: pytest -v -s tests/test_auth.py
- **Reportes de Calidad**
    pytest --html=report.html
- **Mantenimiento del Entorno**
Si se agrega nuevas librerías, se actualiza el archivo de requisitos:
    pip freeze > requirements.txt







