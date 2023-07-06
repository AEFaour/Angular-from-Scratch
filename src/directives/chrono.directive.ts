import { Directive } from "../decorators/directive";
import { HostBinding } from "../decorators/host-binding";
import { HostListener } from "../decorators/hostListener";
import { Input } from "../decorators/input";

@Directive({
    selector: "div[chrono]",
})
export class ChronoDirective {
    @HostBinding('textContent')
    count: number = 0;
    intervalId: number;
    constructor(public element: HTMLElement) {

    }
    init() {
        this.intervalId = window.setInterval(() => this.count++, 1000);
    }

    @HostListener('click')
    onClick() {
        if (this.intervalId) {
            window.clearInterval(this.intervalId);
            this.count = 0;
            this.intervalId = undefined;
            return;
        }
        this.intervalId = window.setInterval(() => this.count++, 1000);
    }
}