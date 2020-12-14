import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//import moment from 'moment';


export default function AddTraining (props) {
const [open, setOpen] = useState(false);

const [training, setTraining] = useState({date:'', duration: '', activity: ''})
 


const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleInputChange = (e) => {
  setTraining({...training, [e.target.name]:e.target.value}) 
   
};

const addTraining = () => {
  
    props.saveTraining(training);
    
    handleClose();
};

console.log(training.date)

  return (
    <div>
      <Button style={{margin: 10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add training
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
        <TextField
            margin="dense"
            name='date'
            label="Date"
            value={training.date}
            onChange={e  => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='duration'
            value={training.duration}
            label="Duration"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='activity'
            value={training.activity}
            label="Activity"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={addTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}