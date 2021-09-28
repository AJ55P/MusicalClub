

import React from 'react';


class Activities extends React.Component{

    constructor(props){
        super(props);
        this.state = {clubActivities: []};
    }

    componentDidMount(){
        let that = this;
        fetch('/activities')
        .then(function(res){
            if(res.ok){
                return res.json();
            }
        })
        .then(function(clubEvents){
            that.setState({clubActivities: clubEvents});
        })
        .catch(function(error){
            console.log("Error occurred!: ", error);
        })
        
    }


    render(){

        let activitiesRows = this.state.clubActivities.map(function(activity, index){
            return <tr key={index}>
                <td>{activity.name}</td>
                <td>{activity.dates.join(', ')}</td>
                <td>{activity.description}</td>
            </tr>;
        });

        let activitiesComp = <main>
            <header>
                <h1>Activities</h1>
            </header>
                <table id="ActivitiesTable">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Dates</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody>
                        {activitiesRows}
                    </tbody>
                </table>
        </main>;
        

    return activitiesComp;
    }
}


export default Activities;