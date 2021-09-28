

const express = require('express');
const app = express();

const path = require('path');
const bcrypt = require('bcryptjs');
const session = require('express-session');

let clubEvents = require('./Data/activityData.json');
let clubMembers = require('./Data/clubMembers.json');

const port = 3000;

app.use(express.static('static'));


app.get('/', function(req, res){
    
    let filePath = path.join(__dirname + '/index.html');

    res.sendFile(filePath, function(error){
        if(error){
            res.send("No Such file exists.")
        }
    });
});


const cookieName = 'clubSid';

app.use(session({
    secret: "Its Cool Website Development",
    name: cookieName,
    resave: false,
    saveUninitialized: false
}));

const setUpSessionMiddleware = function(req, res, next){ 
    if(!req.session.user){
        req.session.user = {
            role: 'guest'
        }
    }
    next();
};  

app.use(setUpSessionMiddleware);

const memberORadminProtecMiddleware = function(req, res, next){  
    if(req.session.user.role === 'guest' ){
        res.status(401).json({error: true, msg: "Error 401 Unauthorized"});
    }
    else{
        next();
    }
};


const adminProtecMiddleware = function(req, res, next){  
    if(req.session.user.role != 'admin'){
        res.status(401).json({error: true, msg: "Error 401 Unauthorized"});
    }
    else{
        next();
    }
};


app.use(express.static('App'));
app.get('/webApp', function(req, res){

    let filePath = path.join(__dirname + '/App/index.html');
    
    res.sendFile(filePath, function(error){
        if(error){
            res.send("No Such file exists.")
        }
    });
});


app.get('/activities', memberORadminProtecMiddleware, function(req, res){
    res.json(clubEvents);
});


app.get('/members', adminProtecMiddleware, function(req, res){
    let filteredMembers = clubMembers.map(function(member){
        return {firstName: member.firstName, lastName: member.lastName, email: member.email};
    });
    res.json(filteredMembers);
});




app.post('/login', express.json(), function(req, res){
    let loginAttemptX = req.body;

    let potentialUser = clubMembers.find(function(storedUser){
        return storedUser.email === loginAttemptX.email.toLowerCase();
    });

    if(potentialUser){ 

        let passwordAttempt = bcrypt.compareSync(loginAttemptX.password, potentialUser.passHash);

        if(passwordAttempt){ 

            let oldSessionInfoObject = req.session.user;

            req.session.regenerate(function(error){
                if(error){
                    console.log("error occured generating new session: ", error);
                }

                let authenUser = Object.assign(oldSessionInfoObject, potentialUser);
                delete authenUser.passHash;
                req.session.user = authenUser;
                res.json(authenUser);

            })
        }

        else{ 
            res.status(401).json({error: true, msg: "Incorrect email/password!"});
        }

    }
    else{ 
        res.status(401).json({error: true, msg: "Incorrect email/password!"});
    }
});

app.get('/logout', function(req, res){

    let options = req.session.cookie;
    req.session.destroy(function(error){
        if(error){
            console.log("erorr occured destroying session: ", error);
        }
        res.clearCookie(cookieName, options);
        res.json({msg: "Goodbye"});
    })

});


let notAvailable404Middleware = function(req, res){
    let filePath = path.join(__dirname + '/static/404error.html');
    res.status(404).sendFile(filePath);
};

app.use(notAvailable404Middleware);


app.listen(process.env.PORT || port);


