export default function MonthlyHabit({ habit, onDelete, onIncrease, onDecrease }) {
    return (
        <div className="monthly-habit">
            <h2>{habit.name}</h2>
            <button onClick={() => onDelete(habit.id)}>Delete</button>
            <button onClick={() => onDecrease(habit.id)}>-</button>
            <span>{habit.completed}</span>
            <button onClick={() => onIncrease(habit.id)}>+</button>
        </div>
    )
}