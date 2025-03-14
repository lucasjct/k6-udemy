import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    scenarios:{
        contacts: {
            executor: 'shared-iterations', // there aren't the specific number to iterations for each vu
            vus: 10,
            iterations: 200,
            duration: '30s' // time to execute all iterations.
        },
    },
};

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(0.5);
}