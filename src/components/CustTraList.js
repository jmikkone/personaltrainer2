

import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

  

export default function CustTraList(){
const [customers, setCustomers] = useState([{firstname:'', lastname:'', links:[{}]}]);
//const [link, setLink] = useState([{}])
//const [obj, setObj] = useState([{}]);

useEffect (() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setCustomers(data.content))

}



console.log(customers[0].links[2].href)
 //tällä saan ulos linkin, mutta vain nollannesta paikasta.


/* Tämä on yksi yritelmistä saada linkki ulos customers datasta
useEffect(()=> getData(), [] );
        
const getData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(response => response.json())
    .then(data => setLink(data.content.links[2].href)) 
} 

En ymmärrä mikä menee väärin. Antaa herjan 
'cannot read property '2' of undefined', kun yritän saada 
linkin ulos content.links[2].href, olen yrittänyt myös customers.links[2].href,
mutta kun laitan column accessoriksi links[2].href, niin saan linkin.

console.log(link)

*/

//console.log(obj[0], obj[1], obj[2]) 

/*useEffect(()=> getContent(), [])
const getContent = () => {
    fetch(link)
    .then(response => response.json())
    .then(data => setObj(data.content)) 
} */


//console.log(obj) 





const columns = [

    {
        Header: 'First name',
        accessor: 'firstname',
       width: 150,
    },
    {
        Header: 'Last name',
        accessor: 'lastname',
        width: 150,
       
    },

    {
        Header: 'Training',
        accessor: 'links[2].href',
        width: 'auto',
       
    },
    ]
    return (
    <div >
      
      <ReactTable filterable={true} data={customers} columns={columns}/>
    
    </div>
    )
}

