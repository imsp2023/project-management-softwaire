class Task {
    id = undefined;
    _title = undefined;
    _description = undefined;
    _status = undefined;
    _priority = undefined;
    _startDate = undefined;
    _dueDate = undefined;
    dependences = {};
    _responsible = undefined;
    _parent = undefined;

    constructor(props){
        if (!props)
            throw new Error(MISSING_PARAMETERS);
        if (props.id && typeof props.id != 'string')
            throw new Error(INVALID_TYPE_PARAMETER);
        if (!props.id || props.id == "")
            this.id = _uuid.generate();
        else
            this.id = props.id;
        if (!props.title)
            throw new Error(MISSING_PARAMETERS);
        this.title = props.title;
        if (props.description)
            this.description = props.description;
        if (props.priority)
            this.priority = props.priority;
        if (props.status)
            this.status = props.status;
        if (props.startDate)
            this.startDate = props.startDate;
        if (props.dueDate)
            this.dueDate = props.dueDate;
        if (props.parentId)
            this.parent = props.parentId;
        if (props.dependences && !Array.isArray(props.dependences))
            throw new Error(INVALID_TYPE_PARAMETER);
        props.dependences && props.dependences.map(({id, type, offsetDay})=>{
            this.dependsOn(id, type);
            this.addOffsetDayOnDependence(id, offsetDay);
        });
        if (props.responsible)
            this.responsible = props.responsible;
    }

    dependsOn(taskId = 0, dependence = START_START){
        let taskExist, dependenceIsCyclic;
        if (!taskId)
            throw new Error(MISSING_PARAMETERS);
        taskExist = Register.getTask(taskId);
        if (!taskExist)
            throw new Error(INEXISTANT_TASK);
        dependenceIsCyclic = this.hasCyclicDependence(taskId);
        if (dependenceIsCyclic)
            throw new Error(CYCLIC_DEPENDENCE_NOT_ALLOWED);
        switch(dependence){
            case START_START:
                if (this.startDate < taskExist.startDate)
                    this.startDate = taskExist.startDate.getDate() + '-' + 
                                    Number(taskExist.startDate.getMonth() + 1) + '-' +
                                    taskExist.startDate.getFullYear();
                break;
            case END_START:
                if (this.startDate < taskExist.dueDate)
                this.startDate = taskExist.dueDate.getDate() + '-' + 
                                Number(taskExist.dueDate.getMonth() + 1) + '-' +
                                taskExist.dueDate.getFullYear();
                break;
            case END_END:
                if (this.dueDate < taskExist.dueDate)
                    this.dueDate = taskExist.dueDate.getDate() + '-' + 
                                    Number(taskExist.dueDate.getMonth() + 1) + '-' +
                                    taskExist.dueDate.getFullYear();
                break;
            default:
                throw new Error(INVALID_DEPENDENCE);
        }
        this.dependences[taskId] = dependence;
    }

    addOffsetDayOnDependence(taskId, offsetDay){

    }

    hasCyclicDependence(taskId){

    }

    set parent(parentId){
        let parentTask;
        if (!parentId)
            throw new Error(MISSING_PARAMETERS);
        parentTask = Register.getTask(parentId);
        if (!parentTask)
            throw new Error(INEXISTANT_TASK);
        if (parentTask.startDate > this.startDate)
            this.startDate = parentTask.startDate;
        if (parentTask.dueDate < this.dueDate)
            this.dueDate = parentTask.dueDate;
    }

    // getters
    get id(){
        return this.id;
    }

    get title(){
        return this._title;
    }

    get description(){
        return this._description;
    }

    get status(){
        return this._status;
    }
    get priority(){
        return this._priority;
    }

    get startDate(){
        return this._startDate;
    }

    get dueDate(){
        return this._dueDate;
    }

    // setters
    set title(value) {
        if (!value)
            throw new Error(MISSING_PARAMETERS);
        if (typeof value != 'string')
            throw new Error(INVALID_TYPE_PARAMETER);
        this._title = value;
    }

    set description(value) {
        if (!value)
            throw new Error(MISSING_PARAMETERS);
        if (typeof value != 'string')
            throw new Error(INVALID_TYPE_PARAMETER);
        this._description = value;
    }

    set status(value) {
        if (typeof value != 'string')
            throw new Error(INVALID_TYPE_PARAMETER);
        this._status = value;
    }

    set priority(value) {
        if (typeof value != 'number')
            throw new Error(INVALID_TYPE_PARAMETER);
        this._priority = value;
    }

    set startDate(value) {
        if (!regex.test(value))
            throw new Error(INVALID_DATE_FORMAT);
        var dates = value.split('-');
        this._startDate = new Date(Number(dates[YEAR]), Number(dates[MONTH]) - 1, Number(dates[DAY]));
    }

    set dueDate(value) {
        if (!regex.test(value))
            throw new Error(INVALID_DATE_FORMAT);
        var dates = value.split('-');
        this._dueDate = new Date(Number(dates[YEAR]), Number(dates[MONTH]) - 1, Number(dates[DAY]));
    }

    set responsible(username){
        let memberExist;
        memberExist = Register.isMemberExist(username);
        if (!memberExist)
            throw new Error(INEXISTANT_MEMBER);
        this._responsible = username;
    }
}