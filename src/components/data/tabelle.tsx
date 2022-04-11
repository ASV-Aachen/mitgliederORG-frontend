// Darstellen der Infos aus dem Backend als Tabelle Filtering DataTable
// Jede Zeile bekommt ein Overflow Menü für Einstellungen und options

import React, { useEffect, useState } from 'react';
import {
    Button,
    DataTable,
    DataTableSkeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableExpandedRow,
    TableExpandRow,
    TableHead,
    TableHeader,
    TableRow,
    TableToolbar,
    TableToolbarContent,
    TableExpandHeader,
    TableToolbarSearch,
    OverflowMenu,
    OverflowMenuItem,
    TableToolbarAction,
    TableToolbarMenu,
} from 'carbon-components-react';

import { transformData, UserData } from '../interface/UserData';
import { testdata } from './testdata';
import { NewUser_StateManager } from '../formular/newUser';
import { person } from '../interface/person';
import { POST } from '../utils/connect';
import { Data } from '../interface/ApiData';
import { ErrorModal } from '../utils/modals';
import Cookies from 'universal-cookie';


export function AllUsersTabelle(){

    const [data, setData] = useState< UserData| null>(null);
    const [loading, setloading] = useState(true);
    const [failed, setFailed] = useState <string | null>(null);
  
    // Designing Purposes
    // var data = transformData(testdata)
    // var loading = false
    // var setloading= (loading: boolean) => {

    // }

    useEffect(() => {
        fetch(`/mitgliederDB/api`, {
          credentials: "same-origin",
          method: 'GET'
        })
          .then((response) => {
            if(response.ok){
              return response.json()
            }
            throw response
          })
          .then((json: Data)=>{
            setData(transformData(json))
            setloading(false);
          })
          .catch((error) => {
            console.error("Error fetching data: ", error);
            if(error.status === 401){
              setFailed("Nicht authorized")
            }else{
              setFailed("Error " + error.status + "-" + error.statusText)
            }
          });  

      }, [loading]);

    if (failed !== null){
      return ErrorModal(failed)
    }

    if (loading){
      return (
          <DataTableSkeleton />
      );
    }
  
    var temp = [
      ["status","Status"],
      ["Email","E-Mail"],
      ["first_name","Vorname"],
      ["last_name","Nachname"],
      ["username","UserName"],
      ["has_arbeitsstundenAccount", "Arbeitsstunden Account"]
    ]

    var headers: any = [];

    temp.forEach((element) => {
      headers.push({
        key: element[0],
        header: element[1],
      });
    });



    return (
    <DataTable rows={data!.data} headers={headers} isSortable>
      {
      ({ rows, headers, getHeaderProps, getRowProps, getTableProps, onInputChange }) => (
     <TableContainer>
       <TableToolbar>
         <TableToolbarContent>
           {/* pass in `onInputChange` change here to make filtering work */}
           <TableToolbarSearch
              onChange={onInputChange}
              onFocus={(event, handleExpand) => {
                handleExpand(event, true);
              }}
              onBlur={(event, handleExpand) => {
                const { value } = event.target;
                if (!value) {
                  handleExpand(event, false);
                }
              }}
            />
           {/* <Button>Neuer User</Button> */}
           <TableToolbarMenu light>
              <TableToolbarAction>
                Accounts syncen
              </TableToolbarAction>
              <TableToolbarAction>
                CSV Datei importieren
              </TableToolbarAction>
            </TableToolbarMenu>
           <NewUser_StateManager setloading={setloading}/>
         </TableToolbarContent>
       </TableToolbar>
       <Table {...getTableProps()}>
       <TableHead>
            <TableRow>
              {headers.map((header, i) => (
                <TableHeader
                  id={header.header}
                  key={i}
                  {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
              <TableExpandHeader id="expand" />
            </TableRow>
          </TableHead>
         <TableBody>
         {rows.map((row) => (
              <TableRow key={row.id} {...getRowProps({ row })}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
                  <TableCell>
                    <OverflowMenu size="sm" light flipped>
                      <OverflowMenuItem itemText="löschen"/>
                    </OverflowMenu>
                  </TableCell>
              </TableRow>
            ))}
         </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
  )
}