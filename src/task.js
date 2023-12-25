const taskPriority = ["high", "normal", "low"];

const generateId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000000000);
    return randomNumber.toString();
}

class Task {
    #id = false;
    #title = "";
    #description = "";
    #status = "";
    #priority = "";
    #startDate = new Date();
    #dueDate = new Date();
    #dependences = [];
    #taskResponsible = "";
    #parent = undefined;

    #validatePriority(value){
        if(value && !taskPriority.includes(value))
            throw new Error("priority should be high, normal or low");   
    }

    #validateStartDate(value){
        if(value && !validateDateFormat(value)) 
            throw new Error("startDate should be in valid format");
        else if(this.#parent != undefined && this.#parent.startDate && this.#parent.startDate > initializeHourMinSec(new Date(value)))
            throw new Error("startDate should be before parent's startDate");
    }

    #validateDueDate(value){
        var date = initializeHourMinSec(new Date(value));
    
        if(value && !validateDateFormat(value)) 
            throw new Error("dueDate should be in valid format");
        
        if(value && this.#startDate && date < this.#startDate) 
            throw new Error("This dueDate should be after startDate");
        
        if(this.#parent != undefined && this.#parent.dueDate && this.#parent.dueDate < initializeHourMinSec(new Date(value)))
            throw new Error("dueDate should be before parent's dueDate");
    }

    constructor(props){
        if(!props)
            throw new Error("parameters are required");
        
        if(!props.title)
            throw new Error("title attribute should be provided");

        this.#validatePriority(props.priority);
        this.#validateStartDate(props.startDate);

        // Initialize attributes
        this.#id = generateId();
        this.#title = toString(props.title);
        this.#description = toString(props.description);
        this.#status = props.status;
        
        if(props.priority && taskPriority.includes(props.priority)){
            this.#priority = props.priority;
        }else{
            this.#priority = DEFAULT_TASK_PRIORITY;
        }

        var date = initializeHourMinSec(new Date(props.startDate));
        if (props.startDate && validateDateFormat(props.startDate))
            this.#startDate = initializeHourMinSec(new Date(props.startDate));
        else
            this.#startDate = initializeHourMinSec(new Date());
    
        this.#validateDueDate(props.dueDate);
        this.#dueDate = initializeHourMinSec(new Date(props.dueDate));

        // parentDependencie
        if(props.parent)
            this.setParent(props.parent);
    }

    setParent(value){
        if(!value || !(value instanceof Task))
            throw new Error("task for child dependence should be class of Task");
        else if(value == this)
            throw new Error("this child shouldn't be parent of itself");
        else if(value.startDate && this.#startDate && this.#startDate < value.startDate)
            throw new Error("parent startDate should be before a child startDate");
        else if(value.dueDate && this.#dueDate && this.#dueDate > value.dueDate)
            throw new Error("parent dueDate should be after a child dueDate");
        else
            this.#parent = value;
    }

    // getters
    get id(){
        return this.#id;
    }

    get title(){
        return this.#title;
    }

    get description(){
        return this.#description;
    }

    get status(){
        return this.#status;
    }
    get priority(){
        return this.#priority;
    }

    get startDate(){
        return this.#startDate;
    }

    get dueDate(){
        return this.#dueDate;
    }

    // setters
    set title(value) {
        if(!value)
            throw new Error("title attribute should be provided");

        this.#title = value.toString();
    }

    set description(value) {
        this.#description = value.toString();
    }

    set status(value) {
        this.#status = value.toString();
    }

    set priority(value) {
        if(!value || typeof value != "string")
            throw new Error("Task priority should be string");

        this.#validatePriority(value);
        this.#priority = value;
    }

    set startDate(value) {
        this.#validateStartDate(value);
        this.#startDate = initializeHourMinSec(new Date(value));;
    }

    set dueDate(value) {
        this.#validateDueDate(value);
        this.#dueDate = initializeHourMinSec(new Date(value));
    }
}