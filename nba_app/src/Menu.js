import React from 'react';
import { Link } from 'react-router'

export const Menu = () =>
    <nav className='menu'>
        <Link to='/' activeClassName="selected">
            Scoreboard
        </Link>
        <Link to='/standings' activeClassName="selected">
            Standings
        </Link>
        <Link to='/teams' activeClassName="selected">
            Teams
        </Link>
    </nav>

export default Menu;