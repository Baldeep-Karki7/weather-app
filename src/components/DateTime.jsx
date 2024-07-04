import {useEffect, useState} from 'react';
import { DateTime } from 'luxon';

function DateAndTime({date,time})
{             
    return(
         <div className="dateTime">
            <p className="dt1">{date} <span>|</span> Local time: {time}</p>
        </div>
    );
}

export default DateAndTime