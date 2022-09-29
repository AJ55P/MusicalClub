

import React from 'react';

function Menu(props){

    let optionsGuest = ['Home', 'About', 'Login'];
    let optionsMember = ['Home', 'About', 'Activities', 'Logout'];
    let optionsAdmin = ['Home', 'About', 'Activities', 'Members', 'Logout'];

    let menu = null;

    
    switch(props.role){

        case 'admin':
            menu = optionsAdmin.map(function (opt, index) {
                return <li key={index}><a onClick = {props.showHandler.bind(null, opt)}>{opt}</a></li>;
            });
            break;

        case 'member':
            menu = optionsMember.map(function (opt, index) {
                return <li key={index}><a onClick = {props.showHandler.bind(null, opt)}>{opt}</a></li>;
            });
            break;

        case 'guest':
            menu = optionsGuest.map(function (opt, index) {
                return <li key={index}><a onClick = {props.showHandler.bind(null, opt)}>{opt}</a></li>;
            });
            break;
    }

    
    let menuComp = <nav>
        <ul>
            {menu}
        </ul>
    </nav>;

    return menuComp;
}

export default Menu;