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

    //On a une dependance cyclique à gerer
    //Définir les differents de dependance cyclique
    test("throws an exception when the parameter task is same as task depends", (assert) => {
      let tk = new Task({});
      assert.throws(() => {
        tk.dependsOn(tk);
      }, new Error("the task parameter shouldn't same as task depends"));
    });

    //tk1.dependOn(tk2, "DD")
    //tk2.dependOn(tk3, "DD")
    //tk3.dependOn(tk1, "DD")

    //Choisir une dependance par défaut (DD) plutot que de lever une exception
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

    //Ne pas lever une exception et plutôt ne pas autoriser une même dependance deux fois entre la même tâche
    //Reflechir à tk.dependsOn(tk1, "DD"); et tk.dependsOn(tk1, "FF")
    //Essayer d'explorer toutes les combinaisons de dependance sur une tache avec d'autres
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