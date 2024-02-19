import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Todo from './components/todo';
function App() {
  return (
      <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/todo"  element={<Todo />} />
      </Routes>
  );
}

export default App;
