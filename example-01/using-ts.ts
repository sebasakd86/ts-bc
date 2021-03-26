const btn = document.querySelector("button");
//! --> this will never be null
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

const add = (n1: number, n2: number) => n1 + n2;

btn.addEventListener("click", () => {
    console.log(add(+input1.value, +input2.value));
});
