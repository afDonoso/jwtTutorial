# jwtTutorial
## Guía pruebas
### Crear un usuario
<b>Ruta:</b> `localhost:3000/users/create`<br>
<b>Body:</b>
```json
{
  "username": "username",
  "password": "12345678",
  "userType": "admin"
}
```
### Traer todos los usuarios
<b>Ruta:</b> `localhost:3000/users`<br>

### Eliminar un usuario
<b>Ruta:</b> 'localhost:3000/users/delete/:username`<br>

## Encriptación
Para la encriptación, se utiliza el método AES y la misma llave que se creó en `config.js`.
Esta encriptación se hace del lado del servidor, por lo que la clave introducida por el cliente viaja en texto plano.
