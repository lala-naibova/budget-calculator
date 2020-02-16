import React, {useState, useEffect} from 'react';
import './App.css';
import ExpenceList from './components/ExpenseList'
import ExpenceForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid/v4'

/* const initialExpenses = [
{id: uuid(),charge:'rent',amount:1600},
{id: uuid(),charge:'car payment',amount:400},
{id: uuid(),charge:'credit cart bill',amount:1200}] */
let initialExpenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')):[]


function App() {
  //************************* all expenses ****************
  const [expenses, setExpenses]=useState(initialExpenses);
  //************************* single expense ****************
   const [charge, setCharge] = useState('');
   //************************* single amount ****************
   const [amount, setAmount] = useState('');
    //************************* alert ****************
    const [alert, setAlert] = useState({show:false});
    //************************* edit or submit ****************
    const [edit, setEdit] = useState(false);
    //************************* set id ****************
    const [id, setId] = useState(0);
   //************************* use effect ****************

   useEffect(()=>{
    localStorage.setItem('expenses', JSON.stringify(expenses))
   })
    //************************* functionality ****************
   //handle charge
   const handleCharge = e =>{
     setCharge(e.target.value);
   }
   //handle amount
   const handleAmount = e =>{
    setAmount(e.target.value);
  }
  // handle alert
  const handleAlert=({type, text})=>{
        setAlert({show:true, type, text})
        setTimeout(() => {
          setAlert({show:false})
        }, 2000);
  }
  //handle submit
  const handleSubmit= (e)=>{
      e.preventDefault();
      if(charge && amount>0){
        const singleExpense = {
          id: edit?id:uuid(),
          charge,
          amount: parseInt(amount)
        }
        setExpenses([...expenses,singleExpense]);
        setCharge('');
        setAmount('');
        setEdit(false);
        setId(0);
        handleAlert({type:'success', text:'item added'})
      }
      else{
        handleAlert({type:'danger', text:'charge cannt be empty value and amount value has to be bigger than zero'}) 
      }
   
  }
  //clear all items
  const clearAll= ()=>{
    setExpenses([]);
  }
  //handle delete
  const handleDelete =(id)=>{
const temp = expenses.filter(elem=>elem.id!==id);
setExpenses([...temp]);

  }
  //handle edit
  const handleEdit =(id)=>{
let curr = expenses.find(elem=>elem.id===id);
setCharge(curr.charge);
setAmount(curr.amount);
handleDelete(curr.id);
setEdit(true);
setId(id);
  }

  return (
    <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
      
      <h1>budget calculator</h1>
      <main className='App'>
      <ExpenceForm 
      edit={edit}
      charge={charge} 
      amount={amount} 
      handleAmount={handleAmount}
      handleCharge={handleCharge}
      handleSubmit ={handleSubmit}/>
      <ExpenceList expenses = {expenses} clearAll={clearAll} handleDelete={handleDelete} handleEdit={handleEdit}/>
      </main>
     <h1>total spending : <span className='total'>
       ${expenses.reduce((acc,curr)=>{
         return acc+=curr.amount
       },0)}</span></h1>
    </>
  );
}

export default App;
