const taskPriority = ["high", "normal", "low"];

class Task {
    #id = "";
    #title = "";
    #description = "";
    #status = "";
    #priority = "";
    #startDate = new Date();
    #dueDate = new Date();
    #dependances = [];
    #taskResponsible = "";

    #throwStringException(attribut, errorMessage1, errorMessage2){
        if(!attribut)
            throw new Error(errorMessage1);
        
        if(typeof attribut !== "string")
            throw new Error(errorMessage2);
    }

    #validateId(value) {
        if(!value)
            throw new Error("id should be provided");
        
        if(typeof value !== "string")
            throw new Error("id should be string");
    }

    #validateTitle(value) {
        if(!value)
            throw new Error("title attribute should be provided");
        
        if(typeof value !== "string")
            throw new Error("title attribute should be string");
    }

    #validateDescription(value) {
        if(!value)
            throw new Error("description attribute should be provided");
        
        if(typeof value !== "string")
            throw new Error("Task description should be string");
    }

    #validateStatus(value) {
        if(!value)
            throw new Error("status attribute should be provided");
        
        if(typeof value !== "string")
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
        
        if(value && date < new Date()) 
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

        this.#validateId(props.id);
        this.#validateTitle(props.title);
        this.#validateDescription(props.description);
        this.#validateStatus(props.status);
        this.#validatePriority(props.priority);
        this.#validateStartDate(props.startDate);

        // Initialize attributes
        this.#id = props.id;
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

    // let's get some attributes just for test
    get priority(){
        return this.#priority;
    }

    get startDate(){
        return this.#startDate;
    }

    get dueDate(){
        return this.#dueDate;
    }
}