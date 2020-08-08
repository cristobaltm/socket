export class GraphData {

    private months: string[];
    private values: number[];

    constructor() {
        this.months = ['enero', 'febrero', 'marzo', 'abril'];
        this.values = [0, 0, 0, 0];
    }

    getGraphData() {
        return [{
            data: this.values,
            label: this.months
        }];
    }

    increaseValue( month: string, value: number ) {
        month = month.toLowerCase().trim();

        for ( let i in this.months ) {
            if ( this.months[ i ] === month ) {
                this.values[ i ] += value;
            } 
        }

        return this.getGraphData();
    }
}