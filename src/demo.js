import React, { useEffect, useState } from "react";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";

export default function DataGridDemo() {

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& div[data-rowIndex][role="row"]:nth-of-type(5n-4)': {
        color: "blue",
        fontSize: 18,
        //risky
        minHeight: "60px !important",
        height: 60,
        "& div": {
          minHeight: "60px !important",
          height: 60,
          lineHeight: "59px !important"
        }
      },
      "& .MuiDataGrid-renderingZone": {
        "& .MuiDataGrid-row": {
          "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
        }
      }
    }
  })
);

const handleCellClick = (param, event) => {
  console.log(param);
  console.log(event);
  if (param.colIndex === 2) {
    event.stopPropagation();
  }
};

const handleRowClick = (param, event) => {
  console.log("Row:");
  console.log(param);
  console.log(event);
};
const [rows,setRows] = useState([
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Amy", age: 42 },
  {
    id: 3,
    lastName: "IGOTAREALLyLONGNAME!!!!!!!",
    firstName: "Jaime",
    age: 45
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
  { id: 6, lastName: "Melisandre", firstName: "Jane", age: 15 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
]);



let rows2 = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Amy", age: 42 },
  {
    id: 3,
    lastName: "IGOTAREALLyLONGNAME!!!!!!!",
    firstName: "Jaime",
    age: 45
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
  { id: 6, lastName: "Melisandre", firstName: "Jane", age: 15 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }
];

const rows3 = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Amy", age: 42 },
  {
    id: 3,
    lastName: "IGOTAREALLyLONGNAME!!!!!!!",
    firstName: "Jaime",
    age: 45
  },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 12 },
  { id: 6, lastName: "Melisandre", firstName: "Jane", age: 15 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 }

]

const columns = [
  {
    field: "id",
    headerName: "ID",
    width: 70
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 130,
    renderCell: (cellValues) => {
      return (
        <div
          style={{
            color: "blue",
            fontSize: 18,
            width: "100%",
            textAlign: "right"
          }}
        >
          {cellValues.value}
        </div>
      );
    }
  },
  { field: "lastName", headerName: "Last Name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    //width: 90,
    minWidth: 90,
    flex: 1
    //align: "left"
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    minWidth: 160,
    flex: 2,
    //width: 160,
    valueGetter: (params) => {
      return `${params.getValue(params.id, "firstName") || ""} ${
        params.getValue(params.id, "lastName") || ""
      }`;
    }
  }
];
const[rowname,setRowName]=useState([]);



const handleChange = (event,value) => {

  setRowName(value);
  
};



useEffect(() => {
  if(rowname.length > 0){
  setRows(rows2.filter((elem) => rowname.find(({id}) => elem.id=== id)));

  console.log(rows2);
  } else {
    setRows(rows3);
  }
  
},[rowname]);

// useEffect(() => {
//   if(rowname.length > 0){
//     setRows2(rows2.filter((elem) => !rowname.find(({id}) => elem.id === id)));
//     console.log(rows2);
//     } else {
//       setRows(rows3);
//     }
    
//   },[rows]);

//   useEffect(() => {
//     if(rowname.length > 0){
//       setRows2(rows3);
//       console.log(rows2);
//       } else {
//         setRows(rows3);
//       }
      
//     },[rows2],[rows]);

  
  const classes = useStyles();

  console.log(rows);
  console.log(rows2);
  console.log(rowname);

  return (
    
    <><>
    <Autocomplete
    multiple={true}
    value={rowname}
    options={rows2.filter((elem) => !rowname.find(({id}) => elem.id === id))}
    getOptionLabel={(option) => option.firstName}
    onChange={handleChange}
    renderInput={(params) => (
      <TextField {...params} label="Label" variant="outlined" fullWidth />
    )}
    />
    </>
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rowHeight={120}
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
        onCellClick={handleCellClick}
        onRowClick={handleRowClick}
      />
      <div style={{ margin: "40px", textAlign: "center" }}>
        <a
          target="_blank"
          href="https://smartdevpreneur.com/the-ultimate-guide-to-customizing-material-ui-datagrid/"
        >
          How do you change DataGrid row height?
        </a>
      </div>
    </div>
    </>
  );
}
