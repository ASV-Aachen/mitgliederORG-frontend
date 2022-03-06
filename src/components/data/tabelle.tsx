// Darstellen der Infos aus dem Backend als Tabelle Filtering DataTable
// Jede Zeile bekommt ein Overflow Menü für Einstellungen und options

import React, { useEffect, useState } from 'react';
import {
    Button,
    DataTable,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
    TableToolbar,
    TableToolbarContent,
    TableToolbarSearch,
} from 'carbon-components-react';
import { GET } from '../utils/connect';
import { userData } from "./UserData"
import { ProgressBar } from 'react-bootstrap';


export function AllUsersTabelle(props: {
  newMember: Function
  rows: any
  headers: any
}){

    const [data, setData] = useState< userData| null>(null);
    const [loading, setloading] = useState(true);
  

    useEffect(() => {
        var temp = GET("/api")
        if(temp === null){

        }
      }, [data]);
    
    


    return (
    <DataTable rows={props.rows} headers={props.headers}>
      {
      ({ rows, headers, getHeaderProps, getRowProps, getTableProps, onInputChange }) => (
     <TableContainer title="DataTable" description="With filtering">
       <TableToolbar>
         <TableToolbarContent>
           {/* pass in `onInputChange` change here to make filtering work */}
           <TableToolbarSearch onChange={onInputChange} />
           <Button/>
         </TableToolbarContent>
       </TableToolbar>
       <Table {...getTableProps()}>
         <TableHead>
           <TableRow>
             {headers.map((header: { key: React.Key | null | undefined; header: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
               <TableHeader key={header.key} {...getHeaderProps({ header })}>
                 {header.header}
               </TableHeader>
             ))}
           </TableRow>
         </TableHead>
         <TableBody
           {...rows.map((row: { id: React.Key | null | undefined; cells: any[]; }) => (
             <TableRow key={row.id} {...getRowProps({ row })}>
               {row.cells.map((cell: { id: React.Key | null | undefined; value: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                 <TableCell key={cell.id}>{cell.value}</TableCell>
               ))}
             </TableRow>
           ))}>
         </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
  )
}