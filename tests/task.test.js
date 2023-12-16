const { test } = QUnit;

QUnit.module("Task", () => {
  QUnit.module("dependsOn", () => {
    //Vérifier que la tache existe dans le register si on utilise taskId
    test("throws an exception when no parameters is provided", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.dependsOn();
      }, new Error("missing parameters"));
    });

    test("throws an exception when the task parameter isn't a Task object", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.dependsOn({});
      }, new Error("the task parameter should be a Task object"));
    });

    test("throws an exception when the parameter task is same as task depends", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.dependsOn(tk);
      }, new Error("the task parameter shouldn't same as task depends"));
    });

    test("set DD dependance by default when the parameter dependanceType isn't specified", (assert) => {
      let tk = new Task({});
      let tk1 = new Task({});
      tk.dependsOn(tk1);
      assert.true(tk.getDependances()[0].typeOfDependance == "DD");
    });

    test("throws an exception when the parameter dependanceType isn't FF or DD or FD", (assert) => {
      let tk = new Task({});
      let tk1 = new Task({});
      assert.throws(() => {
        tk.dependsOn(tk1, "ls");
      }, new Error("parameter dependanceType should be DD or FF or FD"));
    });

    test("with invalid startDate when i apply DD dependancie, startDate should be change", (assert) => {
      let tk = new Task({ startDate: new Date(2020, 12, 1) });
      let tk1 = new Task({ startDate: new Date(2020, 2, 1) });
      tk1.dependsOn(tk, "DD");
      assert.true(tk1.getStartDate() >= tk.getStartDate());
    });

    test("with invalid dueDate when i apply FF dependancie, dueDate should be changed", (assert) => {
      let tk = new Task({ dueDate: new Date(2026, 0, 30) });
      let tk1 = new Task({ dueDate: new Date(2026, 0, 25) });
      tk1.dependsOn(tk, "FF");
      assert.true(tk1.getDueDate() >= tk.getDueDate());
    });

    test("with invalid startDate when i apply FD dependancie, startDate should be change", (assert) => {
      let tk = new Task({ dueDate: new Date(2026, 0, 30) });
      let tk1 = new Task({ startDate: new Date(2025, 0, 25) });
      tk1.dependsOn(tk, "FD");
      assert.true(tk1.getStartDate() >= tk.getDueDate());
    });

    test("a task must not depend on the same task several times with the same relationship DD", (assert) => {
      let tk = new Task({ startDate: new Date(2026, 0, 2) });
      let tk1 = new Task({ startDate: new Date(2025, 0, 2) });
      tk.dependsOn(tk1, "DD");
      tk.dependsOn(tk1, "DD");
      assert.true(tk.getDependances().length == 1);
    });

    test("a task must not depend on the same task several times with the same relationship FF", (assert) => {
      let tk = new Task({ dueDate: new Date(2026, 0, 30) });
      let tk1 = new Task({ dueDate: new Date(2026, 0, 25) });
      tk.dependsOn(tk1, "FF");
      tk.dependsOn(tk1, "FF");
      assert.true(tk.getDependances().length == 1);
    });

    test("a task must not depend on the same task several times with the same relationship FD", (assert) => {
      let tk = new Task({ startDate: new Date(2026, 0, 30) });
      let tk1 = new Task({ dueDate: new Date(2026, 0, 25) });
      tk.dependsOn(tk1, "FD");
      tk.dependsOn(tk1, "FD");
      assert.true(tk.getDependances().length == 1);
    });
  });

  QUnit.module("assignedTo", () => {
    //Vérifier que le membre existe dans le register (son username dans le membre)
    test("throws an error when parameter username is not specified", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.assignedTo();
      }, new Error("parameter is required"));
    });

    test("throws an error when parameter username is not a string", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.assignedTo(1);
      }, new Error("username attribute should be a non-empty string"));
    });

    test("throws an error when parameter username is a empty string", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.assignedTo("");
      }, new Error("username attribute should be a non-empty string"));
    });

    test("assigned username to a task", (assert) => {
      let tk = new Task({});
      tk.assignedTo("moi");
      assert.true(tk.getTaskResponsible() == "moi");
    });
  });
});
