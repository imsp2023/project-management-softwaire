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
    test("throws an exception when trying to call the dependOn method on an object that is not an instance of the Task class.", (assert) => {
      let props = {
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
      assert.throws(() => {
        tk.dependsOn({});
      }, new Error("you try to create a dependance on an object that is not an instance of the Task class"));
    });

    test("throws an exception when the parameter dependanceType is missing", (assert) => {
      let props = {
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
      assert.throws(() => {
        tk.dependsOn(tk);
      }, new Error("parameter dependanceType is missing"));
    });

    test("throws an exception when the parameter dependanceType isn't FF or DD or FD or child", (assert) => {
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
      assert.throws(() => {
        tk.dependsOn(tk, "ls");
      }, new Error("parameter dependanceType should be DD or FF or FD or child"));
    });

    test("throws an exception when the parameter params is missing", (assert) => {
      let props = {
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
      assert.throws(() => {
        tk.dependsOn(tk, "DD");
      }, new Error("parameter params is missing"));
    });

    test("throws an exception when the parameter params isn't a object", (assert) => {
      let props = {
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
      assert.throws(() => {
        tk.dependsOn(tk, "DD", "autre");
      }, new Error("parameter params should be a object"));
    });

    test("throws an exception if the dependanceType parameter is DD and the start date of the dependent task is less than that of the task on which it depends.", (assert) => {
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
      assert.throws(() => {
        tk1.dependsOn(tk, "DD", {});
      }, new Error("the start date of the dependent task should be greater than that of the task on which it depends"));
    });

    test("throws an exception if the dependanceType parameter is FF and the due date of the dependent task is less than that of the task on which it depends.", (assert) => {
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
      assert.throws(() => {
        tk1.dependsOn(tk, "FF", {});
      }, new Error("the due date of the dependent task must be greater than that of the task on which it depends"));
    });

    test("throws an exception if the dependanceType parameter is FD and the start date of the dependent task is less than the due date of the task on which it depends.", (assert) => {
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
      assert.throws(() => {
        tk1.dependsOn(tk, "FD", {});
      }, new Error("the start date of the dependent task must be greater than the end date of the task on which it depends"));
    });

    test("throws an exception when a task B is a child of a task A and you try to make A become a child of B", (assert) => {
      let props = {
        id: "1",
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

      let props1 = {
        id: "2",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk1 = new Task(props1);
      tk.dependsOn(tk1, "child", {});
      assert.throws(() => {
        tk1.dependsOn(tk, "child", {});
      }, new Error("a parent task can no longer be the child of its own child"));
    });

    test("throws an exception when you try to create a relation between same task", (assert) => {
      let props = {
        id: "1",
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
      assert.throws(() => {
        tk.dependsOn(tk, "child", {});
      }, new Error("you try to create a relation between same task"));
    });

    test("throws an exception when there is a child dependency between two tasks A and B and we try again to create the same relationship between these two tasks", (assert) => {
      let props = {
        id: "1",
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

      let props1 = {
        id: "2",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk1 = new Task(props1);
      tk.dependsOn(tk1, "child", {});
      assert.throws(() => {
        tk.dependsOn(tk1, "child", {});
      }, new Error("there is already a child relationship between these two tasks"));
    });

    test("throws an exception when B is child of A and D is child of C and you try to create relation D is chid of A", (assert) => {
      let props = {
        id: "1",
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

      let props1 = {
        id: "2",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk1 = new Task(props1);

      let props2 = {
        id: "3",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk2 = new Task(props2);

      let props3 = {
        id: "2",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk3 = new Task(props3);
      tk1.dependsOn(tk, "child", {});
      tk3.dependsOn(tk2, "child", {});
      assert.throws(() => {
        tk3.dependsOn(tk, "child", {});
      }, new Error("the task is child of other task"));
    });

    test("throws an exception when there is a DD dependency between two tasks A and B and we try again to create the same relationship between these two tasks", (assert) => {
      let props = {
        id: "1",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(2026, 0, 2),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk = new Task(props);

      let props1 = {
        id: "2",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(2025, 0, 2),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk1 = new Task(props1);
      tk.dependsOn(tk1, "DD", {});
      assert.throws(() => {
        tk.dependsOn(tk1, "DD", {});
      }, new Error("there is already a DD relationship between these two tasks"));
    });

    test("throws an exception when there is a FF dependency between two tasks A and B and we try again to create the same relationship between these two tasks", (assert) => {
      let props = {
        id: "1",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(2026, 0, 30),
        dependances: [],
        taskResponsible: "",
      };
      let tk = new Task(props);

      let props1 = {
        id: "2",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(2026, 0, 25),
        dependances: [],
        taskResponsible: "",
      };
      let tk1 = new Task(props1);
      tk.dependsOn(tk1, "FF", {});
      assert.throws(() => {
        tk.dependsOn(tk1, "FF", {});
      }, new Error("there is already a FF relationship between these two tasks"));
    });

    test("throws an exception when there is a FD dependency between two tasks A and B and we try again to create the same relationship between these two tasks", (assert) => {
      let props = {
        id: "1",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(2026, 0, 30),
        dueDate: new Date(),
        dependances: [],
        taskResponsible: "",
      };
      let tk = new Task(props);

      let props1 = {
        id: "2",
        title: "",
        description: "",
        status: "",
        priority: "",
        startDate: new Date(),
        dueDate: new Date(2026, 0, 25),
        dependances: [],
        taskResponsible: "",
      };
      let tk1 = new Task(props1);
      tk.dependsOn(tk1, "FD", {});
      assert.throws(() => {
        tk.dependsOn(tk1, "FD", {});
      }, new Error("there is already a FD relationship between these two tasks"));
    });
  });
});
