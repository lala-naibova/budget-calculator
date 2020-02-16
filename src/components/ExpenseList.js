import React from 'react'
import Item from './ExpenseItem'
import {MdDelete} from 'react-icons/md'

export default function ExpenseList({expenses, clearAll, handleDelete, handleEdit}) {
    return (
        <>
           <ul className='list'>
            {
                expenses.map(elem=>{
                    return <Item key={elem.id} expense={elem} handleDelete={handleDelete} handleEdit={handleEdit}/>
                })
            }
           </ul>
           {expenses.length > 0 && 
        <button type='button' className='btn' onClick={clearAll}>
            clear expenses
            <MdDelete className='btn-icon'/>
        </button>}
        </>
    )
}
