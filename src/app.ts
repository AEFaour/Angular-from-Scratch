class CreditCardDirective {
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
class PhoneNumberDirective {
    static selector = "[phone-number]";

    constructor(public element: HTMLElement) { }

    init() {
        this.element.style.borderColor = "gold";
        this.element.addEventListener('input', (event) => {
            const element = event.target as HTMLInputElement;
            this.formatNumber(element);

        })
    }

    formatNumber(element: HTMLInputElement) {

        const value = element.value.replace(/[^\d]/g, '').substring(0, 10);

        const groups: string[] = [];

        for (let i = 0; i < value.length; i += 2) {
            groups.push(value.substring(i, i + 2))
        }

        element.value = groups.join(' ');
        console.log(element.value);
    }
}

const directives = [PhoneNumberDirective, CreditCardDirective];
directives.forEach(directive => {

    const elements = document.querySelectorAll<HTMLElement>(directive.selector);

    elements.forEach(element => {
        const directiveInstance = new directive(element);
        directiveInstance.init();
    })
})

/*
const phoneElements = document.querySelectorAll<HTMLElement>('[phone-number]');

phoneElements.forEach(element => {
    const directive = new PhoneNumberDirective(element);
    directive.init();
})

const creditCardElements = document.querySelectorAll<HTMLElement>('[credit-card]');

creditCardElements.forEach(element => {
    const directive = new CreditCardDirective(element);
    directive.init();
})
*/
