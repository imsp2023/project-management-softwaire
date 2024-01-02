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

    test("throws an error when parameter id is not a string", (assert) => {
      let r = new Register();
      assert.throws(() => {
        r.addTask(1);
      }, new Error("parameter id should be a non-empty string"));
    });

    test("task is deleted when it exists", assert=>{
      let t = new Task({title: "My task"});
      Register.store = {"48456": t};
      Register.deleteTask(48456);
      
      assert.equal(Object.keys(Register.store).length, 0, "remove task");
    });

    test("throws an error when parameter task is not specified", (assert) => {
      let r = new Register();
      assert.throws(() => {
        r.addTask("1");
      }, new Error("parameter task is required"));
    });

    test("throw an exception when task has dependence's task", assert=>{
      let t2 = new Task({title: "My task"});
      let t1 = new Task({title: "My task", dependences: {id: t2.id, type: "FF"}});

      assert.throws(()=>{
        Register.deleteTask(5645);
      }, new Error("this task has child: delete child task first"));
      
      sinon.restore();
    });
  });

  // QUnit.module("getTasksByMember", () => {
  //   test("with an inexistant member, no task to return", assert=>{
  //     let t = new Task({title: "My task", taskResponsible: 'franck'});
  //     Register.store = {"48456": t}

  //     let tasks = Register.getTasksByMember('tony');
  //     assert.equal(tasks.length, 0, "no task");
  //   });

  //   test("when member exists, member's tasks are returned", assert=>{
  //     let t = new Task({title: "My task", taskResponsible: 'franck'});
  //     Register.store = {"48456": t}

  //     let tasks = Register.getTasksByMember('franck');
  //     assert.equal(tasks.length, 1);
  //   });
  // });


  // getTasksByDueDate
    // 
  // getTasksByMember
    // when an inexistant member, no task
    // when member exists, return member's tasks
  // getTask
    // with invalid id, task is not returned
    //
});