import { Component } from "../decorators/component";
import { Input } from "../decorators/input";

@Component({
    selector: "counter", 
    template: `
    <strong>Compteur : {{count}} </strong>
    <button (click)="increment">+ Incrémenter</button>
    <button (click)="decrement">- Décrémenter</button>
    `
})
export class CounterComponent {
    @Input('initial-value')
    count: Number = 0;

    @Input('step')
    step: Number =1;

    constructor(public element: HTMLElement){
    }

    increment(){
        this.count = Number(this.count) + Number(this.step);
    }

    decrement(){
        this.count = Number(this.count) - Number(this.step);
    }
}