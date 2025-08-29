export default function WeeklyHabit({ habit }) {
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
                    />
                    <label htmlFor={`${habit.name}-${day}`}>{day[0]}</label>
                </div>
            ))}
        </fieldset>
    )
}