import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { GraphData } from '../classes/graph';

const router = Router();

const graph = new GraphData();

router.get( '/graph', ( req: Request, res: Response ) => {
    res.json( graph.getGraphData() );
});

router.post( '/graph', ( req: Request, res: Response ) => {

    const month = req.body.month;
    const value = Number( req.body.value );

    graph.increaseValue( month, value );
    const server = Server.instance;
    server.io.emit( 'change-graph', graph.getGraphData() );

    res.json( graph.getGraphData() );
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

export default router;