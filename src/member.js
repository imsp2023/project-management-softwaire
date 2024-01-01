const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

class Member {
  username = "";
  role = "";
  email = "";

  constructor(props) {
    let memberExist = Register.isMemberExist(props.username);
    if (memberExist)
      throw new Error(MEMBER_ALREADY_EXISTANT);
    this.username = props.username;
    this.role = props.role;
    this.email = props.email;
    Register.addMember(this);
  }
}
