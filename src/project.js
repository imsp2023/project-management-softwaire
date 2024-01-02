class Project {
  id = undefined;
  _name = undefined;
  _responsible = undefined;
  _description = undefined;
  _startDate = "";
  _endDate = "";
  _status = undefined; 
  members = [];

  constructor(props = undefined) {
    if (!props) 
      throw new Error(MISSING_PARAMETERS);
    if (props.id && typeof props.id != 'string')
        throw new Error(INVALID_TYPE_PARAMETER);
    if (!props.id || props.id == "")
      this.id = _uuid.generate();
    else
      this.id = props.id;
    if (!props.name)
      throw new Error(MISSING_PARAMETERS);
    if (typeof props.name != 'string')
      throw new Error(INVALID_TYPE_PARAMETER);
    this.name = props.name;
    if ((props.members || props.members == "") && !Array.isArray(props.members))
      throw new  Error(INVALID_TYPE_PARAMETER);
    if (props.members)
      props.members.map((username)=>{
        this.assign(username);
      });
    if (props.responsible)
      this.responsible = props.responsible;
    if (props.description) 
      this.description = props.description;
    if (props.status) 
      this.status = props.status;
    if (props.startDate)
        this.startDate = props.startDate;
    if (props.endDate) 
      this.endDate = props.endDate;
    Register.addProject(this);
  }


  /**
   * getters
   */
  get name (){
    return this._name;
  }

  get description (){
    return this._description;
  }

  get responsible (){
    return this._responsible;
  }

  get startDate(){
    return this._startDate;
  }

  get endDate(){
    return this._endDate;
  }
  
  /**
   * setters
   */  
  assign(username){
    var memberExist;
    if (this.members.includes(username))
      return;
    memberExist = Register.isMemberExist(username);
    if (memberExist == false)
      throw new Error(INEXISTANT_MEMBER);
    this.members.push(username);    
  }

  unAssign(username){
    if (this.members.includes(username))
      this.members.splice(this.members.indexOf(username), 1);
    else
      throw new Error(INEXISTANT_MEMBER);
  }

  set startDate(value){
    if (!regex.test(value))
      throw new Error(INVALID_DATE_FORMAT);
    var dates = value.split('-');
    this._startDate = new Date(Number(dates[YEAR]), Number(dates[MONTH]) - 1, Number(dates[DAY]));
  }

  set endDate(value){
    if (!regex.test(value))
      throw new Error(INVALID_DATE_FORMAT);
      var dates = value.split('-');
      this._endDate = new Date(Number(dates[YEAR]), Number(dates[MONTH]) - 1, Number(dates[DAY]));
    }

  set status(value){
    if (typeof value != 'string')
      throw new Error(INVALID_TYPE_PARAMETER);
    this._status = value;
  }

  set responsible(value){
    var memberExiste;
    if (!value)
      throw new Error(MISSING_PARAMETERS);
    if (!this.members.includes(value)){
      memberExiste = Register.isMemberExist(value);
      if (memberExiste)
        this.members.push(value);
      else
        throw new Error(INEXISTING_MEMBER);
    }
    this._responsible = value;
  }

  set description(value){
    if (!value)
      throw new Error(MISSING_PARAMETERS);
    if (value && typeof value !='string')
      throw new Error(INVALID_TYPE_PARAMETER);
    this._description = value;
  }

  set name(value){
    if (!value && value != "")
      throw new Error(MISSING_PARAMETERS);
    if (value == "")
      throw new Error(NON_EMPTY_STRING_VALUE);
    if (typeof value != 'string')
      throw new Error(INVALID_TYPE_PARAMETER);
    this._value = value;
  }


  updateTaskStartDate(task, value){
    var date = value.split('-');
    if ((new Date(date[YEAR], date[MONTH] - 1, date[DAY])).getTime() < this.startDate.getTime())
      task.startDate = this.startDate.getDate() + '-' + 
                        Number(this.startDate.getMonth() + 1) + '-' + 
                        this.startDate.getFullYear();
    else
      task.startDate = value;
  }

  updateTaskDueDate(task, value){
    var date = value.split('-');
    if ((new Date(date[YEAR], date[MONTH] - 1, date[DAY])).getTime() > this.endDate.getTime())
      task.dueDate = this.endDate.getDate() + '-' + 
                      Number(this.endDate.getMonth() + 1) + '-' + 
                      this.endDate.getFullYear();
    else
      task.dueDate = value;
  }

  addTask(task){
    if (!task)
      throw new Error(MISSING_PARAMETERS);
    if (!(task instanceof Task))
      throw new Error(INVALID_TYPE_PARAMETER);
    this.validateTask(task);
    Register.addTask(task);
  }

  removeTask(taskId = 0){
    if (taskId == null)
      throw new Error(INVALID_TYPE_PARAMETER);
    if (!taskId)
      throw new Error(MISSING_PARAMETERS);
    if (typeof taskId != 'string')
      throw new Error(INVALID_TYPE_PARAMETER);
    Register.deleteTask(taskId);
  }

  validateTask(task = 0){
    if (task == null)
      throw new Error(INVALID_TYPE_PARAMETER);
    if (!task)
      throw new Error(MISSING_PARAMETERS);
    if (!(task instanceof Task))
      throw new Error(INVALID_TYPE_PARAMETER);
    this.updateTaskStartDate(task, task.startDate.getDate() + '-' + 
                              Number(task.startDate.getMonth() + 1) + '-' + 
                              task.startDate.getFullYear());
    this.updateTaskDueDate(task, task.dueDate.getDate() + '-' + 
                              Number(task.dueDate.getMonth() + 1) + '-' + 
                              task.dueDate.getFullYear());
  }
}