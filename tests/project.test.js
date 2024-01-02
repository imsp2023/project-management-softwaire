// const { test } = QUnit;

QUnit.module("Task", () => {
    QUnit.module('addMember()', () => {
        test("throws an error when member is not instance of Member class", assert=>{
            let project = new Project();
            assert.throws(()=>{
                project.addMember("member");
            }, new Error("member should be instance of Member class"));
        });

        test("add new member to the list", assert=>{
            let member = new Member({
                id: "1",
                username: "membre1",
                role: "manager",
                email: "member@gmail.com",
            });

            var project = new Project();
            assert.deepEqual(project.addMember(member), [member], "add member");
        });

        test("throws an error when new mmeber already exists", assert=>{
            let member = new Member({
                id: "1",
                username: "membre1",
                role: "manager",
                email: "member@gmail.com",
            });
            var project = new Project();
            project.addMember(member);

            assert.throws(()=>{
                project.addMember(member);
            }, new Error("This member already exists"));
        });
        
    })

    QUnit.module('removeMemberById()', () => {
        test("throws an error when member with this id is not founded", assert=>{
            let member = new Member({
                id: "1",
                username: "membre1",
                role: "manager",
                email: "member@gmail.com",
            });
            var project = new Project();
            project.addMember(member);

            assert.throws(()=>{
                project.removeMemberById("nontrouve");
            }, new Error("member with this id is not founded"));
        });

        test("remove member when id is valid", assert=>{
            let member = new Member({
                id: "1",
                username: "membre1",
                role: "manager",
                email: "member@gmail.com",
            });
            var project = new Project();
            project.addMember(member);

            assert.deepEqual(project.removeMemberById(member.id), [], "remove task");
        });
    })

    QUnit.module('addTask()', () => {
        test("throws an error when task is not instance of Task class", assert=>{
            var project = new Project();

            assert.throws(()=>{
                project.addTask("ma tâche");
            }, new Error("project task should be instance of Task class"));
        });

        test("add new task to the project", assert=>{
            var task = new Task({
                id: "etytdtgytf",
                title: "My task title",
                startDate: "2023-12-30"
            });

            var project = new Project();
            assert.deepEqual(project.addTask(task), [task], "add task to project");
        });

        test("throws an error when new task already exists", assert=>{
            var task = new Task({
                id: "etytdtgytf",
                title: "My task title",
                startDate: "2023-12-30"
            });
            var project = new Project();
            project.addTask(task);

            assert.throws(()=>{
                project.addTask(task);
            }, new Error("This task already exists"));
        });
    });

    QUnit.module('removeTaskById()', () => {
        test("throws an error when task with this id is not founded", assert=>{
            var task = new Task({
                id: "etytdtgytf",
                title: "My task title",
                startDate: "2023-12-30"
            });

            var project = new Project();
            project.addTask(task);

            assert.throws(()=>{
                project.removeTaskById("nontrouve");
            }, new Error("task with this id is not founded"));
        });

        test("remove task when it's founded", assert=>{
            var task = new Task({
                id: "etytdtgytf",
                title: "My task title",
                startDate: "2023-12-30"
            });

            var project = new Project();
            project.addTask(task);
            assert.deepEqual(project.removeTaskById(task.id), [], "remove task");
        });
    })


    QUnit.module('validateTask()', () => {
    })

});