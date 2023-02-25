// let arr = [1,3,5,7,9]
// let arr = [1,1,7,7,9]
// let arr = [1,100,5,7,0]
let arr = [1,2,3,4,5]
function miniMaxSum(arr){
    let minSum = 0, maxSum = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = i+1; j < arr.length; j++) {
            if(arr[i]>arr[j]){
                let swap;
                swap = arr[i];
                arr[i] = arr[j];
                arr[j] = swap;
            }
        }
        if(i!= 0){
            maxSum = maxSum + arr[i];
        }
        if(i != arr.length-1){
            minSum = minSum + arr[i];
        }       
    }
    return minSum + " " + maxSum;
}

console.log(miniMaxSum(arr));