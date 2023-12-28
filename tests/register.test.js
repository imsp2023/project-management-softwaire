const { test } = QUnit;

QUnit.module("Register", () => {
  QUnit.module("addTask", () => {
    test("throws an error when task is not instance of Task class", assert=>{
        assert.throws(()=>{
          Register.addTask();
        }, new Error("task should be instance of Task class"));
    });

    test("throws an error when new task already exists", (assert) => {
      let t = new Task({title: "My task"});

      Register.addTask(1, t);
      assert.throws(() => {
        Register.addTask(1, t);
      }, new Error("this task already exists"));
    });
  });


  QUnit.module("deleteTask", () => {
    test("throws an error when this task id is not founded", assert=>{
        let t = new Task({title: "My task"});

        assert.throws(()=>{
          Register.deleteTask("id");
        }, new Error("this task is not founded"));
    });

    test("with an existing task, suppression is effective", assert=>{
      let t = new Task({title: "My task"});
      Register.addTask(2, t);
      
      Register.deleteTask(2);
      assert.equal(Object.keys(Register.store).length, 0, "remove task");
    });

    test("when task is parent for another, throw an error", assert=>{
      let t2 = new Task({title: "My task"});
      let t1 = new Task({title: "My task", parent: t2});

      Register.addTask(1, t1);
      Register.addTask(2, t2);
      assert.throws(()=>{
        Register.deleteTask(2);
      }, new Error("this task has child: delete child task first"));
    });

    test("when task have dependencies, throw an exception", assert=>{
      let t2 = new Task({title: "My task"});
      let t1 = new Task({title: "My task", dependencies: []});

      Register.addTask(1, t1);
      Register.addTask(2, t2);
      assert.throws(()=>{
        Register.deleteTask(2);
      }, new Error("this task has some dependences: delete its first"));
    });
  });
});