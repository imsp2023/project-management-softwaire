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

      const isParentTask = Object.values(this.store).some(task => {
        return task.parent && task.parent === this.store[id];
      });

      if(isParentTask) 
        throw new Error("this task has child: delete child task first");


      const hasDependence = Object.values(this.store).some(task => {
        task.dependences.forEach(e => {
          return e.taskId == id;
        });
      });

      if(hasDependence)
        throw new Error("this task has some dependences: delete its first");

    delete this.store[id];
  },
}