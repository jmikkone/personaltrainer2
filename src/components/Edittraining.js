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


/* 
Tähänkin jätin näitä ulos kommentoituja asioita,
jotta hahmottuu edes osa, mitä kaikkea on tullut kokeiltua.
Tässä ongelmaksi muodostui, että trainingsList:ssä saan formatoitua ajan,
mutta tässä en onnistu formatoimaan aikaa enää takaisin, ilman, että
alkaa muuttamaan aikaa jo siinä vaiheessa, kun käyttäjä sitä syöttää, ja 
näin ollen käyttäjä ei pysty syöttämään haluamaansa aikaa. Ilmeni myös joukko
variaatioita tästä erilaisilla kokeiluilla.
*/

export default function EditTraining (props) {
const [open, setOpen] = useState(false);
//const [date, setDate]= useState()
const [training, setTraining] = useState({date:'', duration: '', activity: ''})

const [trainingArr, setTrainingArr]= useState({date:'', duration:'', activity:''})

const handleClickOpen = () => {
    console.log(props.training.date)
    const date = moment(props.training.date).format('D.MM.yyyy h:mm')
    setTraining({date:date, duration: props.training.duration, activity: props.training.activity})
  
 console.log(training.date)

   
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleInputChange = (e) => {
    setTrainingArr({...trainingArr, [e.target.name]:e.target.value})
    
};

/*
const handleInputChange2 = (e) => {
  console.log(e.target.value)
  setTraining({...training, [e.target.name]:e.target.value})
  setDate(moment(e.target.value, 'D.MM.yyyy hh:mm').toISOString())

  setTrainingArr({...trainingArr, [e.target.name]:date})
 
  //setTraining({...training, [e.target.name]:e.target.value})
  //const dt= moment(training.date, "D.MM.yyy h:mm").toISOString();
  
  //setTraining({...training, date:dt})
  //console.log(dt)
  console.log(training.date)
  
};
*/
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
            placeholder='D.MM.YYYY h:mm'
            type='datetime'
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