import userEvent from "@testing-library/user-event";
import { Arbeitsstunden, Data, Keycloak, Website } from "./ApiData";

export interface User{
    id:                 string
    Email:              string
    username:           string
    first_name:         string
    last_name:          string

    website:            Website
    arbeitsstuden:      Arbeitsstunden
    keycloak:           Keycloak
}

export interface UserData{
    data:          User[]
}

export function transformData(json:Data): UserData {
    var erg: UserData = {
        data: []
    }
    json.WEBSITE.forEach((site)=>{
        var erg_key:                Keycloak
        var erg_arbeitsstunden:     Arbeitsstunden

        // TODO: Funktion optimieren
        var erg_key = json.KEYCLOAK.filter((el) => {return el.Email === site.email})[0]
        var erg_arbeitsstunden = json.ARBEITSSTUNDEN.filter((el) => {return el.email === site.email})[0]

        try {
            var temp: User = {
                website: site,
                keycloak: erg_key,
                arbeitsstuden: erg_arbeitsstunden,
                id: erg_key.id,
                Email: erg_key.Email,
                username: erg_key.username,
                first_name: erg_key.first_name,
                last_name: erg_key.last_name
            }
            erg.data.push(temp)
        } catch (error) {
            // TODO: Was machen wir wenn nutzer nur in Keycloak oder nur in der AB Datenbank stehen?
            // console.error(error)   
        }
    })

    return erg
}