import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formateur } from "../services/formateur";

export class PhoneNumberDirective {
    static selector = "[phone-number]";
    static providers = [
        {
            provide: "formateur",
            construct: () => new Formateur("spécifique")
        },
    ];

    whileHaveSpace: boolean = true;
    borderColor: string = "gold";


    constructor(public element: HTMLElement,
        private formateur: Formateur,
        private verifier: CreditCardVerifier) {
    }

    init() {

        if (this.element.hasAttribute('with-space')) {
            this.whileHaveSpace = this.element.getAttribute('with-spaces') === "true";
            console.log(this.whileHaveSpace);
        }
        if (this.element.hasAttribute('border-color')) {
            this.borderColor = this.element.getAttribute('border-color')!;
            console.log(this.borderColor);
        }
        this.element.style.borderColor = this.borderColor;
        this.element.addEventListener('input', (event) => {
            const element = event.target as HTMLInputElement;
            this.formatNumber(element);
        })
    }

    formatNumber(element: HTMLInputElement) {

        element.value = this.formateur.formatNumber(
            element.value,
            10,
            2,
            this.whileHaveSpace
        );
    }
}