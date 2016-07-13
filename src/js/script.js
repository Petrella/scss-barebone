$( document ).ready(function() {
  console.log( "ready!" );

  var script1 = function(one) {
    console.log('this is script 1' + one);
  }

  script1(" message from script 1");

  testlib();
}
