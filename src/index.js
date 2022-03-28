import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './index.css';
import Keycloak from 'keycloak-js'
import Cookies from 'universal-cookie';

//keycloak init options
let initOptions = {
    url:            process.env.REACT_APP_KEYCLOAK_URL, 
    realm:          process.env.REACT_APP_KEYCLOAK_REALM, 
    clientId:       process.env.REACT_APP_KEYCLOAK_CLIENTID, 
    onLoad:         'login-required'
}


let keycloak = Keycloak(initOptions);

keycloak.redirectUri = process.env.REACT_APP_KEYCLOAK_REDIRECT_URL

var loggedIn = false

var rolesWithAcess =[
    'Admin',
    'Entwickler',
    'Schriftwart',
]

keycloak.init({ onLoad: initOptions.onLoad })
    .then((auth) => {
        if (!auth) {
            window.location.reload();
        } else {
            console.info("Authenticated");
        }
    }).then(() => {
        const cookies = new Cookies();
        cookies.set('token', keycloak.token, { path: '/' });

        function findCommonElements(arr1, arr2) {
            return arr1.some(item => arr2.includes(item))
        }

        if (findCommonElements(keycloak.tokenParsed.realm_access.roles, rolesWithAcess)){
            loggedIn = true
        }else{
            throw Error
        }
    }).finally(() => {
        //React Render
        ReactDOM.render(
          <React.StrictMode>
            <App name={keycloak.tokenParsed.given_name + " " + keycloak.tokenParsed.family_name} loggedIn = {true}/>
          </React.StrictMode>,
          document.getElementById('root')
        );        
    }).catch(() => {
        console.error("Authenticated Failed");
        ReactDOM.render(
            <React.StrictMode>
              <App name={""} loggedIn = {false}/>
            </React.StrictMode>,
            document.getElementById('root')
          );        
    });
console.info(keycloak)

export default keycloak;