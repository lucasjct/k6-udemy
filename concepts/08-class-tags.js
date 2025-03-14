import http from 'k6/http'
import {check, group} from 'k6'


export const options = {
    vus: 4,
    duration: '5s',
    thresholds: {
        'http_req_duration{group:::request to crocodile by ID}': ['p(95) < 500'],

    },
    thresholds: {
        'http_req_duration{type:search_all}': ['p(95) < 100']
    }
}

export default function () {
    group('request to all crocodiles', function(){
        const res = http.get('https://test-api.k6.io/public/crocodiles');
        tags:{
            type: 'search_all'
        }
        check(res, {
         'status code should be 200': (r) => r.status === 200
        });
    })
    group('request to crocodile by ID', function(){
        const response = http.get('https://test-api.k6.io/public/crocodiles/1');
        check(response, {
         'status code should be 200 by id': (r) => r.status === 200
        })
    })
}