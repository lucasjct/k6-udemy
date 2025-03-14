import http from 'k6/http'
import {check, sleep} from 'k6'
import {SharedArray} from 'k6/data'

// load test
export const options = {

    stages: [
        {duration: '10s', target: 10}, // ramp up
        {duration: '10s', target: 10},
        {duration: '10s', target: 0} // ramp down
    ],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_duration: ['p(95) < 200']
    }
}

const data = new SharedArray('reading json', function(){
    return JSON.parse(open('./dados.json')).id
});

//working with dinamic ID
export default function(){
    const crocodiles = data[Math.floor(Math.random() * data.lenght)]
    const BASE_URL = `https://test-api.k6.io/public/crocodiles/${crocodiles}`;
    const res = http.get(BASE_URL);

    check(res, {
        'status code 200': (r) => r.status === 200
    });
    sleep(1)
}