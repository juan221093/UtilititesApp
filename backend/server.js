const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const moongoose = require('mongoose');
require('dotenv').config();

//bring routes

const appRoutes =  require('./routes/utilitiesApp');
const authRoutes =  require('./routes/auth');
const userRoutes =  require('./routes/user');
const categoryRoutes =  require('./routes/category');
const tagRoutes =  require('./routes/tag');



//app

const app =  express();

//Database

moongoose
    .connect(process.env.DATABASE_CLOUD, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
    .then(() => console.log('DB connected'));

//middlewares   
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

//cors
if(process.env.NODE_ENV = 'development'){
    app.use(cors({origin:   `${process.env.CLIENT_URL}`}));

}

//routes middleware

app.use('/api', appRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tagRoutes);



//routes

app.get('/api', (req, res)=> {
    res.json({time: Date().toString()})
});



//port
 const port = process.env.PORT || 8000
 app.listen(port, ()=> {
     console.log(`Server Is Running on Port ${port}`)
 });
 