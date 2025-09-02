import { useState } from "react";

export default function Form({ taskType, onSelect, onAddHabit }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        onAddHabit(title);
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new habit..."
            />
            <select 
                name="select-habit-type" id="select-habit-type"
                value={taskType}
                onChange={(e) => onSelect(e.target.value)}
            >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
            <button type="submit">Add</button>
        </form>
    )
}