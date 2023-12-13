const regex = /(0[1-9]|[12][0-9]|3[01])(\/|-)(0[1-9]|1[1,2])(\/|-)(19|20)\d{2}/;

class Project {
  id = undefined;
  _name = undefined;
  _responsible = undefined;
  _description = undefined;
  _startDate = "";
  _dueDate = "";
  _status = undefined; 
  members = [];

  constructor(props = undefined) {
    if (!props) 
      throw new Error(MISSING_PARAMETERS);
    if (!props.id || props.id == "")
      this.id = _uuid.generate();
    else
      this.id = props.id.toString();
    if (!props.name) 
      throw new Error(MISSING_PARAMETERS);
    if (props.name == "")
      throw new Error(MISSING_PARAMETERS);
    this.name = props.name.toString();
    if (props.members && !Array.isArray(props.members))
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
    if (props.dueDate) 
      this.dueDate = props.dueDate;
  }

  /**
   * setters
   */  
  addMember(username){
    var memberExist;
    if (this.members.includes(username))
      return;
    memberExist = Register.isMemberExist(username);
    if (!memberExist)
      Register.saveMember({username: username});
    this.members.push(username);    
  }

  set startDate(value){
    if (!regex.test(value))
      throw new Error(INVALID_DATE_FORMAT);
    this._startDate = value;
  }

  set endDate(value){
    if (!regex.test(value))
      throw new Error(INVALID_DATE_FORMAT);
    this._endDate = value;
  }

  set status(value){
    this._status = value.toString();
  }

  set responsible(value){
    var memberExite;
    if (!value)
      throw new Error(MISSING_PARAMETERS);
    if (!this.members.includes(value)){
      memberExite = Register.isMemberExist(value);
      if (memberExite)
        this.members.push(value);
      else
        throw new Error(INEXISTING_MEMBER);
    }
    this._responsible = value;
  }

  set description(value){
    if (!value)
      throw new Error(MISSING_PARAMETERS);
    this._description = value.toString();
  }

  set name(value){
    if (!value)
      throw new Error(MISSING_PARAMETERS);
    if (value && value == "")
      throw new Error(NON_EMPTY_STRING_VALUE);
    this._value = value.toString();
  }
}
