const test: Array<string | number | boolean> = [];

const p: Promise<string> = new Promise((res, rej) => {
    setTimeout(() => res("OK!"), 200);
});

p.then((d) => {
    console.log(d);
});

function merge<T extends object, U>(objA: T, objB: U): T & U {
    return Object.assign(objA, objB);
}
const obj = merge({ name: "test" }, { age: 20 });
console.log(obj.name);

function extract<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

extract({ name: "test" }, "name");
