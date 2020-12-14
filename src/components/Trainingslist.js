import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AddTraining from './Addtraining';
import EditTraining from './Edittraining';
import moment from 'moment';
import 'moment/locale/fi';
import DeleteIcon from '@material-ui/icons/Delete';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

export default function Trainingslist(){
const [trainings, setTrainings] = useState([{date: '', duration:'', activity: '', links:[{}]}]);

const [open, setOpen] = useState(false);
useEffect (() => fetchData() , []);

const fetchData = () => {
fetch('https://customerrest.herokuapp.com/api/trainings')
.then(response => response.json())
.then(data => setTrainings(data.content))
}


console.log(trainings)

const VerifyDelete = () => {
     
    setOpen(true);
} 

const handleClose = () => {
    setOpen(false)
}

const saveTraining = (training) => {
    fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(training)
})
    .then(res => fetchData())
    .catch(err => console.error(err))

}


const upDateTraining = (training, link) => {
    fetch(link, {
        method: 'PUT',
        headers: {
            'Content-type':'application/json'
        },
        body:JSON.stringify(training)
})
    .then(res => fetchData())
    .catch(err => console.error(err)) 
}

const deleteTraining = (link) => {
    if(window.confirm('Do you really want to delete this training?')) {
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
        width: 70,
        Cell: row => <EditTraining upDateTraining={upDateTraining} training={row.original} />
    },
    {
        sortable: false,
        filterable: false,
        width:50,
        accessor: 'links[0].href',
        Cell: row => <Button startIcon={<DeleteIcon />} size='small' color='secondary' 
        onClick={() => deleteTraining(row.value)}>
            </Button>
    },
    {
        Header: 'Date',
        accessor: 'date',
       Cell: row => moment(row.value).format('l, LT'),
       width: 'auto',
    },
    {
        Header: 'Duration',
        accessor: 'duration',
        width: 'auto',
    },
    {
        Header: 'Activity',
        accessor: 'activity',
        width: 'auto',
    },
    
    
   
]
    return (
    <div >
      <AddTraining saveTraining={saveTraining}/>
      <ReactTable filterable={true} data={trainings} columns={columns}/>
      <Snackbar 
      anchorOrigin={{vertical:'top', horizontal:'center'}}
      open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Training deleted succesfully!
        </Alert>
      </Snackbar>
    </div>
    )
}

