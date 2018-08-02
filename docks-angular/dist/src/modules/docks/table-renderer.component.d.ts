export declare class TableRendererComponent {
    constructor();
    service: any;
    testService: any;
    show: boolean;
    properties: any;
    readonly propertiesDataKeys: string[];
    getLink(docLinkName: string, typeName: string): string;
    getDocData(docLinkName: string, typeName: string): any;
    showJsonViewer(val: any): boolean;
    showText(key: string): boolean;
    isString(val: any): boolean;
    hasTest(row: any, key: any): any;
    hasArguments(row: any, key: any): boolean;
}
