// Copyright (c) 2024 Hemashushu <hippospark@gmail.com>, All rights reserved.
//
// This Source Code Form is subject to the terms of
// the Mozilla Public License version 2.0 and additional exceptions,
// more details in file LICENSE, LICENSE.additional and CONTRIBUTING.

class AnsLoader {
    async init() {
        let configDefault = {
            vm: "ans_vm.wasm",
            app: "app.ans",
            inline: false
        };

        let configNode = document.querySelector("#ans_config");
        let config = (configNode == null) ?
            Object.assign({}, configDefault) :
            Object.assign({}, configDefault, JSON.parse(configNode.textContent));

        let vmImportObject = this.buildVMImportObject();
        let vmExports = await this.loadVM(config.vm, vmImportObject);

        let scriptText = (config.inline) ?
            this.getInlineScriptText() :
            await (await fetch(config.app)).text();

        return vmExports.compile(scriptText);
    }

    buildVMImportObject() {
        //
        // for testing
        //
        let envFetch = async (file_path) => {
            // https://developer.mozilla.org/en-US/docs/Web/API/fetch
            let response = await fetch(file_path);
            return await response.text();
        };

        let envLog = (text) => {
            console.log(text);
        };

        let env = {
            fetch: envFetch,
            log: envLog
        };

        let importObject = {
            env: env
        };

        return importObject;
    }

    // return 'exports'
    async loadVM(vm_file, importObject) {
        // https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/instantiateStreaming_static
        let resultObject = await WebAssembly.instantiateStreaming(fetch(vm_file), importObject);
        return resultObject.instance.exports;
    }

    getInlineScriptText() {
        let inlineScriptNode = document.querySelector("script[type='application/xiaoxuanscript']");
        return (inlineScriptNode == null) ? "" : inlineScriptNode.textContent;
    }
}

(async () => {
    let i = new AnsLoader();
    let k = await i.init();
    console.log(k);
})();


