import { Link, useLocation } from "react-router-dom";
import classnames from "classnames";
import './route.scss';

export default function Routes() {
    const location = useLocation().pathname;

    return (
        <nav>            
            <li className={classnames({'active': location === '/'})}><Link to='/'><i className="fas fa-calendar-alt"></i></Link></li>
            <li className={classnames({'active': location === '/stopwatch'})}><Link to='/stopwatch'><i className="fas fa-stopwatch-20"></i></Link></li>
            <li className={classnames({'active': location === '/timer'})}><Link to='/timer'><i className="far fa-clock"></i></Link></li>
        </nav>
    );
}