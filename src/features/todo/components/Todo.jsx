import { useEffect, useState } from "react";
import Form from "./Form";
import TaskList from "./TaskList";
import AddListForm from "./AddListForm";
import ListSelector from "./ListSelector";
import { moveTaskUpAndDown } from "../taskHelpers";

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

    const [showAddListForm, setShowAddListForm] = useState(false);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(lists));
    }, [lists]);

    const addNewList = (name) => {
        if(lists.includes(name)) return;
        setLists([...lists, name]);
        setCurrentList(name);
        setShowAddListForm(false);
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
        setTasks((prevTask) => moveTaskUpAndDown(id, direction, prevTask));
    }

    const visibleTasks = currentList === "all" ? tasks : tasks.filter(task => task.list === currentList);

    return (
        <div className="todo">
            <h1>My Todo List</h1>
            <Form onAddTask={addTask} />
            <button className="add-list-btn" onClick={() => setShowAddListForm(true)}>+ Add List</button>
            {showAddListForm && 
                <AddListForm 
                    onAddList={addNewList}
                    onCloseInput={() => setShowAddListForm(false)}
                />
            }
            <ListSelector 
                lists={lists}
                currentList={currentList}
                onSelect={setCurrentList}
                onDeleteCurrentList={deleteCurrentList}
            />
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