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
        //create validator decorator
        return [enteredTitle, enteredDescription, enteredPeople];
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
