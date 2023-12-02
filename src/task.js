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

    initializeHourMinSec(date) {
        date.setHours(0, 0, 0, 0); 
        return date;
    }

    validateDateFormat(dateString) {
        const regexDate = /^(?:\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01]))$/;
        if(regexDate.test(dateString))
            return true;

        return false;
    }

    constructor(props){
        if(!props)
            throw new Error("parameters are required");

        this.#throwStringException(props.id, "id should be provided", "id should be string");

        this.#throwStringException(props.title, "title attribute should be provided", "title attribute should be string");

        this.#throwStringException(props.description, "description attribute should be provided", "Task description should be string");
        this.#throwStringException(props.status, "status attribute should be provided", "Task status should be string");

        
        if(props.priority){
            if(taskPriority.includes(props.priority))
                this.#priority = props.priority;
            else
                throw new Error("priority should be high, normal or low"); 
        }else{
            this.#priority = taskPriority[1];
        }


        var date = this.initializeHourMinSec(new Date(props.startDate));
        if(props.startDate && !this.validateDateFormat(props.startDate)) 
            throw new Error("startDate should be in valid format");
        
        if(props.startDate && date < new Date()) 
            throw new Error("This startDate has passed");

        if (props.startDate && this.validateDateFormat(props.startDate) && !isNaN(date.getTime()) && date >= this.initializeHourMinSec(new Date()))
            this.#startDate = this.initializeHourMinSec(new Date(props.startDate))
        else
            this.#startDate = this.initializeHourMinSec(new Date);
    }


    // let's get these attributes just for test
    get priority(){
        return this.#priority;
    }

    get startDate(){
        return this.#startDate;
    }
}