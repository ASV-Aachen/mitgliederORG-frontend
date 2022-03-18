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
} from 'carbon-components-react';
import { GET } from '../utils/connect';
import { userData } from "./UserData"
import { ProgressBar } from 'react-bootstrap';
import { Data } from '../interface/ApiData';
import { transformData, UserData } from '../interface/UserData';
import { testdata } from './testdata';


export function AllUsersTabelle(){

    // const [data, setData] = useState< UserData| null>(null);
    // const [loading, setloading] = useState(true);
  
    // Designing Purposes
    var data = transformData(testdata)
    var loading = false

    // useEffect(() => {
    //     fetch(`/api`)
    //       .then((response) => {
    //         if(response.ok){
    //           return response.json()
    //         }
    //         throw response
    //       })
    //       .then((json: Data)=>{
    //         setData(transformData(json))
    //         setloading(false);
    //       })
    //       .catch((error) => {
    //         console.error("Error fetching data: ", error);
    //         setloading(false);
    //       });  

    //   }, [data]);
    
      if (loading){
        return (
            <DataTableSkeleton />
        );
      }
  
    var temp = [
      ["id","ID"],
      ["Email","E-Mail"],
      ["first_name","Vorname"],
      ["last_name","Nachname"],
      ["username","UserName"],
    ]

    var headers: any = [];

    temp.forEach((element) => {
      headers.push({
        key: element[0],
        header: element[1],
      });
    });



    return (
    <DataTable rows={data!.data} headers={headers}>
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
           <Button>Neuer User</Button>
         </TableToolbarContent>
       </TableToolbar>
       <Table {...getTableProps()}>
       <TableHead>
            <TableRow>
              <TableExpandHeader id="expand" />
              {headers.map((header, i) => (
                <TableHeader
                  id={header.header}
                  key={i}
                  {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
         <TableBody>
          {rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableExpandRow {...getRowProps({ row })}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableExpandRow>
                <TableExpandedRow colSpan={headers.length + 1}>
                  <h6>Expandable row content</h6>
                  <div>Description here</div>
                </TableExpandedRow>
              </React.Fragment>
            ))}
         </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
  )
}