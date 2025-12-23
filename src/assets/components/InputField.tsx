import React, { useRef } from 'react'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleSubmit: ()=> void
}

export const InputField: React.FC<Props> = ({todo , setTodo , handleSubmit}) => {
    const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form onSubmit={(e)=>{
        handleSubmit(e);
        inputRef.current?.blur()
    }}>
         <h1>Add Task</h1>
        <input 
        ref = {inputRef}
        value={todo}
        onChange={(e)=>setTodo(e.target.value)}
        type="text" />
       
        <button type='submit'>GO</button>
    </form>
  )
}
