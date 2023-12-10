const taskPriority = ["high", "normal", "low"];

const generateId = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000000000);
    return randomNumber.toString();
}

class Task {
    #id = "";
    #title = "";
    #description = "";
    #status = "";
    #priority = "";
    #startDate = new Date();
    #dueDate = new Date();
    #dependences = [];
    #taskResponsible = "";
    
    #validateTitle(value) {
        if(!value)
            throw new Error("title attribute should be provided");
        
        if(typeof value !== "string")
            throw new Error("title attribute should be string");
    }

    #validateDescription(value) {
        if(value && typeof value !== "string")
            throw new Error("Task description should be string");
    }

    #validateStatus(value) {        
        if(value && typeof value !== "string")
            throw new Error("Task status should be string");
    }

    #validatePriority(value){
        if(value && !taskPriority.includes(value))
            throw new Error("priority should be high, normal or low");   
    }

    #validateStartDate(value){
        var date = initializeHourMinSec(new Date(value));
        if(value && !validateDateFormat(value)) 
            throw new Error("startDate should be in valid format");

        if(value && date < initializeHourMinSec(new Date())) 
            throw new Error("This startDate has passed");
    }

    #validateDueDate(value){
        var date = initializeHourMinSec(new Date(value));
        // if(!value)
        //     throw new Error("dueDate attribute should be provided");
        if(value && !validateDateFormat(value)) 
            throw new Error("dueDate should be in valid format");
        
        if(value && date < this.#startDate) 
            throw new Error("This dueDate should be after startDate");
    }

    constructor(props){
        if(!props)
            throw new Error("parameters are required");

        this.#validateTitle(props.title);
        this.#validateDescription(props.description);
        this.#validateStatus(props.status);
        this.#validatePriority(props.priority);
        this.#validateStartDate(props.startDate);

        if(props.dependences){
            if(!props.dependences.dependenceType || props.dependences.dependenceType != "child")
                throw new Error("dependenceType should be 'child'");

            else if(!props.dependences.task || !props.dependences.task instanceof Task)
                throw new Error("task for child dependence should be class of Task");

            else if(!props.dependences.params || typeof props.dependences.params == "string")
                throw new Error("params attribute for childDependance should be string");
            else   
                this.#dependences.push(props.dependences);
        }

        // Initialize attributes
        this.#id = generateId();
        this.#title = props.title;
        this.#description = props.description;
        this.#status = props.status;
        
        if(props.priority && taskPriority.includes(props.priority)){
            this.#priority = props.priority;
        }else{
            this.#priority = DEFAULT_TASK_PRIORITY;
        }

        var date = initializeHourMinSec(new Date(props.startDate));
        if (props.startDate && validateDateFormat(props.startDate) && date >= initializeHourMinSec(new Date()))
            this.#startDate = initializeHourMinSec(new Date(props.startDate));
        else
            this.#startDate = initializeHourMinSec(new Date());
    
        this.#validateDueDate(props.dueDate);
        this.#dueDate = initializeHourMinSec(new Date(props.dueDate));
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
        this.#validateTitle(value);
        this.#title = value;
    }

    set description(value) {
        this.#validateDescription(value);
        this.#description = value;
    }

    set status(value) {
        this.#validateStatus(value);
        this.#status = value;
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