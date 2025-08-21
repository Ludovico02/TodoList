import Task from "./Task";

export default function TaskList({ tasks, onDeleteTask, onCheckTask, onUpdateDescription, handleMoveUpAndDown }) {  
    return (
        <div className="task-list">
            {tasks.length === 0 && <p>No Tasks Here 👀​</p>}
            {tasks.map((task, index) => (
                <Task
                    key={task.id}
                    task={task}
                    onDeleteTask={onDeleteTask}
                    onCheckTask={onCheckTask}
                    onUpdateDescription={onUpdateDescription}
                    handleMoveUpAndDown={handleMoveUpAndDown}
                    isFirst={index === 0}
                    isLast={index === tasks.length - 1}
                />
            ))}
        </div>
    )
}