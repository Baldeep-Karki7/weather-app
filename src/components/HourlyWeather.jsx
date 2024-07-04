function HourlyWeather({hourlyWeather})
{


    function getImageUrl(icon)
    {
        return(
            `https://openweathermap.org/img/wn/${icon}.png`
        );
    }

    return(
            <div className="hw">
            <div className="hw1">
               <p className="title">3 Hour Interval Weather Forecast</p>
            <p className="line">&nbsp;&nbsp;&nbsp;</p>
            </div>

            <div className="hw2">
                {
                    hourlyWeather.map((weather,index)=>
                    {
                        return(
                            <div className="eachHour" key={index}>
                    <div className="ehTime">{weather.time} </div>
                    <div className="ehIcon"><img src={getImageUrl(weather.icon)}/></div>
                    <div className="ehTemp"> {weather.temp} &#176; C</div>
                </div>
                        );
                    })
                }
            </div>
        </div>

    )
}

export default HourlyWeather