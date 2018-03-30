class Pattern {
    constructor() {
    }

    RegisterOnReady() {
        $($.proxy(this.onReady, this))
    }

    onReady() {

        let onSuccess = $.proxy(function (data) {
            this.setHtml(data)
        }, this);
        let onComplete = $.proxy(function (xhr, status) {
            $("#Id").prop("disabled", false)
        }, this);
        let onError = $.proxy(function (xhr, status, error) {
            //TODO : remove this line after pattern dev
            this.setHtml(JSON.parse("{\"patterns\":[{\"name\":\"Simple\",\"steps\":[{\"if\":\"#FFFFFF\",\"then\":{\"color\":\"#000000\",\"direction\":\"right\"}},{\"if\":\"#000000\",\"then\":{\"color\":\"#FFFFFF\",\"direction\":\"left\"}}]},{\"name\":\"Tout droit\",\"steps\":[{\"if\":\"#FFFFFF\",\"then\":{\"color\":\"#DB1702\",\"direction\":\"left\"}},{\"if\":\"#DB1702\",\"then\":{\"color\":\"#008020\",\"direction\":\"left\"}},{\"if\":\"#008020\",\"then\":{\"color\":\"#FFFFFF\",\"direction\":\"right\"}}]},{\"name\":\"Inondation\",\"steps\":[{\"if\":\"#FFFFFF\",\"then\":{\"color\":\"#008020\",\"direction\":\"left\"}},{\"if\":\"#008020\",\"then\":{\"color\":\"#6D9ECE\",\"direction\":\"right\"}},{\"if\":\"#6D9ECE\",\"then\":{\"color\":\"#1F5FA0\",\"direction\":\"right\"}},{\"if\":\"#1F5FA0\",\"then\":{\"color\":\"#6D071A\",\"direction\":\"right\"}},{\"if\":\"#6D071A\",\"then\":{\"color\":\"#606060\",\"direction\":\"right\"}},{\"if\":\"#606060\",\"then\":{\"color\":\"#F0C300\",\"direction\":\"right\"}},{\"if\":\"#F0C300\",\"then\":{\"color\":\"#7F00FF\",\"direction\":\"left\"}},{\"if\":\"#7F00FF\",\"then\":{\"color\":\"#FF7F00\",\"direction\":\"left\"}},{\"if\":\"#FF7F00\",\"then\":{\"color\":\"#FFFFFF\",\"direction\":\"right\"}}]},{\"name\":\"Prisme\",\"steps\":[{\"if\":\"#FFFFFF\",\"then\":{\"color\":\"#7F00FF\",\"direction\":\"right\"}},{\"if\":\"#7F00FF\",\"then\":{\"color\":\"#6D9ECE\",\"direction\":\"right\"}},{\"if\":\"#6D9ECE\",\"then\":{\"color\":\"#1F5FA0\",\"direction\":\"left\"}},{\"if\":\"#1F5FA0\",\"then\":{\"color\":\"#6D071A\",\"direction\":\"left\"}},{\"if\":\"#6D071A\",\"then\":{\"color\":\"#606060\",\"direction\":\"left\"}},{\"if\":\"#606060\",\"then\":{\"color\":\"#F0C300\",\"direction\":\"right\"}},{\"if\":\"#F0C300\",\"then\":{\"color\":\"#000000\",\"direction\":\"left\"}},{\"if\":\"#000000\",\"then\":{\"color\":\"#FF7F00\",\"direction\":\"left\"}},{\"if\":\"#FF7F00\",\"then\":{\"color\":\"#E0115F\",\"direction\":\"left\"}},{\"if\":\"#E0115F\",\"then\":{\"color\":\"#DB1702\",\"direction\":\"right\"}},{\"if\":\"#DB1702\",\"then\":{\"color\":\"#008020\",\"direction\":\"right\"}},{\"if\":\"#008020\",\"then\":{\"color\":\"#FFFFFF\",\"direction\":\"right\"}}]},{\"name\":\"Serpent\",\"steps\":[{\"if\":\"#FFFFFF\",\"then\":{\"color\":\"#7F00FF\",\"direction\":\"left\"}},{\"if\":\"#7F00FF\",\"then\":{\"color\":\"#6D9ECE\",\"direction\":\"left\"}},{\"if\":\"#6D9ECE\",\"then\":{\"color\":\"#1F5FA0\",\"direction\":\"right\"}},{\"if\":\"#1F5FA0\",\"then\":{\"color\":\"#6D071A\",\"direction\":\"right\"}},{\"if\":\"#6D071A\",\"then\":{\"color\":\"#606060\",\"direction\":\"right\"}},{\"if\":\"#606060\",\"then\":{\"color\":\"#F0C300\",\"direction\":\"left\"}},{\"if\":\"#F0C300\",\"then\":{\"color\":\"#000000\",\"direction\":\"right\"}},{\"if\":\"#000000\",\"then\":{\"color\":\"#FF7F00\",\"direction\":\"left\"}},{\"if\":\"#FF7F00\",\"then\":{\"color\":\"#E0115F\",\"direction\":\"right\"}},{\"if\":\"#E0115F\",\"then\":{\"color\":\"#DB1702\",\"direction\":\"left\"}},{\"if\":\"#DB1702\",\"then\":{\"color\":\"#008020\",\"direction\":\"left\"}},{\"if\":\"#008020\",\"then\":{\"color\":\"#FFFFFF\",\"direction\":\"right\"}}]}]}"));
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

        console.log("Pattern.onReady")
    }

    setHtml(data) {
        console.log(data);
    }


    static GetSelect(json, selected) {
        let html = '<select>';
        for (var property in json) {
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
