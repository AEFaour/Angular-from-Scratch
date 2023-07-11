import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";

@Directive({
    selector: "[user-profile]"
})
export class UserProfileDirective {

    @Input('first-name')
    firstName: string;
    @Input('last-name')
    lastName: string;
    @Input('job')
    job: string;

    template = `
    <h3 (click)="onClickH3">{{firstName}} {{lastName}}</h3>
    <strong>Poste : </strong> {{job}}
    <button (click)="onClickButton" (dblclick)="onDbClickButton">Changer le prénom</button>
    `;

    constructor(public element: HTMLElement) { }

    init() {
        this.render();
    }
    render() {
        let renderedTemplate = this.template;
        this.template.match(/{{.*?}}/g).forEach(interpolation => {
            const propName = interpolation.replace(/{{|}}/g, '').trim();

            renderedTemplate = renderedTemplate.replace(interpolation, this[propName]);
        });

        const eventsToBind: {
            elementId: string;
            eventName: string;
            methodName: string
        }[] = [];
        this.template.match(/<.*? \(.*?\)=\".*?\".*?>/g).forEach(
            (baliseOuverante) => {
                const randomId = "event-listener-" + Math.ceil(Math.random() * 1000);
                console.log(randomId);
                baliseOuverante.match(/\(.*?\)=\".*?\"/g).forEach(
                    (event) => {
                        const eventName = event.match(/\(.*?\)/)[0].replace(/\(|\)/g, '');
                        console.log(eventName)
                        const methodName = event.match(/\".*?\"/g)[0].replace(/\"/g, '');
                        console.log(methodName);
                        eventsToBind.push({
                            elementId: randomId,
                            eventName, methodName
                        });
                    });
                const finalBaliseOuvrante = baliseOuverante
                    .replace(/\(.*?\)=\".*?\"/g, '')
                    .replace(/>/g, `id="${randomId}">`);
                renderedTemplate = renderedTemplate.replace(baliseOuverante, finalBaliseOuvrante);
            });
        console.log(renderedTemplate);
        console.log(eventsToBind);

        this.element.innerHTML = renderedTemplate;

        console.log(eventsToBind);

        eventsToBind.forEach(eventToBind => {
            this.element.querySelector('#' + eventToBind.elementId).addEventListener(eventToBind.eventName, () => {
                this[eventToBind.methodName]();
                this.render();
            });
        });
    }

    onClickButton() {
        this.firstName = "Gloire";
    }
    onDbClickButton() {
        this.firstName = "Soleil";
    }

    onClickH3() {
        console.log("Click sur le h3");
    }
}