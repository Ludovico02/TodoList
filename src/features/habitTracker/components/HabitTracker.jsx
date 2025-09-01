import WeeklyHabit from "./WeeklyHabits"
import DailyHabit from "./DailyHabit"
import MonthlyHabit from "./MonthlyHabit"
import { useEffect, useState } from "react"

export default function HabitTracker() {
    const [habits, setHabits] = useState([
        {id: 1, name: "Drink 1L of Water", type: "Weekly", completed: Array(7).fill(false), times: 7},
        {id: 2, name: "Workout", type: "Weekly", completed: Array(7).fill(false), times: 3},
        {id: 3, name: "Stretching", type: "Daily", completed: 0, times: 3},
        {id: 4, name: "Clean my room", type: "Monthly", completed: 0, times: 5}
    ])

    const toggleWeeklyDay = (id, day) => {
        setHabits(habits.map((habit) => (
            habit.id === id ? {
                ...habit,
                completed: habit.completed.map((val, i) => (i === day ? !val : val))
            } : habit
        )))
    }

    return (
        <div className="habit-tracker">
            {habits.map((habit, index) => (
                habit.type === "Weekly" ? 
                    <WeeklyHabit 
                        key={index} 
                        habit={habit} 
                        onToggleDay={toggleWeeklyDay} 
                    /> : habit.type === "Daily" ? 
                    <DailyHabit 
                        key={index} 
                    /> :
                    <MonthlyHabit 
                        key={index} 
                    />
            ))}
        </div>
    )
}