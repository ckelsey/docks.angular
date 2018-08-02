export declare class documentationService {
    doc: any;
    openedDoc: string;
    DocsData: any;
    states: {
        props: boolean;
        methods: boolean;
        getters: boolean;
        dataProps: boolean;
        demo: boolean;
        demoOverlay: boolean;
        components: boolean;
        tests: boolean;
        view: string;
        sidebarState: string;
        argToShow: string;
    };
    setDocs(DocsData: any): void;
    setDoc(): any;
    openDoc(doc: string): void;
    getMarkup(doc: any): string;
    json(obj: any): string;
    docName(doc: any): any;
    /**
     * @param el The starting object
     * @param path String to follow
     * @param emptyVal What is returned if undefined
     * @desc Navigates an object or array to find a value
     */
    getThis(el: any, path: Array<any> | string, emptyVal?: any): any;
    constructor();
}
export declare let DocumentationService: documentationService;
