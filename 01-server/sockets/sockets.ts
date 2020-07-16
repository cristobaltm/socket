import { Socket } from 'socket.io';
import socketIO from 'socket.io';

export const disconnect = ( client: Socket ) => {
    client.on( 'disconnect', () => {
        console.log('Cliente desconectado');
    });
}

// Escuchar mensajes
export const message = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'message', ( payload: { from: string, body: string } ) => {
        console.log('Mensaje recibido', payload );

        io.emit( 'new-message', payload );
    });
}

// Configuración de usuario
export const configUser = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'config-user', ( payload: { name: string }, callback: VoidFunction ) => {
        console.log(`Usuario configurado`, payload.name );

        callback({
            ok: true,
            msg: `Usuario ${ payload.name } configurado`
        });
        // io.emit( 'login-user', payload );
    });
}