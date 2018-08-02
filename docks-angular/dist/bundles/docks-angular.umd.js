(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('json-formatter-js'), require('@angular/common'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('docks-angular', ['exports', '@angular/core', 'json-formatter-js', '@angular/common', '@angular/forms'], factory) :
    (factory((global['docks-angular'] = {}),global.ng.core,null,global.ng.common,global.ng.forms));
}(this, (function (exports,core,JSONFormatter,common,forms) { 'use strict';

    JSONFormatter = JSONFormatter && JSONFormatter.hasOwnProperty('default') ? JSONFormatter['default'] : JSONFormatter;

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var documentationService = (function () {
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
     * @suppress {checkTypes} checked by tsc
     */
    var testService = (function () {
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
     * @suppress {checkTypes} checked by tsc
     */
    var DocksComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'app-docks',
                        template: "<div id=\"documentation-overlay\">\n  <app-sidebar></app-sidebar>\n  <div class=\"doc-viewer\" [ngClass]=\"service.openedDoc\">\n    <div class=\"doc-container\">\n      <app-renderer></app-renderer>\n    </div>\n  </div>\n</div>",
                        styles: ["@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}#documentation-overlay{position:fixed;top:0;left:0;height:100%;width:100%;z-index:9999999;background:#fff;overflow:hidden;display:flex;font-family:sans-serif}#documentation-overlay .red-flag{color:#d10005}#documentation-overlay #docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}#documentation-overlay button.disabled{opacity:.5;pointer-events:none}#documentation-overlay button{font-size:12px;border:none;padding:7px;outline:0!important}#documentation-overlay .test-asserts{font-size:12px}#documentation-overlay .test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}#documentation-overlay .test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}#documentation-overlay button.spin-if-running{transition:opacity .5s;margin-right:7px}#documentation-overlay button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}#documentation-overlay .spin-if-running.running>span{transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}#documentation-overlay .spin-if-running>span{display:inline-block}#documentation-overlay button.spin-if-running>span{width:16px;height:16px}#documentation-overlay button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}#documentation-overlay button.spin-if-running.running>span span{left:1px}#documentation-overlay .doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}#documentation-overlay .doc-viewer li{list-style:none}#documentation-overlay .doc-viewer button{background:#f3aa00;color:#fff;cursor:pointer}#documentation-overlay .doc-viewer .doc-element p{margin:7px 0}#documentation-overlay .doc-viewer .doc-element p.description,#documentation-overlay .doc-viewer .doc-element p.subtitle{margin-bottom:21px}#documentation-overlay .doc-viewer .doc-element h2{margin:14px 0}#documentation-overlay .doc-viewer .doc-element section{margin:0 0 28px}#documentation-overlay .doc-viewer .doc-element input,#documentation-overlay .doc-viewer .doc-element select,#documentation-overlay .doc-viewer .doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}#documentation-overlay .doc-viewer .doc-element textarea{height:100px;resize:none}#documentation-overlay .doc-viewer a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}#documentation-overlay .doc-viewer .example-code pre{margin:0}#documentation-overlay .doc-viewer .h1{font-size:28px;font-weight:700;margin:21px 0}#documentation-overlay .doc-viewer .h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}#documentation-overlay .doc-viewer .h2:before{content:\"\";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}#documentation-overlay .doc-viewer .h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}#documentation-overlay .doc-viewer .h3{font-size:14px;margin:17px 0;font-weight:700}#documentation-overlay .doc-viewer .subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#documentation-overlay .doc-viewer #demo-overlay{width:90%;height:90%}#documentation-overlay .doc-viewer pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#documentation-overlay .doc-viewer #demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}#documentation-overlay .doc-viewer .flex-vcenter{display:flex;align-items:center}#documentation-overlay .doc-viewer .test-group-header .h3{margin:0}.noTest{background:#a10005;color:#fff;padding:3px}.noTest *,.noTest .json-formatter-row,.noTest .json-formatter-row a,.noTest .json-formatter-row a:hover{color:#fff}.red-flag{color:#a10005}"]
                    },] },
        ];
        DocksComponent.propDecorators = {
            docs: [{ type: core.Input, args: ['docs',] }],
            initial: [{ type: core.Input, args: ['initial',] }],
            tests: [{ type: core.Input, args: ['tests',] }],
            componentClasses: [{ type: core.Input, args: ['componentClasses',] }]
        };
        return DocksComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var SidebarComponent = (function () {
        function SidebarComponent() {
            this.service = DocumentationService;
            this.testService = TestService;
        }
        Object.defineProperty(SidebarComponent.prototype, "typeNames", {
            get: /**
             * @return {?}
             */ function () {
                return Object.keys(this.service.DocsData);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SidebarComponent.prototype, "linkNames", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: core.Component, args: [{
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
     * @suppress {checkTypes} checked by tsc
     */
    var RendererComponent = (function () {
        function RendererComponent() {
            this.service = DocumentationService;
            this.testService = TestService;
        }
        Object.defineProperty(RendererComponent.prototype, "properties", {
            get: /**
             * @return {?}
             */ function () {
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
             */ function () {
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
             */ function () {
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
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'app-renderer',
                        template: "<article class=\"doc-element\" *ngIf=\"service.states.view === 'components' && service.doc.name\">\n    <div class=\"h1 title\">{{ service.doc.name }}\n        <span class=\"subtitle\" *ngIf=\"service.doc.description\">{{ service.doc.description }}</span>\n    </div>\n    <section *ngIf=\"service.doc.body\">\n        <div [innerHTML]=\"service.doc.body\"></div>\n    </section>\n    <section *ngIf=\"service.doc.group === 'components'\">\n        <div class=\"h2\" (click)=\"service.states.demo = !service.states.demo\" [ngClass]=\"service.states.demo ? 'active' : ''\">Demo</div>\n        <div *ngIf=\"service.states.demo\">\n            <div>\n                <pre class=\"demo\"><code>{{service.getMarkup(service.doc)}}</code></pre>\n            </div>\n            <div>\n                <!-- <button (click)=\"launch(service.doc)\">Launch demo</button> -->\n            </div>\n            <div id=\"demo-overlay-container\" *ngIf=\"service.states.demoOverlay\">\n                <div id=\"demo-overlay-close\" (click)=\"service.states.demoOverlay = false\">x</div>\n                <div id=\"demo-overlay\"></div>\n            </div>\n        </div>\n    </section>\n\n    <section *ngIf=\"hasProperties('attributeProperties')\">\n        <div class=\"h2\" (click)=\"service.states.props = !service.states.props\" [ngClass]=\"service.states.props ? 'active' : ''\">Attribute properties</div>\n        <app-table-renderer [show]=\"service.states.props\" [properties]=\"attributeProps\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('properties')\">\n        <div class=\"h2\" (click)=\"service.states.dataProps = !service.states.dataProps\" [ngClass]=\"service.states.dataProps ? 'active' : ''\">Properties</div>\n        <app-table-renderer [show]=\"service.states.dataProps\" [properties]=\"properties\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('getters')\">\n        <div class=\"h2\" (click)=\"service.states.getters = !service.states.getters\" [ngClass]=\"service.states.getters ? 'active' : ''\">Getters</div>\n        <app-table-renderer [show]=\"service.states.getters\" [properties]=\"gettersProps\"></app-table-renderer>\n    </section>\n\n    <section *ngIf=\"hasProperties('methods')\">\n        <div class=\"h2\" (click)=\"service.states.methods = !service.states.methods\" [ngClass]=\"service.states.methods ? 'active' : ''\">Methods</div>\n        <app-table-renderer [show]=\"service.states.methods\" [properties]=\"methods\"></app-table-renderer>\n    </section>\n</article>",
                        styles: ["@-webkit-keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes rotating{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}@keyframes fading{0%,100%{opacity:.3}50%{opacity:.8}}.red-flag{color:#d10005}#docs-close-button{position:fixed;top:7px;right:7px;color:#fff;background:#f3aa00;padding:7px;text-transform:uppercase;border-radius:50%;font-weight:700;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:15px;line-height:15px;cursor:pointer}button.disabled{opacity:.5;pointer-events:none}button{font-size:12px;border:none;padding:7px;outline:0!important;background:#f3aa00;color:#fff;cursor:pointer}.test-asserts{font-size:12px}.test-asserts .test-assert{padding:7px 7px 7px 47px;background:rgba(35,71,100,.04)}.test-asserts .test-assert:nth-child(even){background:rgba(35,71,100,.09)}button.spin-if-running{transition:opacity .5s;margin-right:7px}button.spin-if-running.running{opacity:.5;pointer-events:none;-webkit-animation:2s linear infinite fading;animation:2s linear infinite fading}.spin-if-running.running>span{transition:-webkit-transform .2s;transition:transform .2s;transition:transform .2s,-webkit-transform .2s;-webkit-animation:2s linear infinite rotating;animation:2s linear infinite rotating}.spin-if-running>span{display:inline-block}button.spin-if-running>span{width:16px;height:16px}button.spin-if-running>span span{position:relative;left:1px;top:0;transition:left .2s}button.spin-if-running.running>span span{left:1px}.doc-viewer{height:100%;padding:14px;overflow:auto;width:100%;color:#234764}li{list-style:none}.doc-element p{margin:7px 0}.doc-element p.description,.doc-element p.subtitle{margin-bottom:21px}.doc-element h2{margin:14px 0}.doc-element section{margin:0 0 28px}.doc-element input,.doc-element select,.doc-element textarea{background:#fff;border:none;height:32px;width:100%;max-width:210px;border-radius:1px;outline:0!important;-webkit-appearance:none;-moz-appearance:none;appearance:none;padding:10px;color:#234664;box-shadow:0 1px 1px rgba(0,0,0,.22);box-sizing:border-box}.doc-element textarea{height:100px;resize:none}a .example-code{width:100%;overflow:auto;padding:7px;background:#a18f74;color:#fff;font-size:12px;margin-bottom:21px}.example-code pre{margin:0}.h1{font-size:28px;font-weight:700;margin:21px 0}.h2{font-size:18px;margin:14px 0 0;background:#234764;color:#fff;padding:10px;cursor:pointer}.h2:before{content:\"\";border:7px solid transparent;border-left-color:#fff;width:0;height:0;display:inline-block}.h2.active:before{border-left-color:transparent;border-top-color:#fff;position:relative;top:4px;left:-3px}.h3{font-size:14px;margin:17px 0;font-weight:700}.subtitle{font-size:14px;font-weight:100;vertical-align:baseline;margin-left:7px}#demo-overlay{width:90%;height:90%}pre.demo{font-size:12px;padding:7px;background:rgba(9,54,84,.1);overflow:auto}#demo-overlay-container{position:fixed;width:100%;height:100%;top:0;left:0;display:flex;justify-content:center;align-items:center;z-index:999999999;color:#fff;overflow:auto}#demo-overlay-close{position:fixed;top:14px;right:14px;font-size:14px;font-weight:700;background:rgba(255,255,255,.23);padding:7px;width:24px;height:24px;display:flex;justify-content:center;align-items:center;text-transform:uppercase;border-radius:50%;cursor:pointer}.flex-vcenter{display:flex;align-items:center}.test-group-header .h3{margin:0}"]
                    },] },
        ];
        /** @nocollapse */
        RendererComponent.ctorParameters = function () { return []; };
        return RendererComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var TableRendererComponent = (function () {
        function TableRendererComponent() {
            this.service = DocumentationService;
            this.testService = TestService;
        }
        Object.defineProperty(TableRendererComponent.prototype, "propertiesDataKeys", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'app-table-renderer',
                        template: "<table *ngIf=\"show\" class=\"documentation-table\">\n    <thead>\n        <tr>\n            <th *ngFor=\"let column of properties.columns; let key = index\">{{column.label}}</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let row of propertiesDataKeys; let rowIndex = index\">\n            <td *ngFor=\"let column of properties.columns; let key = index\" [ngClass]=\"column.label\">\n                <!-- <div v-if=\"column.key === 'value' && properties.data[row]\">\n                    <app-value-input [model]=\"properties.data[row]\"></app-value-input>\n                </div> -->\n                <div *ngIf=\"showText(column.key)\">\n                    <app-json-viewer *ngIf=\"showJsonViewer(properties.data[row][column.key])\" [json]=\"properties.data[row][column.key]\"></app-json-viewer>\n                    <div *ngIf=\"isString(properties.data[row][column.key])\" [innerHTML]=\"properties.data[row][column.key]\"></div>\n                </div>\n                <div *ngIf=\"hasArguments(row, column.key)\">\n                    <div *ngFor=\"let argument of properties.data[row][column.key]\" class=\"argument-container\">\n                        <div class=\"argument-name\">\n                            <b>{{argument.name}}</b>\n                            <span *ngIf=\"argument.isOptional\">: (optional)</span>\n                            <span class=\"argument-body\" *ngIf=\"argument.description\"> - {{argument.description}}</span>\n                        </div>\n                        <div class=\"argument-body red-flag\" *ngIf=\"!argument.description\">missing description</div>\n                        <div class=\"argument-object\" *ngIf=\"argument.type\">\n                            <app-json-viewer *ngIf=\"showJsonViewer(argument.type)\" [json]=\"argument.type\"></app-json-viewer>\n                        </div>\n                    </div>\n                </div>\n                <div *ngIf=\"column.key === 'testCases'\" [ngClass]=\"{noTest: !hasTest(row, column.key)}\">\n                    <app-json-viewer *ngIf=\"showJsonViewer(properties.data[row][column.key])\" [json]=\"properties.data[row][column.key]\"></app-json-viewer>\n                </div>\n            </td>\n        </tr>\n    </tbody>\n</table>",
                        styles: [".documentation-table{width:100%;text-align:left;border-collapse:collapse}.documentation-table td,.documentation-table th{vertical-align:top;padding:14px;font-size:12px}.documentation-table th{background:#a18f74;color:#fff;text-transform:uppercase}.documentation-table td{background:rgba(9,54,84,.05)}.documentation-table td .red-flag{font-family:monospace}.documentation-table td:nth-child(1){font-weight:700}.documentation-table td.type{text-transform:lowercase}.documentation-table tbody tr:nth-child(even)>td{background:rgba(9,54,84,.1)}.documentation-table td td,.documentation-table td th{padding:7px}.documentation-table td pre{font-family:sans-serif;font-size:12px;line-height:18px;background:rgba(255,255,255,.61);padding:7px;margin:0}.documentation-table .argument-container{margin:0 0 14px}.documentation-table .argument-container .argument-name{background:rgba(35,70,100,.15);padding:7px}.documentation-table .argument-container .argument-object{padding:5px 7px;background:rgba(255,255,255,.85)}.documentation-table .argument-container:last-child{margin:0}.documentation-table .noTest{background:#a10005;color:#fff;padding:3px}.documentation-table .noTest *,.documentation-table .noTest .json-formatter-row,.documentation-table .noTest .json-formatter-row a,.documentation-table .noTest .json-formatter-row a:hover{color:#fff}"]
                    },] },
        ];
        /** @nocollapse */
        TableRendererComponent.ctorParameters = function () { return []; };
        TableRendererComponent.propDecorators = {
            show: [{ type: core.Input, args: ['show',] }],
            properties: [{ type: core.Input, args: ['properties',] }]
        };
        return TableRendererComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var JsonViewerComponent = (function () {
        function JsonViewerComponent() {
        }
        Object.defineProperty(JsonViewerComponent.prototype, "html", {
            get: /**
             * @return {?}
             */ function () {
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
            { type: core.Component, args: [{
                        selector: 'app-json-viewer',
                        template: "<div [innerHTML]=\"html\"></div>",
                        styles: [".json-formatter-row .json-formatter-row,.json-formatter-row a{white-space:nowrap}"]
                    },] },
        ];
        JsonViewerComponent.propDecorators = {
            json: [{ type: core.Input, args: ['json',] }]
        };
        return JsonViewerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var ViewerInputComponent = (function () {
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
            { type: core.Component, args: [{
                        selector: 'app-value-input',
                        template: "<div class=\"value-input\">\n    <textarea *ngIf=\"showTextarea()\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\"></textarea>\n    <!-- <input type=\"number\" *ngIf=\"type === 'number'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\">\n    <input type=\"text\" *ngIf=\"type === 'string'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\">\n    <input type=\"checkbox\" *ngIf=\"type === 'boolean'\" [(ngModel)]=\"proxyModel\" (input)=\"updateVal\"> -->\n</div>",
                        styles: [""]
                    },] },
        ];
        ViewerInputComponent.propDecorators = {
            model: [{ type: core.Input, args: ['model',] }]
        };
        return ViewerInputComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */
    var DocksModule = (function () {
        function DocksModule() {
        }
        DocksModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule
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
     * @suppress {checkTypes} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes} checked by tsc
     */

    exports.DocksModule = DocksModule;
    exports.ɵa = DocksComponent;
    exports.ɵe = JsonViewerComponent;
    exports.ɵc = RendererComponent;
    exports.ɵb = SidebarComponent;
    exports.ɵd = TableRendererComponent;
    exports.ɵf = ViewerInputComponent;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9ja3MtYW5ndWxhci51bWQuanMubWFwIiwic291cmNlcyI6WyJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvZG9jdW1lbnRhdGlvbi1zZXJ2aWNlLnRzIiwibmc6Ly9kb2Nrcy1hbmd1bGFyL3NyYy9tb2R1bGVzL2RvY2tzL3Rlc3Qtc2VydmljZS50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9kb2Nrcy5jb21wb25lbnQudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3Mvc2lkZWJhci5jb21wb25lbnQudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvcmVuZGVyZXIuY29tcG9uZW50LnRzIiwibmc6Ly9kb2Nrcy1hbmd1bGFyL3NyYy9tb2R1bGVzL2RvY2tzL3RhYmxlLXJlbmRlcmVyLmNvbXBvbmVudC50cyIsIm5nOi8vZG9ja3MtYW5ndWxhci9zcmMvbW9kdWxlcy9kb2Nrcy9qc29uLXZpZXdlci5jb21wb25lbnQudHMiLCJuZzovL2RvY2tzLWFuZ3VsYXIvc3JjL21vZHVsZXMvZG9ja3MvdmFsdWUtaW5wdXQuY29tcG9uZW50LnRzIiwibmc6Ly9kb2Nrcy1hbmd1bGFyL3NyYy9tb2R1bGVzL2RvY2tzL2RvY2tzLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgZG9jdW1lbnRhdGlvblNlcnZpY2Uge1xuICAgIGRvYzogYW55ID0ge31cbiAgICBvcGVuZWREb2MgPSAnZG9jLWFjdGl2ZS1kcm9wZG93bidcbiAgICBEb2NzRGF0YTogYW55ID0ge31cblxuICAgIHN0YXRlcyA9IHtcbiAgICAgICAgcHJvcHM6IGZhbHNlLFxuICAgICAgICBtZXRob2RzOiBmYWxzZSxcbiAgICAgICAgZ2V0dGVyczogZmFsc2UsXG4gICAgICAgIGRhdGFQcm9wczogZmFsc2UsXG4gICAgICAgIGRlbW86IGZhbHNlLFxuICAgICAgICBkZW1vT3ZlcmxheTogZmFsc2UsXG4gICAgICAgIGNvbXBvbmVudHM6IGZhbHNlLFxuICAgICAgICB0ZXN0czogZmFsc2UsXG4gICAgICAgIHZpZXc6ICcnLFxuICAgICAgICBzaWRlYmFyU3RhdGU6IGBgLFxuICAgICAgICBhcmdUb1Nob3c6IGBgXG4gICAgfVxuXG4gICAgc2V0RG9jcyhEb2NzRGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuRG9jc0RhdGEgPSBEb2NzRGF0YVxuICAgIH1cblxuICAgIHNldERvYygpIHtcbiAgICAgICAgdGhpcy5kb2MgPSB0aGlzLmdldFRoaXModGhpcy5Eb2NzRGF0YSwgdGhpcy5vcGVuZWREb2MsIHt9KVxuICAgICAgICByZXR1cm4gdGhpcy5kb2NcbiAgICB9XG5cbiAgICBvcGVuRG9jKGRvYzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMub3BlbmVkRG9jID0gZG9jXG4gICAgICAgIHRoaXMuc3RhdGVzLnZpZXcgPSBgY29tcG9uZW50c2BcbiAgICAgICAgdGhpcy5zZXREb2MoKVxuICAgIH1cblxuICAgIGdldE1hcmt1cChkb2M6IGFueSkge1xuICAgICAgICBjb25zdCBwcm9wcyA9IFtdXG5cbiAgICAgICAgZm9yIChjb25zdCBwIGluIGRvYy5wcm9wcykge1xuICAgICAgICAgICAgaWYgKGRvYy5wcm9wc1twXSkge1xuICAgICAgICAgICAgICAgIHByb3BzLnB1c2goYDoke3B9PVwiZG9jLnByb3BzLiR7cH0udmFsdWVcImApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYDwke2RvYy5uYW1lfSR7cHJvcHMubGVuZ3RoID8gYFxcbiAgYCA6IGBgfSR7cHJvcHMuam9pbignXFxuICAnKX0ke3Byb3BzLmxlbmd0aCA/IGBcXG5gIDogYGB9PjwvJHtkb2MubmFtZX0+YFxuICAgIH1cblxuICAgIGpzb24ob2JqOiBhbnkpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGBgXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbnVsbCwgJyAgICAnKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cblxuICAgIGRvY05hbWUoZG9jOiBhbnkpIHtcblxuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZG9jLm5hbWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZWwgVGhlIHN0YXJ0aW5nIG9iamVjdFxuICAgICAqIEBwYXJhbSBwYXRoIFN0cmluZyB0byBmb2xsb3dcbiAgICAgKiBAcGFyYW0gZW1wdHlWYWwgV2hhdCBpcyByZXR1cm5lZCBpZiB1bmRlZmluZWRcbiAgICAgKiBAZGVzYyBOYXZpZ2F0ZXMgYW4gb2JqZWN0IG9yIGFycmF5IHRvIGZpbmQgYSB2YWx1ZVxuICAgICAqL1xuICAgIGdldFRoaXMoZWw6IGFueSwgcGF0aDogQXJyYXk8YW55PiB8IHN0cmluZywgZW1wdHlWYWw/OiBhbnkpIHtcbiAgICAgICAgaWYgKHBhdGggJiYgcGF0aC50b1N0cmluZygpLnNwbGl0KSB7XG4gICAgICAgICAgICBwYXRoID0gW2VsXS5jb25jYXQocGF0aC50b1N0cmluZygpLnNwbGl0KGAuYCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoID0gW2VsXVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcGF0aC5yZWR1Y2UoZnVuY3Rpb24gKGFjY3VtdWxhdG9yLCBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChhY2N1bXVsYXRvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVtcHR5VmFsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUuaW5kZXhPZihgLmApID09PSAtMSAmJiBjdXJyZW50VmFsdWUuaW5kZXhPZihgKGApID4gLTEpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJnc1N0cmluZyA9ICcnXG5cbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzT2JqID0gL1xcKCguKj8pXFwpL2cuZXhlYyhjdXJyZW50VmFsdWUpXG5cbiAgICAgICAgICAgICAgICBpZiAoYXJnc09iaikge1xuICAgICAgICAgICAgICAgICAgICBhcmdzU3RyaW5nID0gYXJnc09ialsxXSB8fCBgYFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBhcmdzU3RyaW5nLnNwbGl0KGAsYCkubWFwKChhcmcpID0+IGFyZy50cmltKCkpXG4gICAgICAgICAgICAgICAgY29uc3QgZnVuY3Rpb25OYW1lID0gY3VycmVudFZhbHVlLnNwbGl0KGAoYClbMF1cblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYWNjdW11bGF0b3JbZnVuY3Rpb25OYW1lXSA9PT0gYGZ1bmN0aW9uYCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBfcmVzdWx0ID0gYWNjdW11bGF0b3JbZnVuY3Rpb25OYW1lXS5hcHBseShhY2N1bXVsYXRvciwgYXJncylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9yZXN1bHRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JbY3VycmVudFZhbHVlXVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjdW11bGF0b3JcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG4gICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIGVtcHR5VmFsXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxufVxuXG5leHBvcnQgbGV0IERvY3VtZW50YXRpb25TZXJ2aWNlID0gbmV3IGRvY3VtZW50YXRpb25TZXJ2aWNlKClcbiIsImltcG9ydCB7IERvY3VtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9kb2N1bWVudGF0aW9uLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyB0ZXN0U2VydmljZSB7XG4gICAgZG9jOiBhbnkgPSB7fVxuICAgIG9wZW5lZERvYyA9ICdkb2MtYWN0aXZlLWRyb3Bkb3duJ1xuICAgIHRlc3RSZXN1bHRzOiBhbnkgPSB7XG4gICAgICAgIHRlc3RzQXJlUnVubmluZzogZmFsc2UsXG4gICAgICAgIHRlc3RzOiB7fVxuICAgIH1cblxuICAgIHRlc3RzOiBhbnkgPSB7fVxuICAgIGZsYXRUZXN0czogYW55ID0ge31cbiAgICB0ZXN0VHlwZXM6IGFueSA9IHtcbiAgICAgICAgY2xhc3M6IFtdLFxuICAgICAgICBjb21wb25lbnRzOiBbXSxcbiAgICAgICAgbW9kdWxlczogW10sXG4gICAgICAgICdvYmplY3QgbGl0ZXJhbHMnOiBbXSxcbiAgICAgICAgaW50ZXJmYWNlczogW10sXG4gICAgICAgIHZhcmlhYmxlOiBbXVxuICAgIH1cbiAgICBzaG93blRlc3RzU3RhdGUgPSBgYFxuXG4gICAgc2V0VGVzdHModGVzdHM6IGFueSkge1xuICAgICAgICB0aGlzLnRlc3RzID0gdGVzdHNcbiAgICAgICAgdGhpcy50ZXN0VHlwZXMuY2xhc3MgPSBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdHMsIGBjbGFzc2AsIFtdKVxuXG4gICAgICAgIGNvbnN0IHR5cGVzVG9UZXN0ID0gW1xuICAgICAgICAgICAgYG1ldGhvZHNgLFxuICAgICAgICAgICAgYHByb3BlcnRpZXNgLFxuICAgICAgICAgICAgYGF0dHJpYnV0ZVByb3BlcnRpZXNgLFxuICAgICAgICAgICAgYGdldHRlcnNgXG4gICAgICAgIF1cblxuICAgICAgICBmb3IgKGNvbnN0IHR5cGUgaW4gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGEpIHtcbiAgICAgICAgICAgIGlmIChEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YVt0eXBlXSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkb2NOYW1lIGluIERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YVt0eXBlXVtkb2NOYW1lXSAmJiBkb2NOYW1lICE9PSBgRG9jdW1lbnRhdGlvblNlcnZpY2VgICYmIGRvY05hbWUgIT09IGBUZXN0U2VydmljZWApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZVRlc3QgPSBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFR5cGVzLCBgJHt0eXBlfS4ke2RvY05hbWV9YCwgeyB0ZXN0czogW10gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VUZXN0VGVzdHM6IGFueSA9IHt9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlVGVzdC50ZXN0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2VUZXN0LnRlc3RzLmZvckVhY2goKHRlc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ycyA9IHRlc3QuZm9yXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JzID0gdGVzdC5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ycyAmJiBBcnJheS5pc0FycmF5KGZvcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JzLmZvckVhY2goX2ZvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXJ2aWNlVGVzdFRlc3RzW19mb3JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2VUZXN0VGVzdHNbX2Zvcl0gPSBbdGVzdF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tfZm9yXS5wdXNoKHRlc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tmb3JzXSA9IFt0ZXN0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tmb3JzXS5wdXNoKHRlc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV1bZG9jTmFtZV0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdW2RvY05hbWVdLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZE5hbWUgaW4gY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2NoaWxkTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIWNoaWxkcmVuW2NoaWxkTmFtZV0gJiYgdHlwZXNUb1Rlc3QuaW5kZXhPZihjaGlsZE5hbWUpID4gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hpbGRyZW5bY2hpbGROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5bY2hpbGROYW1lXVtwcm9wTmFtZV0gJiYgdHlwZW9mIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdID09PSBgb2JqZWN0YCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVzdENhc2VzID0gc2VydmljZVRlc3RUZXN0c1twcm9wTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbk1hcCA9ICEhdGVzdENhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltjaGlsZE5hbWVdW3Byb3BOYW1lXS50ZXN0cyA9IHNlcnZpY2VUZXN0VGVzdHNbcHJvcE5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltjaGlsZE5hbWVdW3Byb3BOYW1lXS50ZXN0Q2FzZXMgPSBjYW5NYXAgPyB0ZXN0Q2FzZXMubWFwKCh0ZXN0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXJ0cyA9IHRlc3QubmFtZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3QuYXNzZXJ0cyAmJiB0ZXN0LmFzc2VydHMubWFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydHMgPSB0ZXN0LmFzc2VydHMubWFwKChhc3NlcnQ6IGFueSkgPT4gYXNzZXJ0Lm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGVzdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVGVzdFJhbihkb2M6IHN0cmluZywgdGVzdE5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFJlc3VsdHMudGVzdHMsIGAke2RvY30ucmVzdWx0cy4ke3Rlc3ROYW1lfWApXG4gICAgfVxuXG4gICAgaGFzVGVzdFBhc3NlZChkb2M6IHN0cmluZywgdGVzdE5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJlc3VsdHMuJHt0ZXN0TmFtZX0ucGFzc2ApXG4gICAgfVxuXG4gICAgZ2V0VGVzdEFzc2VydFJlc3VsdChkb2M6IHN0cmluZywgdGVzdE5hbWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9LnJlc3VsdHMuJHtpbmRleH1gKVxuICAgIH1cblxuICAgIGhhc1Rlc3RBc3NlcnRzKGRvYzogc3RyaW5nLCB0ZXN0SW5kZXg6IG51bWJlcikge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhc3NlcnRzOiBBcnJheTxhbnk+ID0gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RzLCBgJHtkb2N9LnRlc3RzLiR7dGVzdEluZGV4fS5hc3NlcnRzYClcbiAgICAgICAgY29uc3QgYXNzZXJ0S2V5czogQXJyYXk8c3RyaW5nPiA9IFtdXG5cbiAgICAgICAgaWYgKGFzc2VydHMpIHtcbiAgICAgICAgICAgIGFzc2VydHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydEtleXMucHVzaChlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0S2V5cy5wdXNoKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NlcnRLZXlzXG4gICAgfVxuXG4gICAgaXNUZXN0UnVubmluZyhkb2M6IHN0cmluZywgdGVzdE5hbWU/OiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0ZXN0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5ydW5uaW5nYClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFJlc3VsdHMudGVzdHMsIGAke2RvY30ucmVzdWx0cy4ke3Rlc3ROYW1lfS5ydW5uaW5nYClcbiAgICB9XG5cbiAgICBnZXRUZXN0cyhkb2M6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRlc3RzW2RvY10gfHwgdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgcnVuQXNzZXJ0cyh0ZXN0OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRlc3QucmVzdWx0cyA9IFtdXG5cbiAgICAgICAgICAgIGNvbnN0IHJ1bkFzc2VydCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0ZXN0LmFzc2VydHNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRlc3QucmVzdWx0cylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQga2V5OiBhbnkgPSB0ZXN0LmFzc2VydHNbaW5kZXhdXG4gICAgICAgICAgICAgICAgbGV0IGZuOiBGdW5jdGlvbiA9ICgpID0+IHsgfVxuICAgICAgICAgICAgICAgIGxldCBwcmU6IEZ1bmN0aW9uIHwgbnVsbCA9IG51bGxcbiAgICAgICAgICAgICAgICBsZXQgdmFsOiBhbnlcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBgc3RyaW5nYCkge1xuICAgICAgICAgICAgICAgICAgICBmbiA9IHRlc3QubWV0aG9kc1trZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGVzdC5hc3NlcnRzW2luZGV4XSA9PT0gYG9iamVjdGApIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gdGVzdC5hc3NlcnRzW2luZGV4XS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIGZuID0gdGVzdC5hc3NlcnRzW2luZGV4XS5mblxuICAgICAgICAgICAgICAgICAgICBwcmUgPSB0ZXN0LmFzc2VydHNbaW5kZXhdLnByZSB8fCBwcmVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzZXRSZXN1bHQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6IHRydWUsIG1lc3NhZ2U6IHJlcywga2V5IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkFzc2VydChpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdC5yZXN1bHRzLnB1c2goeyBwYXNzOiBmYWxzZSwgbWVzc2FnZTogcmVzLCBrZXkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdC5yZXN1bHRzLnB1c2goeyBwYXNzOiAhIXZhbCwgbWVzc2FnZTogdmFsLCBrZXkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkFzc2VydChpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXByZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBmbigpXG4gICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdCgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bkFzc2VydCgwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJ1blRlc3QodGVzdDogYW55LCBncm91cEtleTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0FyZVJ1bm5pbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIGlmICghdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV0gPSB7fVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bZ3JvdXBLZXldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBydW5uaW5nOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5ydW5uaW5nID0gdHJ1ZVxuXG4gICAgICAgICAgICBjb25zdCBzZXRSZXN1bHRzID0gKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0ucnVubmluZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0ucmVzdWx0c1t0ZXN0Lm5hbWVdID0gcmVzXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0FyZVJ1bm5pbmcgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5wYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlcylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHJlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmluaXNoQXNzZXJ0ID0gKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhc3NlZCA9IHRydWVcblxuICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50LnBhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgc2V0UmVzdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHBhc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYGAsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbm93LFxuICAgICAgICAgICAgICAgICAgICBydW5uaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0ucmVzdWx0c1t0ZXN0Lm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIHBhc3M6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgYCxcbiAgICAgICAgICAgICAgICB0aW1lOiAwLFxuICAgICAgICAgICAgICAgIHJ1bm5pbmc6IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRlc3QuYXNzZXJ0cyAmJiB0ZXN0LmFzc2VydHMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJ1bkFzc2VydHModGVzdCkudGhlbihmaW5pc2hBc3NlcnQsIGZpbmlzaEFzc2VydClcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0LmZuICYmIHR5cGVvZiB0ZXN0LmZuID09PSBgZnVuY3Rpb25gKSB7XG4gICAgICAgICAgICAgICAgdGVzdC5mbigpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG5vdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sIChyZWo6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlalxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHJ1blRlc3RHcm91cChncm91cDogYW55LCB0eXBlOiBzdHJpbmcpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIHBhc3M6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICByZXN1bHRzOiB7fVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzZXRSZXN1bHRzID0gKHJlczogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FudFVwZGF0ZVBhc3MgPSB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdLnBhc3MgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGFzcyA9IGNhbnRVcGRhdGVQYXNzID8gdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1tncm91cC5uYW1lXS5wYXNzIDogcmVzLnBhc3NcblxuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucGFzcyA9IG5ld1Bhc3NcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdLnJlc3VsdHNbZ3JvdXAudGVzdHNbaW5kZXhdLm5hbWVdID0gcmVzXG5cbiAgICAgICAgICAgICAgICBydW4oaW5kZXggKyAxKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBydW4gPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChncm91cC50ZXN0c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5UZXN0KGdyb3VwLnRlc3RzW2luZGV4XSwgZ3JvdXAubmFtZSwgdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdHMocmVzLCBpbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyhyZXMsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy50ZXN0UmVzdWx0cy50ZXN0c1tncm91cC5uYW1lXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bigwKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2MgUnVucyBhbGwgdGVzdHNcbiAgICAgKiBAcGFyYW0gdGVzdCAtIHRlc3RpbmcgcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKi9cbiAgICBydW5UZXN0cyh0ZXN0PzogeyBpZDogc3RyaW5nIH0pIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBydW4gPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBPYmplY3Qua2V5cyh0aGlzLnRlc3RzKVtpbmRleF1cbiAgICAgICAgICAgICAgICBjb25zdCB0aGlzVGVzdEdyb3VwID0gdGhpcy50ZXN0c1t0eXBlXVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNUZXN0R3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnVuR3JvdXAgPSAoZ3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGlzVGVzdCA9IHRoaXNUZXN0R3JvdXBbT2JqZWN0LmtleXModGhpc1Rlc3RHcm91cClbZ3JvdXBJbmRleF1dXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzVGVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuVGVzdEdyb3VwKHRoaXNUZXN0LCB0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bdGhpc1Rlc3QubmFtZV0gPSByZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkdyb3VwKGdyb3VwSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAocmVqOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bdGhpc1Rlc3QubmFtZV0gPSByZWpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkdyb3VwKGdyb3VwSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW4oaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoMClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMudGVzdFJlc3VsdHMudGVzdHMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBydW4oMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRGb3JtYXRlZFRpbWUodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRpbWVzdGFtcCA8IDEwMDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lc3RhbXAgKyBgbXNgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZXN0YW1wIDwgMTAwMCAqIDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRpbWVzdGFtcCAvIDEwMDApICsgYHNgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZXN0YW1wIDwgMTAwMCAqIDYwICogNjApIHtcbiAgICAgICAgICAgIHJldHVybiAodGltZXN0YW1wIC8gMTAwMCAqIDYwKSArIGBtYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGBgXG4gICAgfVxufVxuXG5leHBvcnQgbGV0IFRlc3RTZXJ2aWNlID0gbmV3IHRlc3RTZXJ2aWNlKClcbiIsImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcbmltcG9ydCB7IFRlc3RTZXJ2aWNlIH0gZnJvbSAnLi90ZXN0LXNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWRvY2tzJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgaWQ9XCJkb2N1bWVudGF0aW9uLW92ZXJsYXlcIj5cbiAgPGFwcC1zaWRlYmFyPjwvYXBwLXNpZGViYXI+XG4gIDxkaXYgY2xhc3M9XCJkb2Mtdmlld2VyXCIgW25nQ2xhc3NdPVwic2VydmljZS5vcGVuZWREb2NcIj5cbiAgICA8ZGl2IGNsYXNzPVwiZG9jLWNvbnRhaW5lclwiPlxuICAgICAgPGFwcC1yZW5kZXJlcj48L2FwcC1yZW5kZXJlcj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2BALXdlYmtpdC1rZXlmcmFtZXMgcm90YXRpbmd7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUBrZXlmcmFtZXMgcm90YXRpbmd7MCV7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDApO3RyYW5zZm9ybTpyb3RhdGUoMCl9MTAwJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZyl9fUAtd2Via2l0LWtleWZyYW1lcyBmYWRpbmd7MCUsMTAwJXtvcGFjaXR5Oi4zfTUwJXtvcGFjaXR5Oi44fX1Aa2V5ZnJhbWVzIGZhZGluZ3swJSwxMDAle29wYWNpdHk6LjN9NTAle29wYWNpdHk6Ljh9fSNkb2N1bWVudGF0aW9uLW92ZXJsYXl7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7ei1pbmRleDo5OTk5OTk5O2JhY2tncm91bmQ6I2ZmZjtvdmVyZmxvdzpoaWRkZW47ZGlzcGxheTpmbGV4O2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWZ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAucmVkLWZsYWd7Y29sb3I6I2QxMDAwNX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5ICNkb2NzLWNsb3NlLWJ1dHRvbntwb3NpdGlvbjpmaXhlZDt0b3A6N3B4O3JpZ2h0OjdweDtjb2xvcjojZmZmO2JhY2tncm91bmQ6I2YzYWEwMDtwYWRkaW5nOjdweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ym9yZGVyLXJhZGl1czo1MCU7Zm9udC13ZWlnaHQ6NzAwO3dpZHRoOjMycHg7aGVpZ2h0OjMycHg7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZvbnQtc2l6ZToxNXB4O2xpbmUtaGVpZ2h0OjE1cHg7Y3Vyc29yOnBvaW50ZXJ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uZGlzYWJsZWR7b3BhY2l0eTouNTtwb2ludGVyLWV2ZW50czpub25lfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9ue2ZvbnQtc2l6ZToxMnB4O2JvcmRlcjpub25lO3BhZGRpbmc6N3B4O291dGxpbmU6MCFpbXBvcnRhbnR9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAudGVzdC1hc3NlcnRze2ZvbnQtc2l6ZToxMnB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnRlc3QtYXNzZXJ0cyAudGVzdC1hc3NlcnR7cGFkZGluZzo3cHggN3B4IDdweCA0N3B4O2JhY2tncm91bmQ6cmdiYSgzNSw3MSwxMDAsLjA0KX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC50ZXN0LWFzc2VydHMgLnRlc3QtYXNzZXJ0Om50aC1jaGlsZChldmVuKXtiYWNrZ3JvdW5kOnJnYmEoMzUsNzEsMTAwLC4wOSl9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5ne3RyYW5zaXRpb246b3BhY2l0eSAuNXM7bWFyZ2luLXJpZ2h0OjdweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IGJ1dHRvbi5zcGluLWlmLXJ1bm5pbmcucnVubmluZ3tvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZ30jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5zcGluLWlmLXJ1bm5pbmcucnVubmluZz5zcGFue3RyYW5zaXRpb246LXdlYmtpdC10cmFuc2Zvcm0gLjJzO3RyYW5zaXRpb246dHJhbnNmb3JtIC4yczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnMsLXdlYmtpdC10cmFuc2Zvcm0gLjJzOy13ZWJraXQtYW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSByb3RhdGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIHJvdGF0aW5nfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLnNwaW4taWYtcnVubmluZz5zcGFue2Rpc3BsYXk6aW5saW5lLWJsb2NrfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9uLnNwaW4taWYtcnVubmluZz5zcGFue3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSBidXR0b24uc3Bpbi1pZi1ydW5uaW5nPnNwYW4gc3Bhbntwb3NpdGlvbjpyZWxhdGl2ZTtsZWZ0OjFweDt0b3A6MDt0cmFuc2l0aW9uOmxlZnQgLjJzfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgYnV0dG9uLnNwaW4taWYtcnVubmluZy5ydW5uaW5nPnNwYW4gc3BhbntsZWZ0OjFweH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2Vye2hlaWdodDoxMDAlO3BhZGRpbmc6MTRweDtvdmVyZmxvdzphdXRvO3dpZHRoOjEwMCU7Y29sb3I6IzIzNDc2NH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIGxpe2xpc3Qtc3R5bGU6bm9uZX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIGJ1dHRvbntiYWNrZ3JvdW5kOiNmM2FhMDA7Y29sb3I6I2ZmZjtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBwe21hcmdpbjo3cHggMH0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5kb2MtZWxlbWVudCBwLmRlc2NyaXB0aW9uLCNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHAuc3VidGl0bGV7bWFyZ2luLWJvdHRvbToyMXB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IGgye21hcmdpbjoxNHB4IDB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgc2VjdGlvbnttYXJnaW46MCAwIDI4cHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgaW5wdXQsI2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZG9jLWVsZW1lbnQgc2VsZWN0LCNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHRleHRhcmVhe2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6bm9uZTtoZWlnaHQ6MzJweDt3aWR0aDoxMDAlO21heC13aWR0aDoyMTBweDtib3JkZXItcmFkaXVzOjFweDtvdXRsaW5lOjAhaW1wb3J0YW50Oy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtwYWRkaW5nOjEwcHg7Y29sb3I6IzIzNDY2NDtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4yMik7Ym94LXNpemluZzpib3JkZXItYm94fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmRvYy1lbGVtZW50IHRleHRhcmVhe2hlaWdodDoxMDBweDtyZXNpemU6bm9uZX0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIGEgLmV4YW1wbGUtY29kZXt3aWR0aDoxMDAlO292ZXJmbG93OmF1dG87cGFkZGluZzo3cHg7YmFja2dyb3VuZDojYTE4Zjc0O2NvbG9yOiNmZmY7Zm9udC1zaXplOjEycHg7bWFyZ2luLWJvdHRvbToyMXB4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmV4YW1wbGUtY29kZSBwcmV7bWFyZ2luOjB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDF7Zm9udC1zaXplOjI4cHg7Zm9udC13ZWlnaHQ6NzAwO21hcmdpbjoyMXB4IDB9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuaDJ7Zm9udC1zaXplOjE4cHg7bWFyZ2luOjE0cHggMCAwO2JhY2tncm91bmQ6IzIzNDc2NDtjb2xvcjojZmZmO3BhZGRpbmc6MTBweDtjdXJzb3I6cG9pbnRlcn0jZG9jdW1lbnRhdGlvbi1vdmVybGF5IC5kb2Mtdmlld2VyIC5oMjpiZWZvcmV7Y29udGVudDpcIlwiO2JvcmRlcjo3cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQtY29sb3I6I2ZmZjt3aWR0aDowO2hlaWdodDowO2Rpc3BsYXk6aW5saW5lLWJsb2NrfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmgyLmFjdGl2ZTpiZWZvcmV7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcC1jb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDo0cHg7bGVmdDotM3B4fSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLmgze2ZvbnQtc2l6ZToxNHB4O21hcmdpbjoxN3B4IDA7Zm9udC13ZWlnaHQ6NzAwfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgLnN1YnRpdGxle2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjEwMDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTttYXJnaW4tbGVmdDo3cHh9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAjZGVtby1vdmVybGF5e3dpZHRoOjkwJTtoZWlnaHQ6OTAlfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgcHJlLmRlbW97Zm9udC1zaXplOjEycHg7cGFkZGluZzo3cHg7YmFja2dyb3VuZDpyZ2JhKDksNTQsODQsLjEpO292ZXJmbG93OmF1dG99I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAjZGVtby1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ei1pbmRleDo5OTk5OTk5OTk7Y29sb3I6I2ZmZjtvdmVyZmxvdzphdXRvfSNkb2N1bWVudGF0aW9uLW92ZXJsYXkgLmRvYy12aWV3ZXIgI2RlbW8tb3ZlcmxheS1jbG9zZXtwb3NpdGlvbjpmaXhlZDt0b3A6MTRweDtyaWdodDoxNHB4O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjcwMDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjIzKTtwYWRkaW5nOjdweDt3aWR0aDoyNHB4O2hlaWdodDoyNHB4O2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Ym9yZGVyLXJhZGl1czo1MCU7Y3Vyc29yOnBvaW50ZXJ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAuZmxleC12Y2VudGVye2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXJ9I2RvY3VtZW50YXRpb24tb3ZlcmxheSAuZG9jLXZpZXdlciAudGVzdC1ncm91cC1oZWFkZXIgLmgze21hcmdpbjowfS5ub1Rlc3R7YmFja2dyb3VuZDojYTEwMDA1O2NvbG9yOiNmZmY7cGFkZGluZzozcHh9Lm5vVGVzdCAqLC5ub1Rlc3QgLmpzb24tZm9ybWF0dGVyLXJvdywubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYSwubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3cgYTpob3Zlcntjb2xvcjojZmZmfS5yZWQtZmxhZ3tjb2xvcjojYTEwMDA1fWBdXG59KVxuZXhwb3J0IGNsYXNzIERvY2tzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIHNlcnZpY2U6IGFueSA9IERvY3VtZW50YXRpb25TZXJ2aWNlXG4gICAgdGVzdFNlcnZpY2U6IGFueSA9IFRlc3RTZXJ2aWNlXG5cbiAgICBASW5wdXQoJ2RvY3MnKVxuICAgIGRvY3M6IGFueVxuXG4gICAgQElucHV0KCdpbml0aWFsJylcbiAgICBpbml0aWFsOiBzdHJpbmdcblxuICAgIEBJbnB1dCgndGVzdHMnKVxuICAgIHRlc3RzOiBhbnlcblxuICAgIEBJbnB1dCgnY29tcG9uZW50Q2xhc3NlcycpXG4gICAgY29tcG9uZW50Q2xhc3NlczogYW55XG5cbiAgICBsYXVuY2goZG9jOiBhbnkpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNldERvY3ModGhpcy5kb2NzKVxuICAgICAgICB0aGlzLnRlc3RTZXJ2aWNlLnNldFRlc3RzKHRoaXMudGVzdHMpXG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbCAmJiB0aGlzLmluaXRpYWwgIT09IGBgKSB7XG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uub3BlbkRvYyh0aGlzLmluaXRpYWwpXG4gICAgICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9IHRoaXMuaW5pdGlhbC5zcGxpdChgLmApWzBdXG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcbmltcG9ydCB7IFRlc3RTZXJ2aWNlIH0gZnJvbSAnLi90ZXN0LXNlcnZpY2UnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLXNpZGViYXInLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImRvYy1zaWRlYmFyXCI+XG4gICAgPGRpdiAqbmdGb3I9XCJsZXQgdHlwZU5hbWUgb2YgdHlwZU5hbWVzOyBsZXQgdHlwZUluZGV4ID0gaW5kZXhcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItaGVhZGluZyBncm91cFwiIFtuZ0NsYXNzXT1cInthY3RpdmU6IHNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9PT0gdHlwZU5hbWV9XCIgKGNsaWNrKT1cInNldFNpZGViYXJTdGF0ZSh0eXBlTmFtZSlcIj57e3R5cGVOYW1lfX08L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7c2hvd246IHNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9PT0gdHlwZU5hbWV9XCIgY2xhc3M9XCJsaW5rLWdyb3VwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZG9jLXNpZGViYXItbGlua1wiICpuZ0Zvcj1cImxldCBkb2NMaW5rTmFtZSBvZiBsaW5rTmFtZXNbdHlwZUluZGV4XVwiIChjbGljayk9XCJzZXJ2aWNlLm9wZW5Eb2MoZ2V0TGluayhkb2NMaW5rTmFtZSwgdHlwZU5hbWUpKVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiaXNEb2N1bWVudGVkKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSlcIiBjbGFzcz1cInJlZC1mbGFnXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPnt7Z2V0RG9jTGluayhkb2NMaW5rTmFtZSwgdHlwZU5hbWUpLm5hbWV9fTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2ICpuZ0lmPVwidGVzdFNlcnZpY2UudGVzdHNcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXItaGVhZGluZ1wiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy52aWV3ID0gJ3Rlc3RzJ1wiPlRlc3RzPC9kaXY+XG4gICAgPC9kaXY+XG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2AuZG9jLXNpZGViYXJ7aGVpZ2h0OjEwMCU7YmFja2dyb3VuZDojMjI0NzY0O2NvbG9yOiNmMGY0Zjg7d2hpdGUtc3BhY2U6bm93cmFwO292ZXJmbG93OmF1dG99LmRvYy1zaWRlYmFyIC5zaWRlYmFyLWhlYWRpbmd7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NzAwO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMjEpO3BhZGRpbmc6MTBweDtib3gtc2hhZG93OjAgLTFweCAwIHJnYmEoMCwwLDAsLjEzKTtjdXJzb3I6cG9pbnRlcjt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9LmRvYy1zaWRlYmFyIC5zaWRlYmFyLWhlYWRpbmcuZ3JvdXA6OmJlZm9yZXtjb250ZW50OlwiXCI7Ym9yZGVyOjVweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItbGVmdC1jb2xvcjojZmZmO3dpZHRoOjA7aGVpZ2h0OjA7ZGlzcGxheTppbmxpbmUtYmxvY2t9LmRvYy1zaWRlYmFyIC5zaWRlYmFyLWhlYWRpbmcuZ3JvdXAuYWN0aXZlOjpiZWZvcmV7Ym9yZGVyLWxlZnQtY29sb3I6dHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcC1jb2xvcjojZmZmO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDozcHg7bGVmdDotMnB4fS5kb2Mtc2lkZWJhciAubGluay1ncm91cHtoZWlnaHQ6MDtvcGFjaXR5OjA7cG9pbnRlci1ldmVudHM6bm9uZTtvdmVyZmxvdzpoaWRkZW59LmRvYy1zaWRlYmFyIC5saW5rLWdyb3VwLnNob3due2hlaWdodDphdXRvO29wYWNpdHk6MTtwb2ludGVyLWV2ZW50czphbGw7b3ZlcmZsb3c6YXV0b30uZG9jLXNpZGViYXIgLmRvYy1zaWRlYmFyLWxpbmt7cGFkZGluZzoxMHB4O2JveC1zaGFkb3c6MCAtMXB4IDAgcmdiYSg3NiwxMTIsMTQxLC4zNCksMCAtMnB4IDAgcmdiYSg0LDM0LDU3LC4yNSk7Y3Vyc29yOnBvaW50ZXI7Zm9udC1zaXplOjEycHh9LmRvYy1zaWRlYmFyIC5kb2Mtc2lkZWJhci1saW5rIC5yZWQtZmxhZ3tib3JkZXI6M3B4IHNvbGlkICNhMTAwMDU7Ym9yZGVyLXJhZGl1czo1MCU7ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246bWlkZGxlfWBdXG59KVxuZXhwb3J0IGNsYXNzIFNpZGViYXJDb21wb25lbnQge1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIHNlcnZpY2U6IGFueSA9IERvY3VtZW50YXRpb25TZXJ2aWNlXG4gICAgdGVzdFNlcnZpY2U6IGFueSA9IFRlc3RTZXJ2aWNlXG5cbiAgICBnZXQgdHlwZU5hbWVzKCk6IHN0cmluZ1tdIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuc2VydmljZS5Eb2NzRGF0YSlcbiAgICB9XG5cbiAgICBnZXQgbGlua05hbWVzKCk6IEFycmF5PHN0cmluZ1tdPiB7XG4gICAgICAgIGNvbnN0IG1hcCA9IHRoaXMudHlwZU5hbWVzLm1hcCh0eXBlTmFtZSA9PiBPYmplY3Qua2V5cyh0aGlzLnNlcnZpY2UuRG9jc0RhdGFbdHlwZU5hbWVdKSlcbiAgICAgICAgcmV0dXJuIG1hcFxuICAgIH1cblxuICAgIGdldExpbmsoZG9jTGlua05hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0eXBlTmFtZS50b0xvd2VyQ2FzZSgpfS4ke2RvY0xpbmtOYW1lfWBcbiAgICB9XG5cbiAgICBpc0RvY3VtZW50ZWQoZG9jTGlua05hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBkb2NMaW5rID0gdGhpcy5nZXREb2NMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSlcbiAgICAgICAgcmV0dXJuIGRvY0xpbmsuaGFzT3duUHJvcGVydHkoJ2lzRG9jdW1lbnRlZCcpICYmICFkb2NMaW5rLmlzRG9jdW1lbnRlZFxuICAgIH1cblxuICAgIGdldERvY0xpbmsoZG9jTGlua05hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5zZXJ2aWNlLkRvY3NEYXRhLCB0aGlzLmdldExpbmsoZG9jTGlua05hbWUsIHR5cGVOYW1lKSwge30pXG4gICAgfVxuXG4gICAgc2V0U2lkZWJhclN0YXRlKHN0YXRlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuc2VydmljZS5zdGF0ZXMuc2lkZWJhclN0YXRlID09PSBzdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLnN0YXRlcy5zaWRlYmFyU3RhdGUgPSBgYFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlcnZpY2Uuc3RhdGVzLnNpZGViYXJTdGF0ZSA9IHN0YXRlXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlOiBgPGFydGljbGUgY2xhc3M9XCJkb2MtZWxlbWVudFwiICpuZ0lmPVwic2VydmljZS5zdGF0ZXMudmlldyA9PT0gJ2NvbXBvbmVudHMnICYmIHNlcnZpY2UuZG9jLm5hbWVcIj5cbiAgICA8ZGl2IGNsYXNzPVwiaDEgdGl0bGVcIj57eyBzZXJ2aWNlLmRvYy5uYW1lIH19XG4gICAgICAgIDxzcGFuIGNsYXNzPVwic3VidGl0bGVcIiAqbmdJZj1cInNlcnZpY2UuZG9jLmRlc2NyaXB0aW9uXCI+e3sgc2VydmljZS5kb2MuZGVzY3JpcHRpb24gfX08L3NwYW4+XG4gICAgPC9kaXY+XG4gICAgPHNlY3Rpb24gKm5nSWY9XCJzZXJ2aWNlLmRvYy5ib2R5XCI+XG4gICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJzZXJ2aWNlLmRvYy5ib2R5XCI+PC9kaXY+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxzZWN0aW9uICpuZ0lmPVwic2VydmljZS5kb2MuZ3JvdXAgPT09ICdjb21wb25lbnRzJ1wiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMuZGVtbyA9ICFzZXJ2aWNlLnN0YXRlcy5kZW1vXCIgW25nQ2xhc3NdPVwic2VydmljZS5zdGF0ZXMuZGVtbyA/ICdhY3RpdmUnIDogJydcIj5EZW1vPC9kaXY+XG4gICAgICAgIDxkaXYgKm5nSWY9XCJzZXJ2aWNlLnN0YXRlcy5kZW1vXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxwcmUgY2xhc3M9XCJkZW1vXCI+PGNvZGU+e3tzZXJ2aWNlLmdldE1hcmt1cChzZXJ2aWNlLmRvYyl9fTwvY29kZT48L3ByZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8IS0tIDxidXR0b24gKGNsaWNrKT1cImxhdW5jaChzZXJ2aWNlLmRvYylcIj5MYXVuY2ggZGVtbzwvYnV0dG9uPiAtLT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBpZD1cImRlbW8tb3ZlcmxheS1jb250YWluZXJcIiAqbmdJZj1cInNlcnZpY2Uuc3RhdGVzLmRlbW9PdmVybGF5XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBpZD1cImRlbW8tb3ZlcmxheS1jbG9zZVwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5kZW1vT3ZlcmxheSA9IGZhbHNlXCI+eDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJkZW1vLW92ZXJsYXlcIj48L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICA8L3NlY3Rpb24+XG5cbiAgICA8c2VjdGlvbiAqbmdJZj1cImhhc1Byb3BlcnRpZXMoJ2F0dHJpYnV0ZVByb3BlcnRpZXMnKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMucHJvcHMgPSAhc2VydmljZS5zdGF0ZXMucHJvcHNcIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5wcm9wcyA/ICdhY3RpdmUnIDogJydcIj5BdHRyaWJ1dGUgcHJvcGVydGllczwvZGl2PlxuICAgICAgICA8YXBwLXRhYmxlLXJlbmRlcmVyIFtzaG93XT1cInNlcnZpY2Uuc3RhdGVzLnByb3BzXCIgW3Byb3BlcnRpZXNdPVwiYXR0cmlidXRlUHJvcHNcIj48L2FwcC10YWJsZS1yZW5kZXJlcj5cbiAgICA8L3NlY3Rpb24+XG5cbiAgICA8c2VjdGlvbiAqbmdJZj1cImhhc1Byb3BlcnRpZXMoJ3Byb3BlcnRpZXMnKVwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaDJcIiAoY2xpY2spPVwic2VydmljZS5zdGF0ZXMuZGF0YVByb3BzID0gIXNlcnZpY2Uuc3RhdGVzLmRhdGFQcm9wc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLmRhdGFQcm9wcyA/ICdhY3RpdmUnIDogJydcIj5Qcm9wZXJ0aWVzPC9kaXY+XG4gICAgICAgIDxhcHAtdGFibGUtcmVuZGVyZXIgW3Nob3ddPVwic2VydmljZS5zdGF0ZXMuZGF0YVByb3BzXCIgW3Byb3BlcnRpZXNdPVwicHJvcGVydGllc1wiPjwvYXBwLXRhYmxlLXJlbmRlcmVyPlxuICAgIDwvc2VjdGlvbj5cblxuICAgIDxzZWN0aW9uICpuZ0lmPVwiaGFzUHJvcGVydGllcygnZ2V0dGVycycpXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJoMlwiIChjbGljayk9XCJzZXJ2aWNlLnN0YXRlcy5nZXR0ZXJzID0gIXNlcnZpY2Uuc3RhdGVzLmdldHRlcnNcIiBbbmdDbGFzc109XCJzZXJ2aWNlLnN0YXRlcy5nZXR0ZXJzID8gJ2FjdGl2ZScgOiAnJ1wiPkdldHRlcnM8L2Rpdj5cbiAgICAgICAgPGFwcC10YWJsZS1yZW5kZXJlciBbc2hvd109XCJzZXJ2aWNlLnN0YXRlcy5nZXR0ZXJzXCIgW3Byb3BlcnRpZXNdPVwiZ2V0dGVyc1Byb3BzXCI+PC9hcHAtdGFibGUtcmVuZGVyZXI+XG4gICAgPC9zZWN0aW9uPlxuXG4gICAgPHNlY3Rpb24gKm5nSWY9XCJoYXNQcm9wZXJ0aWVzKCdtZXRob2RzJylcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImgyXCIgKGNsaWNrKT1cInNlcnZpY2Uuc3RhdGVzLm1ldGhvZHMgPSAhc2VydmljZS5zdGF0ZXMubWV0aG9kc1wiIFtuZ0NsYXNzXT1cInNlcnZpY2Uuc3RhdGVzLm1ldGhvZHMgPyAnYWN0aXZlJyA6ICcnXCI+TWV0aG9kczwvZGl2PlxuICAgICAgICA8YXBwLXRhYmxlLXJlbmRlcmVyIFtzaG93XT1cInNlcnZpY2Uuc3RhdGVzLm1ldGhvZHNcIiBbcHJvcGVydGllc109XCJtZXRob2RzXCI+PC9hcHAtdGFibGUtcmVuZGVyZXI+XG4gICAgPC9zZWN0aW9uPlxuPC9hcnRpY2xlPmAsXG4gICAgc3R5bGVzOiBbYEAtd2Via2l0LWtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QGtleWZyYW1lcyByb3RhdGluZ3swJXstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMCk7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAley13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSgzNjBkZWcpO3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19QC13ZWJraXQta2V5ZnJhbWVzIGZhZGluZ3swJSwxMDAle29wYWNpdHk6LjN9NTAle29wYWNpdHk6Ljh9fUBrZXlmcmFtZXMgZmFkaW5nezAlLDEwMCV7b3BhY2l0eTouM301MCV7b3BhY2l0eTouOH19LnJlZC1mbGFne2NvbG9yOiNkMTAwMDV9I2RvY3MtY2xvc2UtYnV0dG9ue3Bvc2l0aW9uOmZpeGVkO3RvcDo3cHg7cmlnaHQ6N3B4O2NvbG9yOiNmZmY7YmFja2dyb3VuZDojZjNhYTAwO3BhZGRpbmc6N3B4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtib3JkZXItcmFkaXVzOjUwJTtmb250LXdlaWdodDo3MDA7d2lkdGg6MzJweDtoZWlnaHQ6MzJweDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7Zm9udC1zaXplOjE1cHg7bGluZS1oZWlnaHQ6MTVweDtjdXJzb3I6cG9pbnRlcn1idXR0b24uZGlzYWJsZWR7b3BhY2l0eTouNTtwb2ludGVyLWV2ZW50czpub25lfWJ1dHRvbntmb250LXNpemU6MTJweDtib3JkZXI6bm9uZTtwYWRkaW5nOjdweDtvdXRsaW5lOjAhaW1wb3J0YW50O2JhY2tncm91bmQ6I2YzYWEwMDtjb2xvcjojZmZmO2N1cnNvcjpwb2ludGVyfS50ZXN0LWFzc2VydHN7Zm9udC1zaXplOjEycHh9LnRlc3QtYXNzZXJ0cyAudGVzdC1hc3NlcnR7cGFkZGluZzo3cHggN3B4IDdweCA0N3B4O2JhY2tncm91bmQ6cmdiYSgzNSw3MSwxMDAsLjA0KX0udGVzdC1hc3NlcnRzIC50ZXN0LWFzc2VydDpudGgtY2hpbGQoZXZlbil7YmFja2dyb3VuZDpyZ2JhKDM1LDcxLDEwMCwuMDkpfWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmd7dHJhbnNpdGlvbjpvcGFjaXR5IC41czttYXJnaW4tcmlnaHQ6N3B4fWJ1dHRvbi5zcGluLWlmLXJ1bm5pbmcucnVubmluZ3tvcGFjaXR5Oi41O3BvaW50ZXItZXZlbnRzOm5vbmU7LXdlYmtpdC1hbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZzthbmltYXRpb246MnMgbGluZWFyIGluZmluaXRlIGZhZGluZ30uc3Bpbi1pZi1ydW5uaW5nLnJ1bm5pbmc+c3Bhbnt0cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4yczt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuMnM7dHJhbnNpdGlvbjp0cmFuc2Zvcm0gLjJzLC13ZWJraXQtdHJhbnNmb3JtIC4yczstd2Via2l0LWFuaW1hdGlvbjoycyBsaW5lYXIgaW5maW5pdGUgcm90YXRpbmc7YW5pbWF0aW9uOjJzIGxpbmVhciBpbmZpbml0ZSByb3RhdGluZ30uc3Bpbi1pZi1ydW5uaW5nPnNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2t9YnV0dG9uLnNwaW4taWYtcnVubmluZz5zcGFue3dpZHRoOjE2cHg7aGVpZ2h0OjE2cHh9YnV0dG9uLnNwaW4taWYtcnVubmluZz5zcGFuIHNwYW57cG9zaXRpb246cmVsYXRpdmU7bGVmdDoxcHg7dG9wOjA7dHJhbnNpdGlvbjpsZWZ0IC4yc31idXR0b24uc3Bpbi1pZi1ydW5uaW5nLnJ1bm5pbmc+c3BhbiBzcGFue2xlZnQ6MXB4fS5kb2Mtdmlld2Vye2hlaWdodDoxMDAlO3BhZGRpbmc6MTRweDtvdmVyZmxvdzphdXRvO3dpZHRoOjEwMCU7Y29sb3I6IzIzNDc2NH1saXtsaXN0LXN0eWxlOm5vbmV9LmRvYy1lbGVtZW50IHB7bWFyZ2luOjdweCAwfS5kb2MtZWxlbWVudCBwLmRlc2NyaXB0aW9uLC5kb2MtZWxlbWVudCBwLnN1YnRpdGxle21hcmdpbi1ib3R0b206MjFweH0uZG9jLWVsZW1lbnQgaDJ7bWFyZ2luOjE0cHggMH0uZG9jLWVsZW1lbnQgc2VjdGlvbnttYXJnaW46MCAwIDI4cHh9LmRvYy1lbGVtZW50IGlucHV0LC5kb2MtZWxlbWVudCBzZWxlY3QsLmRvYy1lbGVtZW50IHRleHRhcmVhe2JhY2tncm91bmQ6I2ZmZjtib3JkZXI6bm9uZTtoZWlnaHQ6MzJweDt3aWR0aDoxMDAlO21heC13aWR0aDoyMTBweDtib3JkZXItcmFkaXVzOjFweDtvdXRsaW5lOjAhaW1wb3J0YW50Oy13ZWJraXQtYXBwZWFyYW5jZTpub25lOy1tb3otYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtwYWRkaW5nOjEwcHg7Y29sb3I6IzIzNDY2NDtib3gtc2hhZG93OjAgMXB4IDFweCByZ2JhKDAsMCwwLC4yMik7Ym94LXNpemluZzpib3JkZXItYm94fS5kb2MtZWxlbWVudCB0ZXh0YXJlYXtoZWlnaHQ6MTAwcHg7cmVzaXplOm5vbmV9YSAuZXhhbXBsZS1jb2Rle3dpZHRoOjEwMCU7b3ZlcmZsb3c6YXV0bztwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOiNhMThmNzQ7Y29sb3I6I2ZmZjtmb250LXNpemU6MTJweDttYXJnaW4tYm90dG9tOjIxcHh9LmV4YW1wbGUtY29kZSBwcmV7bWFyZ2luOjB9Lmgxe2ZvbnQtc2l6ZToyOHB4O2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW46MjFweCAwfS5oMntmb250LXNpemU6MThweDttYXJnaW46MTRweCAwIDA7YmFja2dyb3VuZDojMjM0NzY0O2NvbG9yOiNmZmY7cGFkZGluZzoxMHB4O2N1cnNvcjpwb2ludGVyfS5oMjpiZWZvcmV7Y29udGVudDpcIlwiO2JvcmRlcjo3cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQtY29sb3I6I2ZmZjt3aWR0aDowO2hlaWdodDowO2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5oMi5hY3RpdmU6YmVmb3Jle2JvcmRlci1sZWZ0LWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlci10b3AtY29sb3I6I2ZmZjtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6NHB4O2xlZnQ6LTNweH0uaDN7Zm9udC1zaXplOjE0cHg7bWFyZ2luOjE3cHggMDtmb250LXdlaWdodDo3MDB9LnN1YnRpdGxle2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjEwMDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTttYXJnaW4tbGVmdDo3cHh9I2RlbW8tb3ZlcmxheXt3aWR0aDo5MCU7aGVpZ2h0OjkwJX1wcmUuZGVtb3tmb250LXNpemU6MTJweDtwYWRkaW5nOjdweDtiYWNrZ3JvdW5kOnJnYmEoOSw1NCw4NCwuMSk7b3ZlcmZsb3c6YXV0b30jZGVtby1vdmVybGF5LWNvbnRhaW5lcntwb3NpdGlvbjpmaXhlZDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RvcDowO2xlZnQ6MDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7ei1pbmRleDo5OTk5OTk5OTk7Y29sb3I6I2ZmZjtvdmVyZmxvdzphdXRvfSNkZW1vLW92ZXJsYXktY2xvc2V7cG9zaXRpb246Zml4ZWQ7dG9wOjE0cHg7cmlnaHQ6MTRweDtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo3MDA7YmFja2dyb3VuZDpyZ2JhKDI1NSwyNTUsMjU1LC4yMyk7cGFkZGluZzo3cHg7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2JvcmRlci1yYWRpdXM6NTAlO2N1cnNvcjpwb2ludGVyfS5mbGV4LXZjZW50ZXJ7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcn0udGVzdC1ncm91cC1oZWFkZXIgLmgze21hcmdpbjowfWBdXG59KVxuZXhwb3J0IGNsYXNzIFJlbmRlcmVyQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBzZXJ2aWNlOiBhbnkgPSBEb2N1bWVudGF0aW9uU2VydmljZVxuICAgIHRlc3RTZXJ2aWNlOiBhbnkgPSBUZXN0U2VydmljZVxuXG4gICAgZ2V0IHByb3BlcnRpZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuLnByb3BlcnRpZXMsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGtleTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnbmFtZSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndGVzdENhc2VzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3Rlc3QgY2FzZXMnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IG1ldGhvZHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuLm1ldGhvZHMsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGtleTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnbmFtZSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdhcmd1bWVudHMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnYXJndW1lbnRzJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGxhYmVsOiAncmV0dXJucycsXG4gICAgICAgICAgICAgICAga2V5OiAncmV0dXJucydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgYXR0cmlidXRlUHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkYXRhOiB0aGlzLnNlcnZpY2UuZG9jLmNoaWxkcmVuLmF0dHJpYnV0ZVByb3BlcnRpZXMsXG4gICAgICAgICAgICBjb2x1bW5zOiBbe1xuICAgICAgICAgICAgICAgIGtleTogJ25hbWUnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnbmFtZSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0eXBlJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3R5cGUnLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAnZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAndGVzdENhc2VzJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ3Rlc3QgY2FzZXMnXG4gICAgICAgICAgICAgICAgLy8gfSwge1xuICAgICAgICAgICAgICAgIC8vICAgICBrZXk6ICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgLy8gICAgIGxhYmVsOiAndmFsdWUnXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGdldHRlcnNQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRhdGE6IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW4uZ2V0dGVycyxcbiAgICAgICAgICAgIGNvbHVtbnM6IFt7XG4gICAgICAgICAgICAgICAga2V5OiAnbmFtZScsXG4gICAgICAgICAgICAgICAgbGFiZWw6ICduYW1lJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGtleTogJ3JldHVybnMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAncmV0dXJucydcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICd0ZXN0Q2FzZXMnLFxuICAgICAgICAgICAgICAgIGxhYmVsOiAndGVzdCBjYXNlcydcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNQcm9wZXJ0aWVzKHR5cGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IHRoaXMuc2VydmljZS5kb2MuY2hpbGRyZW5cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuICYmIGNoaWxkcmVuW3R5cGVdICYmIE9iamVjdC5rZXlzKGNoaWxkcmVuW3R5cGVdKS5sZW5ndGhcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2N1bWVudGF0aW9uU2VydmljZSB9IGZyb20gJy4vZG9jdW1lbnRhdGlvbi1zZXJ2aWNlJ1xuaW1wb3J0IHsgVGVzdFNlcnZpY2UgfSBmcm9tICcuL3Rlc3Qtc2VydmljZSdcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdGFibGUtcmVuZGVyZXInLFxuICAgIHRlbXBsYXRlOiBgPHRhYmxlICpuZ0lmPVwic2hvd1wiIGNsYXNzPVwiZG9jdW1lbnRhdGlvbi10YWJsZVwiPlxuICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgcHJvcGVydGllcy5jb2x1bW5zOyBsZXQga2V5ID0gaW5kZXhcIj57e2NvbHVtbi5sYWJlbH19PC90aD5cbiAgICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2YgcHJvcGVydGllc0RhdGFLZXlzOyBsZXQgcm93SW5kZXggPSBpbmRleFwiPlxuICAgICAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgcHJvcGVydGllcy5jb2x1bW5zOyBsZXQga2V5ID0gaW5kZXhcIiBbbmdDbGFzc109XCJjb2x1bW4ubGFiZWxcIj5cbiAgICAgICAgICAgICAgICA8IS0tIDxkaXYgdi1pZj1cImNvbHVtbi5rZXkgPT09ICd2YWx1ZScgJiYgcHJvcGVydGllcy5kYXRhW3Jvd11cIj5cbiAgICAgICAgICAgICAgICAgICAgPGFwcC12YWx1ZS1pbnB1dCBbbW9kZWxdPVwicHJvcGVydGllcy5kYXRhW3Jvd11cIj48L2FwcC12YWx1ZS1pbnB1dD5cbiAgICAgICAgICAgICAgICA8L2Rpdj4gLS0+XG4gICAgICAgICAgICAgICAgPGRpdiAqbmdJZj1cInNob3dUZXh0KGNvbHVtbi5rZXkpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxhcHAtanNvbi12aWV3ZXIgKm5nSWY9XCJzaG93SnNvblZpZXdlcihwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XSlcIiBbanNvbl09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiPjwvYXBwLWpzb24tdmlld2VyPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiaXNTdHJpbmcocHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV0pXCIgW2lubmVySFRNTF09XCJwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJoYXNBcmd1bWVudHMocm93LCBjb2x1bW4ua2V5KVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBhcmd1bWVudCBvZiBwcm9wZXJ0aWVzLmRhdGFbcm93XVtjb2x1bW4ua2V5XVwiIGNsYXNzPVwiYXJndW1lbnQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJndW1lbnQtbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxiPnt7YXJndW1lbnQubmFtZX19PC9iPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiYXJndW1lbnQuaXNPcHRpb25hbFwiPjogKG9wdGlvbmFsKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFyZ3VtZW50LWJvZHlcIiAqbmdJZj1cImFyZ3VtZW50LmRlc2NyaXB0aW9uXCI+IC0ge3thcmd1bWVudC5kZXNjcmlwdGlvbn19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYXJndW1lbnQtYm9keSByZWQtZmxhZ1wiICpuZ0lmPVwiIWFyZ3VtZW50LmRlc2NyaXB0aW9uXCI+bWlzc2luZyBkZXNjcmlwdGlvbjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFyZ3VtZW50LW9iamVjdFwiICpuZ0lmPVwiYXJndW1lbnQudHlwZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhcHAtanNvbi12aWV3ZXIgKm5nSWY9XCJzaG93SnNvblZpZXdlcihhcmd1bWVudC50eXBlKVwiIFtqc29uXT1cImFyZ3VtZW50LnR5cGVcIj48L2FwcC1qc29uLXZpZXdlcj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ0lmPVwiY29sdW1uLmtleSA9PT0gJ3Rlc3RDYXNlcydcIiBbbmdDbGFzc109XCJ7bm9UZXN0OiAhaGFzVGVzdChyb3csIGNvbHVtbi5rZXkpfVwiPlxuICAgICAgICAgICAgICAgICAgICA8YXBwLWpzb24tdmlld2VyICpuZ0lmPVwic2hvd0pzb25WaWV3ZXIocHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV0pXCIgW2pzb25dPVwicHJvcGVydGllcy5kYXRhW3Jvd11bY29sdW1uLmtleV1cIj48L2FwcC1qc29uLXZpZXdlcj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbjwvdGFibGU+YCxcbiAgICBzdHlsZXM6IFtgLmRvY3VtZW50YXRpb24tdGFibGV7d2lkdGg6MTAwJTt0ZXh0LWFsaWduOmxlZnQ7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkLC5kb2N1bWVudGF0aW9uLXRhYmxlIHRoe3ZlcnRpY2FsLWFsaWduOnRvcDtwYWRkaW5nOjE0cHg7Zm9udC1zaXplOjEycHh9LmRvY3VtZW50YXRpb24tdGFibGUgdGh7YmFja2dyb3VuZDojYTE4Zjc0O2NvbG9yOiNmZmY7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRke2JhY2tncm91bmQ6cmdiYSg5LDU0LDg0LC4wNSl9LmRvY3VtZW50YXRpb24tdGFibGUgdGQgLnJlZC1mbGFne2ZvbnQtZmFtaWx5Om1vbm9zcGFjZX0uZG9jdW1lbnRhdGlvbi10YWJsZSB0ZDpudGgtY2hpbGQoMSl7Zm9udC13ZWlnaHQ6NzAwfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRkLnR5cGV7dGV4dC10cmFuc2Zvcm06bG93ZXJjYXNlfS5kb2N1bWVudGF0aW9uLXRhYmxlIHRib2R5IHRyOm50aC1jaGlsZChldmVuKT50ZHtiYWNrZ3JvdW5kOnJnYmEoOSw1NCw4NCwuMSl9LmRvY3VtZW50YXRpb24tdGFibGUgdGQgdGQsLmRvY3VtZW50YXRpb24tdGFibGUgdGQgdGh7cGFkZGluZzo3cHh9LmRvY3VtZW50YXRpb24tdGFibGUgdGQgcHJle2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MThweDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjYxKTtwYWRkaW5nOjdweDttYXJnaW46MH0uZG9jdW1lbnRhdGlvbi10YWJsZSAuYXJndW1lbnQtY29udGFpbmVye21hcmdpbjowIDAgMTRweH0uZG9jdW1lbnRhdGlvbi10YWJsZSAuYXJndW1lbnQtY29udGFpbmVyIC5hcmd1bWVudC1uYW1le2JhY2tncm91bmQ6cmdiYSgzNSw3MCwxMDAsLjE1KTtwYWRkaW5nOjdweH0uZG9jdW1lbnRhdGlvbi10YWJsZSAuYXJndW1lbnQtY29udGFpbmVyIC5hcmd1bWVudC1vYmplY3R7cGFkZGluZzo1cHggN3B4O2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuODUpfS5kb2N1bWVudGF0aW9uLXRhYmxlIC5hcmd1bWVudC1jb250YWluZXI6bGFzdC1jaGlsZHttYXJnaW46MH0uZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0e2JhY2tncm91bmQ6I2ExMDAwNTtjb2xvcjojZmZmO3BhZGRpbmc6M3B4fS5kb2N1bWVudGF0aW9uLXRhYmxlIC5ub1Rlc3QgKiwuZG9jdW1lbnRhdGlvbi10YWJsZSAubm9UZXN0IC5qc29uLWZvcm1hdHRlci1yb3csLmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdCAuanNvbi1mb3JtYXR0ZXItcm93IGEsLmRvY3VtZW50YXRpb24tdGFibGUgLm5vVGVzdCAuanNvbi1mb3JtYXR0ZXItcm93IGE6aG92ZXJ7Y29sb3I6I2ZmZn1gXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVJlbmRlcmVyQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBzZXJ2aWNlOiBhbnkgPSBEb2N1bWVudGF0aW9uU2VydmljZVxuICAgIHRlc3RTZXJ2aWNlOiBhbnkgPSBUZXN0U2VydmljZVxuXG4gICAgQElucHV0KCdzaG93JylcbiAgICBzaG93OiBib29sZWFuXG5cbiAgICBASW5wdXQoJ3Byb3BlcnRpZXMnKVxuICAgIHByb3BlcnRpZXM6IGFueVxuXG4gICAgZ2V0IHByb3BlcnRpZXNEYXRhS2V5cygpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcy5kYXRhKVxuICAgIH1cblxuICAgIGdldExpbmsoZG9jTGlua05hbWU6IHN0cmluZywgdHlwZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0eXBlTmFtZS50b0xvd2VyQ2FzZSgpfS4ke2RvY0xpbmtOYW1lfWBcbiAgICB9XG5cbiAgICBnZXREb2NEYXRhKGRvY0xpbmtOYW1lOiBzdHJpbmcsIHR5cGVOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VydmljZS5nZXRUaGlzKHRoaXMuc2VydmljZS5Eb2NzRGF0YSwgdGhpcy5nZXRMaW5rKGRvY0xpbmtOYW1lLCB0eXBlTmFtZSksIHt9KVxuICAgIH1cblxuICAgIHNob3dKc29uVmlld2VyKHZhbDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXZhbCAmJiB0eXBlb2YgdmFsICE9PSBgc3RyaW5nYFxuICAgIH1cblxuICAgIHNob3dUZXh0KGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBrZXkgIT09ICd2YWx1ZScgJiYga2V5ICE9PSAnYXJndW1lbnRzJyAmJiBrZXkgIT09ICd0ZXN0Q2FzZXMnXG4gICAgfVxuXG4gICAgaXNTdHJpbmcodmFsOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdmFsICYmIHR5cGVvZiB2YWwgPT09IGBzdHJpbmdgXG4gICAgfVxuXG4gICAgaGFzVGVzdChyb3csIGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5wcm9wZXJ0aWVzLmRhdGEsIGAke3Jvd30uJHtrZXl9YCkgJiYgdGhpcy5zZXJ2aWNlLmdldFRoaXModGhpcy5wcm9wZXJ0aWVzLmRhdGEsIGAke3Jvd30uJHtrZXl9YCwgW10pLmxlbmd0aFxuICAgIH1cblxuICAgIGhhc0FyZ3VtZW50cyhyb3csIGtleSkge1xuICAgICAgICBpZiAoa2V5ICE9PSBgYXJndW1lbnRzYCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnNlcnZpY2UuZ2V0VGhpcyh0aGlzLnByb3BlcnRpZXMuZGF0YSwgYCR7cm93fS4ke2tleX1gKVxuICAgICAgICBjb25zdCBsZW5ndGggPSAoQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsIDogW10pLmxlbmd0aFxuXG4gICAgICAgIGlmICghbGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXNzID0gdHJ1ZVxuXG4gICAgICAgIHZhbC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbWVudClcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5oYXNPd25Qcm9wZXJ0eSB8fCAhZWxlbWVudC5oYXNPd25Qcm9wZXJ0eShgbmFtZWApKSB7XG4gICAgICAgICAgICAgICAgcGFzcyA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwYXNzXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IEpTT05Gb3JtYXR0ZXIgZnJvbSAnanNvbi1mb3JtYXR0ZXItanMnXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnYXBwLWpzb24tdmlld2VyJyxcbiAgICB0ZW1wbGF0ZTogYDxkaXYgW2lubmVySFRNTF09XCJodG1sXCI+PC9kaXY+YCxcbiAgICBzdHlsZXM6IFtgLmpzb24tZm9ybWF0dGVyLXJvdyAuanNvbi1mb3JtYXR0ZXItcm93LC5qc29uLWZvcm1hdHRlci1yb3cgYXt3aGl0ZS1zcGFjZTpub3dyYXB9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBKc29uVmlld2VyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgnanNvbicpXG4gICAganNvbjogYW55XG5cbiAgICBnZXQgaHRtbCgpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBmb3JtYXR0ZXIgPSBuZXcgSlNPTkZvcm1hdHRlcih0aGlzLmpzb24sIDAsIHtcbiAgICAgICAgICAgIGhvdmVyUHJldmlld0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgaG92ZXJQcmV2aWV3QXJyYXlDb3VudDogMTAwLFxuICAgICAgICAgICAgaG92ZXJQcmV2aWV3RmllbGRDb3VudDogNSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGZvcm1hdHRlci5yZW5kZXIoKS5vdXRlckhUTUxcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhcHAtdmFsdWUtaW5wdXQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInZhbHVlLWlucHV0XCI+XG4gICAgPHRleHRhcmVhICpuZ0lmPVwic2hvd1RleHRhcmVhKClcIiBbKG5nTW9kZWwpXT1cInByb3h5TW9kZWxcIiAoaW5wdXQpPVwidXBkYXRlVmFsXCI+PC90ZXh0YXJlYT5cbiAgICA8IS0tIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgKm5nSWY9XCJ0eXBlID09PSAnbnVtYmVyJ1wiIFsobmdNb2RlbCldPVwicHJveHlNb2RlbFwiIChpbnB1dCk9XCJ1cGRhdGVWYWxcIj5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiAqbmdJZj1cInR5cGUgPT09ICdzdHJpbmcnXCIgWyhuZ01vZGVsKV09XCJwcm94eU1vZGVsXCIgKGlucHV0KT1cInVwZGF0ZVZhbFwiPlxuICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAqbmdJZj1cInR5cGUgPT09ICdib29sZWFuJ1wiIFsobmdNb2RlbCldPVwicHJveHlNb2RlbFwiIChpbnB1dCk9XCJ1cGRhdGVWYWxcIj4gLS0+XG48L2Rpdj5gLFxuICAgIHN0eWxlczogW2BgXVxufSlcblxuZXhwb3J0IGNsYXNzIFZpZXdlcklucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgnbW9kZWwnKVxuICAgIG1vZGVsOiBhbnlcblxuICAgIHByb3h5TW9kZWwgPSBgYFxuXG4gICAgdHlwZTogc3RyaW5nID0gYHN0cmluZ2BcblxuICAgIGdldFByb3h5TW9kZWwoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGBzdHJpbmdgOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsLnZhbHVlID8gdGhpcy5tb2RlbC52YWx1ZS50b1N0cmluZygpIDogYGBcbiAgICAgICAgICAgIGNhc2UgYG51bWJlcmA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFsdWUgPyBwYXJzZUZsb2F0KHRoaXMubW9kZWwudmFsdWUpIDogMFxuICAgICAgICAgICAgY2FzZSBgYm9vbGVhbmA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubW9kZWwudmFsdWVcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBsZXQgdmFsID0gdGhpcy5tb2RlbC52YWx1ZVxuXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gSlNPTi5zdHJpbmdpZnkodGhpcy5tb2RlbC52YWx1ZSlcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgeyB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsIHx8IGB7fWBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVZhbCgpIHtcbiAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5wcm94eU1vZGVsXG5cbiAgICAgICAgc3dpdGNoICh0aGlzLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgYHN0cmluZ2A6XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9IHZhbHVlID8gdmFsdWUudG9TdHJpbmcoKSA6IGBgXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgYG51bWJlcmA6XG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9IHZhbHVlID8gcGFyc2VGbG9hdCh2YWx1ZSkgOiAwXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgYGJvb2xlYW5gOlxuICAgICAgICAgICAgICAgIHRoaXMubW9kZWwudmFsdWUgPSAhIXZhbHVlXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUpXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHsgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlbC52YWx1ZSA9IHZhbHVlIHx8IHt9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy50eXBlLCB0aGlzLm1vZGVsKTtcblxuICAgICAgICB0aGlzLnByb3h5TW9kZWwgPSB0aGlzLmdldFByb3h5TW9kZWwoKVxuICAgICAgICB0aGlzLnR5cGUgPSB0aGlzLm1vZGVsID8gdGhpcy5tb2RlbC50eXBlIHx8IHRoaXMubW9kZWwua2luZCB8fCBgc3RyaW5nYCA6IGBzdHJpbmdgXG4gICAgfVxuXG4gICAgc2hvd1RleHRhcmVhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50eXBlICE9PSAnc3RyaW5nJyAmJiB0aGlzLnR5cGUgIT09ICdudW1iZXInXG4gICAgfVxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBEb2Nrc0NvbXBvbmVudCB9IGZyb20gJy4vZG9ja3MuY29tcG9uZW50JztcbmltcG9ydCB7IFNpZGViYXJDb21wb25lbnQgfSBmcm9tICcuL3NpZGViYXIuY29tcG9uZW50JztcbmltcG9ydCB7IFJlbmRlcmVyQ29tcG9uZW50IH0gZnJvbSAnLi9yZW5kZXJlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGFibGVSZW5kZXJlckNvbXBvbmVudCB9IGZyb20gJy4vdGFibGUtcmVuZGVyZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEpzb25WaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2pzb24tdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWaWV3ZXJJbnB1dENvbXBvbmVudCB9IGZyb20gJy4vdmFsdWUtaW5wdXQuY29tcG9uZW50J1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRG9ja3NDb21wb25lbnQsXG4gICAgU2lkZWJhckNvbXBvbmVudCxcbiAgICBSZW5kZXJlckNvbXBvbmVudCxcbiAgICBUYWJsZVJlbmRlcmVyQ29tcG9uZW50LFxuICAgIEpzb25WaWV3ZXJDb21wb25lbnQsXG4gICAgVmlld2VySW5wdXRDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW0RvY2tzQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBEb2Nrc01vZHVsZSB7IH1cbiJdLCJuYW1lcyI6WyJDb21wb25lbnQiLCJJbnB1dCIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIiwiRm9ybXNNb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBLElBQUE7UUFvSEk7dUJBbkhXLEVBQUU7NkJBQ0QscUJBQXFCOzRCQUNqQixFQUFFOzBCQUVUO2dCQUNMLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixJQUFJLEVBQUUsS0FBSztnQkFDWCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLElBQUksRUFBRSxFQUFFO2dCQUNSLFlBQVksRUFBRSxFQUFFO2dCQUNoQixTQUFTLEVBQUUsRUFBRTthQUNoQjtZQW9HRyxPQUFPLElBQUksQ0FBQTtTQUNkOzs7OztRQW5HRCxzQ0FBTzs7OztZQUFQLFVBQVEsUUFBYTtnQkFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7YUFDM0I7Ozs7UUFFRCxxQ0FBTTs7O1lBQU47Z0JBQ0ksSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFDMUQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFBO2FBQ2xCOzs7OztRQUVELHNDQUFPOzs7O1lBQVAsVUFBUSxHQUFXO2dCQUNmLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO2dCQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUE7Z0JBQy9CLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTthQUNoQjs7Ozs7UUFFRCx3Q0FBUzs7OztZQUFULFVBQVUsR0FBUTs7Z0JBQ2QsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFBO2dCQUVoQixLQUFLLElBQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7b0JBQ3ZCLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDZCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQUksQ0FBQyxxQkFBZSxDQUFDLGFBQVMsQ0FBQyxDQUFBO3FCQUM3QztpQkFDSjtnQkFFRCxPQUFPLE1BQUksR0FBRyxDQUFDLElBQUksSUFBRyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sR0FBRyxFQUFFLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBRyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLFlBQU0sR0FBRyxDQUFDLElBQUksTUFBRyxDQUFBO2FBQ3BIOzs7OztRQUVELG1DQUFJOzs7O1lBQUosVUFBSyxHQUFROztnQkFDVCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7Z0JBRWYsSUFBSTtvQkFDQSxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO2lCQUM3QztnQkFBQyxPQUFPLEtBQUssRUFBRSxHQUFHO2dCQUVuQixPQUFPLE1BQU0sQ0FBQTthQUNoQjs7Ozs7UUFFRCxzQ0FBTzs7OztZQUFQLFVBQVEsR0FBUTtnQkFFWixJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNOLE9BQU07aUJBQ1Q7Z0JBRUQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFBO2FBQ2xCOzs7Ozs7Ozs7Ozs7OztRQVFELHNDQUFPOzs7Ozs7O1lBQVAsVUFBUSxFQUFPLEVBQUUsSUFBeUIsRUFBRSxRQUFjO2dCQUN0RCxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFO29CQUMvQixJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO2lCQUNqRDtxQkFBTTtvQkFDSCxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtpQkFDZDs7Z0JBRUQsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLFdBQVcsRUFBRSxZQUFZO29CQUMxRCxJQUFJLFdBQVcsS0FBSyxTQUFTLEVBQUU7d0JBQzNCLE9BQU8sUUFBUSxDQUFBO3FCQUNsQjtvQkFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTs7d0JBQ3BFLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQTs7d0JBRW5CLElBQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUE7d0JBRS9DLElBQUksT0FBTyxFQUFFOzRCQUNULFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO3lCQUNoQzs7d0JBRUQsSUFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUEsQ0FBQyxDQUFBOzt3QkFDM0QsSUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFFL0MsSUFBSSxPQUFPLFdBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxVQUFVLEVBQUU7OzRCQUNqRCxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQTs0QkFDbEUsT0FBTyxPQUFPLENBQUE7eUJBQ2pCO3FCQUNKO29CQUVELElBQUksWUFBWSxFQUFFO3dCQUNkLE9BQU8sV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO3FCQUNuQzt5QkFBTTt3QkFDSCxPQUFPLFdBQVcsQ0FBQTtxQkFDckI7aUJBRUosQ0FBQyxDQUFBO2dCQUVGLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtvQkFDdEIsT0FBTyxRQUFRLENBQUE7aUJBQ2xCO2dCQUVELE9BQU8sTUFBTSxDQUFBO2FBQ2hCO21DQWxITDtRQXVIQyxDQUFBO0FBdkhEO0FBeUhBLFFBQVcsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFBOzs7Ozs7QUN6SDVELElBRUEsSUFBQTs7dUJBQ2UsRUFBRTs2QkFDRCxxQkFBcUI7K0JBQ2Q7Z0JBQ2YsZUFBZSxFQUFFLEtBQUs7Z0JBQ3RCLEtBQUssRUFBRSxFQUFFO2FBQ1o7eUJBRVksRUFBRTs2QkFDRSxFQUFFOzZCQUNGO2dCQUNiLEtBQUssRUFBRSxFQUFFO2dCQUNULFVBQVUsRUFBRSxFQUFFO2dCQUNkLE9BQU8sRUFBRSxFQUFFO2dCQUNYLGlCQUFpQixFQUFFLEVBQUU7Z0JBQ3JCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7bUNBQ2lCLEVBQUU7Ozs7OztRQUVwQiw4QkFBUTs7OztZQUFSLFVBQVMsS0FBVTtnQkFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFBOztnQkFFNUUsSUFBTSxXQUFXLEdBQUc7b0JBQ2hCLFNBQVM7b0JBQ1QsWUFBWTtvQkFDWixxQkFBcUI7b0JBQ3JCLFNBQVM7aUJBQ1osQ0FBQTtnQkFFRCxLQUFLLElBQU0sSUFBSSxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtvQkFDOUMsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0RBRTFCLE9BQU87NEJBQ2QsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxLQUFLLHNCQUFzQixJQUFJLE9BQU8sS0FBSyxhQUFhLEVBQUU7O2dDQUVqSCxJQUFNLFdBQVcsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsT0FBSyxTQUFTLEVBQUssSUFBSSxTQUFJLE9BQVMsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFBOztnQ0FDckcsSUFBTSxrQkFBZ0IsR0FBUSxFQUFFLENBQUE7Z0NBRWhDLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtvQ0FDbkIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFTOzt3Q0FDaEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTt3Q0FFbkIsSUFBSSxDQUFDLElBQUksRUFBRTs0Q0FDUCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTt5Q0FDbkI7d0NBRUQsSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs0Q0FDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUk7Z0RBQ2IsSUFBSSxDQUFDLGtCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFO29EQUN6QixrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO29EQUMvQixPQUFNO2lEQUNUO2dEQUVELGtCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTs2Q0FDcEMsQ0FBQyxDQUFBO3lDQUNMOzZDQUFNOzRDQUNILElBQUksQ0FBQyxrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtnREFDekIsa0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtnREFDL0IsT0FBTTs2Q0FDVDs0Q0FDRCxrQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7eUNBQ3BDO3FDQUNKLENBQUMsQ0FBQTtpQ0FDTDtnQ0FFRCxJQUFJLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUU7O29DQUN2RCxJQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFBO29DQUN0RSxLQUFLLElBQU0sU0FBUyxJQUFJLFFBQVEsRUFBRTt3Q0FDOUIsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7NENBQ3JCLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO2dEQUU5RCxLQUFLLElBQU0sUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRTtvREFDeEMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxFQUFFOzt3REFDcEYsSUFBTSxTQUFTLEdBQUcsa0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUE7O3dEQUM1QyxJQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFBO3dEQUMxQixRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFHLGtCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBO3dEQUNoRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUMsSUFBUzs7NERBQ3ZFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7NERBRXZCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtnRUFDbEMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUMsTUFBVyxJQUFLLE9BQUEsTUFBTSxDQUFDLElBQUksR0FBQSxDQUFDLENBQUE7NkRBQzNEOzREQUVELE9BQU87Z0VBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO2dFQUNmLE9BQU8sU0FBQTs2REFDVixDQUFBO3lEQUNKLENBQUMsR0FBRyxFQUFFLENBQUE7cURBQ1Y7aURBQ0o7NkNBQ0o7eUNBQ0o7cUNBQ0o7aUNBQ0o7NkJBQ0o7Ozt3QkE5REwsS0FBSyxJQUFNLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO29DQUE5QyxPQUFPO3lCQStEakI7cUJBQ0o7aUJBQ0o7YUFDSjs7Ozs7O1FBRUQsZ0NBQVU7Ozs7O1lBQVYsVUFBVyxHQUFXLEVBQUUsUUFBZ0I7Z0JBRXBDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ04sT0FBTyxLQUFLLENBQUE7aUJBQ2Y7Z0JBRUQsT0FBTyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUssR0FBRyxpQkFBWSxRQUFVLENBQUMsQ0FBQTthQUM1Rjs7Ozs7O1FBRUQsbUNBQWE7Ozs7O1lBQWIsVUFBYyxHQUFXLEVBQUUsUUFBZ0I7Z0JBRXZDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ04sT0FBTyxTQUFTLENBQUE7aUJBQ25CO2dCQUVELE9BQU8sb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFLLEdBQUcsaUJBQVksUUFBUSxVQUFPLENBQUMsQ0FBQTthQUNqRzs7Ozs7OztRQUVELHlDQUFtQjs7Ozs7O1lBQW5CLFVBQW9CLEdBQVcsRUFBRSxRQUFnQixFQUFFLEtBQWE7Z0JBQzVELElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ04sT0FBTyxTQUFTLENBQUE7aUJBQ25CO2dCQUVELE9BQU8sb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFLLEdBQUcsaUJBQVksUUFBUSxpQkFBWSxLQUFPLENBQUMsQ0FBQTthQUM3Rzs7Ozs7O1FBRUQsb0NBQWM7Ozs7O1lBQWQsVUFBZSxHQUFXLEVBQUUsU0FBaUI7Z0JBRXpDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ04sT0FBTyxTQUFTLENBQUE7aUJBQ25COztnQkFFRCxJQUFNLE9BQU8sR0FBZSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBSyxHQUFHLGVBQVUsU0FBUyxhQUFVLENBQUMsQ0FBQTs7Z0JBQ3pHLElBQU0sVUFBVSxHQUFrQixFQUFFLENBQUE7Z0JBRXBDLElBQUksT0FBTyxFQUFFO29CQUNULE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPO3dCQUNuQixJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7NEJBQ2QsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7eUJBQ2hDOzZCQUFNOzRCQUNILFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7eUJBQzNCO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDtnQkFFRCxPQUFPLFVBQVUsQ0FBQTthQUNwQjs7Ozs7O1FBRUQsbUNBQWE7Ozs7O1lBQWIsVUFBYyxHQUFXLEVBQUUsUUFBaUI7Z0JBRXhDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ04sT0FBTyxTQUFTLENBQUE7aUJBQ25CO2dCQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7b0JBQ1gsT0FBTyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUssR0FBRyxhQUFVLENBQUMsQ0FBQTtpQkFDaEY7Z0JBRUQsT0FBTyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUssR0FBRyxpQkFBWSxRQUFRLGFBQVUsQ0FBQyxDQUFBO2FBQ3BHOzs7OztRQUVELDhCQUFROzs7O1lBQVIsVUFBUyxHQUFXO2dCQUVoQixJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNOLE9BQU8sS0FBSyxDQUFBO2lCQUNmO2dCQUVELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUE7YUFDdEM7Ozs7O1FBRUQsZ0NBQVU7Ozs7WUFBVixVQUFXLElBQVM7Z0JBQ2hCLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtvQkFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7O29CQUVqQixJQUFNLFNBQVMsR0FBRyxVQUFDLEtBQWE7d0JBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFOzRCQUN0QixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7eUJBQy9COzt3QkFFRCxJQUFJLEdBQUcsR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBOzt3QkFDbEMsSUFBSSxFQUFFLEdBQWEsZUFBUyxDQUFBOzt3QkFDNUIsSUFBSSxHQUFHLEdBQW9CLElBQUksQ0FBQTs7d0JBQy9CLElBQUksR0FBRyxDQUFLO3dCQUVaLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFOzRCQUN6QixFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTt5QkFDekI7NkJBQU0sSUFBSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFOzRCQUNoRCxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUE7NEJBQzlCLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQTs0QkFDM0IsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQTt5QkFDdkM7O3dCQUVELElBQU0sU0FBUyxHQUFHOzRCQUNkLElBQUksR0FBRyxZQUFZLE9BQU8sRUFBRTtnQ0FDeEIsR0FBRztxQ0FDRSxJQUFJLENBQUMsVUFBQSxHQUFHO29DQUNMLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsQ0FBQTtvQ0FDcEQsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtpQ0FDdkIsQ0FBQztxQ0FDRCxLQUFLLENBQUMsVUFBQSxHQUFHO29DQUNOLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBQSxFQUFFLENBQUMsQ0FBQTtvQ0FDckQsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtpQ0FDdkIsQ0FBQyxDQUFBOzZCQUNUO2lDQUFNO2dDQUNILElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUEsRUFBRSxDQUFDLENBQUE7Z0NBQ3JELFNBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7NkJBQ3ZCO3lCQUNKLENBQUE7d0JBRUQsSUFBSSxDQUFDLEdBQUcsRUFBRTs0QkFDTixHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUE7NEJBQ1YsU0FBUyxFQUFFLENBQUE7eUJBQ2Q7NkJBQU07NEJBQ0gsR0FBRyxFQUFFO2lDQUNBLElBQUksQ0FBQztnQ0FDRixHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUE7Z0NBQ1YsU0FBUyxFQUFFLENBQUE7NkJBQ2QsQ0FBQztpQ0FDRCxLQUFLLENBQUM7Z0NBQ0gsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFBO2dDQUNWLFNBQVMsRUFBRSxDQUFBOzZCQUNkLENBQUMsQ0FBQTt5QkFDVDtxQkFDSixDQUFBO29CQUVELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDZixDQUFDLENBQUE7YUFDTDs7Ozs7OztRQUVELDZCQUFPOzs7Ozs7WUFBUCxVQUFRLElBQVMsRUFBRSxRQUFnQixFQUFFLElBQVk7Z0JBQWpELGlCQW1GQzs7Z0JBbEZHLElBQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBRWhDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtvQkFDL0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFBO29CQUV2QyxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQy9CLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtxQkFDcEM7b0JBRUQsSUFBSSxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO3dCQUN6QyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRzs0QkFDckMsSUFBSSxFQUFFLENBQUM7NEJBQ1AsT0FBTyxFQUFFLEVBQUU7NEJBQ1gsT0FBTyxFQUFFLElBQUk7eUJBQ2hCLENBQUE7cUJBQ0o7b0JBRUQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTs7b0JBRXJELElBQU0sVUFBVSxHQUFHLFVBQUMsR0FBUTt3QkFDeEIsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTt3QkFDdEQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUE7d0JBQy9ELEtBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQTt3QkFFeEMsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFOzRCQUNWLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3lCQUN0Qjt3QkFFRCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDckIsQ0FBQTs7b0JBRUQsSUFBTSxZQUFZLEdBQUcsVUFBQyxHQUFROzt3QkFDMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFBO3dCQUVqQixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBWTs0QkFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7Z0NBQ2YsTUFBTSxHQUFHLEtBQUssQ0FBQTs2QkFDakI7eUJBQ0osQ0FBQyxDQUFBO3dCQUVGLFVBQVUsQ0FBQzs0QkFDUCxJQUFJLEVBQUUsTUFBTTs0QkFDWixPQUFPLEVBQUUsRUFBRTs0QkFDWCxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHOzRCQUNoQyxPQUFPLEVBQUUsS0FBSzs0QkFDZCxPQUFPLEVBQUUsR0FBRzt5QkFDZixDQUFDLENBQUE7cUJBQ0wsQ0FBQTtvQkFFRCxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUN4RCxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsRUFBRTt3QkFDWCxJQUFJLEVBQUUsQ0FBQzt3QkFDUCxPQUFPLEVBQUUsSUFBSTtxQkFDaEIsQ0FBQTtvQkFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7d0JBRXJDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQTtxQkFFekQ7eUJBQU0sSUFBSSxJQUFJLENBQUMsRUFBRSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxVQUFVLEVBQUU7d0JBQ2pELElBQUksQ0FBQyxFQUFFLEVBQUU7NkJBQ0osSUFBSSxDQUFDLFVBQUMsR0FBUTs0QkFDWCxVQUFVLENBQUM7Z0NBQ1AsSUFBSSxFQUFFLElBQUk7Z0NBQ1YsT0FBTyxFQUFFLEVBQUU7Z0NBQ1gsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRztnQ0FDaEMsT0FBTyxFQUFFLEtBQUs7Z0NBQ2QsT0FBTyxFQUFFLEdBQUc7NkJBQ2YsQ0FBQyxDQUFBO3lCQUNMLEVBQUUsVUFBQyxHQUFROzRCQUNSLFVBQVUsQ0FBQztnQ0FDUCxJQUFJLEVBQUUsS0FBSztnQ0FDWCxPQUFPLEVBQUUsR0FBRztnQ0FDWixJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHO2dDQUNoQyxPQUFPLEVBQUUsS0FBSztnQ0FDZCxPQUFPLEVBQUUsR0FBRzs2QkFDZixDQUFDLENBQUE7eUJBQ0wsQ0FBQyxDQUFBO3FCQUNUO2lCQUNKLENBQUMsQ0FBQTthQUVMOzs7Ozs7UUFFRCxrQ0FBWTs7Ozs7WUFBWixVQUFhLEtBQVUsRUFBRSxJQUFZO2dCQUFyQyxpQkFxQ0M7Z0JBbkNHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtvQkFFL0IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUNqQyxJQUFJLEVBQUUsU0FBUzt3QkFDZixPQUFPLEVBQUUsRUFBRTtxQkFDZCxDQUFBOztvQkFFRCxJQUFNLFVBQVUsR0FBRyxVQUFDLEdBQVEsRUFBRSxLQUFhOzt3QkFDdkMsSUFBTSxjQUFjLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxLQUFLLENBQUE7O3dCQUN4RSxJQUFNLE9BQU8sR0FBRyxjQUFjLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO3dCQUVuRixLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTt3QkFDakQsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQTt3QkFFekUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtxQkFDakIsQ0FBQTs7b0JBRUQsSUFBTSxHQUFHLEdBQUcsVUFBQyxLQUFhO3dCQUN0QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3BCLEtBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztpQ0FDN0MsSUFBSSxDQUFDLFVBQUMsR0FBUTtnQ0FDWCxVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBOzZCQUN6QixDQUFDO2lDQUNELEtBQUssQ0FBQyxVQUFDLEdBQVE7Z0NBQ1osVUFBVSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQTs2QkFDekIsQ0FBQyxDQUFBO3lCQUVUOzZCQUFNOzRCQUNILE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTt5QkFDOUM7cUJBQ0osQ0FBQTtvQkFFRCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ1QsQ0FBQyxDQUFBO2FBRUw7Ozs7Ozs7Ozs7UUFNRCw4QkFBUTs7Ozs7WUFBUixVQUFTLElBQXFCO2dCQUE5QixpQkFrQ0M7Z0JBaENHLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs7b0JBRS9CLElBQU0sR0FBRyxHQUFHLFVBQUMsS0FBYTs7d0JBQ3RCLElBQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBOzt3QkFDM0MsSUFBTSxhQUFhLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTt3QkFFdEMsSUFBSSxhQUFhLEVBQUU7OzRCQUNmLElBQU0sVUFBUSxHQUFHLFVBQUMsVUFBa0I7O2dDQUNoQyxJQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO2dDQUV0RSxJQUFJLFFBQVEsRUFBRTtvQ0FDVixLQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7eUNBQzVCLElBQUksQ0FBQyxVQUFDLEdBQVE7d0NBQ1gsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQTt3Q0FDakQsVUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQTtxQ0FDM0IsRUFBRSxVQUFDLEdBQVE7d0NBQ1IsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQTt3Q0FDakQsVUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQTtxQ0FDM0IsQ0FBQyxDQUFBO2lDQUNUO3FDQUFNO29DQUNILEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7aUNBQ2pCOzZCQUNKLENBQUE7NEJBRUQsVUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO3lCQUNkOzZCQUFNOzRCQUNILE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO3lCQUNsQztxQkFDSixDQUFBO29CQUVELEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDVCxDQUFDLENBQUE7YUFDTDs7Ozs7UUFFRCxxQ0FBZTs7OztZQUFmLFVBQWdCLFNBQWlCO2dCQUM3QixJQUFJLFNBQVMsR0FBRyxJQUFJLEVBQUU7b0JBQ2xCLE9BQU8sU0FBUyxHQUFHLElBQUksQ0FBQTtpQkFDMUI7Z0JBRUQsSUFBSSxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsRUFBRTtvQkFDdkIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksR0FBRyxDQUFBO2lCQUNsQztnQkFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDNUIsT0FBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxJQUFJLEdBQUcsQ0FBQTtpQkFDdkM7Z0JBRUQsT0FBTyxFQUFFLENBQUE7YUFDWjswQkEzWkw7UUE0WkMsQ0FBQTtBQTFaRDtBQTRaQSxRQUFXLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBOzs7Ozs7QUM5WjFDOzsyQkFrQm1CLG9CQUFvQjsrQkFDaEIsV0FBVzs7Ozs7O1FBYzlCLCtCQUFNOzs7O1lBQU4sVUFBTyxHQUFRO2FBQ2Q7Ozs7UUFFRCxpQ0FBUTs7O1lBQVI7Z0JBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7Z0JBRXJDLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEVBQUUsRUFBRTtvQkFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUNsQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ2hFO2FBQ0o7O29CQXhDSkEsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxXQUFXO3dCQUNyQixRQUFRLEVBQUUsdU9BT1A7d0JBQ0gsTUFBTSxFQUFFLENBQUMsbWlLQUFpaUssQ0FBQztxQkFDOWlLOzs7MkJBTUlDLFVBQUssU0FBQyxNQUFNOzhCQUdaQSxVQUFLLFNBQUMsU0FBUzs0QkFHZkEsVUFBSyxTQUFDLE9BQU87dUNBR2JBLFVBQUssU0FBQyxrQkFBa0I7OzZCQTlCN0I7Ozs7Ozs7QUNBQTtRQXdCSTsyQkFFZSxvQkFBb0I7K0JBQ2hCLFdBQVc7U0FIYjtRQUtqQixzQkFBSSx1Q0FBUzs7O2dCQUFiO2dCQUNJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO2FBQzVDOzs7V0FBQTtRQUVELHNCQUFJLHVDQUFTOzs7Z0JBQWI7Z0JBQUEsaUJBR0M7O2dCQUZHLElBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFBLENBQUMsQ0FBQTtnQkFDeEYsT0FBTyxHQUFHLENBQUE7YUFDYjs7O1dBQUE7Ozs7OztRQUVELGtDQUFPOzs7OztZQUFQLFVBQVEsV0FBbUIsRUFBRSxRQUFnQjtnQkFDekMsT0FBVSxRQUFRLENBQUMsV0FBVyxFQUFFLFNBQUksV0FBYSxDQUFBO2FBQ3BEOzs7Ozs7UUFFRCx1Q0FBWTs7Ozs7WUFBWixVQUFhLFdBQW1CLEVBQUUsUUFBZ0I7O2dCQUM5QyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDdEQsT0FBTyxPQUFPLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQTthQUN6RTs7Ozs7O1FBRUQscUNBQVU7Ozs7O1lBQVYsVUFBVyxXQUFtQixFQUFFLFFBQWdCO2dCQUM1QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO2FBQzlGOzs7OztRQUVELDBDQUFlOzs7O1lBQWYsVUFBZ0IsS0FBYTtnQkFDekIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEtBQUssS0FBSyxFQUFFO29CQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFBO29CQUNyQyxPQUFNO2lCQUNUO2dCQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUE7YUFDM0M7O29CQXRESkQsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxhQUFhO3dCQUN2QixRQUFRLEVBQUUsKzNCQWFQO3dCQUNILE1BQU0sRUFBRSxDQUFDLCs5QkFBNjlCLENBQUM7cUJBQzErQjs7OzsrQkFyQkQ7Ozs7Ozs7QUNBQTtRQXFESTsyQkFFZSxvQkFBb0I7K0JBQ2hCLFdBQVc7U0FIYjtRQUtqQixzQkFBSSx5Q0FBVTs7O2dCQUFkO2dCQUNJLE9BQU87b0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVO29CQUMxQyxPQUFPLEVBQUUsQ0FBQzs0QkFDTixHQUFHLEVBQUUsTUFBTTs0QkFDWCxLQUFLLEVBQUUsTUFBTTt5QkFDaEIsRUFBRTs0QkFDQyxHQUFHLEVBQUUsTUFBTTs0QkFDWCxLQUFLLEVBQUUsTUFBTTs0QkFDYixRQUFRLEVBQUUsSUFBSTt5QkFDakIsRUFBRTs0QkFDQyxHQUFHLEVBQUUsYUFBYTs0QkFDbEIsS0FBSyxFQUFFLGFBQWE7NEJBQ3BCLFFBQVEsRUFBRSxJQUFJO3lCQUNqQixFQUFFOzRCQUNDLEdBQUcsRUFBRSxXQUFXOzRCQUNoQixLQUFLLEVBQUUsWUFBWTt5QkFDdEIsQ0FBQztpQkFDTCxDQUFBO2FBQ0o7OztXQUFBO1FBRUQsc0JBQUksc0NBQU87OztnQkFBWDtnQkFDSSxPQUFPO29CQUNILElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTztvQkFDdkMsT0FBTyxFQUFFLENBQUM7NEJBQ04sR0FBRyxFQUFFLE1BQU07NEJBQ1gsS0FBSyxFQUFFLE1BQU07eUJBQ2hCLEVBQUU7NEJBQ0MsR0FBRyxFQUFFLGFBQWE7NEJBQ2xCLEtBQUssRUFBRSxhQUFhOzRCQUNwQixRQUFRLEVBQUUsSUFBSTt5QkFDakIsRUFBRTs0QkFDQyxHQUFHLEVBQUUsV0FBVzs0QkFDaEIsS0FBSyxFQUFFLFdBQVc7eUJBQ3JCLEVBQUU7NEJBQ0MsS0FBSyxFQUFFLFNBQVM7NEJBQ2hCLEdBQUcsRUFBRSxTQUFTO3lCQUNqQixFQUFFOzRCQUNDLEdBQUcsRUFBRSxXQUFXOzRCQUNoQixLQUFLLEVBQUUsWUFBWTt5QkFDdEIsQ0FBQztpQkFDTCxDQUFBO2FBQ0o7OztXQUFBO1FBRUQsc0JBQUksNkNBQWM7OztnQkFBbEI7Z0JBQ0ksT0FBTztvQkFDSCxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG1CQUFtQjtvQkFDbkQsT0FBTyxFQUFFLENBQUM7NEJBQ04sR0FBRyxFQUFFLE1BQU07NEJBQ1gsS0FBSyxFQUFFLE1BQU07eUJBQ2hCLEVBQUU7NEJBQ0MsR0FBRyxFQUFFLE1BQU07NEJBQ1gsS0FBSyxFQUFFLE1BQU07NEJBQ2IsUUFBUSxFQUFFLElBQUk7eUJBQ2pCLEVBQUU7NEJBQ0MsR0FBRyxFQUFFLGFBQWE7NEJBQ2xCLEtBQUssRUFBRSxhQUFhOzRCQUNwQixRQUFRLEVBQUUsSUFBSTt5QkFDakIsRUFBRTs0QkFDQyxHQUFHLEVBQUUsV0FBVzs0QkFDaEIsS0FBSyxFQUFFLFlBQVk7eUJBSXRCLENBQUM7aUJBQ0wsQ0FBQTthQUNKOzs7V0FBQTtRQUVELHNCQUFJLDJDQUFZOzs7Z0JBQWhCO2dCQUNJLE9BQU87b0JBQ0gsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPO29CQUN2QyxPQUFPLEVBQUUsQ0FBQzs0QkFDTixHQUFHLEVBQUUsTUFBTTs0QkFDWCxLQUFLLEVBQUUsTUFBTTt5QkFDaEIsRUFBRTs0QkFDQyxHQUFHLEVBQUUsYUFBYTs0QkFDbEIsS0FBSyxFQUFFLGFBQWE7NEJBQ3BCLFFBQVEsRUFBRSxJQUFJO3lCQUNqQixFQUFFOzRCQUNDLEdBQUcsRUFBRSxTQUFTOzRCQUNkLEtBQUssRUFBRSxTQUFTO3lCQUNuQixFQUFFOzRCQUNDLEdBQUcsRUFBRSxXQUFXOzRCQUNoQixLQUFLLEVBQUUsWUFBWTt5QkFDdEIsQ0FBQztpQkFDTCxDQUFBO2FBQ0o7OztXQUFBOzs7OztRQUVELHlDQUFhOzs7O1lBQWIsVUFBYyxJQUFZOztnQkFDdEIsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFBO2dCQUMxQyxPQUFPLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUE7YUFDMUU7O29CQWpKSkEsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxjQUFjO3dCQUN4QixRQUFRLEVBQUUscWdGQTBDSDt3QkFDUCxNQUFNLEVBQUUsQ0FBQyw2L0dBQTIvRyxDQUFDO3FCQUN4Z0g7Ozs7Z0NBbEREOzs7Ozs7O0FDQUE7UUE4Q0k7MkJBRWUsb0JBQW9COytCQUNoQixXQUFXO1NBSGI7UUFXakIsc0JBQUksc0RBQWtCOzs7Z0JBQXRCO2dCQUNJLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQzNDOzs7V0FBQTs7Ozs7O1FBRUQsd0NBQU87Ozs7O1lBQVAsVUFBUSxXQUFtQixFQUFFLFFBQWdCO2dCQUN6QyxPQUFVLFFBQVEsQ0FBQyxXQUFXLEVBQUUsU0FBSSxXQUFhLENBQUE7YUFDcEQ7Ozs7OztRQUVELDJDQUFVOzs7OztZQUFWLFVBQVcsV0FBbUIsRUFBRSxRQUFnQjtnQkFDNUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTthQUM5Rjs7Ozs7UUFFRCwrQ0FBYzs7OztZQUFkLFVBQWUsR0FBUTtnQkFDbkIsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQTthQUMxQzs7Ozs7UUFFRCx5Q0FBUTs7OztZQUFSLFVBQVMsR0FBVztnQkFDaEIsT0FBTyxHQUFHLEtBQUssT0FBTyxJQUFJLEdBQUcsS0FBSyxXQUFXLElBQUksR0FBRyxLQUFLLFdBQVcsQ0FBQTthQUN2RTs7Ozs7UUFFRCx5Q0FBUTs7OztZQUFSLFVBQVMsR0FBUTtnQkFDYixPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFBO2FBQzFDOzs7Ozs7UUFFRCx3Q0FBTzs7Ozs7WUFBUCxVQUFRLEdBQUcsRUFBRSxHQUFHO2dCQUNaLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUssR0FBRyxTQUFJLEdBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFLLEdBQUcsU0FBSSxHQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFBO2FBQy9JOzs7Ozs7UUFFRCw2Q0FBWTs7Ozs7WUFBWixVQUFhLEdBQUcsRUFBRSxHQUFHO2dCQUNqQixJQUFJLEdBQUcsS0FBSyxXQUFXLEVBQUU7b0JBQ3JCLE9BQU8sS0FBSyxDQUFBO2lCQUNmOztnQkFFRCxJQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBSyxHQUFHLFNBQUksR0FBSyxDQUFDLENBQUE7O2dCQUN2RSxJQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsRUFBRSxNQUFNLENBQUE7Z0JBRXJELElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1QsT0FBTyxLQUFLLENBQUE7aUJBQ2Y7O2dCQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtnQkFFZixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUEsT0FBTztvQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7d0JBQzVELElBQUksR0FBRyxLQUFLLENBQUE7cUJBQ2Y7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILE9BQU8sSUFBSSxDQUFBO2FBQ2Q7O29CQXZHSkEsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7d0JBQzlCLFFBQVEsRUFBRSx1dUVBbUNMO3dCQUNMLE1BQU0sRUFBRSxDQUFDLDJ6Q0FBMnpDLENBQUM7cUJBQ3gwQzs7Ozs7MkJBUUlDLFVBQUssU0FBQyxNQUFNO2lDQUdaQSxVQUFLLFNBQUMsWUFBWTs7cUNBdER2Qjs7Ozs7OztBQ0FBOzs7UUFjSSxzQkFBSSxxQ0FBSTs7O2dCQUFSOztnQkFDSSxJQUFNLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRTtvQkFDOUMsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsc0JBQXNCLEVBQUUsR0FBRztvQkFDM0Isc0JBQXNCLEVBQUUsQ0FBQztpQkFDNUIsQ0FBQyxDQUFDO2dCQUVILE9BQU8sU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQTthQUN0Qzs7O1dBQUE7O29CQW5CSkQsY0FBUyxTQUFDO3dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7d0JBQzNCLFFBQVEsRUFBRSxrQ0FBZ0M7d0JBQzFDLE1BQU0sRUFBRSxDQUFDLG1GQUFtRixDQUFDO3FCQUNoRzs7OzJCQUlJQyxVQUFLLFNBQUMsTUFBTTs7a0NBWGpCOzs7Ozs7O0FDQUE7OzhCQWtCaUIsRUFBRTt3QkFFQSxRQUFROzs7OztRQUV2Qiw0Q0FBYTs7O1lBQWI7Z0JBQ0ksUUFBUSxJQUFJLENBQUMsSUFBSTtvQkFDYixLQUFLLFFBQVE7d0JBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUE7b0JBQzlELEtBQUssUUFBUTt3QkFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDOUQsS0FBSyxTQUFTO3dCQUNWLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7b0JBRTNCOzt3QkFDSSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTt3QkFFMUIsSUFBSTs0QkFDQSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO3lCQUN6Qzt3QkFBQyxPQUFPLEtBQUssRUFBRSxHQUFHO3dCQUVuQixPQUFPLEdBQUcsSUFBSSxJQUFJLENBQUE7aUJBQ3pCO2FBQ0o7Ozs7UUFFRCx3Q0FBUzs7O1lBQVQ7O2dCQUNJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUE7Z0JBRTNCLFFBQVEsSUFBSSxDQUFDLElBQUk7b0JBQ2IsS0FBSyxRQUFRO3dCQUNULElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFBO3dCQUNoRCxNQUFLO29CQUNULEtBQUssUUFBUTt3QkFDVCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDaEQsTUFBSztvQkFDVCxLQUFLLFNBQVM7d0JBQ1YsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDMUIsTUFBSztvQkFFVDt3QkFDSSxJQUFJOzRCQUNBLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO3lCQUM1Qjt3QkFBQyxPQUFPLEtBQUssRUFBRSxHQUFHO3dCQUVuQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFBO2lCQUNyQzthQUNKOzs7O1FBRUQsdUNBQVE7OztZQUFSO2dCQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRW5DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO2dCQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQTthQUNyRjs7OztRQUVELDJDQUFZOzs7WUFBWjtnQkFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFBO2FBQzFEOztvQkF4RUpELGNBQVMsU0FBQzt3QkFDUCxRQUFRLEVBQUUsaUJBQWlCO3dCQUMzQixRQUFRLEVBQUUsa2RBS1A7d0JBQ0gsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO3FCQUNmOzs7NEJBSUlDLFVBQUssU0FBQyxPQUFPOzttQ0FmbEI7Ozs7Ozs7QUNBQTs7OztvQkFVQ0MsYUFBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7NEJBQ1pDLGlCQUFXO3lCQUNaO3dCQUNELFlBQVksRUFBRTs0QkFDWixjQUFjOzRCQUNkLGdCQUFnQjs0QkFDaEIsaUJBQWlCOzRCQUNqQixzQkFBc0I7NEJBQ3RCLG1CQUFtQjs0QkFDbkIsb0JBQW9CO3lCQUNyQjt3QkFDRCxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUM7cUJBQzFCOzswQkF4QkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9