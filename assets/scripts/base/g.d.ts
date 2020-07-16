declare module g{
    export let CustomDecorator:{
        auto:any;
        mvvm:any;
    }
    export function init(): void;

    export class BaseMgr {
        onLoad(): void;
        static instance: any;
        static getInstance(): any;
        moduleName: any;
        moduleData: any;
        //emit(moduleName: any, eventType: string, data: any): void;
    }
}