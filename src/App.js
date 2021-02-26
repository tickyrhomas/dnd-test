
import React, {useState, useEffect, useRef} from 'react'
import {useDrag, useDrop} from 'react-dnd'

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
  const {containedItems} = props
  const [{canDrop, isOver}, drop] = useDrop(()=>({
    accept: 'type1',
    drop: () => ({ name: 'DropBox' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <Paper ref={drop} style={{backgroundColor: isOver?'green':'white', display:'flex', alignItems: 'center', justifyContent: 'center', height: '12rem', width: '12rem'}}>
      {/* {canDrop? <Typography>Drop Here</Typography>: <Typography>NOPE</Typography>} */}
      <div style={{display:'flex', flexDirection:'column'}}>
        {containedItems.map((item)=>{
          return (<Typography key={item.name}>{item.name}</Typography>)
        })}
      </div>
      
    </Paper>
  )
}

function Item(props) {
  const {item:someObj, addItem} = props
  const [{isDragging}, drag, dragPreview] = useDrag(()=>({
    item:{type: 'type1', id: someObj.id},
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      console.log('added',item.id,' into ', JSON.stringify(dropResult))
      if(dropResult?.name === 'DropBox') {
        addItem(item.id)
      }
    },
    collect: (monitor) =>({
      isDragging: monitor.isDragging()
    })
  }))
  return (
    <div key={someObj.id} ref={drag} style={{opacity: isDragging? 0.5: 1, width: '240px', border: '2px solid green', padding: '.5rem', marginBottom: '.5rem'}}>
      <Typography>{someObj.name}</Typography>
    </div>
  )
}

function App() {
  const [containedItems, setContainedItems] = useState([])
  const itemsRef= useRef({});
  itemsRef.current = containedItems;
  useEffect(() => {
    console.log("mounted");
    return () => console.log("unmounted")
  },[]);

  useEffect(() => {
    console.log('changed')
    console.log(containedItems)
  },[containedItems])
  
  function addItem(itemId) {
    console.log('1', itemsRef.current)
    const itemToAdd = items.find((ele)=>ele.id===itemId)
    const newContainedItems = [...itemsRef.current, itemToAdd]
    console.log('2',newContainedItems)
    setContainedItems(newContainedItems)
  }
  console.log('render', containedItems)
  return (
    
      <div style={{margin: '2rem', width: '100%', height: '100%'}}>
        <div style={{marginBottom: '5rem'}}>
          <Typography>Drop In These Boxes</Typography>
            <DropBox containedItems={containedItems}/>
        </div>
          <Typography>Items to drop</Typography>
          {items && (items.map((item, index)=>{
            return (
              <Item key={`item-${index}`} item={item} addItem={addItem}/>
            )
          }))}
      </div>
    
  );
}

export default App;
