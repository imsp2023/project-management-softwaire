const { test } = QUnit;

QUnit.module("Project", () => {
  QUnit.module("constructor", (hooks) => {
    hooks.beforeEach(function(){
    });

    test("throws an error when parameters are not specified", (assert) => {

      assert.throws(() => {
        new Project();
      }, new Error(MISSING_PARAMETERS));
    });

    test("with undefined id, _uuid.generate should be called", (assert) =>{
      let spy = sinon.spy(_uuid, 'generate');

      var pj = new Project({ name: "iwe"});

      assert.true(spy.calledOnce);
      spy.restore();
    });

    test("with an empty string as id, _uuid.generate should be called", (assert) => {
      let spy = sinon.spy(_uuid, 'generate');

      var pj = new Project({id: "", name: "iwe"});

      assert.true(spy.calledOnce);
      spy.restore();
    });

    test("throws an error when id parameter is not a string", (assert) => {

      assert.throws(() => {
        new Project({id: 2, name: 'iwe'});
      }, new Error(INVALID_TYPE_PARAMETER));
    });

    test("id should be saved as a string", (assert) => {
      var stub = sinon.stub(_uuid, 'generate').callsFake(function fn(){
          return "feuyvfefv";
      });

      var pj = new Project({name: 'iwe'});

      assert.equal(typeof pj.id, 'string', 'the type of id is a string');
      stub.restore();
    });

    test("throws an error when name parameter is not specified", (assert) => {

      assert.throws(() => {
        new Project({});
      }, new Error(MISSING_PARAMETERS));
    });

    test("throws an error when name parameter is an empty string", (assert) => {

      assert.throws(() => {
        new Project({name: "" });
      }, new Error(MISSING_PARAMETERS));
    });

    test("throws an error when name parameter is not string", (assert) => {

      assert.throws(() => {
        new Project({ name: 2 });
      }, new Error(INVALID_TYPE_PARAMETER));
    });

    test("with responsible attribute specified, responsible setter should be called", (assert) => {
      let count = 0;
      sinon.stub(Project.prototype, "responsible").set(function setterFn() {
        count = 1;
      });

      var pj = new Project({id: "azer", name: 'iwe', responsible: 'franck'});

      assert.equal(count, 1);
      sinon.restore();
    });

    test("with description attribute specified, description setter should be called", (assert) => {
      let count = 0;
      sinon.stub(Project.prototype, "description").set(function setterFn() {
        count = 1;
      });

      var pj = new Project({id: "azer", name: 'iwe', description: 'iwe description'});

      assert.equal(count, 1);
      sinon.restore();
    });

    test("with status attribute specified, status setter should be called", (assert) => {
      let count = 0;
      sinon.stub(Project.prototype, "status").set(function setterFn() {
        count = 1;
      });

      var pj = new Project({id: "azer", name: 'iwe', status: 'active'});

      assert.equal(count, 1);
      sinon.restore();
    });

    test("with startDate attribute specified, startDate setter should be called", (assert) => {
      let count = 0;
      sinon.stub(Project.prototype, "startDate").set(function setterFn() {
        count = 1;
      });

      var pj = new Project({id: "azer", name: 'iwe', startDate: '2023-12-22'});

      assert.equal(count, 1);
      sinon.restore();
    });

    test("with endDate attribute specified, endDate setter should be called", (assert) => {
      let count = 0;
      sinon.stub(Project.prototype, "endDate").set(function setterFn() {
        count = 1;
      });

      var pj = new Project({id: "azer", name: 'iwe', endDate: '2023-12-22'});

      assert.equal(count, 1);
      sinon.restore();
    });

    test("throws an exception when members attribute is not an array",(assert) =>{
      var props = {id: "azer", name: 'iwe', members: ""};

      assert.throws(()=>{
        new Project(props);
      }, INVALID_TYPE_PARAMETER);
    });

    test("with members attribute specified, assign should be called",(assert) =>{
      let count = 0;
      sinon.stub(Project.prototype, "assign").callsFake(function fakeFn() {
        count++;
      });
      var props = {id: "azer", name: 'iwe', members: ['roland', 'alberta']};

      var pj = new Project(props);

      assert.equal(count, props.members.length);
      sinon.restore();
    });

    test("with valid input, project should be successfully created", (assert) =>{
      sinon.stub(Project.prototype, "name").get(function setterFn() {
          return "iwe";
      });
      var props = {id: "azer", name: "iwe"};

      var pj = new Project(props);

      assert.equal(pj.id, props.id, 'set id');
      assert.equal(pj.name, props.name, 'set name');
    });
  });

  QUnit.module("set description", () => {
    test("throws an error when description parameter isn't specified", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.throws(() => {
        p.description = undefined;
      }, new Error(MISSING_PARAMETERS));
    });

    test("throws an error when description parameter is not a string", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.throws(() => {
        p.description = 2;
      }, new Error(INVALID_TYPE_PARAMETER));
    });

    test("valid description should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      p.description  = "iwe description";
      assert.equal(p.description, 'iwe description');
    });
  });

  QUnit.module("set name", () => {
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

    test("throws an error when name parameter is not a string", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.throws(() => {
        p.name = 123;
      }, new Error(INVALID_TYPE_PARAMETER));
    });

    test("name should be saved properly", (assert) => {
      sinon.stub(Project.prototype, "name").get(function setterFn() {
          return "taskd";
      });
      let p = new Project({ name: "iwe" });

      p.name = "taskd";

      assert.equal(p.name, 'taskd');
      sinon.restore();
    });
  });

  QUnit.module("set status", () => {
    test("throws an error when status parameter is not a string", (assert) => {
      let p = new Project({ name: "iwe" });

      assert.throws(() => {
        p.status = 2;
      }, new Error(INVALID_TYPE_PARAMETER));
    });


    test("valid status should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      assert.equal(p.status, undefined);
      sinon.stub(Project.prototype, "status").get(function setterFn() {
        return "active";
      });

      p.status = "active";
      
      assert.equal(p.status, 'active');
      sinon.restore();
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
      sinon.restore();
    });

    test("with valid startDate, startDate should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      var stub = sinon.stub(regex, 'test').callsFake(function fn(){
        return true;
      });
      sinon.stub(Project.prototype, "startDate").get(function setterFn() {
        return new Date("2022-12-20");
    });

      p.startDate = "2022-12-20";
      assert.deepEqual(p.startDate, new Date("2022-12-20"));
      sinon.restore();
    });
  });

  QUnit.module("set endDate", () => {
    test("throws an error when endDate is invalid", (assert)=> {
      let p = new Project({ name: "iwe" });
      var stub = sinon.stub(regex, 'test').callsFake(function fn(){
        return false;
      });
      assert.throws(()=>{
        p.endDate = "22-12*2022";
      }, INVALID_DATE_FORMAT);
      sinon.restore();
    });

    test("with valid endDate, endDate should be saved properly", (assert) => {
      let p = new Project({ name: "iwe" });
      var stub = sinon.stub(regex, 'test').callsFake(function fn(){
        return true;
      });
      sinon.stub(Project.prototype, "endDate").get(function setterFn() {
        return new Date("2022-12-20");
    });

      p.endDate = "2022-12-20"
      assert.deepEqual(p.endDate, new Date("2022-12-20"));
      sinon.restore();
    });
  });

  QUnit.module("assign", () => {
    test("with an already existing member, no more adding", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = ['duamelo'];
      p.assign('duamelo');
      assert.equal(p.members.length, 1);
    });

    test("isMemberExist should be called from Register", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      let count = 0;
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        count++;
        return true;
      });
      p.assign('duamelo');
      assert.equal(count, 1);
      sinon.restore();
    });

    test("with an existing member, addMember should save properly", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return true;
      });
      p.assign('duamelo');
      assert.equal(p.members[0], 'duamelo');
      sinon.restore();
    });

    test("with an unexisting member, addMember should throw an exception", (assert) => {
        let p = new Project({ name: "iwe" });
        p.members = [];
        var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
          return false;
        });
        assert.throws(()=>{
          p.assign('duamelo');
        }, INEXISTANT_MEMBER);
        sinon.restore();
    });
  });

  QUnit.module("set responsible", () => {
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

    test("with a member that's not part of the project' members, isMemberExist should be called from Register", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      let count = 0;
      sinon.stub(Register, "isMemberExist").callsFake(function fakeFn() {
        count++;
        return true;
      });

      p.responsible = 'duamelo';

      assert.equal(count, 1);
      sinon.restore();
    });

    test("with an existing member specified, responsible attribute should be updated", (assert) => {
      let p = new Project({ name: "iwe" });
      p.members = [];
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return true;
      });
      p.responsible = 'duamelo';
      assert.equal(p.members[0], 'duamelo');
      sinon.restore();
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
      sinon.restore();
    });
  });
});
