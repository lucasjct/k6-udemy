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