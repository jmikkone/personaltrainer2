import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create';

export default function Editcustomer (props) {
const [open, setOpen] = useState(false);

const [customer, setCustomer] = useState({firstname: '', lastname: '', streetaddress: '', postcode: '',
city: '', email: '', phone: ''})

const handleClickOpen = () => {
    console.log(props.customer)
    setCustomer({firstname: props.customer.firstname, lastname: props.customer.lastname, 
      streetaddress: props.customer.streetaddress, postcode: props.customer.postcode, 
      city: props.customer.city, email: props.customer.email, phone: props.customer.phone})
   
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleInputChange = (e) => {
    setCustomer({...customer, [e.target.name]:e.target.value})
};

const upDateCustomer = () => {
    props.upDateCustomer(customer, props.customer.links[1].href);
    handleClose(); 

    console.log(customer, props.customer.links[1].href)
};

  return (
    <div>
      <Button startIcon={<CreateIcon />} size="small" 
      color="primary" onClick={handleClickOpen}>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name='firstname'
            value={customer.firstname}
            label="First name"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='lastname'
            value={customer.lastname}
            label="Last name"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='email'
            value={customer.email}
            label="Email"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
          <TextField
            margin="dense"
            name='phone'
            value={customer.phone}
            label="Phone"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='streetaddress'
            value={customer.streetaddress}
            label="Address"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='postcode'
            value={customer.postcode}
            label="Postcode"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           <TextField
            margin="dense"
            name='city'
            value={customer.city}
            label="City"
            onChange={e => handleInputChange(e)}
            fullWidth
          />
           
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}  color="primary">
            Cancel
          </Button>
          <Button onClick={upDateCustomer} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}