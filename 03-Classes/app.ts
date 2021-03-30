interface IPerson {
    name: string;
    age: number;
    greet(): void;
}
let s: IPerson;
s = {
    name: "Max",
    age: 30,
    greet() {
        console.log(`Greetings ${this.name}!`);
    },
};
s.greet();

interface IGreetable {
    greet(): void;
}
class Person implements IGreetable {
    constructor(private name: string) {}
    greet() {
        console.log(`Greetings ${this.name}!`);
    }
}
const p = new Person("Test");
p.greet();
//Interface as FN
interface IFnAdd {
    (a: number): number;
}
let add: IFnAdd;
add = (n1: number) => {
    return n1 * 2;
};
