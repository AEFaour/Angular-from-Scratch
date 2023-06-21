export class CreditCardDirective {
    static selector = "[credit-card]";

    constructor(public element: HTMLElement) { }

    init() {
        this.element.style.borderColor = "silver";
        this.element.addEventListener('input', (event) => {
            const element = event.target as HTMLInputElement;
            this.formatCardNumber(element);
        }
        )
    }

    formatCardNumber(element: HTMLInputElement) {

        const value = element.value.replace(/[^\d]/g, '').substring(0, 16);

        const groups: string[] = [];

        for (let i = 0; i < value.length; i += 4) {
            groups.push(value.substring(i, i + 4))
        }

        element.value = groups.join(' ');
        console.log(element.value);
    }
}
