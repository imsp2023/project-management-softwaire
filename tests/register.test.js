const { test } = QUnit;

QUnit.module("Register", () => {
  QUnit.module("addTask", () => {
    test("throws an error when task is not instance of Task class", assert=>{
        var r = new Register;

        assert.throws(()=>{
          r.addTask();
        }, new Error("task should be instance of Task class"));
    });

    test("throws an error when new task already exists", (assert) => {
      let r = new Register(), t = new Task({title: "My task"});

      r.addTask(t);
      assert.throws(() => {
        r.addTask(t);
      }, new Error("this task already exists"));
    });
  });


  QUnit.module("deleteTask", () => {
    test("throws an error when this task id is not founded", assert=>{
        let r = new Register, t = new Task({title: "My task"});

        assert.throws(()=>{
          r.deleteTask("id");
        }, new Error("this task is not founded"));
    });

    test("remove task when it's founded", assert=>{
      let r = new Register, t = new Task({title: "My task"});
      r.addTask(t);
      console.log(r.store)

      r.deleteTask(t.id);
      assert.deepEqual(r.store, [], "remove task");
    });


    // gestion des dépendances liées à la tâche supprimée
    // remove is not delete but put in the trash
  });
});