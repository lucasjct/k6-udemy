import http from 'k6/http'
import {check, sleep} from 'k6'

// to run the tests on Grafana cloud, firstly I need to create account on Grafana Cloud.
// After that, run k6 login <MY-TOKEN>
// Then copy the projectID and project name and paste how we can see in the last comment below.
// Finally, run k6 cloud <project-name> and access the link generated when we run the test.

export const options = {
    stages: [{duration: '10s', target: 10 }],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    },
    // configurations to use Grafana Cloud
    ext: {
        loadimpact: {
            projectID: '3754338',
            name: 'POC K6 COURSE'
        }
    }
};

export default function(){
    const BASE_URL = 'https://test-api.k6.io';
    const USER = `${Math.random()}@mail.com`;
    const PASS = 'user123'

    console.log(USER + PASS)

    const res = http.post(`${BASE_URL}/user/register/`, {
        username: USER,
        first_name: 'crocodile',
        laste_name: 'dino',
        email: USER,
        password: PASS
    });

    check(res, {
        'success to register': (r) => r.status === 201
    });
    sleep(1);
}