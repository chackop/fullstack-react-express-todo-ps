// import { addNewTask, updateTask } from './communicate-db'
import { addNewTask, updateTask } from "./server";

(async function() {
  await addNewTask({ name: "My Task", isComplete: true, id: "TEST-12" });
  console.info("Added task");
  await updateTask({
    name: "My Task (UPDATED)",
    id: "TEST-12",
    isComplete: false
  });
  console.info("Task updated");
})();
