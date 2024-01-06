let getValueFromObj = function(obj, fieldName, isRequired, defaultVal) {
    if (obj.hasOwnProperty(fieldName)) {
        return obj[fieldName];
    } else if (isRequired) {
        throw new Error("Fieldname \"" + fieldName + "\" is required!");
    } else {
        return defaultVal;
    }
}

class HegemonInput {
    constructor(name) {
        this.name = name;
    }
}

class HegemonForm {

    constructHTML(attachToElement) {
        let form = document.createElement("FORM");
        form.action = this.action;
        form.method = this.method;
        attachToElement.appendChild(form);
    }

    constructor(configObj) {
        this.name = getValueFromObj(configObj, "name", true);
        this.action = getValueFromObj(configObj, "action", true);
        this.method = getValueFromObj(configObj, "method", false, "POST");

        let attachToElement = getValueFromObj(configObj, "parent", true);

        this.constructHTML(attachToElement);
    }
}