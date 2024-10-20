import './App.css';
import Home from "./Home"
function App() {

  // initialize Local Storage
  const reset = [];
  if(JSON.parse(localStorage.getItem(process.env.REACT_APP_READED)) === null ){
    localStorage.setItem(process.env.REACT_APP_READED,JSON.stringify(reset));
  }

  if(JSON.parse(localStorage.getItem(process.env.REACT_APP_FAVORITE)) === null){
    localStorage.setItem(process.env.REACT_APP_FAVORITE,JSON.stringify(reset));
  }
  
  return (
    <div className="App bg-whitebg-1 min-h-screen w-[100%] font-sans">
      <Home/>
    </div>
  );
}

export default App;
