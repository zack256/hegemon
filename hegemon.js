let idRoot = "hegemon";

let getValueFromObj = function(obj, fieldName, isRequired, defaultVal) {
    if (obj.hasOwnProperty(fieldName)) {
        return obj[fieldName];
    } else if (isRequired) {
        throw new Error("Fieldname \"" + fieldName + "\" is required!");
    } else {
        return defaultVal;
    }
}

let makeIDName = function(name) {
    // Can be changed.
    name = name.trim();
    if (name.length == 0) throw new Error("Invalid name!");
    let s = "";
    for (let i = 0; i < name.length; i++) {
        if (name[i] == " ") {
            s += "_";
        } else {
            s += name[i];
        }
    }
    return s;
}

class HegemonTextInput {

    constructHTML() {
        let input = document.createElement("INPUT");
        input.type = "text";
        input.name = this.localName;
        input.id = this.name;
        input.setAttribute("form", this.parent.name);
        input.placeholder = this.placeholder;
        return input;
    }

    constructor(parent, configObj) {

        this.localName = getValueFromObj(configObj, "name", true);
        this.name = parent.name + "_" + makeIDName(this.localName);
        this.parent = parent;

        this.placeholder = getValueFromObj(configObj, "placeholder", false, "");

        this.htmlObj = this.constructHTML();

    }
}

class HegemonForm {

    constructHTML() {
        let form = document.createElement("FORM");
        form.action = this.action;
        form.method = this.method;
        form.id = this.name;
        return form;
    }

    constructor(configObj) {
        this.name = idRoot + "_" + makeIDName(getValueFromObj(configObj, "name", true));
        this.action = getValueFromObj(configObj, "action", true);
        this.method = getValueFromObj(configObj, "method", false, "POST");

        let attachToElement = getValueFromObj(configObj, "parent", true);

        this.htmlObj = this.constructHTML();

        if (configObj.inputs != null) {
            for (let i = 0; i < configObj.inputs.length; i++) {
                let inputConfigObj = configObj.inputs[i];
                let inputType = inputConfigObj.type;
                let input;
                if (inputType == null) {
                    throw new Error("Inputs must have a specified type!");
                } else if (inputConfigObj.type == "text") {
                    input = new HegemonTextInput(this, inputConfigObj);
                } else {
                    throw new Error("Unsupported input type.");
                }
                this.htmlObj.appendChild(input.htmlObj);
            }
        }

        attachToElement.appendChild(this.htmlObj);

    }
}