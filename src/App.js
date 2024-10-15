import React, {  useEffect, useState } from 'react';
import { API_KEY } from './constants/constants';
import {Button, Flex, Form, Input} from "antd"




import './App.css';
import "./core/index.css"


let mycities = new Set()
while(mycities.size < 5){
  mycities.add(Math.floor(Math.random()*20))
}


function App() {

const [form] = Form.useForm()


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
  "Singapore"
];
// const [city, setCity] =useState(cities[0])



let gamenums = [...mycities]
console.log(gamenums)
const [count, setCount] = useState(0)
const [mycity, setMycity] =useState(cities[gamenums[count]])
const [temp, setTemp] = useState(0)

useEffect(()=>{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${mycity}&appid=${API_KEY}`
  fetch(url)
  .then(resp=>resp.json())
  .then(data=> {
    setTemp(Math.floor(data.main.temp-273.15) )
  })
}, [mycity])

const handleInput = async (value)=>{

  const newCount = (count + 1)

  if(newCount === 5) return

  setCount(newCount)
  setMycity(cities[gamenums[newCount]])


  const {search} = value

  form.resetFields()

  console.log(search, ">>>>")
  console.log(mycity, ">>>>")
  console.log(temp, ">>>>")
  


///// fetch part



}


  return (
    <div className="App">

<h1>GameWe</h1>

    <div className='container'>
     
<span>Game created by Khach</span>

<Flex vertical gap="small">
<h2>{mycity}</h2>
  <Form layout='vertical' form={form} onFinish={handleInput} >

<Form.Item
 name='search'
 >
<Input placeholder='enter a city name'  name='search'/>
</Form.Item>

<Button htmlType='submit' className="button" type='primary'>Check</Button>

  </Form>

</Flex>

<Flex layout="horizonatal" gap="small">
<div className='round'></div>
<div className='round'></div>
<div className='round'></div>
<div className='round'></div>
<div className='round'></div>
</Flex>

    </div>

    </div>
  );
}

export default App;
