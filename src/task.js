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

  constructor(props) {
    if (!props) throw new Error("parameters are required");
    this.#id = props.id;
    if (!props.startDate) this.#startDate = new Date();
    else this.#startDate = props.startDate;
    if (!props.startDate) this.#startDate = new Date();
    else this.#dueDate = props.dueDate;
  }

  dependsOn(taskId, dependanceType, params = "0") {
    if (taskId == undefined) throw new Error("missing parameters");

    if (typeof taskId != "string" || taskId == "")
      throw new Error("taskId attribute should be a non-empty string");

    let taskExist = Register.getTask(taskId);
    if (!taskExist) throw new Error("the task doesn't exist");

    if (dependanceType == undefined || dependanceType == "") {
      if (this.getStartDate() < taskExist.getStartDate()) {
        this.#startDate = taskExist.getStartDate();
      }
      this.#startDate = new Date(
        this.addDateWithParams(params, this.#startDate)
      );
      let informationOfDependance = {
        idTask: taskId,
        typeOfDependance: "DD",
        parameters: params.toString(),
      };
      this.setDependances(informationOfDependance);
    } else {
      if (
        dependanceType != "DD" &&
        dependanceType != "FF" &&
        dependanceType != "FD"
      )
        throw new Error("parameter dependanceType should be DD or FF or FD");
      if (dependanceType == "DD") {
        if (this.getStartDate() < taskExist.getStartDate()) {
          this.#startDate = new Date(
            this.addDateWithParams(params, taskExist.getStartDate())
          );
        } else
          this.#startDate = new Date(
            this.addDateWithParams(params, this.#startDate)
          );
      } else if (dependanceType == "FF") {
        if (this.getDueDate() < taskExist.getDueDate())
          this.#dueDate = new Date(
            this.addDateWithParams(params, taskExist.getDueDate())
          );
        else
          this.#dueDate = new Date(
            this.addDateWithParams(params, this.#dueDate)
          );
      } else if (dependanceType == "FD") {
        if (this.getStartDate() < taskExist.getDueDate())
          this.#startDate = new Date(
            this.addDateWithParams(params, taskExist.getDueDate())
          );
        else
          this.#startDate = new Date(
            this.addDateWithParams(params, this.#startDate)
          );
      }
      let informationOfDependance = {
        idTask: taskId,
        typeOfDependance: dependanceType,
        parameters: params.toString(),
      };
      this.setDependances(informationOfDependance);
    }
    let compteur1 = 0;
    for (let i = 0; i < this.getDependances().length; i++) {
      if (
        this.getDependances()[i].idTask == taskId &&
        this.getDependances()[i].typeOfDependance == "DD"
      ) {
        compteur1++;
      }
      if (compteur1 > 1) {
        this.getDependances().splice(i, 1);
        break;
      }
    }
    let compteur2 = 0;
    for (let i = 0; i < this.getDependances().length; i++) {
      if (
        this.getDependances()[i].idTask == taskId &&
        this.getDependances()[i].typeOfDependance == "FF"
      ) {
        compteur2++;
      }
      if (compteur2 > 1) {
        this.getDependances().splice(i, 1);
        break;
      }
    }
    let compteur3 = 0;
    for (let i = 0; i < this.getDependances().length; i++) {
      if (
        this.getDependances()[i].idTask == taskId &&
        this.getDependances()[i].typeOfDependance == "FD"
      ) {
        compteur3++;
      }
      if (compteur3 > 1) {
        this.getDependances().splice(i, 1);
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
    this.#taskResponsible = username;
  }

  addDateWithParams(params, date) {
    return Math.abs(parseInt(params)) * 24 * 60 * 60 * 1000 + date.getTime();
  }

  getId() {
    return this.#id;
  }

  getStartDate() {
    return this.#startDate;
  }

  setStartDate(startDate) {
    this.#startDate = startDate;
  }

  getDueDate() {
    return this.#dueDate;
  }

  setDependances(value) {
    this.#dependances.push(value);
  }

  getDependances() {
    return this.#dependances;
  }

  getTaskResponsible() {
    return this.#taskResponsible;
  }
}
