//Validation
interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(input: Validatable) {
    console.log(input);
    let isValid = true;
    if (input.required && input.value.toString().trim().length == 0)
        isValid = false;
    if (typeof input.value === "string") {
        if (input.minLength != null && input.value.length < input.minLength)
            isValid = false;
        if (input.maxLength != null && input.value.length > input.maxLength)
            isValid = false;
    } else if (typeof input.value === "number") {
        if (input.min != null && input.value < input.min) isValid = false;
        if (input.max != null && input.value > input.max) isValid = false;
    }
    console.log(isValid);
    return isValid;
}

//Decorator
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return newDescriptor;
}

class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    constructor(private type: "active" | "finished") {
        this.templateElement = document.getElementById(
            "project-list"
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild! as HTMLElement;
        this.element.id = `${type}-projects`;
        this.attach();
        this.renderContent();
    }
    private attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
    private renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = listId;
        this.element.querySelector(
            "h2"
        )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
}

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;
    constructor() {
        this.templateElement = document.getElementById(
            "project-input"
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild! as HTMLFormElement;
        this.element.id = "user-input";

        this.titleInputElement = this.element.querySelector(
            "#title"
        )! as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
            "#description"
        )! as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
            "#people"
        )! as HTMLInputElement;
        this.configure();
        this.attach();
    }
    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }

    private getUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (
            validate(titleValidatable) &&
            validate(descriptionValidatable) &&
            validate(peopleValidatable)
        )
            return [enteredTitle, enteredDescription, enteredPeople];
        else alert("invalid input");
    }
    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    @AutoBind
    private handleSubmit(event: Event) {
        event.preventDefault();
        const userInput = this.getUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            console.log(title, desc, people);
            this.clearInputs();
        }
    }
    private configure() {
        this.element.addEventListener("submit", this.handleSubmit.bind(this));
    }
}

const projInput = new ProjectInput();
const activePrjList = new ProjectList("active");
const finishedPrjList = new ProjectList("finished");
