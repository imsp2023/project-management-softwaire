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

            let task = new Task({});
      
            assert.true(spy.calledOnce);
            spy.restore();
        });

        test("with an empty string as id, _uuid.generate should be called", (assert) => {
            let spy = sinon.spy(_uuid, 'generate');
      
            let task = new Task({id: ""});
      
            assert.true(spy.calledOnce);
            spy.restore();
        });

        test("throws an error when title attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({});
            }, new Error(MISSING_PARAMETERS));
        });

        test("throws an error when title attribute is not a string", assert=>{

            assert.throws(()=>{
                new Task({title: 123});
            }, new Error(INVALID_TYPE_PARAMETER));
        });

        test("with description attribute specified, description setter should be called", assert => {
            let count = 0;
            sinon.stub(Project.prototype, "description").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with priority attribute specified, priority setter should be called", assert => {
            let count = 0;
            sinon.stub(Project.prototype, "priority").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with status attribute specified, status setter should  be called", assert =>{
            let count = 0;
            sinon.stub(Project.prototype, "status").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with startDate attribute specified, startDate setter should be called", assert =>{
            let count = 0;
            sinon.stub(Project.prototype, "startDate").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test(" with endDate attribute specified, endDate setter should be called", assert =>{
            let count = 0;
            sinon.stub(Project.prototype, "endDate").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with parentId attribute specified, parentId setter should be called", assert =>{
            let count = 0;
            sinon.stub(Project.prototype, "parent").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("throws an exception when dependancies attribute is not an array", assert=>{

            assert.throws(()=>{
                new Task({title: 'title', dependances: ""});
            }, INVALID_TYPE_PARAMETER);
        });

        test("with dependancies attribute specified, dependances setter should be called", assert=>{
            let count = 0;
            sinon.stub(Project.prototype, "dependances").callsFake(function fakeFn() {
              count++;
            });
      
            let props = {title: 'title', dependances: ['eetyzeztfd', 'ffgffgggf', 'gghghhghggh']};
            let t = new Task(props);

            assert.equal(count, props.dependances.length);
            sinon.restore();
        });

        test("with responsible attribute specified, responsible setter should be called", assert=>{
            let count = 0;
            sinon.stub(Project.prototype, "responsible").callsFake(function fakeFn() {
              count++;
            });

            let props = {title: 'title', responsible: 'franck'};
            let t = new Task(props);

            assert.equal(count, 1);
            sinon.restore();
        });
    });

    // QUnit.module('parent setter', () => {
    //     test("throws an exception when no parameter is specified", (assert) => {
    //         let task = new Task({title: "title"});
  
    //         assert.throws(() => {
    //           task.parentId = undefined;
    //         }, new Error(MISSING_PARAMETERS));
    //    });

    //    test("throws an exception when parentId is not a string", (assert) => {
    //         let task = new Task({title: "title"});

    //         assert.throws(() => {
    //             task.parentId = 1;
    //         }, new Error(INVALID_TYPE_PARAMETER));
    //    });

    //    test("with valid parentId type, getTask should be called from Register", assert=>{
    //         let count = 0;
    //         sinon.stub(Register, "getTask").callsFake(function fakeFn() {
    //             count++;
    //         });
    //         let task = new Task({title: "title"});
    //         task.parentId = 'ygytgvyvgyt';

    //         assert.equal(count, 1);
    //         sinon.restore();
    //    });
       
    //    test("with an existing task as parent, child' startDate should be updated if needed", assert=>{
    //         sinon.stub(Register, "getTask").callsFake(function fakeFn() {
    //             return {startDate:new Date('2023-10-20')};
    //         });
    //         let task = new Task({title: "title", startDate: new Date('2023-10-10')});
            
    //         task.parentId = 'ygytgvyvgyt';

    //         assert.deepEqual(task.startDate, new Date('2023-10-20'));
    //    });

    //    test("with an unexisting task as parent, an exception should be thrown", assert=>{
    //         sinon.stub(Register, "getTask").callsFake(function fakeFn() {
    //             return null;
    //         });
    //         let task = new Task({title: "title", startDate: new Date('2023-10-10')});

    //         assert.throws(()=>{
    //             task.parentId = 'ygytgvyvgyt';
    //         }, INEXISTANT_TASK_RESOURCE);
    //    });
    // });

    // QUnit.module('title setter', () => {
    //     test("throws an error when title attribute is not provided", assert=>{
    //         let task = new Task({title: "title"});

    //         assert.throws(()=>{
    //             task.title = undefined;
    //         }, new Error(MISSING_PARAMETERS));
    //     });

    //     test("throws an error when title attribute is not a string", assert=>{
    //         let task = new Task({title: "title"});

    //         assert.throws(()=>{
    //             task.title = 123;
    //         }, new Error(INVALID_TYPE_PARAMETER));
    //     });

    //     test("with valid title, title should be saved properly", assert=>{
    //         let task = new Task({title: "title"});

    //         task.title = 'iwe title';

    //         assert.equal(task.title, 'iwe title');
    //     });
    // })

    // QUnit.module('description setter', () => {
    //     test("throws an error when description parameter isn't specified", (assert) => {
    //         let t = new Task({ title: "iwe title" });
    //         assert.throws(() => {
    //           t.description = undefined;
    //         }, new Error(MISSING_PARAMETERS));
    //     });
      
    //     test("throws an error when description parameter is not a string", (assert) => {
    //         let t = new Task({ title: "iwe title" });
    //         assert.throws(() => {
    //             t.description = 2;
    //         }, new Error(INVALID_TYPE_PARAMETER));
    //     });
    
    //     test("valid description should be saved properly", (assert) => {
    //         let t = new Task({ title: "iwe title"});
    //         t.description  = "iwe description";
    //         assert.equal(t.description, 'iwe description');
    //     });
    // });

    // QUnit.module('status setter', () => {
    //     test("throws an error when status parameter is not a string", (assert) => {
    //         let t = new Task({ title: "iwe title" });
      
    //         assert.throws(() => {
    //           t.status = 2;
    //         }, new Error(INVALID_TYPE_PARAMETER));
    //     });
      
      
    //     test("valid status should be saved properly", (assert) => {
    //         let t = new Task({ title: "iwe title" });
    //         assert.equal(p.status, undefined);
    //         sinon.stub(Task.prototype, "status").get(function setterFn() {
    //             return "active";
    //         });
        
    //         t.status = "active";
            
    //         assert.equal(t.status, 'active');
    //         sinon.restore();
    //     });
    // })

    // QUnit.module('priority setter', () => {
    //     test("throws an exception when priority is not a number", assert=>{
    //         let t = new Task({ title: "iwe title" });
      
    //         assert.throws(() => {
    //           t.priority = '2';
    //         }, new Error(INVALID_TYPE_PARAMETER));
    //     });

    //     test("with valid status, priority should be saved properly", assert=>{
    //         let t = new Task({ title: "iwe title" });
    //         assert.equal(p.status, undefined);
    //         sinon.stub(Task.prototype, "priority").get(function setterFn() {
    //             return 2;
    //         });
        
    //         t.status = 2;
            
    //         assert.equal(t.status, 2);
    //         sinon.restore();
    //     });
    // });

    // QUnit.module('startDate setter', () => {
    //     test("throws an error when startDate is invalid", (assert) => {
    //         let t = new Task({ title: "title" });
    //         var stub = sinon.stub(regex, 'test').callsFake(function fn(){
    //           return false;
    //         });
    //         assert.throws(()=>{
    //           t.startDate = "22-12*2022";
    //         }, INVALID_DATE_FORMAT);
    //         sinon.restore();
    //     });
      
    //     test("with valid startDate, startDate should be saved properly", (assert) => {
    //         let t = new Task({ title: "title" });
    //         var stub = sinon.stub(regex, 'test').callsFake(function fn(){
    //             return true;
    //         });
    //         sinon.stub(Task.prototype, "startDate").get(function setterFn() {
    //             return new Date("2022-12-20");
    //         });
    
    //         t.startDate = "2022-12-20";
    //         assert.deepEqual(t.startDate, new Date("2022-12-20"));
    //         sinon.restore();
    //     });
    // });

    // QUnit.module('set dueDate', () => {
    //     test("throws an error when dueDate is invalid", (assert)=> {
    //         let t = new Task({ title: "title" });
    //         var stub = sinon.stub(regex, 'test').callsFake(function fn(){
    //           return false;
    //         });
    //         assert.throws(()=>{
    //           t.endDate = "22-12*2022";
    //         }, INVALID_DATE_FORMAT);
    //         sinon.restore();
    //     });
      
    //     test("with valid dueDate, dueDate should be saved properly", (assert) => {
    //         let t = new Task({ title: "title" });
    //         var stub = sinon.stub(regex, 'test').callsFake(function fn(){
    //           return true;
    //         });
    //         sinon.stub(Project.prototype, "dueDate").get(function setterFn() {
    //           return new Date("2022-12-20");
    //         });
      
    //         t.dueDate = "2022-12-20"
    //         assert.deepEqual(p.dueDate, new Date("2022-12-20"));
    //         sinon.restore();
    //     });
    // });
})
