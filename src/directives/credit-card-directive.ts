import { Directive } from "../decorators/directive";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formateur } from "../services/formateur";

@Directive({
    selector: "[credit-card]",
})
export class CreditCardDirective {

    constructor(public element: HTMLElement,
        private formateur: Formateur,
        private verifier: CreditCardVerifier) {

    }

    init() {
        this.element.style.borderColor = "silver";
        this.element.addEventListener('input', (event) => {
            const element = event.target as HTMLInputElement;
            this.formatCardNumber(element);
        }
        )
    }

    formatCardNumber(element: HTMLInputElement) {

        element.value = this.formateur.formatNumber(
            element.value,
            16,
            4,
            true
        );
    }
}
