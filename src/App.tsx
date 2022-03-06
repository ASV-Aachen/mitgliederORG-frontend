// import logo from './logo.svg';
import './App.css';
import { Header } from './components/header/header';
import { AllUsersTabelle } from './components/data/tabelle';

export var data: [String]

function App() {

  return (
    <div className="App">
      <Header UserName={"Christian"}/>
      <body>
        <AllUsersTabelle />
      </body>
      <footer>

      </footer>
    </div>
  );
}

export default App;
