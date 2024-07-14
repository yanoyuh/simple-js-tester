document.addEventListener('DOMContentLoaded', function () {
    window.index = new Index();
});

class Index {
    constructor() {
        let mainElement = document.querySelector('#main');

        mainElement.append(Utils.createInterfaceElement('textarea', 'json'));
        
        let executeBtn = Utils.createInterfaceElement('button', 'execute', null, 'execute');
        executeBtn.addEventListener('click', ()=> {
            let value = Utils.getFormValue('json');
            let obj = JSON.parse(value);
            let result = JSON.stringify(obj, null, 2);
            Utils.setFormValue('result', result);
        });
        
        mainElement.append(executeBtn);
        
        mainElement.append(Utils.createInterfaceElement('textarea', 'result'));
    }

}