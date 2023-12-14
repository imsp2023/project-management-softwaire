const regex = /(19|20)\d{2}(\/|-)(0[1-9]|1[1,2])(\/|-)(0[1-9]|[12][0-9]|3[01])/;

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
  
  /**
   * setters
   */  
  assign(username){
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
    this._startDate = new Date(value);
  }

  set endDate(value){
    if (!regex.test(value))
      throw new Error(INVALID_DATE_FORMAT);
    this._endDate = new Date(value);
  }

  set status(value){
    if (typeof value != 'string')
      throw new Error(INVALID_TYPE_PARAMETER);
    this._status = value;
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
}
