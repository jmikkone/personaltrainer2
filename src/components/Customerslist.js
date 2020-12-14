
import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Addcustomer from './Addcustomer';
import Editcustomer from './Editcustomer';
import DeleteIcon from '@material-ui/icons/Delete';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

export default function Customerslist(){
const [customers, setCustomers] = useState([{}]);
const [open, setOpen] = useState(false);
useEffect (() => fetchData() , []);

const fetchData = () => {
fetch('https://customerrest.herokuapp.com/api/customers')
.then(response => response.json())
.then(data => setCustomers(data.content))
}


const VerifyDelete = () => {
     
    setOpen(true);
}

const handleClose = () => {
    setOpen(false)
}

const saveCustomer = (customer) => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(customer)
})
    .then(res => fetchData())
    .catch(err => console.error(err))

}

console.log(customers)

const upDateCustomer = (customer, link) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(customer)
})
    .then(res => fetchData())
    .catch(err => console.error(err)) 
}

const deleteCustomer = (link) => {
    if(window.confirm('Do you really want to delete the customer?')) {
    fetch(link, {method: 'DELETE'})
    .then(res => VerifyDelete())
    .then(res => fetchData())
    
    .catch(err =>console.error(err))
    } 
console.log(link)
}



const columns = [
    {
        Header: 'Actions',
        sortable:false,
        filterable:false,
        width:'auto',
        Cell: row => <Editcustomer upDateCustomer={upDateCustomer} customer={row.original} />
    },
    {
        sortable: false,
        filterable: false,
        width: 'auto',
        accessor: 'links[0].href',
    Cell: row => <Button startIcon={<DeleteIcon />} size='small' color='secondary' 
        onClick={() => deleteCustomer(row.value)}>
            </Button>
    },
    {
        Header: 'First name',
        accessor: 'firstname',
        width: 'auto',
    },
    {
        Header: 'Last name',
        accessor: 'lastname',
        width: 'auto',
    },
    {
        Header: 'Email',
        accessor: 'email',
        width: 'auto',
    },
    {
        Header: 'Phone',
        accessor: 'phone',
        width: 'auto',
    },
    {
        Header: 'Address',
        accessor: 'streetaddress',
        width: 'auto',
    },
    {
        Header: 'Postcode',
        accessor: 'postcode',
        width: 'auto',
    },
    {
        Header: 'City',
        accessor: 'city',
        width: 'auto',
    },
   
]
    return (
    <div >
      <Addcustomer saveCustomer={saveCustomer}/>
      <ReactTable filterable={true} data={customers} columns={columns}/>
      <Snackbar 
      anchorOrigin={{vertical:'top', horizontal:'center'}}
      open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Car deleted succesfully!
        </Alert>
      </Snackbar>
    </div>
    )
}

