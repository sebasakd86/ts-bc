"use strict";
var s;
s = {
    name: "Max",
    age: 30,
    greet: function () {
        console.log("Greetings " + this.name + "!");
    },
};
s.greet();
var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.greet = function () {
        console.log("Greetings " + this.name + "!");
    };
    return Person;
}());
var p = new Person("Test");
p.greet();
var add;
add = function (n1) {
    return n1 * 2;
};
