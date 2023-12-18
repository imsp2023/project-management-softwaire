let Register = {
  store: {},
  addTask: (taskId, task, projectId) => {},
  getTask: (taskId) => {
    return {};
  },
  isMemberExist: (username) => {},

  isTaskExist: (taskId) => {},
};

// module.exports = { Register };

// addTask(id, task) {
//   if (id == undefined) throw new Error("parameter id is required");
//   if (typeof id != "string" || id == "")
//     throw new Error("parameter id should be a non-empty string");
//   if (task == undefined) throw new Error("parameter task is required");
//   if (!(task instanceof Task))
//     throw new Error("parameter task should be a instance of task");
//   this.#store[id] = task;
// }

// getStore() {
//   return this.#store;
// }
