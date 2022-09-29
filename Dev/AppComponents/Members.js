

import React from 'react';

class Members extends React.Component{

    constructor(props){
        super(props);
        this.state = {members: []};
    }

    componentDidMount(){
        let that = this;

        fetch('/members')
        .then(function(res){
            if(res.ok){
                return res.json();
            }
            let badResponseMsg = `Valid Response received, however Error present: ${res.status} ${res.statusText}`;
            return Promise.reject(badResponseMsg);
        })
        .then(function(clubMembers){
            that.setState({members: clubMembers});
        })
        .catch(function(error){
            console.log("error Present: ", error);
        });

    }

    render(){
        let memberRows = this.state.members.map(function(memX, index){
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{memX.firstName}</td>
                <td>{memX.lastName}</td>
                <td>{memX.email}</td>
            </tr>
        });

        return <main>
            <header>
                <h1>Musical Club Members</h1>
            </header>
                <table id="MembersTable">
                    <thead>
                        <tr><td>#</td><td>First Name</td><td>Last Name</td><td>Email</td></tr>
                    </thead>
                    <tbody>
                        {memberRows}
                    </tbody>
                </table>
        </main>;
    }

}


export default Members;