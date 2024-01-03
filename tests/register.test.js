const { test } = QUnit;

QUnit.module("Register", () => {
  QUnit.module("addTask", () => {

    test("with no parameter, no task adding", assert => {
      Register.store = {};
      Register.addTask();

      assert.equal(Object.keys(Register.store).length, 0, "no task to add");
    })

    test("throws an exception when task is not a Task object", assert=>{
        assert.throws(()=>{
          Register.addTask("hello");
        }, new Error("task should be a task object"));
    });

    test("with an empty store, addTask should add a task", (assert)=>{
      let t = new Task({title: "My task"});
      Register.store = {};
      Register.addTask(t);

      assert.equal(Object.keys(Register.store).length, 1, "task added");
    });
  });

  QUnit.module("deleteTask", () => {
    test("with an inexistant task, no deletion", assert=>{
      let t = new Task({title: "My task"});
      Register.store = {"48456": t, }
      Register.deleteTask("64646");

      assert.equal(Object.keys(Register.store).length, 1, "no deletion");
    });

    test("task is deleted when it exists", assert=>{
      let t = new Task({title: "My task"});
      Register.store = {"48456": t};
      Register.deleteTask(48456);
      
      assert.equal(Object.keys(Register.store).length, 0, "remove task");
    });

    test("throw an exception when task is parent", assert=>{
      let t2 = new Task({title: "My task"});
      let t1 = new Task({title: "My task"});
      Register.store = {[t1.id]: t1, [t2.id]: t2};
      t1.parent = t2.id;

      assert.throws(()=>{
        Register.deleteTask(t2.id);
      }, new Error("this task has child: delete child task first"));
    });

    test("throw an exception when task has dependence's task", assert=>{
      let t2 = new Task({title: "My task"});
      Register.store = {[t2.id]: t2,};
      let t1 = new Task({title: "My task", dependences: [{id: t2.id, type: "FF"}]});
      Register.store = {[t1.id]: t1, [t2.id]: t2};

      assert.throws(()=>{
        Register.deleteTask(t2.id);
      }, new Error("another tasks depend on this"));
    });
  });
  

  QUnit.module("getTask", () => {
    test("with an unexistant task, return undefined", assert => {
      let t = new Task({title: "My task"});

      Register.store = {"ffdndcnbd": t};
      let task = Register.getTask("hdfgdff");
      assert.equal(task, undefined);
    });

    test("with an existant task, getTask return it", assert => {
      let t = new Task({title: "My task"});
      
      Register.store = {"ffdndcnbd": t};
      let task = Register.getTask("ffdndcnbd");
      assert.equal(task.id, t.id, "get task");
    });
  });

  QUnit.module("addMember", () => {
    test("throw an exception when member is not string", (assert) => {
      assert.throws(()=>{
        Register.addMember(123);
      }, new Error(INVALID_TYPE_PARAMETER));
    });

    test("throw an exception when member already exists", (assert) => {
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return true;
      });
      
      assert.throws(()=>{
        Register.addMember("hello");
      }, new Error(MEMBER_ALREADY_EXISTANT));
      sinon.restore();
    });

    test("with an existing member, addMember should save properly", (assert) => {
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return false;
      });
      
      Register.addMember("tony");
      assert.equal(Register.members["tony"], "tony");
      sinon.restore();
    });
  });

  QUnit.module("isMemberExist", () => {
    test("when member doesn't exist, isMemberExist return false", (assert) => {
      Register.members = {"tony": "tony", };
      
      assert.equal(Register.isMemberExist("franck"), false);
    });

    test("when member exists, isMemberExist return true", (assert) => {
      Register.members = {"tony": "tony", };
      assert.equal(Register.isMemberExist("tony"), true);
    });
  });

  QUnit.module("getTasksByMember", () => {
    test("isMemberExist should be called from Register", (assert) => {
      var spy = sinon.spy(Register, 'isMemberExist');

      Register.getTasksByMember('tony');
      assert.true(spy.calledOnce);
      sinon.restore();
    });

    test("when member don't exists, no task to return", assert=>{
      var stub = sinon.stub(Register, 'isMemberExist').callsFake(function fn(){
        return false;
      });

      let tasks = Register.getTasksByMember('tony');
      assert.equal(tasks, undefined, "no task");
      sinon.restore();
    });

    test("when member exists, member's tasks are returned", assert=>{
      Register.members = {"franck": "franck"};
      let t = new Task({title: "My task", responsible: 'franck'});
      Register.store = {"48456": t};
      
      let tasks = Register.getTasksByMember("franck");
      assert.equal(tasks.length, 1);
    });
  });
    
});