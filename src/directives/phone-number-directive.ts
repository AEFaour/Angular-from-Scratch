import { Directive } from "../decorators/directive";
import { HostListener } from "../decorators/hostListener";
import { Input } from "../decorators/input";
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
    @Input("with-space")
    whileHaveSpace: boolean = true;
    @Input("border-color")
    borderColor: string = "gold";


    constructor(public element: HTMLElement,
        private formateur: Formateur,
        private verifier: CreditCardVerifier) {
    }

    init() {
        this.element.style.borderColor = this.borderColor;
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