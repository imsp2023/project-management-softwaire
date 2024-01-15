
class Project {
  id = undefined;
  _name = undefined;
  _responsible = undefined;
  _description = undefined;
  _startDate = "";
  _endDate = "";
  _status = undefined; 
  tasks = {};
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
        this.addMember(username);
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
  addMember(username){
    var memberExist;
    if (this.members.includes(username))
      return;
    memberExist = configuration.users.includes(username);
    if (memberExist == false)
      throw new Error(INEXISTANT_MEMBER);
    this.members.push(username);    
  }

  removeMember(username){
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

  set responsible(username){
    var memberExist;
    if (!username)
      throw new Error(MISSING_PARAMETERS);
    if (!this.members.includes(username)){
      memberExist = configuration.users.includes(username);
      if (memberExist)
        this.members.push(username);
      else
        throw new Error(INEXISTING_MEMBER);
    }
    this._responsible = username;
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


  addTask(task){
    if (!task)
      throw new Error(MISSING_PARAMETERS);
    if (!(task instanceof Task))
      throw new Error(INVALID_TYPE_PARAMETER);
    this.validateTask(task);
    this.tasks[task.id] = task;
  }

  removeTask(taskId = 0){
    if (taskId == null)
      throw new Error(INVALID_TYPE_PARAMETER);
    if (!taskId)
      throw new Error(MISSING_PARAMETERS);
    if (typeof taskId != 'string')
      throw new Error(INVALID_TYPE_PARAMETER);
    delete this.tasks[taskId];
  }

  validateTask(task = 0){
    let date;
    if (task == null)
      throw new Error(INVALID_TYPE_PARAMETER);
    if (!task)
      throw new Error(MISSING_PARAMETERS);
    if (!(task instanceof Task))
      throw new Error(INVALID_TYPE_PARAMETER);
 
    date = task.startDate.getDate() + '-' + 
                Number(task.startDate.getMonth() + 1) + '-' + 
                task.startDate.getFullYear();

    if (task.startDate.getTime() < this.startDate.getTime())
      task.startDate = this.startDate.getDate() + '-' + 
                        Number(this.startDate.getMonth() + 1) + '-' + 
                        this.startDate.getFullYear();
    else
      task.startDate = date;

    date = task.dueDate.getDate() + '-' + 
            Number(task.dueDate.getMonth() + 1) + '-' + 
            task.dueDate.getFullYear();
    if (task.dueDate.getTime() > this.endDate.getTime())
      task.dueDate = this.endDate.getDate() + '-' + 
                      Number(this.endDate.getMonth() + 1) + '-' + 
                      this.endDate.getFullYear();
    else
      task.dueDate = date;
  }
}
