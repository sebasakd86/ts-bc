"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    // declares name as a ppty for the class, without creating the name property ourselves
    function Department(id, name) {
        this.id = id;
        this.name = name;
        // private name: string;
        this.employees = [];
        this.someValue = false;
        // this.name = n;
    }
    Department.prototype.describe = function () {
        console.log("Department: " + this.id + " - " + this.name);
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.printEmployeeInfo = function () {
        console.log("Empleados Totales --> " + this.employees.length);
        console.log(this.employees);
    };
    Department.createEmployee = function (name) {
        return { name: name };
    };
    return Department;
}());
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = _super.call(this, id, "IT Department") || this;
        _this.admins = admins;
        return _this;
    }
    ITDepartment.prototype.describe = function () {
        _super.prototype.describe.call(this);
        _super.prototype.printEmployeeInfo.call(this);
        console.log("Admins --> " + this.admins);
    };
    Object.defineProperty(ITDepartment.prototype, "Admins", {
        get: function () {
            return this.admins;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ITDepartment.prototype, "Admin", {
        set: function (admin) {
            if (admin)
                this.admins = [admin];
        },
        enumerable: false,
        configurable: true
    });
    ITDepartment.prototype.test = function () {
        console.log("this is a test");
    };
    return ITDepartment;
}(Department));
var testDept = new ITDepartment("IT", ["Kulem"]);
//If the obj template its the same, it will work, otherwise, it wont
// const deptCopy = { name: "test2", methodName2: testDept.methodName2 };
// deptCopy.methodName2();
testDept.addEmployee("Pablo");
testDept.addEmployee("Pedrito");
// accessible without the private modifier
// testDept.employees.push("Test!");
testDept.describe();
testDept.printEmployeeInfo();
var itDept = new ITDepartment("IT", ["Kbza"]);
itDept.addEmployee("Dario");
itDept.describe();
