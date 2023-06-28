export type ProviderMetadata = {
    provide: string;
    construct: Function;
};

export type ProvidersMetadata = ProviderMetadata[];

export type ServiceInstance = {
    name: string;
    instance: any;
}

export type ServiceInstances = ServiceInstance[];

export type Module = {
    declarations: any[];
    providers?: ProvidersMetadata;
}