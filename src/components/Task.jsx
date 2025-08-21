import { useState } from "react";
import "../css/Task.css"

export function Task({ task, onUpdateDescription, onCheckTask, handleMoveUpAndDown, onDeleteTask, isFirst, isLast }) {
    const [isOpen, setIsOpen] = useState(false);
    const [descriptionDraft, setDescriptionDraft] = useState(task.description);

    const handleToggleDescription = () => {
        setDescriptionDraft(task.description);
        setIsOpen(!isOpen);
    }

    const handleDescriptionSave = () =>{
        onUpdateDescription(task.id, descriptionDraft);
        setIsOpen(false);
    }

    return (
        <div className="task">
            <button onClick={() => handleToggleDescription()} className="show-description-btn">
                {isOpen ? "^" : "⌄"}
            </button>
            <h2 className={`task ${task.completed ? "completed" : ""}`}>
                {task.name}
            </h2> 
            <button onClick={() => onCheckTask(task.id)} className="check-task-btn">
                <img src="src\images\reshot-icon-check-X2DS7CAZTE-8de3c.svg" alt="Check" />
            </button>
            <button onClick={() => handleMoveUpAndDown(task.id, "up")} className="move-up-btn" disabled={isFirst}>
                <img src="src\images\reshot-icon-arrow-up-ZGEKU95YAJ.svg" alt="Arrow Up" />
            </button>
            <button onClick={() => handleMoveUpAndDown(task.id, "down")} className="move-down-btn" disabled={isLast}>
                <img src="src\images\reshot-icon-arrow-up-ZGEKU95YAJ.svg" alt="Arrow Down" />
            </button>
            <button onClick={() => onDeleteTask(task.id)} className="delete-task-btn">
                <img src="src\images\reshot-icon-trash-can-4STZDYFJLV.svg" alt="Trashcan Icon" />
            </button>

            {isOpen && 
                <div className="task-description-area">
                    <textarea 
                        name="task-description" 
                        id="task-description"
                        value={descriptionDraft}
                        onChange={(e) => setDescriptionDraft(e.target.value)}
                        placeholder="Add a description here..."
                    />
                    <button 
                        className="save-description-btn"
                        onClick={() => handleDescriptionSave()}
                    >
                        Save
                    </button>
                </div>
            }
        </div>
    )
}

export default Task;