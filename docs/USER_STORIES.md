# Historias de Usuario - Crochet Quality Lab

## Épica: Gestión de Usuarios y Perfil (Comunidad)
### US-01: Registro e Inicio de Sesión
**Como** nuevo tejedor,
**quiero** crear una cuenta con mi correo y contraseña,
**para** mantener mi inventario y mis patrones sincronizados.

**Criterios de Aceptación:**
- [ ] El sistema debe validar que el correo tenga formato válido (@).
- [ ] La contraseña debe tener al menos 8 caracteres.
- [ ] Mostrar error específico si el correo ya existe.
- [ ] Al fallar el login, mostrar mensaje de "Credenciales incorrectas" (seguridad).
- [ ] QA - Bloqueo temporal de cuenta tras 5 intentos fallidos

### US-02: Perfil "Craft Identity"
**Como** usuario registrado,
**quiero** definir mis habilidades y puntos que estoy aprendiendo,
**para** construir mi identidad para la futura red social.

**Criterios de Aceptación:**
- [ ] Campo para seleccionar técnicas dominadas (Amigurumi, Tunecino, etc.).
- [ ] Sección de "Puntos en Aprendizaje" para seguimiento de progreso.
- [ ] Debe permitir agregar el tipo de conversion que se usa (EE.UU, Reino unido o Español)
- [ ] Opción de subir y visualizar foto de perfil.
- [ ] El perfil debe ser editable en cualquier momento.

---

##  Épica: Inventario (Stash)
### US-03: Registro de Lanas y Lotes
**Como** crochetera precavida,
**quiero** registrar marca, color y número de lote (dye lot),
**para** asegurar la uniformidad en mis proyectos.

**Criterios de Aceptación:**
- [ ] El campo "Lote" debe ser obligatorio.
- [ ] Debe permitir subir una foto de la etiqueta de la lana.
- [ ] Sistema de alerta cuando queden menos de 50g de una lana específica.

---

##  Épica: Gestión de Patrones (IA)
### US-04: Escáner de Patrones con Marcador
**Como** usuario que teje patrones complejos,
**quiero** subir un PDF/Imagen y tener una barra resaltadora móvil,
**para** no perder la fila en la que voy.

**Criterios de Aceptación:**
- [ ] El marcador debe ser "arrastrable" verticalmente.
- [ ] La posición del marcador debe guardarse automáticamente al salir.
- [ ] (QA) El sistema debe responder correctamente ante PDFs de más de 10 páginas.

---

##  Épica: Utilidades y Negocio
### US-05: Contador de Vueltas Inteligente
**Como** tejedor, 
**quiero** un botón gigante de incremento y feedback visual, 
**para** no soltar las lanas mientras cuento.

**Criterios de Aceptación:**
- [ ] El botón debe ocupar al menos el 30% de la pantalla.
- [ ] Debe emitir una vibración o sonido al hacer clic.

### US-06: Calculadora de Precios "Handmade"
**Como** artesano, 
**quiero** calcular el precio basado en materiales y horas, 
**para** que mi negocio sea rentable.

**Criterios de Aceptación:**
- [ ] Cálculo automático: (Costo material) + (Horas x Precio_Hora) + % Ganancia.
- [ ] Debe permitir exportar el resumen del precio en texto para enviarlo a clientes.


### US-07: Conversor de Términos (Traductor de Puntos)
**Como** usuario que consulta patrones internacionales, 
**quiero** traducir los nombres de los puntos entre US, UK y Español, 
**para** evitar errores en la forma del tejido y entender patrones globales.

**Criterios de Aceptación:**
- [ ] Debe tener un buscador de puntos por nombre (ej: "vareta", "single crochet").
- [ ] Debe mostrar una tabla comparativa clara con las tres nomenclaturas (Español, US, UK).
- [ ] Debe incluir una descripción breve o icono de cómo se hace el punto para confirmar la traducción.
- [ ] (QA) El buscador debe ser insensible a mayúsculas y tildes para facilitar la búsqueda rápida.

## Épica: Gestión de Proyectos (WIP - Work In Progress)
### US-08: Registro de Proyecto en Curso (WIP)
**Como** tejedor activo,
**quiero** crear un proyecto vinculando una lana de mi inventario y un patrón,
**para** llevar un control centralizado de mi progreso y materiales.

**Criterios de Aceptación:**
- [ ] Debe permitir seleccionar lanas existentes desde el **Inventario (US-03)**.
- [ ] Debe solicitar una "Cantidad Estimada" de material al iniciar.
- [ ] **Alerta de Stock:** Si la cantidad estimada es mayor al stock disponible o deja el stock en < 50g, mostrar advertencia inmediata.
- [ ] El proyecto debe tener estados editables: "En curso", "Pausado" y "Finalizado".
- [ ] Debe vincularse directamente con el **Contador de Vueltas (US-05)** para actualizar el progreso del proyecto.
- [ ] (QA) Si se elimina una lana del inventario que está asociada a un proyecto activo, el sistema debe pedir confirmación o archivar el proyecto.
- [ ] Al marcar un proyecto como 'Finalizado', el sistema debe preguntar si el consumo real fue igual al estimado y actualizar el stock final del inventario automáticamente.

## Épica: Inteligencia Artificial (Python Service)
### US-09: Asistente de Estimación por IA
**Como** tejedor, 
**quiero** subir una foto de los requerimientos de mi patrón, 
**para** que el sistema estime automáticamente cuánta lana necesito y verifique si tengo suficiente en mi inventario.

**Criterios de Aceptación:**
- [ ] El sistema debe permitir subir imágenes (JPG, PNG) del apartado de materiales de un patrón.
- [ ] El módulo de IA debe extraer la cantidad (gramos/metros) y el color sugerido mediante reconocimiento de texto (OCR).
- [ ] Debe cruzar los datos extraídos con el **Inventario (US-03)** para validar disponibilidad en tiempo real.
- [ ] Si la cantidad necesaria es mayor a la disponible, el sistema debe calcular y sugerir cuánto material falta comprar.
- [ ] (QA) El sistema debe manejar conversiones automáticas si el patrón usa unidades distintas (ej: onzas a gramos).