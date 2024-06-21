# FAKE-STORE

1. Los datos se almacenan en el localStorage, lo que garantiza que los cambios realizados (creación, eliminación o actualización de productos) persistan incluso si se actualiza o cierra la ventana del navegador. Para reiniciar los datos a su estado inicial, es necesario eliminar la clave 'products' del localStorage. Esto permitirá que la aplicación cargue nuevamente los datos predeterminados.
2. Para el buscador, se aplica un filtro desde el front-end que permite buscar productos únicamente por su nombre o categoría.
3. En el formulario, todos los campos son obligatorios y la URL de la imagen debe ser válida.

 ![Peek 2024-06-21 15-24](https://github.com/vane17/fake-store/assets/51926085/c32262dc-7bfe-417d-b985-745b47e4a167)
![Peek 2024-06-21 15-29](https://github.com/vane17/fake-store/assets/51926085/51ca1555-b912-4172-be78-f14b73ae6774)
![Peek 2024-06-21 15-31](https://github.com/vane17/fake-store/assets/51926085/b6d0be76-c394-4038-aae4-dc589b27bf04)

## Enlace de Despliegue

Puedes ver la aplicación en funcionamiento en el siguiente enlace:

[Enlace de Despliegue](https://fake-store-txua.vercel.app/products)


1. ```git clone https://github.com/vane17/fake-store.git```
2. ```npm  install```
3. Levantar: ```npm run dev```
