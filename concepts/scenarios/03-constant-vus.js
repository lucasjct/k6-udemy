import http from 'k6/http';
import {sleep} from 'k6';

export const options = {
    scenarios:{
        contacts: {
            executor: 'constant-vus', // It is used when I need to specific number to iterations for each vus.
            vus: 10, 
            duration: '30s'
        },
    },
};

export default function(){
    http.get('https://test.k6.io/contacts.php');
    sleep(0.5)
}
