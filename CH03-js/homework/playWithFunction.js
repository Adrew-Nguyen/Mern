const handle = (a, checkNumberFn) => {
  const result = [];
  for (let i = 0; i <= a; i++) {
    if (checkNumberFn(i, a)) result.push(i);
  }
  return result;
};
//1. Viết hàm nhận vào một số nguyên dương n và return lại một mảng các ước số của nó.
const divisorNumber = (number, a) => a % number == 0;
console.log(handle(6, divisorNumber));

//2. Viết hàm nhận vào một số nguyên dương n và return lại tổng tất cả ước số nguyên dương của nó
const sumDivisor = (array) => {
  let sum = 0;
  array.forEach((a) => {
    sum += a;
  });
  return sum;
};
console.log(sumDivisor(handle(6, divisorNumber)));

//3. Viết hàm kiểm tra số nguyên dương n có phải số nguyên tố hay không?
const isPrime = (number) => {
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i == 0) return false;
  }
  return number >= 2;
};
console.log(isPrime(7));

//4. Viết hàm tính tổng các chữ số nguyên dương n
const sumDigits = (number) => {
  let sum = 0;
  while (number > 0) {
    sum += number % 10;
    number = Math.floor(number / 10);
  }
  return sum;
};
console.log(sumDigits(12345));

//5. Viết chương trình nhập tháng năm. Hãy cho biết tháng đó có bao nhiêu ngày.
//Biết rằng năm nhuận là năm chia hết cho 400 hoặc chia hết cho 4 nhưng không chia hết cho 100.
const getDay = (month, year) => {
  if (month > 7) {
    return month % 2 == 0 ? 31 : 30;
  } else {
    if (month == 2) return year % 400 == 0 ? 29 : 28;
    return month % 2 == 0 ? 30 : 31;
  }
};
console.log(getDay(7, 2024));

//6. Viết hàm in ra bảng cửu chương
let handle3 = () => {
  let number = 2;
  while (number <= 9 && number > 1) {
    console.log("Bảng cưu chương " + number + " :");
    for (let i = 1; i <= 9; i++) {
      console.log(i + " x " + number + " = " + i * number);
    }
    number++;
  }
};
handle3();

// 7. Tìm số fibonacci thứ n. Cụ thể các số đầu tiên của dãy là Fibonacci là 1, 1, 2, 3, 5, 8,13....
const fiboGeneration = () => {
  let pre = 0;
  let cur = 1;
  return () => {
    const result = cur;
    [pre, cur] = [cur, pre + cur];
    return result;
  };
};
const handle4 = (n) => {
  let cnt = 1;
  let fibo = fiboGeneration();
  while (cnt != n) {
    cnt++;
    fibo();
  }
  return fibo();
};

//8. Tính tổng số fibo thứ n đầu tiên
const handle5 = (n) => {
  let cnt = 0;
  let fibo = fiboGeneration();
  let result = 0;
  while (cnt != n) {
    result += fibo();
    cnt++;
  }
  return result;
};
console.log(handle5(5));

/*-----------------------------------------------------------------------------------------------*/
//Phần 3: Thao tác với number, string, array, object và class trong Javascript
/*-----------------------------------------------------------------------------------------------*/

/**
 * 1. Áp dụng callback, viết một function giải quyết 3 bài toán nhỏ dưới đây.
 * Hãy tìm các số tự nhiên bé hơn 10 và là số lẻ.
 * Hãy tìm các số tự nhiên bé hơn 20 và là số chẵn.
 * Hãy tìm các số tự nhiên bé hơn 30 và là số nếu chia 3 thì dư 2
 */
const func1 = (number, checkNumberFn) => {
  let array = [];
  for (let index = 0; index < number; index++) {
    if (checkNumberFn(index)) array.push(index);
  }
  return array;
};
//Hãy tìm các số tự nhiên bé hơn 10 và là số lẻ.
console.log(func1(10, (number) => number % 2 == 1));

//Hãy tìm các số tự nhiên bé hơn 20 và là số chẵn.
console.log(func1(20, (number) => number % 2 == 0));

//Hãy tìm các số tự nhiên bé hơn 30 và là số nếu chia 3 thì dư 2
console.log(func1(30, (number) => number % 3 == 2));

/**
 * 2. Tương tự bài 1 nhưng áp dụng kỹ thuật currying 
*/ 

const func2 = (number) => (checkNumberFn) => {
  let array = [];
  for (let index = 0; index < number; index++) {
    if (checkNumberFn(index)) array.push(index);
  }
  return array;
}
console.log(func2(10)((number) => number % 2 == 1));
console.log(func2(20)((number) => number % 2 == 0));
console.log(func2(30)((number) => number % 3 == 2));


/**
 * 3. Viết hàm tìm giá trị lớn nhất trong mảng 1 chiều các số thực
*/

const func3 = (array) => {
  let max = array[0];
  for(let i = 1; i < array.length; i++){
    max = max > array[i] ? max : array[i];
  }
  return max;
}
console.log(func3([1, 2, 3, 4, 5, 6]));

/**
 * 4. Viết hàm kiểm tra trong mảng các số nguyên 
 * có giá trị chẵn nhỏ hơn 2004 
*/ 
const func4 = (array) => {
  let result = [];
  for(let i = 0; i < array.length; i++){
    array[i] < 2004 && array[i] % 2 == 0 && result.push(array[i]);
  }
  return result;
}
console.log(func4([1, 2, 3, 4, 5, 6, 2006])); // 2, 4, 6

/**
 * 5. Viết hàm sắp xếp mảng 1 chiều các số thực tăng dần
*/ 

const func5 = (array) => {
  return array.sort((a, b) => a - b);
}
console.log(func5([5, 4, 3, 2, 1]));

/**
 * 6. Viết hàm tính tổng các phần tử trong mảng
*/ 

const func6 = (array) => {
  let result = 0;
  array.array.forEach((val) => {
    result += val;
  });
  return result
}

/**
 * 7. Viết hàm nhận vào 2 mảng a, b. Return về 1 mảng mới chứa các giá trị 
 * chỉ xuất hiện 1 trong 2 mảng.
*/ 

