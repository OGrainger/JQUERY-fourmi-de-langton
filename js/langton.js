/// <reference path="ant.js" />
/// <reference path="grid.js" />
/// <reference path="pattern.js" />
/// <reference path="simulation.js" />

class Langton {
    constructor() {
        this.Pattern = new Pattern();
        this.Simulation = new Simulation()
    }

    RegisterOnReady() {
        this.Pattern.RegisterOnReady();
        this.Simulation.RegisterOnReady();

        $($.proxy(this.onReady, this))
    }

    onReady() {
        this.Grid = new Grid("Grid", this.Simulation.Size);
        this.Ant = new Ant(this.Grid.MiddleX, this.Grid.MiddleY);
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color);

        this.displayAntInfo();

        $(this.Ant).on("move", $.proxy(this.displayAntInfo, this));
        $("input[type=radio]").on("click", $.proxy(this.resetGrid, this));
        $("#Reset").on("click", $.proxy(this.resetGrid, this));
        $("table").on("change", $.proxy(this.resetGrid, this));
        $("#Pattern").on("change", $.proxy(this.resetGrid, this));
        $("#MoveForward").on("click", $.proxy(this.advance, this));
        $("#Start").on("click", $.proxy(this.switchSimulation, this));
        $(".condition").removeClass("condition");

        console.log("Langton.onReady")
    }

    displayAntInfo() {
        $(".ant-x").html(this.Ant.X);
        $(".ant-y").html(this.Ant.Y);
        $(".ant-direction").html(this.Ant.Direction);
        $(".ant-nb-steps").html(this.Ant.NbSteps);
    }

    resetGrid() {
        this.Grid.Size = this.Simulation.Size;
        this.Ant.Reset(this.Grid.MiddleX, this.Grid.MiddleY);
        this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color);
        this.Simulation.started ? this.switchSimulation() : $("#Start").text("Démarrer");
        langton.displayAntInfo();
        $("#Start").text("Demarrer")
    }

    advance() {
        let steps = this.Simulation.Steps;
        for (let i = 0; i < steps; i++) {
            if (this.Grid.GetColor(this.Ant.X, this.Ant.Y) !== null) {
                let color = this.Grid.GetColor(this.Ant.X, this.Ant.Y);
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, this.Pattern.GetConfiguration(color, "color") || "#FFFFFF");
                this.Ant.Turn(this.Pattern.GetConfiguration(color, "direction"));
                this.Grid.SetColor(this.Ant.X, this.Ant.Y, Ant.Color);
            }
        }
    }

    switchSimulation() {
        this.Simulation.started = !this.Simulation.started;
        $("#Start").text(this.Simulation.started ? "Pause" : (this.Ant.NbSteps > 0 ? "Reprendre" : "Démarrer"));
        if (this.Simulation .started) {
            langton.simulate();
            $("#Start").text("Stop")
        } else {
            $("#Start").text("Reprendre")
        }
    }

    simulate() {
        if (this.Simulation.started) {
            langton.advance();
            setTimeout(() => langton.simulate(), this.Simulation.Gap);
        }
    }
}

let langton = new Langton();
langton.RegisterOnReady();
