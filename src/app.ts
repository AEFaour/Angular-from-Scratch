import { CreditCardDirective } from "./directives/credit-card-directive";
import { PhoneNumberDirective } from "./directives/phone-number-directive";
import { Formateur } from "./services/formateur";


const directives = [PhoneNumberDirective, CreditCardDirective];

const formateur = new Formateur();

directives.forEach(directive => {
    const elements = document.querySelectorAll<HTMLElement>(directive.selector);


    elements.forEach(element => {
        const directiveInstance = new directive(element, formateur);
        directiveInstance.init();
    })
})
