// import logo from './logo.svg';
import './App.css';
import { AppHeader } from './components/header/header';
import { AllUsersTabelle } from './components/data/tabelle';
import { Fragment } from 'react';

export var data: [String]

function App() {

  const newMember = () => {
    // TODO

  }

  return (
    <Fragment>
      <header>
        <AppHeader UserName={"Christian Baltzer"}/>
      </header>
      <body className="App">    
        <div className='body'>
          {/* <AllUsersTabelle newMember={newMember} rows={undefined} headers={undefined}/> */}
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
