class Simulation {
    constructor() {
        this.started = false;
    }


    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }

    onReady() {
        console.log("Simulation.onReady")
    }

    get Size() {
        return parseInt($("input:radio[name='size']:checked").val())
    }

    get Steps() {
        return parseInt($("#NbSteps").val());
    }

    get Gap() {
        return parseInt($("#Interval").val());
    }
}
