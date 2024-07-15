class Utils {

    /**
     * 入力フォーム要素を生成
     * @param {*} name 
     * @param {*} type 
     * @param {*} params 
     * @param {*} defaultValue 
     * @returns 
     */
    static createInputFormElement(name, type = 'text', params = null, defaultValue = null) {
        let inputFormElement = document.createElement('div');
        inputFormElement.className = 'interface-element';
        let label = document.createElement('label');
        label.innerText = name;
        inputFormElement.appendChild(label);
        let valueElement = null;

        if (['text', 'password'].includes(type)) {
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
        inputFormElement.appendChild(valueElement);
        return inputFormElement;
    }

    /**
     * ボタン要素を生成
     * @param {*} name 
     * @param {*} callback 
     * @returns 
     */
    static createButtonElement(name, callback) {
        let buttonElement = document.createElement('button');
        buttonElement.innerText = name;
        buttonElement.addEventListener('click', callback);
        return buttonElement;
    }

    /**
     * フォームの値を取得
     * @param {*} name 
     * @returns 
     */
    static getFormValue(name) {
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

    /**
     * フォームに値を設定
     * @param {*} name 
     * @param {*} value 
     */
    static setFormValue(name, value) {
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

    /**
     * ファイルのダウンロード
     * @param {*} blob 
     * @param {*} filename 
     */
    static downloadFile(blob, filename) {
        let downloadLink;
        downloadLink = document.createElement('a');
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    /**
     * jsonをcsvに変換
     * @param {*} json 
     * @returns 
     */
    static json2csv(json) {
        let result = [];
        let headers = [];
        for (let key in json[0]) {
            headers.push(key);
        }
        result.push(headers.join(','));
        for (let i = 0; i < json.length; i++) {
            let line = [];
            for (let key in json[i]) {
                let txt = json[i][key];
                // 改行コードをそのまま出力
                if (txt.indexOf('\n') >= 0) {
                    txt = txt.replace(/\n/g, '\\n');
                }
                if (txt.indexOf('\r') >= 0) {
                    txt = txt.replace(/\r/g, '\\r');
                }
                if (txt.indexOf(',') >= 0) {
                    txt = txt.replace(/,/g, '\\,');
                }
                if (txt.indexOf('"') >= 0) {
                    txt = txt.replace(/"/g, '""');
                }
                txt = `"${txt}"`;
                line.push(txt);
            }
            result.push(line.join(','));
        }
        return result.join('\n');
    }
}