import { Directive } from "../decorators/directive";
import { Input } from "../decorators/input";
import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formateur } from "../services/formateur";

@Directive({
    selector: "[credit-card]",
})
export class CreditCardDirective {

    @Input("border-color")
    borderColor: string = "silver";

    constructor(public element: HTMLElement, private formateur: Formateur, private verifier: CreditCardVerifier) {}

    init() {
        this.element.style.borderColor = this.borderColor;
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
