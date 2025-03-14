import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    scenarios:{
        contacts: {
            executor: 'per-vu-iterations', // there are the exact iteration number to each vus
            vus: 10, // each vu will run 20 interations.
            iterations: 20,
            duration: '30s' // time to execute all iterations.
        },
    },
};

export default function(){
    http.get('https://test.k6.io/contacts.php');
}

// the time expent, depends on the time of the last vu has comlpeted the execution.