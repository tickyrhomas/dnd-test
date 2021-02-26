
import React, {useState} from 'react'
import {useDrag, useDrop, DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
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
  const [{canDrop, isOver}, drop] = useDrop(()=>({
    accept: 'type1',
    drop: (item, monitor) => {
      addItem(item.id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  }))

  return (
    <Paper ref={drop} style={{backgroundColor: isOver?'green':'white', display:'flex', alignItems: 'center', justifyContent: 'center', height: '12rem', width: '12rem'}}>
      {canDrop? <Typography>Drop Here</Typography>: <Typography>NOPE</Typography>}
      {containedItems.map((item)=>{
        return (<Typography key={item.name}>{item.name}</Typography>)
      })}
    </Paper>
  )
}

function Item(props) {
  const {item:someObj} = props
  const [{isDragging}, drag, dragPreview] = useDrag(()=>({
    item:{type: 'type1', id: someObj.id},
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

  function addItem(itemId) {
    const itemToAdd = items.find((ele)=>ele.id===itemId)
    const newContainedItems = [...containedItems, itemToAdd]
    setContainedItems(newContainedItems)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{margin: '2rem', width: '100%', height: '100%'}}>
        <div style={{marginBottom: '5rem'}}>
          <Typography>Drop In These Boxes</Typography>
            <DropBox containedItems={containedItems} addItem={addItem}/>
        </div>
          <Typography>Items to drop</Typography>
          {items && (items.map((item, index)=>{
            return (
              <Item key={`item-${index}`} item={item}/>
            )
          }))}
      </div>
    </DndProvider>
  );
}

export default App;
