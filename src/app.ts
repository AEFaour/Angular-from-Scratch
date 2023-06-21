class PhoneNumberDirective {

    constructor(public element: HTMLElement) { }

    init() {
        this.element.style.borderColor = "red";
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
const phoneElements = document.querySelectorAll<HTMLElement>('[phone-number]');

phoneElements.forEach(element => {
    const directive = new PhoneNumberDirective(element);
    directive.init();
})

