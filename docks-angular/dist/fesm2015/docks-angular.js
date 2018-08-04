import { Component, Input, NgModule } from '@angular/core';
import JSONFormatter from 'json-formatter-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class documentationService {
    constructor() {
        this.doc = {};
        this.openedDoc = 'doc-active-dropdown';
        this.DocsData = {};
        this.states = {
            props: false,
            methods: false,
            getters: false,
            dataProps: false,
            demo: false,
            demoOverlay: false,
            components: false,
            tests: false,
            view: '',
            sidebarState: ``,
            argToShow: ``
        };
        return this;
    }
    /**
     * @param {?} DocsData
     * @return {?}
     */
    setDocs(DocsData) {
        this.DocsData = DocsData;
    }
    /**
     * @return {?}
     */
    setDoc() {
        this.doc = this.getThis(this.DocsData, this.openedDoc, {});
        return this.doc;
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    openDoc(doc) {
        this.openedDoc = doc;
        this.states.view = `components`;
        this.setDoc();
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getMarkup(doc) {
        /** @type {?} */
        const props = [];
        for (const p in doc.props) {
            if (doc.props[p]) {
                props.push(`:${p}="doc.props.${p}.value"`);
            }
        }
        return `<${doc.name}${props.length ? `\n  ` : ``}${props.join('\n  ')}${props.length ? `\n` : ``}></${doc.name}>`;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    json(obj) {
        /** @type {?} */
        let result = ``;
        try {
            result = JSON.stringify(obj, null, '    ');
        }
        catch (error) { }
        return result;
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    docName(doc) {
        if (!doc) {
            return;
        }
        return doc.name;
    }
    /**
     * @desc Navigates an object or array to find a value
     * @param {?} el The starting object
     * @param {?} path String to follow
     * @param {?=} emptyVal What is returned if undefined
     * @return {?}
     */
    getThis(el, path, emptyVal) {
        if (path && path.toString().split) {
            path = [el].concat(path.toString().split(`.`));
        }
        else {
            path = [el];
        }
        /** @type {?} */
        const result = path.reduce(function (accumulator, currentValue) {
            if (accumulator === undefined) {
                return emptyVal;
            }
            if (currentValue.indexOf(`.`) === -1 && currentValue.indexOf(`(`) > -1) {
                /** @type {?} */
                let argsString = '';
                /** @type {?} */
                const argsObj = /\((.*?)\)/g.exec(currentValue);
                if (argsObj) {
                    argsString = argsObj[1] || ``;
                }
                /** @type {?} */
                const args = argsString.split(`,`).map((arg) => arg.trim());
                /** @type {?} */
                const functionName = currentValue.split(`(`)[0];
                if (typeof accumulator[functionName] === `function`) {
                    /** @type {?} */
                    const _result = accumulator[functionName].apply(accumulator, args);
                    return _result;
                }
            }
            if (currentValue) {
                return accumulator[currentValue];
            }
            else {
                return accumulator;
            }
        });
        if (result === undefined) {
            return emptyVal;
        }
        return result;
    }
}
/** @type {?} */
let DocumentationService = new documentationService();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class testService {
    constructor() {
        this.doc = {};
        this.openedDoc = 'doc-active-dropdown';
        this.testResults = {
            testsAreRunning: false,
            tests: {}
        };
        this.tests = {};
        this.flatTests = {};
        this.testTypes = {
            class: [],
            components: [],
            modules: [],
            'object literals': [],
            interfaces: [],
            variable: []
        };
        this.shownTestsState = ``;
    }
    /**
     * @param {?} tests
     * @return {?}
     */
    setTests(tests) {
        this.tests = tests;
        this.testTypes.class = DocumentationService.getThis(this.tests, `class`, []);
        /** @type {?} */
        const typesToTest = [
            `methods`,
            `properties`,
            `attributeProperties`,
            `getters`
        ];
        for (const type in DocumentationService.DocsData) {
            if (DocumentationService.DocsData[type]) {
                for (const docName in DocumentationService.DocsData[type]) {
                    if (DocumentationService.DocsData[type][docName] && docName !== `DocumentationService` && docName !== `TestService`) {
                        /** @type {?} */
                        const serviceTest = DocumentationService.getThis(this.testTypes, `${type}.${docName}`, { tests: [] });
                        /** @type {?} */
                        const serviceTestTests = {};
                        if (serviceTest.tests) {
                            serviceTest.tests.forEach((test) => {
                                /** @type {?} */
                                let fors = test.for;
                                if (!fors) {
                                    fors = test.name;
                                }
                                if (fors && Array.isArray(fors)) {
                                    fors.forEach(_for => {
                                        if (!serviceTestTests[_for]) {
                                            serviceTestTests[_for] = [test];
                                            return;
                                        }
                                        serviceTestTests[_for].push(test);
                                    });
                                }
                                else {
                                    if (!serviceTestTests[fors]) {
                                        serviceTestTests[fors] = [test];
                                        return;
                                    }
                                    serviceTestTests[fors].push(test);
                                }
                            });
                        }
                        if (DocumentationService.DocsData[type][docName].children) {
                            /** @type {?} */
                            const children = DocumentationService.DocsData[type][docName].children;
                            for (const childName in children) {
                                if (children[childName]) {
                                    if (!!children[childName] && typesToTest.indexOf(childName) > -1) {
                                        for (const propName in children[childName]) {
                                            if (children[childName][propName] && typeof children[childName][propName] === `object`) {
                                                /** @type {?} */
                                                const testCases = serviceTestTests[propName];
                                                /** @type {?} */
                                                const canMap = !!testCases;
                                                children[childName][propName].tests = serviceTestTests[propName];
                                                children[childName][propName].testCases = canMap ? testCases.map((test) => {
                                                    /** @type {?} */
                                                    let asserts = test.name;
                                                    if (test.asserts && test.asserts.map) {
                                                        asserts = test.asserts.map((assert) => assert.name);
                                                    }
                                                    return {
                                                        name: test.name,
                                                        asserts
                                                    };
                                                }) : [];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    /**
     * @param {?} doc
     * @param {?} testName
     * @return {?}
     */
    hasTestRan(doc, testName) {
        if (!doc) {
            return false;
        }
        return DocumentationService.getThis(this.testResults.tests, `${doc}.results.${testName}`);
    }
    /**
     * @param {?} doc
     * @param {?} testName
     * @return {?}
     */
    hasTestPassed(doc, testName) {
        if (!doc) {
            return undefined;
        }
        return DocumentationService.getThis(this.testResults.tests, `${doc}.results.${testName}.pass`);
    }
    /**
     * @param {?} doc
     * @param {?} testName
     * @param {?} index
     * @return {?}
     */
    getTestAssertResult(doc, testName, index) {
        if (!doc) {
            return undefined;
        }
        return DocumentationService.getThis(this.testResults.tests, `${doc}.results.${testName}.results.${index}`);
    }
    /**
     * @param {?} doc
     * @param {?} testIndex
     * @return {?}
     */
    hasTestAsserts(doc, testIndex) {
        if (!doc) {
            return undefined;
        }
        /** @type {?} */
        const asserts = DocumentationService.getThis(this.tests, `${doc}.tests.${testIndex}.asserts`);
        /** @type {?} */
        const assertKeys = [];
        if (asserts) {
            asserts.forEach(element => {
                if (element.name) {
                    assertKeys.push(element.name);
                }
                else {
                    assertKeys.push(element);
                }
            });
        }
        return assertKeys;
    }
    /**
     * @param {?} doc
     * @param {?=} testName
     * @return {?}
     */
    isTestRunning(doc, testName) {
        if (!doc) {
            return undefined;
        }
        if (!testName) {
            return DocumentationService.getThis(this.testResults.tests, `${doc}.running`);
        }
        return DocumentationService.getThis(this.testResults.tests, `${doc}.results.${testName}.running`);
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    getTests(doc) {
        if (!doc) {
            return false;
        }
        return this.tests[doc] || undefined;
    }
    /**
     * @param {?} test
     * @return {?}
     */
    runAsserts(test) {
        return new Promise((resolve, reject) => {
            test.results = [];
            /** @type {?} */
            const runAssert = (index) => {
                if (!test.asserts[index]) {
                    return resolve(test.results);
                }
                /** @type {?} */
                let key = test.asserts[index];
                /** @type {?} */
                let fn = () => { };
                /** @type {?} */
                let pre = null;
                /** @type {?} */
                let val;
                if (typeof key === `string`) {
                    fn = test.methods[key];
                }
                else if (typeof test.asserts[index] === `object`) {
                    key = test.asserts[index].name;
                    fn = test.asserts[index].fn;
                    pre = test.asserts[index].pre || pre;
                }
                /** @type {?} */
                const setResult = () => {
                    if (val instanceof Promise) {
                        val
                            .then(res => {
                            test.results.push({ pass: true, message: res, key });
                            runAssert(index + 1);
                        })
                            .catch(res => {
                            test.results.push({ pass: false, message: res, key });
                            runAssert(index + 1);
                        });
                    }
                    else {
                        test.results.push({ pass: !!val, message: val, key });
                        runAssert(index + 1);
                    }
                };
                if (!pre) {
                    val = fn();
                    setResult();
                }
                else {
                    pre()
                        .then(() => {
                        val = fn();
                        setResult();
                    })
                        .catch(() => {
                        val = fn();
                        setResult();
                    });
                }
            };
            runAssert(0);
        });
    }
    /**
     * @param {?} test
     * @param {?} groupKey
     * @param {?} type
     * @return {?}
     */
    runTest(test, groupKey, type) {
        /** @type {?} */
        const now = new Date().getTime();
        return new Promise((resolve, reject) => {
            this.testResults.testsAreRunning = true;
            if (!this.testResults.tests[type]) {
                this.testResults.tests[type] = {};
            }
            if (!this.testResults.tests[type][groupKey]) {
                this.testResults.tests[type][groupKey] = {
                    pass: 0,
                    results: {},
                    running: true
                };
            }
            this.testResults.tests[type][groupKey].running = true;
            /** @type {?} */
            const setResults = (res) => {
                this.testResults.tests[type][groupKey].running = false;
                this.testResults.tests[type][groupKey].results[test.name] = res;
                this.testResults.testsAreRunning = false;
                if (res.pass) {
                    return resolve(res);
                }
                return reject(res);
            };
            /** @type {?} */
            const finishAssert = (res) => {
                /** @type {?} */
                let passed = true;
                res.forEach((element) => {
                    if (!element.pass) {
                        passed = false;
                    }
                });
                setResults({
                    pass: passed,
                    message: ``,
                    time: new Date().getTime() - now,
                    running: false,
                    results: res
                });
            };
            this.testResults.tests[type][groupKey].results[test.name] = {
                pass: undefined,
                message: ``,
                time: 0,
                running: true
            };
            if (test.asserts && test.asserts.length) {
                this.runAsserts(test).then(finishAssert, finishAssert);
            }
            else if (test.fn && typeof test.fn === `function`) {
                test.fn()
                    .then((res) => {
                    setResults({
                        pass: true,
                        message: ``,
                        time: new Date().getTime() - now,
                        running: false,
                        results: res
                    });
                }, (rej) => {
                    setResults({
                        pass: false,
                        message: rej,
                        time: new Date().getTime() - now,
                        running: false,
                        results: rej
                    });
                });
            }
        });
    }
    /**
     * @param {?} group
     * @param {?} type
     * @return {?}
     */
    runTestGroup(group, type) {
        return new Promise((resolve, reject) => {
            this.testResults.tests[group.name] = {
                pass: undefined,
                results: {}
            };
            /** @type {?} */
            const setResults = (res, index) => {
                /** @type {?} */
                const cantUpdatePass = this.testResults.tests[group.name].pass === false;
                /** @type {?} */
                const newPass = cantUpdatePass ? this.testResults.tests[group.name].pass : res.pass;
                this.testResults.tests[group.name].pass = newPass;
                this.testResults.tests[group.name].results[group.tests[index].name] = res;
                run(index + 1);
            };
            /** @type {?} */
            const run = (index) => {
                if (group.tests[index]) {
                    this.runTest(group.tests[index], group.name, type)
                        .then((res) => {
                        setResults(res, index);
                    })
                        .catch((res) => {
                        setResults(res, index);
                    });
                }
                else {
                    resolve(this.testResults.tests[group.name]);
                }
            };
            run(0);
        });
    }
    /**
     * @desc Runs all tests
     * @param {?=} test - testing param description
     * @return {?}
     */
    runTests(test) {
        return new Promise((resolve, reject) => {
            /** @type {?} */
            const run = (index) => {
                /** @type {?} */
                const type = Object.keys(this.tests)[index];
                /** @type {?} */
                const thisTestGroup = this.tests[type];
                if (thisTestGroup) {
                    /** @type {?} */
                    const runGroup = (groupIndex) => {
                        /** @type {?} */
                        const thisTest = thisTestGroup[Object.keys(thisTestGroup)[groupIndex]];
                        if (thisTest) {
                            this.runTestGroup(thisTest, type)
                                .then((res) => {
                                this.testResults.tests[type][thisTest.name] = res;
                                runGroup(groupIndex + 1);
                            }, (rej) => {
                                this.testResults.tests[type][thisTest.name] = rej;
                                runGroup(groupIndex + 1);
                            });
                        }
                        else {
                            run(index + 1);
                        }
                    };
                    runGroup(0);
                }
                else {
                    resolve(this.testResults.tests);
                }
            };
            run(0);
        });
    }
    /**
     * @param {?} timestamp
     * @return {?}
     */
    getFormatedTime(timestamp) {
        if (timestamp < 1000) {
            return timestamp + `ms`;
        }
        if (timestamp < 1000 * 60) {
            return (timestamp / 1000) + `s`;
        }
        if (timestamp < 1000 * 60 * 60) {
            return (timestamp / 1000 * 60) + `m`;
        }
        return ``;
    }
}
/** @type {?} */
let TestService = new testService();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DocksComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    launch(doc) {
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.service.setDocs(this.docs);
        this.testService.setTests(this.tests);
        if (this.initial && this.initial !== ``) {
            this.service.openDoc(this.initial);
            this.service.states.sidebarState = this.initial.split(`.`)[0];
        }
    }
}
DocksComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-docks',
                template: `<div id="documentation-overlay">
  <app-sidebar></app-sidebar>
  <div class="doc-viewer" [ngClass]="service.openedDoc">
    <div class="doc-container">
      <app-renderer></app-renderer>
    </div>
  </div>
</div>`,
                styles: [`@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}#documentation-overlay{position:fixed;top:0;left:0;height:100%;width:100%;z-index:9999999;background:#fff;overflow:hidden;display:flex;font-family:sans-serif}#documentation-overlay .red-flag{color:#d10005}#documentation-overlay #docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}#documentation-overlay button.disabled{opacity:.5;pointer-events:none}#documentation-overlay button{font-size:12px;border:none;padding:7px;outline:0!important}#documentation-overlay .test-asserts{font-size:12px}#documentation-overlay .test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}#documentation-overlay .test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}#documentation-overlay button.spin-if-running{transition:opacity .5s;margin-right:7px}#documentation-overlay button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}#documentation-overlay .spin-if-running.running>span{transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}#documentation-overlay .spin-if-running>span{display:inline-block}#documentation-overlay button.spin-if-running>span{width:16px;height:16px}#documentation-overlay button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}#documentation-overlay button.spin-if-running.running>span span{left:1px}#documentation-overlay .doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}#documentation-overlay .doc-viewer li{list-style:none}#documentation-overlay .doc-viewer button{background:#f3aa00;color:#fff;cursor:pointer}#documentation-overlay .doc-viewer .doc-element p{margin:7px 0}#documentation-overlay .doc-viewer .doc-element p.description,#documentation-overlay .doc-viewer .doc-element p.subtitle{margin-bottom:21px}#documentation-overlay .doc-viewer .doc-element h2{margin:14px 0}#documentation-overlay .doc-viewer .doc-element section{margin:0 0 28px}#documentation-overlay .doc-viewer .doc-element input,#documentation-overlay .doc-viewer .doc-element select,#documentation-overlay .doc-viewer .doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}#documentation-overlay .doc-viewer .doc-element textarea{height:100px;resize:none}#documentation-overlay .doc-viewer a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}#documentation-overlay .doc-viewer .example-code pre{margin:0}#documentation-overlay .doc-viewer .h1{font-size:28px;font-weight:700;margin:21px 0}#documentation-overlay .doc-viewer .h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}#documentation-overlay .doc-viewer .h2:before{content:"";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}#documentation-overlay .doc-viewer .h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}#documentation-overlay .doc-viewer .h3{font-size:14px;margin:17px 0;font-weight:700}#documentation-overlay .doc-viewer .subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#documentation-overlay .doc-viewer #demo-overlay{width:90%;height:90%}#documentation-overlay .doc-viewer pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;background:#0b1116de;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}#documentation-overlay .doc-viewer .flex-vcenter{display:flex;align-items:center}#documentation-overlay .doc-viewer .test-group-header .h3{margin:0}.noTest{background:#a10005;color:#fff;padding:3px}.noTest *,.noTest .json-formatter-row,.noTest .json-formatter-row a,.noTest .json-formatter-row a:hover{color:#fff}.red-flag{color:#a10005}`]
            },] },
];
DocksComponent.propDecorators = {
    docs: [{ type: Input, args: ['docs',] }],
    initial: [{ type: Input, args: ['initial',] }],
    tests: [{ type: Input, args: ['tests',] }],
    componentClasses: [{ type: Input, args: ['componentClasses',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SidebarComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @return {?}
     */
    get typeNames() {
        return Object.keys(this.service.DocsData);
    }
    /**
     * @return {?}
     */
    get linkNames() {
        /** @type {?} */
        const map = this.typeNames.map(typeName => Object.keys(this.service.DocsData[typeName]));
        return map;
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    getLink(docLinkName, typeName) {
        return `${typeName.toLowerCase()}.${docLinkName}`;
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    isDocumented(docLinkName, typeName) {
        /** @type {?} */
        const docLink = this.getDocLink(docLinkName, typeName);
        return docLink.hasOwnProperty('isDocumented') && !docLink.isDocumented;
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    getDocLink(docLinkName, typeName) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {});
    }
    /**
     * @param {?} state
     * @return {?}
     */
    setSidebarState(state) {
        if (this.service.states.sidebarState === state) {
            this.service.states.sidebarState = ``;
            return;
        }
        this.service.states.sidebarState = state;
    }
}
SidebarComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-sidebar',
                template: `<div class="doc-sidebar">
    <div *ngFor="let typeName of typeNames; let typeIndex = index">
        <div class="sidebar-heading group" [ngClass]="{active: service.states.sidebarState === typeName}" (click)="setSidebarState(typeName)">{{typeName}}</div>
        <div [ngClass]="{shown: service.states.sidebarState === typeName}" class="link-group">
            <div class="doc-sidebar-link" *ngFor="let docLinkName of linkNames[typeIndex]" (click)="service.openDoc(getLink(docLinkName, typeName))">
                <span *ngIf="isDocumented(docLinkName, typeName)" class="red-flag"></span>
                <span>{{getDocLink(docLinkName, typeName).name}}</span>
            </div>
        </div>
    </div>
    <div *ngIf="testService.tests">
        <div class="sidebar-heading" (click)="service.states.view = 'tests'">Tests</div>
    </div>
</div>`,
                styles: [`.doc-sidebar{height:100%;background:#224764;color:#f0f4f8;white-space:nowrap;overflow:auto}.doc-sidebar .sidebar-heading{font-size:12px;font-weight:700;background:rgba(0,0,0,.21);padding:10px;box-shadow:0 -1px 0 rgba(0,0,0,.13);cursor:pointer;text-transform:uppercase}.doc-sidebar .sidebar-heading.group::before{content:"";border:5px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.doc-sidebar .sidebar-heading.group.active::before{border-left-color:transparent;border-top-color:#fff;position:relative;top:3px;left:-2px}.doc-sidebar .link-group{height:0;opacity:0;pointer-events:none;overflow:hidden}.doc-sidebar .link-group.shown{height:auto;opacity:1;pointer-events:all;overflow:auto}.doc-sidebar .doc-sidebar-link{padding:10px;box-shadow:0 -1px 0 rgba(76,112,141,.34),0 -2px 0 rgba(4,34,57,.25);cursor:pointer;font-size:12px}.doc-sidebar .doc-sidebar-link .red-flag{border:3px solid #a10005;border-radius:50%;display:inline-block;vertical-align:middle}`]
            },] },
];
/** @nocollapse */
SidebarComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class RendererComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @return {?}
     */
    get properties() {
        return {
            data: this.service.doc.children.properties,
            columns: [{
                    key: 'name',
                    label: 'name'
                }, {
                    key: 'type',
                    label: 'type',
                    required: true
                }, {
                    key: 'description',
                    label: 'description',
                    required: true
                }, {
                    key: 'testCases',
                    label: 'test cases'
                }]
        };
    }
    /**
     * @return {?}
     */
    get methods() {
        return {
            data: this.service.doc.children.methods,
            columns: [{
                    key: 'name',
                    label: 'name'
                }, {
                    key: 'description',
                    label: 'description',
                    required: true
                }, {
                    key: 'arguments',
                    label: 'arguments'
                }, {
                    label: 'returns',
                    key: 'returns'
                }, {
                    key: 'testCases',
                    label: 'test cases'
                }]
        };
    }
    /**
     * @return {?}
     */
    get attributeProps() {
        return {
            data: this.service.doc.children.attributeProperties,
            columns: [{
                    key: 'name',
                    label: 'name'
                }, {
                    key: 'type',
                    label: 'type',
                    required: true
                }, {
                    key: 'description',
                    label: 'description',
                    required: true
                }, {
                    key: 'testCases',
                    label: 'test cases'
                }]
        };
    }
    /**
     * @return {?}
     */
    get gettersProps() {
        return {
            data: this.service.doc.children.getters,
            columns: [{
                    key: 'name',
                    label: 'name'
                }, {
                    key: 'description',
                    label: 'description',
                    required: true
                }, {
                    key: 'returns',
                    label: 'returns'
                }, {
                    key: 'testCases',
                    label: 'test cases'
                }]
        };
    }
    /**
     * @param {?} type
     * @return {?}
     */
    hasProperties(type) {
        /** @type {?} */
        const children = this.service.doc.children;
        return children && children[type] && Object.keys(children[type]).length;
    }
}
RendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-renderer',
                template: `<article class="doc-element" *ngIf="service.states.view === 'components' && service.doc.name">
    <div class="h1 title">{{ service.doc.name }}
        <span class="subtitle" *ngIf="service.doc.description">{{ service.doc.description }}</span>
    </div>
    <section *ngIf="service.doc.body">
        <div [innerHTML]="service.doc.body"></div>
    </section>
    <section *ngIf="service.doc.group === 'components'">
        <div class="h2" (click)="service.states.demo = !service.states.demo" [ngClass]="service.states.demo ? 'active' : ''">Demo</div>
        <div *ngIf="service.states.demo">
            <div>
                <pre class="demo"><code>{{service.getMarkup(service.doc)}}</code></pre>
            </div>
            <div>
                <!-- <button (click)="launch(service.doc)">Launch demo</button> -->
            </div>
            <div id="demo-overlay-container" *ngIf="service.states.demoOverlay">
                <div id="demo-overlay-close" (click)="service.states.demoOverlay = false">x</div>
                <div id="demo-overlay"></div>
            </div>
        </div>
    </section>

    <section *ngIf="hasProperties('attributeProperties')">
        <div class="h2" (click)="service.states.props = !service.states.props" [ngClass]="service.states.props ? 'active' : ''">Attribute properties</div>
        <app-table-renderer [show]="service.states.props" [properties]="attributeProps"></app-table-renderer>
    </section>

    <section *ngIf="hasProperties('properties')">
        <div class="h2" (click)="service.states.dataProps = !service.states.dataProps" [ngClass]="service.states.dataProps ? 'active' : ''">Properties</div>
        <app-table-renderer [show]="service.states.dataProps" [properties]="properties"></app-table-renderer>
    </section>

    <section *ngIf="hasProperties('getters')">
        <div class="h2" (click)="service.states.getters = !service.states.getters" [ngClass]="service.states.getters ? 'active' : ''">Getters</div>
        <app-table-renderer [show]="service.states.getters" [properties]="gettersProps"></app-table-renderer>
    </section>

    <section *ngIf="hasProperties('methods')">
        <div class="h2" (click)="service.states.methods = !service.states.methods" [ngClass]="service.states.methods ? 'active' : ''">Methods</div>
        <app-table-renderer [show]="service.states.methods" [properties]="methods"></app-table-renderer>
    </section>
</article>`,
                styles: [`@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}.red-flag{color:#d10005}#docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}button.disabled{opacity:.5;pointer-events:none}button{font-size:12px;border:none;padding:7px;outline:0!important;background:#f3aa00;color:#fff;cursor:pointer}.test-asserts{font-size:12px}.test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}.test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}button.spin-if-running{transition:opacity .5s;margin-right:7px}button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}.spin-if-running.running>span{transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}.spin-if-running>span{display:inline-block}button.spin-if-running>span{width:16px;height:16px}button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}button.spin-if-running.running>span span{left:1px}.doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}li{list-style:none}.doc-element p{margin:7px 0}.doc-element p.description,.doc-element p.subtitle{margin-bottom:21px}.doc-element h2{margin:14px 0}.doc-element section{margin:0 0 28px}.doc-element input,.doc-element select,.doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}.doc-element textarea{height:100px;resize:none}a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}.example-code pre{margin:0}.h1{font-size:28px;font-weight:700;margin:21px 0}.h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}.h2:before{content:"";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}.h3{font-size:14px;margin:17px 0;font-weight:700}.subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#demo-overlay{width:90%;height:90%}pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;background:#0b1116de;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}.flex-vcenter{display:flex;align-items:center}.test-group-header .h3{margin:0}`]
            },] },
];
/** @nocollapse */
RendererComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TableRendererComponent {
    constructor() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @return {?}
     */
    get propertiesDataKeys() {
        return Object.keys(this.properties.data);
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    getLink(docLinkName, typeName) {
        return `${typeName.toLowerCase()}.${docLinkName}`;
    }
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    getDocData(docLinkName, typeName) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {});
    }
    /**
     * @param {?} val
     * @return {?}
     */
    showJsonViewer(val) {
        return !!val && typeof val !== `string`;
    }
    /**
     * @param {?} key
     * @return {?}
     */
    showText(key) {
        return key !== 'value' && key !== 'arguments' && key !== 'testCases';
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isString(val) {
        return !!val && typeof val === `string`;
    }
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    hasTest(row, key) {
        return this.service.getThis(this.properties.data, `${row}.${key}`) && this.service.getThis(this.properties.data, `${row}.${key}`, []).length;
    }
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    hasArguments(row, key) {
        if (key !== `arguments`) {
            return false;
        }
        /** @type {?} */
        const val = this.service.getThis(this.properties.data, `${row}.${key}`);
        /** @type {?} */
        const length = (Array.isArray(val) ? val : []).length;
        if (!length) {
            return false;
        }
        /** @type {?} */
        let pass = true;
        val.forEach(element => {
            console.log(element);
            if (!element.hasOwnProperty || !element.hasOwnProperty(`name`)) {
                pass = false;
            }
        });
        return pass;
    }
}
TableRendererComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-table-renderer',
                template: `<table *ngIf="show" class="documentation-table">
    <thead>
        <tr>
            <th *ngFor="let column of properties.columns; let key = index">{{column.label}}</th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let row of propertiesDataKeys; let rowIndex = index">
            <td *ngFor="let column of properties.columns; let key = index" [ngClass]="column.label">
                <!-- <div v-if="column.key === 'value' && properties.data[row]">
                    <app-value-input [model]="properties.data[row]"></app-value-input>
                </div> -->
                <div *ngIf="showText(column.key)">
                    <app-json-viewer *ngIf="showJsonViewer(properties.data[row][column.key])" [json]="properties.data[row][column.key]"></app-json-viewer>
                    <div *ngIf="isString(properties.data[row][column.key])" [innerHTML]="properties.data[row][column.key]"></div>
                </div>
                <div *ngIf="hasArguments(row, column.key)">
                    <div *ngFor="let argument of properties.data[row][column.key]" class="argument-container">
                        <div class="argument-name">
                            <b>{{argument.name}}</b>
                            <span *ngIf="argument.isOptional">: (optional)</span>
                            <span class="argument-body" *ngIf="argument.description"> - {{argument.description}}</span>
                        </div>
                        <div class="argument-body red-flag" *ngIf="!argument.description">missing description</div>
                        <div class="argument-object" *ngIf="argument.type">
                            <app-json-viewer *ngIf="showJsonViewer(argument.type)" [json]="argument.type"></app-json-viewer>
                        </div>
                    </div>
                </div>
                <div *ngIf="column.key === 'testCases'" [ngClass]="{noTest: !hasTest(row, column.key)}">
                    <app-json-viewer *ngIf="showJsonViewer(properties.data[row][column.key])" [json]="properties.data[row][column.key]"></app-json-viewer>
                </div>
            </td>
        </tr>
    </tbody>
</table>`,
                styles: [`.documentation-table{width:100%;text-align:left;border-collapse:collapse}.documentation-table td,.documentation-table th{vertical-align:top;padding:14px;font-size:12px}.documentation-table th{background:#a18f74;color:#fff;text-transform:uppercase}.documentation-table td{background:rgba(9,54,84,.05)}.documentation-table td .red-flag{font-family:monospace}.documentation-table td:nth-child(1){font-weight:700}.documentation-table td.type{text-transform:lowercase}.documentation-table tbody tr:nth-child(even)>td{background:rgba(9,54,84,.1)}.documentation-table td td,.documentation-table td th{padding:7px}.documentation-table td pre{font-family:sans-serif;font-size:12px;line-height:18px;background:rgba(255,255,255,.61);padding:7px;margin:0}.documentation-table .argument-container{margin:0 0 14px}.documentation-table .argument-container .argument-name{background:rgba(35,70,100,.15);padding:7px}.documentation-table .argument-container .argument-object{padding:5px 7px;background:rgba(255,255,255,.85)}.documentation-table .argument-container:last-child{margin:0}.documentation-table .noTest{background:#a10005;color:#fff;padding:3px}.documentation-table .noTest *,.documentation-table .noTest .json-formatter-row,.documentation-table .noTest .json-formatter-row a,.documentation-table .noTest .json-formatter-row a:hover{color:#fff}`]
            },] },
];
/** @nocollapse */
TableRendererComponent.ctorParameters = () => [];
TableRendererComponent.propDecorators = {
    show: [{ type: Input, args: ['show',] }],
    properties: [{ type: Input, args: ['properties',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class JsonViewerComponent {
    /**
     * @return {?}
     */
    get html() {
        /** @type {?} */
        const formatter = new JSONFormatter(this.json, 0, {
            hoverPreviewEnabled: false,
            hoverPreviewArrayCount: 100,
            hoverPreviewFieldCount: 5,
        });
        return formatter.render().outerHTML;
    }
}
JsonViewerComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-json-viewer',
                template: `<div [innerHTML]="html"></div>`,
                styles: [`.json-formatter-row .json-formatter-row,.json-formatter-row a{white-space:nowrap}`]
            },] },
];
JsonViewerComponent.propDecorators = {
    json: [{ type: Input, args: ['json',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ViewerInputComponent {
    constructor() {
        this.proxyModel = ``;
        this.type = `string`;
    }
    /**
     * @return {?}
     */
    getProxyModel() {
        switch (this.type) {
            case `string`:
                return this.model.value ? this.model.value.toString() : ``;
            case `number`:
                return this.model.value ? parseFloat(this.model.value) : 0;
            case `boolean`:
                return this.model.value;
            default:
                /** @type {?} */
                let val = this.model.value;
                try {
                    val = JSON.stringify(this.model.value);
                }
                catch (error) { }
                return val || `{}`;
        }
    }
    /**
     * @return {?}
     */
    updateVal() {
        /** @type {?} */
        let value = this.proxyModel;
        switch (this.type) {
            case `string`:
                this.model.value = value ? value.toString() : ``;
                break;
            case `number`:
                this.model.value = value ? parseFloat(value) : 0;
                break;
            case `boolean`:
                this.model.value = !!value;
                break;
            default:
                try {
                    value = JSON.parse(value);
                }
                catch (error) { }
                this.model.value = value || {};
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        console.log(this.type, this.model);
        this.proxyModel = this.getProxyModel();
        this.type = this.model ? this.model.type || this.model.kind || `string` : `string`;
    }
    /**
     * @return {?}
     */
    showTextarea() {
        return this.type !== 'string' && this.type !== 'number';
    }
}
ViewerInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-value-input',
                template: `<div class="value-input">
    <textarea *ngIf="showTextarea()" [(ngModel)]="proxyModel" (input)="updateVal"></textarea>
    <!-- <input type="number" *ngIf="type === 'number'" [(ngModel)]="proxyModel" (input)="updateVal">
    <input type="text" *ngIf="type === 'string'" [(ngModel)]="proxyModel" (input)="updateVal">
    <input type="checkbox" *ngIf="type === 'boolean'" [(ngModel)]="proxyModel" (input)="updateVal"> -->
</div>`,
                styles: [``]
            },] },
];
ViewerInputComponent.propDecorators = {
    model: [{ type: Input, args: ['model',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class DocksModule {
}
DocksModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    FormsModule
                ],
                declarations: [
                    DocksComponent,
                    SidebarComponent,
                    RendererComponent,
                    TableRendererComponent,
                    JsonViewerComponent,
                    ViewerInputComponent
                ],
                exports: [DocksComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DocksModule, DocksComponent as ɵa, JsonViewerComponent as ɵe, RendererComponent as ɵc, SidebarComponent as ɵb, TableRendererComponent as ɵd, ViewerInputComponent as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja3MtYW5ndWxhci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9kb2N1bWVudGF0aW9uLXNlcnZpY2UudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvdGVzdC1zZXJ2aWNlLnRzIiwibmc6Ly9kb2Nrcy1hbmd1bGFyL3NyYy9tb2R1bGVzL2RvY2tzL2RvY2tzLmNvbXBvbmVudC50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9zaWRlYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvdGFibGUtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9kb2Nrcy1hbmd1bGFyL3NyYy9tb2R1bGVzL2RvY2tzL2pzb24tdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy92YWx1ZS1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvZG9ja3MubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBkb2N1bWVudGF0aW9uU2VydmljZSB7XG4gICAgZG9jOiBhbnkgPSB7fVxuICAgIG9wZW5lZERvYyA9ICdkb2MtYWN0aXZlLWRyb3Bkb3duJ1xuICAgIERvY3NEYXRhOiBhbnkgPSB7fVxuXG4gICAgc3RhdGVzID0ge1xuICAgICAgICBwcm9wczogZmFsc2UsXG4gICAgICAgIG1ldGhvZHM6IGZhbHNlLFxuICAgICAgICBnZXR0ZXJzOiBmYWxzZSxcbiAgICAgICAgZGF0YVByb3BzOiBmYWxzZSxcbiAgICAgICAgZGVtbzogZmFsc2UsXG4gICAgICAgIGRlbW9PdmVybGF5OiBmYWxzZSxcbiAgICAgICAgY29tcG9uZW50czogZmFsc2UsXG4gICAgICAgIHRlc3RzOiBmYWxzZSxcbiAgICAgICAgdmlldzogJycsXG4gICAgICAgIHNpZGViYXJTdGF0ZTogYGAsXG4gICAgICAgIGFyZ1RvU2hvdzogYGBcbiAgICB9XG5cbiAgICBzZXREb2NzKERvY3NEYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5Eb2NzRGF0YSA9IERvY3NEYXRhXG4gICAgfVxuXG4gICAgc2V0RG9jKCkge1xuICAgICAgICB0aGlzLmRvYyA9IHRoaXMuZ2V0VGhpcyh0aGlzLkRvY3NEYXRhLCB0aGlzLm9wZW5lZERvYywge30pXG4gICAgICAgIHJldHVybiB0aGlzLmRvY1xuICAgIH1cblxuICAgIG9wZW5Eb2MoZG9jOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vcGVuZWREb2MgPSBkb2NcbiAgICAgICAgdGhpcy5zdGF0ZXMudmlldyA9IGBjb21wb25lbnRzYFxuICAgICAgICB0aGlzLnNldERvYygpXG4gICAgfVxuXG4gICAgZ2V0TWFya3VwKGRvYzogYW55KSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gW11cblxuICAgICAgICBmb3IgKGNvbnN0IHAgaW4gZG9jLnByb3BzKSB7XG4gICAgICAgICAgICBpZiAoZG9jLnByb3BzW3BdKSB7XG4gICAgICAgICAgICAgICAgcHJvcHMucHVzaChgOiR7cH09XCJkb2MucHJvcHMuJHtwfS52YWx1ZVwiYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgPCR7ZG9jLm5hbWV9JHtwcm9wcy5sZW5ndGggPyBgXFxuICBgIDogYGB9JHtwcm9wcy5qb2luKCdcXG4gICcpfSR7cHJvcHMubGVuZ3RoID8gYFxcbmAgOiBgYH0+PC8ke2RvYy5uYW1lfT5gXG4gICAgfVxuXG4gICAganNvbihvYmo6IGFueSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gYGBcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAnICAgICcpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgZG9jTmFtZShkb2M6IGFueSkge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkb2MubmFtZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlbCBUaGUgc3RhcnRpbmcgb2JqZWN0XG4gICAgICogQHBhcmFtIHBhdGggU3RyaW5nIHRvIGZvbGxvd1xuICAgICAqIEBwYXJhbSBlbXB0eVZhbCBXaGF0IGlzIHJldHVybmVkIGlmIHVuZGVmaW5lZFxuICAgICAqIEBkZXNjIE5hdmlnYXRlcyBhbiBvYmplY3Qgb3IgYXJyYXkgdG8gZmluZCBhIHZhbHVlXG4gICAgICovXG4gICAgZ2V0VGhpcyhlbDogYW55LCBwYXRoOiBBcnJheTxhbnk+IHwgc3RyaW5nLCBlbXB0eVZhbD86IGFueSkge1xuICAgICAgICBpZiAocGF0aCAmJiBwYXRoLnRvU3RyaW5nKCkuc3BsaXQpIHtcbiAgICAgICAgICAgIHBhdGggPSBbZWxdLmNvbmNhdChwYXRoLnRvU3RyaW5nKCkuc3BsaXQoYC5gKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGggPSBbZWxdXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSBwYXRoLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGFjY3VtdWxhdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlWYWxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5pbmRleE9mKGAuYCkgPT09IC0xICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKGAoYCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdzU3RyaW5nID0gJydcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3NPYmogPSAvXFwoKC4qPylcXCkvZy5leGVjKGN1cnJlbnRWYWx1ZSlcblxuICAgICAgICAgICAgICAgIGlmIChhcmdzT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NTdHJpbmcgPSBhcmdzT2JqWzFdIHx8IGBgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IGFyZ3NTdHJpbmcuc3BsaXQoYCxgKS5tYXAoKGFyZykgPT4gYXJnLnRyaW0oKSlcbiAgICAgICAgICAgICAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSBjdXJyZW50VmFsdWUuc3BsaXQoYChgKVswXVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY2N1bXVsYXRvcltmdW5jdGlvbk5hbWVdID09PSBgZnVuY3Rpb25gKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF9yZXN1bHQgPSBhY2N1bXVsYXRvcltmdW5jdGlvbk5hbWVdLmFwcGx5KGFjY3VtdWxhdG9yLCBhcmdzKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcltjdXJyZW50VmFsdWVdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvclxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlWYWxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgRG9jdW1lbnRhdGlvblNlcnZpY2UgPSBuZXcgZG9jdW1lbnRhdGlvblNlcnZpY2UoKVxuIiwiaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIHRlc3RTZXJ2aWNlIHtcbiAgICBkb2M6IGFueSA9IHt9XG4gICAgb3BlbmVkRG9jID0gJ2RvYy1hY3RpdmUtZHJvcGRvd24nXG4gICAgdGVzdFJlc3VsdHM6IGFueSA9IHtcbiAgICAgICAgdGVzdHNBcmVSdW5uaW5nOiBmYWxzZSxcbiAgICAgICAgdGVzdHM6IHt9XG4gICAgfVxuXG4gICAgdGVzdHM6IGFueSA9IHt9XG4gICAgZmxhdFRlc3RzOiBhbnkgPSB7fVxuICAgIHRlc3RUeXBlczogYW55ID0ge1xuICAgICAgICBjbGFzczogW10sXG4gICAgICAgIGNvbXBvbmVudHM6IFtdLFxuICAgICAgICBtb2R1bGVzOiBbXSxcbiAgICAgICAgJ29iamVjdCBsaXRlcmFscyc6IFtdLFxuICAgICAgICBpbnRlcmZhY2VzOiBbXSxcbiAgICAgICAgdmFyaWFibGU6IFtdXG4gICAgfVxuICAgIHNob3duVGVzdHNTdGF0ZSA9IGBgXG5cbiAgICBzZXRUZXN0cyh0ZXN0czogYW55KSB7XG4gICAgICAgIHRoaXMudGVzdHMgPSB0ZXN0c1xuICAgICAgICB0aGlzLnRlc3RUeXBlcy5jbGFzcyA9IERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0cywgYGNsYXNzYCwgW10pXG5cbiAgICAgICAgY29uc3QgdHlwZXNUb1Rlc3QgPSBbXG4gICAgICAgICAgICBgbWV0aG9kc2AsXG4gICAgICAgICAgICBgcHJvcGVydGllc2AsXG4gICAgICAgICAgICBgYXR0cmlidXRlUHJvcGVydGllc2AsXG4gICAgICAgICAgICBgZ2V0dGVyc2BcbiAgICAgICAgXVxuXG4gICAgICAgIGZvciAoY29uc3QgdHlwZSBpbiBEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YSkge1xuICAgICAgICAgICAgaWYgKERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRvY05hbWUgaW4gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdW2RvY05hbWVdICYmIGRvY05hbWUgIT09IGBEb2N1bWVudGF0aW9uU2VydmljZWAgJiYgZG9jTmFtZSAhPT0gYFRlc3RTZXJ2aWNlYCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlVGVzdCA9IERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0VHlwZXMsIGAke3R5cGV9LiR7ZG9jTmFtZX1gLCB7IHRlc3RzOiBbXSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZVRlc3RUZXN0czogYW55ID0ge31cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VUZXN0LnRlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3QudGVzdHMuZm9yRWFjaCgodGVzdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JzID0gdGVzdC5mb3JcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcnMgPSB0ZXN0Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JzICYmIEFycmF5LmlzQXJyYXkoZm9ycykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcnMuZm9yRWFjaChfZm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2VUZXN0VGVzdHNbX2Zvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tfZm9yXSA9IFt0ZXN0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW19mb3JdLnB1c2godGVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2VUZXN0VGVzdHNbZm9yc10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdID0gW3Rlc3RdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdLnB1c2godGVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YVt0eXBlXVtkb2NOYW1lXS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV1bZG9jTmFtZV0uY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkTmFtZSBpbiBjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5bY2hpbGROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhY2hpbGRyZW5bY2hpbGROYW1lXSAmJiB0eXBlc1RvVGVzdC5pbmRleE9mKGNoaWxkTmFtZSkgPiAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZHJlbltjaGlsZE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltjaGlsZE5hbWVdW3Byb3BOYW1lXSAmJiB0eXBlb2YgY2hpbGRyZW5bY2hpbGROYW1lXVtwcm9wTmFtZV0gPT09IGBvYmplY3RgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0Q2FzZXMgPSBzZXJ2aWNlVGVzdFRlc3RzW3Byb3BOYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FuTWFwID0gISF0ZXN0Q2FzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdLnRlc3RzID0gc2VydmljZVRlc3RUZXN0c1twcm9wTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdLnRlc3RDYXNlcyA9IGNhbk1hcCA/IHRlc3RDYXNlcy5tYXAoKHRlc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NlcnRzID0gdGVzdC5uYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdC5hc3NlcnRzICYmIHRlc3QuYXNzZXJ0cy5tYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0cyA9IHRlc3QuYXNzZXJ0cy5tYXAoKGFzc2VydDogYW55KSA9PiBhc3NlcnQubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0ZXN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSA6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNUZXN0UmFuKGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9YClcbiAgICB9XG5cbiAgICBoYXNUZXN0UGFzc2VkKGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFJlc3VsdHMudGVzdHMsIGAke2RvY30ucmVzdWx0cy4ke3Rlc3ROYW1lfS5wYXNzYClcbiAgICB9XG5cbiAgICBnZXRUZXN0QXNzZXJ0UmVzdWx0KGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJlc3VsdHMuJHt0ZXN0TmFtZX0ucmVzdWx0cy4ke2luZGV4fWApXG4gICAgfVxuXG4gICAgaGFzVGVzdEFzc2VydHMoZG9jOiBzdHJpbmcsIHRlc3RJbmRleDogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2VydHM6IEFycmF5PGFueT4gPSBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdHMsIGAke2RvY30udGVzdHMuJHt0ZXN0SW5kZXh9LmFzc2VydHNgKVxuICAgICAgICBjb25zdCBhc3NlcnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gW11cblxuICAgICAgICBpZiAoYXNzZXJ0cykge1xuICAgICAgICAgICAgYXNzZXJ0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0S2V5cy5wdXNoKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnRLZXlzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzc2VydEtleXNcbiAgICB9XG5cbiAgICBpc1Rlc3RSdW5uaW5nKGRvYzogc3RyaW5nLCB0ZXN0TmFtZT86IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRlc3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJ1bm5pbmdgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9LnJ1bm5pbmdgKVxuICAgIH1cblxuICAgIGdldFRlc3RzKGRvYzogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdHNbZG9jXSB8fCB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBydW5Bc3NlcnRzKHRlc3Q6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGVzdC5yZXN1bHRzID0gW11cblxuICAgICAgICAgICAgY29uc3QgcnVuQXNzZXJ0ID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRlc3QuYXNzZXJ0c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGVzdC5yZXN1bHRzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBrZXk6IGFueSA9IHRlc3QuYXNzZXJ0c1tpbmRleF1cbiAgICAgICAgICAgICAgICBsZXQgZm46IEZ1bmN0aW9uID0gKCkgPT4geyB9XG4gICAgICAgICAgICAgICAgbGV0IHByZTogRnVuY3Rpb24gfCBudWxsID0gbnVsbFxuICAgICAgICAgICAgICAgIGxldCB2YWw6IGFueVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IGBzdHJpbmdgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuID0gdGVzdC5tZXRob2RzW2tleV1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0ZXN0LmFzc2VydHNbaW5kZXhdID09PSBgb2JqZWN0YCkge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSB0ZXN0LmFzc2VydHNbaW5kZXhdLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgZm4gPSB0ZXN0LmFzc2VydHNbaW5kZXhdLmZuXG4gICAgICAgICAgICAgICAgICAgIHByZSA9IHRlc3QuYXNzZXJ0c1tpbmRleF0ucHJlIHx8IHByZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QucmVzdWx0cy5wdXNoKHsgcGFzczogdHJ1ZSwgbWVzc2FnZTogcmVzLCBrZXkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6IGZhbHNlLCBtZXNzYWdlOiByZXMsIGtleSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5Bc3NlcnQoaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6ICEhdmFsLCBtZXNzYWdlOiB2YWwsIGtleSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcHJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVuQXNzZXJ0KDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcnVuVGVzdCh0ZXN0OiBhbnksIGdyb3VwS2V5OiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzQXJlUnVubmluZyA9IHRydWVcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXSA9IHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGFzczogMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0czoge30sXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bZ3JvdXBLZXldLnJ1bm5pbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdHMgPSAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5ydW5uaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5yZXN1bHRzW3Rlc3QubmFtZV0gPSByZXNcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzQXJlUnVubmluZyA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICBpZiAocmVzLnBhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocmVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaW5pc2hBc3NlcnQgPSAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFzc2VkID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnQucGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFzczogcGFzc2VkLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgYCxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBub3csXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5yZXN1bHRzW3Rlc3QubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFzczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBgLFxuICAgICAgICAgICAgICAgIHRpbWU6IDAsXG4gICAgICAgICAgICAgICAgcnVubmluZzogdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGVzdC5hc3NlcnRzICYmIHRlc3QuYXNzZXJ0cy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucnVuQXNzZXJ0cyh0ZXN0KS50aGVuKGZpbmlzaEFzc2VydCwgZmluaXNoQXNzZXJ0KVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3QuZm4gJiYgdHlwZW9mIHRlc3QuZm4gPT09IGBmdW5jdGlvbmApIHtcbiAgICAgICAgICAgICAgICB0ZXN0LmZuKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgKHJlajogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZWosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBub3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVqXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcnVuVGVzdEdyb3VwKGdyb3VwOiBhbnksIHR5cGU6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFzczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdHMgPSAocmVzOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW50VXBkYXRlUGFzcyA9IHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucGFzcyA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXNzID0gY2FudFVwZGF0ZVBhc3MgPyB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdLnBhc3MgOiByZXMucGFzc1xuXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1tncm91cC5uYW1lXS5wYXNzID0gbmV3UGFzc1xuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucmVzdWx0c1tncm91cC50ZXN0c1tpbmRleF0ubmFtZV0gPSByZXNcblxuICAgICAgICAgICAgICAgIHJ1bihpbmRleCArIDEpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJ1biA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwLnRlc3RzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1blRlc3QoZ3JvdXAudGVzdHNbaW5kZXhdLCBncm91cC5uYW1lLCB0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyhyZXMsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHJlcywgaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVuKDApXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBSdW5zIGFsbCB0ZXN0c1xuICAgICAqIEBwYXJhbSB0ZXN0IC0gdGVzdGluZyBwYXJhbSBkZXNjcmlwdGlvblxuICAgICAqL1xuICAgIHJ1blRlc3RzKHRlc3Q/OiB7IGlkOiBzdHJpbmcgfSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJ1biA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMudGVzdHMpW2luZGV4XVxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNUZXN0R3JvdXAgPSB0aGlzLnRlc3RzW3R5cGVdXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1Rlc3RHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBydW5Hcm91cCA9IChncm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNUZXN0ID0gdGhpc1Rlc3RHcm91cFtPYmplY3Qua2V5cyh0aGlzVGVzdEdyb3VwKVtncm91cEluZGV4XV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNUZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5UZXN0R3JvdXAodGhpc1Rlc3QsIHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVt0aGlzVGVzdC5uYW1lXSA9IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoZ3JvdXBJbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChyZWo6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVt0aGlzVGVzdC5uYW1lXSA9IHJlalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoZ3JvdXBJbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bihpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBydW5Hcm91cCgwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy50ZXN0UmVzdWx0cy50ZXN0cylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bigwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEZvcm1hdGVkVGltZSh0aW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICBpZiAodGltZXN0YW1wIDwgMTAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVzdGFtcCArIGBtc2BcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgPCAxMDAwICogNjApIHtcbiAgICAgICAgICAgIHJldHVybiAodGltZXN0YW1wIC8gMTAwMCkgKyBgc2BcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgPCAxMDAwICogNjAgKiA2MCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aW1lc3RhbXAgLyAxMDAwICogNjApICsgYG1gXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYGBcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgVGVzdFNlcnZpY2UgPSBuZXcgdGVzdFNlcnZpY2UoKVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtZG9ja3MnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBpZD1cImRvY3VtZW50YXRpb24tb3ZlcmxheVwiPlxuICA8YXBwLXNpZGViYXI+PC9hcHAtc2lkZWJhcj5cbiAgPGRpdiBjbGFzcz1cImRvYy12aWV3ZXJcIiBbbmdDbGFzc109XCJzZXJ2aWNlLm9wZW5lZERvY1wiPlxuICAgIDxkaXYgY2xhc3M9XCJkb2MtY29udGFpbmVyXCI+XG4gICAgICA8YXBwLXJlbmRlcmVyPjwvYXBwLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYEAtd2Via2l0LWtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGluZ3swJSwxMDAle29wYWNpdHk6LjN9NTAle29wYWNpdHk6Ljh9fUBrZXlmcmFtZXMgZmFkaW5nezAlLDEwMCV7b3BhY2l0eTouM301MCV7b3BhY2l0eTouOH19I2RvY3VtZW50YXRpb24tb3ZlcmxheXtwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt6LWluZGV4Ojk5OTk5OTk7YmFja2dyb3VuZDojZmZmO292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmZsZXg7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5yZWQtZmxhZ3tjb2xvcjojZDEwMDA1fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgI2RvY3MtY2xvc2UtYnV0dG9ue3Bvc2l0aW9uOmZpeGVkO3RvcDo3cHg7cmlnaHQ6N3B4O2NvbG9yOiNmZmY7YmFja2dyb3VuZDojZjNhYTAwO3BhZGRpbmc6N3B4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXItcmFkaXVzOjUwJTtmb250LXdlaWdodDo3MDA7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTVweDtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5kaXNhYmxlZHtvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmV9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b257Zm9udC1zaXplOjEycHg7Ym9yZGVyOm5vbmU7cGFkZGluZzo3cHg7b3V0bGluZTowIWltcG9ydGFudH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC50ZXN0LWFzc2VydHN7Zm9udC1zaXplOjEycHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAudGVzdC1hc3NlcnRzIC50ZXN0LWFzc2VydHtwYWRkaW5nOjdweCA3cHggN3B4IDQ3cHg7YmFja2dyb3VuZDpyZ2JhKDM1LDcxLDEwMCwuMDQpfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnRlc3QtYXNzZXJ0cyAudGVzdC1hc3NlcnQ6bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6cmdiYSgzNSw3MSwxMDAsLjA5KX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5zcGluLWlmLXJ1bm5pbmd7dHJhbnNpdGlvbjpvcGFjaXR5IC41czttYXJnaW4tcmlnaHQ6N3B4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9uLnNwaW4taWYtcnVubmluZy5ydW5uaW5ne29wYWNpdHk6LjU7cG9pbnRlci1ldmVudHM6bm9uZTstd2Via2l0LWFuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnNwaW4taWYtcnVubmluZy5ydW5uaW5nPnNwYW57dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycywtd2Via2l0LXRyYW5zZm9ybSAuMnM7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHJvdGF0aW5nO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgcm90YXRpbmd9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuc3Bpbi1pZi1ydW5uaW5nPnNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2t9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW57d2lkdGg6MTZweDtoZWlnaHQ6MTZweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5zcGluLWlmLXJ1bm5pbmc+c3BhbiBzcGFue3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6MXB4O3RvcDowO3RyYW5zaXRpb246bGVmdCAuMnN9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5nLnJ1bm5pbmc+c3BhbiBzcGFue2xlZnQ6MXB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXJ7aGVpZ2h0OjEwMCU7cGFkZGluZzoxNHB4O292ZXJmbG93OmF1dG87d2lkdGg6MTAwJTtjb2xvcjojMjM0NzY0fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgbGl7bGlzdC1zdHlsZTpub25lfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgYnV0dG9ue2JhY2tncm91bmQ6I2YzYWEwMDtjb2xvcjojZmZmO2N1cnNvcjpwb2ludGVyfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHB7bWFyZ2luOjdweCAwfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHAuZGVzY3JpcHRpb24sI2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgcC5zdWJ0aXRsZXttYXJnaW4tYm90dG9tOjIxcHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgaDJ7bWFyZ2luOjE0cHggMH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBzZWN0aW9ue21hcmdpbjowIDAgMjhweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBpbnB1dCwjZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBzZWxlY3QsI2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgdGV4dGFyZWF7YmFja2dyb3VuZDojZmZmO2JvcmRlcjpub25lO2hlaWdodDozMnB4O3dpZHRoOjEwMCU7bWF4LXdpZHRoOjIxMHB4O2JvcmRlci1yYWRpdXM6MXB4O291dGxpbmU6MCFpbXBvcnRhbnQ7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO3BhZGRpbmc6MTBweDtjb2xvcjojMjM0NjY0O2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjIyKTtib3gtc2l6aW5nOmJvcmRlci1ib3h9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgdGV4dGFyZWF7aGVpZ2h0OjEwMHB4O3Jlc2l6ZTpub25lfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgYSAuZXhhbXBsZS1jb2Rle3dpZHRoOjEwMCU7b3ZlcmZsb3c6YXV0bztwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOiNhMThmNzQ7Y29sb3I6I2ZmZjtmb250LXNpemU6MTJweDttYXJnaW4tYm90dG9tOjIxcHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZXhhbXBsZS1jb2RlIHByZXttYXJnaW46MH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5oMXtmb250LXNpemU6MjhweDtmb250LXdlaWdodDo3MDA7bWFyZ2luOjIxcHggMH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5oMntmb250LXNpemU6MThweDttYXJnaW46MTRweCAwIDA7YmFja2dyb3VuZDojMjM0NzY0O2NvbG9yOiNmZmY7cGFkZGluZzoxMHB4O2N1cnNvcjpwb2ludGVyfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmgyOmJlZm9yZXtjb250ZW50OlwiXCI7Ym9yZGVyOjdweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdC1jb2xvcjojZmZmO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2t9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDIuYWN0aXZlOmJlZm9yZXtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dG9wOjRweDtsZWZ0Oi0zcHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDN7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjE3cHggMDtmb250LXdlaWdodDo3MDB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuc3VidGl0bGV7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MTAwO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO21hcmdpbi1sZWZ0OjdweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyICNkZW1vLW92ZXJsYXl7d2lkdGg6OTAlO2hlaWdodDo5MCV9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciBwcmUuZGVtb3tmb250LXNpemU6MTJweDtwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOnJnYmEoOSw1NCw4NCwuMSk7b3ZlcmZsb3c6YXV0b30jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyICNkZW1vLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowO2JhY2tncm91bmQ6IzBiMTExNmRlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt6LWluZGV4Ojk5OTk5OTk5OTtjb2xvcjojZmZmO292ZXJmbG93OmF1dG99I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAjZGVtby1vdmVybGF5LWNsb3Nle3Bvc2l0aW9uOmZpeGVkO3RvcDoxNHB4O3JpZ2h0OjE0cHg7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuMjMpO3BhZGRpbmc6N3B4O3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXItcmFkaXVzOjUwJTtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5mbGV4LXZjZW50ZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC50ZXN0LWdyb3VwLWhlYWRlciAuaDN7bWFyZ2luOjB9Lm5vVGVzdHtiYWNrZ3JvdW5kOiNhMTAwMDU7Y29sb3I6I2ZmZjtwYWRkaW5nOjNweH0ubm9UZXN0ICosLm5vVGVzdCAuanNvbi1mb3JtYXR0ZXItcm93LC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdyBhLC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdyBhOmhvdmVye2NvbG9yOiNmZmZ9LnJlZC1mbGFne2NvbG9yOiNhMTAwMDV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRG9ja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgc2VydmljZTogYW55ID0gRG9jdW1lbnRhdGlvblNlcnZpY2VcbiAgICB0ZXN0U2VydmljZTogYW55ID0gVGVzdFNlcnZpY2VcblxuICAgIEBJbnB1dCgnZG9jcycpXG4gICAgZG9jczogYW55XG5cbiAgICBASW5wdXQoJ2luaXRpYWwnKVxuICAgIGluaXRpYWw6IHN0cmluZ1xuXG4gICAgQElucHV0KCd0ZXN0cycpXG4gICAgdGVzdHM6IGFueVxuXG4gICAgQElucHV0KCdjb21wb25lbnRDbGFzc2VzJylcbiAgICBjb21wb25lbnRDbGFzc2VzOiBhbnlcblxuICAgIGxhdW5jaChkb2M6IGFueSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2V0RG9jcyh0aGlzLmRvY3MpXG4gICAgICAgIHRoaXMudGVzdFNlcnZpY2Uuc2V0VGVzdHModGhpcy50ZXN0cylcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsICYmIHRoaXMuaW5pdGlhbCAhPT0gYGApIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5vcGVuRG9jKHRoaXMuaW5pdGlhbClcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID0gdGhpcy5pbml0aWFsLnNwbGl0KGAuYClbMF1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZG9jLXNpZGViYXJcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCB0eXBlTmFtZSBvZiB0eXBlTmFtZXM7IGxldCB0eXBlSW5kZXggPSBpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1oZWFkaW5nIGdyb3VwXCIgW25nQ2xhc3NdPVwie2FjdGl2ZTogc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID09PSB0eXBlTmFtZX1cIiAoY2xpY2spPVwic2V0U2lkZWJhclN0YXRlKHR5cGVOYW1lKVwiPnt7dHlwZU5hbWV9fTwvZGl2PlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIntzaG93bjogc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID09PSB0eXBlTmFtZX1cIiBjbGFzcz1cImxpbmstZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkb2Mtc2lkZWJhci1saW5rXCIgKm5nRm9yPVwibGV0IGRvY0xpbmtOYW1lIG9mIGxpbmtOYW1lc1t0eXBlSW5kZXhdXCIgKGNsaWNrKT1cInNlcnZpY2Uub3BlbkRvYyhnZXRMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSkpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0RvY3VtZW50ZWQoZG9jTGlua05hbWUsIHR5cGVOYW1lKVwiIGNsYXNzPVwicmVkLWZsYWdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3tnZXREb2NMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSkubmFtZX19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJ0ZXN0U2VydmljZS50ZXN0c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1oZWFkaW5nXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLnZpZXcgPSAndGVzdHMnXCI+VGVzdHM8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5kb2Mtc2lkZWJhcntoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kOiMyMjQ3NjQ7Y29sb3I6I2YwZjRmODt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6YXV0b30uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZ3tmb250LXNpemU6MTJweDtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yMSk7cGFkZGluZzoxMHB4O2JveC1zaGFkb3c6MCAtMXB4IDAgcmdiYSgwLDAsMCwuMTMpO2N1cnNvcjpwb2ludGVyO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZy5ncm91cDo6YmVmb3Jle2NvbnRlbnQ6XCJcIjtib3JkZXI6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0LWNvbG9yOiNmZmY7d2lkdGg6MDtoZWlnaHQ6MDtkaXNwbGF5OmlubGluZS1ibG9ja30uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZy5ncm91cC5hY3RpdmU6OmJlZm9yZXtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dG9wOjNweDtsZWZ0Oi0ycHh9LmRvYy1zaWRlYmFyIC5saW5rLWdyb3Vwe2hlaWdodDowO29wYWNpdHk6MDtwb2ludGVyLWV2ZW50czpub25lO292ZXJmbG93OmhpZGRlbn0uZG9jLXNpZGViYXIgLmxpbmstZ3JvdXAuc2hvd257aGVpZ2h0OmF1dG87b3BhY2l0eToxO3BvaW50ZXItZXZlbnRzOmFsbDtvdmVyZmxvdzphdXRvfS5kb2Mtc2lkZWJhciAuZG9jLXNpZGViYXItbGlua3twYWRkaW5nOjEwcHg7Ym94LXNoYWRvdzowIC0xcHggMCByZ2JhKDc2LDExMiwxNDEsLjM0KSwwIC0ycHggMCByZ2JhKDQsMzQsNTcsLjI1KTtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTJweH0uZG9jLXNpZGViYXIgLmRvYy1zaWRlYmFyLWxpbmsgLnJlZC1mbGFne2JvcmRlcjozcHggc29saWQgI2ExMDAwNTtib3JkZXItcmFkaXVzOjUwJTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgc2VydmljZTogYW55ID0gRG9jdW1lbnRhdGlvblNlcnZpY2VcbiAgICB0ZXN0U2VydmljZTogYW55ID0gVGVzdFNlcnZpY2VcblxuICAgIGdldCB0eXBlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zZXJ2aWNlLkRvY3NEYXRhKVxuICAgIH1cblxuICAgIGdldCBsaW5rTmFtZXMoKTogQXJyYXk8c3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy50eXBlTmFtZXMubWFwKHR5cGVOYW1lID0+IE9iamVjdC5rZXlzKHRoaXMuc2VydmljZS5Eb2NzRGF0YVt0eXBlTmFtZV0pKVxuICAgICAgICByZXR1cm4gbWFwXG4gICAgfVxuXG4gICAgZ2V0TGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3R5cGVOYW1lLnRvTG93ZXJDYXNlKCl9LiR7ZG9jTGlua05hbWV9YFxuICAgIH1cblxuICAgIGlzRG9jdW1lbnRlZChkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGRvY0xpbmsgPSB0aGlzLmdldERvY0xpbmsoZG9jTGlua05hbWUsIHR5cGVOYW1lKVxuICAgICAgICByZXR1cm4gZG9jTGluay5oYXNPd25Qcm9wZXJ0eSgnaXNEb2N1bWVudGVkJykgJiYgIWRvY0xpbmsuaXNEb2N1bWVudGVkXG4gICAgfVxuXG4gICAgZ2V0RG9jTGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnNlcnZpY2UuRG9jc0RhdGEsIHRoaXMuZ2V0TGluayhkb2NMaW5rTmFtZSwgdHlwZU5hbWUpLCB7fSlcbiAgICB9XG5cbiAgICBzZXRTaWRlYmFyU3RhdGUoc3RhdGU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLnN0YXRlcy5zaWRlYmFyU3RhdGUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9IGBgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID0gc3RhdGVcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9kb2N1bWVudGF0aW9uLXNlcnZpY2UnXG5pbXBvcnQgeyBUZXN0U2VydmljZSB9IGZyb20gJy4vdGVzdC1zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGU6IGA8YXJ0aWNsZSBjbGFzcz1cImRvYy1lbGVtZW50XCIgKm5nSWY9XCJzZXJ2aWNlLnN0YXRlcy52aWV3ID09PSAnY29tcG9uZW50cycgJiYgc2VydmljZS5kb2MubmFtZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJoMSB0aXRsZVwiPnt7IHNlcnZpY2UuZG9jLm5hbWUgfX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzdWJ0aXRsZVwiICpuZ0lmPVwic2VydmljZS5kb2MuZGVzY3JpcHRpb25cIj57eyBzZXJ2aWNlLmRvYy5kZXNjcmlwdGlvbiB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8c2VjdGlvbiAqbmdJZj1cInNlcnZpY2UuZG9jLmJvZHlcIj5cbiAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cInNlcnZpY2UuZG9jLmJvZHlcIj48L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24gKm5nSWY9XCJzZXJ2aWNlLmRvYy5ncm91cCA9PT0gJ2NvbXBvbmVudHMnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5kZW1vID0gIXNlcnZpY2Uuc3RhdGVzLmRlbW9cIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5kZW1vID8gJ2FjdGl2ZScgOiAnJ1wiPkRlbW88L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlcnZpY2Uuc3RhdGVzLmRlbW9cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHByZSBjbGFzcz1cImRlbW9cIj48Y29kZT57e3NlcnZpY2UuZ2V0TWFya3VwKHNlcnZpY2UuZG9jKX19PC9jb2RlPjwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDwhLS0gPGJ1dHRvbiAoY2xpY2spPVwibGF1bmNoKHNlcnZpY2UuZG9jKVwiPkxhdW5jaCBkZW1vPC9idXR0b24+IC0tPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGVtby1vdmVybGF5LWNvbnRhaW5lclwiICpuZ0lmPVwic2VydmljZS5zdGF0ZXMuZGVtb092ZXJsYXlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGVtby1vdmVybGF5LWNsb3NlXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLmRlbW9PdmVybGF5ID0gZmFsc2VcIj54PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImRlbW8tb3ZlcmxheVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaGFzUHJvcGVydGllcygnYXR0cmlidXRlUHJvcGVydGllcycpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5wcm9wcyA9ICFzZXJ2aWNlLnN0YXRlcy5wcm9wc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLnByb3BzID8gJ2FjdGl2ZScgOiAnJ1wiPkF0dHJpYnV0ZSBwcm9wZXJ0aWVzPC9kaXY+XG4gICAgICAgIDxhcHAtdGFibGUtcmVuZGVyZXIgW3Nob3ddPVwic2VydmljZS5zdGF0ZXMucHJvcHNcIiBbcHJvcGVydGllc109XCJhdHRyaWJ1dGVQcm9wc1wiPjwvYXBwLXRhYmxlLXJlbmRlcmVyPlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaGFzUHJvcGVydGllcygncHJvcGVydGllcycpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5kYXRhUHJvcHMgPSAhc2VydmljZS5zdGF0ZXMuZGF0YVByb3BzXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMuZGF0YVByb3BzID8gJ2FjdGl2ZScgOiAnJ1wiPlByb3BlcnRpZXM8L2Rpdj5cbiAgICAgICAgPGFwcC10YWJsZS1yZW5kZXJlciBbc2hvd109XCJzZXJ2aWNlLnN0YXRlcy5kYXRhUHJvcHNcIiBbcHJvcGVydGllc109XCJwcm9wZXJ0aWVzXCI+PC9hcHAtdGFibGUtcmVuZGVyZXI+XG4gICAgPC9zZWN0aW9uPlxuXG4gICAgPHNlY3Rpb24gKm5nSWY9XCJoYXNQcm9wZXJ0aWVzKCdnZXR0ZXJzJylcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLmdldHRlcnMgPSAhc2VydmljZS5zdGF0ZXMuZ2V0dGVyc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLmdldHRlcnMgPyAnYWN0aXZlJyA6ICcnXCI+R2V0dGVyczwvZGl2PlxuICAgICAgICA8YXBwLXRhYmxlLXJlbmRlcmVyIFtzaG93XT1cInNlcnZpY2Uuc3RhdGVzLmdldHRlcnNcIiBbcHJvcGVydGllc109XCJnZXR0ZXJzUHJvcHNcIj48L2FwcC10YWJsZS1yZW5kZXJlcj5cbiAgICA8L3NlY3Rpb24+XG5cbiAgICA8c2VjdGlvbiAqbmdJZj1cImhhc1Byb3BlcnRpZXMoJ21ldGhvZHMnKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMubWV0aG9kcyA9ICFzZXJ2aWNlLnN0YXRlcy5tZXRob2RzXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMubWV0aG9kcyA/ICdhY3RpdmUnIDogJydcIj5NZXRob2RzPC9kaXY+XG4gICAgICAgIDxhcHAtdGFibGUtcmVuZGVyZXIgW3Nob3ddPVwic2VydmljZS5zdGF0ZXMubWV0aG9kc1wiIFtwcm9wZXJ0aWVzXT1cIm1ldGhvZHNcIj48L2FwcC10YWJsZS1yZW5kZXJlcj5cbiAgICA8L3NlY3Rpb24+XG48L2FydGljbGU+YCxcbiAgICBzdHlsZXM6IFtgQC13ZWJraXQta2V5ZnJhbWVzIHJvdGF0aW5nezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwKTt0cmFuc2Zvcm06cm90YXRlKDApfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1Aa2V5ZnJhbWVzIHJvdGF0aW5nezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwKTt0cmFuc2Zvcm06cm90YXRlKDApfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkaW5nezAlLDEwMCV7b3BhY2l0eTouM301MCV7b3BhY2l0eTouOH19QGtleWZyYW1lcyBmYWRpbmd7MCUsMTAwJXtvcGFjaXR5Oi4zfTUwJXtvcGFjaXR5Oi44fX0ucmVkLWZsYWd7Y29sb3I6I2QxMDAwNX0jZG9jcy1jbG9zZS1idXR0b257cG9zaXRpb246Zml4ZWQ7dG9wOjdweDtyaWdodDo3cHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiNmM2FhMDA7cGFkZGluZzo3cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2JvcmRlci1yYWRpdXM6NTAlO2ZvbnQtd2VpZ2h0OjcwMDt3aWR0aDozMnB4O2hlaWdodDozMnB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxNXB4O2N1cnNvcjpwb2ludGVyfWJ1dHRvbi5kaXNhYmxlZHtvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmV9YnV0dG9ue2ZvbnQtc2l6ZToxMnB4O2JvcmRlcjpub25lO3BhZGRpbmc6N3B4O291dGxpbmU6MCFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZjNhYTAwO2NvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9LnRlc3QtYXNzZXJ0c3tmb250LXNpemU6MTJweH0udGVzdC1hc3NlcnRzIC50ZXN0LWFzc2VydHtwYWRkaW5nOjdweCA3cHggN3B4IDQ3cHg7YmFja2dyb3VuZDpyZ2JhKDM1LDcxLDEwMCwuMDQpfS50ZXN0LWFzc2VydHMgLnRlc3QtYXNzZXJ0Om50aC1jaGlsZChldmVuKXtiYWNrZ3JvdW5kOnJnYmEoMzUsNzEsMTAwLC4wOSl9YnV0dG9uLnNwaW4taWYtcnVubmluZ3t0cmFuc2l0aW9uOm9wYWNpdHkgLjVzO21hcmdpbi1yaWdodDo3cHh9YnV0dG9uLnNwaW4taWYtcnVubmluZy5ydW5uaW5ne29wYWNpdHk6LjU7cG9pbnRlci1ldmVudHM6bm9uZTstd2Via2l0LWFuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nfS5zcGluLWlmLXJ1bm5pbmcucnVubmluZz5zcGFue3RyYW5zaXRpb246dHJhbnNmb3JtIC4yczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMsLXdlYmtpdC10cmFuc2Zvcm0gLjJzOy13ZWJraXQtYW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSByb3RhdGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHJvdGF0aW5nfS5zcGluLWlmLXJ1bm5pbmc+c3BhbntkaXNwbGF5OmlubGluZS1ibG9ja31idXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW57d2lkdGg6MTZweDtoZWlnaHQ6MTZweH1idXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW4gc3Bhbntwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0OjFweDt0b3A6MDt0cmFuc2l0aW9uOmxlZnQgLjJzfWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmcucnVubmluZz5zcGFuIHNwYW57bGVmdDoxcHh9LmRvYy12aWV3ZXJ7aGVpZ2h0OjEwMCU7cGFkZGluZzoxNHB4O292ZXJmbG93OmF1dG87d2lkdGg6MTAwJTtjb2xvcjojMjM0NzY0fWxpe2xpc3Qtc3R5bGU6bm9uZX0uZG9jLWVsZW1lbnQgcHttYXJnaW46N3B4IDB9LmRvYy1lbGVtZW50IHAuZGVzY3JpcHRpb24sLmRvYy1lbGVtZW50IHAuc3VidGl0bGV7bWFyZ2luLWJvdHRvbToyMXB4fS5kb2MtZWxlbWVudCBoMnttYXJnaW46MTRweCAwfS5kb2MtZWxlbWVudCBzZWN0aW9ue21hcmdpbjowIDAgMjhweH0uZG9jLWVsZW1lbnQgaW5wdXQsLmRvYy1lbGVtZW50IHNlbGVjdCwuZG9jLWVsZW1lbnQgdGV4dGFyZWF7YmFja2dyb3VuZDojZmZmO2JvcmRlcjpub25lO2hlaWdodDozMnB4O3dpZHRoOjEwMCU7bWF4LXdpZHRoOjIxMHB4O2JvcmRlci1yYWRpdXM6MXB4O291dGxpbmU6MCFpbXBvcnRhbnQ7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO3BhZGRpbmc6MTBweDtjb2xvcjojMjM0NjY0O2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjIyKTtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmRvYy1lbGVtZW50IHRleHRhcmVhe2hlaWdodDoxMDBweDtyZXNpemU6bm9uZX1hIC5leGFtcGxlLWNvZGV7d2lkdGg6MTAwJTtvdmVyZmxvdzphdXRvO3BhZGRpbmc6N3B4O2JhY2tncm91bmQ6I2ExOGY3NDtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1ib3R0b206MjFweH0uZXhhbXBsZS1jb2RlIHByZXttYXJnaW46MH0uaDF7Zm9udC1zaXplOjI4cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbjoyMXB4IDB9Lmgye2ZvbnQtc2l6ZToxOHB4O21hcmdpbjoxNHB4IDAgMDtiYWNrZ3JvdW5kOiMyMzQ3NjQ7Y29sb3I6I2ZmZjtwYWRkaW5nOjEwcHg7Y3Vyc29yOnBvaW50ZXJ9LmgyOmJlZm9yZXtjb250ZW50OlwiXCI7Ym9yZGVyOjdweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdC1jb2xvcjojZmZmO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2t9LmgyLmFjdGl2ZTpiZWZvcmV7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcC1jb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0cHg7bGVmdDotM3B4fS5oM3tmb250LXNpemU6MTRweDttYXJnaW46MTdweCAwO2ZvbnQtd2VpZ2h0OjcwMH0uc3VidGl0bGV7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MTAwO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO21hcmdpbi1sZWZ0OjdweH0jZGVtby1vdmVybGF5e3dpZHRoOjkwJTtoZWlnaHQ6OTAlfXByZS5kZW1ve2ZvbnQtc2l6ZToxMnB4O3BhZGRpbmc6N3B4O2JhY2tncm91bmQ6cmdiYSg5LDU0LDg0LC4xKTtvdmVyZmxvdzphdXRvfSNkZW1vLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowO2JhY2tncm91bmQ6IzBiMTExNmRlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt6LWluZGV4Ojk5OTk5OTk5OTtjb2xvcjojZmZmO292ZXJmbG93OmF1dG99I2RlbW8tb3ZlcmxheS1jbG9zZXtwb3NpdGlvbjpmaXhlZDt0b3A6MTRweDtyaWdodDoxNHB4O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjIzKTtwYWRkaW5nOjdweDt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ym9yZGVyLXJhZGl1czo1MCU7Y3Vyc29yOnBvaW50ZXJ9LmZsZXgtdmNlbnRlcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfS50ZXN0LWdyb3VwLWhlYWRlciAuaDN7bWFyZ2luOjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHNlcnZpY2U6IGFueSA9IERvY3VtZW50YXRpb25TZXJ2aWNlXG4gICAgdGVzdFNlcnZpY2U6IGFueSA9IFRlc3RTZXJ2aWNlXG5cbiAgICBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4ucHJvcGVydGllcyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndHlwZScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbWV0aG9kcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4ubWV0aG9kcyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2FyZ3VtZW50cycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdhcmd1bWVudHMnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdyZXR1cm5zJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdyZXR1cm5zJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3Rlc3RDYXNlcycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0ZXN0IGNhc2VzJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBhdHRyaWJ1dGVQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4uYXR0cmlidXRlUHJvcGVydGllcyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndHlwZScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgICAgICAvLyB9LCB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGtleTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAvLyAgICAgbGFiZWw6ICd2YWx1ZSdcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZ2V0dGVyc1Byb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJ2aWNlLmRvYy5jaGlsZHJlbi5nZXR0ZXJzLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBrZXk6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ25hbWUnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAncmV0dXJucycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdyZXR1cm5zJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3Rlc3RDYXNlcycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0ZXN0IGNhc2VzJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1Byb3BlcnRpZXModHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5zZXJ2aWNlLmRvYy5jaGlsZHJlblxuICAgICAgICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW5bdHlwZV0gJiYgT2JqZWN0LmtleXMoY2hpbGRyZW5bdHlwZV0pLmxlbmd0aFxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9kb2N1bWVudGF0aW9uLXNlcnZpY2UnXG5pbXBvcnQgeyBUZXN0U2VydmljZSB9IGZyb20gJy4vdGVzdC1zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC10YWJsZS1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGU6IGA8dGFibGUgKm5nSWY9XCJzaG93XCIgY2xhc3M9XCJkb2N1bWVudGF0aW9uLXRhYmxlXCI+XG4gICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBwcm9wZXJ0aWVzLmNvbHVtbnM7IGxldCBrZXkgPSBpbmRleFwiPnt7Y29sdW1uLmxhYmVsfX08L3RoPlxuICAgICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBwcm9wZXJ0aWVzRGF0YUtleXM7IGxldCByb3dJbmRleCA9IGluZGV4XCI+XG4gICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBwcm9wZXJ0aWVzLmNvbHVtbnM7IGxldCBrZXkgPSBpbmRleFwiIFtuZ0NsYXNzXT1cImNvbHVtbi5sYWJlbFwiPlxuICAgICAgICAgICAgICAgIDwhLS0gPGRpdiB2LWlmPVwiY29sdW1uLmtleSA9PT0gJ3ZhbHVlJyAmJiBwcm9wZXJ0aWVzLmRhdGFbcm93XVwiPlxuICAgICAgICAgICAgICAgICAgICA8YXBwLXZhbHVlLWlucHV0IFttb2RlbF09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVwiPjwvYXBwLXZhbHVlLWlucHV0PlxuICAgICAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1RleHQoY29sdW1uLmtleSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGFwcC1qc29uLXZpZXdlciAqbmdJZj1cInNob3dKc29uVmlld2VyKHByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldKVwiIFtqc29uXT1cInByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldXCI+PC9hcHAtanNvbi12aWV3ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1N0cmluZyhwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XSlcIiBbaW5uZXJIVE1MXT1cInByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImhhc0FyZ3VtZW50cyhyb3csIGNvbHVtbi5rZXkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGFyZ3VtZW50IG9mIHByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldXCIgY2xhc3M9XCJhcmd1bWVudC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmd1bWVudC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGI+e3thcmd1bWVudC5uYW1lfX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhcmd1bWVudC5pc09wdGlvbmFsXCI+OiAob3B0aW9uYWwpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJndW1lbnQtYm9keVwiICpuZ0lmPVwiYXJndW1lbnQuZGVzY3JpcHRpb25cIj4gLSB7e2FyZ3VtZW50LmRlc2NyaXB0aW9ufX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmd1bWVudC1ib2R5IHJlZC1mbGFnXCIgKm5nSWY9XCIhYXJndW1lbnQuZGVzY3JpcHRpb25cIj5taXNzaW5nIGRlc2NyaXB0aW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJndW1lbnQtb2JqZWN0XCIgKm5nSWY9XCJhcmd1bWVudC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFwcC1qc29uLXZpZXdlciAqbmdJZj1cInNob3dKc29uVmlld2VyKGFyZ3VtZW50LnR5cGUpXCIgW2pzb25dPVwiYXJndW1lbnQudHlwZVwiPjwvYXBwLWpzb24tdmlld2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjb2x1bW4ua2V5ID09PSAndGVzdENhc2VzJ1wiIFtuZ0NsYXNzXT1cIntub1Rlc3Q6ICFoYXNUZXN0KHJvdywgY29sdW1uLmtleSl9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxhcHAtanNvbi12aWV3ZXIgKm5nSWY9XCJzaG93SnNvblZpZXdlcihwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XSlcIiBbanNvbl09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiPjwvYXBwLWpzb24tdmlld2VyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgIHN0eWxlczogW2AuZG9jdW1lbnRhdGlvbi10YWJsZXt3aWR0aDoxMDAlO3RleHQtYWxpZ246bGVmdDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2V9LmRvY3VtZW50YXRpb24tdGFibGUgdGQsLmRvY3VtZW50YXRpb24tdGFibGUgdGh7dmVydGljYWwtYWxpZ246dG9wO3BhZGRpbmc6MTRweDtmb250LXNpemU6MTJweH0uZG9jdW1lbnRhdGlvbi10YWJsZSB0aHtiYWNrZ3JvdW5kOiNhMThmNzQ7Y29sb3I6I2ZmZjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9LmRvY3VtZW50YXRpb24tdGFibGUgdGR7YmFja2dyb3VuZDpyZ2JhKDksNTQsODQsLjA1KX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCAucmVkLWZsYWd7Zm9udC1mYW1pbHk6bW9ub3NwYWNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkOm50aC1jaGlsZCgxKXtmb250LXdlaWdodDo3MDB9LmRvY3VtZW50YXRpb24tdGFibGUgdGQudHlwZXt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2V9LmRvY3VtZW50YXRpb24tdGFibGUgdGJvZHkgdHI6bnRoLWNoaWxkKGV2ZW4pPnRke2JhY2tncm91bmQ6cmdiYSg5LDU0LDg0LC4xKX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCB0ZCwuZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCB0aHtwYWRkaW5nOjdweH0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCBwcmV7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoxOHB4O2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuNjEpO3BhZGRpbmc6N3B4O21hcmdpbjowfS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXJ7bWFyZ2luOjAgMCAxNHB4fS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXIgLmFyZ3VtZW50LW5hbWV7YmFja2dyb3VuZDpyZ2JhKDM1LDcwLDEwMCwuMTUpO3BhZGRpbmc6N3B4fS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXIgLmFyZ3VtZW50LW9iamVjdHtwYWRkaW5nOjVweCA3cHg7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC44NSl9LmRvY3VtZW50YXRpb24tdGFibGUgLmFyZ3VtZW50LWNvbnRhaW5lcjpsYXN0LWNoaWxke21hcmdpbjowfS5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3R7YmFja2dyb3VuZDojYTEwMDA1O2NvbG9yOiNmZmY7cGFkZGluZzozcHh9LmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdCAqLC5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdywuZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYSwuZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYTpob3Zlcntjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlUmVuZGVyZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHNlcnZpY2U6IGFueSA9IERvY3VtZW50YXRpb25TZXJ2aWNlXG4gICAgdGVzdFNlcnZpY2U6IGFueSA9IFRlc3RTZXJ2aWNlXG5cbiAgICBASW5wdXQoJ3Nob3cnKVxuICAgIHNob3c6IGJvb2xlYW5cblxuICAgIEBJbnB1dCgncHJvcGVydGllcycpXG4gICAgcHJvcGVydGllczogYW55XG5cbiAgICBnZXQgcHJvcGVydGllc0RhdGFLZXlzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5wcm9wZXJ0aWVzLmRhdGEpXG4gICAgfVxuXG4gICAgZ2V0TGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3R5cGVOYW1lLnRvTG93ZXJDYXNlKCl9LiR7ZG9jTGlua05hbWV9YFxuICAgIH1cblxuICAgIGdldERvY0RhdGEoZG9jTGlua05hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5zZXJ2aWNlLkRvY3NEYXRhLCB0aGlzLmdldExpbmsoZG9jTGlua05hbWUsIHR5cGVOYW1lKSwge30pXG4gICAgfVxuXG4gICAgc2hvd0pzb25WaWV3ZXIodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdmFsICYmIHR5cGVvZiB2YWwgIT09IGBzdHJpbmdgXG4gICAgfVxuXG4gICAgc2hvd1RleHQoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGtleSAhPT0gJ3ZhbHVlJyAmJiBrZXkgIT09ICdhcmd1bWVudHMnICYmIGtleSAhPT0gJ3Rlc3RDYXNlcydcbiAgICB9XG5cbiAgICBpc1N0cmluZyh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF2YWwgJiYgdHlwZW9mIHZhbCA9PT0gYHN0cmluZ2BcbiAgICB9XG5cbiAgICBoYXNUZXN0KHJvdywga2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnByb3BlcnRpZXMuZGF0YSwgYCR7cm93fS4ke2tleX1gKSAmJiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnByb3BlcnRpZXMuZGF0YSwgYCR7cm93fS4ke2tleX1gLCBbXSkubGVuZ3RoXG4gICAgfVxuXG4gICAgaGFzQXJndW1lbnRzKHJvdywga2V5KSB7XG4gICAgICAgIGlmIChrZXkgIT09IGBhcmd1bWVudHNgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuc2VydmljZS5nZXRUaGlzKHRoaXMucHJvcGVydGllcy5kYXRhLCBgJHtyb3d9LiR7a2V5fWApXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbXSkubGVuZ3RoXG5cbiAgICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhc3MgPSB0cnVlXG5cbiAgICAgICAgdmFsLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KVxuICAgICAgICAgICAgaWYgKCFlbGVtZW50Lmhhc093blByb3BlcnR5IHx8ICFlbGVtZW50Lmhhc093blByb3BlcnR5KGBuYW1lYCkpIHtcbiAgICAgICAgICAgICAgICBwYXNzID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBhc3NcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgSlNPTkZvcm1hdHRlciBmcm9tICdqc29uLWZvcm1hdHRlci1qcydcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtanNvbi12aWV3ZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbaW5uZXJIVE1MXT1cImh0bWxcIj48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1yb3csLmpzb24tZm9ybWF0dGVyLXJvdyBhe3doaXRlLXNwYWNlOm5vd3JhcH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIEpzb25WaWV3ZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCdqc29uJylcbiAgICBqc29uOiBhbnlcblxuICAgIGdldCBodG1sKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBKU09ORm9ybWF0dGVyKHRoaXMuanNvbiwgMCwge1xuICAgICAgICAgICAgaG92ZXJQcmV2aWV3RW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICBob3ZlclByZXZpZXdBcnJheUNvdW50OiAxMDAsXG4gICAgICAgICAgICBob3ZlclByZXZpZXdGaWVsZENvdW50OiA1LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVyLnJlbmRlcigpLm91dGVySFRNTFxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC12YWx1ZS1pbnB1dCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmFsdWUtaW5wdXRcIj5cbiAgICA8dGV4dGFyZWEgKm5nSWY9XCJzaG93VGV4dGFyZWEoKVwiIFsobmdNb2RlbCldPVwicHJveHlNb2RlbFwiIChpbnB1dCk9XCJ1cGRhdGVWYWxcIj48L3RleHRhcmVhPlxuICAgIDwhLS0gPGlucHV0IHR5cGU9XCJudW1iZXJcIiAqbmdJZj1cInR5cGUgPT09ICdudW1iZXInXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICpuZ0lmPVwidHlwZSA9PT0gJ3N0cmluZydcIiBbKG5nTW9kZWwpXT1cInByb3h5TW9kZWxcIiAoaW5wdXQpPVwidXBkYXRlVmFsXCI+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiICpuZ0lmPVwidHlwZSA9PT0gJ2Jvb2xlYW4nXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPiAtLT5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuXG5leHBvcnQgY2xhc3MgVmlld2VySW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdtb2RlbCcpXG4gICAgbW9kZWw6IGFueVxuXG4gICAgcHJveHlNb2RlbCA9IGBgXG5cbiAgICB0eXBlOiBzdHJpbmcgPSBgc3RyaW5nYFxuXG4gICAgZ2V0UHJveHlNb2RlbCgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYHN0cmluZ2A6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFsdWUgPyB0aGlzLm1vZGVsLnZhbHVlLnRvU3RyaW5nKCkgOiBgYFxuICAgICAgICAgICAgY2FzZSBgbnVtYmVyYDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZSA/IHBhcnNlRmxvYXQodGhpcy5tb2RlbC52YWx1ZSkgOiAwXG4gICAgICAgICAgICBjYXNlIGBib29sZWFuYDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLm1vZGVsLnZhbHVlXG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm1vZGVsLnZhbHVlKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgfHwgYHt9YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3h5TW9kZWxcblxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBgc3RyaW5nYDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogYGBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBgbnVtYmVyYDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IDBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBgYm9vbGVhbmA6XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9ICEhdmFsdWVcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSlcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgfHwge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGUsIHRoaXMubW9kZWwpO1xuXG4gICAgICAgIHRoaXMucHJveHlNb2RlbCA9IHRoaXMuZ2V0UHJveHlNb2RlbCgpXG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLnR5cGUgfHwgdGhpcy5tb2RlbC5raW5kIHx8IGBzdHJpbmdgIDogYHN0cmluZ2BcbiAgICB9XG5cbiAgICBzaG93VGV4dGFyZWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgIT09ICdzdHJpbmcnICYmIHRoaXMudHlwZSAhPT0gJ251bWJlcidcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvY2tzQ29tcG9uZW50IH0gZnJvbSAnLi9kb2Nrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2lkZWJhckNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3JlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSnNvblZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vanNvbi12aWV3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlcklucHV0Q29tcG9uZW50IH0gZnJvbSAnLi92YWx1ZS1pbnB1dC5jb21wb25lbnQnXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEb2Nrc0NvbXBvbmVudCxcbiAgICBTaWRlYmFyQ29tcG9uZW50LFxuICAgIFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFRhYmxlUmVuZGVyZXJDb21wb25lbnQsXG4gICAgSnNvblZpZXdlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJJbnB1dENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbRG9ja3NDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERvY2tzTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0lBb0hJO21CQW5IVyxFQUFFO3lCQUNELHFCQUFxQjt3QkFDakIsRUFBRTtzQkFFVDtZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxPQUFPLEVBQUUsS0FBSztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLElBQUksRUFBRSxLQUFLO1lBQ1gsV0FBVyxFQUFFLEtBQUs7WUFDbEIsVUFBVSxFQUFFLEtBQUs7WUFDakIsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsRUFBRTtZQUNSLFlBQVksRUFBRSxFQUFFO1lBQ2hCLFNBQVMsRUFBRSxFQUFFO1NBQ2hCO1FBb0dHLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7Ozs7O0lBbkdELE9BQU8sQ0FBQyxRQUFhO1FBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0tBQzNCOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFDMUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFBO0tBQ2xCOzs7OztJQUVELE9BQU8sQ0FBQyxHQUFXO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUE7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFBO1FBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtLQUNoQjs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBUTs7UUFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUE7UUFFaEIsS0FBSyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFD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