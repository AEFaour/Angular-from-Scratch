import { ChronoDirective } from "./directives/chrono.directive";
import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { UserProfileComponent } from "./components/user-profile.component";
import { Angular } from "./framwork/framwork";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formateur } from "./services/formateur";
import { CounterComponent } from "./components/counter.component";

    Angular.bootstrapApplication({
        declarations: [
            PhoneNumberDirective,
            CreditCardDirective,
            ChronoDirective,
            UserProfileComponent,
            CounterComponent
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

