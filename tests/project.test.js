const { test } = QUnit;

QUnit.module("Project", () => {
  QUnit.module("constructor", () => {
    test("throws an error when parameters are not specified", (assert) => {
      assert.throws(() => {
        new Project();
      }, new Error("parameters are required"));
    });

    test("throws an error when parameter id is not a string", (assert) => {
      assert.throws(() => {
        new Project({ id: 1 });
      }, new Error("id attribute should be a non-empty string"));
    });

    test("throws an error when parameter id is a empty string", (assert) => {
      assert.throws(() => {
        new Project({ id: "" });
      }, new Error("id attribute should be a non-empty string"));
    });

    test("throws an error when parameter name is not specified", (assert) => {
      assert.throws(() => {
        new Project({});
      }, new Error("parameter name is required"));
    });

    test("throws an error when parameter name is not a string", (assert) => {
      assert.throws(() => {
        new Project({ name: 1 });
      }, new Error("name attribute should be a non-empty string"));
    });

    test("throws an error when parameter name is a empty string", (assert) => {
      assert.throws(() => {
        new Project({ name: "" });
      }, new Error("name attribute should be a non-empty string"));
    });

    test("throws an error when parameter responsible isn't string", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", responsible: 1 });
      }, new Error("responsible attribute should be a string"));
    });

    test("throws an error when parameter description isn't string", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", description: 1 });
      }, new Error("description attribute should be a string"));
    });

    test("throws an error when parameter status isn't string", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", status: 1 });
      }, new Error("status attribute should be a string"));
    });

    test("throws an error when the startDate is in incorrect format", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", startDate: "2020/12/01" });
      }, new Error("date should be in yyyy-mm-dd format"));
    });

    test("throws an error when the month of startDate isn't between 1 and 12", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", startDate: "2020-20-01" });
      }, new Error("the month should be between 1 and 12"));
    });

    test("throws an error when the day of startDate isn't between 1 and 31", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", startDate: "2020-12-40" });
      }, new Error("the day should be between 1 and 31"));
    });

    test("throws an error if the startDate year is leap year, the month is February and the date isn't between 1 and 29", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", startDate: "2012-2-30" });
      }, new Error("year is leap year so the day should be between 1 and 29"));
    });

    test("throws an error when the month is February for startDate and the day of date isn't between 1 and 29", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", startDate: "2013-2-29" });
      }, new Error("it's frebruary so the day should be between 1 and 28"));
    });

    test("throws an error when the dueDate is in incorrect format", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", dueDate: "2020/12/01" });
      }, new Error("date should be in yyyy-mm-dd format"));
    });

    test("throws an error when the month of dueDate isn't between 1 and 12", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", dueDate: "2020-20-01" });
      }, new Error("the month should be between 1 and 12"));
    });

    test("throws an error when the day of dueDate isn't between 1 and 31", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", dueDate: "2020-12-40" });
      }, new Error("the day should be between 1 and 31"));
    });

    test("throws an error if the dueDate year is leap year, the month is February and the date isn't between 1 and 29", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", dueDate: "2012-2-30" });
      }, new Error("year is leap year so the day should be between 1 and 29"));
    });

    test("throws an error when the month is February for dueDate and the day of date isn't between 1 and 29", (assert) => {
      assert.throws(() => {
        new Project({ name: "fhbvrh", startDate: "2013-2-29" });
      }, new Error("it's frebruary so the day should be between 1 and 28"));
    });

    //Faire la vérification des affectations
  });

  QUnit.module("updateDescription", () => {
    test("throws an error when parameter description isn't specified", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.updateDescription();
      }, new Error("parameter description is required"));
    });

    test("throws an error when parameter description isn't a string", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.updateDescription(1);
      }, new Error("description attribute should be a string"));
    });
  });

  QUnit.module("updateName", () => {
    test("throws an error when parameter name isn't specified", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.updateName();
      }, new Error("parameter name is required"));
    });

    test("throws an error when parameter name isn't a string", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.updateName(1);
      }, new Error("name attribute should be a non-empty string"));
    });

    test("throws an error when parameter name is a empty string", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.updateName("");
      }, new Error("name attribute should be a non-empty string"));
    });
  });

  QUnit.module("assignedTo", () => {
    test("throws an error when parameter username isn't specified", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.assignedTo();
      }, new Error("parameter username is required"));
    });

    test("throws an error when parameter username isn't a string", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.assignedTo(1);
      }, new Error("username attribute should be a non-empty string"));
    });

    test("throws an error when parameter username is a empty string", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.throws(() => {
        p.assignedTo("");
      }, new Error("username attribute should be a non-empty string"));
    });
  });

  QUnit.module("getters", () => {
    test("getId", (assert) => {
      let p = new Project({ id: "2", name: "dhvbhfre" });
      assert.true(p.getId() == "2");
    });

    test("getName", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      assert.true(p.getName() == "dhvbhfre");
    });

    test("getResponsible", (assert) => {
      let p = new Project({ name: "dhvbhfre", responsible: "dvevfees" });
      assert.true(p.getResponsible() == "dvevfees");
    });

    test("getDescription", (assert) => {
      let p = new Project({
        name: "dhvbhfre",
        description: "Salut tout le monde",
      });
      assert.true(p.getDescription() == "Salut tout le monde");
    });

    test("getStartDate", (assert) => {
      let p = new Project({ name: "dhvbhfre", startDate: "2013-12-01" });
      assert.true(p.getStartDate() == "2013-12-01");
    });

    test("getDueDate", (assert) => {
      let p = new Project({ name: "dhvbhfre", dueDate: "2023-12-01" });
      assert.true(p.getDueDate() == "2023-12-01");
    });

    test("getStatus", (assert) => {
      let p = new Project({ name: "dhvbhfre", status: "" });
      assert.true(p.getStatus() == "");
    });
  });

  
});
