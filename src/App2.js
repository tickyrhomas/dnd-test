
import React, {useState, useEffect} from 'react'
import {Paper, Typography} from '@material-ui/core'

const items = [{
    id: 1,
    name: 'Ricky'
  },{
    id: 2,
    name: 'Bob'
  }, {
    id:3,
    name: 'John'
  }]

function DropBox(props) {
  const {addItem, containedItems} = props

  return (
    <Paper style={{backgroundColor: true?'green':'white', display:'flex', alignItems: 'center', justifyContent: 'center', height: '12rem', width: '12rem'}}>
      <Typography>Drop Here</Typography>
      {containedItems.map((item)=>{
        return (<Typography key={item.name}>{item.name}</Typography>)
      })}
    </Paper>
  )
}

function Item(props) {
  const {item:someObj, addItem} = props
  return (
    <div onClick={()=>{addItem(someObj.id)}} key={someObj.id} style={{opacity: false? 0.5: 1, width: '240px', border: '2px solid green', padding: '.5rem', marginBottom: '.5rem'}}>
      <Typography>{someObj.name}</Typography>
    </div>
  )
}

function App() {
  const [containedItems, setContainedItems] = useState([])
  useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted")
  },[]);

  useEffect(() => {
    console.log('changed')
    console.log(containedItems)
  },[containedItems])
  
  function addItem(itemId) {
    console.log('1', containedItems)
    const itemToAdd = items.find((ele)=>ele.id===itemId)
    const newContainedItems = [...containedItems, itemToAdd]
    console.log('2',newContainedItems)
    setContainedItems(newContainedItems)
  }

  return (
    <div style={{margin: '2rem', width: '100%', height: '100%'}}>
      <div style={{marginBottom: '5rem'}}>
        <Typography>Drop In These Boxes</Typography>
          <DropBox containedItems={containedItems} addItem={addItem}/>
      </div>
        <Typography>Items to drop</Typography>
        {items && (items.map((item, index)=>{
          return (
            <Item addItem={addItem} key={`item-${index}`} item={item}/>
          )
        }))}
    </div>
  );
}

export default App;
