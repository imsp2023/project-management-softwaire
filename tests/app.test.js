
QUnit.module("addDependenceToTask", () => {
    test("throws an exception when no parameters is provided", (assert) => {
        let tk = new Task({ title: "bhebhgr" });
        assert.throws(() => {
            tk.dependsOn();
        }, new Error(MISSING_PARAMETERS));
    });

    test("with taskId parameter specified, getTask from register should be called once", (assert) => {
        let count = 0;
        sinon.stub(Register, "getTask").callsFake(function fn() {
            count = 1;
            return {
                id: '456',
                startDate: (function(){
                    return new Date("2020-11-1");
                })()
            };
        });
        let tk = new Task({ id: "14595", title: "dbhr" });

        tk.dependsOn("456");
        
        assert.equal(count, 1);
        sinon.restore();
    });

    test("throws an error when the task doesn't exist in register", (assert) => {
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return null;
        });
        let tk = new Task({ title: "bhebhgr" });

        assert.throws(() => {
        tk.dependsOn("1");
        }, new Error(INEXISTANT_TASK));
        sinon.restore();
    });

    test("with taskId specified, hasCyclicDependence should be called", (assert) => {
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: "111",
                startDate: (function(){
                    return new Date("2021-3-11");
                })()
            };
        });
        let count = 0;
        sinon.stub(Task.prototype, "hasCyclicDependence").callsFake(function fn() {
            count++;
        });
        let task = new Task({ id: "11", title: "dsbfh" });

        task.dependsOn('111');

        assert.equal(count, 1);
        sinon.restore();
    });

    test("with cyclic dependence, an exception should be thrown", (assert) => {
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: "11",
                startDate: (function(){
                    return new Date("2021-3-11");
                })()
            };
        });
        sinon.stub(Task.prototype, "hasCyclicDependence").callsFake(function fn() {
            return true;
        });
        let task = new Task({ id: "11", title: "dsbfh" });

        assert.throws(() => {
            task.dependsOn("11");
        }, new Error(CYCLIC_DEPENDENCE_NOT_ALLOWED));
        sinon.restore();
    });

    test("throws an exception when the dependence parameter is neither FF nor DD nor FD", (assert) => {
        let tk = new Task({id: '25493', title: "bhebhgr" });
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: '11',
                startDate: (function(){
                    return new Date(2020, 11, 1);
                })()
            };
        });
        assert.throws(() => {
            tk.dependsOn("11", "ls");
        }, new Error(INVALID_DEPENDENCE));
        sinon.restore();
    });
    
    test("set DD dependence by default when the dependence parameter isn't specified", (assert) => {
        let task = new Task({id: "1495", title: "bhebhgr", startDate: '1-11-2020' });
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: "12",
                startDate: (function(){
                    return new Date(2020, 2, 1);
                })()
            };
        });
        task.dependences = {};

        task.dependsOn("12");

        assert.equal(task.dependences['12'], 'DD');
        sinon.restore();
    });

    test("with invalid startDate when I apply DD dependency, startDate should be updated", (assert) => {
        let task = new Task({
            id:'1496',
            title: "bhebhgr1",
            startDate: '1-3-2019'
        });
        let date = new Date(2020, 11, 1);
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: "12",
                startDate: (function(){
                    return date;
                })()
            };
        });
        task.dependsOn("12");
        
        assert.true(task.startDate >= date);
        sinon.restore();
    });

    test("with valid startDate when I apply DD dependency, startDate should not be changed", (assert) => {
        let task = new Task({
            id:'1496',
            title: "bhebhgr1",
            startDate: '1-12-2020'
        });
        let date = new Date(2020, 11, 1);
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: "12",
                startDate: (function(){
                    return date;
                })()
            };
        });
        task.dependsOn("12");
        
        assert.true(task.startDate >= date);
        sinon.restore();
    });


    test("with invalid dueDate when I apply FF dependency, dueDate should be updated", (assert) => {
        let task = new Task({id:'1463', title: "bhebhgr1", dueDate: '25-1-2026' });
        let date = new Date(2026, 0, 30);
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: "5",
                dueDate: (function(){
                    return date;
                })()
            };
        });

        task.dependsOn("5", "FF");
        
        assert.true(task.dueDate >= date);
        sinon.restore();
    });

    test("with valid dueDate when I apply FF dependency, dueDate should be updated", (assert) => {
        let task = new Task({id:'1463', title: "bhebhgr1", dueDate: '1-2-2026' });
        let date = new Date(2026, 0, 30);
        sinon.stub(Register, "getTask").callsFake(function fn() {
            return {
                id: "5",
                dueDate: (function(){
                    return date;
                })()
            };
        });

        task.dependsOn("5", "FF");
        
        assert.true(task.dueDate >= date);
        sinon.restore();
    });

    test("with invalid startDate when I apply FD dependency, startDate should be updated", (assert) => {
      let task = new Task({
        title: "bhebhgr1",
        startDate: '25-1-2026',
      });
      let date = new Date(2026, 0, 30);
      sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
          id: "5",
          dueDate: (function(){
            return date;
          })()
        };
      });

      task.dependsOn("5", "FD");

      assert.true(task.startDate >= date);
      sinon.restore();
    });

    test("with valid startDate when I apply FD dependency, startDate should be updated", (assert) => {
        let task = new Task({
          title: "bhebhgr1",
          startDate: '30-1-2026',
        });
        let date = new Date(2026, 0, 30);
        sinon.stub(Register, "getTask").callsFake(function fn() {
          return {
            id: "5",
            dueDate: (function(){
              return date;
            })()
          };
        });

        task.dependsOn("5", "FD");

        assert.true(task.startDate >= date);
        sinon.restore();
      });
  
    test("only one type dependence is allowed between two tasks", (assert) => {
      let task = new Task({id: '14635', title: "bhebhgr", startDate: '3-2-2025'});
      let stub = sinon.stub(Register, "getTask").callsFake(function fn() {
        return {
            id: "14",
            startDate: (function(){
                return new Date(2025, 1, 3);
            })()
        };
      });
      task.dependences = {};

      task.dependsOn("14", "DD");
      task.dependsOn("14", "DD");

      assert.true(Object.keys(task.dependences).length == 1);
      stub.restore();
    });
});

QUnit.module('addParentToTask', () => {
    test("throws an exception when no parameter is specified", (assert) => {
        let task = new Task({title: "title"});

        assert.throws(() => {
          task.parent = undefined;
        }, new Error(MISSING_PARAMETERS));
   });


   test("with an unexisting task as parent, an exception should be thrown", assert=>{
        sinon.stub(Register, "getTask").callsFake(function fakeFn() {
            return null;
        });
        let task = new Task({title: "title", startDate: '22-10-2023'});

        assert.throws(()=>{
            task.parent = 'ygytgvyvgyt';
        }, INEXISTANT_TASK);
        sinon.restore();
   });

   test("with an existing task as parent and wrong child' startDate, startDate setter should be called", assert=>{
        let count = 0;    
        sinon.stub(Register, "getTask").callsFake(function fakeFn() {
            return {
                startDate: new Date(2023, 9, 20)
            };
        });
        sinon.stub(Task.prototype, "startDate").set(function fakeFn() {
           count++;
        });
        let task = new Task({title: "title"});
        task._startDate = new Date(2023, 8, 10);
        
        task.parent = 'ygytgvyvgyt';

        assert.equal(count, 1);
        sinon.restore();
   });

   test("with an existing task as parent and right child' startDate, startDate setter should not be called", assert=>{
        let count = 0;    
        sinon.stub(Register, "getTask").callsFake(function fakeFn() {
            return {
                startDate: new Date(2023, 9, 20)
            };
        });
        sinon.stub(Task.prototype, "startDate").set(function fakeFn() {
        count++;
        });
        let task = new Task({title: "title"});
        task._startDate = new Date(2023, 10, 10);
        
        task.parent = 'ygytgvyvgyt';

        assert.equal(count, 0);
        sinon.restore();
    });

    test("with an existing task as parent and wrong child' dueDate, dueDate setter should be called", assert=>{
        let count = 0;    
        sinon.stub(Register, "getTask").callsFake(function fakeFn() {
            return {
                startDate: new Date(2023, 9, 20),
                dueDate: new Date(2023, 11, 20)
            };
        });
        sinon.stub(Task.prototype, "dueDate").set(function fakeFn() {
           count++;
        });
        let task = new Task({title: "title"});
        task._startDate = new Date(2023, 10, 10);
        task._dueDate = new Date(2024, 10, 10);
        
        task.parent = 'ygytgvyvgyt';

        assert.equal(count, 1);
        sinon.restore();
   });

   test("with an existing task as parent and right child' dueDate, dueDate setter should not be called", assert=>{
        let count = 0;    
        sinon.stub(Register, "getTask").callsFake(function fakeFn() {
            return {
                startDate: new Date(2023, 9, 20),
                dueDate: new Date(2023, 11, 20)
            };
        });
        sinon.stub(Task.prototype, "dueDate").set(function fakeFn() {
        count++;
        });
        let task = new Task({title: "title"});
        task._startDate = new Date(2023, 10, 10);
        task._dueDate = new Date(2023, 10, 20);
        
        task.parent = 'ygytgvyvgyt';

        assert.equal(count, 0);
        sinon.restore();
    });
    // check that task.dueDate > parentTask.startDate and task.startDate < parentTask.dueDate
});