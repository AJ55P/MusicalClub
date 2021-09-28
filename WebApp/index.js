import React from 'react';
import ReactDOM from 'react-dom';
import Home from './AppComponents/Home';
import About from './AppComponents/About';
import Login from './AppComponents/Login';
import Activities from './AppComponents/Activities';
import Menu from './AppComponents/Menu';
import Members from './AppComponents/Members';
import Logout from './AppComponents/Logout';


class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {show: 'Home', user: null, role: 'guest'};
    }

    
    loginFunc(memberX){
        let roleX = memberX.role;
        let userX = memberX;
        this.setState({show: 'Home', user: userX, role: roleX});
    }

    logoutFunc(){
        this.setState({show: 'Home', user: null, role: 'guest'});
    }
    

    updateShow(option){
        this.setState({show: option});
    }

    render(){
        let contents = null;

        switch(this.state.show){
            case 'Home':
                contents = <Home/>
                break;
            
            case 'Login':
                contents = <Login loginMethod = {this.loginFunc.bind(this)}/>;
                break;
            
            case 'About':
                contents = <About/>
                break;

            case 'Activities':
                contents = <Activities/>
                break;

            case 'Members':
                contents = <Members/>;
                break;
                
            case 'Logout':
                return contents = <Logout logoutHandler = {this.logoutFunc.bind(this)}/>;
            default: 
                contents = <h2>Error, component not available!</h2>
        }


        return <div>
            <Menu role={this.state.role} showHandler = {this.updateShow.bind(this)}/>
            {contents}
        </div>;
    }

}

ReactDOM.render(<App/>,
    document.getElementById('root')
    );

