import Button from '@material-ui/core/Button'
import React, {useEffect, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


export default function Body(){

    const [outputList, setOutputList] = useState([]);
    let sortCity = ([]);
    const [resultsList, setresultsList] = useState([]);
    const [cityList, setCityList] = useState([]);
    const tempList = ([]);

 
   
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

    const axios = require("axios");

    function UserSearch(){

        const [name, setName] = useState([]);
            
        //On change event handler for textfield input
        const onChange = (e) => {
            setName(e.target.value);
        }

        //On submit event handler for buttonn input
        const onSubmit = (e) => {

            e.preventDefault()
            //Filter results based on entry
            const results = outputList.filter(
                entry => Object.values(entry).some(
                    val => typeof val === "string" && val.includes(name))
            );

            setresultsList(results);
            
        }

        return ( 
            
            <div onSubmit = {onSubmit}>
            <form className={classes.root}  autoComplete="on">
                <TextField id="outlined-basic" label="Search by name..." variant="outlined"  
                     onChange = {onChange}/>
                      
            </form>
            <form className={classes.root} >
                <Button variant="contained" color="primary" type='submit'>
                    Search </Button>
             </form>
            
            </div>
            
    
        )

    }

    function CitySearch(){

        const [city, setCity] = useState([]);
            
        //On change event handler for textfield input
        const onChange = (e) => {
            setCity(e.target.value);
        }

        //On submit event handler for buttonn input
        const onSubmit = (e) => {

            
            e.preventDefault()
            //Filter results based on entry
            const results = outputList.filter(
                entry => Object.values(entry).some(
                    val => typeof val === "string" && val.includes(city)) 
            
            );
            
            setCityList(results);
            
        }

        return ( 
            
            <div onSubmit = {onSubmit}>
            <form className={classes.root}  autoComplete="on">
                <TextField id="outlined-basic" label="Search by city..." variant="outlined"  
                     onChange = {onChange}/>
                      
            </form>
            <form className={classes.root} >
                <Button variant="contained" color="primary" type='submit'>
                    Search </Button>
             </form>
            
            </div>
            
    
        )

    }


    async function getUserFacts() {

        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    
            for(let i = 0; i < 10; i++){
    
                const user = { 
                    id: response.data[i].id,
                    username: response.data[i].username,
                    name: response.data[i].name, 
                    email: response.data[i].email,
                    phone: response.data[i].phone,
                    city: (response.data[i].address).city
    
                }
                //push the user's information on tempList 
                tempList.push(user);
            }
            //set the user's information on outputList 
            setOutputList(tempList);
        }
  



useEffect(()  => {
  
    getUserFacts()
    
  //  UserSearch()
    

}, []);


function Delete (user){

    const result = outputList.filter(value => value !== user);

    setOutputList(result);

}


function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const cityA = a.city.toUpperCase();
    const cityB = b.city.toUpperCase();
  
    let comparison = 0;
    if (cityA > cityB) {
      comparison = 1;
    } else if (cityA < cityB) {
      comparison = -1;
    }
    return comparison;
  }
  

  function SortByCity(){
    sortCity = (outputList.slice(0));
    sortCity.sort(compare);
    setOutputList(sortCity);
  }
 


const map1 = outputList.map((user) => (
  
        <li key={user.username}>
            <h2>Username: {user.username}</h2>
            <h2>Name: {user.name}</h2>
            <h2>Email: {user.email}</h2> 
            <h2>Phone: {user.phone}</h2> 
            <h2>City: {user.city}</h2>
            <Button variant="contained" color="primary" onClick = {() => Delete(user)}>Delete</Button> 
        </li>
        

));

const map2 = resultsList.map((user) => (
    <li key={user.username}>
        <h2>Username: {user.username}</h2>
        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2> 
        <h2>Phone: {user.phone}</h2> 
        <h2>City: {user.city}</h2>
    </li>

));

const map3 = cityList.map((user) => (
    <li key={user.username}>
        <h2>Username: {user.username}</h2>
        <h2>Name: {user.name}</h2>
        <h2>Email: {user.email}</h2> 
        <h2>Phone: {user.phone}</h2> 
        <h2>City: {user.city}</h2>
    </li>

));

const classes = useStyles();
    return(

        <div>
            <UserSearch/>
            <CitySearch/>
            <Button variant="contained" color="primary" onClick = {() => SortByCity()}>Sort By City</Button> 
           
             {map2}
             {map3}
             {map1}
             

        </div>
        );
    
}
