export declare class testService {
    doc: any;
    openedDoc: string;
    testResults: any;
    tests: any;
    flatTests: any;
    testTypes: any;
    shownTestsState: string;
    setTests(tests: any): void;
    hasTestRan(doc: string, testName: string): any;
    hasTestPassed(doc: string, testName: string): any;
    getTestAssertResult(doc: string, testName: string, index: number): any;
    hasTestAsserts(doc: string, testIndex: number): string[];
    isTestRunning(doc: string, testName?: string): any;
    getTests(doc: string): any;
    runAsserts(test: any): Promise<{}>;
    runTest(test: any, groupKey: string, type: string): Promise<{}>;
    runTestGroup(group: any, type: string): Promise<{}>;
    /**
     * @desc Runs all tests
     * @param test - testing param description
     */
    runTests(test?: {
        id: string;
    }): Promise<{}>;
    getFormatedTime(timestamp: number): string;
}
export declare let TestService: testService;
