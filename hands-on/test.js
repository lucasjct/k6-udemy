import http from 'k6/http'
import {check} from 'k6'

// smoke test
export const options = {

    scenarios: {
        list:{
            executor: 'constant-arrival-rate',
            exec: 'list',
            duration: '30s',
            rate: 200,
            timeUnit: '1s',
            preAllocatedVus: 150,
            gracefulStop: '10s',
            tags: {test_type: 'list_all_crocodiles'}

        },

        search: {
            executor: 'per-vu-iterations',
            exec: 'search',
            vus: 50,
            iterations: 20,
            maxDuration: '1m',
            gracefulStop: '10s',
            tags: {test_type: 'search_by_id'}
        }
    }
}

export function list(){
    http.get(__ENV.URL + 'crocodiles')
}

// reference about variables: https://grafana.com/docs/k6/latest/using-k6/execution-context-variables/#__vu-and-__iter-discouraged
export function search(){
    if(__VU % 2 === 0) {
        http.get(__ENV.URL + '/crocodiles/2')

    }else{
        http.get(__ENV.URL + '/crocodiles/1')
    }
}