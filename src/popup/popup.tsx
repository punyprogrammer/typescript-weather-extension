import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'
import  InputBase  from '@mui/material/InputBase';
import  Paper  from    '@mui/material/Paper'
import  IconButton  from '@mui/material/IconButton';
import  Box from  '@mui/material/Box'
 import AddIcon from '@mui/icons-material/Add';
import { fetchOpenWeatherData } from '../../utils/api'
import "@fontsource/roboto";
import WeatherCard from './WeatherCard'
import  {setStoredCities,getStoredCities} from '../../utils/storage'
import './popup.css'

const App: React.FC<{}> = () => {
  const  [cities,setCities]=useState<string[]>([])
  const  [addCityInput,setAddCityInput]=useState<string>('')
  const handleAddCity=(event)=>{
    event.preventDefault();
    if(addCityInput==='')
    {
      return;
    }
    setStoredCities([...cities,addCityInput]).then(()=>{

      setCities((prev)=>{
        return  [...prev,addCityInput]
      })
      setAddCityInput('')
    })
  }
  const handleDeleteCity=(index:number)=>{
  cities.splice(index,1);
  setStoredCities([...cities]).then(()=>{
    setCities([...cities])

  })
  }
  //for initial render
  useEffect(()=>{
  getStoredCities().then((res)=>{
    setCities(res)
  })
  },[])
  return (
    <Box mx='8px' my='16px'>
<Paper>
  <Box px='10px'py='6px'sx={{ display: 'flex' ,justifyContent: 'space-between' }}>
  <InputBase value={addCityInput} onChange={event=>setAddCityInput(event.target.value)}placeholder="Add a city name..."/>
<IconButton>
<AddIcon color="primary" onClick={handleAddCity}/>
</IconButton>

  </Box>
</Paper>
    {
      cities.map((item,index)=>(<WeatherCard key={index} onDelete={()=>handleDeleteCity(index)} city={item}/>))
    }
    <Box height='16px'/>
    </Box >
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
