// Modal for a new user

import { Button, Modal, Tooltip, TextInput, Select, SelectItem, DatePicker, DatePickerInput, Form } from "carbon-components-react";
import { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import { person } from "../interface/person";
import { POST } from "../utils/connect";
import { ErrorModal } from "../utils/modals";



function NewUser_Form(probs:{
    setOpen: Function
    setloading: Function
}){

    var mail: string            = ""
    var first_name: string      = ""
    var last_name: string       = ""
    var entryDate: string       = ""
    var status: string          = ""
    var image: File | null     

    function doStuff(){
        
        // send to backend
        var data: person = {
            mail: mail,
            first_name: first_name,
            last_name: last_name,
            entryDate: entryDate,
            status: status
        }

        var success = POST("/api", data, image)

        if (success === true){
            // Success
            probs.setOpen(false)
            probs.setloading(true)

        }else{
            // error
            
            probs.setOpen(false)
            ErrorModal(success)
        }
    }

    return (
        <Form>
            <TextInput
                data-modal-primary-focus
                id="mail"
                labelText="E-Mail"
                placeholder=""
                style={{ marginBottom: '1rem' }}
                onChange = {(event) => mail = event.target.value}
                required
            />
            <TextInput
                data-modal-primary-focus
                id="first_name"
                labelText="Vorname"
                placeholder=""
                style={{ marginBottom: '1rem' }}
                onChange = {(event) => first_name = event.target.value}
                required
            />
            <TextInput
                data-modal-primary-focus
                id="last_name"
                labelText="Nachname"
                placeholder=""
                style={{ marginBottom: '1rem' }}
                onChange = {(event) => last_name = event.target.value}
                required
            />
                <DatePicker datePickerType="single">
                    <DatePickerInput
                        placeholder="mm/dd/yyyy"
                        labelText="Eingetreten am"
                        id="entryDate"
                        onChange = {(event) => entryDate = event.target.value}
                    />
                    </DatePicker>
                <Select 
                    id="status" 
                    defaultValue="1" 
                    labelText="Status"
                    onChange = {(event) => status = event.target.value}
                    >
                        <SelectItem value="1" text= "Anwärter" /> 
                        <SelectItem value="2" text= "Aktiv" /> 
                        <SelectItem value="3" text= "Inaktiv" /> 
                        <SelectItem value="4" text= "Alter Herr" />
                        <SelectItem value="5" text= "Außerordentliches Mitglied" />
                        <SelectItem value="6" text= "Ehrenmitglied" /> 
                </Select>
                <div>
                    <br/>
                    <label htmlFor="image">Du kannst auch sofort ein Profilbild hochladen (optional)</label>
                    <br/>
                    <br/>

                    <input 
                        type="file"
                        id="image" name="image"
                        accept="image/png, image/jpeg"
                        onChange = {(event) => image = event.target.files![0]}
                        >
                    </input>
                </div>

                <br/>

                <Button type="submit" onClick={doStuff}>
                    Neu anlegen
                </Button>

            </Form>
    )
}

function NewUser_Modal(probs: {
    ModalStateManager
    setloading: Function
}) {

    return (
    <probs.ModalStateManager
        renderLauncher={({ setOpen }) => (
          <Button onClick={() => setOpen(true)}>Neuer Nutzer</Button>
        )}>
        {({ open, setOpen }) => (
          <Modal
            modalHeading="Neuen Nutzer einfügen"
            modalLabel="Account resources"
            primaryButtonDisabled= {true}
            secondaryButtonText="Cancel"
            open={open}
            onRequestClose={() => setOpen(false)}
            shouldSubmitOnEnter={true}
            hasForm={true}
            >
                
            <p style={{ marginBottom: '1rem' }}>
              Hier kann ein neuer Nutzer für die ASV Infrastruktur angelegt werden. 
              Wird der Nutzer angelegt wird automatisch ein Password erstellt und per Mail an den Nutzer verschickt.

              Sollte der Nutzer nach 24 Stunden keine Mail erhalten haben, wende dich bitte an einen Admin.
            </p>
            
            <NewUser_Form setOpen={setOpen} setloading={probs.setloading}/>
          </Modal>
        )}
      </probs.ModalStateManager>
    )
}

export const NewUser_StateManager = (
    probs:{
        setloading: Function
    }
) => {
    /**
     * Simple state manager for modals.
     */
    const ModalStateManager = ({
      renderLauncher: LauncherContent,
      children: ModalContent,
    }) => {
      const [open, setOpen] = useState(false);
      return (
        <>
          {!ModalContent || typeof document === 'undefined'
            ? null
            : ReactDOM.createPortal(
                <ModalContent open={open} setOpen={setOpen} />,
                document.body
              )}
          {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
        </>
      );
    };
    return (
      <NewUser_Modal ModalStateManager={ModalStateManager} setloading={probs.setloading}></NewUser_Modal>
    );
  };
  
