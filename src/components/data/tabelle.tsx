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

export function AllUsersTabelle(){

    const [data, setData] = useState< | null>(null);
    const [loading, setloading] = useState(true);
  

    useEffect(() => {
        var temp = GET("/api")
        if(temp === null){

        }
        setData(GET("/"))
      }, [data]);
    
    


    return (
    <DataTable rows={rows} headers={headers}>
        {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getTableProps,
            onInputChange,
        }) => (
     <TableContainer title="DataTable" description="With filtering">
       <TableToolbar>
         <TableToolbarContent>
           {/* pass in `onInputChange` change here to make filtering work */}
           <TableToolbarSearch onChange={onInputChange} />
           <Button onClick={probs.NewMember}>Neues Mitglied</Button>
         </TableToolbarContent>
       </TableToolbar>
       <Table {...getTableProps()}>
         <TableHead>
           <TableRow>
             {headers.map((header) => (
               <TableHeader key={header.key} {...getHeaderProps({ header })}>
                 {header.header}
               </TableHeader>
             ))}
           </TableRow>
         </TableHead>
         <TableBody>
           {rows.map((row) => (
             <TableRow key={row.id} {...getRowProps({ row })}>
               {row.cells.map((cell) => (
                 <TableCell key={cell.id}>{cell.value}</TableCell>
               ))}
             </TableRow>
           ))}
         </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
  )
}