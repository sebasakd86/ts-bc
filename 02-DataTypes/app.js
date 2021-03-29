// bad practice, unless you have a reason to not let TS infer its return type
// function add(n1: number, n2: number) : number {
function add(n1, n2) {
    return n1 + n2;
}
function addAndHandle(n1, n2, cb) {
    var res = n1 + n2;
    cb(res);
}
var combineValues;
combineValues = add;
// combineValues = 1;
console.log(combineValues(8, 8));
addAndHandle(10, 20, function (res) { return console.log(res); });
