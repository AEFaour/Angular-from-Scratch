import set from "lodash/set";

export function HostBinding(attrName: string) {
    return function (decoratedClass, propName: string) {
        const originalInitFunction: Function = decoratedClass["init"] || function () { };
        const bindings: any[] = decoratedClass["bindings"] || [];

        bindings.push({
            attrName, 
            propName
        });

        decoratedClass["bindings"] = bindings;
        decoratedClass["init"] = function () {
            originalInitFunction.call(this);
            set(this.element, attrName, this[propName]);
        };
    };
}