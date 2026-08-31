import { useState } from 'react'
import { DatePicker } from './components/DatePicker'
import { Timer } from './components/Timer'
import { Sign } from './components/Sign'
import './App.css'

function App() {
  const dateParam = new URLSearchParams(window.location.search).get('date');
  const today = new Date();
  let parsedDate: Date = today;
  

  if (dateParam) {
    const [year, month, day] = dateParam.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    parsedDate = isNaN(date.getTime())
      || date.getFullYear() !== year 
      || date.getMonth() !== month - 1 
      || date.getDate() !== day 
      || date > new Date(today.getFullYear() + 10, today.getMonth(), today.getDate())
      ? today : date;
  }

  const [selectedDate, setSelectedDate] = useState<Date>(parsedDate);

  return (
    <>
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <div className="timer-container">
        <Timer countdownDate={selectedDate}/>
        <Sign />
      </div>
    </>
  );
}

export default App
