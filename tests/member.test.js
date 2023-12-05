const { test } = QUnit;

QUnit.module("Member", () => {
  QUnit.module("constructor", () => {
    test("throws an error when parameters are not specified", (assert) => {
      assert.throws(() => {
        new Member();
      }, new Error("parameters are required"));
    });

    test("throws an error when parameter id is not a string", (assert) => {
      assert.throws(() => {
        new Member({ id: 1 });
      }, new Error("id attribute should be a non-empty string"));
    });

    test("throws an error when parameter id is a empty string", (assert) => {
      assert.throws(() => {
        new Member({ id: "" });
      }, new Error("id attribute should be a non-empty string"));
    });

    test("throws an error when parameter username is not specified", (assert) => {
      assert.throws(() => {
        new Member({ id: "1" });
      }, new Error("parameter username is required"));
    });

    test("throws an error when parameter username is not a string", (assert) => {
      assert.throws(() => {
        new Member({ id: "1", username: 1 });
      }, new Error("username attribute should be a non-empty string"));
    });

    test("throws an error when parameter username is a empty string", (assert) => {
      assert.throws(() => {
        new Member({ id: "1", username: "" });
      }, new Error("username attribute should be a non-empty string"));
    });

    test("throws an error when parameter role is not specified", (assert) => {
      assert.throws(() => {
        new Member({ id: "1", username: "salut" });
      }, new Error("parameter role is required"));
    });

    test("throws an error when parameter role is not a string", (assert) => {
      assert.throws(() => {
        new Member({ id: "1", username: "salut", role: 1 });
      }, new Error("role attribute should be a non-empty string"));
    });

    test("throws an error when parameter role is a empty string", (assert) => {
      assert.throws(() => {
        new Member({ id: "1", username: "salut", role: "" });
      }, new Error("role attribute should be a non-empty string"));
    });

    test("throws an error when parameter email is not specified", (assert) => {
      assert.throws(() => {
        new Member({ id: "1", username: "salut", role: "hi" });
      }, new Error("parameter email is required"));
    });

    test("throws an error when parameter email is not a correct format", (assert) => {
      assert.throws(() => {
        new Member({
          id: "1",
          username: "salut",
          role: "hi",
          email: "dbvrvrhv",
        });
      }, new Error("email should be in example@gmail.com format"));
    });
  });

  QUnit.module("updateRole", () => {
    test("throws an error when parameter role is not specified", (assert) => {
      let props = {
        id: "1",
        username: "salut",
        role: "hi",
        email: "dbvrvrhv@gmail.com",
      };
      let m = new Member(props);
      assert.throws(() => {
        m.updateRole();
      }, new Error("parameter is required"));
    });

    test("throws an error when parameter role is not a string", (assert) => {
      let props = {
        id: "1",
        username: "salut",
        role: "hi",
        email: "dbvrvrhv@gmail.com",
      };
      let m = new Member(props);
      assert.throws(() => {
        m.updateRole(1);
      }, new Error("role attribute should be a non-empty string"));
    });

    test("throws an error when parameter role is a empty string", (assert) => {
      let props = {
        id: "1",
        username: "salut",
        role: "hi",
        email: "dbvrvrhv@gmail.com",
      };
      let m = new Member(props);
      assert.throws(() => {
        m.updateRole("");
      }, new Error("role attribute should be a non-empty string"));
    });
  });

  QUnit.module("updateName", () => {
    test("throws an error when parameter name is not specified", (assert) => {
      let props = {
        id: "1",
        username: "salut",
        role: "hi",
        email: "dbvrvrhv@gmail.com",
      };
      let m = new Member(props);
      assert.throws(() => {
        m.updateName();
      }, new Error("parameter is required"));
    });

    test("throws an error when parameter name is not a string", (assert) => {
      let props = {
        id: "1",
        username: "salut",
        role: "hi",
        email: "dbvrvrhv@gmail.com",
      };
      let m = new Member(props);
      assert.throws(() => {
        m.updateName(1);
      }, new Error("name attribute should be a non-empty string"));
    });

    test("throws an error when parameter name is a empty string", (assert) => {
      let props = {
        id: "1",
        username: "salut",
        role: "hi",
        email: "dbvrvrhv@gmail.com",
      };
      let m = new Member(props);
      assert.throws(() => {
        m.updateName("");
      }, new Error("name attribute should be a non-empty string"));
    });
  });
});
