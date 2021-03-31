//Intersection type
type Admin = {
    name: string;
    privileges: string[];
};
type Employee = {
    name: string;
    startDate: Date;
};
type ElevatedEmployee = Admin & Employee; // <--- intersection type
const e1: ElevatedEmployee = {
    name: "Test",
    privileges: ["does nothing"],
    startDate: new Date(),
};
console.log(e1.name);
//Discriminated union
interface Bird {
    type: "bird";
    flySpeed: number;
}
interface Horse {
    type: "horse";
    runSpeed: number;
}
type Animal = Bird | Horse;
function moveAnimal(a: Animal) {
    switch (a.type) {
        case "bird":
            return a.flySpeed;
        case "horse":
            return a.runSpeed;
        default:
            return 0;
    }
}
//index properties
interface ErrorContainer {
    id: string;
    [prop: string]: string; //Every object property must have a name of type string.
}

const errorBag: ErrorContainer = {
    id: "1",
    email: "Not a valid email",
    username: "Must start with a number",
};
//Fn overload
type Test = number | string;
function test(a: string): string;
function test(a: number): number;
function test(a: Test) {
    if (typeof a === "number") return a * 2;
    return a.toString();
}
const x: Test = 1;
const y: Test = "string";
test(x);
test(y);

//Optional Chaining
const data = {
    id: "1",
    name: "test",
    job: { title: "pt" },
};
//same thing
console.log(data?.job?.title);
console.log(data && data.job ? data.job.title : "");
//nullish coalescing
const userData = "";
const data2 = userData ?? "DEFAULT"; //if userData is null/undefined, it uses "DEFAULT" and not just a falsy value
