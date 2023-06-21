import { Formateur } from "../services/formateur";

export class PhoneNumberDirective {
    static selector = "[phone-number]";
    whileHaveSpace:boolean=true;
    borderColor: string = "gold";

    constructor(public element: HTMLElement) { }

    init() {
        
        if(this.element.hasAttribute('with-space')){
            this.whileHaveSpace = this.element.getAttribute('with-spaces') === "true";
            console.log(this.whileHaveSpace);
        }
        if(this.element.hasAttribute('border-color')){
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
        const formateur = new Formateur();
       element.value = formateur.formatNumber(
        element.value,
        10, 
        2, 
        this.whileHaveSpace
        );
    }
}