const { test } = QUnit;

QUnit.module("Register", () => {
  QUnit.module("addTask", () => {

    test("with no parameter, no task adding", assert => {
      Register.store = {};
      Register.addTask();

      assert.equal(Object.keys(Register.store).length, 0, "no task to add");
    })

    test("throws an exception when task is not a Task object", assert=>{
        assert.throws(()=>{
          Register.addTask("hello");
        }, new Error("task should be a task object"));
    });

    test("with an empty store, addTask should add a task", (assert)=>{
      let t = new Task({title: "My task"});
      Register.store = {};
      Register.addTask(t);

      assert.equal(Object.keys(Register.store).length, 1, "task added");
    });
  });


  QUnit.module("deleteTask", () => {
    test("throws an exception when this task id is not founded", assert=>{
        let t = new Task({title: "My task"});

        assert.throws(()=>{
          Register.deleteTask("id");
        }, new Error("this task is not founded"));
    });

    test("with an existing task, suppression is effective", assert=>{
      let t = new Task({title: "My task"});
      Register.store = {};
      Register.addTask(t);
      Register.deleteTask(t.id);
      
      assert.equal(Object.keys(Register.store).length, 0, "remove task");
    });

    test("when task is parent for another, throw an exception", assert=>{
      let t2 = new Task({title: "My task"});
      let t1 = new Task({title: "My task", parent: t2});

      Register.addTask(t1);
      Register.addTask(t2);
      assert.throws(()=>{
        Register.deleteTask(t2.id);
      }, new Error("this task has child: delete child task first"));
    });

    // test("when task have dependencies, throw an exception", assert=>{
    //   let t2 = new Task({title: "My task"});
    //   let t1 = new Task({title: "My task", dependencies: []});

    //   Register.addTask(1, t1);
    //   Register.addTask(2, t2);
    //   assert.throws(()=>{
    //     Register.deleteTask(2);
    //   }, new Error("this task has some dependences: delete its first"));
    // });
  });
});
