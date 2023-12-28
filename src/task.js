class Task {
  id = "";
  _title = "";
  _description = "";
  _status = "";
  _priority = "";
  _startDate = new Date();
  _dueDate = new Date();
  dependances = [];
  _taskResponsible = "";

  constructor(props) {
    if (!props) throw new Error("parameters are required");
    this.id = props.id;
    if (!props.startDate) this.startDate = new Date();
    else this.startDate = props.startDate;
    if (!props.dueDate) this.dueDate = new Date();
    else this.dueDate = props.dueDate;
    console.log(this.dueDate);
  }

  dependsOn(taskId, depandanceType = "DD", decalageJournalier = 0) {
    if (taskId == undefined) throw new Error("missing parameters");

    if (typeof taskId != "string" || taskId == "")
      throw new Error("taskId attribute should be a non-empty string");

    if (this.id == taskId) throw new Error(CYCLIC_DEPENDANCE_NOT_ALLOW);

    let taskExist = Register.getTask(taskId);
    if (!taskExist) throw new Error("the task doesn't exist");

    if (
      depandanceType != "DD" &&
      depandanceType != "FF" &&
      depandanceType != "FD"
    )
      throw new Error("parameter depandanceType should be DD or FF or FD");
    if (depandanceType == "DD")
      if (this.startDate < taskExist.startDate)
        this.startDate = taskExist.startDate;
    else if (depandanceType == "FF")
      if (this.dueDate < taskExist.dueDate){
        this.dueDate = taskExist.dueDate;
        console.log(this.dueDate);
      }
    else if (depandanceType == "FD")
      if (this.startDate < taskExist.dueDate)
        this.startDate = taskExist.dueDate;
    this.dependances.map(({ id, type }) => {
      if (id == taskExist.id && type == depandanceType) return;
    });
    this.dependances.push({ id: taskExist.id, type: depandanceType });
  }

  assignedTo(username) {
    if (username == undefined) throw new Error("parameter is required");
    if (typeof username != "string" || username == "")
      throw new Error("username attribute should be a non-empty string");
    if (!Register.isMemberExist())
      throw new Error("this username doesn't exist");
    this._taskResponsible = username;
  }

  addDateWithParams(params, date) {
    return Math.abs(params) * 24 * 60 * 60 * 1000 + date.getTime();
  }

  addOffsetDayOnDependence(taskId, offsetDay) {}

  //getters
  get taskResponsible() {
    return this._taskResponsible;
  }

  get startDate() {
    return this._startDate;
  }

  get dueDate() {
    return this._dueDate;
  }

  //setters
  set startDate(startDate) {
    this._startDate = startDate;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }
}
