var script1 = function(one) {
  console.log('this is script 1' + one);
}

script1(" message from script 1");

testlib();

var script2 = function(two) {
  console.log('this is script 2' + two);
}

script2(" var for script 2");
