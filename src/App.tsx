import { useState } from 'react'
import { Timer } from './components/Timer'
import { Sign } from './components/Sign'
import './App.css'

function App() {
  const [timeUntil, setTimeUntil] = useState(0);
  const dateParameter = new URLSearchParams(window.location.search).get("date");
  let targetDate: Date | null = null;

  if (dateParameter) {
    const [year, month, day] = dateParameter.split("-").map(Number);
    const target = new Date(year, month - 1, day);
    targetDate = isNaN(target.getTime()) 
      || target.getFullYear() !== year 
      || target.getMonth() !== month - 1 
      || target.getDate() !== day 
      ? null : target;
  }


  return (
    <>
      <div className='timer-container'>
        <Timer timeUntil={timeUntil} setTimeUntil={setTimeUntil} targetDate={targetDate}/>
        <Sign />
      </div>
    </>
  )
}

export default App
