import { User } from './user';

export class UserList {

    private list: User[] = [];

    constructor() {}

/**
 * Agregar un usuario a la lista
 * @param user Usuario que se va a agregar
 * @return Usuario agregado
 */
    public addUser( user: User ): User {
        this.list.push( user );
        console.log( this.list );
        return user;
    }

/**
 * Modificar el nombre de un usuario
 * @param id Identificador del usuario
 * @param new_name Nuevo nombre del usuario
 * @return true: ha sido modificado; false: no se encontró usuario
 */
    public updateName( id: string, new_name: string ): boolean {

        let updated: boolean = false;

        for( let user of this.list ) {
            if ( user.id === id ) {
                user.name = new_name;
                updated = true;
                break;
            }
        }

        console.log( 'Actualizado usuario', this.list );
        return updated;
    }

/**
 * Obtener la lista de usuarios
 * @return Lista de usuarios
 */
    public getList(): User[] {
        return this.list;
    }

/**
 * Obtener el usuario por su id
 * @param id Identificador del usuario
 * @return Usuario que coindice con el id o undefinido
 */
    public getUser( id: string ): User | undefined {
        return this.list.find( user => user.id === id );
    }

/**
 * Obtener todos los usuario en una sala en particular
 * @param room Sala que queremos obtener
 * @return Listado de usuarios en la sala
 */
    public getUsersByRoom( room: string ): User[] {
        return this.list.filter( user => user.room === room);
    }

/**
 * Elimina un usuario del listado
 * @param id Identificador del usuario
 * @return Usario eliminado o indefinido
 */
    public deleteUser( id: string ): User | undefined {
        const tempUser = this.getUser( id );
        this.list = this.list.filter( user => user.id !== id );
        console.log( 'Usuario eliminado', this.list );
        return tempUser;
    }
}