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

  dependsOn(task, dependanceType, params) {
    if (!(task instanceof Task))
      throw new Error(
        "you're trying to make a modification to a task that doesn't exist."
      );
    //Vérifier si id est vraiment l'id d'une task
    //Même dependance mélangé
    if (typeof dependanceType != "string" || dependanceType == "")
      throw new Error(
        "parameter dependanceType should be a string and non-empty"
      );

    if (typeof params != "string" || params == "")
      throw new Error("parameter params should be a string and non-empty");

    if (
      dependanceType != "DD" &&
      dependanceType != "FF" &&
      dependanceType != "FD"
    )
      throw new Error("parameter dependanceType should be DD or FF or FD");

    if (dependanceType == "DD" && this.getStartDate() < task.getStartDate())
      throw new Error(
        "the start date of the dependent task should be greater than that of the task on which it depends"
      );

    if (dependanceType == "FF" && this.getDueDate() < task.getDueDate())
      throw new Error(
        "the due date of the dependent task must be greater than that of the task on which it depends"
      );

    if (dependanceType == "FD" && this.getStartDate() < task.getDueDate())
      throw new Error(
        "the start date of the dependent task must be greater than the end date of the task on which it depends"
      );
    let informationOfDependance = {
      taskId: task.getId(),
      typeOfDependance: dependanceType,
      parameters: params,
    };
    this.setDependances(informationOfDependance);
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
}
