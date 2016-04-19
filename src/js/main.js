//we are loading the JS file at the end of the body,
// but you know paranoia
window.onload = function (){
  console.log('The DOM is loaded!');
};

// Another way to do it
// document.addEventListener('DOMContentLoaded', function(){
//     console.log('The DOM is loaded!')
//  });
$(document).ready(function() {
  console.log('Jquery is wokring!');
});

function prueba() {
  console.log('prueba');
}
