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

        this.element.querySelector('button').addEventListener('click', () => {
            this.firstName = "Gloire",
                this.render();
        });
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
                const randomId="event-listener-"+ Math.ceil(Math.random() * 1000);
                console.log(randomId);
                baliseOuverante.match(/\(.*?\)=\".*?\"/g).forEach(
                    (event) => {
                        const eventName = event.match(/\(.*?\)/)[0].replace(/\(|\)/g, '');
                        console.log(eventName)
                        const methodName = event.match(/\".*?\"/g)[0].replace(/\"/g, '');
                        console.log(methodName)
                    }
                );
            }
        );

        this.element.innerHTML = renderedTemplate;
    }

    onClickButton() {
        this.firstName = "Gloire",
            this.render();
    }
    onDbClickButton() {
        console.log("Double Click");
    }

    onClickH3() {
        console.log("Click sur le h3");
    }
}