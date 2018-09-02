{
  let num1 = 12;
  let num2 = new Number(12);
  console.log(` num1 === num2 -> ${num1 === num2}`);
  console.log(`typeof num1 ${typeof num1}`);
  console.log(`typeof num2 ${typeof num2}`);

  let str1 = 'sam';
  let str2 = new String('sam');
  console.log(` str1 === str2 -> ${str1 === str2}`);
  console.log(`typeof str1 ${typeof str1}`);
  console.log(`typeof str2 ${typeof str2}`);

  let arr1 = [];
  let arr2 = new Array();
  console.log(` arr1 === arr2 -> ${arr1 === arr2}`);
  console.log(`typeof arr1 ${typeof arr1}`);
  console.log(`typeof arr2 ${typeof arr2}`);

  // num1 === num2 -> false
  // typeof num1 number
  // typeof num2 object

  // str1 === str2 -> false
  // typeof str1 string
  // typeof str2 object

  // arr1 === arr2 -> false
  // typeof arr1 object
  // typeof arr2 object
}

// ------------------------------------------------------------------------------------------------------------

// Find output of given gode.
{
  let obj = {
    name : 'sameer',
    lastName: 'girkar',
    details: {
      getFullName(){
        return `${this.name} ${this.lastName}`;
      }
    }
  }
  let name = 'global name',
    lastName = 'global last name';

  console.log(`obj.details.getFullName() ${obj.details.getFullName()}`);

  let temp = obj.details.getFullName;
  console.log(`temp() ${temp()}`);
}
// output
// obj.details.getFullName() undefined undefined --> 'this' inside obj.details.getFullName function refer to the details object
// temp() global name global last name --> 'this' inside temp function is refer to the global object.


// ------------------------------------------------------------------------------------------------------------

{
  let obj = {
    name: 'sam',
    getUpdatedName(){
      function updateName(){ // solution is replace this line with below line
    //let updateName = () => {
        this.name = 'new ' + this.name; 
        return this.name;
      }
      return updateName();
    }
  }

  let name = 'global Name';
  console.log(`obj.getUpdatedName --> ${obj.getUpdatedName()}`);

  console.log(`obj.name = ${obj.name}`);
}

/**
 * obj.getUpdatedName --> new global Name
 * obj.name = sam
 */
// ------------------------------------------------------------------------------------------------------------

{
  let abc = function xyz(){
    console.log('xyz values');
  }
  abc(); // xyz values
  xyz(); // xyz is not defined
}

// ------------------------------------------------------------------------------------------------------------
{
  let obj = {
    name: 'sam',
    getName() {
      setTimeout(function () {
        console.log(this.name);
      }, 0);
    }
  }

  console.log(`obj.getName() =  ${obj.getName()}`); //obj.getName() =  undefined
}
// ------------------------------------------------------------------------------------------------------------

{
  let arr = [1,2,3];
  arr.name = 'sam';

  console.log(`arr.length = ${arr.length}`); // 3
  console.log(`arr[name] = ${arr['name']}`); // sam
  console.log(`key length = ${Object.keys(arr).length}`); //key length = 4
  console.log(`keys = ${Object.keys(arr)}`); // keys =  ["0", "1", "2", "name"]
  

  arr[10] = '10 item';
  console.log(arr.length); // 11
  console.log(arr); // [1, 2, 3, empty × 7, "10 item", name: "sam"]

  arr.length = 10;
  console.log(arr); //  [1, 2, 3, empty × 7, name: "sam"]
}

// ------------------------------------------------------------------------------------------------------------

{
  // Function curring
  function multiply(a = 1, b = 1){
    return a*b;
  }

  let multiplyByTwo = multiply.bind(null, 2);
  console.log(`multiplyByTwo(10) = ${multiplyByTwo(10)}`);
  console.log(`multiplyByTwo(10 , 20) = ${multiplyByTwo(10)}`);

  // multiplyByTwo(10) = 20
  // multiplyByTwo(10, 20) = 20
}

// ------------------------------------------------------------------------------------------------------------
{
  // Create polyfill for 'new' keyword
  // Write a function name as newObject(constructorFunction) return new object just like 'new' keyword
  function newObject(className, ...args) {
    let obj = {};
    className.call(obj, ...args);
    obj.__proto__ = className.prototype;
    return obj;
  }

  function Person(name = 'sam', surname = 'girkar'){
    this.name = name;
    this.lastName = surname;
  }

  let p1 = new Person('tom');
  console.log(p1); // Person {name: "tom", lastName: "girkar"}

  let p2 = newObject(Person, 'tom');
  console.log(p2); // Person {name: "tom", lastName: "girkar"}
}

// ------------------------------------------------------------------------------------------------------------

{
  function prob(){
    for (var i = 0; i < 5; i++) {
      setTimeout(function () {
        console.log(`i = ${i}`);
      }, 200);
    }
  }
 
  function sol1(){
    for (var i = 0; i < 5; i++) {
      setTimeout(function (i) {
        console.log(`i = ${i}`);
      }.bind(null, i), 2000); // bind will return new function each time
    }
  }

  function sol2() {
    for (let i = 0; i < 5; i++) { //let will do new bindiing at each time
      setTimeout(function () {
        console.log(`i = ${i}`);
      }, 200);
    }
  }

  function sol3() {
    for (var i = 0; i < 5; i++) {
      let temp = (function (i) {
        return function () {
          console.log('i=' + i);
        }
      })(i); // self invocable fuunction
      setTimeout(temp, 300);
    }
  }

  prob(); // 5 times i = 5
  sol1();
  // i = 0
  // i = 1
  // i = 2
  // i = 3
  // i = 4

  sol2();
  // i = 0
  // i = 1
  // i = 2
  // i = 3
  // i = 4

  sol3();
  // i = 0
  // i = 1
  // i = 2
  // i = 3
  // i = 4


  function prob() {
    for (var i = 0; i < 5; i++) {
      let temp = (function (i) {
        return function (i) {
          console.log('i=' + i);
        }
      })(i);
      debugger;
      setTimeout(temp, 300);
    }
  }
  prob(); // 5 times i = undefined

}
// ------------------------------------------------------------------------------------------------------------
// Create Queue using Array
function queue() {
  let list = [];
  return {
    add(n) {
      debugger;
      list.push(n);
      return list;
    },
    remove() {
      return list.shift();
    },
    show(){
      return list;
    }
  }
}
t.add(1);
t.add(2);
t.add(3);
t.add(4);
t.show(); //[1, 2, 3, 4]
t.remove(); //1
t.show(); //[2, 3, 4]

// ------------------------------------------------------------------------------------------------------------
