export default function ListSelector({ lists, currentList, onSelect, onDeleteCurrentList }) {
    return (
        <div className="list-selector">
            <select 
                name="select-list" 
                id="select-list"
                value={currentList}
                onChange={(e) => onSelect(e.target.value)}
            >
                <option value="all">Show All</option>
                {lists.map((list, index) => (
                    <option key={index} value={list}>{list}</option>
                ))}
            </select>
            <button 
                className="remove-list-btn" 
                onClick={() => onDeleteCurrentList()} 
                disabled={currentList === "all"}
            >
                Remove List
            </button>
        </div>
    )
}