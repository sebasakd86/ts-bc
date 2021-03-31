"use strict";
var _a;
var e1 = {
    name: "Test",
    privileges: ["does nothing"],
    startDate: new Date(),
};
console.log(e1.name);
function moveAnimal(a) {
    switch (a.type) {
        case "bird":
            return a.flySpeed;
        case "horse":
            return a.runSpeed;
        default:
            return 0;
    }
}
var errorBag = {
    id: "1",
    email: "Not a valid email",
    username: "Must start with a number",
};
function test(a) {
    if (typeof a === "number")
        return a * 2;
    return a.toString();
}
var x = 1;
var y = "string";
test(x);
test(y);
//Optional Chaining
var data = {
    id: "1",
    name: "test",
    job: { title: "pt" },
};
//same thing
console.log((_a = data === null || data === void 0 ? void 0 : data.job) === null || _a === void 0 ? void 0 : _a.title);
console.log(data && data.job ? data.job.title : "");
//nullish coalescing
var userData = "";
var data2 = userData !== null && userData !== void 0 ? userData : "DEFAULT"; //if userData is null/undefined, it uses "DEFAULT" and not just a falsy value
