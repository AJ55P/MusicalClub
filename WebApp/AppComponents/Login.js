

import React from 'react';

class Login extends React.Component{

    constructor(props){
        super(props);
        this.state ={email: '', password: ''};
    }

    updateEmailnPassword(event){
        if(event.target.id === 'emailField'){
            this.setState({email: event.target.value});
        }
        else if(event.target.id === 'passwordField'){
            this.setState({password: event.target.value});
        }
    }

    displayerrorMessage(errMsg){
        this.setState({email: '', password: '', errorMsg: errMsg})
    }


    loginFunction(){
        let signinCreds = {
            email: this.state.email,
            password: this.state.password
        };
        let that = this;

        /* fetch call */
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(signinCreds)
        })
        .then(function(res){
            // 200 or 401, still need to return body for both
            return res.json();
        })
        .then(function(userOrNotuser){
            if(!userOrNotuser.error){ // returned the user!
             that.props.loginMethod(userOrNotuser);
            }
            else{ // returned error message
                that.displayerrorMessage(userOrNotuser);
            } 
        })
        .catch(function(error){
            console.log("error present: " + error);
        })
    }

    render(){
        let errorPopup = <p></p>;

        if(this.state.errorMsg){
            errorPopup = <div id="errorPopup">
            <h2>{this.state.errorMsg.msg}</h2>
        </div>;
        }
        
    let LoginComp = <main>
        <header>
            <h1>Login</h1>
        </header>
        {errorPopup}
        <section id="loginGridContainer">
            <label htmlFor="email">Email:</label>
            <input type="email" id="emailField" value= {this.state.email} 
            onChange = {this.updateEmailnPassword.bind(this)}  ></input>

            <label htmlFor="password">Password:</label>
            <input type="password" id="passwordField" value = {this.state.password} 
            onChange={this.updateEmailnPassword.bind(this)} ></input>

            <button type="button" onClick={this.loginFunction.bind(this)}>Login</button>
        </section>
        <section id="credSection">
            <p>Admin  email: tirrivees1820@outlook.com  password: hhQcH0PVgMpQq6ve </p>
            <p>Member  email: biune1929@gmail.com   password: nthoWreKAZ_bauvg</p>
        </section>
    </main>;

        return LoginComp;
    }

}

export default Login;