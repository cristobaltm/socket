# Angular: Aplicaciones en tiempo real con sockets y rest

## 01-server
Socket-server

1. Reconstruir módulos de node
```
npm install
```

2. Generar el dist
```
tsc -w
```

3. Levantar el servidor, cualquiera de estos dos comandos
```
nodemon dist/
node dist/
```

## 02-basico
Angular App + Socket Server

1. Configuración de socket.io en nuestro backend.
2. Implementación del patrón singleton en nuestra clase server.
3. Conexión de Angular con nuestro servidor de sockets.
4. Detectar conexiones y desconexiones en el backend.
5. Detectar caídas y reconexiones del lado del cliente (Angular).
6. Envío de nuestra primera comunicación por sockets.

* [footer](https://github.com/cristobaltm/socket/tree/master/02-basico/src/app/components/footer)
Creación de la interfaz de usuario para enviar mensajes y mostrarle al usuario cuando hay conexión con el servidor y cuando la perdemos.

* [websocket.service.ts](https://github.com/cristobaltm/socket/blob/master/02-basico/src/app/services/websocket.service.ts)
Construcción de una clase que podamos reutilizar fácilmente en un futuro, para no tener que configurar nada después, simplemente importar el servicio, configurar nuestro app.module y luego ya no hay que hacer nada más para trabajar con los sockets.
