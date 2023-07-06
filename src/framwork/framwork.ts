import { Detector } from "./change-detector";
import { Module, ProvidersMetadata, ServiceInstances } from "./types";
import set from "lodash/set";
import { NgZone } from "./zone";

export class Framwork {

    directives: any[] = [];
    services: ServiceInstances = [];
    providers: ProvidersMetadata = [];

    /**
     * Le traitement d'instancier les directives et les pindings
     */
    bootstrapApplication(metadata: Module) {
        this.providers = metadata.providers || [];
        this.directives = metadata.declarations

        NgZone.run(() => {
            this.directives.forEach(directive => {
                const elements = document.querySelectorAll<HTMLElement>(directive.selector);

                elements.forEach(element => {
                    const params = this.analyseDirectiveConstructor(directive, element);
                    const directiveInstance: any = Reflect.construct(directive, params);
                    const proxy = new Proxy(directiveInstance, {
                        set(target, propName: string, value, proxy) {
                            target[propName] = value;
                            if (!target.bindings) {
                                return true;
                            }
                            const binding = target.bindings.find(b => b.propName === propName);
                            if (!binding) {
                                return true;
                            }
                            Detector.addBinding(element, binding.attrName, value);
                            //console.log(`On a mis à jour ${propName.toString} avec la valeur ${value}`);
                            //set(target.element, binding.attrName, value);
                            return true;
                        }
                    });
                    proxy.init();
                })
            });
        })
    }

    /**
     * 
     * @param directive 
     * @param element 
     * @returns 
     */
    private analyseDirectiveConstructor(directive, element: HTMLElement) {
        const hasConstructor = /constructor\(.*\)/g.test(directive.toString());
        if (!hasConstructor) {
            return [];
        }
        const paramsNames = this.extractParamNamesFromDirective(directive);
        const params = paramsNames.map(name => {
            if (name === "element") {
                return element;
            }


            const directiveProviders = directive.providers || [];

            const directiveProvider = directiveProviders.find(p => p.provide === name);

            if (directiveProvider) {
                const instance = directiveProvider.construct();
                return instance;
            }

            const service = this.services.find((s) => s.name === name);

            if (service) {
                return service.instance;
            }
            const provider = this.providers.find((p) => p.provide === name);
            if (!provider) {
                throw new Error("Aucun fournisseur n'existe pour le service " + name);
            }
            const instance = provider.construct();

            this.services.push({
                name,
                instance
            })
            return instance;
        })

        return params;
    }

    private extractParamNamesFromDirective(directive) {
        const params = /constructor\((.*)\)/g.exec(directive.toString());
        if (!params) {
            return [];
        }
        return params[1].split(", ");
    }

}

export const Angular = new Framwork();
