import DynamicInfo from './components/DynamicInfo';
import StaticInfo from './components/StaticInfo';

function App() {
 

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>My Info Page - Vivacity Tech Exercise</h1>
      
      <p>static component below</p>
      {<StaticInfo />}
      {<DynamicInfo />}
    </div> 
    
  );
};

export default App;
