# Mi App de Películas en React Native y Expo

Esta aplicación fue desarrollada utilizando React Native y Expo. Permite a los usuarios explorar películas populares y recién estrenadas, obtener detalles de las películas y experimentar funciones adicionales como ajustar el tamaño del texto, cambiar entre modo claro/oscuro y leer en voz alta el texto en pantalla.

## Requisitos

- Node.js v18.15
- Expo CLI

## Dependencias

- expo-speech

## Instalación

1. Clone este repositorio en su máquina local.
2. Ejecute `npm install` para instalar las dependencias necesarias.
3. Cree un archivo `.env` en la carpeta raíz del proyecto y agregue la siguiente línea:
   API_TOKEN=c2d1eba2da68e492d514141b781c25cf

4. Ejecute `npm run start` para iniciar la aplicación.

## Estructura del proyecto

La aplicación tiene dos páginas principales: `MovieList` y `MovieDetails`.

### MovieList

Esta página contiene dos componentes:

1. `PremieredMovies`: Renderiza las películas recién estrenadas utilizando la información obtenida a través de una petición a la API.
2. `PopularMovies`: Renderiza las películas populares utilizando la información obtenida a través de una petición a la API.

### MovieDetails

Esta página muestra información detallada sobre una película específica y consta de tres componentes:

1. `BannerDetail`: Muestra la imagen del banner de la película.
2. `MovieInfo`: Muestra información relevante de la película, como título, fecha de lanzamiento y sinopsis.
3. `CastDetails`: Muestra detalles del reparto de la película.

Se realiza una única petición a la API y se pasa la información a través de las props a cada componente.

## Funcionalidades adicionales

- Botonera para aumentar o disminuir el tamaño del texto utilizando estados.
- Modo claro/oscuro utilizando useContext.
- Botón para reproducir y detener la lectura de texto en voz alta. La reproducción se detiene automáticamente al salir de la página.

## Punto de entrada

El punto de entrada principal de la aplicación es `App.tsx`.

## Información adicional

La aplicación fue probada en un dispositivo Android con Android 11.
