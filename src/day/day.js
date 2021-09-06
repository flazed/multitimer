import { useEffect, useState } from 'react';
import classnames from 'classnames';

export default function Day() {
    const [status, setStatus] = useState(false);
    const [day, setDay] = useState({
        end: new Date(new Date().setDate(new Date().getDate()+1)).setHours(0, 0, 0, 0)
    })
    const [time, setTime] = useState({
        day: 0,
        hour: 0,
        min: 0,
        sec: 0
    });

    useEffect(() => {
        if(status) {
            let timer = setInterval(changeTime, 1000);
            return () => clearInterval(timer);
        }
    });

    const pickDate = (e) => {
        setDay({end: new Date(e.target.value).setHours(0)})
    } 

    const changeStatus = () => {
        setStatus(!status);
    }

    const changeTime = () => {
        let ms = day.end - Date.now();
        if(ms > 0) { 
            setTime({...time,   day: Math.floor(ms/1000/60/60/24),
                                hour: Math.floor(ms/1000/60/60)-24*Math.floor(ms/1000/60/60/24),
                                min: Math.floor(ms/1000/60%60),
                                sec: Math.floor(ms/1000%60)});
        } else {
            setTime({
                hour: 0,
                min: 0,
                sec: 0
            });
        }
    }

    return (
        <>
            <input type="date" onChange={pickDate}/>
            <span>
                    {time.day > 0 ? time.day > 9 ? time.day+':' : '0'+time.day+':' : ''}
                    {time.hour > 9 ? time.hour : '0'+time.hour}:
                    {time.min > 9 ? time.min : '0'+time.min}:
                    {time.sec > 9 ? time.sec : '0'+time.sec}
            </span>
            <button className={classnames({'active': status})} onClick={changeStatus}>{status ? 'Stop' : 'Start'}</button>
        </>
    );
}