class Register{
  #store = [];

  addTask(task){
    if(!task || !(task instanceof Task))
      throw new Error("task should be instance of Task class");

    if(this.#store.includes(task))
      throw new Error("this task already exists");

    this.#store.push(task);
  }

  deleteTask(id){
    if(!this.#store.find(t => t.id === id))
      throw new Error("this task is not founded");

    this.#store = this.#store.filter(t => t.id !== id);
  }

  get store (){
    return this.#store;
  }
}