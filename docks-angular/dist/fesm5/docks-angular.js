import { Component, Input, NgModule } from '@angular/core';
import JSONFormatter from 'json-formatter-js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var documentationService = /** @class */ (function () {
    function documentationService() {
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
            sidebarState: "",
            argToShow: ""
        };
        return this;
    }
    /**
     * @param {?} DocsData
     * @return {?}
     */
    documentationService.prototype.setDocs = /**
     * @param {?} DocsData
     * @return {?}
     */
    function (DocsData) {
        this.DocsData = DocsData;
    };
    /**
     * @return {?}
     */
    documentationService.prototype.setDoc = /**
     * @return {?}
     */
    function () {
        this.doc = this.getThis(this.DocsData, this.openedDoc, {});
        return this.doc;
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    documentationService.prototype.openDoc = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        this.openedDoc = doc;
        this.states.view = "components";
        this.setDoc();
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    documentationService.prototype.getMarkup = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        /** @type {?} */
        var props = [];
        for (var p in doc.props) {
            if (doc.props[p]) {
                props.push(":" + p + "=\"doc.props." + p + ".value\"");
            }
        }
        return "<" + doc.name + (props.length ? "\n  " : "") + props.join('\n  ') + (props.length ? "\n" : "") + "></" + doc.name + ">";
    };
    /**
     * @param {?} obj
     * @return {?}
     */
    documentationService.prototype.json = /**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        /** @type {?} */
        var result = "";
        try {
            result = JSON.stringify(obj, null, '    ');
        }
        catch (error) { }
        return result;
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    documentationService.prototype.docName = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        if (!doc) {
            return;
        }
        return doc.name;
    };
    /**
     * @param el The starting object
     * @param path String to follow
     * @param emptyVal What is returned if undefined
     * @desc Navigates an object or array to find a value
     */
    /**
     * @desc Navigates an object or array to find a value
     * @param {?} el The starting object
     * @param {?} path String to follow
     * @param {?=} emptyVal What is returned if undefined
     * @return {?}
     */
    documentationService.prototype.getThis = /**
     * @desc Navigates an object or array to find a value
     * @param {?} el The starting object
     * @param {?} path String to follow
     * @param {?=} emptyVal What is returned if undefined
     * @return {?}
     */
    function (el, path, emptyVal) {
        if (path && path.toString().split) {
            path = [el].concat(path.toString().split("."));
        }
        else {
            path = [el];
        }
        /** @type {?} */
        var result = path.reduce(function (accumulator, currentValue) {
            if (accumulator === undefined) {
                return emptyVal;
            }
            if (currentValue.indexOf(".") === -1 && currentValue.indexOf("(") > -1) {
                /** @type {?} */
                var argsString = '';
                /** @type {?} */
                var argsObj = /\((.*?)\)/g.exec(currentValue);
                if (argsObj) {
                    argsString = argsObj[1] || "";
                }
                /** @type {?} */
                var args = argsString.split(",").map(function (arg) { return arg.trim(); });
                /** @type {?} */
                var functionName = currentValue.split("(")[0];
                if (typeof accumulator[functionName] === "function") {
                    /** @type {?} */
                    var _result = accumulator[functionName].apply(accumulator, args);
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
    };
    return documentationService;
}());
/** @type {?} */
var DocumentationService = new documentationService();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var testService = /** @class */ (function () {
    function testService() {
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
        this.shownTestsState = "";
    }
    /**
     * @param {?} tests
     * @return {?}
     */
    testService.prototype.setTests = /**
     * @param {?} tests
     * @return {?}
     */
    function (tests) {
        this.tests = tests;
        this.testTypes.class = DocumentationService.getThis(this.tests, "class", []);
        /** @type {?} */
        var typesToTest = [
            "methods",
            "properties",
            "attributeProperties",
            "getters"
        ];
        for (var type in DocumentationService.DocsData) {
            if (DocumentationService.DocsData[type]) {
                var _loop_1 = function (docName) {
                    if (DocumentationService.DocsData[type][docName] && docName !== "DocumentationService" && docName !== "TestService") {
                        /** @type {?} */
                        var serviceTest = DocumentationService.getThis(this_1.testTypes, type + "." + docName, { tests: [] });
                        /** @type {?} */
                        var serviceTestTests_1 = {};
                        if (serviceTest.tests) {
                            serviceTest.tests.forEach(function (test) {
                                /** @type {?} */
                                var fors = test.for;
                                if (!fors) {
                                    fors = test.name;
                                }
                                if (fors && Array.isArray(fors)) {
                                    fors.forEach(function (_for) {
                                        if (!serviceTestTests_1[_for]) {
                                            serviceTestTests_1[_for] = [test];
                                            return;
                                        }
                                        serviceTestTests_1[_for].push(test);
                                    });
                                }
                                else {
                                    if (!serviceTestTests_1[fors]) {
                                        serviceTestTests_1[fors] = [test];
                                        return;
                                    }
                                    serviceTestTests_1[fors].push(test);
                                }
                            });
                        }
                        if (DocumentationService.DocsData[type][docName].children) {
                            /** @type {?} */
                            var children = DocumentationService.DocsData[type][docName].children;
                            for (var childName in children) {
                                if (children[childName]) {
                                    if (!!children[childName] && typesToTest.indexOf(childName) > -1) {
                                        for (var propName in children[childName]) {
                                            if (children[childName][propName] && typeof children[childName][propName] === "object") {
                                                /** @type {?} */
                                                var testCases = serviceTestTests_1[propName];
                                                /** @type {?} */
                                                var canMap = !!testCases;
                                                children[childName][propName].tests = serviceTestTests_1[propName];
                                                children[childName][propName].testCases = canMap ? testCases.map(function (test) {
                                                    /** @type {?} */
                                                    var asserts = test.name;
                                                    if (test.asserts && test.asserts.map) {
                                                        asserts = test.asserts.map(function (assert) { return assert.name; });
                                                    }
                                                    return {
                                                        name: test.name,
                                                        asserts: asserts
                                                    };
                                                }) : [];
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                var this_1 = this;
                for (var docName in DocumentationService.DocsData[type]) {
                    _loop_1(docName);
                }
            }
        }
    };
    /**
     * @param {?} doc
     * @param {?} testName
     * @return {?}
     */
    testService.prototype.hasTestRan = /**
     * @param {?} doc
     * @param {?} testName
     * @return {?}
     */
    function (doc, testName) {
        if (!doc) {
            return false;
        }
        return DocumentationService.getThis(this.testResults.tests, doc + ".results." + testName);
    };
    /**
     * @param {?} doc
     * @param {?} testName
     * @return {?}
     */
    testService.prototype.hasTestPassed = /**
     * @param {?} doc
     * @param {?} testName
     * @return {?}
     */
    function (doc, testName) {
        if (!doc) {
            return undefined;
        }
        return DocumentationService.getThis(this.testResults.tests, doc + ".results." + testName + ".pass");
    };
    /**
     * @param {?} doc
     * @param {?} testName
     * @param {?} index
     * @return {?}
     */
    testService.prototype.getTestAssertResult = /**
     * @param {?} doc
     * @param {?} testName
     * @param {?} index
     * @return {?}
     */
    function (doc, testName, index) {
        if (!doc) {
            return undefined;
        }
        return DocumentationService.getThis(this.testResults.tests, doc + ".results." + testName + ".results." + index);
    };
    /**
     * @param {?} doc
     * @param {?} testIndex
     * @return {?}
     */
    testService.prototype.hasTestAsserts = /**
     * @param {?} doc
     * @param {?} testIndex
     * @return {?}
     */
    function (doc, testIndex) {
        if (!doc) {
            return undefined;
        }
        /** @type {?} */
        var asserts = DocumentationService.getThis(this.tests, doc + ".tests." + testIndex + ".asserts");
        /** @type {?} */
        var assertKeys = [];
        if (asserts) {
            asserts.forEach(function (element) {
                if (element.name) {
                    assertKeys.push(element.name);
                }
                else {
                    assertKeys.push(element);
                }
            });
        }
        return assertKeys;
    };
    /**
     * @param {?} doc
     * @param {?=} testName
     * @return {?}
     */
    testService.prototype.isTestRunning = /**
     * @param {?} doc
     * @param {?=} testName
     * @return {?}
     */
    function (doc, testName) {
        if (!doc) {
            return undefined;
        }
        if (!testName) {
            return DocumentationService.getThis(this.testResults.tests, doc + ".running");
        }
        return DocumentationService.getThis(this.testResults.tests, doc + ".results." + testName + ".running");
    };
    /**
     * @param {?} doc
     * @return {?}
     */
    testService.prototype.getTests = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
        if (!doc) {
            return false;
        }
        return this.tests[doc] || undefined;
    };
    /**
     * @param {?} test
     * @return {?}
     */
    testService.prototype.runAsserts = /**
     * @param {?} test
     * @return {?}
     */
    function (test) {
        return new Promise(function (resolve, reject) {
            test.results = [];
            /** @type {?} */
            var runAssert = function (index) {
                if (!test.asserts[index]) {
                    return resolve(test.results);
                }
                /** @type {?} */
                var key = test.asserts[index];
                /** @type {?} */
                var fn = function () { };
                /** @type {?} */
                var pre = null;
                /** @type {?} */
                var val;
                if (typeof key === "string") {
                    fn = test.methods[key];
                }
                else if (typeof test.asserts[index] === "object") {
                    key = test.asserts[index].name;
                    fn = test.asserts[index].fn;
                    pre = test.asserts[index].pre || pre;
                }
                /** @type {?} */
                var setResult = function () {
                    if (val instanceof Promise) {
                        val
                            .then(function (res) {
                            test.results.push({ pass: true, message: res, key: key });
                            runAssert(index + 1);
                        })
                            .catch(function (res) {
                            test.results.push({ pass: false, message: res, key: key });
                            runAssert(index + 1);
                        });
                    }
                    else {
                        test.results.push({ pass: !!val, message: val, key: key });
                        runAssert(index + 1);
                    }
                };
                if (!pre) {
                    val = fn();
                    setResult();
                }
                else {
                    pre()
                        .then(function () {
                        val = fn();
                        setResult();
                    })
                        .catch(function () {
                        val = fn();
                        setResult();
                    });
                }
            };
            runAssert(0);
        });
    };
    /**
     * @param {?} test
     * @param {?} groupKey
     * @param {?} type
     * @return {?}
     */
    testService.prototype.runTest = /**
     * @param {?} test
     * @param {?} groupKey
     * @param {?} type
     * @return {?}
     */
    function (test, groupKey, type) {
        var _this = this;
        /** @type {?} */
        var now = new Date().getTime();
        return new Promise(function (resolve, reject) {
            _this.testResults.testsAreRunning = true;
            if (!_this.testResults.tests[type]) {
                _this.testResults.tests[type] = {};
            }
            if (!_this.testResults.tests[type][groupKey]) {
                _this.testResults.tests[type][groupKey] = {
                    pass: 0,
                    results: {},
                    running: true
                };
            }
            _this.testResults.tests[type][groupKey].running = true;
            /** @type {?} */
            var setResults = function (res) {
                _this.testResults.tests[type][groupKey].running = false;
                _this.testResults.tests[type][groupKey].results[test.name] = res;
                _this.testResults.testsAreRunning = false;
                if (res.pass) {
                    return resolve(res);
                }
                return reject(res);
            };
            /** @type {?} */
            var finishAssert = function (res) {
                /** @type {?} */
                var passed = true;
                res.forEach(function (element) {
                    if (!element.pass) {
                        passed = false;
                    }
                });
                setResults({
                    pass: passed,
                    message: "",
                    time: new Date().getTime() - now,
                    running: false,
                    results: res
                });
            };
            _this.testResults.tests[type][groupKey].results[test.name] = {
                pass: undefined,
                message: "",
                time: 0,
                running: true
            };
            if (test.asserts && test.asserts.length) {
                _this.runAsserts(test).then(finishAssert, finishAssert);
            }
            else if (test.fn && typeof test.fn === "function") {
                test.fn()
                    .then(function (res) {
                    setResults({
                        pass: true,
                        message: "",
                        time: new Date().getTime() - now,
                        running: false,
                        results: res
                    });
                }, function (rej) {
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
    };
    /**
     * @param {?} group
     * @param {?} type
     * @return {?}
     */
    testService.prototype.runTestGroup = /**
     * @param {?} group
     * @param {?} type
     * @return {?}
     */
    function (group, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.testResults.tests[group.name] = {
                pass: undefined,
                results: {}
            };
            /** @type {?} */
            var setResults = function (res, index) {
                /** @type {?} */
                var cantUpdatePass = _this.testResults.tests[group.name].pass === false;
                /** @type {?} */
                var newPass = cantUpdatePass ? _this.testResults.tests[group.name].pass : res.pass;
                _this.testResults.tests[group.name].pass = newPass;
                _this.testResults.tests[group.name].results[group.tests[index].name] = res;
                run(index + 1);
            };
            /** @type {?} */
            var run = function (index) {
                if (group.tests[index]) {
                    _this.runTest(group.tests[index], group.name, type)
                        .then(function (res) {
                        setResults(res, index);
                    })
                        .catch(function (res) {
                        setResults(res, index);
                    });
                }
                else {
                    resolve(_this.testResults.tests[group.name]);
                }
            };
            run(0);
        });
    };
    /**
     * @desc Runs all tests
     * @param test - testing param description
     */
    /**
     * @desc Runs all tests
     * @param {?=} test - testing param description
     * @return {?}
     */
    testService.prototype.runTests = /**
     * @desc Runs all tests
     * @param {?=} test - testing param description
     * @return {?}
     */
    function (test) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            /** @type {?} */
            var run = function (index) {
                /** @type {?} */
                var type = Object.keys(_this.tests)[index];
                /** @type {?} */
                var thisTestGroup = _this.tests[type];
                if (thisTestGroup) {
                    /** @type {?} */
                    var runGroup_1 = function (groupIndex) {
                        /** @type {?} */
                        var thisTest = thisTestGroup[Object.keys(thisTestGroup)[groupIndex]];
                        if (thisTest) {
                            _this.runTestGroup(thisTest, type)
                                .then(function (res) {
                                _this.testResults.tests[type][thisTest.name] = res;
                                runGroup_1(groupIndex + 1);
                            }, function (rej) {
                                _this.testResults.tests[type][thisTest.name] = rej;
                                runGroup_1(groupIndex + 1);
                            });
                        }
                        else {
                            run(index + 1);
                        }
                    };
                    runGroup_1(0);
                }
                else {
                    resolve(_this.testResults.tests);
                }
            };
            run(0);
        });
    };
    /**
     * @param {?} timestamp
     * @return {?}
     */
    testService.prototype.getFormatedTime = /**
     * @param {?} timestamp
     * @return {?}
     */
    function (timestamp) {
        if (timestamp < 1000) {
            return timestamp + "ms";
        }
        if (timestamp < 1000 * 60) {
            return (timestamp / 1000) + "s";
        }
        if (timestamp < 1000 * 60 * 60) {
            return (timestamp / 1000 * 60) + "m";
        }
        return "";
    };
    return testService;
}());
/** @type {?} */
var TestService = new testService();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DocksComponent = /** @class */ (function () {
    function DocksComponent() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    /**
     * @param {?} doc
     * @return {?}
     */
    DocksComponent.prototype.launch = /**
     * @param {?} doc
     * @return {?}
     */
    function (doc) {
    };
    /**
     * @return {?}
     */
    DocksComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.service.setDocs(this.docs);
        this.testService.setTests(this.tests);
        if (this.initial && this.initial !== "") {
            this.service.openDoc(this.initial);
            this.service.states.sidebarState = this.initial.split(".")[0];
        }
    };
    DocksComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-docks',
                    template: "<div id=\"documentation-overlay\">\n  <app-sidebar></app-sidebar>\n  <div class=\"doc-viewer\" [ngClass]=\"service.openedDoc\">\n    <div class=\"doc-container\">\n      <app-renderer></app-renderer>\n    </div>\n  </div>\n</div>",
                    styles: ["@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}#documentation-overlay{position:fixed;top:0;left:0;height:100%;width:100%;z-index:9999999;background:#fff;overflow:hidden;display:flex;font-family:sans-serif}#documentation-overlay .red-flag{color:#d10005}#documentation-overlay #docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}#documentation-overlay button.disabled{opacity:.5;pointer-events:none}#documentation-overlay button{font-size:12px;border:none;padding:7px;outline:0!important}#documentation-overlay .test-asserts{font-size:12px}#documentation-overlay .test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}#documentation-overlay .test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}#documentation-overlay button.spin-if-running{transition:opacity .5s;margin-right:7px}#documentation-overlay button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}#documentation-overlay .spin-if-running.running>span{transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}#documentation-overlay .spin-if-running>span{display:inline-block}#documentation-overlay button.spin-if-running>span{width:16px;height:16px}#documentation-overlay button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}#documentation-overlay button.spin-if-running.running>span span{left:1px}#documentation-overlay .doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}#documentation-overlay .doc-viewer li{list-style:none}#documentation-overlay .doc-viewer button{background:#f3aa00;color:#fff;cursor:pointer}#documentation-overlay .doc-viewer .doc-element p{margin:7px 0}#documentation-overlay .doc-viewer .doc-element p.description,#documentation-overlay .doc-viewer .doc-element p.subtitle{margin-bottom:21px}#documentation-overlay .doc-viewer .doc-element h2{margin:14px 0}#documentation-overlay .doc-viewer .doc-element section{margin:0 0 28px}#documentation-overlay .doc-viewer .doc-element input,#documentation-overlay .doc-viewer .doc-element select,#documentation-overlay .doc-viewer .doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}#documentation-overlay .doc-viewer .doc-element textarea{height:100px;resize:none}#documentation-overlay .doc-viewer a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}#documentation-overlay .doc-viewer .example-code pre{margin:0}#documentation-overlay .doc-viewer .h1{font-size:28px;font-weight:700;margin:21px 0}#documentation-overlay .doc-viewer .h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}#documentation-overlay .doc-viewer .h2:before{content:\"\";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}#documentation-overlay .doc-viewer .h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}#documentation-overlay .doc-viewer .h3{font-size:14px;margin:17px 0;font-weight:700}#documentation-overlay .doc-viewer .subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#documentation-overlay .doc-viewer #demo-overlay{width:90%;height:90%}#documentation-overlay .doc-viewer pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;background:#0b1116de;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}#documentation-overlay .doc-viewer .flex-vcenter{display:flex;align-items:center}#documentation-overlay .doc-viewer .test-group-header .h3{margin:0}.noTest{background:#a10005;color:#fff;padding:3px}.noTest *,.noTest .json-formatter-row,.noTest .json-formatter-row a,.noTest .json-formatter-row a:hover{color:#fff}.red-flag{color:#a10005}"]
                },] },
    ];
    DocksComponent.propDecorators = {
        docs: [{ type: Input, args: ['docs',] }],
        initial: [{ type: Input, args: ['initial',] }],
        tests: [{ type: Input, args: ['tests',] }],
        componentClasses: [{ type: Input, args: ['componentClasses',] }]
    };
    return DocksComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    Object.defineProperty(SidebarComponent.prototype, "typeNames", {
        get: /**
         * @return {?}
         */
        function () {
            return Object.keys(this.service.DocsData);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SidebarComponent.prototype, "linkNames", {
        get: /**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var map = this.typeNames.map(function (typeName) { return Object.keys(_this.service.DocsData[typeName]); });
            return map;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    SidebarComponent.prototype.getLink = /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    function (docLinkName, typeName) {
        return typeName.toLowerCase() + "." + docLinkName;
    };
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    SidebarComponent.prototype.isDocumented = /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    function (docLinkName, typeName) {
        /** @type {?} */
        var docLink = this.getDocLink(docLinkName, typeName);
        return docLink.hasOwnProperty('isDocumented') && !docLink.isDocumented;
    };
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    SidebarComponent.prototype.getDocLink = /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    function (docLinkName, typeName) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {});
    };
    /**
     * @param {?} state
     * @return {?}
     */
    SidebarComponent.prototype.setSidebarState = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        if (this.service.states.sidebarState === state) {
            this.service.states.sidebarState = "";
            return;
        }
        this.service.states.sidebarState = state;
    };
    SidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-sidebar',
                    template: "<div class=\"doc-sidebar\">\n    <div *ngFor=\"let typeName of typeNames; let typeIndex = index\">\n        <div class=\"sidebar-heading group\" [ngClass]=\"{active: service.states.sidebarState === typeName}\" (click)=\"setSidebarState(typeName)\">{{typeName}}</div>\n        <div [ngClass]=\"{shown: service.states.sidebarState === typeName}\" class=\"link-group\">\n            <div class=\"doc-sidebar-link\" *ngFor=\"let docLinkName of linkNames[typeIndex]\" (click)=\"service.openDoc(getLink(docLinkName, typeName))\">\n                <span *ngIf=\"isDocumented(docLinkName, typeName)\" class=\"red-flag\"></span>\n                <span>{{getDocLink(docLinkName, typeName).name}}</span>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"testService.tests\">\n        <div class=\"sidebar-heading\" (click)=\"service.states.view = 'tests'\">Tests</div>\n    </div>\n</div>",
                    styles: [".doc-sidebar{height:100%;background:#224764;color:#f0f4f8;white-space:nowrap;overflow:auto}.doc-sidebar .sidebar-heading{font-size:12px;font-weight:700;background:rgba(0,0,0,.21);padding:10px;box-shadow:0 -1px 0 rgba(0,0,0,.13);cursor:pointer;text-transform:uppercase}.doc-sidebar .sidebar-heading.group::before{content:\"\";border:5px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.doc-sidebar .sidebar-heading.group.active::before{border-left-color:transparent;border-top-color:#fff;position:relative;top:3px;left:-2px}.doc-sidebar .link-group{height:0;opacity:0;pointer-events:none;overflow:hidden}.doc-sidebar .link-group.shown{height:auto;opacity:1;pointer-events:all;overflow:auto}.doc-sidebar .doc-sidebar-link{padding:10px;box-shadow:0 -1px 0 rgba(76,112,141,.34),0 -2px 0 rgba(4,34,57,.25);cursor:pointer;font-size:12px}.doc-sidebar .doc-sidebar-link .red-flag{border:3px solid #a10005;border-radius:50%;display:inline-block;vertical-align:middle}"]
                },] },
    ];
    /** @nocollapse */
    SidebarComponent.ctorParameters = function () { return []; };
    return SidebarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var RendererComponent = /** @class */ (function () {
    function RendererComponent() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    Object.defineProperty(RendererComponent.prototype, "properties", {
        get: /**
         * @return {?}
         */
        function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RendererComponent.prototype, "methods", {
        get: /**
         * @return {?}
         */
        function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RendererComponent.prototype, "attributeProps", {
        get: /**
         * @return {?}
         */
        function () {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RendererComponent.prototype, "gettersProps", {
        get: /**
         * @return {?}
         */
        function () {
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
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} type
     * @return {?}
     */
    RendererComponent.prototype.hasProperties = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        /** @type {?} */
        var children = this.service.doc.children;
        return children && children[type] && Object.keys(children[type]).length;
    };
    RendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-renderer',
                    template: "<article class=\"doc-element\" *ngIf=\"service.states.view === 'components' && service.doc.name\">\n    <div class=\"h1 title\">{{ service.doc.name }}\n        <span class=\"subtitle\" *ngIf=\"service.doc.description\">{{ service.doc.description }}</span>\n    </div>\n    <section *ngIf=\"service.doc.body\">\n        <div [innerHTML]=\"service.doc.body\"></div>\n    </section>\n    <section *ngIf=\"service.doc.group === 'components'\">\n        <div class=\"h2\" (click)=\"service.states.demo = !service.states.demo\" [ngClass]=\"service.states.demo ? 'active' : ''\">Demo</div>\n        <div *ngIf=\"service.states.demo\">\n            <div>\n                <pre class=\"demo\"><code>{{service.getMarkup(service.doc)}}</code></pre>\n            </div>\n            <div>\n                <!-- <button (click)=\"launch(service.doc)\">Launch demo</button> -->\n            </div>\n            <div id=\"demo-overlay-container\" *ngIf=\"service.states.demoOverlay\">\n                <div id=\"demo-overlay-close\" (click)=\"service.states.demoOverlay = false\">x</div>\n                <div id=\"demo-overlay\"></div>\n            </div>\n        </div>\n    </section>\n\n    <section *ngIf=\"hasProperties('attributeProperties')\">\n        <div class=\"h2\" (click)=\"service.states.props = !service.states.props\" [ngClass]=\"service.states.props ? 'active' : ''\">Attribute properties</div>\n        <app-table-renderer [show]=\"service.states.props\" [properties]=\"attributeProps\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('properties')\">\n        <div class=\"h2\" (click)=\"service.states.dataProps = !service.states.dataProps\" [ngClass]=\"service.states.dataProps ? 'active' : ''\">Properties</div>\n        <app-table-renderer [show]=\"service.states.dataProps\" [properties]=\"properties\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('getters')\">\n        <div class=\"h2\" (click)=\"service.states.getters = !service.states.getters\" [ngClass]=\"service.states.getters ? 'active' : ''\">Getters</div>\n        <app-table-renderer [show]=\"service.states.getters\" [properties]=\"gettersProps\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('methods')\">\n        <div class=\"h2\" (click)=\"service.states.methods = !service.states.methods\" [ngClass]=\"service.states.methods ? 'active' : ''\">Methods</div>\n        <app-table-renderer [show]=\"service.states.methods\" [properties]=\"methods\"></app-table-renderer>\n    </section>\n</article>",
                    styles: ["@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}.red-flag{color:#d10005}#docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}button.disabled{opacity:.5;pointer-events:none}button{font-size:12px;border:none;padding:7px;outline:0!important;background:#f3aa00;color:#fff;cursor:pointer}.test-asserts{font-size:12px}.test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}.test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}button.spin-if-running{transition:opacity .5s;margin-right:7px}button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}.spin-if-running.running>span{transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}.spin-if-running>span{display:inline-block}button.spin-if-running>span{width:16px;height:16px}button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}button.spin-if-running.running>span span{left:1px}.doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}li{list-style:none}.doc-element p{margin:7px 0}.doc-element p.description,.doc-element p.subtitle{margin-bottom:21px}.doc-element h2{margin:14px 0}.doc-element section{margin:0 0 28px}.doc-element input,.doc-element select,.doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}.doc-element textarea{height:100px;resize:none}a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}.example-code pre{margin:0}.h1{font-size:28px;font-weight:700;margin:21px 0}.h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}.h2:before{content:\"\";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}.h3{font-size:14px;margin:17px 0;font-weight:700}.subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#demo-overlay{width:90%;height:90%}pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;background:#0b1116de;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}.flex-vcenter{display:flex;align-items:center}.test-group-header .h3{margin:0}"]
                },] },
    ];
    /** @nocollapse */
    RendererComponent.ctorParameters = function () { return []; };
    return RendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TableRendererComponent = /** @class */ (function () {
    function TableRendererComponent() {
        this.service = DocumentationService;
        this.testService = TestService;
    }
    Object.defineProperty(TableRendererComponent.prototype, "propertiesDataKeys", {
        get: /**
         * @return {?}
         */
        function () {
            return Object.keys(this.properties.data);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    TableRendererComponent.prototype.getLink = /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    function (docLinkName, typeName) {
        return typeName.toLowerCase() + "." + docLinkName;
    };
    /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    TableRendererComponent.prototype.getDocData = /**
     * @param {?} docLinkName
     * @param {?} typeName
     * @return {?}
     */
    function (docLinkName, typeName) {
        return this.service.getThis(this.service.DocsData, this.getLink(docLinkName, typeName), {});
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TableRendererComponent.prototype.showJsonViewer = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return !!val && typeof val !== "string";
    };
    /**
     * @param {?} key
     * @return {?}
     */
    TableRendererComponent.prototype.showText = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return key !== 'value' && key !== 'arguments' && key !== 'testCases';
    };
    /**
     * @param {?} val
     * @return {?}
     */
    TableRendererComponent.prototype.isString = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return !!val && typeof val === "string";
    };
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    TableRendererComponent.prototype.hasTest = /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    function (row, key) {
        return this.service.getThis(this.properties.data, row + "." + key) && this.service.getThis(this.properties.data, row + "." + key, []).length;
    };
    /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    TableRendererComponent.prototype.hasArguments = /**
     * @param {?} row
     * @param {?} key
     * @return {?}
     */
    function (row, key) {
        if (key !== "arguments") {
            return false;
        }
        /** @type {?} */
        var val = this.service.getThis(this.properties.data, row + "." + key);
        /** @type {?} */
        var length = (Array.isArray(val) ? val : []).length;
        if (!length) {
            return false;
        }
        /** @type {?} */
        var pass = true;
        val.forEach(function (element) {
            console.log(element);
            if (!element.hasOwnProperty || !element.hasOwnProperty("name")) {
                pass = false;
            }
        });
        return pass;
    };
    TableRendererComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-table-renderer',
                    template: "<table *ngIf=\"show\" class=\"documentation-table\">\n    <thead>\n        <tr>\n            <th *ngFor=\"let column of properties.columns; let key = index\">{{column.label}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let row of propertiesDataKeys; let rowIndex = index\">\n            <td *ngFor=\"let column of properties.columns; let key = index\" [ngClass]=\"column.label\">\n                <!-- <div v-if=\"column.key === 'value' && properties.data[row]\">\n                    <app-value-input [model]=\"properties.data[row]\"></app-value-input>\n                </div> -->\n                <div *ngIf=\"showText(column.key)\">\n                    <app-json-viewer *ngIf=\"showJsonViewer(properties.data[row][column.key])\" [json]=\"properties.data[row][column.key]\"></app-json-viewer>\n                    <div *ngIf=\"isString(properties.data[row][column.key])\" [innerHTML]=\"properties.data[row][column.key]\"></div>\n                </div>\n                <div *ngIf=\"hasArguments(row, column.key)\">\n                    <div *ngFor=\"let argument of properties.data[row][column.key]\" class=\"argument-container\">\n                        <div class=\"argument-name\">\n                            <b>{{argument.name}}</b>\n                            <span *ngIf=\"argument.isOptional\">: (optional)</span>\n                            <span class=\"argument-body\" *ngIf=\"argument.description\"> - {{argument.description}}</span>\n                        </div>\n                        <div class=\"argument-body red-flag\" *ngIf=\"!argument.description\">missing description</div>\n                        <div class=\"argument-object\" *ngIf=\"argument.type\">\n                            <app-json-viewer *ngIf=\"showJsonViewer(argument.type)\" [json]=\"argument.type\"></app-json-viewer>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"column.key === 'testCases'\" [ngClass]=\"{noTest: !hasTest(row, column.key)}\">\n                    <app-json-viewer *ngIf=\"showJsonViewer(properties.data[row][column.key])\" [json]=\"properties.data[row][column.key]\"></app-json-viewer>\n                </div>\n            </td>\n        </tr>\n    </tbody>\n</table>",
                    styles: [".documentation-table{width:100%;text-align:left;border-collapse:collapse}.documentation-table td,.documentation-table th{vertical-align:top;padding:14px;font-size:12px}.documentation-table th{background:#a18f74;color:#fff;text-transform:uppercase}.documentation-table td{background:rgba(9,54,84,.05)}.documentation-table td .red-flag{font-family:monospace}.documentation-table td:nth-child(1){font-weight:700}.documentation-table td.type{text-transform:lowercase}.documentation-table tbody tr:nth-child(even)>td{background:rgba(9,54,84,.1)}.documentation-table td td,.documentation-table td th{padding:7px}.documentation-table td pre{font-family:sans-serif;font-size:12px;line-height:18px;background:rgba(255,255,255,.61);padding:7px;margin:0}.documentation-table .argument-container{margin:0 0 14px}.documentation-table .argument-container .argument-name{background:rgba(35,70,100,.15);padding:7px}.documentation-table .argument-container .argument-object{padding:5px 7px;background:rgba(255,255,255,.85)}.documentation-table .argument-container:last-child{margin:0}.documentation-table .noTest{background:#a10005;color:#fff;padding:3px}.documentation-table .noTest *,.documentation-table .noTest .json-formatter-row,.documentation-table .noTest .json-formatter-row a,.documentation-table .noTest .json-formatter-row a:hover{color:#fff}"]
                },] },
    ];
    /** @nocollapse */
    TableRendererComponent.ctorParameters = function () { return []; };
    TableRendererComponent.propDecorators = {
        show: [{ type: Input, args: ['show',] }],
        properties: [{ type: Input, args: ['properties',] }]
    };
    return TableRendererComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var JsonViewerComponent = /** @class */ (function () {
    function JsonViewerComponent() {
    }
    Object.defineProperty(JsonViewerComponent.prototype, "html", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var formatter = new JSONFormatter(this.json, 0, {
                hoverPreviewEnabled: false,
                hoverPreviewArrayCount: 100,
                hoverPreviewFieldCount: 5,
            });
            return formatter.render().outerHTML;
        },
        enumerable: true,
        configurable: true
    });
    JsonViewerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-json-viewer',
                    template: "<div [innerHTML]=\"html\"></div>",
                    styles: [".json-formatter-row .json-formatter-row,.json-formatter-row a{white-space:nowrap}"]
                },] },
    ];
    JsonViewerComponent.propDecorators = {
        json: [{ type: Input, args: ['json',] }]
    };
    return JsonViewerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ViewerInputComponent = /** @class */ (function () {
    function ViewerInputComponent() {
        this.proxyModel = "";
        this.type = "string";
    }
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.getProxyModel = /**
     * @return {?}
     */
    function () {
        switch (this.type) {
            case "string":
                return this.model.value ? this.model.value.toString() : "";
            case "number":
                return this.model.value ? parseFloat(this.model.value) : 0;
            case "boolean":
                return this.model.value;
            default:
                /** @type {?} */
                var val = this.model.value;
                try {
                    val = JSON.stringify(this.model.value);
                }
                catch (error) { }
                return val || "{}";
        }
    };
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.updateVal = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var value = this.proxyModel;
        switch (this.type) {
            case "string":
                this.model.value = value ? value.toString() : "";
                break;
            case "number":
                this.model.value = value ? parseFloat(value) : 0;
                break;
            case "boolean":
                this.model.value = !!value;
                break;
            default:
                try {
                    value = JSON.parse(value);
                }
                catch (error) { }
                this.model.value = value || {};
        }
    };
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        console.log(this.type, this.model);
        this.proxyModel = this.getProxyModel();
        this.type = this.model ? this.model.type || this.model.kind || "string" : "string";
    };
    /**
     * @return {?}
     */
    ViewerInputComponent.prototype.showTextarea = /**
     * @return {?}
     */
    function () {
        return this.type !== 'string' && this.type !== 'number';
    };
    ViewerInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-value-input',
                    template: "<div class=\"value-input\">\n    <textarea *ngIf=\"showTextarea()\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\"></textarea>\n    <!-- <input type=\"number\" *ngIf=\"type === 'number'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\">\n    <input type=\"text\" *ngIf=\"type === 'string'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\">\n    <input type=\"checkbox\" *ngIf=\"type === 'boolean'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\"> -->\n</div>",
                    styles: [""]
                },] },
    ];
    ViewerInputComponent.propDecorators = {
        model: [{ type: Input, args: ['model',] }]
    };
    return ViewerInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var DocksModule = /** @class */ (function () {
    function DocksModule() {
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
    return DocksModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { DocksModule, DocksComponent as ɵa, JsonViewerComponent as ɵe, RendererComponent as ɵc, SidebarComponent as ɵb, TableRendererComponent as ɵd, ViewerInputComponent as ɵf };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja3MtYW5ndWxhci5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9kb2N1bWVudGF0aW9uLXNlcnZpY2UudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvdGVzdC1zZXJ2aWNlLnRzIiwibmc6Ly9kb2Nrcy1hbmd1bGFyL3NyYy9tb2R1bGVzL2RvY2tzL2RvY2tzLmNvbXBvbmVudC50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9zaWRlYmFyLmNvbXBvbmVudC50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9yZW5kZXJlci5jb21wb25lbnQudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvdGFibGUtcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9kb2Nrcy1hbmd1bGFyL3NyYy9tb2R1bGVzL2RvY2tzL2pzb24tdmlld2VyLmNvbXBvbmVudC50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy92YWx1ZS1pbnB1dC5jb21wb25lbnQudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvZG9ja3MubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBkb2N1bWVudGF0aW9uU2VydmljZSB7XG4gICAgZG9jOiBhbnkgPSB7fVxuICAgIG9wZW5lZERvYyA9ICdkb2MtYWN0aXZlLWRyb3Bkb3duJ1xuICAgIERvY3NEYXRhOiBhbnkgPSB7fVxuXG4gICAgc3RhdGVzID0ge1xuICAgICAgICBwcm9wczogZmFsc2UsXG4gICAgICAgIG1ldGhvZHM6IGZhbHNlLFxuICAgICAgICBnZXR0ZXJzOiBmYWxzZSxcbiAgICAgICAgZGF0YVByb3BzOiBmYWxzZSxcbiAgICAgICAgZGVtbzogZmFsc2UsXG4gICAgICAgIGRlbW9PdmVybGF5OiBmYWxzZSxcbiAgICAgICAgY29tcG9uZW50czogZmFsc2UsXG4gICAgICAgIHRlc3RzOiBmYWxzZSxcbiAgICAgICAgdmlldzogJycsXG4gICAgICAgIHNpZGViYXJTdGF0ZTogYGAsXG4gICAgICAgIGFyZ1RvU2hvdzogYGBcbiAgICB9XG5cbiAgICBzZXREb2NzKERvY3NEYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5Eb2NzRGF0YSA9IERvY3NEYXRhXG4gICAgfVxuXG4gICAgc2V0RG9jKCkge1xuICAgICAgICB0aGlzLmRvYyA9IHRoaXMuZ2V0VGhpcyh0aGlzLkRvY3NEYXRhLCB0aGlzLm9wZW5lZERvYywge30pXG4gICAgICAgIHJldHVybiB0aGlzLmRvY1xuICAgIH1cblxuICAgIG9wZW5Eb2MoZG9jOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5vcGVuZWREb2MgPSBkb2NcbiAgICAgICAgdGhpcy5zdGF0ZXMudmlldyA9IGBjb21wb25lbnRzYFxuICAgICAgICB0aGlzLnNldERvYygpXG4gICAgfVxuXG4gICAgZ2V0TWFya3VwKGRvYzogYW55KSB7XG4gICAgICAgIGNvbnN0IHByb3BzID0gW11cblxuICAgICAgICBmb3IgKGNvbnN0IHAgaW4gZG9jLnByb3BzKSB7XG4gICAgICAgICAgICBpZiAoZG9jLnByb3BzW3BdKSB7XG4gICAgICAgICAgICAgICAgcHJvcHMucHVzaChgOiR7cH09XCJkb2MucHJvcHMuJHtwfS52YWx1ZVwiYClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBgPCR7ZG9jLm5hbWV9JHtwcm9wcy5sZW5ndGggPyBgXFxuICBgIDogYGB9JHtwcm9wcy5qb2luKCdcXG4gICcpfSR7cHJvcHMubGVuZ3RoID8gYFxcbmAgOiBgYH0+PC8ke2RvYy5uYW1lfT5gXG4gICAgfVxuXG4gICAganNvbihvYmo6IGFueSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gYGBcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAnICAgICcpXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgZG9jTmFtZShkb2M6IGFueSkge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkb2MubmFtZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBlbCBUaGUgc3RhcnRpbmcgb2JqZWN0XG4gICAgICogQHBhcmFtIHBhdGggU3RyaW5nIHRvIGZvbGxvd1xuICAgICAqIEBwYXJhbSBlbXB0eVZhbCBXaGF0IGlzIHJldHVybmVkIGlmIHVuZGVmaW5lZFxuICAgICAqIEBkZXNjIE5hdmlnYXRlcyBhbiBvYmplY3Qgb3IgYXJyYXkgdG8gZmluZCBhIHZhbHVlXG4gICAgICovXG4gICAgZ2V0VGhpcyhlbDogYW55LCBwYXRoOiBBcnJheTxhbnk+IHwgc3RyaW5nLCBlbXB0eVZhbD86IGFueSkge1xuICAgICAgICBpZiAocGF0aCAmJiBwYXRoLnRvU3RyaW5nKCkuc3BsaXQpIHtcbiAgICAgICAgICAgIHBhdGggPSBbZWxdLmNvbmNhdChwYXRoLnRvU3RyaW5nKCkuc3BsaXQoYC5gKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhdGggPSBbZWxdXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCByZXN1bHQgPSBwYXRoLnJlZHVjZShmdW5jdGlvbiAoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgaWYgKGFjY3VtdWxhdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW1wdHlWYWxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZS5pbmRleE9mKGAuYCkgPT09IC0xICYmIGN1cnJlbnRWYWx1ZS5pbmRleE9mKGAoYCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdzU3RyaW5nID0gJydcblxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3NPYmogPSAvXFwoKC4qPylcXCkvZy5leGVjKGN1cnJlbnRWYWx1ZSlcblxuICAgICAgICAgICAgICAgIGlmIChhcmdzT2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3NTdHJpbmcgPSBhcmdzT2JqWzFdIHx8IGBgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IGFyZ3NTdHJpbmcuc3BsaXQoYCxgKS5tYXAoKGFyZykgPT4gYXJnLnRyaW0oKSlcbiAgICAgICAgICAgICAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSBjdXJyZW50VmFsdWUuc3BsaXQoYChgKVswXVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY2N1bXVsYXRvcltmdW5jdGlvbk5hbWVdID09PSBgZnVuY3Rpb25gKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IF9yZXN1bHQgPSBhY2N1bXVsYXRvcltmdW5jdGlvbk5hbWVdLmFwcGx5KGFjY3VtdWxhdG9yLCBhcmdzKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3Jlc3VsdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcltjdXJyZW50VmFsdWVdXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvclxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gZW1wdHlWYWxcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgRG9jdW1lbnRhdGlvblNlcnZpY2UgPSBuZXcgZG9jdW1lbnRhdGlvblNlcnZpY2UoKVxuIiwiaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIHRlc3RTZXJ2aWNlIHtcbiAgICBkb2M6IGFueSA9IHt9XG4gICAgb3BlbmVkRG9jID0gJ2RvYy1hY3RpdmUtZHJvcGRvd24nXG4gICAgdGVzdFJlc3VsdHM6IGFueSA9IHtcbiAgICAgICAgdGVzdHNBcmVSdW5uaW5nOiBmYWxzZSxcbiAgICAgICAgdGVzdHM6IHt9XG4gICAgfVxuXG4gICAgdGVzdHM6IGFueSA9IHt9XG4gICAgZmxhdFRlc3RzOiBhbnkgPSB7fVxuICAgIHRlc3RUeXBlczogYW55ID0ge1xuICAgICAgICBjbGFzczogW10sXG4gICAgICAgIGNvbXBvbmVudHM6IFtdLFxuICAgICAgICBtb2R1bGVzOiBbXSxcbiAgICAgICAgJ29iamVjdCBsaXRlcmFscyc6IFtdLFxuICAgICAgICBpbnRlcmZhY2VzOiBbXSxcbiAgICAgICAgdmFyaWFibGU6IFtdXG4gICAgfVxuICAgIHNob3duVGVzdHNTdGF0ZSA9IGBgXG5cbiAgICBzZXRUZXN0cyh0ZXN0czogYW55KSB7XG4gICAgICAgIHRoaXMudGVzdHMgPSB0ZXN0c1xuICAgICAgICB0aGlzLnRlc3RUeXBlcy5jbGFzcyA9IERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0cywgYGNsYXNzYCwgW10pXG5cbiAgICAgICAgY29uc3QgdHlwZXNUb1Rlc3QgPSBbXG4gICAgICAgICAgICBgbWV0aG9kc2AsXG4gICAgICAgICAgICBgcHJvcGVydGllc2AsXG4gICAgICAgICAgICBgYXR0cmlidXRlUHJvcGVydGllc2AsXG4gICAgICAgICAgICBgZ2V0dGVyc2BcbiAgICAgICAgXVxuXG4gICAgICAgIGZvciAoY29uc3QgdHlwZSBpbiBEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YSkge1xuICAgICAgICAgICAgaWYgKERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRvY05hbWUgaW4gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdW2RvY05hbWVdICYmIGRvY05hbWUgIT09IGBEb2N1bWVudGF0aW9uU2VydmljZWAgJiYgZG9jTmFtZSAhPT0gYFRlc3RTZXJ2aWNlYCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlVGVzdCA9IERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0VHlwZXMsIGAke3R5cGV9LiR7ZG9jTmFtZX1gLCB7IHRlc3RzOiBbXSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZVRlc3RUZXN0czogYW55ID0ge31cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VUZXN0LnRlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3QudGVzdHMuZm9yRWFjaCgodGVzdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JzID0gdGVzdC5mb3JcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcnMgPSB0ZXN0Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JzICYmIEFycmF5LmlzQXJyYXkoZm9ycykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcnMuZm9yRWFjaChfZm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2VUZXN0VGVzdHNbX2Zvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tfZm9yXSA9IFt0ZXN0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW19mb3JdLnB1c2godGVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2VUZXN0VGVzdHNbZm9yc10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdID0gW3Rlc3RdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdLnB1c2godGVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YVt0eXBlXVtkb2NOYW1lXS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV1bZG9jTmFtZV0uY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkTmFtZSBpbiBjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5bY2hpbGROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhY2hpbGRyZW5bY2hpbGROYW1lXSAmJiB0eXBlc1RvVGVzdC5pbmRleE9mKGNoaWxkTmFtZSkgPiAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZHJlbltjaGlsZE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltjaGlsZE5hbWVdW3Byb3BOYW1lXSAmJiB0eXBlb2YgY2hpbGRyZW5bY2hpbGROYW1lXVtwcm9wTmFtZV0gPT09IGBvYmplY3RgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0Q2FzZXMgPSBzZXJ2aWNlVGVzdFRlc3RzW3Byb3BOYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FuTWFwID0gISF0ZXN0Q2FzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdLnRlc3RzID0gc2VydmljZVRlc3RUZXN0c1twcm9wTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdLnRlc3RDYXNlcyA9IGNhbk1hcCA/IHRlc3RDYXNlcy5tYXAoKHRlc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NlcnRzID0gdGVzdC5uYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdC5hc3NlcnRzICYmIHRlc3QuYXNzZXJ0cy5tYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0cyA9IHRlc3QuYXNzZXJ0cy5tYXAoKGFzc2VydDogYW55KSA9PiBhc3NlcnQubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0ZXN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSA6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNUZXN0UmFuKGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9YClcbiAgICB9XG5cbiAgICBoYXNUZXN0UGFzc2VkKGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFJlc3VsdHMudGVzdHMsIGAke2RvY30ucmVzdWx0cy4ke3Rlc3ROYW1lfS5wYXNzYClcbiAgICB9XG5cbiAgICBnZXRUZXN0QXNzZXJ0UmVzdWx0KGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJlc3VsdHMuJHt0ZXN0TmFtZX0ucmVzdWx0cy4ke2luZGV4fWApXG4gICAgfVxuXG4gICAgaGFzVGVzdEFzc2VydHMoZG9jOiBzdHJpbmcsIHRlc3RJbmRleDogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2VydHM6IEFycmF5PGFueT4gPSBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdHMsIGAke2RvY30udGVzdHMuJHt0ZXN0SW5kZXh9LmFzc2VydHNgKVxuICAgICAgICBjb25zdCBhc3NlcnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gW11cblxuICAgICAgICBpZiAoYXNzZXJ0cykge1xuICAgICAgICAgICAgYXNzZXJ0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0S2V5cy5wdXNoKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnRLZXlzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzc2VydEtleXNcbiAgICB9XG5cbiAgICBpc1Rlc3RSdW5uaW5nKGRvYzogc3RyaW5nLCB0ZXN0TmFtZT86IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRlc3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJ1bm5pbmdgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9LnJ1bm5pbmdgKVxuICAgIH1cblxuICAgIGdldFRlc3RzKGRvYzogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdHNbZG9jXSB8fCB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBydW5Bc3NlcnRzKHRlc3Q6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGVzdC5yZXN1bHRzID0gW11cblxuICAgICAgICAgICAgY29uc3QgcnVuQXNzZXJ0ID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRlc3QuYXNzZXJ0c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGVzdC5yZXN1bHRzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBrZXk6IGFueSA9IHRlc3QuYXNzZXJ0c1tpbmRleF1cbiAgICAgICAgICAgICAgICBsZXQgZm46IEZ1bmN0aW9uID0gKCkgPT4geyB9XG4gICAgICAgICAgICAgICAgbGV0IHByZTogRnVuY3Rpb24gfCBudWxsID0gbnVsbFxuICAgICAgICAgICAgICAgIGxldCB2YWw6IGFueVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IGBzdHJpbmdgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuID0gdGVzdC5tZXRob2RzW2tleV1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0ZXN0LmFzc2VydHNbaW5kZXhdID09PSBgb2JqZWN0YCkge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSB0ZXN0LmFzc2VydHNbaW5kZXhdLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgZm4gPSB0ZXN0LmFzc2VydHNbaW5kZXhdLmZuXG4gICAgICAgICAgICAgICAgICAgIHByZSA9IHRlc3QuYXNzZXJ0c1tpbmRleF0ucHJlIHx8IHByZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QucmVzdWx0cy5wdXNoKHsgcGFzczogdHJ1ZSwgbWVzc2FnZTogcmVzLCBrZXkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6IGZhbHNlLCBtZXNzYWdlOiByZXMsIGtleSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5Bc3NlcnQoaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6ICEhdmFsLCBtZXNzYWdlOiB2YWwsIGtleSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcHJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVuQXNzZXJ0KDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcnVuVGVzdCh0ZXN0OiBhbnksIGdyb3VwS2V5OiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzQXJlUnVubmluZyA9IHRydWVcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXSA9IHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGFzczogMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0czoge30sXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bZ3JvdXBLZXldLnJ1bm5pbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdHMgPSAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5ydW5uaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5yZXN1bHRzW3Rlc3QubmFtZV0gPSByZXNcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzQXJlUnVubmluZyA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICBpZiAocmVzLnBhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocmVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaW5pc2hBc3NlcnQgPSAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFzc2VkID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnQucGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFzczogcGFzc2VkLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgYCxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBub3csXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5yZXN1bHRzW3Rlc3QubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFzczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBgLFxuICAgICAgICAgICAgICAgIHRpbWU6IDAsXG4gICAgICAgICAgICAgICAgcnVubmluZzogdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGVzdC5hc3NlcnRzICYmIHRlc3QuYXNzZXJ0cy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucnVuQXNzZXJ0cyh0ZXN0KS50aGVuKGZpbmlzaEFzc2VydCwgZmluaXNoQXNzZXJ0KVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3QuZm4gJiYgdHlwZW9mIHRlc3QuZm4gPT09IGBmdW5jdGlvbmApIHtcbiAgICAgICAgICAgICAgICB0ZXN0LmZuKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgKHJlajogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZWosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBub3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVqXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcnVuVGVzdEdyb3VwKGdyb3VwOiBhbnksIHR5cGU6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFzczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdHMgPSAocmVzOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW50VXBkYXRlUGFzcyA9IHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucGFzcyA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXNzID0gY2FudFVwZGF0ZVBhc3MgPyB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdLnBhc3MgOiByZXMucGFzc1xuXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1tncm91cC5uYW1lXS5wYXNzID0gbmV3UGFzc1xuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucmVzdWx0c1tncm91cC50ZXN0c1tpbmRleF0ubmFtZV0gPSByZXNcblxuICAgICAgICAgICAgICAgIHJ1bihpbmRleCArIDEpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJ1biA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwLnRlc3RzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1blRlc3QoZ3JvdXAudGVzdHNbaW5kZXhdLCBncm91cC5uYW1lLCB0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyhyZXMsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHJlcywgaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVuKDApXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBSdW5zIGFsbCB0ZXN0c1xuICAgICAqIEBwYXJhbSB0ZXN0IC0gdGVzdGluZyBwYXJhbSBkZXNjcmlwdGlvblxuICAgICAqL1xuICAgIHJ1blRlc3RzKHRlc3Q/OiB7IGlkOiBzdHJpbmcgfSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJ1biA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMudGVzdHMpW2luZGV4XVxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNUZXN0R3JvdXAgPSB0aGlzLnRlc3RzW3R5cGVdXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1Rlc3RHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBydW5Hcm91cCA9IChncm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNUZXN0ID0gdGhpc1Rlc3RHcm91cFtPYmplY3Qua2V5cyh0aGlzVGVzdEdyb3VwKVtncm91cEluZGV4XV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNUZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5UZXN0R3JvdXAodGhpc1Rlc3QsIHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVt0aGlzVGVzdC5uYW1lXSA9IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoZ3JvdXBJbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChyZWo6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVt0aGlzVGVzdC5uYW1lXSA9IHJlalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoZ3JvdXBJbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bihpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBydW5Hcm91cCgwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy50ZXN0UmVzdWx0cy50ZXN0cylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bigwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEZvcm1hdGVkVGltZSh0aW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICBpZiAodGltZXN0YW1wIDwgMTAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVzdGFtcCArIGBtc2BcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgPCAxMDAwICogNjApIHtcbiAgICAgICAgICAgIHJldHVybiAodGltZXN0YW1wIC8gMTAwMCkgKyBgc2BcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgPCAxMDAwICogNjAgKiA2MCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aW1lc3RhbXAgLyAxMDAwICogNjApICsgYG1gXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYGBcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgVGVzdFNlcnZpY2UgPSBuZXcgdGVzdFNlcnZpY2UoKVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtZG9ja3MnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBpZD1cImRvY3VtZW50YXRpb24tb3ZlcmxheVwiPlxuICA8YXBwLXNpZGViYXI+PC9hcHAtc2lkZWJhcj5cbiAgPGRpdiBjbGFzcz1cImRvYy12aWV3ZXJcIiBbbmdDbGFzc109XCJzZXJ2aWNlLm9wZW5lZERvY1wiPlxuICAgIDxkaXYgY2xhc3M9XCJkb2MtY29udGFpbmVyXCI+XG4gICAgICA8YXBwLXJlbmRlcmVyPjwvYXBwLXJlbmRlcmVyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYEAtd2Via2l0LWtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGluZ3swJSwxMDAle29wYWNpdHk6LjN9NTAle29wYWNpdHk6Ljh9fUBrZXlmcmFtZXMgZmFkaW5nezAlLDEwMCV7b3BhY2l0eTouM301MCV7b3BhY2l0eTouOH19I2RvY3VtZW50YXRpb24tb3ZlcmxheXtwb3NpdGlvbjpmaXhlZDt0b3A6MDtsZWZ0OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTt6LWluZGV4Ojk5OTk5OTk7YmFja2dyb3VuZDojZmZmO292ZXJmbG93OmhpZGRlbjtkaXNwbGF5OmZsZXg7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5yZWQtZmxhZ3tjb2xvcjojZDEwMDA1fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgI2RvY3MtY2xvc2UtYnV0dG9ue3Bvc2l0aW9uOmZpeGVkO3RvcDo3cHg7cmlnaHQ6N3B4O2NvbG9yOiNmZmY7YmFja2dyb3VuZDojZjNhYTAwO3BhZGRpbmc6N3B4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXItcmFkaXVzOjUwJTtmb250LXdlaWdodDo3MDA7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTVweDtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5kaXNhYmxlZHtvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmV9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b257Zm9udC1zaXplOjEycHg7Ym9yZGVyOm5vbmU7cGFkZGluZzo3cHg7b3V0bGluZTowIWltcG9ydGFudH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC50ZXN0LWFzc2VydHN7Zm9udC1zaXplOjEycHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAudGVzdC1hc3NlcnRzIC50ZXN0LWFzc2VydHtwYWRkaW5nOjdweCA3cHggN3B4IDQ3cHg7YmFja2dyb3VuZDpyZ2JhKDM1LDcxLDEwMCwuMDQpfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnRlc3QtYXNzZXJ0cyAudGVzdC1hc3NlcnQ6bnRoLWNoaWxkKGV2ZW4pe2JhY2tncm91bmQ6cmdiYSgzNSw3MSwxMDAsLjA5KX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5zcGluLWlmLXJ1bm5pbmd7dHJhbnNpdGlvbjpvcGFjaXR5IC41czttYXJnaW4tcmlnaHQ6N3B4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9uLnNwaW4taWYtcnVubmluZy5ydW5uaW5ne29wYWNpdHk6LjU7cG9pbnRlci1ldmVudHM6bm9uZTstd2Via2l0LWFuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnNwaW4taWYtcnVubmluZy5ydW5uaW5nPnNwYW57dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4ycywtd2Via2l0LXRyYW5zZm9ybSAuMnM7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHJvdGF0aW5nO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgcm90YXRpbmd9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuc3Bpbi1pZi1ydW5uaW5nPnNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2t9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW57d2lkdGg6MTZweDtoZWlnaHQ6MTZweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5zcGluLWlmLXJ1bm5pbmc+c3BhbiBzcGFue3Bvc2l0aW9uOnJlbGF0aXZlO2xlZnQ6MXB4O3RvcDowO3RyYW5zaXRpb246bGVmdCAuMnN9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5nLnJ1bm5pbmc+c3BhbiBzcGFue2xlZnQ6MXB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXJ7aGVpZ2h0OjEwMCU7cGFkZGluZzoxNHB4O292ZXJmbG93OmF1dG87d2lkdGg6MTAwJTtjb2xvcjojMjM0NzY0fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgbGl7bGlzdC1zdHlsZTpub25lfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgYnV0dG9ue2JhY2tncm91bmQ6I2YzYWEwMDtjb2xvcjojZmZmO2N1cnNvcjpwb2ludGVyfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHB7bWFyZ2luOjdweCAwfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHAuZGVzY3JpcHRpb24sI2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgcC5zdWJ0aXRsZXttYXJnaW4tYm90dG9tOjIxcHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgaDJ7bWFyZ2luOjE0cHggMH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBzZWN0aW9ue21hcmdpbjowIDAgMjhweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBpbnB1dCwjZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBzZWxlY3QsI2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgdGV4dGFyZWF7YmFja2dyb3VuZDojZmZmO2JvcmRlcjpub25lO2hlaWdodDozMnB4O3dpZHRoOjEwMCU7bWF4LXdpZHRoOjIxMHB4O2JvcmRlci1yYWRpdXM6MXB4O291dGxpbmU6MCFpbXBvcnRhbnQ7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO3BhZGRpbmc6MTBweDtjb2xvcjojMjM0NjY0O2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjIyKTtib3gtc2l6aW5nOmJvcmRlci1ib3h9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgdGV4dGFyZWF7aGVpZ2h0OjEwMHB4O3Jlc2l6ZTpub25lfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgYSAuZXhhbXBsZS1jb2Rle3dpZHRoOjEwMCU7b3ZlcmZsb3c6YXV0bztwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOiNhMThmNzQ7Y29sb3I6I2ZmZjtmb250LXNpemU6MTJweDttYXJnaW4tYm90dG9tOjIxcHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZXhhbXBsZS1jb2RlIHByZXttYXJnaW46MH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5oMXtmb250LXNpemU6MjhweDtmb250LXdlaWdodDo3MDA7bWFyZ2luOjIxcHggMH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5oMntmb250LXNpemU6MThweDttYXJnaW46MTRweCAwIDA7YmFja2dyb3VuZDojMjM0NzY0O2NvbG9yOiNmZmY7cGFkZGluZzoxMHB4O2N1cnNvcjpwb2ludGVyfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmgyOmJlZm9yZXtjb250ZW50OlwiXCI7Ym9yZGVyOjdweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdC1jb2xvcjojZmZmO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2t9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDIuYWN0aXZlOmJlZm9yZXtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dG9wOjRweDtsZWZ0Oi0zcHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDN7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjE3cHggMDtmb250LXdlaWdodDo3MDB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuc3VidGl0bGV7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MTAwO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO21hcmdpbi1sZWZ0OjdweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyICNkZW1vLW92ZXJsYXl7d2lkdGg6OTAlO2hlaWdodDo5MCV9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciBwcmUuZGVtb3tmb250LXNpemU6MTJweDtwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOnJnYmEoOSw1NCw4NCwuMSk7b3ZlcmZsb3c6YXV0b30jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyICNkZW1vLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowO2JhY2tncm91bmQ6IzBiMTExNmRlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt6LWluZGV4Ojk5OTk5OTk5OTtjb2xvcjojZmZmO292ZXJmbG93OmF1dG99I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAjZGVtby1vdmVybGF5LWNsb3Nle3Bvc2l0aW9uOmZpeGVkO3RvcDoxNHB4O3JpZ2h0OjE0cHg7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuMjMpO3BhZGRpbmc6N3B4O3dpZHRoOjI0cHg7aGVpZ2h0OjI0cHg7ZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXItcmFkaXVzOjUwJTtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5mbGV4LXZjZW50ZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC50ZXN0LWdyb3VwLWhlYWRlciAuaDN7bWFyZ2luOjB9Lm5vVGVzdHtiYWNrZ3JvdW5kOiNhMTAwMDU7Y29sb3I6I2ZmZjtwYWRkaW5nOjNweH0ubm9UZXN0ICosLm5vVGVzdCAuanNvbi1mb3JtYXR0ZXItcm93LC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdyBhLC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdyBhOmhvdmVye2NvbG9yOiNmZmZ9LnJlZC1mbGFne2NvbG9yOiNhMTAwMDV9YF1cbn0pXG5leHBvcnQgY2xhc3MgRG9ja3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgc2VydmljZTogYW55ID0gRG9jdW1lbnRhdGlvblNlcnZpY2VcbiAgICB0ZXN0U2VydmljZTogYW55ID0gVGVzdFNlcnZpY2VcblxuICAgIEBJbnB1dCgnZG9jcycpXG4gICAgZG9jczogYW55XG5cbiAgICBASW5wdXQoJ2luaXRpYWwnKVxuICAgIGluaXRpYWw6IHN0cmluZ1xuXG4gICAgQElucHV0KCd0ZXN0cycpXG4gICAgdGVzdHM6IGFueVxuXG4gICAgQElucHV0KCdjb21wb25lbnRDbGFzc2VzJylcbiAgICBjb21wb25lbnRDbGFzc2VzOiBhbnlcblxuICAgIGxhdW5jaChkb2M6IGFueSkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2V0RG9jcyh0aGlzLmRvY3MpXG4gICAgICAgIHRoaXMudGVzdFNlcnZpY2Uuc2V0VGVzdHModGhpcy50ZXN0cylcblxuICAgICAgICBpZiAodGhpcy5pbml0aWFsICYmIHRoaXMuaW5pdGlhbCAhPT0gYGApIHtcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5vcGVuRG9jKHRoaXMuaW5pdGlhbClcbiAgICAgICAgICAgIHRoaXMuc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID0gdGhpcy5pbml0aWFsLnNwbGl0KGAuYClbMF1cbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtc2lkZWJhcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZG9jLXNpZGViYXJcIj5cbiAgICA8ZGl2ICpuZ0Zvcj1cImxldCB0eXBlTmFtZSBvZiB0eXBlTmFtZXM7IGxldCB0eXBlSW5kZXggPSBpbmRleFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1oZWFkaW5nIGdyb3VwXCIgW25nQ2xhc3NdPVwie2FjdGl2ZTogc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID09PSB0eXBlTmFtZX1cIiAoY2xpY2spPVwic2V0U2lkZWJhclN0YXRlKHR5cGVOYW1lKVwiPnt7dHlwZU5hbWV9fTwvZGl2PlxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIntzaG93bjogc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID09PSB0eXBlTmFtZX1cIiBjbGFzcz1cImxpbmstZ3JvdXBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkb2Mtc2lkZWJhci1saW5rXCIgKm5nRm9yPVwibGV0IGRvY0xpbmtOYW1lIG9mIGxpbmtOYW1lc1t0eXBlSW5kZXhdXCIgKGNsaWNrKT1cInNlcnZpY2Uub3BlbkRvYyhnZXRMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSkpXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc0RvY3VtZW50ZWQoZG9jTGlua05hbWUsIHR5cGVOYW1lKVwiIGNsYXNzPVwicmVkLWZsYWdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3tnZXREb2NMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSkubmFtZX19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgKm5nSWY9XCJ0ZXN0U2VydmljZS50ZXN0c1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhci1oZWFkaW5nXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLnZpZXcgPSAndGVzdHMnXCI+VGVzdHM8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYC5kb2Mtc2lkZWJhcntoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kOiMyMjQ3NjQ7Y29sb3I6I2YwZjRmODt3aGl0ZS1zcGFjZTpub3dyYXA7b3ZlcmZsb3c6YXV0b30uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZ3tmb250LXNpemU6MTJweDtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4yMSk7cGFkZGluZzoxMHB4O2JveC1zaGFkb3c6MCAtMXB4IDAgcmdiYSgwLDAsMCwuMTMpO2N1cnNvcjpwb2ludGVyO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX0uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZy5ncm91cDo6YmVmb3Jle2NvbnRlbnQ6XCJcIjtib3JkZXI6NXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1sZWZ0LWNvbG9yOiNmZmY7d2lkdGg6MDtoZWlnaHQ6MDtkaXNwbGF5OmlubGluZS1ibG9ja30uZG9jLXNpZGViYXIgLnNpZGViYXItaGVhZGluZy5ncm91cC5hY3RpdmU6OmJlZm9yZXtib3JkZXItbGVmdC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItdG9wLWNvbG9yOiNmZmY7cG9zaXRpb246cmVsYXRpdmU7dG9wOjNweDtsZWZ0Oi0ycHh9LmRvYy1zaWRlYmFyIC5saW5rLWdyb3Vwe2hlaWdodDowO29wYWNpdHk6MDtwb2ludGVyLWV2ZW50czpub25lO292ZXJmbG93OmhpZGRlbn0uZG9jLXNpZGViYXIgLmxpbmstZ3JvdXAuc2hvd257aGVpZ2h0OmF1dG87b3BhY2l0eToxO3BvaW50ZXItZXZlbnRzOmFsbDtvdmVyZmxvdzphdXRvfS5kb2Mtc2lkZWJhciAuZG9jLXNpZGViYXItbGlua3twYWRkaW5nOjEwcHg7Ym94LXNoYWRvdzowIC0xcHggMCByZ2JhKDc2LDExMiwxNDEsLjM0KSwwIC0ycHggMCByZ2JhKDQsMzQsNTcsLjI1KTtjdXJzb3I6cG9pbnRlcjtmb250LXNpemU6MTJweH0uZG9jLXNpZGViYXIgLmRvYy1zaWRlYmFyLWxpbmsgLnJlZC1mbGFne2JvcmRlcjozcHggc29saWQgI2ExMDAwNTtib3JkZXItcmFkaXVzOjUwJTtkaXNwbGF5OmlubGluZS1ibG9jazt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9YF1cbn0pXG5leHBvcnQgY2xhc3MgU2lkZWJhckNvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgc2VydmljZTogYW55ID0gRG9jdW1lbnRhdGlvblNlcnZpY2VcbiAgICB0ZXN0U2VydmljZTogYW55ID0gVGVzdFNlcnZpY2VcblxuICAgIGdldCB0eXBlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5zZXJ2aWNlLkRvY3NEYXRhKVxuICAgIH1cblxuICAgIGdldCBsaW5rTmFtZXMoKTogQXJyYXk8c3RyaW5nW10+IHtcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy50eXBlTmFtZXMubWFwKHR5cGVOYW1lID0+IE9iamVjdC5rZXlzKHRoaXMuc2VydmljZS5Eb2NzRGF0YVt0eXBlTmFtZV0pKVxuICAgICAgICByZXR1cm4gbWFwXG4gICAgfVxuXG4gICAgZ2V0TGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3R5cGVOYW1lLnRvTG93ZXJDYXNlKCl9LiR7ZG9jTGlua05hbWV9YFxuICAgIH1cblxuICAgIGlzRG9jdW1lbnRlZChkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGRvY0xpbmsgPSB0aGlzLmdldERvY0xpbmsoZG9jTGlua05hbWUsIHR5cGVOYW1lKVxuICAgICAgICByZXR1cm4gZG9jTGluay5oYXNPd25Qcm9wZXJ0eSgnaXNEb2N1bWVudGVkJykgJiYgIWRvY0xpbmsuaXNEb2N1bWVudGVkXG4gICAgfVxuXG4gICAgZ2V0RG9jTGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnNlcnZpY2UuRG9jc0RhdGEsIHRoaXMuZ2V0TGluayhkb2NMaW5rTmFtZSwgdHlwZU5hbWUpLCB7fSlcbiAgICB9XG5cbiAgICBzZXRTaWRlYmFyU3RhdGUoc3RhdGU6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zZXJ2aWNlLnN0YXRlcy5zaWRlYmFyU3RhdGUgPT09IHN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9IGBgXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID0gc3RhdGVcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9kb2N1bWVudGF0aW9uLXNlcnZpY2UnXG5pbXBvcnQgeyBUZXN0U2VydmljZSB9IGZyb20gJy4vdGVzdC1zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGU6IGA8YXJ0aWNsZSBjbGFzcz1cImRvYy1lbGVtZW50XCIgKm5nSWY9XCJzZXJ2aWNlLnN0YXRlcy52aWV3ID09PSAnY29tcG9uZW50cycgJiYgc2VydmljZS5kb2MubmFtZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJoMSB0aXRsZVwiPnt7IHNlcnZpY2UuZG9jLm5hbWUgfX1cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJzdWJ0aXRsZVwiICpuZ0lmPVwic2VydmljZS5kb2MuZGVzY3JpcHRpb25cIj57eyBzZXJ2aWNlLmRvYy5kZXNjcmlwdGlvbiB9fTwvc3Bhbj5cbiAgICA8L2Rpdj5cbiAgICA8c2VjdGlvbiAqbmdJZj1cInNlcnZpY2UuZG9jLmJvZHlcIj5cbiAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cInNlcnZpY2UuZG9jLmJvZHlcIj48L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPHNlY3Rpb24gKm5nSWY9XCJzZXJ2aWNlLmRvYy5ncm91cCA9PT0gJ2NvbXBvbmVudHMnXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5kZW1vID0gIXNlcnZpY2Uuc3RhdGVzLmRlbW9cIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5kZW1vID8gJ2FjdGl2ZScgOiAnJ1wiPkRlbW88L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdJZj1cInNlcnZpY2Uuc3RhdGVzLmRlbW9cIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHByZSBjbGFzcz1cImRlbW9cIj48Y29kZT57e3NlcnZpY2UuZ2V0TWFya3VwKHNlcnZpY2UuZG9jKX19PC9jb2RlPjwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDwhLS0gPGJ1dHRvbiAoY2xpY2spPVwibGF1bmNoKHNlcnZpY2UuZG9jKVwiPkxhdW5jaCBkZW1vPC9idXR0b24+IC0tPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGlkPVwiZGVtby1vdmVybGF5LWNvbnRhaW5lclwiICpuZ0lmPVwic2VydmljZS5zdGF0ZXMuZGVtb092ZXJsYXlcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGlkPVwiZGVtby1vdmVybGF5LWNsb3NlXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLmRlbW9PdmVybGF5ID0gZmFsc2VcIj54PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImRlbW8tb3ZlcmxheVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaGFzUHJvcGVydGllcygnYXR0cmlidXRlUHJvcGVydGllcycpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5wcm9wcyA9ICFzZXJ2aWNlLnN0YXRlcy5wcm9wc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLnByb3BzID8gJ2FjdGl2ZScgOiAnJ1wiPkF0dHJpYnV0ZSBwcm9wZXJ0aWVzPC9kaXY+XG4gICAgICAgIDxhcHAtdGFibGUtcmVuZGVyZXIgW3Nob3ddPVwic2VydmljZS5zdGF0ZXMucHJvcHNcIiBbcHJvcGVydGllc109XCJhdHRyaWJ1dGVQcm9wc1wiPjwvYXBwLXRhYmxlLXJlbmRlcmVyPlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaGFzUHJvcGVydGllcygncHJvcGVydGllcycpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5kYXRhUHJvcHMgPSAhc2VydmljZS5zdGF0ZXMuZGF0YVByb3BzXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMuZGF0YVByb3BzID8gJ2FjdGl2ZScgOiAnJ1wiPlByb3BlcnRpZXM8L2Rpdj5cbiAgICAgICAgPGFwcC10YWJsZS1yZW5kZXJlciBbc2hvd109XCJzZXJ2aWNlLnN0YXRlcy5kYXRhUHJvcHNcIiBbcHJvcGVydGllc109XCJwcm9wZXJ0aWVzXCI+PC9hcHAtdGFibGUtcmVuZGVyZXI+XG4gICAgPC9zZWN0aW9uPlxuXG4gICAgPHNlY3Rpb24gKm5nSWY9XCJoYXNQcm9wZXJ0aWVzKCdnZXR0ZXJzJylcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLmdldHRlcnMgPSAhc2VydmljZS5zdGF0ZXMuZ2V0dGVyc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLmdldHRlcnMgPyAnYWN0aXZlJyA6ICcnXCI+R2V0dGVyczwvZGl2PlxuICAgICAgICA8YXBwLXRhYmxlLXJlbmRlcmVyIFtzaG93XT1cInNlcnZpY2Uuc3RhdGVzLmdldHRlcnNcIiBbcHJvcGVydGllc109XCJnZXR0ZXJzUHJvcHNcIj48L2FwcC10YWJsZS1yZW5kZXJlcj5cbiAgICA8L3NlY3Rpb24+XG5cbiAgICA8c2VjdGlvbiAqbmdJZj1cImhhc1Byb3BlcnRpZXMoJ21ldGhvZHMnKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMubWV0aG9kcyA9ICFzZXJ2aWNlLnN0YXRlcy5tZXRob2RzXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMubWV0aG9kcyA/ICdhY3RpdmUnIDogJydcIj5NZXRob2RzPC9kaXY+XG4gICAgICAgIDxhcHAtdGFibGUtcmVuZGVyZXIgW3Nob3ddPVwic2VydmljZS5zdGF0ZXMubWV0aG9kc1wiIFtwcm9wZXJ0aWVzXT1cIm1ldGhvZHNcIj48L2FwcC10YWJsZS1yZW5kZXJlcj5cbiAgICA8L3NlY3Rpb24+XG48L2FydGljbGU+YCxcbiAgICBzdHlsZXM6IFtgQC13ZWJraXQta2V5ZnJhbWVzIHJvdGF0aW5nezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwKTt0cmFuc2Zvcm06cm90YXRlKDApfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1Aa2V5ZnJhbWVzIHJvdGF0aW5nezAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgwKTt0cmFuc2Zvcm06cm90YXRlKDApfTEwMCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7dHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpfX1ALXdlYmtpdC1rZXlmcmFtZXMgZmFkaW5nezAlLDEwMCV7b3BhY2l0eTouM301MCV7b3BhY2l0eTouOH19QGtleWZyYW1lcyBmYWRpbmd7MCUsMTAwJXtvcGFjaXR5Oi4zfTUwJXtvcGFjaXR5Oi44fX0ucmVkLWZsYWd7Y29sb3I6I2QxMDAwNX0jZG9jcy1jbG9zZS1idXR0b257cG9zaXRpb246Zml4ZWQ7dG9wOjdweDtyaWdodDo3cHg7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kOiNmM2FhMDA7cGFkZGluZzo3cHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2JvcmRlci1yYWRpdXM6NTAlO2ZvbnQtd2VpZ2h0OjcwMDt3aWR0aDozMnB4O2hlaWdodDozMnB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtmb250LXNpemU6MTVweDtsaW5lLWhlaWdodDoxNXB4O2N1cnNvcjpwb2ludGVyfWJ1dHRvbi5kaXNhYmxlZHtvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmV9YnV0dG9ue2ZvbnQtc2l6ZToxMnB4O2JvcmRlcjpub25lO3BhZGRpbmc6N3B4O291dGxpbmU6MCFpbXBvcnRhbnQ7YmFja2dyb3VuZDojZjNhYTAwO2NvbG9yOiNmZmY7Y3Vyc29yOnBvaW50ZXJ9LnRlc3QtYXNzZXJ0c3tmb250LXNpemU6MTJweH0udGVzdC1hc3NlcnRzIC50ZXN0LWFzc2VydHtwYWRkaW5nOjdweCA3cHggN3B4IDQ3cHg7YmFja2dyb3VuZDpyZ2JhKDM1LDcxLDEwMCwuMDQpfS50ZXN0LWFzc2VydHMgLnRlc3QtYXNzZXJ0Om50aC1jaGlsZChldmVuKXtiYWNrZ3JvdW5kOnJnYmEoMzUsNzEsMTAwLC4wOSl9YnV0dG9uLnNwaW4taWYtcnVubmluZ3t0cmFuc2l0aW9uOm9wYWNpdHkgLjVzO21hcmdpbi1yaWdodDo3cHh9YnV0dG9uLnNwaW4taWYtcnVubmluZy5ydW5uaW5ne29wYWNpdHk6LjU7cG9pbnRlci1ldmVudHM6bm9uZTstd2Via2l0LWFuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nO2FuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgZmFkaW5nfS5zcGluLWlmLXJ1bm5pbmcucnVubmluZz5zcGFue3RyYW5zaXRpb246dHJhbnNmb3JtIC4yczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMsLXdlYmtpdC10cmFuc2Zvcm0gLjJzOy13ZWJraXQtYW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSByb3RhdGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHJvdGF0aW5nfS5zcGluLWlmLXJ1bm5pbmc+c3BhbntkaXNwbGF5OmlubGluZS1ibG9ja31idXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW57d2lkdGg6MTZweDtoZWlnaHQ6MTZweH1idXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW4gc3Bhbntwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0OjFweDt0b3A6MDt0cmFuc2l0aW9uOmxlZnQgLjJzfWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmcucnVubmluZz5zcGFuIHNwYW57bGVmdDoxcHh9LmRvYy12aWV3ZXJ7aGVpZ2h0OjEwMCU7cGFkZGluZzoxNHB4O292ZXJmbG93OmF1dG87d2lkdGg6MTAwJTtjb2xvcjojMjM0NzY0fWxpe2xpc3Qtc3R5bGU6bm9uZX0uZG9jLWVsZW1lbnQgcHttYXJnaW46N3B4IDB9LmRvYy1lbGVtZW50IHAuZGVzY3JpcHRpb24sLmRvYy1lbGVtZW50IHAuc3VidGl0bGV7bWFyZ2luLWJvdHRvbToyMXB4fS5kb2MtZWxlbWVudCBoMnttYXJnaW46MTRweCAwfS5kb2MtZWxlbWVudCBzZWN0aW9ue21hcmdpbjowIDAgMjhweH0uZG9jLWVsZW1lbnQgaW5wdXQsLmRvYy1lbGVtZW50IHNlbGVjdCwuZG9jLWVsZW1lbnQgdGV4dGFyZWF7YmFja2dyb3VuZDojZmZmO2JvcmRlcjpub25lO2hlaWdodDozMnB4O3dpZHRoOjEwMCU7bWF4LXdpZHRoOjIxMHB4O2JvcmRlci1yYWRpdXM6MXB4O291dGxpbmU6MCFpbXBvcnRhbnQ7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7LW1vei1hcHBlYXJhbmNlOm5vbmU7YXBwZWFyYW5jZTpub25lO3BhZGRpbmc6MTBweDtjb2xvcjojMjM0NjY0O2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjIyKTtib3gtc2l6aW5nOmJvcmRlci1ib3h9LmRvYy1lbGVtZW50IHRleHRhcmVhe2hlaWdodDoxMDBweDtyZXNpemU6bm9uZX1hIC5leGFtcGxlLWNvZGV7d2lkdGg6MTAwJTtvdmVyZmxvdzphdXRvO3BhZGRpbmc6N3B4O2JhY2tncm91bmQ6I2ExOGY3NDtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxMnB4O21hcmdpbi1ib3R0b206MjFweH0uZXhhbXBsZS1jb2RlIHByZXttYXJnaW46MH0uaDF7Zm9udC1zaXplOjI4cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbjoyMXB4IDB9Lmgye2ZvbnQtc2l6ZToxOHB4O21hcmdpbjoxNHB4IDAgMDtiYWNrZ3JvdW5kOiMyMzQ3NjQ7Y29sb3I6I2ZmZjtwYWRkaW5nOjEwcHg7Y3Vyc29yOnBvaW50ZXJ9LmgyOmJlZm9yZXtjb250ZW50OlwiXCI7Ym9yZGVyOjdweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdC1jb2xvcjojZmZmO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2t9LmgyLmFjdGl2ZTpiZWZvcmV7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcC1jb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0cHg7bGVmdDotM3B4fS5oM3tmb250LXNpemU6MTRweDttYXJnaW46MTdweCAwO2ZvbnQtd2VpZ2h0OjcwMH0uc3VidGl0bGV7Zm9udC1zaXplOjE0cHg7Zm9udC13ZWlnaHQ6MTAwO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO21hcmdpbi1sZWZ0OjdweH0jZGVtby1vdmVybGF5e3dpZHRoOjkwJTtoZWlnaHQ6OTAlfXByZS5kZW1ve2ZvbnQtc2l6ZToxMnB4O3BhZGRpbmc6N3B4O2JhY2tncm91bmQ6cmdiYSg5LDU0LDg0LC4xKTtvdmVyZmxvdzphdXRvfSNkZW1vLW92ZXJsYXktY29udGFpbmVye3Bvc2l0aW9uOmZpeGVkO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7dG9wOjA7bGVmdDowO2JhY2tncm91bmQ6IzBiMTExNmRlO2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt6LWluZGV4Ojk5OTk5OTk5OTtjb2xvcjojZmZmO292ZXJmbG93OmF1dG99I2RlbW8tb3ZlcmxheS1jbG9zZXtwb3NpdGlvbjpmaXhlZDt0b3A6MTRweDtyaWdodDoxNHB4O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjIzKTtwYWRkaW5nOjdweDt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ym9yZGVyLXJhZGl1czo1MCU7Y3Vyc29yOnBvaW50ZXJ9LmZsZXgtdmNlbnRlcntkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyfS50ZXN0LWdyb3VwLWhlYWRlciAuaDN7bWFyZ2luOjB9YF1cbn0pXG5leHBvcnQgY2xhc3MgUmVuZGVyZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHNlcnZpY2U6IGFueSA9IERvY3VtZW50YXRpb25TZXJ2aWNlXG4gICAgdGVzdFNlcnZpY2U6IGFueSA9IFRlc3RTZXJ2aWNlXG5cbiAgICBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4ucHJvcGVydGllcyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndHlwZScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgbWV0aG9kcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4ubWV0aG9kcyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2FyZ3VtZW50cycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdhcmd1bWVudHMnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbGFiZWw6ICdyZXR1cm5zJyxcbiAgICAgICAgICAgICAgICBrZXk6ICdyZXR1cm5zJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3Rlc3RDYXNlcycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0ZXN0IGNhc2VzJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBhdHRyaWJ1dGVQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4uYXR0cmlidXRlUHJvcGVydGllcyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndHlwZScsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgICAgICAvLyB9LCB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGtleTogJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgICAvLyAgICAgbGFiZWw6ICd2YWx1ZSdcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgZ2V0dGVyc1Byb3BzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGF0YTogdGhpcy5zZXJ2aWNlLmRvYy5jaGlsZHJlbi5nZXR0ZXJzLFxuICAgICAgICAgICAgY29sdW1uczogW3tcbiAgICAgICAgICAgICAgICBrZXk6ICduYW1lJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ25hbWUnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAncmV0dXJucycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdyZXR1cm5zJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3Rlc3RDYXNlcycsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICd0ZXN0IGNhc2VzJ1xuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc1Byb3BlcnRpZXModHlwZTogc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5zZXJ2aWNlLmRvYy5jaGlsZHJlblxuICAgICAgICByZXR1cm4gY2hpbGRyZW4gJiYgY2hpbGRyZW5bdHlwZV0gJiYgT2JqZWN0LmtleXMoY2hpbGRyZW5bdHlwZV0pLmxlbmd0aFxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvY3VtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9kb2N1bWVudGF0aW9uLXNlcnZpY2UnXG5pbXBvcnQgeyBUZXN0U2VydmljZSB9IGZyb20gJy4vdGVzdC1zZXJ2aWNlJ1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC10YWJsZS1yZW5kZXJlcicsXG4gICAgdGVtcGxhdGU6IGA8dGFibGUgKm5nSWY9XCJzaG93XCIgY2xhc3M9XCJkb2N1bWVudGF0aW9uLXRhYmxlXCI+XG4gICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGggKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBwcm9wZXJ0aWVzLmNvbHVtbnM7IGxldCBrZXkgPSBpbmRleFwiPnt7Y29sdW1uLmxhYmVsfX08L3RoPlxuICAgICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5PlxuICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBwcm9wZXJ0aWVzRGF0YUtleXM7IGxldCByb3dJbmRleCA9IGluZGV4XCI+XG4gICAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGNvbHVtbiBvZiBwcm9wZXJ0aWVzLmNvbHVtbnM7IGxldCBrZXkgPSBpbmRleFwiIFtuZ0NsYXNzXT1cImNvbHVtbi5sYWJlbFwiPlxuICAgICAgICAgICAgICAgIDwhLS0gPGRpdiB2LWlmPVwiY29sdW1uLmtleSA9PT0gJ3ZhbHVlJyAmJiBwcm9wZXJ0aWVzLmRhdGFbcm93XVwiPlxuICAgICAgICAgICAgICAgICAgICA8YXBwLXZhbHVlLWlucHV0IFttb2RlbF09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVwiPjwvYXBwLXZhbHVlLWlucHV0PlxuICAgICAgICAgICAgICAgIDwvZGl2PiAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwic2hvd1RleHQoY29sdW1uLmtleSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGFwcC1qc29uLXZpZXdlciAqbmdJZj1cInNob3dKc29uVmlld2VyKHByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldKVwiIFtqc29uXT1cInByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldXCI+PC9hcHAtanNvbi12aWV3ZXI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJpc1N0cmluZyhwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XSlcIiBbaW5uZXJIVE1MXT1cInByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cImhhc0FyZ3VtZW50cyhyb3csIGNvbHVtbi5rZXkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGFyZ3VtZW50IG9mIHByb3BlcnRpZXMuZGF0YVtyb3ddW2NvbHVtbi5rZXldXCIgY2xhc3M9XCJhcmd1bWVudC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmd1bWVudC1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGI+e3thcmd1bWVudC5uYW1lfX08L2I+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJhcmd1bWVudC5pc09wdGlvbmFsXCI+OiAob3B0aW9uYWwpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYXJndW1lbnQtYm9keVwiICpuZ0lmPVwiYXJndW1lbnQuZGVzY3JpcHRpb25cIj4gLSB7e2FyZ3VtZW50LmRlc2NyaXB0aW9ufX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcmd1bWVudC1ib2R5IHJlZC1mbGFnXCIgKm5nSWY9XCIhYXJndW1lbnQuZGVzY3JpcHRpb25cIj5taXNzaW5nIGRlc2NyaXB0aW9uPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJndW1lbnQtb2JqZWN0XCIgKm5nSWY9XCJhcmd1bWVudC50eXBlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFwcC1qc29uLXZpZXdlciAqbmdJZj1cInNob3dKc29uVmlld2VyKGFyZ3VtZW50LnR5cGUpXCIgW2pzb25dPVwiYXJndW1lbnQudHlwZVwiPjwvYXBwLWpzb24tdmlld2VyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJjb2x1bW4ua2V5ID09PSAndGVzdENhc2VzJ1wiIFtuZ0NsYXNzXT1cIntub1Rlc3Q6ICFoYXNUZXN0KHJvdywgY29sdW1uLmtleSl9XCI+XG4gICAgICAgICAgICAgICAgICAgIDxhcHAtanNvbi12aWV3ZXIgKm5nSWY9XCJzaG93SnNvblZpZXdlcihwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XSlcIiBbanNvbl09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiPjwvYXBwLWpzb24tdmlld2VyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuPC90YWJsZT5gLFxuICAgIHN0eWxlczogW2AuZG9jdW1lbnRhdGlvbi10YWJsZXt3aWR0aDoxMDAlO3RleHQtYWxpZ246bGVmdDtib3JkZXItY29sbGFwc2U6Y29sbGFwc2V9LmRvY3VtZW50YXRpb24tdGFibGUgdGQsLmRvY3VtZW50YXRpb24tdGFibGUgdGh7dmVydGljYWwtYWxpZ246dG9wO3BhZGRpbmc6MTRweDtmb250LXNpemU6MTJweH0uZG9jdW1lbnRhdGlvbi10YWJsZSB0aHtiYWNrZ3JvdW5kOiNhMThmNzQ7Y29sb3I6I2ZmZjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9LmRvY3VtZW50YXRpb24tdGFibGUgdGR7YmFja2dyb3VuZDpyZ2JhKDksNTQsODQsLjA1KX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCAucmVkLWZsYWd7Zm9udC1mYW1pbHk6bW9ub3NwYWNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkOm50aC1jaGlsZCgxKXtmb250LXdlaWdodDo3MDB9LmRvY3VtZW50YXRpb24tdGFibGUgdGQudHlwZXt0ZXh0LXRyYW5zZm9ybTpsb3dlcmNhc2V9LmRvY3VtZW50YXRpb24tdGFibGUgdGJvZHkgdHI6bnRoLWNoaWxkKGV2ZW4pPnRke2JhY2tncm91bmQ6cmdiYSg5LDU0LDg0LC4xKX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCB0ZCwuZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCB0aHtwYWRkaW5nOjdweH0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZCBwcmV7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoxOHB4O2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuNjEpO3BhZGRpbmc6N3B4O21hcmdpbjowfS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXJ7bWFyZ2luOjAgMCAxNHB4fS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXIgLmFyZ3VtZW50LW5hbWV7YmFja2dyb3VuZDpyZ2JhKDM1LDcwLDEwMCwuMTUpO3BhZGRpbmc6N3B4fS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXIgLmFyZ3VtZW50LW9iamVjdHtwYWRkaW5nOjVweCA3cHg7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC44NSl9LmRvY3VtZW50YXRpb24tdGFibGUgLmFyZ3VtZW50LWNvbnRhaW5lcjpsYXN0LWNoaWxke21hcmdpbjowfS5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3R7YmFja2dyb3VuZDojYTEwMDA1O2NvbG9yOiNmZmY7cGFkZGluZzozcHh9LmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdCAqLC5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdywuZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYSwuZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYTpob3Zlcntjb2xvcjojZmZmfWBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYmxlUmVuZGVyZXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHNlcnZpY2U6IGFueSA9IERvY3VtZW50YXRpb25TZXJ2aWNlXG4gICAgdGVzdFNlcnZpY2U6IGFueSA9IFRlc3RTZXJ2aWNlXG5cbiAgICBASW5wdXQoJ3Nob3cnKVxuICAgIHNob3c6IGJvb2xlYW5cblxuICAgIEBJbnB1dCgncHJvcGVydGllcycpXG4gICAgcHJvcGVydGllczogYW55XG5cbiAgICBnZXQgcHJvcGVydGllc0RhdGFLZXlzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5wcm9wZXJ0aWVzLmRhdGEpXG4gICAgfVxuXG4gICAgZ2V0TGluayhkb2NMaW5rTmFtZTogc3RyaW5nLCB0eXBlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3R5cGVOYW1lLnRvTG93ZXJDYXNlKCl9LiR7ZG9jTGlua05hbWV9YFxuICAgIH1cblxuICAgIGdldERvY0RhdGEoZG9jTGlua05hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5zZXJ2aWNlLkRvY3NEYXRhLCB0aGlzLmdldExpbmsoZG9jTGlua05hbWUsIHR5cGVOYW1lKSwge30pXG4gICAgfVxuXG4gICAgc2hvd0pzb25WaWV3ZXIodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdmFsICYmIHR5cGVvZiB2YWwgIT09IGBzdHJpbmdgXG4gICAgfVxuXG4gICAgc2hvd1RleHQoa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGtleSAhPT0gJ3ZhbHVlJyAmJiBrZXkgIT09ICdhcmd1bWVudHMnICYmIGtleSAhPT0gJ3Rlc3RDYXNlcydcbiAgICB9XG5cbiAgICBpc1N0cmluZyh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF2YWwgJiYgdHlwZW9mIHZhbCA9PT0gYHN0cmluZ2BcbiAgICB9XG5cbiAgICBoYXNUZXN0KHJvdywga2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnByb3BlcnRpZXMuZGF0YSwgYCR7cm93fS4ke2tleX1gKSAmJiB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnByb3BlcnRpZXMuZGF0YSwgYCR7cm93fS4ke2tleX1gLCBbXSkubGVuZ3RoXG4gICAgfVxuXG4gICAgaGFzQXJndW1lbnRzKHJvdywga2V5KSB7XG4gICAgICAgIGlmIChrZXkgIT09IGBhcmd1bWVudHNgKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHZhbCA9IHRoaXMuc2VydmljZS5nZXRUaGlzKHRoaXMucHJvcGVydGllcy5kYXRhLCBgJHtyb3d9LiR7a2V5fWApXG4gICAgICAgIGNvbnN0IGxlbmd0aCA9IChBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwgOiBbXSkubGVuZ3RoXG5cbiAgICAgICAgaWYgKCFsZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhc3MgPSB0cnVlXG5cbiAgICAgICAgdmFsLmZvckVhY2goZWxlbWVudCA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtZW50KVxuICAgICAgICAgICAgaWYgKCFlbGVtZW50Lmhhc093blByb3BlcnR5IHx8ICFlbGVtZW50Lmhhc093blByb3BlcnR5KGBuYW1lYCkpIHtcbiAgICAgICAgICAgICAgICBwYXNzID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBhc3NcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgSlNPTkZvcm1hdHRlciBmcm9tICdqc29uLWZvcm1hdHRlci1qcydcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtanNvbi12aWV3ZXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBbaW5uZXJIVE1MXT1cImh0bWxcIj48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuanNvbi1mb3JtYXR0ZXItcm93IC5qc29uLWZvcm1hdHRlci1yb3csLmpzb24tZm9ybWF0dGVyLXJvdyBhe3doaXRlLXNwYWNlOm5vd3JhcH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIEpzb25WaWV3ZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCdqc29uJylcbiAgICBqc29uOiBhbnlcblxuICAgIGdldCBodG1sKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBKU09ORm9ybWF0dGVyKHRoaXMuanNvbiwgMCwge1xuICAgICAgICAgICAgaG92ZXJQcmV2aWV3RW5hYmxlZDogZmFsc2UsXG4gICAgICAgICAgICBob3ZlclByZXZpZXdBcnJheUNvdW50OiAxMDAsXG4gICAgICAgICAgICBob3ZlclByZXZpZXdGaWVsZENvdW50OiA1LFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZm9ybWF0dGVyLnJlbmRlcigpLm91dGVySFRNTFxuICAgIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2FwcC12YWx1ZS1pbnB1dCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwidmFsdWUtaW5wdXRcIj5cbiAgICA8dGV4dGFyZWEgKm5nSWY9XCJzaG93VGV4dGFyZWEoKVwiIFsobmdNb2RlbCldPVwicHJveHlNb2RlbFwiIChpbnB1dCk9XCJ1cGRhdGVWYWxcIj48L3RleHRhcmVhPlxuICAgIDwhLS0gPGlucHV0IHR5cGU9XCJudW1iZXJcIiAqbmdJZj1cInR5cGUgPT09ICdudW1iZXInXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiICpuZ0lmPVwidHlwZSA9PT0gJ3N0cmluZydcIiBbKG5nTW9kZWwpXT1cInByb3h5TW9kZWxcIiAoaW5wdXQpPVwidXBkYXRlVmFsXCI+XG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiICpuZ0lmPVwidHlwZSA9PT0gJ2Jvb2xlYW4nXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPiAtLT5cbjwvZGl2PmAsXG4gICAgc3R5bGVzOiBbYGBdXG59KVxuXG5leHBvcnQgY2xhc3MgVmlld2VySW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCdtb2RlbCcpXG4gICAgbW9kZWw6IGFueVxuXG4gICAgcHJveHlNb2RlbCA9IGBgXG5cbiAgICB0eXBlOiBzdHJpbmcgPSBgc3RyaW5nYFxuXG4gICAgZ2V0UHJveHlNb2RlbCgpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYHN0cmluZ2A6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFsdWUgPyB0aGlzLm1vZGVsLnZhbHVlLnRvU3RyaW5nKCkgOiBgYFxuICAgICAgICAgICAgY2FzZSBgbnVtYmVyYDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZSA/IHBhcnNlRmxvYXQodGhpcy5tb2RlbC52YWx1ZSkgOiAwXG4gICAgICAgICAgICBjYXNlIGBib29sZWFuYDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbC52YWx1ZVxuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLm1vZGVsLnZhbHVlXG5cbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBKU09OLnN0cmluZ2lmeSh0aGlzLm1vZGVsLnZhbHVlKVxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7IH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgfHwgYHt9YFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlVmFsKCkge1xuICAgICAgICBsZXQgdmFsdWUgPSB0aGlzLnByb3h5TW9kZWxcblxuICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBgc3RyaW5nYDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgPyB2YWx1ZS50b1N0cmluZygpIDogYGBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBgbnVtYmVyYDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IDBcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSBgYm9vbGVhbmA6XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9ICEhdmFsdWVcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSlcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm1vZGVsLnZhbHVlID0gdmFsdWUgfHwge31cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnR5cGUsIHRoaXMubW9kZWwpO1xuXG4gICAgICAgIHRoaXMucHJveHlNb2RlbCA9IHRoaXMuZ2V0UHJveHlNb2RlbCgpXG4gICAgICAgIHRoaXMudHlwZSA9IHRoaXMubW9kZWwgPyB0aGlzLm1vZGVsLnR5cGUgfHwgdGhpcy5tb2RlbC5raW5kIHx8IGBzdHJpbmdgIDogYHN0cmluZ2BcbiAgICB9XG5cbiAgICBzaG93VGV4dGFyZWEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnR5cGUgIT09ICdzdHJpbmcnICYmIHRoaXMudHlwZSAhPT0gJ251bWJlcidcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IERvY2tzQ29tcG9uZW50IH0gZnJvbSAnLi9kb2Nrcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2lkZWJhckNvbXBvbmVudCB9IGZyb20gJy4vc2lkZWJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgUmVuZGVyZXJDb21wb25lbnQgfSBmcm9tICcuL3JlbmRlcmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJsZVJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi90YWJsZS1yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgSnNvblZpZXdlckNvbXBvbmVudCB9IGZyb20gJy4vanNvbi12aWV3ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFZpZXdlcklucHV0Q29tcG9uZW50IH0gZnJvbSAnLi92YWx1ZS1pbnB1dC5jb21wb25lbnQnXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBEb2Nrc0NvbXBvbmVudCxcbiAgICBTaWRlYmFyQ29tcG9uZW50LFxuICAgIFJlbmRlcmVyQ29tcG9uZW50LFxuICAgIFRhYmxlUmVuZGVyZXJDb21wb25lbnQsXG4gICAgSnNvblZpZXdlckNvbXBvbmVudCxcbiAgICBWaWV3ZXJJbnB1dENvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbRG9ja3NDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIERvY2tzTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQUE7SUFvSEk7bUJBbkhXLEVBQUU7eUJBQ0QscUJBQXFCO3dCQUNqQixFQUFFO3NCQUVUO1lBQ0wsS0FBSyxFQUFFLEtBQUs7WUFDWixPQUFPLEVBQUUsS0FBSztZQUNkLE9BQU8sRUFBRSxLQUFLO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsSUFBSSxFQUFFLEtBQUs7WUFDWCxXQUFXLEVBQUUsS0FBSztZQUNsQixVQUFVLEVBQUUsS0FBSztZQUNqQixLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxFQUFFO1lBQ1IsWUFBWSxFQUFFLEVBQUU7WUFDaEIsU0FBUyxFQUFFLEVBQUU7U0FDaEI7UUFvR0csT0FBTyxJQUFJLENBQUE7S0FDZDs7Ozs7SUFuR0Qsc0NBQU87Ozs7SUFBUCxVQUFRLFFBQWE7UUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7S0FDM0I7Ozs7SUFFRCxxQ0FBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQzFELE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtLQUNsQjs7Ozs7SUFFRCxzQ0FBTzs7OztJQUFQLFVBQVEsR0FBVztRQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQTtRQUMvQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7S0FDaEI7Ozs7O0lBRUQsd0NBQVM7Ozs7SUFBVCxVQUFVLEdBQVE7O1FBQ2QsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFBO1FBRWhCLEtBQUssSUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUss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