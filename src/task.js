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

    constructor(props){
        if(!props)
            throw new Error("parameters are required");
    }
}