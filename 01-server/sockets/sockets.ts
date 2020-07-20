import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UserList } from '../classes/user-list';
import { User } from '../classes/user';

export const usersOnline = new UserList();

// Conectar cliente
export const connectClient = ( client: Socket ) => {
    const user = new User( client.id );
    usersOnline.addUser( user );
}

// Desconectar
export const disconnect = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'disconnect', () => {
        usersOnline.deleteUser( client.id );

        io.emit( 'users-online', usersOnline.getList() );
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
    client.on( 'config-user', ( payload: { name: string }, callback: Function ) => {
        usersOnline.updateName( client.id, payload.name );

        io.emit( 'users-online', usersOnline.getList() );

        callback({
            ok: true,
            msg: `Usuario ${ payload.name } configurado`
        });
    });
}

// Obtener usuarios
export const getUsersOnline = ( client: Socket, io: socketIO.Server ) => {
    client.on( 'get-users-online', () => {
        io.to( client.id ).emit( 'users-online', usersOnline.getList() );
    });
}