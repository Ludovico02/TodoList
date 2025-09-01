export default function WeeklyHabit({ habit, onToggleDay }) {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
        <fieldset>
            <legend>{habit.name}</legend>
            {weekDays.map((day, index) => (
                <div key={index}>
                    <input 
                        type="checkbox" 
                        name={day} 
                        value={`${habit.name}-${day}`} 
                        id={`${habit.name}-${day}`}
                        checked={habit.completed[index]}
                        onChange={() => onToggleDay(habit.id, index)}
                    />
                    <label htmlFor={`${habit.name}-${day}`}>{day.slice(0, 3)}</label>
                </div>
            ))}
        </fieldset>
    )
}