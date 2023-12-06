const {test} = QUnit;

QUnit.module("Task", () => {
    QUnit.module('constructor', () => {
        test("throws an error when parameters are not specified", assert =>{
            assert.throws(() => {
                new Task();
            }, new Error("parameters are required"));
        });

        // id attribute
        test("throws an error when id attribute is not provided", assert =>{
            assert.throws(() => {
                new Task({attribut: ""});
            }, new Error("id should be provided"));
        });

        test("throws an error when id attribute is not string", assert =>{
            assert.throws(() => {
                new Task({id: 12});
            }, new Error("id should be string"));
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

        // description attribute
        test("throws an error when description attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", title: "My task title"});
            }, new Error("description attribute should be provided"));
        })
        
        test("throws an error when description attribute is not string", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", title: "My task name", description: 2});
            }, new Error("Task description should be string"));
        })

        // status attribute
        test("throws an error when status attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", title: "My task title", description: "Task description"});
            }, new Error("status attribute should be provided"));
        })
        
        test("throws an error when status attribute is not string", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", title: "My task name", description: "Task description", status: 2});
            }, new Error("Task status should be string"));
        })

        // priority attribute
        test("update priority to 'normal' by default when it is not specified", assert => {
            const task = new Task({
                id: "etytdtgytf",
                title: "My task name",
                description: "Task description",
                status: "to do",
            });
            assert.equal(task.priority, "normal", "priority should be 'normal' by default");
        });

        test("throws an error when priority is provided but not valid", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", title: "My task title", description: "My task description",  status: "to do", priority: "djd"});
            }, new Error("priority should be high, normal or low"));
        });
        

        // startDate attribute
        test("throws an error when startDate is not in valid format", assert => {
            const props = {
                id: "etytdtgytf",
                title: "My task name",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-13-30"
            };

            assert.throws(()=>{
                new Task(props);
            }, new Error("startDate should be in valid format"));
        });

        test("throws an error when startDate has passed", assert => {
            const props = {
                id: "etytdtgytf",
                title: "My task name",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2013-02-31"
            };
                
            assert.throws(()=>{
                new Task(props);
            }, new Error("This startDate has passed"));
        })

        test("verify setting of startDate when it is valid", assert =>{
            const props = {
                id: "etytdtgytf",
                title: "My task name",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30"
            };

            var task = new Task(props)
            
            assert.deepEqual(task.startDate, initializeHourMinSec(new Date(props.startDate)), "initialize startDate");
        });


        test("update startDate to now date when it is not specified", assert =>{
            const props = {
                id: "etytdtgytf",
                title: "My task name",
                description: "Task description",
                status: "to do",
                priority: "high"
            };
            var task = new Task(props);
            assert.deepEqual(task.startDate, initializeHourMinSec(new Date()), "initialize startDate");
        });


        // dueDate attribute
        // test("throws an error when dueDate attribute is not provided", assert=>{
        //     const props = {
        //         id: "etytdtgytf",
        //         title: "My task name",
        //         description: "Task description",
        //         status: "to do",
        //         priority: "high",
        //         startDate: "2023-12-30"
        //     };

        //     assert.throws(()=>{
        //         new Task(props);
        //     }, new Error("dueDate attribute should be provided"));
        // });

        test("throws an error when dueDate is not in valid format", assert => {
            const props = {
                id: "etytdtgytf",
                title: "My task name",
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
                title: "My task name",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-28"
            };
                
            assert.throws(()=>{
                new Task(props);
            }, new Error("This dueDate should be after startDate"));
        })

        test("verify setting of dueDate when it is valid", assert =>{
            const props = {
                id: "etytdtgytf",
                title: "My task name",
                description: "Task description",
                status: "to do",
                priority: "high",
                startDate: "2023-12-30",
                dueDate: "2023-12-31"
            };
            var task = new Task(props);
            assert.deepEqual(task.dueDate, initializeHourMinSec(new Date(props.dueDate)), "initialize dueDate");
        });
    })}
)