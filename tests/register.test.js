const { test } = QUnit;

QUnit.module("Register", () => {
  QUnit.module("addTask", () => {
    test("throws an error when parameter id is not specified", (assert) => {
      let r = new Register();
      assert.throws(() => {
        r.addTask();
      }, new Error("parameter id is required"));
    });

    test("throws an error when parameter id is not a string", (assert) => {
      let r = new Register();
      assert.throws(() => {
        r.addTask(1);
      }, new Error("parameter id should be a non-empty string"));
    });

    test("throws an error when parameter id is a empty string", (assert) => {
      let r = new Register();
      assert.throws(() => {
        r.addTask("");
      }, new Error("parameter id should be a non-empty string"));
    });

    test("throws an error when parameter task is not specified", (assert) => {
      let r = new Register();
      assert.throws(() => {
        r.addTask("1");
      }, new Error("parameter task is required"));
    });

    test("throws an error when parameter task isn't a object of class Task", (assert) => {
      let r = new Register();
      assert.throws(() => {
        r.addTask("1", {});
      }, new Error("parameter task should be a instance of task"));
    });
  });
});
