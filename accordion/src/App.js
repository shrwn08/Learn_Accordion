import { useEffect } from 'react';
import './App.css';
import Accordion from './component/Accordion';

function App() {
  
  return (
    <div className="App h-screen w-full bg-zinc-700 flex justify-center items-center flex-col gap-5">
      <Accordion />
    </div>
  );
}

export default App;
