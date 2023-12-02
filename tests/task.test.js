const { test } = QUnit;

QUnit.module("Task", () => {
  QUnit.module("constructor", () => {
    test("throws an error when parameters are not specified", (assert) => {
      assert.throws(() => {
        new Task();
      }, new Error("parameters are required"));
    });
  });

  QUnit.module("dependsOn", () => {
    test("throw an exception when you're trying to make a modification to a task that doesn't exist.", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };

        props1 = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(props1, "", "");
      }, new Error("you're trying to make a modification to a task that doesn't exist."));
    });

    test("throw an exception when the parameter dependanceType is missing", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, undefined, "");
      }, new Error("parameter dependanceType should be a string and non-empty"));
    });

    test("throw an exception when the parameter dependanceType isn't a string", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, null, "");
      }, new Error("parameter dependanceType should be a string and non-empty"));
    });

    test("throw an exception when the parameter dependanceType is a empty string", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, "", "");
      }, new Error("parameter dependanceType should be a string and non-empty"));
    });

    test("throw an exception when the parameter params is missing", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, "ls", undefined);
      }, new Error("parameter params should be a string and non-empty"));
    });

    test("throw an exception when the parameter params isn't a string", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, "ls", null);
      }, new Error("parameter params should be a string and non-empty"));
    });

    test("throw an exception when the parameter params is a empty string", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, "ls", "");
      }, new Error("parameter params should be a string and non-empty"));
    });

    test("throw an exception when the parameter dependanceType isn't DD", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, "ls", "params");
      }, new Error("parameter dependanceType should be DD or FF or FD"));
    });

    test("throw an exception when the parameter dependanceType isn't FF", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, "ls", "params");
      }, new Error("parameter dependanceType should be DD or FF or FD"));
    });

    test("throw an exception when the parameter dependanceType isn't FD", (assert) => {
      assert.throws(() => {
        props = {
          id: "",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };
        let tk = new Task(props);
        tk.dependsOn(tk, "ls", "params");
      }, new Error("parameter dependanceType should be DD or FF or FD"));
    });

    test("throw an exception if the dependanceType parameter is DD and the start date of the dependent task is less than that of the task on which it depends.", (assert) => {
      assert.throws(() => {
        props = {
          id: "1",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(2025, 0, 30),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };

        props2 = {
          id: "2",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(2025, 0, 25),
          dueDate: new Date(),
          dependances: [],
          taskResponsible: "",
        };

        let tk = new Task(props);
        let tk1 = new Task(props2);
        tk1.dependsOn(tk, "DD", "params");
      }, new Error("the start date of the dependent task should be greater than that of the task on which it depends"));
    });

    test("throws an exception if the dependanceType parameter is FF and the due date of the dependent task is less than that of the task on which it depends.", (assert) => {
      assert.throws(() => {
        props = {
          id: "1",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(2025, 0, 30),
          dueDate: new Date(2026, 0, 30),
          dependances: [],
          taskResponsible: "",
        };

        props2 = {
          id: "2",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(2025, 0, 25),
          dueDate: new Date(2026, 0, 25),
          dependances: [],
          taskResponsible: "",
        };

        let tk = new Task(props);
        let tk1 = new Task(props2);
        tk1.dependsOn(tk, "FF", "params");
      }, new Error("the due date of the dependent task must be greater than that of the task on which it depends"));
    });

    test("throws an exception if the dependanceType parameter is FD and the start date of the dependent task is less than the due date of the task on which it depends.", (assert) => {
      assert.throws(() => {
        props = {
          id: "1",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(2025, 0, 30),
          dueDate: new Date(2026, 0, 30),
          dependances: [],
          taskResponsible: "",
        };

        props2 = {
          id: "2",
          title: "",
          description: "",
          status: "",
          priority: "",
          startDate: new Date(2025, 0, 25),
          dueDate: new Date(2027, 0, 25),
          dependances: [],
          taskResponsible: "",
        };

        let tk = new Task(props);
        let tk1 = new Task(props2);
        tk1.dependsOn(tk, "FD", "params");
      }, new Error("the start date of the dependent task must be greater than the end date of the task on which it depends"));
    });
  });
});
