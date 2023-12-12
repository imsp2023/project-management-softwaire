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

        test("throws an error when dueDate is not valid", assert => {
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

        // when only we have child dependancie, then setParent must be called one time

    });

    QUnit.module('setParent', () => {
        test("throws an exception when parent task isn't a object of class Task", (assert) => {
            let task = new Task({title: "My task title"});
  
            assert.throws(() => {
              task.parent("Task");
            }, new Error("task for child dependence should be class of Task"));
       });

       test("throws an exception when parent task is current task", (assert) => {
            let task = new Task({title: "My task title"});

            assert.throws(() => {
                task.parent(task);
            }, new Error("this child shouldn't be parent of itself"));
       });
       
       test("throws an error startDate of parentDate is after child's startDate", (assert) => {
            let task = new Task({title: "My task title", startDate: "2023-11-15"});
            let parentTask = new Task({title: "I'm parent task", startDate: "2023-11-17"});

            assert.throws(() => {
                task.parent(parentTask);
            }, new Error("parent startDate should be before a child startDate"));
       });

       test("throws an error dueDate of parentDate is before child's dueDate", (assert) => {
            let task = new Task({title: "My task title", dueDate: "2024-11-17"});
            let parentTask = new Task({title: "I'm parent task", dueDate: "2024-11-15"});

            assert.throws(() => {
                task.parent(parentTask);
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

    QUnit.module('set status', () => {
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
            task.parent(parentTask);

            assert.throws(()=>{
                task.startDate = "2023-10-31";
            }, new Error("startDate should be before parent's startDate"));
        });
    });

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
            task.parent(parentTask);

            assert.throws(()=>{
                task.dueDate = "2024-11-18";
            }, new Error("dueDate should be before parent's dueDate"));
        });
    })
})