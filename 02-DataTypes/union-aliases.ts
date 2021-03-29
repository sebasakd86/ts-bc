//aliases
type Combinable = number | string;
type ResultDescription = "as-number" | "as-string"; //allowing only one of this 2 values, a literal type

// type1 | type2 | type3 | .... | typeN --> union type.
function combine(
    input1: Combinable,
    input2: Combinable,
    result: ResultDescription
) {
    let res;
    if (typeof input1 === "number" && typeof input2 === "number")
        return input1 + input2;
    else return input1.toString() + input2.toString();
}

const combinedNum = combine(2, 3, "as-number");
console.log(combinedNum);
const combinedName = combine("2", "3", "as-string");
console.log(combinedName);
