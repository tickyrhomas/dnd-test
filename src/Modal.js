import React, {useState} from 'react'
import styled from 'styled-components'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@material-ui/core'

import {
  Archive as SomeIcon,
  Search as SearchIcon
} from '@material-ui/icons'

const CustomDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-height: 800px;
  }
`

export default function Main() {
  return (
    <Paper>
      <CustomDialog open={true}>
        <DialogTitle>
          This is a modal!
        </DialogTitle>
        <DialogContent>
          <SearchBar/>
          <SearchTabs/>
          <SearchContent/>
        </DialogContent>
      </CustomDialog>
    </Paper>
  )
}

function SearchBar() {
  return(
    <TextField
      fullWidth
      id="input-with-icon"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        )
    }}/>
  )
}

function SearchTabs() {
  const [value, setValue] = useState('tab1')

  const handleChange = (event) => {
    setValue(event.target.value)
  }
  return (
    <Tabs 
      value={value} 
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
    >
      <Tab value="tab1" label="Tab 1"/>
      <Tab disabled value="tab2" label="Tab 2"/>
      <Tab disabled value="tab3" label="Tab 3"/>
    </Tabs>
  )  
}

function generateResults(number) {
  const results = []
  for(let i=0;i<number;i++) {
    results.push({name: i})
  }
  return results
}

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
`


function SearchContent() {
  const searchResults = generateResults(100)
  return (
    <div style={{marginTop: '1rem'}}>
      <Typography>Search Results</Typography>
      {searchResults.map((item)=>{
        return(
          <Container key={item.name}>
            <SomeIcon/>
            <Typography style={{marginLeft: '1rem'}}>{item.name}</Typography>
          </Container>
        )
      })}
    </div>
  )
}