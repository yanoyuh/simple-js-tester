class Utils {
    static createInterfaceElement(type, name, params=null, defaultValue=null) {
        let interfaceElement = document.createElement('div');
        interfaceElement.className = 'interface-element';
        let label = document.createElement('label');
        label.innerText = name;
        interfaceElement.appendChild(label);
        let valueElement = null;

        if (['text', 'button'].includes(type)) {
            valueElement = document.createElement("input");
            valueElement.type = type;
            valueElement.name = name;
            if (defaultValue != null) {
                valueElement.value = defaultValue;
            }
        } else if (['radio', 'checkbox'].includes(type)) {
            valueElement = document.createElement('div');
            for (var i = 0; i < params.length; i++) {
                let childElement = document.createElement("input");
                childElement.type = type;
                childElement.name = name;
                childElement.value = params[i];
                valueElement.appendChild(childElement);
            }
            if (defaultValue != null) {
                if (type == 'radio') {
                    valueElement.querySelector(`input[value=${defaultValue}]`).checked = true;
                } else if (type == 'checkbox' && Array.isArray(defaultValue)) {
                    for (let i = 0; i < defaultValue.length; i++) {
                        valueElement.querySelector(`input[value=${defaultValue[i]}]`).checked = true;
                    }                
                }
            }
        } else if (type == "select") {
            valueElement = document.createElement("select");
            valueElement.name = name;
            for (var i = 0; i < params.length; i++) {
                var option = document.createElement("option");
                option.value = params[i];
                option.text = params[i];
                valueElement.appendChild(option);
            }
            if (defaultValue != null) {
                valueElement.value = defaultValue;
            }
        } else if (type == "textarea") {
            valueElement = document.createElement("textarea");
            valueElement.name = name;
            valueElement.value = defaultValue;
        }
        interfaceElement.appendChild(valueElement);
        return interfaceElement;
    }

    static getFormValue( name ) {
        let element = document.querySelector(`[name=${name}]`);
        if (element.tagName == 'INPUT' && ['text', 'radio', 'checkbox'].includes(element.type)) {
            return element.value;
        } else if (element.tagName == 'SELECT') {
            return element.value;
        } else if (element.tagName == 'TEXTAREA') {
            return element.value;
        } else if (element.tagName == 'DIV') {
            let values = [];
            let elements = element.querySelectorAll('input');
            for (let i = 0; i < elements.length; i++) {
                if (elements[i].checked) {
                    values.push(elements[i].value);
                }
            }
            return values;
        }
    }

    static setFormValue( name, value ) {
        let element = document.querySelector(`[name=${name}]`);
        if (element.tagName == 'INPUT' && ['text', 'radio', 'checkbox'].includes(element.type)) {
            element.value = value;
        } else if (element.tagName == 'SELECT') {
            element.value = value;
        } else if (element.tagName == 'TEXTAREA') {
            element.value = value;
        } else if (element.tagName == 'DIV') {
            let elements = element.querySelectorAll('input');
            for (let i = 0; i < elements.length; i++) {
                elements[i].checked = value.includes(elements[i].value);
            }
        }
    }
}