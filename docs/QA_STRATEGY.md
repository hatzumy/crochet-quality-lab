# 🛡️ Estrategia de Calidad y Testing - CrochetLab

Esta es la arquitectura de pruebas implementada para asegurar la robustez, seguridad y escalabilidad del ecosistema CrochetLab.

---

### 📊 Matriz de Herramientas y Tecnologías

| Nivel de Prueba | Herramienta | Lenguaje / Entorno | Propósito Principal |
| :--- | :--- | :--- | :--- |
| **Análisis Estático** | **ESLint** | JavaScript | Calidad de código y consistencia de estilo. |
| **Análisis de Seguridad** | **Snyk** | CLI / Dashboard | Detección de vulnerabilidades en dependencias. |
| **Calidad Continua** | **SonarQube** | Multi-lenguaje | Análisis de deuda técnica y bugs potenciales. |
| **Pruebas Unitarias** | **Jest** | JavaScript | Validación de lógica pura y esquemas de Zod. |
| **Pruebas de API (Manual)**| **Postman** | JavaScript (Tests) | Exploración de endpoints y validación de contratos. |
| **Integración / E2E** | **Playwright** | Python | Automatización de flujos completos de usuario. |
| **Carga y Performance** | **k6** | JavaScript | Medición de tiempos de respuesta bajo carga. |
| **Stress Testing** | **JMeter** | Java / XML | Pruebas de resistencia masiva y concurrencia. |

---

### 🏗️ Grupos de Ejecución (QA Lifecycle)

#### 🔹 1. Calidad en Tiempo de Desarrollo (Shift-Left)
En esta etapa, el objetivo es detectar errores antes de que el código llegue al repositorio.
* **ESLint:** Bloquea código mal formateado o con errores de sintaxis básicos.
* **Snyk:** Audita que las librerías instaladas (como `express` o `jsonwebtoken`) no tengan riesgos de seguridad.
* **Jest:** Ejecución de tests unitarios cada vez que se modifica una función lógica.

#### 🔹 2. Validación de Funcionalidad y Reglas de Negocio
Aquí aseguramos que el sistema haga lo que la **Tejedora** espera.
* **Postman:** Creación de colecciones automatizadas para verificar códigos de estado (200, 201, 400, 403, 500).
* **Playwright (Python):** Scripts que simulan procesos críticos como el **Registro con verificación de email** y la **Gestión de Roles**.



#### 🔹 3. Fiabilidad, Performance y Seguridad Avanzada
Evaluamos el comportamiento del sistema bajo condiciones extremas y su integridad a largo plazo.
* **SonarQube:** Reporte detallado de cobertura de código y hotspots de seguridad.
* **k6:** Simulación de usuarios concurrentes navegando por la plataforma.
* **JMeter:** Pruebas de saturación de la base de datos MongoDB para identificar cuellos de botella.

---

### 🚀 Ciclo de Ejecución para un Ticket (Workflow)

1.  **Código:** Escribir funcionalidad (Node.js).
2.  **Linting:** `npm run lint` (ESLint).
3.  **Unitaria:** `npm run test:unit` (Jest).
4.  **Integración:** Ejecutar script de Python (Playwright).
5.  **Carga:** Ejecutar script de k6 para validar que el nuevo código no afectó la latencia.