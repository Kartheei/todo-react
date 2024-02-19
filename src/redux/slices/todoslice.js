import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    taskList: [],
}
const todoslice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const id = Math.random() * 100
            let task = { ...action.payload, id }
            state.taskList.push(task);
        },
        deleteTask: (state, action) => {
            state.taskList = state.taskList.filter(task => task.id !== action.payload);
        },
        toggleTask: (state, action) => {
            const task = state.taskList.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        }
    }
})
export const { addTask, deleteTask, toggleTask } = todoslice.actions

export default todoslice.reducer