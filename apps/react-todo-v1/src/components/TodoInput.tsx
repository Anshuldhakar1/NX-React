import React from 'react';

interface TodoInputProps {
    userinput: string;
    setUserinput: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoInput: React.FC<TodoInputProps> = ({ userinput, setUserinput }) => {
    return (
        <div className='todo-input-wrapper'>
            <input type='text' value={userinput} onChange={(e) => setUserinput(e.target.value)} />
            <button>Add</button>
        </div>
    );
};
