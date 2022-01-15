import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {useEffect, useState} from "react";



export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState("");
  const [arrival2, setArrival2] = useState("");
  const [busNo, setBusNo] = useState("");
  
  
  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=66161";


 // loading is a variable, with initial value true
  // _setLoading_ is a function to set the value for the loading variable
  // _setState(true)_ is a function that initialises the state of the loading variable to true 

function loadBusStopData(){

  //Turn on the loading indicator each time
  setLoading(true);

  fetch(BUSSTOP_URL)
  // fetch function has to run finish first, then the 'then' function runs
  // this returns a json inside the response object
  .then((response)=>{
    return response.json();
  })
  .then((responseData)=>{
    console.log("Original data:");
      console.log(responseData);
      const myBus = responseData.services.filter(
        (item)=>item.no==="317"
      )[0];

      setBusNo(myBus.no);
      setArrival(myBus.next.time);
      setArrival2(myBus.next2.time);
      setLoading(false);
  });
  
}


useEffect(()=>{
 const interval = setInterval(loadBusStopData, 10000);
 return()=>clearInterval(interval);
},[]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival times for bus:</Text>
      <Text style={styles.title}>{busNo}</Text>
      

      <Text style={styles.arrivalTime}>
        Next bus{"\n"}{"\n"}
        {loading ? <ActivityIndicator size="large" /> : arrival}
        {/*this is a ternary operator, and is like a simplified if else statement
        if the loading is true it will show the activity indicator, if it is false it will show loaded. */}
        </Text>

        <Text style={styles.arrival2Time}>
        Subsequent bus{"\n"}{"\n"}
        {loading ? <ActivityIndicator size="large" /> : arrival2}
        {/*this is a ternary operator, and is like a simplified if else statement
        if the loading is true it will show the activity indicator, if it is false it will show loaded. */}
        </Text>
        
      <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Refresh me!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    color: 'black',
    fontSize: 34,
    fontWeight: "800",
  },
  arrivalTime:{
    color: 'black',
    fontSize: 34,
    fontWeight: "400",
    margin: 20,
  },

  arrival2Time:{
    color: 'grey',
    fontSize: 34,
    fontWeight: "400",
    margin: 20,
  },
  button:{
    backgroundColor: 'hotpink',
    
   padding: 10,
   justifyContent:"center",
   margin: 10,
  borderRadius:10,
  },
  buttonText:{
    color: 'white',
    fontSize: 20,
  },
});
