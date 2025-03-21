# Performance Testing

* Smoke test (few user) and few time.
* Load test (more user, different stages (3) with number different number of users). Different time and periods.
* Stress (test to availability, estability and recovery) and Spike Test (extrem condition, maximum capacity to users, point of crash, if crash the system can recovery automaticly)  
    * capacity to resize the architecture of the system.
    * were there failures when the system resize? Ex: number of vm reduced on aws?
* Spike test - when the traffic increased quickly, out of the blue. What will happen when the traffic decrease?
* Soak test - When I can impact the application during a long time. This type of help to test the infrastructure limite. Should be very well planned.
* Breakpoint testing. Figure out the limit of system. We need to have a mature system to work with breaking point testing. The application should face before other types of test.



Important concepts:


* Performance testing life cycle structure:  


```javascript
//01. initialization
import sleep from 'k6';
 
// 02. configuration
export const options = {
    vus: 1,
    duration: '10s'
} 


 // 03. running tests
 export default function(){
    console.log("testing k6");
    sleep(1);
 }


 // 04. finish test
export function teardown(data){

    console.log(data)
}
```  


We can see the metrics in the output:  

```bash
     checks.........................: 100.00% 9 out of 9
     data_received..................: 111 kB  34 kB/s
     data_sent......................: 2.2 kB  663 B/s
     http_req_blocked...............: avg=26.39ms  min=2µs      med=10µs     max=321.63ms p(90)=45.99ms  p(95)=178.54ms
     http_req_connecting............: avg=17.03ms  min=0s       med=0s       max=155.5ms  p(90)=45.36ms  p(95)=151.86ms
     http_req_duration..............: avg=153.73ms min=147.85ms med=152.65ms max=167.48ms p(90)=157.51ms p(95)=159.64ms
       { expected_response:true }...: avg=153.73ms min=147.85ms med=152.65ms max=167.48ms p(90)=157.51ms p(95)=159.64ms
     http_req_failed................: 0.00%   0 out of 18
     http_req_receiving.............: avg=192.33µs min=138µs    med=178µs    max=281µs    p(90)=242.9µs  p(95)=274.2µs 
     http_req_sending...............: avg=41.66µs  min=9µs      med=40.5µs   max=88µs     p(90)=57.9µs   p(95)=64.19µs 
     http_req_tls_handshaking.......: avg=9.21ms   min=0s       med=0s       max=165.84ms p(90)=0s       p(95)=24.87ms 
     http_req_waiting...............: avg=153.5ms  min=147.48ms med=152.43ms max=167.29ms p(90)=157.22ms p(95)=159.41ms
     http_reqs......................: 18      5.544783/s
     iteration_duration.............: avg=360.64ms min=302.21ms med=307.41ms max=780.66ms p(90)=410.85ms p(95)=595.75ms
     iterations.....................: 9       2.772391/s
     vus............................: 1       min=1       max=1
     vus_max........................: 1       min=1       max=1
```

## Coustumizing metrics 


## Thresholds

thresholds on failure


## Types of Modules
Builtin modules
Remote modules
Local modules


## Groups

We can use groups to organize the scripts and output.

## tags  
https://grafana.com/docs/k6/latest/using-k6/tags-and-groups/

## env var
we can use enrironment variable to run tests on pipeline. Ex: github action, the user should put the variable value manualy. 

##  Scenarios
* Organizing the test
* simulation realistics
* Workload in paralel
* granular resulted



Available options to scenarios
* executor:
    * [shared-iterations, per-vu-iterations]
    * [constant-vus, ramping-vus]
    * [constant-arrival-rate, ramping-arrival-rate]
* startTime
* gracefulstop
* exec 
* env
* tags


## export report to github pages:  

first use the module and function to create report:   
module:  
`import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";`    


function. See details: [test-function](run-on-github-actions/test.js):   
```javascript
// function to generate report

export function handleSummary(data){
    return {
        'index.html': htmlReport(data),
    };
}
```  



* create a new branch, ex: gh-pages  
* select this branch on repository
* go to project settings and Select pages  

The yaml file to run the workflow, should use some configurations. See below:


permission to write:

```
permissions:
  contents: write
```  

create directory and file with the same name created on report function:

`- run: ls & mkdir report & mv index.html report`  


The last one, use artifact actions to generate the report. And deploy action to report webpage.

```bash
 - name: upload artifact
        uses: actions/upload-artifact@v4
        with:
          name: report performance test
          path: report

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: report
```  

note: we should use the same name to repor directory and the name of branch that we configure the github page.


See the complete files:  
[load-test](run-on-github-actions/test.js)   
[workflow](.github/workflows/loadtest.yaml)   


[check webpage output](https://github.com/lucasjct/k6-udemy/actions/runs/13850468143)


## k6 browser    

References:  

[k6-Browser](https://grafana.com/docs/k6/latest/using-k6-browser/)    
[Core-vital learn about metrics](https://web.dev/explore/learn-core-web-vitals?hl=pt-br)


The metrics presents on k6 Browser   
Check [Browser Metrics](https://grafana.com/docs/k6/latest/using-k6-browser/metrics/)

```bash
 browser_data_received.......: 5.8 kB  1.9 kB/s
     browser_data_sent...........: 1.8 kB  585 B/s
     browser_http_req_duration...: avg=399.39ms min=696µs   med=155.54ms max=1.53s p(90)=981.89ms p(95)=1.25s
     browser_http_req_failed.....: 0.00%   0 out of 5
     browser_web_vital_cls.......: avg=0        min=0       med=0        max=0     p(90)=0        p(95)=0    
     browser_web_vital_fcp.......: avg=1s       min=408ms   med=1s       max=1.59s p(90)=1.47s    p(95)=1.53s
     browser_web_vital_fid.......: avg=300µs    min=300µs   med=300µs    max=300µs p(90)=300µs    p(95)=300µs
     browser_web_vital_inp.......: avg=40ms     min=40ms    med=40ms     max=40ms  p(90)=40ms     p(95)=40ms 
     browser_web_vital_lcp.......: avg=1s       min=408ms   med=1s       max=1.59s p(90)=1.47s    p(95)=1.53s
     browser_web_vital_ttfb......: avg=943.45ms min=356.5ms med=943.45ms max=1.53s p(90)=1.41s    p(95)=1.47s
   ✓ checks......................: 100.00% 1 out of 1
     data_received...............: 0 B     0 B/s
     data_sent...................: 0 B     0 B/s
     iteration_duration..........: avg=2.58s    min=2.58s   med=2.58s    max=2.58s p(90)=2.58s    p(95)=2.58s
     iterations..................: 1       0.325173/s
     vus.........................: 1       min=1      max=1
     vus_max.....................: 1       min=1      max=1
```