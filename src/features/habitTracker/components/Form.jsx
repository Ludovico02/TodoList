export default function Form({ taskType, onSelect }) {
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