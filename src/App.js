import React, { useEffect } from 'react'
import './App.css';
import Header from './components/Header/Header';
import { useTelegram } from './hook/useTelegram';


function App() {
  const { onToggleButton, tg } = useTelegram();
  
  useEffect(() => {
    tg.ready()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <Header />
      <button onClick={onToggleButton}>toggle</button>
    </div>
  );
}

export default App;
