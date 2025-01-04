# Proyecto de Procesamiento de CSV con Paginación

Este proyecto permite cargar y procesar un archivo CSV, mostrando su contenido en tarjetas (cards) con paginación en una página web.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Descripción

Este proyecto utiliza HTML, JavaScript y Tailwind CSS para cargar y procesar un archivo CSV ubicado en `data/Papua.csv`. El contenido del archivo CSV se muestra en tarjetas (cards) con paginación, permitiendo navegar entre las páginas y resaltar la página actual.

## Estructura del Proyecto
    
     ├── assets     
     │     ├── app.js     
     │     ├── cards.js   
     │     ├── paginacion.js
     ├── data 
     │     └── Papua.csv 
     ├── index.html
     └── README.md



- `assets/app.js`: Contiene la lógica para cargar y procesar el archivo CSV.
- `assets/cards.js`: Contiene la función para crear tarjetas (cards) a partir de los datos del CSV.
- `assets/paginacion.js`: Contiene la lógica para manejar la paginación.
- `data/Papua.csv`: Archivo CSV con los datos a procesar.
- `index.html`: Página web principal que muestra el contenido del CSV.
- `README.md`: Documentación del proyecto.

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd tu-repositorio
    ```

3. Asegúrate de que el archivo CSV `Papua.csv` esté en la ruta `data/Papua.csv`.

## Uso

1. Abre el archivo `index.html` en un navegador web.
2. El contenido del archivo CSV se cargará automáticamente y se mostrará en tarjetas (cards) con paginación.
3. Usa los controles de paginación para navegar entre las páginas.

## Capturas de Pantalla

![Captura de Pantalla 1](ruta/a/captura1.png)
![Captura de Pantalla 2](ruta/a/captura2.png)

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir cualquier cambio que te gustaría hacer.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para obtener más detalles.