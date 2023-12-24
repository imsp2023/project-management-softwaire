const { test } = QUnit;

QUnit.module("Task", () => {
  QUnit.module("dependsOn", () => {
    test("throws an exception when no parameters is provided", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.dependsOn();
      }, new Error("missing parameters"));
    });

    test("throws an error when parameter taskId is not a string", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.dependsOn(1);
      }, new Error("taskId attribute should be a non-empty string"));
    });

    test("throws an error when parameter taskId is a empty string", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.dependsOn("");
      }, new Error("taskId attribute should be a non-empty string"));
    });

    test("throws an error when you try to create the dependance between same task", (assert) => {
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getStartDate: () => {
            return new Date("2021-3-11");
          },
        };
      });
      let task = new Task({ id: "1", title: "dsbfh" });
      assert.throws(() => {
        task.dependsOn("1");
      }, new Error("you don't create a dependance between the same task"));
      stub.restore();
    });

    test("throws an error when parameter nbreDeJours isn't a number", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.dependsOn("1", "", "5");
      }, new Error("nbreDeJours attribute should be a number"));
    });

    test("with startDate attribute specified, startDate setter should be called", (assert) => {
      let count = 0;
      let stub = sinon
        .stub(Task.prototype, "startDate")
        .set(function setterFn() {
          count = 1;
        });
      let tk = new Task({ title: "dsbfh", startDate: new Date("2020-5-2") });
      assert.equal(count, 1);
      stub.restore();
    });

    test("with dueDate attribute specified, dueDate setter should be called", (assert) => {
      let count = 0;
      let stub = sinon.stub(Task.prototype, "dueDate").set(function setterFn() {
        count = 1;
      });
      let tk = new Task({ title: "dsbfh", dueDate: new Date("2020-5-2") });
      assert.equal(count, 1);
      stub.restore();
    });

    test("with taskResponsible attribute specified, assignedTo setter should be called", (assert) => {
      let count = 0;
      let stub = sinon
        .stub(Task.prototype, "assignedTo")
        .callsFake(function fn() {
          count = 1;
          return {
            getStartDate: () => {
              return new Date("2020-11-1");
            },
          };
        });
      let tk = new Task({ title: "dsbfh" });
      tk.assignedTo("jdvrhfr");
      assert.equal(count, 1);
      stub.restore();
    });

    test("getTask should be called from Register", (assert) => {
      let count = 0;
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        count = 1;
        return {
          getStartDate: () => {
            return new Date("2020-11-1");
          },
        };
      });
      let tk = new Task({ title: "dbhr" });
      tk.dependsOn("1");
      assert.equal(count, 1);
      stub.restore();
    });

    test("throws an error when the task doesn't exist in register", (assert) => {
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return null;
      });
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.dependsOn("1");
      }, new Error("the task doesn't exist"));
      stub.restore();
    });

    test("with invalid startDate when i apply DD dependancie by default, startDate should be change", (assert) => {
      let tk1 = new Task({
        title: "bhebhgr1",
        startDate: new Date(2020, 2, 1),
      });
      var stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getStartDate: () => {
            return new Date(2020, 11, 1);
          },
        };
      });
      tk1.dependsOn("1");
      assert.true(tk1.startDate >= Register.getTask().getStartDate());
      stub.restore();
    });

    test("set DD dependance by default when the parameter dependanceType isn't specified", (assert) => {
      let tk = new Task({ title: "bhebhgr", startDate: new Date(2020, 2, 1) });
      var stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getStartDate: () => {
            return new Date(2020, 11, 1);
          },
        };
      });
      tk.dependsOn("12");
      assert.true(tk.dependances[0].typeOfDependance == "DD");
      stub.restore();
    });

    test("throws an exception when the parameter dependanceType isn't FF or DD or FD", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getStartDate: () => {
            return new Date(2020, 11, 1);
          },
        };
      });
      assert.throws(() => {
        tk.dependsOn("11", "ls");
      }, new Error("parameter dependanceType should be DD or FF or FD"));
      stub.restore();
    });

    test("with invalid startDate when i apply DD dependancie, startDate should be change", (assert) => {
      let tk1 = new Task({
        title: "bhebhgr",
        startDate: new Date(2020, 2, 1),
      });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getStartDate: () => {
            return new Date(2020, 11, 1);
          },
        };
      });
      tk1.dependsOn("10", "DD");
      assert.true(tk1.startDate >= Register.getTask().getStartDate());
      stub.restore();
    });

    test("with invalid dueDate when i apply FF dependancie, dueDate should be changed", (assert) => {
      let tk1 = new Task({ title: "bhebhgr1", dueDate: new Date(2026, 0, 25) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getDueDate: () => {
            return new Date(2026, 0, 30);
          },
        };
      });
      tk1.dependsOn("5", "FF");
      assert.true(tk1.dueDate >= Register.getTask().getDueDate());
      stub.restore();
    });

    test("with invalid startDate when i apply FD dependancie, startDate should be change", (assert) => {
      let tk1 = new Task({
        title: "bhebhgr1",
        startDate: new Date(2025, 0, 25),
      });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getDueDate: () => {
            return new Date(2026, 0, 30);
          },
        };
      });
      tk1.dependsOn("5", "FD");
      assert.true(tk1.startDate >= Register.getTask().getDueDate());
      stub.restore();
    });

    test("a task must not depend on the same task several times with the same relationship DD", (assert) => {
      let tk = new Task({ title: "bhebhgr", startDate: new Date(2026, 0, 2) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getStartDate: () => {
            new Date(2025, 1, 3);
          },
        };
      });
      tk.dependsOn("14", "DD");
      tk.dependsOn("14", "DD");
      assert.true(tk.dependances.length == 1);
      stub.restore();
    });

    test("a task must not depend on the same task several times with the same relationship FF", (assert) => {
      let tk = new Task({ title: "bhebhgr", dueDate: new Date(2026, 0, 30) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getDueDate: () => {
            return new Date(2026, 0, 25);
          },
        };
      });
      tk.dependsOn("9", "FF");
      tk.dependsOn("9", "FF");
      assert.true(tk.dependances.length == 1);
      stub.restore();
    });

    test("a task must not depend on the same task several times with the same relationship FD", (assert) => {
      let tk = new Task({ title: "bhebhgr", startDate: new Date(2026, 0, 30) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getDueDate: () => {
            return new Date(2026, 0, 25);
          },
        };
      });
      tk.dependsOn("45", "FD");
      tk.dependsOn("45", "FD");
      assert.true(tk.dependances.length == 1);
      stub.restore();
    });

    test("add params day to startDate when the dependance type is DD", (assert) => {
      let task1 = new Task({
        title: "jhsdfn",
        startDate: new Date(2019, 5, 1),
      });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getStartDate: () => {
            return new Date(2015, 1, 2);
          },
        };
      });
      task1.dependsOn("11", "", 5);
      assert.true(
        task1.startDate.getFullYear() == task1.startDate.getFullYear()
      );
      assert.true(task1.startDate.getMonth() == task1.startDate.getMonth());
      assert.true(task1.startDate.getDate() == 6);
      stub.restore();
    });
  });

  QUnit.module("assignedTo", () => {
    test("throws an error when parameter username is not specified", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.assignedTo();
      }, new Error("parameter is required"));
    });

    test("throws an error when parameter username is not a string", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.assignedTo(1);
      }, new Error("username attribute should be a non-empty string"));
    });

    test("throws an error when parameter username is a empty string", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      assert.throws(() => {
        tk.assignedTo("");
      }, new Error("username attribute should be a non-empty string"));
    });

    test("isMemberExist should be called from Register", (assert) => {
      let count = 0;
      let stub = sinon.stub(Register, "isMemberExist").callsFake(function fn() {
        count = 1;
        return true;
      });
      let tk = new Task({ title: "dbhr" });
      tk.assignedTo("dbvceve");
      assert.equal(count, 1);
      stub.restore();
    });

    test("throws an error when the parameter username doesn't exist in register", (assert) => {
      let stub = sinon.stub(Register, "isMemberExist").callsFake(function fn() {
        return null;
      });
      let tk = new Task({ title: "hfvhfv" });
      assert.throws(() => {
        tk.assignedTo("hrjbgr");
      }),
        new Error("this username doesn't exist");
      stub.restore();
    });

    test("assigned username to a task", (assert) => {
      let stub = sinon.stub(Register, "isMemberExist").callsFake(function fn() {
        return true;
      });
      let tk = new Task({ title: "bhebhgr" });
      tk.assignedTo("moi");
      assert.true(tk.taskResponsible == "moi");
      stub.restore();
    });
  });
});
