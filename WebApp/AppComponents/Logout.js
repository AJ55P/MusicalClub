

import React from 'react';

class Logout extends React.Component{

    constructor(props){
        super(props);
        this.state = {msg: " "};
    }

    componentDidMount(){
        let that = this;
        fetch('/logout')
        .then(function(res){
            let resMessage = `Response Message: ${JSON.stringify(res.status)} ${JSON.stringify(res.statusText)}`;
            if(res.ok){
                return res.json();
            }
            return Promise.reject(resMessage);
        })
        .then(function(goodbyeMsg){
            that.setState({msg: goodbyeMsg.msg});
        })
        .catch(function(error){
            console.log(`Valid response, however, problems present: ${JSON.stringify(error)}`);
        });
    }

    componentDidUpdate(){
        let that = this;
        setTimeout(function(){
            that.props.logoutHandler();
        }, 1500);
        
    }

    render(){

        let logOutComp = <main id="LogoutComp">
            <header>
                <h1>{this.state.msg}</h1>
            </header>
            <p>Thanks for stopping by!</p>
        </main>;

        return logOutComp;
    }

}

export default Logout;