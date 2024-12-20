import DynamicInfo from './components/DynamicInfo';
import StaticInfo from './components/StaticInfo';
import "./App.css";

function App() {
 

  return (
    <div style={{ textAlign: "center"}}>
      <h1>My Info Page - Vivacity Tech Exercise</h1>
      
      {<StaticInfo />}
      {<DynamicInfo />}
    </div> 
    
  );
};

export default App;
