import { Component } from "../decorators/component";
import { Input } from "../decorators/input";

@Component({
    selector: "[user-profile]",
    template: `
    <h3 (click)="onClickH3">{{firstName}} {{lastName}}</h3>
    <strong>Poste : </strong> {{job}}
    <button (click)="onClickButton" (dblclick)="onDbClickButton">Changer le prénom</button>
    `,
})
export class UserProfileDirective {

    @Input('first-name')
    firstName: string;
    @Input('last-name')
    lastName: string;
    @Input('job')
    job: string;

    constructor(public element: HTMLElement) { }

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