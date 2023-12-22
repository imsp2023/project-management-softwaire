class Task {
  #id = "";
  _title = "";
  _description = "";
  _status = "";
  _priority = "";
  _startDate = new Date();
  _dueDate = new Date();

  _dependances = [];
  _taskResponsible = "";

  constructor(props) {
    if (!props) throw new Error("parameters are required");
    this.#id = props.id;
    if (!props.startDate) this.startDate = new Date();
    else this.startDate = props.startDate;
    if (!props.dueDate) this.dueDate = new Date();
    else this.dueDate = props.dueDate;
  }

  dependsOn(taskId, dependanceType, nbreDeJours = 0) {
    if (taskId == undefined) throw new Error("missing parameters");

    if (typeof taskId != "string" || taskId == "")
      throw new Error("taskId attribute should be a non-empty string");

    if (typeof nbreDeJours != "number")
      throw new Error("nbreDeJours attribute should be a number");

    let taskExist = Register.getTask(taskId);
    if (!taskExist) throw new Error("the task doesn't exist");

    if (dependanceType == undefined || dependanceType == "") {
      if (this.startDate < taskExist.getStartDate()) {
        this.startDate = taskExist.getStartDate();
      }
      this.startDate = new Date(
        this.addDateWithParams(nbreDeJours, this.startDate)
      );
      let informationOfDependance = {
        idTask: taskId,
        typeOfDependance: "DD",
        parameters: nbreDeJours,
      };
      this.dependances = informationOfDependance;
    } else {
      if (
        dependanceType != "DD" &&
        dependanceType != "FF" &&
        dependanceType != "FD"
      )
        throw new Error("parameter dependanceType should be DD or FF or FD");
      if (dependanceType == "DD") {
        if (this.startDate < taskExist.getStartDate()) {
          this.startDate = new Date(
            this.addDateWithParams(nbreDeJours, taskExist.getStartDate())
          );
        } else
          this.startDate = new Date(
            this.addDateWithParams(nbreDeJours, this.startDate)
          );
      } else if (dependanceType == "FF") {
        if (this.dueDate < taskExist.getDueDate())
          this.dueDate = new Date(
            this.addDateWithParams(nbreDeJours, taskExist.getDueDate())
          );
        else
          this.dueDate = new Date(
            this.addDateWithParams(nbreDeJours, this.dueDate)
          );
      } else if (dependanceType == "FD") {
        if (this.startDate < taskExist.getDueDate())
          this.startDate = new Date(
            this.addDateWithParams(nbreDeJours, taskExist.getDueDate())
          );
        else
          this.startDate = new Date(
            this.addDateWithParams(nbreDeJours, this.startDate)
          );
      }
      let informationOfDependance = {
        idTask: taskId,
        typeOfDependance: dependanceType,
        parameters: nbreDeJours,
      };
      this.dependances = informationOfDependance;
    }
    let compteur1 = 0;
    for (let i = 0; i < this.dependances.length; i++) {
      if (
        this.dependances[i].idTask == taskId &&
        this.dependances[i].typeOfDependance == "DD"
      ) {
        compteur1++;
      }
      if (compteur1 > 1) {
        this.dependances.splice(i, 1);
        break;
      }
    }
    let compteur2 = 0;
    for (let i = 0; i < this.dependances.length; i++) {
      if (
        this.dependances[i].idTask == taskId &&
        this.dependances[i].typeOfDependance == "FF"
      ) {
        compteur2++;
      }
      if (compteur2 > 1) {
        this.dependances.splice(i, 1);
        break;
      }
    }
    let compteur3 = 0;
    for (let i = 0; i < this.dependances.length; i++) {
      if (
        this.dependances[i].idTask == taskId &&
        this.dependances[i].typeOfDependance == "FD"
      ) {
        compteur3++;
      }
      if (compteur3 > 1) {
        this.dependances.splice(i, 1);
        break;
      }
    }
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

  //getters
  getId() {
    return this.#id;
  }

  get taskResponsible() {
    return this._taskResponsible;
  }

  get startDate() {
    return this._startDate;
  }

  get dueDate() {
    return this._dueDate;
  }

  get dependances() {
    return this._dependances;
  }

  //setters
  set startDate(startDate) {
    this._startDate = startDate;
  }

  set dueDate(dueDate) {
    this._dueDate = dueDate;
  }

  set dependances(value) {
    this._dependances.push(value);
  }

  //set taskResponsible(username) {
  //  this._taskResponsible = username;
  //}
}
