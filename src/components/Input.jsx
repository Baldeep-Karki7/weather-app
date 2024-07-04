import { useState } from "react";

function Input({changeCity})
{
    const [cityName,setCityName] = useState("");

    const handleClick=()=>
        {
            if(cityName !== "")
                {
                    changeCity(cityName);
                }
        }

    

    return(
        <div className="inputDiv">
            <input type="text" value={cityName} placeholder="Enter a city" onChange={(e)=>
                {
                     setCityName(e.target.value);
                }
            }/>
            <button className="search" onClick={handleClick}>Search</button>
        </div>
    );
}
export default Input