import React from 'react'
import {MdSend, MdEdit} from 'react-icons/md'
export default function ExpenseForm({edit, charge, amount, handleAmount, handleCharge, handleSubmit}) {

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
<div className='form-group'>
        <label htmlFor='charge'>charge</label>
        <input 
            type='text' 
            className='form-control' 
            id='charge' 
            name ='charge'
            placeholder='e.g rent'
            value={charge}
            onChange={handleCharge}/>
</div>
<div className='form-group'>
        <label htmlFor='amount'>amount</label>
        <input 
            type='number' 
            className='form-control' 
            id='amount' 
            name ='amount'
            placeholder='e.g 100'
            value={amount}
            onChange={handleAmount}/>
</div>
        </div>
        {edit === true ?<button type='submit' className='btn edit-btn'>edit
        <MdEdit className='btn-icon' /></button> :
    <button type='submit' className='btn'>submit
    <MdSend className='btn-icon' /></button>}
        
        </form>
    )
}
