import { Router, Request, Response } from "express";
import Server from "../classes/server";

const router = Router();

router.get( '/mensajes', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        msg: 'Todo está bien'
    });
});

router.post( '/mensajes', ( req: Request, res: Response ) => {

    const body = req.body.body;
    const from = req.body.from;

    const payload = { from, body }
    const server = Server.instance;
    server.io.emit( 'new-message', payload );

    res.json({
        ok: true,
        body,
        from
    });
});

router.post( '/mensajes/:id', ( req: Request, res: Response ) => {

    const body = req.body.body;
    const from = req.body.from;
    const id = req.params.id;


    const payload = { from, body }
    const server = Server.instance;
    server.io.in( id ).emit( 'private-message', payload );

    res.json({
        ok: true,
        body,
        from,
        id
    });
});

// Servicio para obtener todos los IDs de usuarios conectados
router.get( '/userlist', ( req: Request, res: Response ) => {
    const server = Server.instance;
    server.io.clients( ( err: any, clients: string[] ) => {
        if ( err ) {
            return res.json({
                ok: false,
                err
            });
        };

        res.json({
            ok: true,
            clients
        });
    });

});

export default router;