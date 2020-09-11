import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Sidebar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Sidebar = props => {

    let attachedClasses = [classes.Sidebar, classes.Close]
    if (props.isOpen) {
        attachedClasses = [classes.Sidebar, classes.Open]
    }

    const icon = props.isOpen ? faChevronUp : faChevronDown

    return (
        <div className={attachedClasses.join(' ')}>
            <div className = {classes.SidebarHeeader}>
                <button onClick={props.toggleSidebar} className={classes.ToggleBtn}>
                    <FontAwesomeIcon icon={icon} />
                </button>
            </div>
            <ul className={classes.SideNav}>
                <li>
                    <Link to='/profile/mycomics'>My Comics</Link>
                </li>
                <li>
                    <Link to='/profile/mycharacters'>My Characters</Link>
                </li>
            </ul>
            <p>2020 &copy;</p>
        </div>
    )
}

export default Sidebar;