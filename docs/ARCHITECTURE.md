# 🏗️ Arquitectura del Sistema - CrochetLab

Este documento describe la infraestructura tecnológica y la disposición de componentes de CrochetLab, integrando capacidades de desarrollo web tradicional con servicios de Inteligencia Artificial.

---

### 🗺️ Mapa Tecnológico (Tech Stack)

| Capa | Tecnología | Rol / Responsabilidad |
| :--- | :--- | :--- |
| **Frontend** | **React + Material UI** | Interfaz de usuario responsiva, moderna y accesible para las tejedoras. |
| **Backend Principal** | **Node.js + Express** | Gestión de API REST, autenticación (JWT) y lógica de negocio central. |
| **Backend de IA** | **Python (FastAPI/Flask)** | Procesamiento de lenguaje natural, generación de prompts y lógica técnica de IA. |
| **Base de Datos** | **MongoDB** | Almacenamiento NoSQL para perfiles, patrones y logs de actividad. |
| **Automatización** | **n8n** | Orquestación de flujos de trabajo (emails, notificaciones, integraciones externas). |

---

### 🛰️ Diagrama de Componentes

1. **Capa de Presentación (Frontend):** - Consume la API de Node.js.
   - Utiliza Material UI para una estética limpia basada en componentes listos para producción.

2. **Capa de Aplicación (Backend Central):**
   - Escrito en **JavaScript**.
   - Se encarga del Registro, Login (Roles RBAC) y seguridad.
   - Actúa como puente hacia el microservicio de IA.

3. **Capa de Inteligencia Artificial (AI Engine):**
   - Escrita en **Python**.
   - Especializada en el manejo de modelos de lenguaje (LLMs) y generación de reportes técnicos/prompts.
   - Se comunica con el Backend de Node.js mediante peticiones internas.



---

### 🔄 Flujo de Datos y Comunicación

* **HTTP/JSON:** Protocolo estándar para la comunicación entre el Frontend, el Backend de Node.js y el servicio de IA en Python.
* **JWT (JSON Web Tokens):** Método de autorización persistente en todas las capas. El rol del usuario se valida en Node.js antes de permitir peticiones a la IA.
* **Webhooks:** Integración con **n8n** para procesos asíncronos (ej. cuando se completa un reporte de IA, n8n envía el resultado por correo).

---

### 🛠️ Entornos de Desarrollo

- **Node.js Ecosystem:** Gestión de paquetes con `npm`. Uso de `ESLint` y `Prettier` para estática.
- **Python Ecosystem:** Gestión de entornos virtuales con `venv`. Uso de `pip` para librerías de IA y automatización.