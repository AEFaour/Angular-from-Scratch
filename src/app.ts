import { CreditCardDirective } from "./directives/credit-card-directive";
import { PhoneNumberDirective } from "./directives/phone-number-directive";
import { Angular } from "./framwork/framwork";
import { NgZone } from "./framwork/zone";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formateur } from "./services/formateur";

NgZone.run(() => {
    Angular.bootstrapApplication({
        declarations: [
            PhoneNumberDirective,
            CreditCardDirective
        ],
        providers: [
            {
                provide: "formateur",
                construct: () => new Formateur("Global"),
            },
            {
                provide: "verifier",
                construct: () => new CreditCardVerifier(),
            }
        ]
    })
})

