"use strict";
const test = [];
const p = new Promise((res, rej) => {
    setTimeout(() => res("OK!"), 200);
});
p.then((d) => {
    console.log(d);
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const obj = merge({ name: "test" }, { age: 20 });
console.log(obj.name);
function extract(obj, key) {
    return obj[key];
}
extract({ name: "test" }, "name");
