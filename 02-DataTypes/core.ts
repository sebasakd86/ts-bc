//TS wont check nor provide support for this kind of declaration
const tsDoesntCare: object = {
    name: "pablo",
    age: 700,
};
//Creates a concrete obj that TS provides support to and checks for errors.
//Its not a good practice, it's better to use TS type inference
const specializedPerson: {
    name: string;
    age: number;
} = {
    name: "sebas",
    age: -10,
};

enum Role {
    ADMIN = 5, // = 'ADMIN'
    READ_ONLY, //6
    AUTHOR, //7
}

const person = {
    name: "sebas",
    age: -10,
    hobbies: ["Birra", "Morfar"], //array
    // role: [2, "Admin"], //tuple
    role: Role.ADMIN,
};

console.log(person.name);
