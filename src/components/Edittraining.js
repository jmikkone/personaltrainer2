import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import 'moment/locale/fi';

export default function EditTraining (props) {
const [open, setOpen] = useState(false);

const [training, setTraining] = useState({date: '', duration: '', activity: ''})

const handleClickOpen = () => {
    console.log(props.training.date)
    setTraining({date: props.training.date, duration: props.training.duration, activity: props.training.activity})
   const date = moment(props.training.date).format('l, LT')
   setTraining({...training, date:date})

   console.log(date)
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleInputChange = (e) => {
    setTraining({...training, [e.target.name]:e.target.value})
};

const upDateTraining = () => {
    props.upDateTraining(training, props.training.links[1].href);
    handleClose(); 

    console.log(training, props.training.links[1].href)
};

  return (
    <div>
      <Button startIcon={<CreateIcon />} size="small" 
      color="primary" onClick={handleClickOpen}>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name='date'
            format={moment(training.date).format('l, LT')}
            value={training.date}
            label="Date"
            onChange={e => handleInputChange(e)}
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
          <Button onClick={handleClose}  color="primary">
            Cancel
          </Button>
          <Button onClick={upDateTraining} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}