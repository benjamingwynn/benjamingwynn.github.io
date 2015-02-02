// Javascript functions all common when using canvas

var canvas = document.getElementsByTagName("canvas")[0];

// Before we get context, resize the canvas.
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");