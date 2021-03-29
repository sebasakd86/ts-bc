function add(n1: number, n2: number, showResult: boolean = false) {
    if (showResult) console.log(n1 + n2);
    return n1 + n2;
}
let n1: number = 5; //not a good practice, since type inference is quite good at TS
let n3: number; //this is a good practice, if you have no init type.
const n2 = 2.5;

add(n1, n2, true);
