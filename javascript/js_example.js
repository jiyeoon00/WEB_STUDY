/********
 변수
 var (함수범위): 재선언, 업데이트 가능
 let(블록범위) : 재선언 불가능, 업데이트는 가능 
 const(블록범위) : 상수이다. 재선언, 업데이트 불가능

 모든 변수는 호이스팅 된다. (= 선언이 먼저 메모리에 저장됨)
 var은 undefined로 초기화 되어 저장되지만,
 let과 const는 초기화되지 않은 상태로 선언만 메모리에 저장된다.
 let aaa; 구문을 만나야 undefined로 초기화된다.
 ********/

console.log(test); //undefined으로 자동 초기화.
var test;

//console.log(test1); //참조에러, 초기화가 안되었음.
let test1 = 3;

//const test2; //무조건 선언 시 초기화 해줘야 한다.

/********
 자바스크립트는 비동기 방식으로 작동한다.
 readFile호출 한 후 기다리지 않고 바로 '완료' 출력,
 그 후 파일 읽어오면 data출력
 ********/

/********
 멀티스레드 특징
 1. 멀티스레드는 하나의 프로세스 내에 여러개 생성
 2. heap영역 같은 공유메모리에 대해 스레드간 자원 공유 가능 -> 자원의 효율적인 활용 가능
 3. 동일한 데이터 공간을 사용하는데 대한 동기화 문제 발생
 4. 멀티스레드중 하나가 죽어도 나머지 스레드끼리 일을 수행할 수 있다.
 
 비동기 특징
 1. 프로그램 내에서는 단일스레드를 사용한다.
 2. 동기화 문제가 발생하지 않지만 하나의 스레드가 죽으면 프로그램 전체가 죽는다. 따라서 자동 재시작등의 조치가 필요하다
 3. 시스템 자원을 효율적으로 사용한다. 예로, 네트워크를 기다리는 동안 cpu는 다른 계산을 수행할 수 있다.
 ********/

let fs = require('fs');

fs.readFile('./멀티스레드.txt', 'utf-8', function (error, data) {
  console.log(data);
});

console.log('완료');

/*******
 arr.sort()
 배열 자체가 변경, 인수로 정렬 로직을 담은 함수 전달
 *******/

const arr1 = [3, 2, 1, 5, 4, 12];

// arr.sort(); // [1, 12, 2, 3, 4, 5] 문자열로 정렬된다.
arr1.sort((a, b) => {
  //[1, 2, 3, 4, 5, 12] 숫자로 정렬된다.
  return a - b;
});
console.log(arr1);

/********
 reduce == 줄이다
 배열을 순회하며 하나의 값으로 줄여 return하는 함수
 배열.reduce(누적값, 현재값, 인덱스, 요소), 초기값);
 */

arr2 = [1, 5, 4, 7, 9];

const result = arr2.reduce((acc, cur) => {
  //console.log(acc, cur);
  return acc + cur;
}, 0);

console.log(result);

/*********
 일반함수로 만들면, 함수가 뒤에 있어도 호출 가능
 화살표함수나 함수표현식의 경우는 변수에 함수의 주소만 저장한다.
 따라서 함수 사용 전 변수가 미리 초기화 되어야 한다.
 *********/

function makeAdder(x) {
  //makeAdder 초기화 됨
  return function (y) {
    return x + y;
  };
}

//add3는 아직 초기화 X

const add3 = makeAdder(3); //add3는 해당 구문을 만나고 나서야 초기화
console.log(add3(2)); //함수가 생성될 당시의 외부 변수를 기억하고 있어서 생성 이후에도 계속 접근 가능

/**********
 * 옵셔널 체이닝 (연산자 ?.)
 체인의 각 참조가 유효한지 검증
 연결된 체인 내에 깊숙이 위치한 속성 값을 읽을 수 있다.

 왜 사용? 여러명의 사용자 중에 몇 명은 주소 정보를 가지고 있지 않다고 하자.
 이때, user.address.detail로 해당 주소에 접근하게 되면 에러가 발생한다.
 원래는 해당 참조가 유효한지 &&, if 등을 사용해 검증해야 했다.
 ?.은 ?.'앞’의 평가 대상이 undefined나 null이면 평가를 멈추고 undefined를 반환합니다.
 따라서 user.address.detail로 안전하게 접근 가능하다.

 사용 시 주의할 점
 ?.는 존재하지 않아도 되는 대상에만 사용해야 한다.
 만약 필수값인 user에 옵셔널체이닝을 사용한다면 실수로 user를 누락했어도 에러가 나지 않아 에러 발견&디버깅이 어려워진다.
 
 **********/
const user = {
  name: '지연',
  hasOwnProperty: function () {
    console.log('aa');
  },
  // address 없을 수 있는 객체
  // address: {
  //   detail: '서울특별시 땡땡구',
  // },
};

//console.log(user.address.detail); //user.address, 즉 undefined 에 접근하므로 에러난다.
console.log(user.address?.detail); //유효하지 않은 값에 접근하므로 undefined 리턴
