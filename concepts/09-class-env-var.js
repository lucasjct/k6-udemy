import http from 'k6/http'
import {check} from 'k6'

/** *
export const options = {
    vus: 1,
    duration: '3s'
}
*/

export default function () {

   const BASE_URL = __ENV.URL;
   const res = http.get(BASE_URL);

   check(res, {

    'status code shoud be 200': (r) => r.status === 200

   })
}

// to run this script, is mandatory inform the valeu to URL and the file:


// Some flags to use on cli:
// k6 run -e URL=https://test-api.k6.io/public/crocodiles 09-class-env-var.js
// k6 run -e URL=https://test-api.k6.io/public/crocodiles 09-class-env-var.js --duration 5s --vus 10
// k6 run -e URL=https://test-api.k6.io/public/crocodiles 09-class-env-var.js --stage 5s:5,5s:5,5s:0