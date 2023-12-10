const { test } = QUnit;

QUnit.module("Task", () => {
  QUnit.module("dependsOn", () => {
    test("throws an exception when the parameter task isn't specified", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.dependsOn();
      }, new Error("parameter task is required"));
    });

    test("throws an exception when the parameter task isn't a object of class Task", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.dependsOn({});
      }, new Error("parameter task should be a object of class task"));
    });

    test("throws an exception when the parameter task is same as task depends", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.dependsOn(tk);
      }, new Error("parameter task shouldn't same as task depends"));
    });

    test("throws an exception when the parameter dependanceType isn't specified", (assert) => {
      let tk = new Task({});
      let tk1 = new Task({});
      assert.throws(() => {
        tk.dependsOn(tk1);
      }, new Error("parameter dependanceType is required"));
    });

    test("throws an exception when the parameter dependanceType isn't FF or DD or FD", (assert) => {
      let tk = new Task({});
      let tk1 = new Task({});
      assert.throws(() => {
        tk.dependsOn(tk1, "ls");
      }, new Error("parameter dependanceType should be DD or FF or FD"));
    });

    test("throws an exception when the parameter params isn't a string", (assert) => {
      let tk = new Task({ startDate: new Date("2020-12-01") });
      let tk1 = new Task({ startDate: new Date("2020-12-01") });
      assert.throws(() => {
        tk.dependsOn(tk1, "DD", 1);
      }, new Error("parameter params should be a string"));
    });

    test("with invalid startDate when i apply DD dependancie, startDate should be change", (assert) => {
      let tk = new Task({ startDate: new Date(2020, 12, 1) });
      let tk1 = new Task({ startDate: new Date(2020, 2, 1) });
      tk1.dependsOn(tk, "DD");
      assert.true(tk1.getStartDate() >= tk.getStartDate());
    });

    test("with invalid dueDate when i apply FF dependancie, dueDate should be change", (assert) => {
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

    test("throws an exception when a DD dependency is applied between two tasks have this dependency", (assert) => {
      let tk = new Task({ startDate: new Date(2026, 0, 2) });
      let tk1 = new Task({ startDate: new Date(2025, 0, 2) });
      tk.dependsOn(tk1, "DD");
      assert.throws(() => {
        tk.dependsOn(tk1, "DD");
      }, new Error("there is already a DD relationship between these two tasks"));
    });

    test("throws an exception when a FF dependency is applied between two tasks have this dependency", (assert) => {
      let tk = new Task({ dueDate: new Date(2026, 0, 30) });
      let tk1 = new Task({ dueDate: new Date(2026, 0, 25) });
      tk.dependsOn(tk1, "FF");
      assert.throws(() => {
        tk.dependsOn(tk1, "FF");
      }, new Error("there is already a FF relationship between these two tasks"));
    });

    test("throws an exception when a FD dependency is applied between two tasks have this dependency", (assert) => {
      let tk = new Task({ startDate: new Date(2026, 0, 30) });
      let tk1 = new Task({ dueDate: new Date(2026, 0, 25) });
      tk.dependsOn(tk1, "FD");
      assert.throws(() => {
        tk.dependsOn(tk1, "FD");
      }, new Error("there is already a FD relationship between these two tasks"));
    });
  });

  QUnit.module("assignedTo", () => {
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