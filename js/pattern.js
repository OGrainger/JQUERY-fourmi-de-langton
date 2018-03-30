class Pattern {
    constructor() {
    }

    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }

    onReady() {

        let onSuccess = $.proxy(function (data) {
            this.setHtml(data.patterns);
        }, this);
        let onComplete = $.proxy(function (xhr, status) {
            $(".condition").removeClass("condition");
        }, this);
        let onError = $.proxy(function (xhr, status, error) {
            console.log(xhr.status + " - " + xhr.statusText)
        }, this);

        let params = {
            type: "GET",
            dataType: "json",
            success: onSuccess,
            complete: onComplete,
            error: onError
        };

        $.ajax("https://api.myjson.com/bins/crrrn", params);

        $("#Pattern").on("change", $.proxy(this.setTable, this));

        console.log("Pattern.onReady")
    }

    get Val() {
        return $("#Pattern").val();
    }

    GetConfiguration(color, type) {
        let rows = $("#CurrentPattern > tbody")[0].rows;
        let row = Array.prototype.find.call(rows, (row) => row.dataset.ifColor === color);
        let td = Array.prototype.find.call(row.children, (td) => td.className === (type === "color" ? "then-color" : "then-direction"));
        return td.children[0].value;
    }

    setHtml(patterns) {
        this.Patterns = patterns;
        this.GeneratePatternSelect();
        this.setTable();
    }

    setTable() {
        $("#CurrentPattern > tbody").empty();
        this.Steps = this.Patterns.find(pattern => pattern.name === this.Val).steps;
        for (let i in this.Steps) {
            $(Pattern.GetHtmlRow(this.Steps[i])).appendTo("#CurrentPattern > tbody");
        }
    }

    GeneratePatternSelect() {
        let patternSelect = $("#Pattern");
        let html = '<select>';
        for (let i in this.Patterns) {
            html += '<option value="' + this.Patterns[i].name + '"';
            html += '>' + this.Patterns[i].name + '</option>'
        }
        patternSelect.html(html);
        patternSelect.val("Simple");
    }

    static GetSelect(json, selected) {
        let html = '<select>';
        for (let property in json) {
            html += '<option value="' + property + '"';
            if (selected === property) {
                html += ' selected="selected"'
            }

            html += '>' + json[property] + '</option>'
        }

        html += '</select>';
        return html
    }

    static GetHtmlRow(step) {
        let settings = $.extend({
            if: "#FFFFFF",
            then: {
                color: "#FFFFFF",
                direction: "left"
            }
        }, step);

        let html = '<tr data-if-color="' + settings.if + '">';
        html += '<td class="if-color">' + PatternColor[settings.if] + '</td>';
        html += '<td class="then-color">' + Pattern.GetSelect(PatternColor, settings.then.color) + '</td>';
        html += '<td class="then-direction">' + Pattern.GetSelect(PatternDirection, settings.then.direction) + '</td>';
        html += '</tr>';
        return html
    }
}

const PatternColor = Object.freeze({
    "#FFFFFF": "Blanc",
    "#6D9ECE": "Bleu Clair",
    "#1F5FA0": "Bleu Fonc&eacute;",
    "#6D071A": "Bordeaux",
    "#606060": "Gris",
    "#F0C300": "Jaune",
    "#000000": "Noir",
    "#FF7F00": "Orange",
    "#E0115F": "Rose",
    "#DB1702": "Rouge",
    "#008020": "Vert",
    "#7F00FF": "Violet"
});

const PatternDirection = Object.freeze({
    "left": "Gauche",
    "right": "Droite"
});
