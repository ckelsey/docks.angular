export declare class SidebarComponent {
    constructor();
    service: any;
    testService: any;
    readonly typeNames: string[];
    readonly linkNames: Array<string[]>;
    getLink(docLinkName: string, typeName: string): string;
    isDocumented(docLinkName: string, typeName: string): boolean;
    getDocLink(docLinkName: string, typeName: string): any;
    setSidebarState(state: string): void;
}
