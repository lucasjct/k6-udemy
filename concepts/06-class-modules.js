// module default/buildin
import http from 'k6/http'
// remote module
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.4.0/s3.js'
// local Module
import runTest from './test/run.js'

export const options = {
    vus: 1,
    duration: '3s'
}


export default function () {
   const res = http.get('http://test.k6.io');

   // assertion created
   check(res, {

    'status code shoud be 200': (r) => r.status === 200

   })
}

// jslib.k6.io