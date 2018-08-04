/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { DocumentationService } from './documentation-service';
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
export { testService };
if (false) {
    /** @type {?} */
    testService.prototype.doc;
    /** @type {?} */
    testService.prototype.openedDoc;
    /** @type {?} */
    testService.prototype.testResults;
    /** @type {?} */
    testService.prototype.tests;
    /** @type {?} */
    testService.prototype.flatTests;
    /** @type {?} */
    testService.prototype.testTypes;
    /** @type {?} */
    testService.prototype.shownTestsState;
}
/** @type {?} */
export var TestService = new testService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3Rlc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFFOUQsSUFBQTs7bUJBQ2UsRUFBRTt5QkFDRCxxQkFBcUI7MkJBQ2Q7WUFDZixlQUFlLEVBQUUsS0FBSztZQUN0QixLQUFLLEVBQUUsRUFBRTtTQUNaO3FCQUVZLEVBQUU7eUJBQ0UsRUFBRTt5QkFDRjtZQUNiLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLGlCQUFpQixFQUFFLEVBQUU7WUFDckIsVUFBVSxFQUFFLEVBQUU7WUFDZCxRQUFRLEVBQUUsRUFBRTtTQUNmOytCQUNpQixFQUFFOzs7Ozs7SUFFcEIsOEJBQVE7Ozs7SUFBUixVQUFTLEtBQVU7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUE7O1FBRTVFLElBQU0sV0FBVyxHQUFHO1lBQ2hCLFNBQVM7WUFDVCxZQUFZO1lBQ1oscUJBQXFCO1lBQ3JCLFNBQVM7U0FDWixDQUFBO1FBRUQsR0FBRyxDQUFDLENBQUMsSUFBTSxJQUFJLElBQUksb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUUzQixPQUFPO29CQUNkLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FB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QUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLE9BQU8sQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFBO2lCQUNsQzthQUNKLENBQUE7WUFFRCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDVCxDQUFDLENBQUE7S0FDTDs7Ozs7SUFFRCxxQ0FBZTs7OztJQUFmLFVBQWdCLFNBQWlCO1FBQzdCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ25CLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO1NBQzFCO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUE7U0FDbEM7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFBO1NBQ3ZDO1FBRUQsTUFBTSxDQUFDLEVBQUUsQ0FBQTtLQUNaO3NCQTNaTDtJQTRaQyxDQUFBO0FBMVpELHVCQTBaQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsV0FBVyxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERvY3VtZW50YXRpb25TZXJ2aWNlIH0gZnJvbSAnLi9kb2N1bWVudGF0aW9uLXNlcnZpY2UnXG5cbmV4cG9ydCBjbGFzcyB0ZXN0U2VydmljZSB7XG4gICAgZG9jOiBhbnkgPSB7fVxuICAgIG9wZW5lZERvYyA9ICdkb2MtYWN0aXZlLWRyb3Bkb3duJ1xuICAgIHRlc3RSZXN1bHRzOiBhbnkgPSB7XG4gICAgICAgIHRlc3RzQXJlUnVubmluZzogZmFsc2UsXG4gICAgICAgIHRlc3RzOiB7fVxuICAgIH1cblxuICAgIHRlc3RzOiBhbnkgPSB7fVxuICAgIGZsYXRUZXN0czogYW55ID0ge31cbiAgICB0ZXN0VHlwZXM6IGFueSA9IHtcbiAgICAgICAgY2xhc3M6IFtdLFxuICAgICAgICBjb21wb25lbnRzOiBbXSxcbiAgICAgICAgbW9kdWxlczogW10sXG4gICAgICAgICdvYmplY3QgbGl0ZXJhbHMnOiBbXSxcbiAgICAgICAgaW50ZXJmYWNlczogW10sXG4gICAgICAgIHZhcmlhYmxlOiBbXVxuICAgIH1cbiAgICBzaG93blRlc3RzU3RhdGUgPSBgYFxuXG4gICAgc2V0VGVzdHModGVzdHM6IGFueSkge1xuICAgICAgICB0aGlzLnRlc3RzID0gdGVzdHNcbiAgICAgICAgdGhpcy50ZXN0VHlwZXMuY2xhc3MgPSBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdHMsIGBjbGFzc2AsIFtdKVxuXG4gICAgICAgIGNvbnN0IHR5cGVzVG9UZXN0ID0gW1xuICAgICAgICAgICAgYG1ldGhvZHNgLFxuICAgICAgICAgICAgYHByb3BlcnRpZXNgLFxuICAgICAgICAgICAgYGF0dHJpYnV0ZVByb3BlcnRpZXNgLFxuICAgICAgICAgICAgYGdldHRlcnNgXG4gICAgICAgIF1cblxuICAgICAgICBmb3IgKGNvbnN0IHR5cGUgaW4gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGEpIHtcbiAgICAgICAgICAgIGlmIChEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YVt0eXBlXSkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBkb2NOYW1lIGluIERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YVt0eXBlXVtkb2NOYW1lXSAmJiBkb2NOYW1lICE9PSBgRG9jdW1lbnRhdGlvblNlcnZpY2VgICYmIGRvY05hbWUgIT09IGBUZXN0U2VydmljZWApIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZVRlc3QgPSBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFR5cGVzLCBgJHt0eXBlfS4ke2RvY05hbWV9YCwgeyB0ZXN0czogW10gfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlcnZpY2VUZXN0VGVzdHM6IGFueSA9IHt9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXJ2aWNlVGVzdC50ZXN0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2VUZXN0LnRlc3RzLmZvckVhY2goKHRlc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ycyA9IHRlc3QuZm9yXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JzID0gdGVzdC5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZm9ycyAmJiBBcnJheS5pc0FycmF5KGZvcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JzLmZvckVhY2goX2ZvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXJ2aWNlVGVzdFRlc3RzW19mb3JdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2VUZXN0VGVzdHNbX2Zvcl0gPSBbdGVzdF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tfZm9yXS5wdXNoKHRlc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tmb3JzXSA9IFt0ZXN0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tmb3JzXS5wdXNoKHRlc3QpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV1bZG9jTmFtZV0uY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdW2RvY05hbWVdLmNoaWxkcmVuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBjaGlsZE5hbWUgaW4gY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkcmVuW2NoaWxkTmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIWNoaWxkcmVuW2NoaWxkTmFtZV0gJiYgdHlwZXNUb1Rlc3QuaW5kZXhPZihjaGlsZE5hbWUpID4gLTEpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcHJvcE5hbWUgaW4gY2hpbGRyZW5bY2hpbGROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5bY2hpbGROYW1lXVtwcm9wTmFtZV0gJiYgdHlwZW9mIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdID09PSBgb2JqZWN0YCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVzdENhc2VzID0gc2VydmljZVRlc3RUZXN0c1twcm9wTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhbk1hcCA9ICEhdGVzdENhc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltjaGlsZE5hbWVdW3Byb3BOYW1lXS50ZXN0cyA9IHNlcnZpY2VUZXN0VGVzdHNbcHJvcE5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbltjaGlsZE5hbWVdW3Byb3BOYW1lXS50ZXN0Q2FzZXMgPSBjYW5NYXAgPyB0ZXN0Q2FzZXMubWFwKCh0ZXN0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXNzZXJ0cyA9IHRlc3QubmFtZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRlc3QuYXNzZXJ0cyAmJiB0ZXN0LmFzc2VydHMubWFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydHMgPSB0ZXN0LmFzc2VydHMubWFwKChhc3NlcnQ6IGFueSkgPT4gYXNzZXJ0Lm5hbWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGVzdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhc3NlcnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkgOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzVGVzdFJhbihkb2M6IHN0cmluZywgdGVzdE5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFJlc3VsdHMudGVzdHMsIGAke2RvY30ucmVzdWx0cy4ke3Rlc3ROYW1lfWApXG4gICAgfVxuXG4gICAgaGFzVGVzdFBhc3NlZChkb2M6IHN0cmluZywgdGVzdE5hbWU6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJlc3VsdHMuJHt0ZXN0TmFtZX0ucGFzc2ApXG4gICAgfVxuXG4gICAgZ2V0VGVzdEFzc2VydFJlc3VsdChkb2M6IHN0cmluZywgdGVzdE5hbWU6IHN0cmluZywgaW5kZXg6IG51bWJlcikge1xuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9LnJlc3VsdHMuJHtpbmRleH1gKVxuICAgIH1cblxuICAgIGhhc1Rlc3RBc3NlcnRzKGRvYzogc3RyaW5nLCB0ZXN0SW5kZXg6IG51bWJlcikge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhc3NlcnRzOiBBcnJheTxhbnk+ID0gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RzLCBgJHtkb2N9LnRlc3RzLiR7dGVzdEluZGV4fS5hc3NlcnRzYClcbiAgICAgICAgY29uc3QgYXNzZXJ0S2V5czogQXJyYXk8c3RyaW5nPiA9IFtdXG5cbiAgICAgICAgaWYgKGFzc2VydHMpIHtcbiAgICAgICAgICAgIGFzc2VydHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGFzc2VydEtleXMucHVzaChlbGVtZW50Lm5hbWUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0S2V5cy5wdXNoKGVsZW1lbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhc3NlcnRLZXlzXG4gICAgfVxuXG4gICAgaXNUZXN0UnVubmluZyhkb2M6IHN0cmluZywgdGVzdE5hbWU/OiBzdHJpbmcpIHtcblxuICAgICAgICBpZiAoIWRvYykge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0ZXN0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5ydW5uaW5nYClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFJlc3VsdHMudGVzdHMsIGAke2RvY30ucmVzdWx0cy4ke3Rlc3ROYW1lfS5ydW5uaW5nYClcbiAgICB9XG5cbiAgICBnZXRUZXN0cyhkb2M6IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLnRlc3RzW2RvY10gfHwgdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgcnVuQXNzZXJ0cyh0ZXN0OiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRlc3QucmVzdWx0cyA9IFtdXG5cbiAgICAgICAgICAgIGNvbnN0IHJ1bkFzc2VydCA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCF0ZXN0LmFzc2VydHNbaW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHRlc3QucmVzdWx0cylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQga2V5OiBhbnkgPSB0ZXN0LmFzc2VydHNbaW5kZXhdXG4gICAgICAgICAgICAgICAgbGV0IGZuOiBGdW5jdGlvbiA9ICgpID0+IHsgfVxuICAgICAgICAgICAgICAgIGxldCBwcmU6IEZ1bmN0aW9uIHwgbnVsbCA9IG51bGxcbiAgICAgICAgICAgICAgICBsZXQgdmFsOiBhbnlcblxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSBgc3RyaW5nYCkge1xuICAgICAgICAgICAgICAgICAgICBmbiA9IHRlc3QubWV0aG9kc1trZXldXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGVzdC5hc3NlcnRzW2luZGV4XSA9PT0gYG9iamVjdGApIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0gdGVzdC5hc3NlcnRzW2luZGV4XS5uYW1lXG4gICAgICAgICAgICAgICAgICAgIGZuID0gdGVzdC5hc3NlcnRzW2luZGV4XS5mblxuICAgICAgICAgICAgICAgICAgICBwcmUgPSB0ZXN0LmFzc2VydHNbaW5kZXhdLnByZSB8fCBwcmVcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzZXRSZXN1bHQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6IHRydWUsIG1lc3NhZ2U6IHJlcywga2V5IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkFzc2VydChpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVzdC5yZXN1bHRzLnB1c2goeyBwYXNzOiBmYWxzZSwgbWVzc2FnZTogcmVzLCBrZXkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdC5yZXN1bHRzLnB1c2goeyBwYXNzOiAhIXZhbCwgbWVzc2FnZTogdmFsLCBrZXkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkFzc2VydChpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIXByZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSBmbigpXG4gICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdCgpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBmbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bkFzc2VydCgwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHJ1blRlc3QodGVzdDogYW55LCBncm91cEtleTogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0FyZVJ1bm5pbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIGlmICghdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXSkge1xuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV0gPSB7fVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bZ3JvdXBLZXldKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHt9LFxuICAgICAgICAgICAgICAgICAgICBydW5uaW5nOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5ydW5uaW5nID0gdHJ1ZVxuXG4gICAgICAgICAgICBjb25zdCBzZXRSZXN1bHRzID0gKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0ucnVubmluZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0ucmVzdWx0c1t0ZXN0Lm5hbWVdID0gcmVzXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c0FyZVJ1bm5pbmcgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5wYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJlcylcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KHJlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmluaXNoQXNzZXJ0ID0gKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHBhc3NlZCA9IHRydWVcblxuICAgICAgICAgICAgICAgIHJlcy5mb3JFYWNoKChlbGVtZW50OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50LnBhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NlZCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgc2V0UmVzdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgIHBhc3M6IHBhc3NlZCxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYGAsXG4gICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbm93LFxuICAgICAgICAgICAgICAgICAgICBydW5uaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0ucmVzdWx0c1t0ZXN0Lm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIHBhc3M6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBgYCxcbiAgICAgICAgICAgICAgICB0aW1lOiAwLFxuICAgICAgICAgICAgICAgIHJ1bm5pbmc6IHRydWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRlc3QuYXNzZXJ0cyAmJiB0ZXN0LmFzc2VydHMubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJ1bkFzc2VydHModGVzdCkudGhlbihmaW5pc2hBc3NlcnQsIGZpbmlzaEFzc2VydClcblxuICAgICAgICAgICAgfSBlbHNlIGlmICh0ZXN0LmZuICYmIHR5cGVvZiB0ZXN0LmZuID09PSBgZnVuY3Rpb25gKSB7XG4gICAgICAgICAgICAgICAgdGVzdC5mbigpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIG5vdyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5uaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sIChyZWo6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzczogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogcmVqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlalxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgIH1cblxuICAgIHJ1blRlc3RHcm91cChncm91cDogYW55LCB0eXBlOiBzdHJpbmcpIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdID0ge1xuICAgICAgICAgICAgICAgIHBhc3M6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICByZXN1bHRzOiB7fVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzZXRSZXN1bHRzID0gKHJlczogYW55LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FudFVwZGF0ZVBhc3MgPSB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdLnBhc3MgPT09IGZhbHNlXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3UGFzcyA9IGNhbnRVcGRhdGVQYXNzID8gdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1tncm91cC5uYW1lXS5wYXNzIDogcmVzLnBhc3NcblxuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucGFzcyA9IG5ld1Bhc3NcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdLnJlc3VsdHNbZ3JvdXAudGVzdHNbaW5kZXhdLm5hbWVdID0gcmVzXG5cbiAgICAgICAgICAgICAgICBydW4oaW5kZXggKyAxKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBydW4gPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChncm91cC50ZXN0c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5UZXN0KGdyb3VwLnRlc3RzW2luZGV4XSwgZ3JvdXAubmFtZSwgdHlwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdHMocmVzLCBpbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyhyZXMsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy50ZXN0UmVzdWx0cy50ZXN0c1tncm91cC5uYW1lXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bigwKVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2MgUnVucyBhbGwgdGVzdHNcbiAgICAgKiBAcGFyYW0gdGVzdCAtIHRlc3RpbmcgcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKi9cbiAgICBydW5UZXN0cyh0ZXN0PzogeyBpZDogc3RyaW5nIH0pIHtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBydW4gPSAoaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBPYmplY3Qua2V5cyh0aGlzLnRlc3RzKVtpbmRleF1cbiAgICAgICAgICAgICAgICBjb25zdCB0aGlzVGVzdEdyb3VwID0gdGhpcy50ZXN0c1t0eXBlXVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNUZXN0R3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnVuR3JvdXAgPSAoZ3JvdXBJbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0aGlzVGVzdCA9IHRoaXNUZXN0R3JvdXBbT2JqZWN0LmtleXModGhpc1Rlc3RHcm91cClbZ3JvdXBJbmRleF1dXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzVGVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucnVuVGVzdEdyb3VwKHRoaXNUZXN0LCB0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bdGhpc1Rlc3QubmFtZV0gPSByZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkdyb3VwKGdyb3VwSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAocmVqOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bdGhpc1Rlc3QubmFtZV0gPSByZWpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bkdyb3VwKGdyb3VwSW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW4oaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoMClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMudGVzdFJlc3VsdHMudGVzdHMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBydW4oMClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRGb3JtYXRlZFRpbWUodGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgaWYgKHRpbWVzdGFtcCA8IDEwMDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aW1lc3RhbXAgKyBgbXNgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZXN0YW1wIDwgMTAwMCAqIDYwKSB7XG4gICAgICAgICAgICByZXR1cm4gKHRpbWVzdGFtcCAvIDEwMDApICsgYHNgXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZXN0YW1wIDwgMTAwMCAqIDYwICogNjApIHtcbiAgICAgICAgICAgIHJldHVybiAodGltZXN0YW1wIC8gMTAwMCAqIDYwKSArIGBtYFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGBgXG4gICAgfVxufVxuXG5leHBvcnQgbGV0IFRlc3RTZXJ2aWNlID0gbmV3IHRlc3RTZXJ2aWNlKClcbiJdfQ==