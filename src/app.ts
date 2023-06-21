class PhoneNumberDirective {

    constructor(public element: HTMLElement) { }

    init() {
        this.element.style.borderColor = "red";
    }
}
const element = document.querySelector<HTMLElement>('#mobile-number');
if (element) {
    const directive = new PhoneNumberDirective(element);
    directive.init();
}
