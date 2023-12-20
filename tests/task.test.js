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
          getId: () => {
            return "1";
          },
          getStartDate: () => {
            return new Date(2020, 11, 1);
          },
        };
      });
      tk1.dependsOn(Register.getTask().getId());
      assert.true(tk1.getStartDate() >= Register.getTask().getStartDate());
      stub.restore();
    });

    test("set DD dependance by default when the parameter dependanceType isn't specified", (assert) => {
      let tk = new Task({ title: "bhebhgr", startDate: new Date(2020, 2, 1) });
      var stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "12";
          },
          getStartDate: () => {
            return new Date(2020, 11, 1);
          },
        };
      });
      tk.dependsOn(Register.getTask().getId());
      assert.true(tk.getDependances()[0].typeOfDependance == "DD");
      stub.restore();
    });

    test("throws an exception when the parameter dependanceType isn't FF or DD or FD", (assert) => {
      let tk = new Task({ title: "bhebhgr" });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "11";
          },
        };
      });
      assert.throws(() => {
        tk.dependsOn(Register.getTask().getId(), "ls");
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
          getId: () => {
            return "10";
          },
          getStartDate: () => {
            return new Date(2020, 11, 1);
          },
        };
      });
      tk1.dependsOn(Register.getTask().getId(), "DD");
      assert.true(tk1.getStartDate() >= Register.getTask().getStartDate());
      stub.restore();
    });

    test("with invalid dueDate when i apply FF dependancie, dueDate should be changed", (assert) => {
      let tk1 = new Task({ title: "bhebhgr1", dueDate: new Date(2026, 0, 25) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "5";
          },
          getDueDate: () => {
            return new Date(2026, 0, 30);
          },
        };
      });
      tk1.dependsOn(Register.getTask().getId(), "FF");
      assert.true(tk1.getDueDate() >= Register.getTask().getDueDate());
      stub.restore();
    });

    test("with invalid startDate when i apply FD dependancie, startDate should be change", (assert) => {
      let tk1 = new Task({
        title: "bhebhgr1",
        startDate: new Date(2025, 0, 25),
      });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "5";
          },
          getDueDate: () => {
            return new Date(2026, 0, 30);
          },
        };
      });
      tk1.dependsOn(Register.getTask().getId(), "FD");
      assert.true(tk1.getStartDate() >= Register.getTask().getDueDate());
      stub.restore();
    });

    test("a task must not depend on the same task several times with the same relationship DD", (assert) => {
      let tk = new Task({ title: "bhebhgr", startDate: new Date(2026, 0, 2) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "14";
          },
          getStartDate: () => {
            new Date(2025, 1, 3);
          },
        };
      });
      tk.dependsOn(Register.getTask().getId(), "DD");
      tk.dependsOn(Register.getTask().getId(), "DD");
      assert.true(tk.getDependances().length == 1);
      stub.restore();
    });

    test("a task must not depend on the same task several times with the same relationship FF", (assert) => {
      let tk = new Task({ title: "bhebhgr", dueDate: new Date(2026, 0, 30) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "9";
          },
          getDueDate: () => {
            return new Date(2026, 0, 25);
          },
        };
      });
      tk.dependsOn(Register.getTask().getId(), "FF");
      tk.dependsOn(Register.getTask().getId(), "FF");
      assert.true(tk.getDependances().length == 1);
      stub.restore();
    });

    test("a task must not depend on the same task several times with the same relationship FD", (assert) => {
      let tk = new Task({ title: "bhebhgr", startDate: new Date(2026, 0, 30) });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "45";
          },
          getDueDate: () => {
            return new Date(2026, 0, 25);
          },
        };
      });
      tk.dependsOn(Register.getTask().getId(), "FD");
      tk.dependsOn(Register.getTask().getId(), "FD");
      assert.true(tk.getDependances().length == 1);
      stub.restore();
    });

    test("add params day to startDate when the dependance type is DD", (assert) => {
      let task1 = new Task({
        title: "jhsdfn",
        startDate: new Date(2019, 5, 1),
      });
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          getId: () => {
            return "11";
          },
          getStartDate: () => {
            return new Date(2015, 1, 2);
          },
        };
      });
      task1.dependsOn(Register.getTask().getId(), "", "5");
      assert.true(
        task1.getStartDate().getFullYear() == task1.getStartDate().getFullYear()
      );
      assert.true(
        task1.getStartDate().getMonth() == task1.getStartDate().getMonth()
      );
      assert.true(task1.getStartDate().getDate() == 6);
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
      assert.true(tk.getTaskResponsible() == "moi");
    });
  });
});

//Après compter le nombre de fois que l'appel de la fonction à été appelé

// test("getTask should be called from Register", (assert) => {
//   let count = 0;
//   let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
//     count = 1;
//   });
//   let tk = new Task({ title: "dbhr" });
//   tk.dependsOn("1");
//   assert.equal(count, 1);
//   stub.restore();
// });
