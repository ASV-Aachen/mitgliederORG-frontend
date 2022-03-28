// import logo from './logo.svg';
import './App.css';
import { AppHeader } from './components/header/header';
import { AllUsersTabelle } from './components/data/tabelle';
import { Fragment } from 'react';
import { ErrorModal } from './components/utils/modals';

export var data: [String]

function App(probs:{
  name: string
  loggedIn: boolean
}) {

  return (
    <Fragment>
      <header>
        <AppHeader UserName={probs.name}/>
      </header>
      <body className="App">    
        <div className='body'>
          {probs.loggedIn ? <AllUsersTabelle/> : ErrorModal("Anmelde Fehler! Du bist nicht angemeldet oder hast nicht genug Rechte.")}
        </div>
      </body>
      <footer>
        <h2>Made with 🖥 and ❤️</h2>
        <p>Always Happy Coding </p>
      </footer>
    </Fragment>
  );
}

export default App;
