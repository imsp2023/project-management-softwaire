const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

class Member {
  #id = "";
  #username = "";
  #role = "";
  #email = "";

  constructor(props) {
    if (props == undefined) throw new Error("parameters are required");
    if (typeof props.id != "string" || props.id == "")
      throw new Error("id attribute should be a non-empty string");
    if (props.username == undefined)
      throw new Error("parameter username is required");
    if (typeof props.username != "string" || props.username == "")
      throw new Error("username attribute should be a non-empty string");
    if (props.role == undefined) throw new Error("parameter role is required");
    if (typeof props.role != "string" || props.role == "")
      throw new Error("role attribute should be a non-empty string");
    if (props.email == undefined)
      throw new Error("parameter email is required");
    if (emailRegex.test(props.email) == false)
      throw new Error("email should be in example@gmail.com format");
    this.#id = props.id;
    this.#username = props.username;
    this.#role = props.role;
    this.#email = props.email;
  }
}
