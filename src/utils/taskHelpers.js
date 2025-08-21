// Function to move tasks up or down by one position
export const moveTaskUpAndDown = (id, direction, tasks) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(task => task.id === id);

    // Double check
    if(taskIndex === 0 && direction === "up") return;
    if(taskIndex === tasks.length -  1 && direction === "down") return;

    if(direction === "up") {
        [updatedTasks[taskIndex - 1], updatedTasks[taskIndex]] = [updatedTasks[taskIndex], updatedTasks[taskIndex - 1]];
    } else {
        [updatedTasks[taskIndex], updatedTasks[taskIndex + 1]] = [updatedTasks[taskIndex + 1], updatedTasks[taskIndex]];
    }

    return updatedTasks;
}