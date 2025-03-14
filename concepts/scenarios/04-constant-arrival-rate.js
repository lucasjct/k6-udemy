import http from 'k6/http';

export const options = {
    scenarios:{
        contacts: {
            executor: 'constant-arrival-rate',  // it is foucused in RPS metrics.
            duration: '30s',
            rate: 30, // 30 iterations (requests) for each 1 second
            timeUnit: '1s',
            preAllocatedVUs: 50, // k6 has consumed vus pre allocated.
        
        },
    },
};

export default function(){
    http.get('https://test.k6.io/contacts.php');
}
