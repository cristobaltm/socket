export class GraphData {

    private labels: string[];
    private values: number[];

    constructor() {
        this.labels = ['Opción 1','Opción 2','Opción 3','Opción 4'];
        this.values = [0, 0, 0, 0];
    }

    /**
     * Establecer el valor de las etiquetas.
     * @param labels Array con las etiquetas.
     */
    setLabels( labels: string[] ) {
        this.labels = labels;
    }

    /**
     * Devolver los datos de la gráfica como objeto.
     */
    getGraphData() {
        return [{
            data: this.values,
            label: 'Preguntas'
        }];
    }

    /**
     * Incrementar el valor indicado de la opción elegida.
     * @param option Posición de la opción a incrementar.
     * @param valor Valor a incrementar (o decrementar si es negativo).
     */
    increaseValue( option: number, valor: number ) {
        this.values[option] += valor;
        return this.getGraphData();
    }

    /**
     * Incrementar el valor indicado la opción coincidente con la etiqueta.
     * @param label Etiqueta a incrementar.
     * @param value Valor a incrementar (o decrementar si es negativo).
     */
    increaseValueByLabel( label: string, value: number ) {
        label = label.toLowerCase().trim();

        for ( let i in this.labels ) {
            if ( this.labels[ i ] === label ) {
                this.values[ i ] += value;
            } 
        }

        return this.getGraphData();
    }
}