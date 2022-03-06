// Header der Seite
import { HeaderGlobalAction, HeaderGlobalBar, HeaderMenu, HeaderNavigation, HeaderMenuItem, HeaderName, Header } from "carbon-components-react";
import React, {Fragment, useState} from "react";
import { AppSwitcher20 } from '@carbon/icons-react';

// Beinhaltet das Logo und Navigationsbuttons

export function AppHeader(props: {
    UserName: String
}) {

    return (
        <Fragment>
            <Header>
                <HeaderMenuItem>
                    <img
                        alt=""
                        src="/logo_offiziell_17_-04.png"
                        // width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </HeaderMenuItem>
                <HeaderName href="#home" prefix="ASV">
                    Mitglieder Verwaltung
                </HeaderName>
                <HeaderMenuItem >
                    <p>Angemeldet als: {props.UserName}</p>
                </HeaderMenuItem>
                <HeaderNavigation aria-label="IBM [Platform]">
                    <HeaderMenuItem href="#home">Zurück zur Website</HeaderMenuItem>
                </HeaderNavigation>
            </Header>
        </Fragment>
    )
    
}