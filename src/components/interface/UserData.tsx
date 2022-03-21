import { Arbeitsstunden, Data, Keycloak, Website } from "./ApiData";

export interface User{
    id:                 string
    Email:              string
    username:           string
    first_name:         string
    last_name:          string
    status:             string

    website:            Website
    arbeitsstuden:      Arbeitsstunden | undefined
    keycloak:           Keycloak
}

export interface UserData{
    data:          User[]
    deaktivated:   User[]
}

function status(statusID: string): string{
    switch (statusID) {
        case "1": return "Anwärter"; 
        case "2": return "Aktiv"; 
        case "3": return "Inaktiv"; 
        case "4": return "Alter Herr"; 
        case "5": return "Außerordentliches Mitglied"; 
        case "6": return "Ehrenmitglied"; 
        default: return "Status not found" 
    }
}

export function transformData(json:Data): UserData {
    var erg: UserData = {
        data: [],
        deaktivated: []
    }
    json.WEBSITE.forEach((site)=>{
        var erg_key:                Keycloak
        var erg_arbeitsstunden:     Arbeitsstunden

        // TODO: Funktion optimieren
        var erg_key = json.KEYCLOAK.filter((el) => {return el.Email === site.email})[0]
        if (site.email !== "" && erg_key !== undefined && site !== undefined){
            var erg_arbeitsstunden = json.ARBEITSSTUNDEN.filter((el) => {return el.email === site.email})[0]

            var temp: User = {
                website: site,
                keycloak: erg_key,
                arbeitsstuden: erg_arbeitsstunden,

                id: erg_key.id,
                status: status(site.status), 
                Email: erg_key.Email,
                username: erg_key.username,
                first_name: erg_key.first_name,
                last_name: erg_key.last_name
            }

            if (!site.is_active && !erg_key.enabled ){
                erg.deaktivated.push(temp)
            }else{
                erg.data.push(temp)
            }
        }
    })

    return erg
}