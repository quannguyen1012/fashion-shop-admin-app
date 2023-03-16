import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Input } from 'antd';

function Customers(){

  const [customers, setCustomers] = useState([]);

  const token = localStorage.getItem("accessToken");
  console.log("token 3: " + token);

   const config = {
    'headers': {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };



  useEffect(() => {
    if (customers.length === 0) {
        loadCustomers();
    }
  },[customers]);

  const handleSearch = async (value) =>{
    const result = await axios.get(`http://localhost:8080/api/v1/customers?search=${value}`, config);
    setCustomers(result.data);
  }

  const loadCustomers = async () => {
    const result = await axios.get(`http://localhost:8080/api/v1/customers?search`, config);
    setCustomers(result.data);
  };


    const columns = [
      { field: 'id', headerName: 'ID', width: 50 },
      {
        field: 'email',
        headerName: 'Email',
        width: 150,
        editable: true,
      },
      {
        field: 'firstName',
        headerName: 'First Name',
        width: 150,
        editable: true,
      },
      {
        field: 'lastName',
        headerName: 'Last Name',
        width: 150,
        editable: true,
      },
      {
        field: 'phoneNumber',
        headerName: 'Phone',
        width: 150,
        editable: true,
      },
      {
        field: 'addressLine2',
        headerName: 'Address Line',
        width: 150,
        editable: true,
      },
      
    ];

  
    return (
      <div>
    <Input.Search placeholder="input search text" onSearch={handleSearch} />
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={customers}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
    </div>

    );
};

export default Customers;
