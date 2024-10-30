# PedidoForm App

Este proyecto es una aplicación para la generación de pedidos. 
La interfaz de usuario permite seleccionar artículos y un vendedor para luego enviar un pedido al backend

# Requisitos Previos

Para ejecutar el Frontend, tener las siguientes herramientas instaladas:
Node.js (Versión 14 o superior)
npm (Normalmente se instala junto con Node.js)

Para ejecutar el backend, tener las siguientes herramientas instaladas:
.NET SDK 8.0 o superior - Descargar .NET SDK
Visual Studio 2022 o Visual Studio Code 

# Instalación

## Clonar el repositorio
git clone https://github.com/fedeArrieta/SURIS_pedidosfront
cd tu-repositorio-Frontend

git clone https://github.com/tu-usuario/tu-repositorio-backend.git
cd tu-repositorio-backend

* Revisar los Modelos y Controladores *

Tener los siguientes modelos y controladores en tu proyecto:

Modelos:
    Articulo.cs
    Pedido.cs
    Vendedor.cs

Controladores:
    ArticulosController.cs – para manejar la lógica de los artículos (GET para obtener los artículos).
    VendedoresController.cs – para manejar la lógica de los vendedores (GET para obtener los vendedores).
    PedidosController.cs – para manejar la lógica de generación de pedidos (POST para crear un nuevo pedido).

* CORS (Cross-Origin Resource Sharing) *

Dado que el frontend se ejecutará en un servidor separado, habilitar CORS en el backend.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3001",
        builder =>
        {
            builder.WithOrigins("http://localhost:3001")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

app.UseCors("AllowLocalhost3001");

# Ejecución del Frontend

* Configurar variables de entorno (si es necesario) *

Asegúrate de que el frontend pueda comunicarse correctamente con el backend. 
Por defecto, el frontend está configurado para acceder a la API en https://localhost:7088/.

* Ejecutar el frontend localmente *

Una vez instaladas las dependencias, se puede ejecutar la aplicación en modo de desarrollo con el siguiente comando:
npm start
Esto abrirá la aplicación en el  navegador predeterminado. Normalmente estará disponible en http://localhost:3000.

* Archivos Importantes *

-src/components/PedidoForm.js: Este archivo es el componente principal para la creación de pedidos.
-src/PedidoForm.css: Contiene los estilos que se aplican al formulario de pedidos.
-package.json: Archivo donde se encuentran las dependencias y scripts del proyecto.

# Ejecutar el Backend

* Ejecutar el backend localmente *

En la carpeta raíz del proyecto backend, ejecutar el siguiente comando para iniciar el servidor:
dotnet run
Esto iniciará la aplicación ASP.NET Core en https://localhost:7088/ por defecto

* Endpoints del API *

Verificar el correcto funcionamiento de los siguientes endpoints para la interacción con el frontend:

Artículos: GET /api/articulos – Devuelve la lista de artículos.
Vendedores: GET /api/vendedores – Devuelve la lista de vendedores.
Pedidos: POST /api/pedido – Envía un nuevo pedido. El cuerpo de la solicitud debe incluir el vendedor y los artículos seleccionados.
