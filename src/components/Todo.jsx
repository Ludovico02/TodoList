import { useEffect, useRef, useState } from "react";
import Form from "./Form";
import TaskList from "./TaskList";

export default function Todo() {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = localStorage.getItem("tasks");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    
    const [currentList, setCurrentList] = useState("all");
    const [lists, setLists] = useState(() => {
        try {
            const saved = localStorage.getItem("lists");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });

    const [showAddList, setShowAddList] = useState(false);
    const [addList, setAddList] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(lists));
    }, [lists]);

    const addNewList = (e) => {
        e.preventDefault();
        if(!addList.trim()) {
            setShowAddList(false);
            return;
        } 
        setLists([...lists, addList]);
        setAddList("");
        setShowAddList(false);
        setCurrentList(addList);
    }

    const addTask = (title) => {
        const newTask = {
            id: Date.now(),
            name: title,
            description: "",
            completed: false,
            list: currentList
        }
        setTasks([...tasks, newTask]);
    }

    const deleteAll = () => {
        localStorage.removeItem("tasks");
        localStorage.removeItem("lists");
        setTasks([]);
        setLists([]);
        setCurrentList("all");
    }

    const deleteCurrentList = () => {
        if(currentList === "all") return;
        setCurrentList("all");
        setTasks(tasks.filter(task => task.list !== currentList));
        setLists(lists.filter(list => list !== currentList));
    }

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    }

    const checkTask = (id) => {
        setTasks(tasks.map((task) => (
            id === task.id ? {...task, completed: !task.completed} : task
        )))
    }

    const updateDescription = (id, updatedDescription) => {
        if(!updatedDescription.trim()) return;
        setTasks(tasks.map((task) => (
            id === task.id ? {...task, description: updatedDescription} : task
        )))
    }

    const moveUpAndDown = (id, direction) => {
        const updatedTasks = [...tasks];
        const taskIndex = updatedTasks.findIndex(task => task.id === id);

        // I'll handle this here just for now
        if(taskIndex === 0 && direction === "up") return;
        if(taskIndex === tasks.length -  1 && direction === "down") return;

        if(direction === "up") {
            [updatedTasks[taskIndex - 1], updatedTasks[taskIndex]] = [updatedTasks[taskIndex], updatedTasks[taskIndex - 1]];
        } else {
            [updatedTasks[taskIndex], updatedTasks[taskIndex + 1]] = [updatedTasks[taskIndex + 1], updatedTasks[taskIndex]];
        }

        setTasks(updatedTasks);
    }

    const visibleTasks = currentList === "all" ? tasks : tasks.filter(task => task.list === currentList);

    return (
        <div className="todo">
            <h1>My Todo List</h1>
            <Form onAddTask={addTask} />
            <button className="add-list-btn" onClick={() => setShowAddList(true)}>+ Add List</button>
            {showAddList && 
                <form onSubmit={addNewList}>
                    <input 
                        type="text"
                        value={addList}
                        onChange={(e) => setAddList(e.target.value)}
                        placeholder="Add a new tasks list..."
                    />
                    <button type="submit">Save</button>
                </form>
            }
            <select name="select-list" id="select-list" value={currentList} onChange={(e) => setCurrentList(e.target.value)}>
                <option value="all">Show All</option>
                {lists.map((list, index) => (
                    <option key={index} value={list}>{list}</option>
                ))}
            </select>
            <button className="remove-list-btn" onClick={() => deleteCurrentList()} disabled={currentList === "all"}>Remove List</button>
            <TaskList 
                tasks={visibleTasks}
                onDeleteTask={deleteTask}
                onCheckTask={checkTask}
                onUpdateDescription={updateDescription}
                handleMoveUpAndDown={moveUpAndDown}
            />
            <button className="reset-btn" onClick={() => deleteAll()}>Reset</button>
        </div>
    )
}