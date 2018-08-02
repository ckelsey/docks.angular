export declare class RendererComponent {
    constructor();
    service: any;
    testService: any;
    readonly properties: {
        data: any;
        columns: ({
            key: string;
            label: string;
            required?: undefined;
        } | {
            key: string;
            label: string;
            required: boolean;
        })[];
    };
    readonly methods: {
        data: any;
        columns: ({
            key: string;
            label: string;
            required?: undefined;
        } | {
            key: string;
            label: string;
            required: boolean;
        })[];
    };
    readonly attributeProps: {
        data: any;
        columns: ({
            key: string;
            label: string;
            required?: undefined;
        } | {
            key: string;
            label: string;
            required: boolean;
        })[];
    };
    readonly gettersProps: {
        data: any;
        columns: ({
            key: string;
            label: string;
            required?: undefined;
        } | {
            key: string;
            label: string;
            required: boolean;
        })[];
    };
    hasProperties(type: string): number;
}
