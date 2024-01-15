let Application = () =>{
  try{
    return {
      projects: [],
      config: structuredClone(configuration),
      createProject: (name)=>{
      },
      removeProject: (id)=>{
      },
      createTask: (title)=>{

      },
      addTaskToProject: (task, projectId)=>{

      },
      deleteTask: (taskId, projectId)=>{

      },
      getTask: (taskId, projectId)=>{

      },
      validateTask: (projectId, taskId)=>{

      },
      addDependenceToTask: (projectId, taskId1, taskId2, offSetDay = 0)=>{
        let taskExist, dependenceIsCyclic;
        if (!taskId)
            throw new Error(MISSING_PARAMETERS);
        taskExist = Register.getTask(taskId);
        if (!taskExist)
            throw new Error(INEXISTANT_TASK);
        dependenceIsCyclic = this.hasCyclicDependence(taskId);
        if (dependenceIsCyclic)
            throw new Error(CYCLIC_DEPENDENCE_NOT_ALLOWED);
        switch(dependence){
            case START_START:
                if (this.startDate < taskExist.startDate)
                    this.startDate = taskExist.startDate.getDate() + '-' + 
                                    Number(taskExist.startDate.getMonth() + 1) + '-' +
                                    taskExist.startDate.getFullYear();
                break;
            case END_START:
                if (this.startDate < taskExist.dueDate)
                this.startDate = taskExist.dueDate.getDate() + '-' + 
                                Number(taskExist.dueDate.getMonth() + 1) + '-' +
                                taskExist.dueDate.getFullYear();
                break;
            case END_END:
                if (this.dueDate < taskExist.dueDate)
                    this.dueDate = taskExist.dueDate.getDate() + '-' + 
                                    Number(taskExist.dueDate.getMonth() + 1) + '-' +
                                    taskExist.dueDate.getFullYear();
                break;
            default:
                throw new Error(INVALID_DEPENDENCE);
        }
      },
      addParentToTask: (projectId, parentTaskId, taskId)=>{
        let parentTask;
        parentTask = Register.getTask(parentId);
        if (!parentTask)
            throw new Error(INEXISTANT_TASK);
        if (parentTask.startDate > this.startDate)
            this.startDate = parentTask.startDate;
        if (parentTask.dueDate < this.dueDate)
            this.dueDate = parentTask.dueDate;
      }
    }
  }
  catch(e){
    console.log(e);
  }
};