# Proyecto de Prueba Técnica - Azul Handling

Este repositorio contiene un proyecto de prueba técnica desarrollado para la empresa Azul Handling. El proyecto está construido utilizando las siguientes tecnologías:

- **Frontend**: Angular
- **Estilos**: SCSS y Angular Material
- **Backend**: Node.js
- **Servidor**: Express
- **Comunicación en Tiempo Real**: WebSockets
- **Base de Datos**: MySQL

## Descripción del Proyecto

El proyecto consiste en una aplicación web que muestra información sobre vuelos en tiempo real, tanto de llegadas como de salidas, y permite realizar filtrados y ediciones en la información. Aquí se detallan las principales características y funcionalidades:

### Interfaz de Usuario

La interfaz de usuario se compone de los siguientes elementos:

1. **Cabecera con Filtros**: En la parte superior de la página, se encuentran tres filtros diferentes que permiten filtrar los vuelos según distintos criterios, como la fecha y el aeropuerto.

2. **Tres Tablas**: Hay tres tablas en la página principal:
   - **Tabla de Vuelos en Tiempo Real**: Muestra información de vuelos en tiempo real obtenida a través de una API. Si se edita algún campo de un vuelo, la fila se resalta con un borde amarillo y parpadea durante dos segundos.
   - **Tabla de Llegadas**: Muestra información de vuelos de llegadas obtenida de una API externa.
   - **Tabla de Salidas**: Muestra información de vuelos de salidas obtenida de una API externa.

3. **Filtros de Fecha y Aeropuerto**: Los filtros de fecha y aeropuerto funcionan con la tabla de vuelos en tiempo real. Las opciones del filtro de aeropuerto se generan automáticamente según los datos disponibles en la tabla.

4. **Filtro de Texto**: El filtro de texto actúa sobre las tablas de llegadas y salidas simultáneamente. Al escribir texto y pulsar la tecla Enter, se filtran los resultados en ambas tablas.

5. **Menú Desplegable Izquierdo**: Aunque principalmente decorativo, el menú desplegable de la izquierda tiene la funcionalidad de mostrar u ocultar su contenido.

6. **Componentes de Angular Material**: Se ha utilizado Angular Material para mejorar la apariencia de algunos elementos, como el estilo del select y el popup.

### Base de Datos

La aplicación utiliza una base de datos MySQL para almacenar registros de vuelos. Cuando se agrega un nuevo registro a la base de datos, aparece un popup indicando el éxito de la operación, además de mostrar información básica del nuevo registro. El popup desaparece automáticamente después de un tiempo.

### Límite de API Externa

La API externa que proporciona datos de llegadas y salidas está limitada a 1,000 consultas gratuitas. Si se supera este límite, se puede acceder a la llamada alternativa comentada en el código, que sigue la misma estructura de datos que se recibe de la API.

## Instrucciones de Uso

1. Clona este repositorio en tu máquina local.
2. Configura la base de datos MySQL con las credenciales necesarias y asegúrate de que la aplicación tenga acceso a ella.
3. Instala las dependencias del frontend y backend utilizando npm o yarn.
4. Inicia el servidor backend utilizando `npm start` o el comando correspondiente.
5. Inicia la aplicación frontend utilizando `ng serve` o el comando correspondiente.
6. Accede a la aplicación en tu navegador web.

## Notas Importantes

- Asegúrate de contar con las API externas necesarias y gestionar las consultas según el límite gratuito especificado.
- La documentación técnica detallada se encuentra en el código fuente y puede consultarse en los comentarios correspondientes.

¡Gracias por revisar este proyecto de prueba técnica para Azul Handling! Si tienes alguna pregunta o necesitas más información, no dudes en contactarme.

