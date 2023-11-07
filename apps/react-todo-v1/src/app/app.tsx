// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import { v4 as uuidv4 } from 'uuid';

import { useState, useEffect, useRef } from 'react';

export interface Todo {
  id: string; 
  value: string;
  done: boolean;
}

export function App() {

  const [inp, setInp] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storageData = localStorage.getItem('todosv1');
    return storageData ? JSON.parse(storageData) : [];
  });

  const inpRef = useRef<HTMLInputElement>(null);
  const inpBtn = useRef<HTMLButtonElement>(null);

  function enterKeyHandler(event: KeyboardEvent) {

    if(event.key === 'Enter') { 
      console.log("Enter key pressed"); 
      if (inpBtn.current) {
        inpBtn.current.click();
      }
    }
  }

  useEffect(() => { 
    const taskInput = document.getElementById('taskInput');

    if (taskInput) {
      taskInput.addEventListener('keydown', (event) => enterKeyHandler(event));
    }

    return () => { 
      taskInput?.removeEventListener('keydown', (event) => enterKeyHandler(event));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {             
    localStorage.setItem('todosv1', JSON.stringify(todos));
  }, [todos]);

  function handleInputChange (event: React.ChangeEvent<HTMLInputElement>) {
      setInp(event.target.value);
  }
  
  function handleAddTodo() {
    if(!inp) return;           
    setTodos(
      (prev: Todo[]) => [...prev, { id: uuidv4(), value: inp, done: false }] 
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
        if(todo.id === todoToToggle.id) { 
          return { ...todo, done: !todo.done };
        }
        return todo;
      })
    );
  }

  function handleDelete(todoToDelete: Todo) { 
    setTodos(
      (prev: Todo[]) => { 
        return prev.filter((todo) => todo.id !== todoToDelete.id); 
      }
    );
  }
  return (
    <div className={styles['outer-wrapper']}>
      <div className={styles['app-wrapper']}>
        <h1>Todo List</h1>
        <hr />
        <div className={styles['input-wrapper']}>
          <input id="taskInput" ref={inpRef} type="text" onChange={handleInputChange} placeholder="New task name" />
          <button ref={inpBtn} type='submit' className={styles['btn']} onClick={() => { handleAddTodo() } }>Add Task</button>
        </div>
        <div className="todo-wrapper">
          {todos.length === 0 ? 
            <h2 className={styles['no-todo']}>
              No Todos <span role='img' aria-label='worried'>😥</span>
            </h2>
            :
            todos.map((todo) => (
                <div key={todo.id} className={ styles['todo-item']} draggable={false} >
                  <input id={todo.id} type="checkbox" onChange={() => handleTodoClick(todo) } checked={todo.done} />
                  <label htmlFor={todo.id}>{todo.value}</label>
                  <span className={styles['del-wrapper']}>
                  <button className={styles['btn']} onClick={() => handleDelete(todo) }>Delete </button>
                  </span>
              </div>
            ))}
        </div>
        </div>
    </div>
  );
}

export default App;