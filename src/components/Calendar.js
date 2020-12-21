import React, {useState, useEffect} from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
//import MyEventsList from './events';
import moment from "moment";
import 'moment/locale/fi'
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("fi");
const localizer = momentLocalizer(moment);

export default function Calendarview(){

   const [trainings, setTrainings] = useState([{date:'', duration:'', activity:'', customer:{id:Number, firstname:'', lastname:''}}])

    useEffect(()=> fetchData(), [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const events= trainings.map((appointment)=>{
        return {
          id: appointment.id,
          title: `${appointment.activity}:${appointment.customer.firstname} ${appointment.customer.lastname}`,
          start: new Date(appointment.date),
          end: new Date(appointment.date),
          allDay: false,
        }
      })

    return (
        <div>
            <Calendar 
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={['month', 'day', 'week']}
        style={{height: 450}}
        
        />
        </div>
    )
}