// Header der Seite
import React, {Fragment, useState} from "react";
import { Navbar, Container } from "react-bootstrap"

// Beinhaltet das Logo und Navigationsbuttons

export function Header(props: {
    UserName: String
}) {

    return (
        <Fragment>
            <Navbar bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="/logo_offiziell_17_-01.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />
                    ASV-Aachen Mitglieder
                </Navbar.Brand>

                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">

                <Navbar.Text>
                    Angemeldet als: {probs.UserName}
                </Navbar.Text>

                </Navbar.Collapse>
                </Container>
            </Navbar>
        </Fragment>
    )
    
}