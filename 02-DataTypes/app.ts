let userInput: unknown;
userInput = 5;
userInput = "a";
let str: string = "aux";
if (typeof userInput === "string") str = userInput;

// never produces a value
// its a good practice to return never, if the fn never yields a result
// function generateError(msg: string) : never {
function generateError(msg: string) {
    throw new Error(msg);
}

generateError("Aiuda!");
