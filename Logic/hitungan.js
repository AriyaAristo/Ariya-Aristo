function solution(a, m, k) {
    let count = 0;
  
    for (let i = 0; i <= a.length - m; i++) {
      const subarray = a.slice(i, i + m);
  
      if (hasPairWithSum(subarray, k)) {
        count++;
      }
    }
  
    return count;
  }
  

  function hasPairWithSum(subarray, k) {
    const seen = new Set();
  
    for (let num of subarray) {
      const complement = k - num;
  
      if (seen.has(complement)) {
        return true;
      }
  
      seen.add(num);
    }
  
    return false;
  }
  
  // Example 1
  const a1 = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7];
  const m1 = 4;
  const k1 = 10;
  const result1 = solution(a1, m1, k1);
  console.log(result1); // Output: 5
  
  // Example 2
  const a2 = [15, 8, 8, 2, 6, 4, 1, 7];
  const m2 = 2;
  const k2 = 8;
  const result2 = solution(a2, m2, k2);
  console.log(result2); // Output: 2
  