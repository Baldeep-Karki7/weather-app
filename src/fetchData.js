import { DateTime } from "luxon";
const API_KEY = import.meta.env.VITE_API_KEY;
const TIMEZONE_KEY = import.meta.env.VITE_TIMEZONE_KEY;

function getTime(date)
    {
        return(date.slice(10,16));
    }

function convertTemp(temp)
    {
        return(parseInt(temp) - 273);
    }

export const getLocation=async (cityName)=>
    {
        try{
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${API_KEY}`);

            if(!response.ok)
                {
                    throw new Error("Couldn't fetch geoLocation");
                }
            const result = await response.json();
            return({
                lat : result[0].lat,
                lon : result[0].lon
            })
        }
        catch(error)
        {
            console.log(error);
        }
    }



export const getCurrentWeather = async(location)=>
    {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`);

            if(!response.ok)
                {
                    throw new Error("Couldn't fetch cuurent data");
                }
            const result = await response.json();

            const {description,icon,main} = result.weather[0];
            const {temp,feels_like,pressure,humidity} = result.main;
            const {visibility,timezone,name,dt} = result;
            const {speed,deg} = result.wind;
            const {country} = result.sys;
          
            return({
                description,main,icon,temp,feels_like,pressure,humidity,visibility,timezone,name,dt,speed,deg,country
            });
            
        }
        catch(error)
        {
            console.log(error);
        }
    }



export const getDailyData = async (location)=>
    {
        try{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}`);

            const result = await response.json();
            const list = result.list.slice(0,11);

            const finalList = list.map((obj)=>
            {
            const {description,icon,main} = obj.weather[0];
            const {temp,feels_like,temp_min,temp_max} = obj.main;
            const {dt_txt} = obj;
                
            return(
                {
                    time : getTime(dt_txt),description,icon,main,
                    temp : convertTemp(temp),
                    feels_like: convertTemp(feels_like),
                    temp_max : convertTemp(temp_max),
                    temp_min: convertTemp(temp_min),
                }
            );
            });

            return finalList;

        }
        catch(error)
        {
            console.log(error);
        }
    }

export const getTimeZone = async(location)=>
        {
            try{
                const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_KEY}&format=json&by=position&lat=${location.lat}&lng=${location.lon}`);

                const result = await response.json();
                return result.zoneName;
            }
            catch(error)
            {
                console.log(error);
            }
        }

export const getCurrentDate = (zone)=>
    {
        const dt = DateTime.now().setZone(zone);
        const date = dt.toLocaleString(DateTime.DATE_HUGE);
        return date;
    }

export const getCurrentTime = (zone)=>
    {
        const dt = DateTime.now().setZone(zone);
        const time = dt.toLocaleString(DateTime.TIME_SIMPLE);
        return time;
    }

