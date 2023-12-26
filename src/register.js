const Register = {
  store: {},

  addTask: function (taskId, task){
    if(!task || !(task instanceof Task))
      throw new Error("task should be instance of Task class");

    const existingTask = Object.values(this.store).find(e => {
      return e === task;
    });
    
    if (existingTask) 
      throw new Error("this task already exists");

    this.store[taskId] = task;
  },

  deleteTask: function(id){
    if(typeof id != "number" || !this.store[id])
      throw new Error("this task is not founded");

    delete this.store[id];
  },
}