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

        test("verify if id is automatically generated", assert =>{
            let task = new Task({title: "dfn"});
            assert.ok(task.id, "id is generated");
        });

        test("throws an error when title attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf"});
            }, new Error("title attribute should be provided"));
        });

        test("update priority to 'normal' by default when it is not specified", assert => {
            const task = new Task({
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
            });
            assert.equal(task.priority, DEFAULT_TASK_PRIORITY, "priority should be 'normal' by default");
        });

        // test("throws an error when priority is provided but not valid", assert=>{
        //     assert.throws(()=>{
        //         new Task({id: "etytdtgytf", title: "My task title", description: "My task description",  status: "to do", priority: "djd"});
        //     }, new Error("priority should be high, normal or low"));
        // });

        test("with dueDate attribute specified, endDate setter should be called", assert =>{
            let count = 0;
            sinon.stub(Task.prototype, "dueDate").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title', dueDate: '22-10-2023'});

            assert.equal(count, 1);
            sinon.restore();
        });

        test("with parentId attribute specified, parentId setter should be called", assert =>{
            let count = 0;
            sinon.stub(Task.prototype, "parent").set(function setterFn() {
              count = 1;
            });

            var t = new Task({title: 'title', parentId: '125'});

            assert.equal(count, 1);
            sinon.restore();
        });

        // test fails with null, "", undefined as dependences value
        test("throws an exception when dependencies attribute is not an array", assert=>{
            assert.throws(()=>{
                new Task(props);
            }, new Error("startDate should be in valid format"));
        });

        test("with dependencies attribute specified, dependsOn should be called", assert=>{
            let count = 0;
            sinon.stub(Task.prototype, "dependsOn").callsFake(function fakeFn() {
              count++;
            });      

            let props = {
                title: 'title', 
                dependences: [
                    {id: 'dedede', type: 'DD'}, 
                    {id: 'dedede', type: 'DD'}, 
                    {id: 'dedede', type: 'DD'}
                ]
            };
            let t = new Task(props);

            assert.throws(()=>{
                new Task(props);
            }, new Error("dueDate should be in valid format"));
        });

        test("throws an error when dueDate is before startDate", assert => {
            const props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-28"
            };
                
            assert.throws(()=>{
                new Task(props);
            }, new Error("This dueDate should be after startDate"));
        });

        // Dependencies
        test("when we have child dependencie, then setParent must be called one time", assert => {
            var spy = sinon.spy(Task.prototype, 'setParent');
            let parentTask = new Task({title: "I'm parent task", startDate: "2023-11-17"});
            var task = new Task({ title: "My task title", parent: parentTask});

            assert.ok(spy.calledOnce, "setParent is called one time");
            spy.restore();
        });

        // test("with description attribute specified, description setter should be called", assert => {
        //     let count = 0;
        //     sinon.stub(Task.prototype, "description").set(function setterFn() {
        //       count = 1;
        //     });

        //     var t = new Task({title: 'title'});
        //     assert.equal(count, 1);
        //     sinon.restore();
        // });
    });

    QUnit.module('setParent', () => {
        test("throws an exception when parent task isn't a object of class Task", (assert) => {
            let task = new Task({title: "My task title"});
  
            assert.throws(() => {
              task.setParent("Task");
            }, new Error("task for child dependence should be class of Task"));
       });

       test("throws an exception when parent task is current task", (assert) => {
            let task = new Task({title: "My task title"});

            assert.throws(() => {
                task.setParent(task);
            }, new Error("this child shouldn't be parent of itself"));
       });
       
       test("throws an error startDate of parentDate is after child's startDate", (assert) => {
            let task = new Task({title: "My task title", startDate: "2023-11-15"});
            let parentTask = new Task({title: "I'm parent task", startDate: "2023-11-17"});

            assert.throws(() => {
                task.setParent(parentTask);
            }, new Error("parent startDate should be before a child startDate"));
       });

       test("throws an error dueDate of parentDate is before child's dueDate", (assert) => {
            let task = new Task({title: "My task title", dueDate: "2024-11-17"});
            let parentTask = new Task({title: "I'm parent task", dueDate: "2024-11-15"});

            assert.throws(() => {
                task.setParent(parentTask);
            }, new Error("parent dueDate should be after a child dueDate"));
       });
    })


    QUnit.module('set title', () => {
        test("set title", assert=>{
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };

            var task = new Task(props);
            task.title = "task title";
            assert.equal(task.title, "task title", "set title");
        });
    })

    QUnit.module('set description', () => {
        test("set description", assert=>{
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };

            var task = new Task(props);
            task.description = "task description";
            assert.equal(task.description, "task description", "set description");
        });
    })

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
    })

    QUnit.module('set priority', () => {
        test("throws an exception when new priority is not string", assert=>{
            var props = {
                 id: "etytdtgytf",
                 title: "My task title",
                 description: "Task description",
                 status: "to do",
                 priority: "high",
                 startDate: "2023-12-30",
                 dueDate: "2023-12-31"
             };
 
             task = new Task(props);
             assert.throws(()=>{
                 task.priority = 4;
             }, new Error("Task priority should be string"));
         });

         test("throws an error when new priority is provided but not valid", assert=>{
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };

            var task = new Task(props);
            assert.throws(()=>{
                task.priority = "priority";
            }, new Error("priority should be high, normal or low"));
        });

        test("set status", assert=>{
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };

            var task = new Task(props);

            task.priority = "low";
    
            assert.equal(task.priority, "low", "set priority");
        });
    })

    QUnit.module('set startDate', () => {
        test("throws an error when new startDate is not in valid format", assert => {
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };
            var task = new Task(props);

            assert.throws(()=>{
                task.startDate = "2023-12-32";
            }, new Error("startDate should be in valid format"));
        });
    
        test("set startDate", assert=>{
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };
        
            var task = new Task(props);
            task.startDate = "2023-12-29";
    
            assert.deepEqual(task.startDate, initializeHourMinSec(new Date("2023-12-29")), "set startDate");
        });

        test("throws an error when this task have parent dependance and his startDate is before parent's startDate", assert => {
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                dueDate: "2024-02-07"
            };
            var task = new Task(props);
            var parentTask = new Task({title: "I'm parent task", startDate: "2023-11-17"});
            task.setParent(parentTask);

            assert.throws(()=>{
                task.startDate = "2023-10-31";
            }, new Error("startDate should be before parent's startDate"));
        });
    });

    QUnit.module("dependsOn", () => {
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

        test("throws an error when new dueDate is before startDate", assert => {
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };
        
            var task = new Task(props);
            assert.throws(() => {
                task.dueDate = "2023-12-29";
            }, new Error("This dueDate should be after startDate"));
        });
    
        test("set dueDate", assert=>{
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };
        
            var task = new Task(props);
            task.dueDate = "2024-01-01";
    
            assert.deepEqual(task.dueDate, initializeHourMinSec(new Date("2024-01-01")), "set dueDate");
        });

        
        test("throws an error when this task have parent dependance and his dueDate is after parent's startDate", assert => {
            var props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high"
            };
            var task = new Task(props);
            var parentTask = new Task({title: "I'm parent task", dueDate: "2024-11-17"});
            task.setParent(parentTask);

            assert.throws(()=>{
                task.dueDate = "2024-11-18";
            }, new Error("dueDate should be before parent's dueDate"));
        });
    })
})