import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/hostListener";
import { Input } from "../decorators/input";
import { Detector } from "../framwork/change-detector";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formateur } from "../services/formateur";

@Directive({
    selector: "[phone-number]",
    providers: [
        {
            provide: "formateur",
            construct: () => new Formateur("spécifique")
        },
    ]
})
export class PhoneNumberDirective {
    static bindings = [ 
        { propName: 'borderColor', attrName: 'style.borderColor'},
        { propName: 'placeholderText', attrName: 'placeholder'}
    ]
    @Input("with-space")
    whileHaveSpace: boolean = true;

    @Input("border-color")
    @HostBinding("style.borderColor")
    borderColor: string = "gold";

    @HostBinding("placeholder")
    placeholderText: string = "Hello world";

    constructor(public element: HTMLElement,
        private formateur: Formateur,
        private verifier: CreditCardVerifier) {
    }

    @HostListener("click")
    onClick() {
       
        this.placeholderText = "Hello Eclaire !";
        Detector.digest();
    }

    @HostListener("input", ["event.target"])
    formatNumber(element: HTMLInputElement) {

        element.value = this.formateur.formatNumber(
            element.value,
            10,
            2,
            this.whileHaveSpace
        );
    }
}