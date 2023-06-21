import { Formateur } from "../services/formateur";

export class CreditCardDirective {
    static selector = "[credit-card]";

    constructor(public element: HTMLElement, private formateur : Formateur) {
       
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
