const {test} = QUnit;

QUnit.module("Task", () => {
    QUnit.module('constructor', () => {
        test("throws an error when parameters are not specified", assert =>{
            assert.throws(() => {
                new Task();
            }, new Error(MISSING_PARAMETERS));
        });

        test("with undefined id, _uuid.generate should be called", assert =>{
            let spy = sinon.spy(_uuid, 'generate');

            let task = new Task({title: ".."});
      
            assert.true(spy.calledOnce);
            spy.restore();
        });

        test("with an empty string as id, _uuid.generate should be called", (assert) => {
            let spy = sinon.spy(_uuid, 'generate');
      
            let task = new Task({id: "", title: "...."});
      
            assert.true(spy.calledOnce);
            spy.restore();
        });

        test("throws an error when title attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({id:""});
            }, new Error(MISSING_PARAMETERS));
        });

        test("with title attribute specified, title setter should be called", assert=>{
            let count = 0;
            sinon.stub(Task.prototype, "title").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with description attribute specified, description setter should be called", assert => {
            let count = 0;
            sinon.stub(Task.prototype, "description").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title', description: 'description'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with priority attribute specified, priority setter should be called", assert => {
            let count = 0;
            sinon.stub(Task.prototype, "priority").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title', priority: 1});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with status attribute specified, status setter should  be called", assert =>{
            let count = 0;
            sinon.stub(Task.prototype, "status").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title', status: 'active'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with startDate attribute specified, startDate setter should be called", assert =>{
            let count = 0;
            sinon.stub(Task.prototype, "startDate").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title',startDate: '22-10-2022'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test(" with dueDate attribute specified, endDate setter should be called", assert =>{
            let count = 0;
            sinon.stub(Task.prototype, "dueDate").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title', dueDate: '22-10-2023'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with responsible attribute specified, responsible setter should be called", assert=>{
            let count = 0;
            sinon.stub(Task.prototype, "responsible").set(function fakeFn() {
              count++;
            });

            let props = {title: 'title', responsible: 'franck'};
            let t = new Task(props);

            assert.equal(count, 1);
            sinon.restore();
        });
    });

    QUnit.module('parent setter', () => {
        test("throws an exception when no parameter is specified", (assert) => {
            let task = new Task({title: "title"});
  
            assert.throws(() => {
              task.parent = undefined;
            }, new Error(MISSING_PARAMETERS));
       });

       test("with valid id, parent should be assigned", assert=>{
            let task = new Task({title: "title"});

            task.parent = "15638";

            assert.equal(task.parent, '15638');
       });
    });

    QUnit.module('title setter', () => {
        test("throws an error when title attribute is not provided", assert=>{
            let task = new Task({title: "title"});

            assert.throws(()=>{
                task.title = undefined;
            }, new Error(MISSING_PARAMETERS));
        });

        test("throws an error when title attribute is not a string", assert=>{
            let task = new Task({title: "title"});

            assert.throws(()=>{
                task.title = 123;
            }, new Error(INVALID_TYPE_PARAMETER));
        });

        test("with valid title, title should be saved properly", assert=>{
            let task = new Task({title: "title"});

            task.title = 'iwe title';

            assert.equal(task.title, 'iwe title');
        });
    })

    QUnit.module('description setter', () => {
        test("throws an error when description parameter isn't specified", (assert) => {
            let t = new Task({ title: "iwe title" });
            assert.throws(() => {
              t.description = undefined;
            }, new Error(MISSING_PARAMETERS));
        });
      
        test("throws an error when description parameter is not a string", (assert) => {
            let t = new Task({ title: "iwe title" });
            assert.throws(() => {
                t.description = 2;
            }, new Error(INVALID_TYPE_PARAMETER));
        });
    
        test("valid description should be saved properly", (assert) => {
            let t = new Task({ title: "iwe title"});
            t.description  = "iwe description";
            assert.equal(t.description, 'iwe description');
        });
    });

    QUnit.module('status setter', () => {
        test("throws an error when status parameter is not a string", (assert) => {
            let t = new Task({ title: "iwe title" });
      
            assert.throws(() => {
              t.status = 2;
            }, new Error(INVALID_TYPE_PARAMETER));
        });
      
      
        test("valid status should be saved properly", (assert) => {
            let t = new Task({ title: "iwe title" });
            assert.equal(t.status, undefined);
            sinon.stub(Task.prototype, "status").get(function setterFn() {
                return "active";
            });
        
            t.status = "active";
            
            assert.equal(t.status, 'active');
            sinon.restore();
        });
    });

    QUnit.module('priority setter', () => {
        test("throws an exception when priority is not a number", assert=>{
            let t = new Task({ title: "iwe title" });
      
            assert.throws(() => {
              t.priority = '2';
            }, new Error(INVALID_TYPE_PARAMETER));
        });

        test("with valid type priority, priority should be saved properly", assert=>{
            let t = new Task({ title: "iwe title" });
            assert.equal(t.status, undefined);
            sinon.stub(Task.prototype, "priority").get(function setterFn() {
                return 2;
            });
        
            t.priority = 2;
            
            assert.equal(t.priority, 2);
            sinon.restore();
        });
    });

    QUnit.module("startDate setter", () => {
        test("throws an error when startDate is invalid", (assert) => {
          let t = new Task({ title: "title" });
          var stub = sinon.stub(regex, 'test').callsFake(function fn(){
            return false;
          });
          assert.throws(()=>{
            t.startDate = "22-13-2022";
          }, INVALID_DATE_FORMAT);
          sinon.restore();
        });
    
        test("with valid startDate, startDate should be saved properly", (assert) => {
            let t = new Task({ title: "title" });
            var stub = sinon.stub(regex, 'test').callsFake(function fn(){
                return true;
            });
    
          t.startDate = "22-12-2022";
          assert.deepEqual(t.startDate, new Date(2022, 11, 22));
          sinon.restore();
        });
    });

    QUnit.module("set dueDate", () => {
        test("throws an error when dueDate is invalid", (assert)=> {
            let t = new Task({ title: "title" });
            var stub = sinon.stub(regex, 'test').callsFake(function fn(){
                return false;
            });
            assert.throws(()=>{
                t.dueDate = "22-13-2022";
            }, INVALID_DATE_FORMAT);
            sinon.restore();
        });
    
        test("with valid dueDate, endDate should be saved properly", (assert) => {
            let t = new Task({ title: "title" });
            var stub = sinon.stub(regex, 'test').callsFake(function fn(){
                return true;
            });
        
            t.dueDate = "22-10-2022"
            assert.deepEqual(t.dueDate, new Date(2022, 9, 22));
            sinon.restore();
        });
    });

    QUnit.module("set responsible", ()=>{
        test("with an existing member specified, responsible attribute should be updated", (assert) => {
            let t = new Task({ title: "title" });
            var stub = sinon.stub(configuration, 'loadUsers').callsFake(function fn(){
                configuration.users = ['duamelo'];
            });
            configuration.loadUsers(()=>{});

            t.responsible = 'duamelo';
            assert.equal(t._responsible, 'duamelo');
            sinon.restore();
        });

        test("with a member that's not enregistred, throws an exception", (assert) => {
            let t = new Task({ title: "title" });
            var stub = sinon.stub(configuration, 'loadUsers').callsFake(function fn(){
                configuration.users = [];
            });
            configuration.loadUsers(()=>{});

            assert.throws(()=>{
                t.responsible = 'duamelo';
            }, INEXISTING_MEMBER);
            sinon.restore();
        });
    });

    QUnit.module("dependsOn", () => {
        test("set DD dependence by default when the dependence parameter isn't specified", (assert)=>{
            let task = new Task({id: "1495", title: "bhebhgr", startDate: '1-11-2020' });
            task.dependences = {};

            task.dependsOn("12");

            assert.equal(task.dependences['12'], 'DD');
        });
    
        test("only one type dependence is allowed between two tasks", (assert) => {
          let task = new Task({id: '14635', title: "bhebhgr", startDate: '3-2-2025'});
          task.dependences = {};

          task.dependsOn("14", "DD");
          task.dependsOn("14", "DD");

          assert.true(Object.keys(task.dependences).length == 1);
        });
    });
});
