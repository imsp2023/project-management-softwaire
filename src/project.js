class Project {
    #id = "";
    #name = "";
    #description = "";
    #members = [];
    #responsible = "";
    #startDate = new Date();
    #endDate = new Date();
    #status = "";
    #tasks = [];
    
    addMember(member){
        if(!(member instanceof Member))
            throw new Error("member should be instance of Member class");

        if(!this.#members.every(memberp => memberp.username !== member.username))
            throw new Error("This member already exists");

        this.#members.push(member);
        return this.#members;
    }
    
    removeMemberById(id){
        let verifyMember = this.#members.filter(member => member.id === id);
        if(this.#members.length === 0 || verifyMember.length == 0)
            throw new Error("member with this id is not founded");
        else
            return this.#members = this.#members.filter(member => member.id !== id)
    }

    addTask(task){
        if(!(task instanceof Task))
            throw new Error("project task should be instance of Task class");

        if(!this.#tasks.every(taskp => taskp.username === task.id))
            throw new Error("This task already exists");

        this.#tasks.push(task);
        return this.#tasks;
    }

    removeTaskById(id){
        let verifyTask = this.#tasks.find(element => element.id === id);

        if(this.#tasks.length === 0 || !verifyTask || verifyTask.length >= 1)
            throw new Error("task with this id is not founded");
        else
            return this.#tasks = this.#tasks.filter(task => task.id !== id);

    }
}