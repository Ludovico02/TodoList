import { useState } from "react";

export default function Form({ onAddTask }) {
    const [title, setTitle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        onAddTask(title);
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new Task..."
            />
            <button type="submit">Add</button>
        </form>
    )
}