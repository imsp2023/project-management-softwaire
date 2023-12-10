const dateOfDay = new Date();
const year = dateOfDay.getFullYear();
const month = dateOfDay.getMonth() + 1;
const day = dateOfDay.getDate();
const completeDate = `${year}-${month}-${day}`;
const regex = /^\d{4}\-\d{1,2}\-\d{1,2}$/;

class Project {
  #id = "";
  #name = "";
  #responsible = "";
  #description = "";
  #startDate = "";
  #dueDate = "";
  #status = "";

  constructor(props) {
    if (props == undefined) throw new Error("parameters are required");
    if (props.id == undefined) this.#id = this.getRandomUnique(1, 10000, []);
    else {
      if (props && (typeof props.id != "string" || props.id == ""))
        throw new Error("id attribute should be a non-empty string");
      this.#id = props.id;
    }
    if (props.name == undefined) throw new Error("parameter name is required");
    if (props && (typeof props.name != "string" || props.name == ""))
      throw new Error("name attribute should be a non-empty string");
    this.#name = props.name;
    if (props && props.responsible == undefined) this.#responsible = "";
    else {
      if (props && typeof props.responsible != "string")
        throw new Error("responsible attribute should be a string");
      this.#responsible = props.responsible;
    }
    if (props && props.description == undefined) this.#description = "";
    else {
      if (props && typeof props.description != "string")
        throw new Error("description attribute should be a string");
      this.#description = props.description;
    }
    if (props && props.status == undefined) this.#status = "";
    else {
      if (props && typeof props.status != "string")
        throw new Error("status attribute should be a string");
      this.#status = props.status;
    }
    if (props && props.startDate == undefined) this.#startDate = completeDate;
    else {
      if (props && regex.test(props.startDate) == false)
        throw new Error("date should be in yyyy-mm-dd format");
      let partsOfDate = props.startDate.split("-");
      let partOfDateNumber = partsOfDate.map(Number);
      if (partOfDateNumber[1] <= 0 || partOfDateNumber[1] > 12)
        throw new Error("the month should be between 1 and 12");
      if (partOfDateNumber[2] <= 0 || partOfDateNumber[2] > 31)
        throw new Error("the day should be between 1 and 31");
      if (
        partOfDateNumber[0] % 4 == 0 ||
        (partOfDateNumber[0] % 100 == 0 && partOfDateNumber[0] % 400 == 0)
      ) {
        if (partOfDateNumber[1] == 2)
          if (partOfDateNumber[2] <= 0 || partOfDateNumber[2] > 29)
            throw new Error(
              "year is leap year so the day should be between 1 and 29"
            );
      }
      if (partOfDateNumber[1] == 2)
        if (partOfDateNumber[2] <= 0 || partOfDateNumber[2] > 28)
          throw new Error(
            "it's frebruary so the day should be between 1 and 28"
          );
      this.#startDate = props.startDate;
    }

    if (props && props.dueDate == undefined) this.#dueDate = "";
    else {
      if (props && regex.test(props.dueDate) == false)
        throw new Error("date should be in yyyy-mm-dd format");
      let partsOfDate = props.dueDate.split("-");
      let partOfDateNumber = partsOfDate.map(Number);
      if (partOfDateNumber[1] <= 0 || partOfDateNumber[1] > 12)
        throw new Error("the month should be between 1 and 12");
      if (partOfDateNumber[2] <= 0 || partOfDateNumber[2] > 31)
        throw new Error("the day should be between 1 and 31");
      if (
        partOfDateNumber[0] % 4 == 0 ||
        (partOfDateNumber[0] % 100 == 0 && partOfDateNumber[0] % 400 == 0)
      ) {
        if (partOfDateNumber[1] == 2)
          if (partOfDateNumber[2] <= 0 || partOfDateNumber[2] > 29)
            throw new Error(
              "year is leap year so the day should be between 1 and 29"
            );
      }
      if (partOfDateNumber[1] == 2)
        if (partOfDateNumber[2] <= 0 || partOfDateNumber[2] > 28)
          throw new Error(
            "it's frebruary so the day should be between 1 and 28"
          );
      this.#dueDate = props.dueDate;
    }
  }

  updateDescription(description) {
    if (description == undefined)
      throw new Error("parameter description is required");
    if (typeof description != "string")
      throw new Error("description attribute should be a string");
    this.#description = description;
  }

  updateName(name) {
    if (name == undefined) throw new Error("parameter name is required");
    if (typeof name != "string" || name == "")
      throw new Error("name attribute should be a non-empty string");
    this.#name = name;
  }

  assignedTo(username) {
    if (username == undefined)
      throw new Error("parameter username is required");
    if (typeof username != "string" || username == "")
      throw new Error("username attribute should be a non-empty string");
    this.#responsible = username;
  }

  /**
   * getters
   */
  getId() {
    return this.#id;
  }

  getName() {
    return this.#name;
  }

  getResponsible() {
    return this.#responsible;
  }

  getDescription() {
    return this.#description;
  }

  getStartDate() {
    return this.#startDate;
  }

  getDueDate() {
    return this.#dueDate;
  }

  getStatus() {
    return this.#status;
  }

  /**
   * setters
   */
  setId(id) {
    this.#id = id;
  }

  getRandomUnique(min, max, exclude) {
    let randomValue;
    do {
      randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (exclude.includes(randomValue));

    exclude.push(randomValue);
    return randomValue;
  }
}
