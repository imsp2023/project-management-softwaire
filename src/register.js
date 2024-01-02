const Register = {
  store: {},

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
      return task.parent && task.parent === this.store[id];
    });

    if(isParentTask)
      throw new Error("this task has child: delete child task first");

      const hasDependence = Object.values(this.store).some(task => {
        return task.dependences.length > 0;
      });

    if(hasDependence)
      throw new Error("this task has some dependences: delete its first");

    delete this.store[id];
  },

  getTask: (taskId)=>{
    return {};
  },
  getTaskByDueDate: ()=>{

  },
  getTasksByMember: ()=>{

  },
  isMemberExist: (username)=>{
    return;
  },
  addMember: (member)=>{

  },
  addProject: (project)=>{
    
  }
};