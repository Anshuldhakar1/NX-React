// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { useState, useEffect, useRef } from 'react';

export interface Todo {
  value: string;
  done: boolean;
}

export function App() {

  const [inp, setInp] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => { 
    const storaegeData = localStorage.getItem('todos');
    if (storaegeData) {
      setTodos( () => JSON.parse(storaegeData));
    }
  },[])

  useEffect(() => { 
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
      setInp(event.target.value);
  }
  
  function handleAddTodo() {
    if(!inp) return;           
    setTodos(
      (prev: Todo[]) => [...prev, { value: inp, done: false }]
    );
    setInp(() => '');
    if(inpRef.current) {
      inpRef.current.value = '';
      inpRef.current.focus();
    }
  }

  function handleTodoClick(todoToToggle: Todo) { 
    setTodos(
      (prev: Todo[]) => prev.map((todo) => {
        if(todo.value === todoToToggle.value) {
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  }

  const outerWrapper = styles['outer-wrapper'];

  return (
    <div className={outerWrapper}>
      <div className={styles['app-wrapper']}>
        <h1>Todo List</h1>
        <hr />
        <div className={styles['input-wrapper']}>
          <input ref={inpRef} type="text" onChange={handleInputChange} placeholder="New task name" />
          <button type='submit' onClick={() => { handleAddTodo() } }>Add Task</button>
        </div>
        <div className="todo-wrapper">
          {todos.length === 0 ? 
            <h2 className={ styles['no-todo']}>No Todos 😥</h2> : todos.map((todo) => (
                <div key={todo.value} className={ styles['todo-item']}>
                  <input id={todo.value} type="checkbox" onClick={() => handleTodoClick(todo) } checked={todo.done} />
                  <label htmlFor={todo.value}>{todo.value}</label>
              </div>
            ))}
        </div>
        </div>
    </div>
  );
}

export default App;

