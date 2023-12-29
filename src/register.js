const Register = {
  store: {},

  addTask: function (task){
    if(task){
      if(!(task instanceof Task))
      throw new Error("task should be instance of Task class");

      const existingTask = Object.values(this.store).find(e => {
        return e.id === task.id;
      });

      if (existingTask)
        throw new Error("this task already exists");

      this.store[task.id] = task;
    }
  },

  deleteTask: function(id){
    if(!this.store[id])
      throw new Error("this task is not founded");

    const isParentTask = Object.values(this.store).some(task => {
      return task.parent && task.parent === this.store[id];
    });
    if(isParentTask) 
      throw new Error("this task has child: delete child task first");

    const hasDependence = Object.values(this.store).some(task => {
      // task.dependences.foreach(e => {
      //   return e.taskId == id;
      // }); 
    });
    if(hasDependence)
      throw new Error("this task has some dependences: delete its first");

    delete this.store[id];
  },
}