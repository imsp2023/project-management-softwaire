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
    this.#startDate = props.startDate;
    this.#dueDate = props.dueDate;
  }

  dependsOn(task, dependanceType, params = "") {
    if (task == undefined) throw new Error("missing parameters");

    if (!(task instanceof Task))
      throw new Error("the task parameter should be a Task object");

    if (task == this)
      throw new Error("parameter task shouldn't same as task depends");

    if (dependanceType == undefined)
      throw new Error("parameter dependanceType is required");

    if (
      dependanceType != "DD" &&
      dependanceType != "FF" &&
      dependanceType != "FD"
    )
      throw new Error("parameter dependanceType should be DD or FF or FD");

    if (typeof params != "string")
      throw new Error("parameter params should be a string");

    if (dependanceType == "DD" && this.getStartDate() < task.getStartDate())
      this.#startDate = task.getStartDate();

    if (dependanceType == "FF" && this.getDueDate() < task.getDueDate())
      this.#dueDate = task.getDueDate();

    if (dependanceType == "FD" && this.getStartDate() < task.getDueDate())
      this.#startDate = task.getDueDate();

    let informationOfDependance = {
      taskId: task.getId(),
      typeOfDependance: dependanceType,
      parameters: params,
    };
    this.setDependances(informationOfDependance);

    let compteur1 = 0;
    for (let i = 0; i < this.getDependances().length; i++) {
      if (
        this.getDependances()[i].taskId == task.getId() &&
        this.getDependances()[i].typeOfDependance == "DD"
      ) {
        compteur1++;
      }
      if (compteur1 > 1) {
        this.getDependances().splice(i, 1);
        throw new Error(
          "there is already a DD relationship between these two tasks"
        );
      }
    }

    let compteur2 = 0;
    for (let i = 0; i < this.getDependances().length; i++) {
      if (
        this.getDependances()[i].taskId == task.getId() &&
        this.getDependances()[i].typeOfDependance == "FF"
      ) {
        compteur2++;
      }
      if (compteur2 > 1) {
        this.getDependances().splice(i, 1);
        throw new Error(
          "there is already a FF relationship between these two tasks"
        );
      }
    }

    let compteur3 = 0;
    for (let i = 0; i < this.getDependances().length; i++) {
      if (
        this.getDependances()[i].taskId == task.getId() &&
        this.getDependances()[i].typeOfDependance == "FD"
      ) {
        compteur3++;
      }
      if (compteur3 > 1) {
        this.getDependances().splice(i, 1);
        throw new Error(
          "there is already a FD relationship between these two tasks"
        );
      }
    }
  }

  assignedTo(username) {
    if (username == undefined) throw new Error("parameter is required");
    if (typeof username != "string" || username == "")
      throw new Error("username attribute should be a non-empty string");
    this.#taskResponsible = username;
  }

  getId() {
    return this.#id;
  }

  getStartDate() {
    return this.#startDate;
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
