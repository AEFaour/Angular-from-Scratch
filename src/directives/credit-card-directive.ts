import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/hostListener";
import { Input } from "../decorators/input";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formateur } from "../services/formateur";

@Directive({
    selector: "[credit-card]",
})
export class CreditCardDirective {

    @Input("border-color")
    @HostBinding("style.borderColor")
    borderColor: string = "silver";

    constructor(public element: HTMLElement, private formateur: Formateur, private verifier: CreditCardVerifier) {}

    @HostListener("input", ["event.target"])
    formatCardNumber(element: HTMLInputElement) {

        element.value = this.formateur.formatNumber(
            element.value,
            16,
            4,
            true
        );
    }
}
