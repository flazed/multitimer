import { useEffect, useState } from 'react';
import classnames from 'classnames';

export default function Timer() {
    const [status, setStatus] = useState(false);
    const [date, setDate] = useState({
        start: 0,
        end: 0,
        timePassed: 0,
    })

    const [start, setStart] = useState({
        hour: 0,
        min: 0,
        sec: 0
    });

    const [end, setEnd] = useState({
        hour: 0,
        min: 0,
        sec: 0
    });

    useEffect(() => {
        if(status) {
            let timer = setInterval(changeTime, 200);
            return () => clearInterval(timer);
        }
    });

    const inputValue = (e, field, max = 90) => {
        setEnd({
            hour: 0,
            min: 0,
            sec: 0
        });         
        +e.target.value > max ? setStart({...start, [field]: max}) : setStart({...start, [field]: +e.target.value});  
    } 

    const changeStatus = () => {
        if(!status) {
            let now = new Date();
            setDate({...date, 
                start: now.getTime(), 
                end: now.setHours(now.getHours()+start.hour, now.getMinutes()+start.min, now.getSeconds()+start.sec)
            });
        } else {
            setDate({...date, timePassed: Date.now() - date.start + date.timePassed});
        }
        setStatus(!status);
    }

    const resetTimer = () => {
        setStatus(false);
        setDate({
            start: 0,
            end: 0,
            timePassed: 0,
        });
        setStart({
            hour: 0,
            min: 0,
            sec: 0
        });
        setEnd({
            hour: 0,
            min: 0,
            sec: 0
        });
    }

    const changeTime = () => {
        let difference = date.end - date.timePassed - Date.now();
        if(difference > 0) {
            setEnd({
                hour: Math.floor(difference/1000/60/60),
                min: Math.floor(difference/1000/60%60),
                sec: Math.floor(difference/1000%60)
            });
        } else {
            resetTimer();
        }
    }

    return (
        <>
            <div className="setTime_inputs">
                <label><input type="number" disabled={status} min="0" max="90" value={start.hour} onInput={(e) => inputValue(e, 'hour')}/>h</label>
                <label><input type="number" disabled={status} min="0" max="59" value={start.min} onInput={(e) => inputValue(e, 'min', 59)}/>m</label>
                <label><input type="number" disabled={status} min="0" max="59" value={start.sec} onInput={(e) => inputValue(e, 'sec', 59)}/>s</label>
            </div>
            <span>
                    {end.hour > 9 ? end.hour : '0'+end.hour}:
                    {end.min > 9 ? end.min : '0'+end.min}:
                    {end.sec > 9 ? end.sec : '0'+end.sec}           
            </span>
            <div className="btns">
                <button className={classnames({'active': status})} onClick={changeStatus}>{status ? 'Stop' : 'Start'}</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </>
    );
}