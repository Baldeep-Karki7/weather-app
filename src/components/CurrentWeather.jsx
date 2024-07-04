

function CurrentWeather({weather})
{

    const imageUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    function convertTemp(temp)
    {
        return(parseInt(temp) - 273);
    }
    return(
        <div className="currentWeather">
            <div className="cw1">
                <img src={imageUrl} className="weatherIcon"/>
                <p>{weather.main} | {weather.description}</p>
                </div>
            <div className="cw2">
                <div className="cw2-top"><span className="cw2span">{weather.name},&nbsp;{weather.country}</span></div>
                <div className="cw2-bottom">{convertTemp(weather.temp)}&#176; C</div>
            </div>
            <div className="cw3">
                <p>Feels like : {convertTemp(weather.feels_like)}&#176; C</p>
                <p>Humidity : {weather.humidity} %</p>
                <p>Wind : {weather.speed} km/hr</p>
            </div>
        </div>
    );
}

export default CurrentWeather