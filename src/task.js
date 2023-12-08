// const { Register } = require("../src/register");
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

  dependsOn(taskId, dependanceType, params = "") {
    if (taskId == undefined) throw new Error("parameter taskId is required");
    if (typeof taskId != "string" || taskId == "")
      throw new Error("parameter taskId should be a non-empty string");

    if (dependanceType == undefined)
      throw new Error("parameter dependanceType is missing");

    if (
      dependanceType != "DD" &&
      dependanceType != "FF" &&
      dependanceType != "FD"
    )
      throw new Error("parameter dependanceType should be DD or FF or FD");

    // if (params == undefined) throw new Error("parameter params is missing");

    if (typeof params != "string") {
      throw new Error("parameter params should be a string");
    }

    var task = Register.getTask(taskId, "");
    if (dependanceType == "DD" && this.getStartDate() < task.getStartDate()) {
      this.#startDate = task.getStartDate();
    }

    // if (dependanceType == "FF" && this.getDueDate() < task.getDueDate())
    //   throw new Error(
    //     "the due date of the dependent task must be greater than that of the task on which it depends"
    //   );

    // if (dependanceType == "FD" && this.getStartDate() < task.getDueDate())
    //   throw new Error(
    //     "the start date of the dependent task must be greater than the end date of the task on which it depends"
    //   );

    // let informationOfDependance = {
    //   taskId: task.getId(),
    //   typeOfDependance: dependanceType,
    //   parameters: params,
    // };
    // this.setDependances(informationOfDependance);

    // for (let i = 0; i < this.getDependances().length; i++) {
    //   if (this.getDependances()[i].taskId == this.getId()) {
    //     this.getDependances().splice(i, 1);
    //     throw new Error("you try to create a relation between same task");
    //   }
    // }

    // for (let i = 0; i < task.getDependances().length; i++) {
    //   if (task.getDependances()[i].typeOfDependance == "child") {
    //     this.getDependances().splice(i, 1);
    //     throw new Error(
    //       "a parent task can no longer be the child of its own child"
    //     );
    //   }
    // }

    // let compteur = 0;
    // for (let i = 0; i < this.getDependances().length; i++) {
    //   if (
    //     this.getDependances()[i].taskId == task.getId() &&
    //     this.getDependances()[i].typeOfDependance == "child"
    //   ) {
    //     compteur++;
    //   }
    //   if (compteur > 1) {
    //     this.getDependances().splice(i, 1);
    //     throw new Error(
    //       "there is already a child relationship between these two tasks"
    //     );
    //   }
    // }

    // let compteurO = 0;
    // for (let i = 0; i < this.getDependances().length; i++) {
    //   if (this.getDependances()[i].typeOfDependance == "child") {
    //     compteurO++;
    //   }
    //   if (compteurO > 1) {
    //     this.getDependances().splice(i, 1);
    //     throw new Error("the task is child of other task");
    //   }
    // }

    // let compteur1 = 0;
    // for (let i = 0; i < this.getDependances().length; i++) {
    //   if (
    //     this.getDependances()[i].taskId == task.getId() &&
    //     this.getDependances()[i].typeOfDependance == "DD"
    //   ) {
    //     compteur1++;
    //   }
    //   if (compteur1 > 1) {
    //     this.getDependances().splice(i, 1);
    //     throw new Error(
    //       "there is already a DD relationship between these two tasks"
    //     );
    //   }
    // }

    // let compteur2 = 0;
    // for (let i = 0; i < this.getDependances().length; i++) {
    //   if (
    //     this.getDependances()[i].taskId == task.getId() &&
    //     this.getDependances()[i].typeOfDependance == "FF"
    //   ) {
    //     compteur2++;
    //   }
    //   if (compteur2 > 1) {
    //     this.getDependances().splice(i, 1);
    //     throw new Error(
    //       "there is already a FF relationship between these two tasks"
    //     );
    //   }
    // }

    // let compteur3 = 0;
    // for (let i = 0; i < this.getDependances().length; i++) {
    //   if (
    //     this.getDependances()[i].taskId == task.getId() &&
    //     this.getDependances()[i].typeOfDependance == "FD"
    //   ) {
    //     compteur3++;
    //   }
    //   if (compteur3 > 1) {
    //     this.getDependances().splice(i, 1);
    //     throw new Error(
    //       "there is already a FD relationship between these two tasks"
    //     );
    //   }
    // }
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

  // setDependances(value) {
  //   this.#dependances.push(value);
  // }

  getDependances() {
    return this.#dependances;
  }

  getTaskResponsible() {
    return this.#taskResponsible;
  }
}