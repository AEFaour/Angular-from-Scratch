export class Formateur {

    constructor() {
        console.log("Je suis le formateur n°", Math.random())
    }

    formatNumber(initialValue: string, length: number, groupLength: number,
        whileHaveSpace: boolean = true) {

        const value = initialValue.replace(/[^\d]/g, '').substring(0, length);

        const groups: string[] = [];

        for (let i = 0; i < value.length; i += groupLength) {
            groups.push(value.substring(i, i + groupLength))
        }

        console.log(value);
        return groups.join(whileHaveSpace ? ' ' : '');

    }
}