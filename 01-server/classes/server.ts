import express from "express";
import { SERVER_PORT } from "../globals/environment";
import socketIO from 'socket.io';
import http from "http";
import * as socket from '../sockets/sockets';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;
    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );
        this.listenSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private listenSockets() {

        this.io.on( 'connection', client => {

            // Conectar cliente
            socket.connectClient( client );

            // Configuración de usuario
            socket.configUser( client, this.io );

            // Obtener usuarios activos
            socket.getUsersOnline( client, this.io );

            // Mensajes
            socket.message( client, this.io );

            // Desconectar
            socket.disconnect( client, this.io );      
        });
    }

    start( callback: VoidFunction ) {
        this.httpServer.listen( this.port, callback );
    }
}