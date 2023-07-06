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

    constructor(public element: HTMLElement) {}

    init(){
        console.log(this.firstName);
    }

}