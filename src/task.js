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

  dependsOn(task, dependanceType, params = "1") {
    if (task == undefined) throw new Error("missing parameters");

    if (!(task instanceof Task))
      throw new Error("the task parameter should be a Task object");

    if (task == this)
      throw new Error("the task parameter shouldn't same as task depends");

    if (dependanceType == undefined || dependanceType == "") {
      if (this.getStartDate() < task.getStartDate()) {
        this.#startDate = task.getStartDate();
        // //Ici
        // if (
        //   this.#startDate.getDate() != new Date().getDate() &&
        //   this.#startDate.getMonth() + 1 != new Date().getMonth() + 1 &&
        //   this.#startDate.getDate() != new Date().getDate()
        // ) {
        //   this.#startDate = new Date(
        //     `${this.#startDate.getFullYear()}-${
        //       this.#startDate.getMonth() + 1
        //     }-${this.#startDate.getDate() + parseInt(params) + 1}`
        //   );
        // } else {
        //   this.#startDate = new Date(
        //     `${this.#startDate.getFullYear()}-${
        //       this.#startDate.getMonth() + 1
        //     }-${this.#startDate.getDate() + parseInt(params)}`
        //   );
        // }
      }
      //Ici
      // if (
      //   this.#startDate.getDate() != new Date().getDate() &&
      //   this.#startDate.getMonth() + 1 != new Date().getMonth() + 1 &&
      //   this.#startDate.getDate() != new Date().getDate()
      // ) {
      //   this.#startDate = new Date(
      //     `${this.#startDate.getFullYear()}-${this.#startDate.getMonth() + 1}-${
      //       this.#startDate.getDate() + parseInt(params) + 1
      //     }`
      //   );
      // } else {
      //   this.#startDate = new Date(
      //     `${this.#startDate.getFullYear()}-${this.#startDate.getMonth() + 1}-${
      //       this.#startDate.getDate() + parseInt(params)
      //     }`
      //   );
      // }
      let informationOfDependance = {
        taskId: task.getId(),
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

      if (dependanceType == "DD" && this.getStartDate() < task.getStartDate()) {
        this.#startDate = task.getStartDate();
        //Ici
        // if (
        //   this.#startDate.getDate() != new Date().getDate() &&
        //   this.#startDate.getMonth() + 1 != new Date().getMonth() + 1 &&
        //   this.#startDate.getDate() != new Date().getDate()
        // ) {
        //   this.#startDate = new Date(
        //     `${this.#startDate.getFullYear()}-${
        //       this.#startDate.getMonth() + 1
        //     }-${this.#startDate.getDate() + parseInt(params) + 1}`
        //   );
        // } else {
        //   this.#startDate = new Date(
        //     `${this.#startDate.getFullYear()}-${
        //       this.#startDate.getMonth() + 1
        //     }-${this.#startDate.getDate() + parseInt(params)}`
        //   );
        // }
      }
      // else if (
      //   dependanceType == "DD" &&
      //   this.getStartDate() >= task.getStartDate()
      // ) {
      //   //Ici
      //   if (
      //     this.#startDate.getDate() != new Date().getDate() &&
      //     this.#startDate.getMonth() + 1 != new Date().getMonth() + 1 &&
      //     this.#startDate.getDate() != new Date().getDate()
      //   ) {
      //     this.#startDate = new Date(
      //       `${this.#startDate.getFullYear()}-${
      //         this.#startDate.getMonth() + 1
      //       }-${this.#startDate.getDate() + parseInt(params) + 1}`
      //     );
      //   } else {
      //     this.#startDate = new Date(
      //       `${this.#startDate.getFullYear()}-${
      //         this.#startDate.getMonth() + 1
      //       }-${this.#startDate.getDate() + parseInt(params)}`
      //     );
      //   }
      // }

      if (dependanceType == "FF" && this.getDueDate() < task.getDueDate()) {
        this.#dueDate = task.getDueDate();
        //Ici
        // if (
        //   this.#dueDate.getDate() != new Date().getDate() &&
        //   this.#dueDate.getMonth() + 1 != new Date().getMonth() + 1 &&
        //   this.#dueDate.getDate() != new Date().getDate()
        // ) {
        //   this.#dueDate = new Date(
        //     `${this.#dueDate.getFullYear()}-${this.#dueDate.getMonth() + 1}-${
        //       this.#dueDate.getDate() + parseInt(params) + 1
        //     }`
        //   );
        // } else {
        //   this.#dueDate = new Date(
        //     `${this.#dueDate.getFullYear()}-${this.#dueDate.getMonth() + 1}-${
        //       this.#dueDate.getDate() + parseInt(params)
        //     }`
        //   );
        // }
      }
      // else if (
      //   dependanceType == "FF" &&
      //   this.getDueDate() >= task.getDueDate()
      // ) {
      //   //Ici
      //   if (
      //     this.#dueDate.getDate() != new Date().getDate() &&
      //     this.#dueDate.getMonth() + 1 != new Date().getMonth() + 1 &&
      //     this.#dueDate.getDate() != new Date().getDate()
      //   ) {
      //     this.#dueDate = new Date(
      //       `${this.#dueDate.getFullYear()}-${this.#dueDate.getMonth() + 1}-${
      //         this.#dueDate.getDate() + parseInt(params) + 1
      //       }`
      //     );
      //   } else {
      //     this.#dueDate = new Date(
      //       `${this.#dueDate.getFullYear()}-${this.#dueDate.getMonth() + 1}-${
      //         this.#dueDate.getDate() + parseInt(params)
      //       }`
      //     );
      //   }
      // }

      if (dependanceType == "FD" && this.getStartDate() < task.getDueDate()) {
        this.#startDate = task.getDueDate();
        //Ici
        // if (
        //   this.#startDate.getDate() != new Date().getDate() &&
        //   this.#startDate.getMonth() + 1 != new Date().getMonth() + 1 &&
        //   this.#startDate.getDate() != new Date().getDate()
        // ) {
        //   this.#startDate = new Date(
        //     `${this.#startDate.getFullYear()}-${
        //       this.#startDate.getMonth() + 1
        //     }-${this.#startDate.getDate() + parseInt(params) + 1}`
        //   );
        // } else {
        //   this.#startDate = new Date(
        //     `${this.#startDate.getFullYear()}-${
        //       this.#startDate.getMonth() + 1
        //     }-${this.#startDate.getDate() + parseInt(params)}`
        //   );
        // }
      }
      // else if (
      //   dependanceType == "FD" &&
      //   this.getStartDate() >= task.getDueDate()
      // ) {
      //   //Ici
      //   if (
      //     this.#startDate.getDate() != new Date().getDate() &&
      //     this.#startDate.getMonth() + 1 != new Date().getMonth() + 1 &&
      //     this.#startDate.getDate() != new Date().getDate()
      //   ) {
      //     this.#startDate = new Date(
      //       `${this.#startDate.getFullYear()}-${
      //         this.#startDate.getMonth() + 1
      //       }-${this.#startDate.getDate() + parseInt(params) + 1}`
      //     );
      //   } else {
      //     this.#startDate = new Date(
      //       `${this.#startDate.getFullYear()}-${
      //         this.#startDate.getMonth() + 1
      //       }-${this.#startDate.getDate() + parseInt(params)}`
      //     );
      //   }
      // }
      let informationOfDependance = {
        taskId: task.getId(),
        typeOfDependance: dependanceType,
        parameters: params.toString(),
      };
      this.setDependances(informationOfDependance);
    }

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
        break;
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
        break;
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
        break;
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

// let tk = new Task({ startDate: new Date(2020, 11, 1) });
// let tk1 = new Task({ startDate: new Date(2020, 2, 1) });
// tk1.dependsOn(tk, null, "2");
// console.log(tk1.getStartDate());

// let tk = new Task({});
// let tk1 = new Task({});
// tk1.dependsOn(tk, "FF", "2");
// console.log(tk1.getDueDate());

// let params = "2";
// let paramString = "Salut";
// const lt = new Date("2020-08-1");
// console.log(lt);
// let titi = lt.getDate() + parseInt(params);
// console.log(typeof titi);
// const tlEnfant = new Date(
//   `${lt.getFullYear()}-${lt.getMonth() + 1}-${titi + 1}`
// );
// console.log(tlEnfant);
