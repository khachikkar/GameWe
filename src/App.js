import React, { useEffect, useState } from "react";
import { API_KEY } from "./constants/constants";
import { Button, Flex, Form, Input, notification } from "antd";

import winsound from "./core/sounds/win.wav"
import losesound from "./core/sounds/lose.wav"


import "./App.css";
import "./core/index.css";

let mycities = new Set();
while (mycities.size < 5) {
  mycities.add(Math.floor(Math.random() * 20));
}

function App() {
  const [form] = Form.useForm();

  const cities = [
    "New York",
    "Los Angeles",
    "London",
    "Paris",
    "Tokyo",
    "Sydney",
    "Berlin",
    "Moscow",
    "Rome",
    "Dubai",
    "Beijing",
    "Toronto",
    "Mumbai",
    "Mexico City",
    "Yerevan",
    "Seoul",
    "Cape Town",
    "Buenos Aires",
    "Hong Kong",
    "Singapore",
  ];
  // const [city, setCity] =useState(cities[0])

  let gamenums = [...mycities];
  console.log(gamenums);
  const [count, setCount] = useState(0);
  const [mycity, setMycity] = useState(cities[gamenums[count]]);
  const [temp, setTemp] = useState(0);
const [results, setResults] = useState([])

  useEffect(() => {
    try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=${API_KEY}`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTemp(Math.floor(data.main?.temp - 273.15));
      });
    }catch(e){
      console.log(e)
    }
  }, [mycity]);


const winaudio = new Audio(winsound)
const loseaudio = new Audio(losesound)



  const handleInput = async (value) => {
    const newCount = count + 1;
  
    if (newCount === 6) {
      // Calculate the true/false counts
      let countResults = results.reduce(
        (acc, value) => {
          if (value) {
            acc.trueCount++;
          } else {
            acc.falseCount++;
          }
          return acc;
        },
        { trueCount: 0, falseCount: 0 }
      );
  
      console.log("True Count:", countResults.trueCount);
      
      // Show notification based on the results
      if (countResults.trueCount >= 4) {
        notification.success({
          message: "Congratulations You win",
        });
        winaudio.play()
      } else {
        notification.error({
          message: "Sorry You lose. Try Again",
        });
        loseaudio.play()
      }
      
      return; 
    }
  
    const { search } = value;
  
    let nottext = Number(search)
    // Check if search input is valid
    if (search === undefined || search.trim() === "" || isNaN(nottext) ) {
      alert("Write Temp value, It must be a number");
      form.resetFields()
      return;
    }
  
    
    setResults((prev) => {
      const newRes = handleCheck(search, temp);
      if(newRes){
        winaudio.play()
      }else{
        loseaudio.play()
      }
      return [...prev, newRes];
    });
  
   
    setTimeout(() => {
      setCount(newCount);
      setMycity(cities[gamenums[newCount]]);
      form.resetFields()
    }, 0); 
  };
  


  const handleCheck = (search, temp)=>{
    let min = temp-4
    let max = temp + 4

    return search >= min && search <= max
  }

console.log(results)

  return (
    <div className="App">
      <h1>GameWe</h1>

      <div className="container">
        <span>Game created by Khach</span>

        <Flex vertical gap="small">
          <h2>{mycity || "click button to know result"}</h2>
          <Form layout="vertical" form={form} onFinish={handleInput}>
            <Form.Item name="search">
              <Input placeholder="Guess the city Tempriture" name="search" />
            </Form.Item>

            <Button htmlType="submit" className="button" type="primary">
              Check
            </Button>
          </Form>
        </Flex>

<div className="rounds">
<Flex  layout="horizonatal" gap="small">
         {
          results.map((item, i)=>{
            
            return(
              <div
              style={{ backgroundColor: item ? "green" : "red" }}
               key={i}  
              className="round"></div>
            )
          })
         }
        </Flex>
</div>
       

      </div>
    </div>
  );
}

export default App;
