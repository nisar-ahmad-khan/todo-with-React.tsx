import React from 'react'
import type { Todo } from '../model'
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
interface Props{
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}



export const SingleTodo: React.FC<Props> = ({todo }) => {
  return (
   <form >
    <div>{todo.todo} <span><FaEdit/></span> <span><RiDeleteBin5Fill/></span></div>
   </form>
  )
}
