import http from 'k6/http'
import {check, sleep} from 'k6'
import {SharedArray} from 'k6/data'
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'; // csv parse 


export const options = {
    stages: [
        {duration: '5s', target: 5 },
        {duration: '5s', target: 5 },
        {duration: '2s', target: 50 },
        {duration: '2s', target: 50 },
        {duration: '5s', target: 0 }
    
    
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01']
    }
};

const csvData = new SharedArray("reading csv", function(){
    return papaparse.parse(open("./users.csv"), {header: true}).data;

})

export default function(){
    const BASE_URL = 'https://test-api.k6.io';
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email
    const PASS = 'user123'

    console.log(USER)

    const res = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USER,
        password: PASS
    });

    check(res, {
        'success to login': (r) => r.status === 200,
        'token gerado': (r) => r.json('acess') != ''
    });
    sleep(1);
}