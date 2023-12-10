const {test} = QUnit;

QUnit.module("Task", () => {
    QUnit.module('constructor', () => {
        test("throws an error when parameters are not specified", assert =>{
            assert.throws(() => {
                new Task();
            }, new Error("parameters are required"));
        });

        test("verify if id is automatically generated", assert =>{
            let task = new Task({title: "dfn"});
            assert.ok(task.id, "id is generated");
        });

        // title attribute
        test("throws an error when title attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf"});
            }, new Error("title attribute should be provided"));
        })

        test("throws an error when title attribute is not string", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", title: 12});
            }, new Error("title attribute should be string"));
        })

        test("throws an error when description attribute is provided but not string", assert=>{
            assert.throws(()=>{
                new Task({title: "My task title", description: 2});
            }, new Error("Task description should be string"));
        });

        test("throws an error when status attribute is provided but not string", assert=>{
            assert.throws(()=>{
                new Task({title: "My task title", description: "Task description", status: 2});
            }, new Error("Task status should be string"));
        })

        // priority attribute
        test("update priority to 'normal' by default when it is not specified", assert => {
            const task = new Task({
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
            });
            assert.equal(task.priority, DEFAULT_TASK_PRIORITY, "priority should be 'normal' by default");
        });

        test("throws an error when priority is provided but not valid", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", title: "My task title", description: "My task description",  status: "to do", priority: "djd"});
            }, new Error("priority should be high, normal or low"));
        });
        
        
        // startDate attribute
        test("throws an error when startDate is provided but not in valid format", assert => {
            const props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-13-30"
            };

            assert.throws(()=>{
                new Task(props);
            }, new Error("startDate should be in valid format"));
        });

        test("throws an error when startDate is provided but has passed", assert => {
            const props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2013-02-31"
            };
                
            assert.throws(()=>{
                new Task(props);
            }, new Error("This startDate has passed"));
        })

        test("update startDate to now date when it is not specified", assert =>{
            const props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high"
            };
            var task = new Task(props);
            assert.deepEqual(task.startDate, initializeHourMinSec(new Date()), "initialize startDate");
        }); 

        test("throws an error when dueDate is provided in invalid format", assert => {
            const props = {
                id: "etytdtgytf",
                title: "My task title",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-32"
            };

            assert.throws(()=>{
                new Task(props);
            }, new Error("dueDate should be in valid format"));
        });

        test("throws an error when dueDate is provided but is before startDate", assert => {
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

        QUnit.module("ChildDependsOn", () => {
            test("throws an exception when dependanceType isn't 'Child'", (assert) => {
                let task = new Task({title: "My task title"});
  
                assert.throws(() => {
                  new Task({title: "Task 1", dependences: {dependenceType: ""} });
                }, new Error("dependenceType should be 'child'"));
              });

            test("throws an exception when task attribute isn't a object of class Task", (assert) => {
              let task = new Task({title: "My task title"});

              assert.throws(() => {
                new Task({title: "Task 1", dependences: {dependenceType: "child"} });
              }, new Error("task for child dependence should be class of Task"));
            });

            test("throws an exception when params attribute is provided but not string", (assert) => {
                let task = new Task({title: "My task title"});
  
                assert.throws(() => {
                  new Task({title: "Task 1", dependences: {task: task, dependenceType: "child"} });
                }, new Error("params attribute for childDependance should be string"));
            });
        })
    })

    QUnit.module('get id', () => {
        var props = {
            title: "My task title",
            description: "Task description",
            status: "to do",
            priority: "high",
            startDate: "2023-12-30",
            dueDate: "2023-12-31"
        };

        test("get task id", assert=>{
            var task = new Task(props);
            assert.ok(task.id, "get task id");
        });
    })

    QUnit.module('get title', () => {
        test("get task title", assert=>{
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
            assert.equal(task.title, props.title, "get task title");
        });
    })

    QUnit.module('get description', () => {
        test("get task description", assert=>{
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
            assert.equal(task.description, props.description, "get task description");
        });
    })

    QUnit.module('get status', () => {
        test("get task status", assert=>{
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
            assert.equal(task.status, props.status, "get task status");
        });
    });

    QUnit.module('get priority', () => {
        test("get task priority", assert=>{
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
            assert.equal(task.priority, props.priority, "get task priority");
        });
    });

    // Tests related to setters

    QUnit.module('set title', () => {
        test("throws an exception when new title is not valid string", assert=>{
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
                task.title = 4;
            }, new Error("title attribute should be string"));
        });

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
        test("throws an exception when new description is not valid string", assert=>{
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
                task.description = 4;
            }, new Error("Task description should be string"));
        });

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

    QUnit.module('set status', () => {
        test("throws an exception when new status is not valid string", assert=>{
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
                task.status = 4;
            }, new Error("Task status should be string"));
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
            task.title = "task status";
            assert.equal(task.title, "task status", "set status");
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

        test("throws an error when new startDate has passed", assert => {
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
                task.startDate = "2023-11-20";
            }, new Error("This startDate has passed"));
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
    })


    QUnit.module('set dueDate', () => {
        test("throws an error when new dueDate is not in valid format", assert => {
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
                task.dueDate = "2023-12-32";
            }, new Error("dueDate should be in valid format"));
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
    })
})