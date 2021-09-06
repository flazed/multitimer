import { useEffect, useState } from 'react';
import classnames from 'classnames';

export default function Stopwatch() {
    const [status, setStatus] = useState(false);
    const [date, setDate] = useState({
        start: 0,
        difference: 0,
        ms: 0
    });
    const [time, setTime] = useState({
        hour: 0,
        min: 0,
        sec: 0,
        millisec: 0
    });

    useEffect(() => {
        if(status) {
            let timer = setInterval(changeTime, 10);
            return () => clearInterval(timer);
        }
    });

    const changeStatus = () => {
        if(!status) {
            setDate({...date, start: Date.now()});
        } else {
            setDate({...date, ms: date.difference});
        }
        setStatus(!status);
    }

    const resetTimer = () => {
        setStatus(false);
        setDate({start: 0, difference: 0, ms: 0});
        setTime({
            hour: 0,
            min: 0,
            sec: 0,
            millisec: 0
        })
    }

    const changeTime = () => {
        let difference = Date.now() + date.ms - date.start;
        setDate({...date, difference: difference});
        setTime({
            hour: Math.floor(difference/1000/60/60),
            min: Math.floor(difference/1000/60%60),
            sec: Math.floor(difference/1000%60), 
            millisec: Math.floor(Math.floor(difference/10)%100)
        })
    }

    return (
        <>
            <span>
                    {time.hour > 9 ? time.hour : '0'+time.hour}:
                    {time.min > 9 ? time.min : '0'+time.min}:
                    {time.sec > 9 ? time.sec : '0'+time.sec}.
                    {time.millisec > 9 ? time.millisec : '0'+time.millisec}
            </span>
            <div>
                <button className={classnames({'active': status})} onClick={changeStatus}>{status ? 'Stop' : 'Start'}</button>
                <button onClick={resetTimer}>Reset</button>
            </div>
        </>
    );
}