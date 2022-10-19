import React, { useEffect } from 'react'
import './App.css';
import { useTelegram } from './hook/useTelegram';


function App() {
  const { onToggleButton, tg } = useTelegram();

  useEffect(() => {
    tg.ready()
  }, [])

  
  return (
    <div className="App">
     Work
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
