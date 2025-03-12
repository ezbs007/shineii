interface ResourceOptions {
    listProperties?: string[];
    filterProperties?: string[];
    editProperties?: string[];
    showProperties?: string[];
}
interface ResourceWithOptions {
    resource: any;
    options: ResourceOptions;
}
export declare const resourcesConfig: ResourceWithOptions[];
export {};
