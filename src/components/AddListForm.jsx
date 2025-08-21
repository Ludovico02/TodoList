import { useState } from "react"

export default function AddListForm({ onAddList, onCloseInput }) {
    const [listName, setListName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!listName.trim()) {
            onCloseInput();
            return;
        }
        onAddList(listName.trim());
        setListName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Add a new tasks list..."
                autoFocus
            />
            <button type="submit">Save</button>
        </form>
    )
}