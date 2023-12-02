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
    test("throw an exception when the parameter taskid is missing", (assert) => {
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
        tk.dependsOn(undefined, "", "");
      }, new Error("parameter taskid should be a string and non-empty"));
    });

    test("throw an exception when the parameter taskid isn't a string", (assert) => {
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
        tk.dependsOn(null, "", "");
      }, new Error("parameter taskid should be a string and non-empty"));
    });

    test("throw an exception when the parameter taskid is a empty string", (assert) => {
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
        tk.dependsOn("", "", "");
      }, new Error("parameter taskid should be a string and non-empty"));
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
        tk.dependsOn("1", undefined, "");
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
        tk.dependsOn("1", null, "");
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
        tk.dependsOn("1", "", "");
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
        tk.dependsOn("1", "ls", undefined);
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
        tk.dependsOn("1", "ls", null);
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
        tk.dependsOn("1", "ls", "");
      }, new Error("parameter params should be a string and non-empty"));
    });
  });
});
