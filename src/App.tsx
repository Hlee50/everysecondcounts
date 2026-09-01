import { useState } from 'react'
import { DatePicker } from './components/DatePicker'
import { Timer } from './components/Timer'
import { Sign } from './components/Sign'
import github from "./assets/images/iconmonstr-github-1.svg"
import copy from "./assets/images/iconmonstr-copy-lined.svg"
import check from "./assets/images/iconmonstr-check-mark-lined.svg"
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  return (
    <>
      <a href="https://github.com/Hlee50/everysecondcounts" target="_blank" rel="noopener noreferrer">
        <img src={github} className="github-icon"/>
      </a>
      <button className="copy-button" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy"} title={copied ? "Link copied" : "Copy link"}>
        <img src={copied ? check : copy} alt="" />
      </button>
      <DatePicker selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <div className="timer-container">
        <Timer countdownDate={selectedDate}/>
        <Sign />
      </div>
    </>
  );
}

export default App
