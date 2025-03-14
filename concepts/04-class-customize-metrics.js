import http from 'k6/http'
import {check} from 'k6'
import { Counter } from 'k6/metrics'
import { Gauge } from 'k6/metrics'
import { Rate } from 'k6/metrics'
import { Trend } from 'k6/metrics'



export const options = {
    vus: 1,
    duration: '3s'
}

// Counters sum values.
const calls = new Counter('calls_quantity');
// Gauges track the smallest, largest, and latest values.
const gauge = new Gauge('blocked_time');
// Rates track how frequently a non-zero value occurs.
const rate = new Rate('tax_status_code_200');
// Trends calculates statistics for multiple values (like mean, mode or percentile).
const trend = new Trend('tax_waiting');





export default function () {
   const res = http.get('http://test.k6.io');
   calls.add(1)
   gauge.add(res.timings.blocked);
   rate.add(res.status === 200);
   trend.add(res.timings.waiting);

   // assertions created
   check(res, {
    'status code shoud be 200': (r) => r.status === 200


   })
}