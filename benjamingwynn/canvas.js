var canvas = $("canvas");
var context = [];
var cursor = {x: 0, y: 0};

$("section").height($(window).height());

// Track mouse movement
$(window).mousemove(function (event) {
    cursor.x = event.pageX;
    cursor.y = event.pageY;
});

for (var i = 0; i < canvas.length; i++) {
    // Get context for each canvas
    context[i] = canvas[i].getContext("2d");
    
    // Convert the CSS width and height to native DOM width and height
    canvas[i].height = $(canvas[i]).height();
    canvas[i].width = $(canvas[i]).width();
    
    // Set top element based on canvas number:
    $(canvas[i]).css("top", $(window).height() * i)
}

$(window).resize(function() {
    $("section").height($(window).height());
    
    for (var i = 0; i < canvas.length; i++) {
        // Convert the CSS width and height to native DOM width and height
        canvas[i].height = $(canvas[i]).height();
        canvas[i].width = $(canvas[i]).width();
    
        // Set top element based on canvas number:
        $(canvas[i]).css("top", $(window).height() * i);
    }
});

// Draw
setInterval(function() {
    for (var i = 0; i < canvas.length; i++) {
        context[i].clearRect(0, 0, canvas[i].width, canvas[i].height);
        drawCanvas(i);
    }
}, 60 / 1000);

function drawCanvas(canvas_number) {
    var c = canvas[canvas_number];
    var ctx = context[canvas_number];
    var h = c.height;
    var w = c.width;
    
    switch(canvas_number) {
        case 0:
            prettyMovingTriangleDraw(ctx, w, 128, "#1a9bcb");
            prettyMovingTriangleDraw(ctx, w, 92, "#33B5E5");
            prettyMovingTriangleDraw(ctx, w, 64, "#33d3e5");
            prettyMovingTriangleDraw(ctx, w, 48, "#33c4e5");
            prettyMovingTriangleDraw(ctx, w, 32, "#3389e5");
            break;
        case 1: // About Us
            var size = 128;
            var pad = 16;
            var x = 0, y = 0, ix = 0, iy = 0;
            while (x < w) {
                ix++;
                while (y < h) {
                    iy++;
                    ctx.fillStyle = 'rgb(' + (200 + (ix * 5)) + ',' + (200 + (ix * 5)) + ',' + (200 + (ix * 5)) + ')';
                    if ($(window).scrollTop() - $(canvas[2]).offset().top > 0) {
                        ctx.fillRect(x - (($(window).scrollTop() - $(canvas[2]).offset().top) * 0.1), y - (cursor.x * 0.05), size, size);
                    } else {
                        ctx.fillRect(x + (($(window).scrollTop() - $(canvas[2]).offset().top) * 0.1), y - (cursor.x * 0.05), size, size);
                    }
                    y += size + pad;
                }
                x += size + pad;
                y = 0;
            }
            break;
        case 2:
            ctx.fillStyle = "#444";
            drawTextArray(ctx, 99, [
                "<!DOCTYPE html>",
                "<head>",
                "    <meta charset='UTF-8'>",
                "    <title>Your Website Name</title>",
                "    <script>",
                "        // Javascript",
                "    </script>",
                "    <style>",
                "        /* CSS 3 */",
                "    </style>",
                "</head>",
                "<body>",
                "    <main>",
                "    <h1>HTML5</h1>",
                "        <p>The future of the web is here.</p>",
                "    </main>",
                "</body>"
            ]);
            break;
        default:
            console.error("Unknown canvas number draw attempt.");
            return;
    }
}

function drawTextArray(ctx, size, lines) {
    ctx.font = "100 " + size + "px Roboto";
    for (var i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], size / 4, (size * (i + 1)) - (cursor.y * 0.05));
    }
}

function prettyMovingTriangleDraw(ctx, from, size, colour) {
    drawTriangle(ctx, (from - (size * 1.25)) - ((cursor.x * size) * 0.0005), size, colour);
}

function drawTriangle(ctx, from, size, colour) {
    ctx.strokeStyle = colour;
    ctx.fillStyle = colour;
    ctx.save();
    ctx.beginPath();
        ctx.moveTo(from, 0);
        ctx.lineTo(from - size, 0);
        ctx.lineTo(from, size);
        ctx.stroke();
        ctx.fill(); 
    ctx.closePath();
    ctx.save();
}