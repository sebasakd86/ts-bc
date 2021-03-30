abstract class Department {
    // private name: string;
    private employees: string[] = [];
    protected someValue: boolean = false;

    // declares name as a ppty for the class, without creating the name property ourselves
    constructor(private readonly id: string, public name: string) {
        // this.name = n;
    }
    describe(this: Department) {
        console.log(`Department: ${this.id} - ${this.name}`);
    }
    addEmployee(employee: string) {
        this.employees.push(employee);
    }
    printEmployeeInfo() {
        console.log(`Empleados Totales --> ${this.employees.length}`);
        console.log(this.employees);
    }
    static createEmployee(name: string) {
        return { name: name };
    }
    abstract test(): void;
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, "IT Department");
    }
    describe() {
        super.describe();
        super.printEmployeeInfo();
        console.log(`Admins --> ${this.admins}`);
    }
    get Admins() {
        return this.admins;
    }
    set Admin(admin: string) {
        if (admin) this.admins = [admin];
    }
    test() {
        console.log("this is a test");
    }
}
const testDept = new ITDepartment("IT", ["Kulem"]);
//If the obj template its the same, it will work, otherwise, it wont
// const deptCopy = { name: "test2", methodName2: testDept.methodName2 };
// deptCopy.methodName2();
testDept.addEmployee("Pablo");
testDept.addEmployee("Pedrito");
// accessible without the private modifier
// testDept.employees.push("Test!");
testDept.describe();
testDept.printEmployeeInfo();

const itDept = new ITDepartment("IT", ["Kbza"]);
itDept.addEmployee("Dario");
itDept.describe();
