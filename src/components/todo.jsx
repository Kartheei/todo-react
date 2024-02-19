import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Container, Box, Checkbox } from '@mui/material';
import '../assets/css/style.css';
import Header from './header';
import Footer from './footer';
import { addTask, toggleTask, deleteTask } from '../redux/slices/todoslice';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = () => {

    const dispatch = useDispatch()
    const taskList = useSelector((state) => state.tasks.taskList)
    console.log("state task", taskList)
    const initialFormData = {
        taskname: '',
        taskdescription: '',
        color: '#fcadad',
        completed: false,
    };

    // const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const emptyFields = Object.keys(formData).filter(key => formData[key] === '');

        if (emptyFields.length > 0) {
            const errorObj = {};
            emptyFields.forEach(field => {
                errorObj[field] = 'This field is required';
            });
            console.log({ formData });
            setErrors(errorObj);
        } else {
            dispatch(addTask({ ...formData }));
            setFormData(initialFormData);
            setErrors({});
        }
        console.log(formData);
        // setTasks(prevTasks => [...prevTasks, { ...formData, completed: false }]);
    };

    const handleCheckboxChange = (taskId) => () => {
        dispatch(toggleTask(taskId));
    };
    const handleDeleteTask = (taskId) => () => {
        dispatch(deleteTask(taskId));
    };
    return (
        <div>
            <Header />
            <Container className='todoForm' component="main" maxWidth="xs" sx={{ mt: 4, mb: 4 }}>
                <Typography className="titleLabel" variant="h5" >
                    Enter Task
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth id="taskname"
                        label="Task Name" name="taskname"
                        autoFocus value={formData.taskname} onChange={handleChange}
                    />
                    <div className="errorText">{errors.taskname && <span>{errors.taskname}</span>}</div>

                    <TextField multiline rows={4} margin="normal" required fullWidth id="taskdescription"
                        label="Task Description" name="taskdescription"
                        value={formData.taskdescription} onChange={handleChange}
                    />
                    <div className="errorText">{errors.taskdescription && <span>{errors.taskdescription}</span>}</div>

                    <TextField label="Priority color" type="color" id="color" name="color"
                        value={formData.color} onChange={handleChange} fullWidth />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Add Task</Button>
                </Box>
            </Container>
            <Container component="main" maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
                <Box className='todoForm'>
                    <Typography variant="h6">Number of Tasks in list {taskList.length}</Typography>
                    {taskList.map((task, index) => (
                        <Box key={task.id}>
                            <div className='tasklist' style={{ background: task.color }}>
                                <div className={`taskitem ${task.completed ? 'completed' : ''}`}>
                                    <Checkbox
                                        checked={task.completed}
                                        onChange={handleCheckboxChange(task.id)}
                                        inputProps={{ 'aria-label': `Complete Task ${index + 1}` }}
                                    />
                                    <IconButton onClick={handleDeleteTask(task.id)} color="inherit" aria-label="delete task">
                                        <DeleteIcon />
                                    </IconButton>
                                    <Typography variant="body1"><strong>Task Name:</strong> {task.taskname}</Typography>
                                    <Typography variant="body2"><strong>Description:</strong> {task.taskdescription}</Typography>

                                </div>
                            </div>
                        </Box>
                    ))}
                </Box>
            </Container>
            <Footer />
        </div>
    );
};

export default Todo;