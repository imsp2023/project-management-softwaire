const Register = {
  store: {},
  members: {},

  addTask: function (task){
    if(task){
      if(!(task instanceof Task))
      throw new Error("task should be a task object");

      const existingTask = Object.values(this.store).find(e => {
        return e.id === task.id;
      });

      if (existingTask)
        throw new Error("this task already exists");

      this.store[task.id] = task;
    }
  },

  deleteTask: function(id){
    const isParentTask = Object.values(this.store).some(task => {
      return task.parent && task.parent === id;
    });

    if(isParentTask)
      throw new Error("another tasks depend on this");

      const hasDependence = Object.values(this.store).some(task => {
        return task.dependences[id];
      });
    if(hasDependence)
      throw new Error("another tasks depend on this");

    delete this.store[id];
  },

  getTask: function (taskId){
    if(this.store[taskId])
      return this.store[taskId];

    return undefined;
  },

  addMember: function (member){
      let isMember = this.isMemberExist(member);
      if(isMember)
        throw new Error(MEMBER_ALREADY_EXISTANT);
      else if(!member || typeof member != "string")
        throw new Error(INVALID_TYPE_PARAMETER);

      this.members[member] = member;
  },

  isMemberExist: function (username){
      if(username && this.members[username])
        return true;
      else
        return false;
  },

  getTasksByMember: function (member){
    let isMember = Register.isMemberExist(member);

    if(isMember){
        let tasks = Object.values(this.store).filter(task => {
          return task.responsible === member;
        });
        return tasks;
    }
  },

  addProject: (project)=>{
    
  }
};