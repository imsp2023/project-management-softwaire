const { test } = QUnit;
let spy;
QUnit.module("Project", () => {
  QUnit.module("constructor", (hooks) => {
    hooks.beforeEach(function(){
      mock = sinon.mock('');
    });

    test("throws an error when parameters are not specified", (assert) => {
      assert.throws(() => {
        new Project();
      }, new Error(MISSING_PARAMETERS));
    });

    test("with undefined id, _uuid.generate should be called", (assert) =>{
      spy = sinon.spy(_uuid, 'generate');
      var pj = new Project({ name:"iwe"});
      assert.true(spy.calledOnce);
    });

    test("with an empty string as id, _uuid.generate should be called", (assert) => {
      spy = sinon.spy(_uuid, 'generate');
      var pj = new Project({id: "", name: "iwe"});
      assert.true(spy.calledOnce);
    });

    test("id should be saved as a string", (assert) => {
      var pj = new Project({});
      var stub = sinon.stub(_uuid, 'generate').callsFake(function fn(){
          return "feuyvfefv";
      });
      assert.equal(typeof pj.id, 'string', 'the type of id is a string');
    });

    test("throws an error when name parameter is not specified", (assert) => {
      assert.throws(() => {
        new Project({});
      }, new Error(MISSING_PARAMETERS));
    });

    test("throws an error when name parameter is an empty string", (assert) => {
      assert.throws(() => {
        new Project({ name: "" });
      }, new Error(NON_EMPTY_STRING_VALUE));
    });

    test("name should be saved as a string", (assert) => {
      var pj = new Project({id: "azer", name: 23});
      assert.equal(typeof pj.name, 'string', 'name is a string');
    });

    test("with responsible attribute specified, set responsible should be called", (assert) => {
      var pj = new Project({id: "azer", name: 'iwe'});
      var spy = sinon.spy(pj, 'responsible', ['set']);
      assert.true(spy.set.calledOnce);
    });

    test("with description attribute specified, setDescription should be called", (assert) => {
      var pj = new Project({id: "azer", name: 'iwe'});
      var spy = sinon.spy(pj, 'description', ['set']);
      assert.true(spy.set.calledOnce);
    });

    test("with status attribute specified, setStatus should be called", (assert) => {
      var pj = new Project({id: "azer", name: 'iwe'});
      var spy = sinon.spy(pj, 'status', ['set']);
      assert.true(spy.set.calledOnce);
    });

    test("with startDate attribute specified, setStartDate should be called", (assert) => {
      var pj = new Project({id: "azer", name: 'iwe'});
      var spy = sinon.spy(pj, 'startDate', ['set']);
      assert.true(spy.set.calledOnce);
    });

    test("throws an exception when members attribute should be an array",(assert) =>{
      var props = {id: "azer", name: 'iwe', members: ""};
      assert.throws(()=>{
        new Project(props);
      }, INVALID_TYPE_PARAMETER);
    });

    test("with members attribute specified, addMembers should be called",(assert) =>{
      var props = {id: "azer", name: 'iwe', members: ['roland', 'alberta']};
      var pj = new Project(props);
      var spy = sinon.spy(pj, 'addMember');
      assert.equal(spy.callCount, props.members.length);
    });

    test("with valid input, project should be successfully created", (assert) =>{
      var props = {id: "azer", name: "iwe"};
      var pj = new Project(props);
      assert.equal(pj.id, props.id, 'set id');
      assert.equal(pj.name, props.name, 'set name');
    });
  });

  QUnit.module("set description setter", () => {
    test("throws an error when parameter description isn't specified", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.throws(() => {
        p.description = undefined;
      }, new Error(MISSING_PARAMETERS));
    });

    test("description should be saved as string", (assert) => {
      let p = new Project({ name: "dhvbhfre" });
      p.description = 123;
      assert.equal(typeof p.description, 'string');
    });

    test("description should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      p.description  = "iwe description";
      assert.equal(p.description, 'iwe description');
    });
  });

  QUnit.module("set name setter", () => {
    test("throws an error when name parameter is not specified", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.throws(() => {
        p.name = undefined;
      }, new Error(MISSING_PARAMETERS));
    });

    test("throws an error when name parameter is an empty string", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.throws(() => {
        p.name = "";
      }, new Error(NON_EMPTY_STRING_VALUE));
    });

    test("name should be saved as a string", (assert) => {
      let p = new Project({ name: "iwe" });
      p.name = undefined;
      p.name = 145;
      assert.equal(typeof p.name, 'string');
      assert.equal(p.name, '145');
    });

    test("name should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      p.name = "taskd";
      assert.equal(p.name, 'taskd');
    });
  });

  QUnit.module("set status setter", () => {
    test("status should be saved as a string", (assert) => {
      let p = new Project({ name: "iwe" });
      p.status = undefined;
      p.status = 2;
      assert.equal(typeof p.name, 'string');
    });

    test("status should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      p.status = undefined;
      p.status = "active";
      assert.equal(p.status, 'active');
    });
  });

  QUnit.module("startDate setter", () => {
    test("throws an error when startDate is invalid", (assert) => {
      let p = new Project({ name: "iwe" });
      var stub = sinon.stub(regex, 'test').callsFake(function fn(){
        return false;
      });
      assert.throws(()=>{
        p.startDate = "22-12*2022";
      }, INVALID_DATE_FORMAT);
    });

    test("with valid startDate, startDate should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      var stub = sinon.stub(regex, 'test').callsFake(function fn(){
        return true;
      });
      p.startDate = "22-12-2022"
      assert.equal(p.startDate, '22-12-2022');
    });
  });

  QUnit.module("endDate setter", () => {
    test("throws an error when endDate is invalid", (assert) => {
      let p = new Project({ name: "iwe" });
      var stub = sinon.stub(regex, 'test').callsFake(function fn(){
        return false;
      });
      assert.throws(()=>{
        p.endDate = "22-12*2022";
      }, 'date should be in DD-MM-YYYY or DD/MM/YYYY format');
    });

    test("with valid endDate, startDate should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      var stub = sinon.stub(regex, 'test').callsFake(function fn(){
        return true;
      });
      p.dueDate = "22-12-2022"
      assert.equal(p.dueDate, '22-12-2022');
    });
  });

  QUnit.module("addMember", () => {
    test("with an already existing member, no more adding", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = ['duamelo'];
      p.addMember('duamelo');
      assert.equal(p.members.length, 1);
    });

    test("isMemberExist should be called from Register", (assert) => {
      let p = new Project({ name: "iwe" });
      var spy = sinon.spy(Register, 'isMemberExist');
      p.addMember('duamelo');
      assert.true(spy.calledOnce);
    });

    test("with an existing member, addMember should save properly", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return true;
      });
      p.addMember('duamelo');
      assert.equal(p.members[0], 'duamelo');
    });
  });

  QUnit.module("responsible setter", () => {
    test("throws an error when parameter username isn't specified", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.throws(() => {
        p.responsible = undefined;
      }, new Error(MISSING_PARAMETERS));
    });

    test("with a member that's part of the project, responsible attribute should be updated", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = ['duamelo'];
      assert.notOk(p.responsible);
      p.responsible = 'duamelo';
      assert.equal(p.responsible, 'duamelo');
    });

    test("with a member that's not part of the project, isMemberExist should be called from Register", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      p.responsible = 'duamelo';
      var spy = sinon.spy(Register, 'isMemberExist');
      assert.true(spy.calledOnce);
    });

    test("with an existing member specified, responsible attribute should be updated", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return true;
      });
      p.responsible = 'duamelo';
      assert.equal(p.members[0], 'duamelo');
    });

    test("with a member that's not enregistred, throws an exception", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return false;
      });
      assert.throws(()=>{
        p.responsible = 'duamelo';
      }, INEXISTING_MEMBER);
    });
  });
});
