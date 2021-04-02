function Logger(constructor: Function) {
    //target of the decorator
    //gets called on class definition
    console.log("Logging!");
    console.log(constructor);
}

//this decorator has to be executed, this way it can get params to use
function LoggerFactory(logStr: string) {
    return function (constructor: Function) {
        console.log("Logging from Factory!");
        console.log(logStr);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    return function (originalConstructor: any) {
        //so TS won't complain about the type of the constructor.
        //dont care about the param, i'm aware, but won't use it.
        const hookEl = document.getElementById(hookId);
        const p = new originalConstructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = p.name;
        }
    };
}
function WithTemplateOverrideConstructor(template: string, hookId: string) {
    //the decorator will be used by classes with the name property in it.
    //this will be executed WHEN the class is instantiated.
    return function <T extends { new (...args: any[]): { name: string } }>(
        originalConstructor: any
    ) {
        //class decorator returns a constructor that replaces the original one
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super(); //to call the original one.
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1")!.textContent = this.name;
                }
            }
        };
    };
}
//@Logger //points to a decorator
@LoggerFactory("Logging --> PERSON") //Execute a fn that whil RETURN a fn, so in the end we don't end up with a result, but with a fn
@WithTemplate("<h1>My person object</h1>", "app")
class Person {
    name = "Test";
    constructor() {
        console.log("Creating obj...");
    }
}

const p = new Person();
console.log(p);

/* -------------- */

function LogPropertyDecorators(target: any, propertyName: string) {
    console.log("Property Decorator");
    console.log(target, propertyName);
}

function LogAccesor(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accesor Decorator");
    console.log(target, name, descriptor);
}

function LogMethod(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Method Decorator");
    console.log(target, name, descriptor);
}
function LogParam(target: any, methodName: string, argPosition: number) {
    console.log("Param Decorator");
    console.log(target, methodName, argPosition);
}
class Product {
    @LogPropertyDecorators
    title: string;
    constructor(t: string, private _price: number) {
        this.title = t;
    }
    @LogMethod
    getPrice(@LogParam tax: number) {
        return this._price * (1 + tax);
    }
    @LogAccesor
    set price(val: number) {
        if (val > 0) this._price = val;
    }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            //get will be triggered by the object, so, this is the object that calls.
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor; //overriding the old method descriptor with the new one.
}

class Printer {
    msg = "This works";
    @AutoBind
    showMessage() {
        console.log(this.msg);
    }
}

const printer = new Printer();

const btn = document.getElementById("clickMe")!;
btn.addEventListener("click", printer.showMessage); //to bind the showMessage to the printer object

/* ============================ */
interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[];
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ["required"],
    };
}
function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ["positive"],
    };
}

function validate(obj: any) {
    const objValidatorCfg = registeredValidators[obj.constructor.name];
    if (!objValidatorCfg) return true;
    let ret = true;
    for (const ppty in objValidatorCfg) {
        for (const validator of objValidatorCfg[ppty]) {
            switch (validator) {
                case "required": {
                    ret = ret && !!obj[ppty];
                    break;
                }
                case "positive": {
                    ret = ret && obj[ppty] > 0;
                    break;
                }
                default: {
                    return false;
                }
            }
        }
    }
    return ret;
}

class Course {
    @Required
    title: string;

    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}
const courseForm = document.getElementById("form")!;
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;
    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (validate(createdCourse)) console.log(createdCourse);
    else console.log("invalid input!");
});
