import http from 'k6/http'
import {check} from 'k6'

// to generate a web dashboard, I just need run
// using this command CLI: K6_WEB_DASHBOARD=true k6 run dashboard.js
// Then, we can open this local urr: http://127.0.0.1:5665 while the test is running.
// We can generate a html report with : K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=report.html k6 run dashboard.js

export const options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [{threshold:'p(95) < 200', abortOnFail: true, delayAbortEval: '10s'}],
        checks: ['rate > 0.99'] // we can use checks combined.

    }
}


export default function () {
   const res = http.get('http://test.k6.io');

   // assertion created
   check(res, {

    'status code shoud be 200': (r) => r.status === 200

   })
}