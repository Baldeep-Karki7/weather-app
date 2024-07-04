import {useEffect, useState} from 'react';
import './index.css';
import Input from './components/Input.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import DateAndTime from './components/DateTime.jsx';
import HourlyWeather from './components/HourlyWeather.jsx';

import './components/hourlyWeather.css';
import './components/DateTime.css';

import { getCurrentWeather,getLocation,getDailyData,getTimeZone,getCurrentDate,getCurrentTime} from './fetchData.js';


function App()
{
  const [city,setCity] = useState('berlin');
  const [weather,setWeather] = useState(null);
  const [hourlyWeather,setHourlyWeather] = useState(null);
  const [zone,setZone] = useState(null);
  const [date,setDate] = useState(null);
  const [time,setTime] = useState(null);

  const changeCity = (cityName)=>
    {
      setCity(cityName);
    }


    useEffect(()=>
    {
      const getWeather = async()=>
        {
            try{
                const location = await getLocation(city);
                const currentWeather = await getCurrentWeather(location);
                const hWeather = await getDailyData(location);
                const zone = await getTimeZone(location);
                setWeather(currentWeather);
                setHourlyWeather(hWeather);
                setZone(zone);

            }
            catch(error)
            {
              console.log(error);
            }
        }

      getWeather();
    },[city]);


    useEffect(()=>
    {
      const dt = getCurrentDate(zone);
      const t = getCurrentTime(zone);
      setDate(dt);
      setTime(t);
    },[zone]);

    
    return(
      <div className='container'>
        <Input changeCity={changeCity}/>
        {weather && <CurrentWeather weather={weather}/>}
        {zone && <DateAndTime date={date} time={time}/>}
        {hourlyWeather && <HourlyWeather hourlyWeather={hourlyWeather}/>}
      </div>
    )
}

export default App