import React,{useEffect,useState} from 'react'
import { fetchOpenWeatherData ,OpenWeatherData} from '../../../utils/api'
import  Card from "@mui/material/Card"
import  CardContent from "@mui/material/CardContent"
import  CardActions from"@mui/material/CardActions"
import  Button from  "@mui/material/Button"
import   Box from  "@mui/material/Box"
import Typography  from '@mui/material/Typography'

import "./WeatherCard.css"
const WeatherCardContainer:React.FC<{children:React.ReactNode ;onDelete?:()=>void}>=({children,onDelete})=>{

return <Box mx={"4px"} my={"16px"}>
<Card>
<CardContent>
 {children}
</CardContent>
<CardActions>
    {onDelete&&<Button variant="outlined" color="error" onClick={onDelete}>DELETE</Button>}
</CardActions>
</Card>

</Box>
}
type  WeatherCardState="loading"|"error"|"ready"
const WeatherCard:React.FC<{city:string,onDelete?:()=>void}> =({city,onDelete})=>{
//useState for setting the city
const [weatherData,setWeatherData]=useState<OpenWeatherData|null>(null)
const [cardState,setCardState]=useState<WeatherCardState>("loading")

//useEffect for city 
useEffect(()=>{
    fetchOpenWeatherData(city).then((data)=>{setWeatherData(data); setCardState("ready")}).catch(err=>setCardState("error"))
   },[city])
//for Loading State
if(cardState==='loading')
{
    return(<WeatherCardContainer><Typography variant="h5">Loading...</Typography></WeatherCardContainer>)
}
if(cardState==='error')
{
    return(<WeatherCardContainer onDelete={onDelete}><Typography variant="h5">Couldn't fetch data cause city name is invalid!...</Typography></WeatherCardContainer>)

}
return (
    <WeatherCardContainer onDelete={onDelete}>
        <Typography variant="h5">{weatherData.name}</Typography>
        <Typography variant="body1">{weatherData.main.temp}</Typography>
        <Typography variant="body1">Feels Like:{weatherData.main.feels_like}</Typography>

    </WeatherCardContainer>

)
}
export default WeatherCard;