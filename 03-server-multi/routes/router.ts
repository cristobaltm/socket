import { Router, Request, Response } from "express";
import Server from "../classes/server";
import { GraphData } from '../classes/graph';

const router = Router();

const graph = new GraphData();

router.get( '/graph', ( req: Request, res: Response ) => {
    res.json( graph.getGraphData() );
});

router.post( '/graph', ( req: Request, res: Response ) => {

    const option = Number( req.body.option );
    const value = Number( req.body.value ) || 1;
    const server = Server.instance;

    graph.increaseValue( option, value );
    server.io.emit( 'change-graph', graph.getGraphData() );

    res.json( graph.getGraphData() );
});

router.post( '/graph/bylabel', ( req: Request, res: Response ) => {

    const label = req.body.label;
    const value = Number( req.body.value );
    const server = Server.instance;

    graph.increaseValueByLabel( label, value );
    server.io.emit( 'change-graph-by-label', graph.getGraphData() );

    res.json( graph.getGraphData() );
});

router.post( '/messages/:id', ( req: Request, res: Response ) => {

    const body = req.body.body;
    const from = req.body.from;
    const id = req.params.id;
    const payload = { from, body }
    const server = Server.instance;

    server.io.in( id ).emit( 'private-message', payload );

    res.json({ ok: true, body, from, id });
});

export default router;