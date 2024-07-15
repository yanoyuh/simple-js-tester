document.addEventListener('DOMContentLoaded', function () {
    window.index = new Index();
});

class Index {
    constructor() {
        let mainElement = document.querySelector('#main');

        // 入力フォーム
        mainElement.append(Utils.createInputFormElement('json', 'textarea'));

        // 実行ボタン
        mainElement.append(Utils.createButtonElement('execute', () => {
            let json = Utils.getFormValue('json');
            let obj = JSON.parse(json);
            let csv = Utils.json2csv(obj);
            Utils.setFormValue('result', csv);
        }));

        // 出力フォーム
        mainElement.append(Utils.createInputFormElement('result', 'textarea'));

        // ダウンロード
        mainElement.append(Utils.createButtonElement('download', () => {
            let result = Utils.getFormValue('result');
            Utils.downloadFile(new Blob([result], { type: 'text/csv' }), 'result.csv');
        }));

    }
}