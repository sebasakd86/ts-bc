"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(constructor) {
    //target of the decorator
    //gets called on class definition
    console.log("Logging!");
    console.log(constructor);
}
//this decorator has to be executed, this way it can get params to use
function LoggerFactory(logStr) {
    return function (constructor) {
        console.log("Logging from Factory!");
        console.log(logStr);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        //so TS won't complain about the type of the constructor.
        //dont care about the param, i'm aware, but won't use it.
        const hookEl = document.getElementById(hookId);
        const p = new originalConstructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1").textContent = p.name;
        }
    };
}
function WithTemplateOverrideConstructor(template, hookId) {
    //the decorator will be used by classes with the name property in it.
    //this will be executed WHEN the class is instantiated.
    return function (originalConstructor) {
        //class decorator returns a constructor that replaces the original one
        return class extends originalConstructor {
            constructor(..._) {
                super(); //to call the original one.
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
//@Logger //points to a decorator
let Person = class Person {
    constructor() {
        this.name = "Test";
        console.log("Creating obj...");
    }
};
Person = __decorate([
    LoggerFactory("Logging --> PERSON") //Execute a fn that whil RETURN a fn, so in the end we don't end up with a result, but with a fn
    ,
    WithTemplate("<h1>My person object</h1>", "app")
], Person);
const p = new Person();
console.log(p);
/* -------------- */
function LogPropertyDecorators(target, propertyName) {
    console.log("Property Decorator");
    console.log(target, propertyName);
}
function LogAccesor(target, name, descriptor) {
    console.log("Accesor Decorator");
    console.log(target, name, descriptor);
}
function LogMethod(target, name, descriptor) {
    console.log("Method Decorator");
    console.log(target, name, descriptor);
}
function LogParam(target, methodName, argPosition) {
    console.log("Param Decorator");
    console.log(target, methodName, argPosition);
}
class Product {
    constructor(t, _price) {
        this._price = _price;
        this.title = t;
    }
    getPrice(tax) {
        return this._price * (1 + tax);
    }
    set price(val) {
        if (val > 0)
            this._price = val;
    }
}
__decorate([
    LogPropertyDecorators
], Product.prototype, "title", void 0);
__decorate([
    LogMethod,
    __param(0, LogParam)
], Product.prototype, "getPrice", null);
__decorate([
    LogAccesor
], Product.prototype, "price", null);
function AutoBind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
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
    constructor() {
        this.msg = "This works";
    }
    showMessage() {
        console.log(this.msg);
    }
}
__decorate([
    AutoBind
], Printer.prototype, "showMessage", null);
const printer = new Printer();
const btn = document.getElementById("clickMe");
btn.addEventListener("click", printer.showMessage); //to bind the showMessage to the printer object
const registeredValidators = {};
function Required(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ["required"] });
}
function PositiveNumber(target, propName) {
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ["positive"] });
}
function validate(obj) {
    const objValidatorCfg = registeredValidators[obj.constructor.name];
    if (!objValidatorCfg)
        return true;
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
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.getElementById("form");
courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    if (validate(createdCourse))
        console.log(createdCourse);
    else
        console.log("invalid input!");
});
