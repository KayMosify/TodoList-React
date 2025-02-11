import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import './TodoApp.css';
import Check from '../assets/icon-check.svg'
import Rainbow  from '../assets/icon-moon.svg';
import Cross from '../assets/icon-cross.svg'

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="app-container">
      <div className="todo-container">
        <div className="header-container">
          <h1 className="app-title">TODO</h1>
          <img 
            src={Rainbow} 
            alt="TODO" 
            className="title-image"
          />
        </div>
       
        
        <form onSubmit={addTodo} className="todo-form">
          <div className="input-container">
           <span className='checkbox-custom2'> <img src={Check} alt="Checkbox" ></img></span>
            <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Create a new todo..."
            className="todo-input"
          />
          </div>
          
        </form>

        <div className="todo-list-container">
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <li key={todo.id} className="todo-item">
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className="checkbox-custom">
                    <img src={Check} alt="checkmark" />
                  </span>
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                </label>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-button"
                >
                  <img src={Cross} alt="" />
                </button>
              </li>
            ))}
          </ul>

          <div className="todo-footer">
            <span className="items-left">
              {todos.filter(t => !t.completed).length} items left
            </span>
            <div className="filter-buttons">
              {['all', 'active', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`filter-button ${filter === filterType ? 'active' : ''}`}
                >
                  {filterType}
                </button>
              ))}
            </div>
            <button
              onClick={() => setTodos(todos.filter(t => !t.completed))}
              className="clear-completed"
            >
              Clear Completed
            </button>
          </div> 
        </div>
        <div className="todo-footer-2">
            <div className="filter-buttons-2">
              {['all', 'active', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`filter-button ${filter === filterType ? 'active' : ''}`}
                >
                  {filterType}
                </button>
              ))}
            </div>
          </div>
           <div className='bottom-text'><p>Drag and drop to reorder list</p></div>
      </div>
     
    </div>
  );
};

export default TodoApp;