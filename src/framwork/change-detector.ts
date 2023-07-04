export class ChangeDetector{
    bindings : {element: HTMLElement, attrName: string, value: any}[] = [];

    addBinding(element: HTMLElement, attrName: string, value: any) {
        this.bindings = this.bindings.filter(
            (binding) => !(binding.element === element && binding.attrName == attrName));
        this.bindings.push({
            element, 
            attrName, 
            value
        });
        console.table(this.bindings);
    }
}

export const Detector = new ChangeDetector();