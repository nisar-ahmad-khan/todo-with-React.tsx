import React from 'react'
interface Props {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>
}
export const FunFile: React.FC<Props> = ({name , setName}) => {
  return (
    <form >

        <input type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
    </form>
  )
}
