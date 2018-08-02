/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DocumentationService } from './documentation-service';
export class testService {
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
function testService_tsickle_Closure_declarations() {
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
export let TestService = new testService();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZG9ja3MtYW5ndWxhci8iLCJzb3VyY2VzIjpbInNyYy9tb2R1bGVzL2RvY2tzL3Rlc3Qtc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0seUJBQXlCLENBQUE7QUFFOUQsTUFBTTs7bUJBQ1MsRUFBRTt5QkFDRCxxQkFBcUI7MkJBQ2Q7WUFDZixlQUFlLEVBQUUsS0FBSztZQUN0QixLQUFLLEVBQUUsRUFBRTtTQUNaO3FCQUVZLEVBQUU7eUJBQ0UsRUFBRTt5QkFDRjtZQUNiLEtBQUssRUFBRSxFQUFFO1lBQ1QsVUFBVSxFQUFFLEVBQUU7WUFDZCxPQUFPLEVBQUUsRUFBRTtZQUNYLGlCQUFpQixFQUFFLEVBQUU7WUFDckIsVUFBVSxFQUFFLEVBQUU7WUFDZCxRQUFRLEVBQUUsRUFBRTtTQUNmOytCQUNpQixFQUFFOzs7Ozs7SUFFcEIsUUFBUSxDQUFDLEtBQVU7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUE7O1FBRTVFLE1BQU0sV0FBVyxHQUFHO1lBQ2hCLFNBQVM7WUFDVCxZQUFZO1lBQ1oscUJBQXFCO1lBQ3JCLFNBQVM7U0FDWixDQUFBO1FBRUQsR0FBRyxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV0QyxHQUFHLENBQUMsQ0FBQyxNQUFNLE9BQU8sSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxFQUFFLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksT0FBTyxLQUFLLHNCQUFzQixJQUFJLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDOzt3QkFFbEgsTUFBTSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLElBQUksT0FBTyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQTs7d0JBQ3JHLE1BQU0sZ0JBQWdCLEdBQVEsRUFBRSxDQUFBO3dCQUVoQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs0QkFDcEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTs7Z0NBQ3BDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7Z0NBRW5CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztvQ0FDUixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtpQ0FDbkI7Z0NBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO3dDQUNoQixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0Q0FDMUIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTs0Q0FDL0IsTUFBTSxDQUFBO3lDQUNUO3dDQUVELGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtxQ0FDcEMsQ0FBQyxDQUFBO2lDQUNMO2dDQUFDLElBQUksQ0FBQyxDQUFDO29DQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUMxQixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO3dDQUMvQixNQUFNLENBQUE7cUNBQ1Q7b0NBQ0QsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2lDQUNwQzs2QkFDSixDQUFDLENBQUE7eUJBQ0w7d0JBRUQsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OzRCQUN4RCxNQUFNLFFBQVEsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFBOzRCQUN0RSxHQUFHLENBQUMsQ0FBQyxNQUFNLFNBQVMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dDQUMvQixFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29DQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dDQUUvRCxHQUFHLENBQUMsQ0FBQyxNQUFNLFFBQVEsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRDQUN6QyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0RBQ3JGLE1BQU0sU0FBUyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFBOztnREFDNUMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQTtnREFDMUIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtnREFDaEUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTs7b0RBQzNFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7b0RBRXZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dEQUNuQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtxREFDM0Q7b0RBRUQsTUFBTSxDQUFDO3dEQUNILElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTt3REFDZixPQUFPO3FEQUNWLENBQUE7aURBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUE7NkNBQ1Y7eUNBQ0o7cUNBQ0o7aUNBQ0o7NkJBQ0o7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO0tBQ0o7Ozs7OztJQUVELFVBQVUsQ0FBQyxHQUFXLEVBQUUsUUFBZ0I7UUFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ1AsTUFBTSxDQUFDLEtBQUssQ0FBQTtTQUNmO1FBRUQsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEdBQUcsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0tBQzVGOzs7Ozs7SUFFRCxhQUFhLENBQUMsR0FBVyxFQUFFLFFBQWdCO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUE7U0FDbkI7UUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxZQUFZLFFBQVEsT0FBTyxDQUFDLENBQUE7S0FDakc7Ozs7Ozs7SUFFRCxtQkFBbUIsQ0FBQyxHQUFXLEVBQUUsUUFBZ0IsRUFBRSxLQUFhO1FBQzVELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUE7U0FDbkI7UUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxZQUFZLFFBQVEsWUFBWSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0tBQzdHOzs7Ozs7SUFFRCxjQUFjLENBQUMsR0FBVyxFQUFFLFNBQWlCO1FBRXpDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUE7U0FDbkI7O1FBRUQsTUFBTSxPQUFPLEdBQWUsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLFVBQVUsU0FBUyxVQUFVLENBQUMsQ0FBQTs7UUFDekcsTUFBTSxVQUFVLEdBQWtCLEVBQUUsQ0FBQTtRQUVwQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDdEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ2YsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7aUJBQ2hDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNKLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7aUJBQzNCO2FBQ0osQ0FBQyxDQUFBO1NBQ0w7UUFFRCxNQUFNLENBQUMsVUFBVSxDQUFBO0tBQ3BCOzs7Ozs7SUFFRCxhQUFhLENBQUMsR0FBVyxFQUFFLFFBQWlCO1FBRXhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNQLE1BQU0sQ0FBQyxTQUFTLENBQUE7U0FDbkI7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsR0FBRyxVQUFVLENBQUMsQ0FBQTtTQUNoRjtRQUVELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsR0FBRyxHQUFHLFlBQVksUUFBUSxVQUFVLENBQUMsQ0FBQTtLQUNwRzs7Ozs7SUFFRCxRQUFRLENBQUMsR0FBVztRQUVoQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDUCxNQUFNLENBQUMsS0FBSyxDQUFBO1NBQ2Y7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUE7S0FDdEM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQVM7UUFDaEIsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBOztZQUVqQixNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO2dCQUNoQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtpQkFDL0I7O2dCQUVELElBQUksR0FBRyxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7O2dCQUNsQyxJQUFJLEVBQUUsR0FBYSxHQUFHLEVBQUUsSUFBSSxDQUFBOztnQkFDNUIsSUFBSSxHQUFHLEdBQW9CLElBQUksQ0FBQTs7Z0JBQy9CLElBQUksR0FBRyxDQUFLO2dCQUVaLEVBQUUsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUN6QjtnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQTtvQkFDOUIsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFBO29CQUMzQixHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFBO2lCQUN2Qzs7Z0JBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxFQUFFO29CQUNuQixFQUFFLENBQUMsQ0FBQyxHQUFHLFlBQVksT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDekIsR0FBRzs2QkFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTs0QkFDcEQsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTt5QkFDdkIsQ0FBQzs2QkFDRCxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTs0QkFDckQsU0FBUyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTt5QkFDdkIsQ0FBQyxDQUFBO3FCQUNUO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFBO3dCQUNyRCxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFBO3FCQUN2QjtpQkFDSixDQUFBO2dCQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDUCxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUE7b0JBQ1YsU0FBUyxFQUFFLENBQUE7aUJBQ2Q7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osR0FBRyxFQUFFO3lCQUNBLElBQUksQ0FBQyxHQUFHLEVBQUU7d0JBQ1AsR0FBRyxHQUFHLEVBQUUsRUFBRSxDQUFBO3dCQUNWLFNBQVMsRUFBRSxDQUFBO3FCQUNkLENBQUM7eUJBQ0QsS0FBSyxDQUFDLEdBQUcsRUFBRTt3QkFDUixHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUE7d0JBQ1YsU0FBUyxFQUFFLENBQUE7cUJBQ2QsQ0FBQyxDQUFBO2lCQUNUO2FBQ0osQ0FBQTtZQUVELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNmLENBQUMsQ0FBQTtLQUNMOzs7Ozs7O0lBRUQsT0FBTyxDQUFDLElBQVMsRUFBRSxRQUFnQixFQUFFLElBQVk7O1FBQzdDLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUE7UUFFaEMsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQTtZQUV2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBO2FBQ3BDO1lBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHO29CQUNyQyxJQUFJLEVBQUUsQ0FBQztvQkFDUCxPQUFPLEVBQUUsRUFBRTtvQkFDWCxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQTthQUNKO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQTs7WUFFckQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQTtnQkFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUE7Z0JBQy9ELElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQTtnQkFFeEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ1gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQTtpQkFDdEI7Z0JBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNyQixDQUFBOztZQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7O2dCQUM5QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUE7Z0JBRWpCLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRTtvQkFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsTUFBTSxHQUFHLEtBQUssQ0FBQTtxQkFDakI7aUJBQ0osQ0FBQyxDQUFBO2dCQUVGLFVBQVUsQ0FBQztvQkFDUCxJQUFJLEVBQUUsTUFBTTtvQkFDWixPQUFPLEVBQUUsRUFBRTtvQkFDWCxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxHQUFHO29CQUNoQyxPQUFPLEVBQUUsS0FBSztvQkFDZCxPQUFPLEVBQUUsR0FBRztpQkFDZixDQUFDLENBQUE7YUFDTCxDQUFBO1lBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRztnQkFDeEQsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQTtZQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUE7YUFFekQ7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDbEQsSUFBSSxDQUFDLEVBQUUsRUFBRTtxQkFDSixJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDZixVQUFVLENBQUM7d0JBQ1AsSUFBSSxFQUFFLElBQUk7d0JBQ1YsT0FBTyxFQUFFLEVBQUU7d0JBQ1gsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRzt3QkFDaEMsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTyxFQUFFLEdBQUc7cUJBQ2YsQ0FBQyxDQUFBO2lCQUNMLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtvQkFDWixVQUFVLENBQUM7d0JBQ1AsSUFBSSxFQUFFLEtBQUs7d0JBQ1gsT0FBTyxFQUFFLEdBQUc7d0JBQ1osSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRzt3QkFDaEMsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsT0FBTyxFQUFFLEdBQUc7cUJBQ2YsQ0FBQyxDQUFBO2lCQUNMLENBQUMsQ0FBQTthQUNUO1NBQ0osQ0FBQyxDQUFBO0tBRUw7Ozs7OztJQUVELFlBQVksQ0FBQyxLQUFVLEVBQUUsSUFBWTtRQUVqQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFFbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUNqQyxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsRUFBRTthQUNkLENBQUE7O1lBRUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFRLEVBQUUsS0FBYSxFQUFFLEVBQUU7O2dCQUMzQyxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQTs7Z0JBQ3hFLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQTtnQkFFbkYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7Z0JBQ2pELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUE7Z0JBRXpFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7YUFDakIsQ0FBQTs7WUFFRCxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO3lCQUM3QyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTt3QkFDZixVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO3FCQUN6QixDQUFDO3lCQUNELEtBQUssQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO3dCQUNoQixVQUFVLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFBO3FCQUN6QixDQUFDLENBQUE7aUJBRVQ7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO2lCQUM5QzthQUNKLENBQUE7WUFFRCxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7U0FDVCxDQUFDLENBQUE7S0FFTDs7Ozs7O0lBTUQsUUFBUSxDQUFDLElBQXFCO1FBRTFCLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTs7WUFFbkMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTs7Z0JBQzFCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBOztnQkFDM0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFFdEMsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7b0JBQ2hCLE1BQU0sUUFBUSxHQUFHLENBQUMsVUFBa0IsRUFBRSxFQUFFOzt3QkFDcEMsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTt3QkFFdEUsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs0QkFDWCxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7aUNBQzVCLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dDQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUE7Z0NBQ2pELFFBQVEsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUE7NkJBQzNCLEVBQUUsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQ0FDWixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFBO2dDQUNqRCxRQUFRLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFBOzZCQUMzQixDQUFDLENBQUE7eUJBQ1Q7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ0osR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTt5QkFDakI7cUJBQ0osQ0FBQTtvQkFFRCxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ2Q7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ2xDO2FBQ0osQ0FBQTtZQUVELEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNULENBQUMsQ0FBQTtLQUNMOzs7OztJQUVELGVBQWUsQ0FBQyxTQUFpQjtRQUM3QixFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtTQUMxQjtRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFBO1NBQ2xDO1FBRUQsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtTQUN2QztRQUVELE1BQU0sQ0FBQyxFQUFFLENBQUE7S0FDWjtDQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxXQUFXLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9jdW1lbnRhdGlvblNlcnZpY2UgfSBmcm9tICcuL2RvY3VtZW50YXRpb24tc2VydmljZSdcblxuZXhwb3J0IGNsYXNzIHRlc3RTZXJ2aWNlIHtcbiAgICBkb2M6IGFueSA9IHt9XG4gICAgb3BlbmVkRG9jID0gJ2RvYy1hY3RpdmUtZHJvcGRvd24nXG4gICAgdGVzdFJlc3VsdHM6IGFueSA9IHtcbiAgICAgICAgdGVzdHNBcmVSdW5uaW5nOiBmYWxzZSxcbiAgICAgICAgdGVzdHM6IHt9XG4gICAgfVxuXG4gICAgdGVzdHM6IGFueSA9IHt9XG4gICAgZmxhdFRlc3RzOiBhbnkgPSB7fVxuICAgIHRlc3RUeXBlczogYW55ID0ge1xuICAgICAgICBjbGFzczogW10sXG4gICAgICAgIGNvbXBvbmVudHM6IFtdLFxuICAgICAgICBtb2R1bGVzOiBbXSxcbiAgICAgICAgJ29iamVjdCBsaXRlcmFscyc6IFtdLFxuICAgICAgICBpbnRlcmZhY2VzOiBbXSxcbiAgICAgICAgdmFyaWFibGU6IFtdXG4gICAgfVxuICAgIHNob3duVGVzdHNTdGF0ZSA9IGBgXG5cbiAgICBzZXRUZXN0cyh0ZXN0czogYW55KSB7XG4gICAgICAgIHRoaXMudGVzdHMgPSB0ZXN0c1xuICAgICAgICB0aGlzLnRlc3RUeXBlcy5jbGFzcyA9IERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0cywgYGNsYXNzYCwgW10pXG5cbiAgICAgICAgY29uc3QgdHlwZXNUb1Rlc3QgPSBbXG4gICAgICAgICAgICBgbWV0aG9kc2AsXG4gICAgICAgICAgICBgcHJvcGVydGllc2AsXG4gICAgICAgICAgICBgYXR0cmlidXRlUHJvcGVydGllc2AsXG4gICAgICAgICAgICBgZ2V0dGVyc2BcbiAgICAgICAgXVxuXG4gICAgICAgIGZvciAoY29uc3QgdHlwZSBpbiBEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YSkge1xuICAgICAgICAgICAgaWYgKERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGRvY05hbWUgaW4gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKERvY3VtZW50YXRpb25TZXJ2aWNlLkRvY3NEYXRhW3R5cGVdW2RvY05hbWVdICYmIGRvY05hbWUgIT09IGBEb2N1bWVudGF0aW9uU2VydmljZWAgJiYgZG9jTmFtZSAhPT0gYFRlc3RTZXJ2aWNlYCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXJ2aWNlVGVzdCA9IERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0VHlwZXMsIGAke3R5cGV9LiR7ZG9jTmFtZX1gLCB7IHRlc3RzOiBbXSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VydmljZVRlc3RUZXN0czogYW55ID0ge31cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlcnZpY2VUZXN0LnRlc3RzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3QudGVzdHMuZm9yRWFjaCgodGVzdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JzID0gdGVzdC5mb3JcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWZvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcnMgPSB0ZXN0Lm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmb3JzICYmIEFycmF5LmlzQXJyYXkoZm9ycykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcnMuZm9yRWFjaChfZm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2VUZXN0VGVzdHNbX2Zvcl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VydmljZVRlc3RUZXN0c1tfZm9yXSA9IFt0ZXN0XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW19mb3JdLnB1c2godGVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2VUZXN0VGVzdHNbZm9yc10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdID0gW3Rlc3RdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlVGVzdFRlc3RzW2ZvcnNdLnB1c2godGVzdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChEb2N1bWVudGF0aW9uU2VydmljZS5Eb2NzRGF0YVt0eXBlXVtkb2NOYW1lXS5jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gRG9jdW1lbnRhdGlvblNlcnZpY2UuRG9jc0RhdGFbdHlwZV1bZG9jTmFtZV0uY2hpbGRyZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGNoaWxkTmFtZSBpbiBjaGlsZHJlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5bY2hpbGROYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhY2hpbGRyZW5bY2hpbGROYW1lXSAmJiB0eXBlc1RvVGVzdC5pbmRleE9mKGNoaWxkTmFtZSkgPiAtMSkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBwcm9wTmFtZSBpbiBjaGlsZHJlbltjaGlsZE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbltjaGlsZE5hbWVdW3Byb3BOYW1lXSAmJiB0eXBlb2YgY2hpbGRyZW5bY2hpbGROYW1lXVtwcm9wTmFtZV0gPT09IGBvYmplY3RgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZXN0Q2FzZXMgPSBzZXJ2aWNlVGVzdFRlc3RzW3Byb3BOYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FuTWFwID0gISF0ZXN0Q2FzZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdLnRlc3RzID0gc2VydmljZVRlc3RUZXN0c1twcm9wTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV1bcHJvcE5hbWVdLnRlc3RDYXNlcyA9IGNhbk1hcCA/IHRlc3RDYXNlcy5tYXAoKHRlc3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NlcnRzID0gdGVzdC5uYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGVzdC5hc3NlcnRzICYmIHRlc3QuYXNzZXJ0cy5tYXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0cyA9IHRlc3QuYXNzZXJ0cy5tYXAoKGFzc2VydDogYW55KSA9PiBhc3NlcnQubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0ZXN0Lm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSA6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNUZXN0UmFuKGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9YClcbiAgICB9XG5cbiAgICBoYXNUZXN0UGFzc2VkKGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdFJlc3VsdHMudGVzdHMsIGAke2RvY30ucmVzdWx0cy4ke3Rlc3ROYW1lfS5wYXNzYClcbiAgICB9XG5cbiAgICBnZXRUZXN0QXNzZXJ0UmVzdWx0KGRvYzogc3RyaW5nLCB0ZXN0TmFtZTogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJlc3VsdHMuJHt0ZXN0TmFtZX0ucmVzdWx0cy4ke2luZGV4fWApXG4gICAgfVxuXG4gICAgaGFzVGVzdEFzc2VydHMoZG9jOiBzdHJpbmcsIHRlc3RJbmRleDogbnVtYmVyKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFzc2VydHM6IEFycmF5PGFueT4gPSBEb2N1bWVudGF0aW9uU2VydmljZS5nZXRUaGlzKHRoaXMudGVzdHMsIGAke2RvY30udGVzdHMuJHt0ZXN0SW5kZXh9LmFzc2VydHNgKVxuICAgICAgICBjb25zdCBhc3NlcnRLZXlzOiBBcnJheTxzdHJpbmc+ID0gW11cblxuICAgICAgICBpZiAoYXNzZXJ0cykge1xuICAgICAgICAgICAgYXNzZXJ0cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXNzZXJ0S2V5cy5wdXNoKGVsZW1lbnQubmFtZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhc3NlcnRLZXlzLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzc2VydEtleXNcbiAgICB9XG5cbiAgICBpc1Rlc3RSdW5uaW5nKGRvYzogc3RyaW5nLCB0ZXN0TmFtZT86IHN0cmluZykge1xuXG4gICAgICAgIGlmICghZG9jKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRlc3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gRG9jdW1lbnRhdGlvblNlcnZpY2UuZ2V0VGhpcyh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzLCBgJHtkb2N9LnJ1bm5pbmdgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIERvY3VtZW50YXRpb25TZXJ2aWNlLmdldFRoaXModGhpcy50ZXN0UmVzdWx0cy50ZXN0cywgYCR7ZG9jfS5yZXN1bHRzLiR7dGVzdE5hbWV9LnJ1bm5pbmdgKVxuICAgIH1cblxuICAgIGdldFRlc3RzKGRvYzogc3RyaW5nKSB7XG5cbiAgICAgICAgaWYgKCFkb2MpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudGVzdHNbZG9jXSB8fCB1bmRlZmluZWRcbiAgICB9XG5cbiAgICBydW5Bc3NlcnRzKHRlc3Q6IGFueSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGVzdC5yZXN1bHRzID0gW11cblxuICAgICAgICAgICAgY29uc3QgcnVuQXNzZXJ0ID0gKGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRlc3QuYXNzZXJ0c1tpbmRleF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUodGVzdC5yZXN1bHRzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBrZXk6IGFueSA9IHRlc3QuYXNzZXJ0c1tpbmRleF1cbiAgICAgICAgICAgICAgICBsZXQgZm46IEZ1bmN0aW9uID0gKCkgPT4geyB9XG4gICAgICAgICAgICAgICAgbGV0IHByZTogRnVuY3Rpb24gfCBudWxsID0gbnVsbFxuICAgICAgICAgICAgICAgIGxldCB2YWw6IGFueVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgPT09IGBzdHJpbmdgKSB7XG4gICAgICAgICAgICAgICAgICAgIGZuID0gdGVzdC5tZXRob2RzW2tleV1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0ZXN0LmFzc2VydHNbaW5kZXhdID09PSBgb2JqZWN0YCkge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSB0ZXN0LmFzc2VydHNbaW5kZXhdLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgZm4gPSB0ZXN0LmFzc2VydHNbaW5kZXhdLmZuXG4gICAgICAgICAgICAgICAgICAgIHByZSA9IHRlc3QuYXNzZXJ0c1tpbmRleF0ucHJlIHx8IHByZVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlc3QucmVzdWx0cy5wdXNoKHsgcGFzczogdHJ1ZSwgbWVzc2FnZTogcmVzLCBrZXkgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6IGZhbHNlLCBtZXNzYWdlOiByZXMsIGtleSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5Bc3NlcnQoaW5kZXggKyAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXN0LnJlc3VsdHMucHVzaCh7IHBhc3M6ICEhdmFsLCBtZXNzYWdlOiB2YWwsIGtleSB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuQXNzZXJ0KGluZGV4ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghcHJlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0KClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwcmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IGZuKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFJlc3VsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVuQXNzZXJ0KDApXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcnVuVGVzdCh0ZXN0OiBhbnksIGdyb3VwS2V5OiBzdHJpbmcsIHR5cGU6IHN0cmluZykge1xuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzQXJlUnVubmluZyA9IHRydWVcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXSA9IHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVtncm91cEtleV0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XSA9IHtcbiAgICAgICAgICAgICAgICAgICAgcGFzczogMCxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0czoge30sXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbdHlwZV1bZ3JvdXBLZXldLnJ1bm5pbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdHMgPSAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5ydW5uaW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5yZXN1bHRzW3Rlc3QubmFtZV0gPSByZXNcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzQXJlUnVubmluZyA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICBpZiAocmVzLnBhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QocmVzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmaW5pc2hBc3NlcnQgPSAocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcGFzc2VkID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgcmVzLmZvckVhY2goKGVsZW1lbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnQucGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFzc2VkID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFzczogcGFzc2VkLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgYCxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBub3csXG4gICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzOiByZXNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW3R5cGVdW2dyb3VwS2V5XS5yZXN1bHRzW3Rlc3QubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFzczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBgLFxuICAgICAgICAgICAgICAgIHRpbWU6IDAsXG4gICAgICAgICAgICAgICAgcnVubmluZzogdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGVzdC5hc3NlcnRzICYmIHRlc3QuYXNzZXJ0cy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIHRoaXMucnVuQXNzZXJ0cyh0ZXN0KS50aGVuKGZpbmlzaEFzc2VydCwgZmluaXNoQXNzZXJ0KVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRlc3QuZm4gJiYgdHlwZW9mIHRlc3QuZm4gPT09IGBmdW5jdGlvbmApIHtcbiAgICAgICAgICAgICAgICB0ZXN0LmZuKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gbm93LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHM6IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgKHJlajogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiByZWosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogbmV3IERhdGUoKS5nZXRUaW1lKCkgLSBub3csXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0czogcmVqXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgfVxuXG4gICAgcnVuVGVzdEdyb3VwKGdyb3VwOiBhbnksIHR5cGU6IHN0cmluZykge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0gPSB7XG4gICAgICAgICAgICAgICAgcGFzczogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHJlc3VsdHM6IHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNldFJlc3VsdHMgPSAocmVzOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjYW50VXBkYXRlUGFzcyA9IHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucGFzcyA9PT0gZmFsc2VcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdQYXNzID0gY2FudFVwZGF0ZVBhc3MgPyB0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdLnBhc3MgOiByZXMucGFzc1xuXG4gICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1tncm91cC5uYW1lXS5wYXNzID0gbmV3UGFzc1xuICAgICAgICAgICAgICAgIHRoaXMudGVzdFJlc3VsdHMudGVzdHNbZ3JvdXAubmFtZV0ucmVzdWx0c1tncm91cC50ZXN0c1tpbmRleF0ubmFtZV0gPSByZXNcblxuICAgICAgICAgICAgICAgIHJ1bihpbmRleCArIDEpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHJ1biA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGdyb3VwLnRlc3RzW2luZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJ1blRlc3QoZ3JvdXAudGVzdHNbaW5kZXhdLCBncm91cC5uYW1lLCB0eXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UmVzdWx0cyhyZXMsIGluZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaCgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRSZXN1bHRzKHJlcywgaW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0aGlzLnRlc3RSZXN1bHRzLnRlc3RzW2dyb3VwLm5hbWVdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcnVuKDApXG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBSdW5zIGFsbCB0ZXN0c1xuICAgICAqIEBwYXJhbSB0ZXN0IC0gdGVzdGluZyBwYXJhbSBkZXNjcmlwdGlvblxuICAgICAqL1xuICAgIHJ1blRlc3RzKHRlc3Q/OiB7IGlkOiBzdHJpbmcgfSkge1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJ1biA9IChpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IE9iamVjdC5rZXlzKHRoaXMudGVzdHMpW2luZGV4XVxuICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNUZXN0R3JvdXAgPSB0aGlzLnRlc3RzW3R5cGVdXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpc1Rlc3RHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBydW5Hcm91cCA9IChncm91cEluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoaXNUZXN0ID0gdGhpc1Rlc3RHcm91cFtPYmplY3Qua2V5cyh0aGlzVGVzdEdyb3VwKVtncm91cEluZGV4XV1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNUZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ydW5UZXN0R3JvdXAodGhpc1Rlc3QsIHR5cGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXM6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVt0aGlzVGVzdC5uYW1lXSA9IHJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoZ3JvdXBJbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIChyZWo6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXN0UmVzdWx0cy50ZXN0c1t0eXBlXVt0aGlzVGVzdC5uYW1lXSA9IHJlalxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuR3JvdXAoZ3JvdXBJbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bihpbmRleCArIDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBydW5Hcm91cCgwKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy50ZXN0UmVzdWx0cy50ZXN0cylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJ1bigwKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGdldEZvcm1hdGVkVGltZSh0aW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICBpZiAodGltZXN0YW1wIDwgMTAwMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbWVzdGFtcCArIGBtc2BcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgPCAxMDAwICogNjApIHtcbiAgICAgICAgICAgIHJldHVybiAodGltZXN0YW1wIC8gMTAwMCkgKyBgc2BcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lc3RhbXAgPCAxMDAwICogNjAgKiA2MCkge1xuICAgICAgICAgICAgcmV0dXJuICh0aW1lc3RhbXAgLyAxMDAwICogNjApICsgYG1gXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYGBcbiAgICB9XG59XG5cbmV4cG9ydCBsZXQgVGVzdFNlcnZpY2UgPSBuZXcgdGVzdFNlcnZpY2UoKVxuIl19