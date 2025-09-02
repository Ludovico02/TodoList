import WeeklyHabit from "./WeeklyHabits"
import DailyHabit from "./DailyHabit"
import MonthlyHabit from "./MonthlyHabit"
import { useEffect, useState } from "react"
import Form from "./Form"

export default function HabitTracker() {
    // const [habits, setHabits] = useState([
    //     {id: 1, name: "Drink 1L of Water", type: "Weekly", completed: Array(7).fill(false), times: 7},
    //     {id: 2, name: "Workout", type: "Weekly", completed: Array(7).fill(false), times: 3},
    //     {id: 3, name: "Stretching", type: "Daily", completed: 0, times: 3},
    //     {id: 4, name: "Clean my room", type: "Monthly", completed: 0, times: 5}
    // ])

    const [habits, setHabits] = useState(() => {
        try {
            const saved = localStorage.getItem("habits");
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    })

    const [habitType, setHabitType] = useState("Weekly");
    
    useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
    }, [habits])

    const addNewHabit = (title) => {
        if(habits.includes(title)) return;

        const newHabit = {
            id: `${Date.now()}-${habitType}`,
            name: title,
            type: habitType,
            completed: habitType === "Weekly" ? Array(7).fill(false) : 0,
        }

        setHabits([...habits, newHabit]);
    }

    const onDeleteHabit = (id) => {
        setHabits(habits.filter(habit => habit.id !== id));
    }

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
            <Form 
                taskType={habitType} 
                onSelect={setHabitType} 
                onAddHabit={addNewHabit}
            />
            {habits.map((habit, index) => (
                habit.type === "Weekly" ? 
                    <WeeklyHabit 
                        key={index} 
                        habit={habit} 
                        onToggleDay={toggleWeeklyDay}
                        onDelete={onDeleteHabit}
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