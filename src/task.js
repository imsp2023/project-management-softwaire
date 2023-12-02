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
  }

  dependsOn(taskid, dependanceType, params) {
    if (typeof taskid != "string" || taskid == "")
      throw new Error("parameter taskid should be a string and non-empty");
    //Vérifier si id est vraiment l'id d'une task
    if (typeof dependanceType != "string" || dependanceType == "")
      throw new Error(
        "parameter dependanceType should be a string and non-empty"
      );
    if (typeof params != "string" || params == "")
      throw new Error("parameter params should be a string and non-empty");
  }
}
