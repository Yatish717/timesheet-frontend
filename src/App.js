import logo from './logo.svg';
import './App.css';
import Dashboard from './Pages/Dashboard';
import User1 from './Pages/User';
 import LoginPage from './Pages/Login';
  import TimeSheet from './Pages/Timesheet1';
 import Dashboard1 from './Pages/employee';
//  import Calander1 from './Pages/Calander'
import Cal1 from './Pages/Calander1';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Cal1/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
