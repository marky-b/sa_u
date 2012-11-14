/* set elements to variables */
var sa_u_infobox = $('#sa_u_infobox');
var sa_u_canvas = document.getElementById('sa_u_close_countdown');
var sa_u_countdown = $('#sa_u_close_countdown');
var sa_u_span = $('#sa_u_close_span');


/* set defined variables */
var sa_u_pageUrl = window.location;
var sa_u_pageTitle = document.getElementsByTagName('title')[0];
    if ( !!sa_u_pageTitle.childNodes.length ) {
        sa_u_pageTitle = sa_u_pageTitle.firstChild.data;
    } else if ( sa_u_pageTitle.innerHTML ) {
        sa_u_pageTitle = sa_u_pageTitle.innerHTML;
    } else {
        sa_u_pageTitle = '';
    }
var sa_u_buttons = {
    "sa_u_public_private": {
      "inactiveText":"Public"
      ,"activeText":"Private"
      ,"inactiveHoverText":"Make Private"
      ,"activeHoverText":"Make Public"
      ,"active":0
    }
    ,"sa_u_sfw_nsfw": {
      "inactiveText":"SFW"
      ,"activeText":"NSFW"
      ,"inactiveHoverText":"Make NSFW"
      ,"activeHoverText":"Make SFW"
      ,"active":1
    }
};


/* set canvas-related variables */
var sa_u_context = sa_u_canvas.getContext('2d');
var sa_u_x = sa_u_canvas.width / 2;
var sa_u_y = sa_u_canvas.height / 2;
var sa_u_radius = 8;
var sa_u_startAngle = -0.5 * Math.PI;
var sa_u_counterClockwise = false;
var sa_u_j;


/* set initial values/states */
sa_u_infobox.hide();
$('#sa_u_pageurl').text(sa_u_pageUrl);
$('#sa_u_pagetitle').text(sa_u_pageTitle);


/* set element interactivity */
sa_u_span.click(function() {
    sa_u_infobox.slideUp('fast');
});

sa_u_infobox.mouseout(function() {
    sa_u_span.hide();
    sa_u_countdown.show();
    fireCountdown();
});

sa_u_infobox.mouseover(function() {
    sa_u_countdown.hide();
    sa_u_span.show();
    clearInterval(sa_u_j);
    sa_u_context.clearRect(0, 0, 20, 20);
});


jQuery.each(sa_u_buttons,function(i,val) {
  $('#' + i)
      .html(val.active === 0 ? val.inactiveText : val.activeText)
      .addClass(val.active === 0 ? 'sa_u_inactive' : 'sa_u_active');
});

$('.sa_u_button')
    .hover(function() {
        var btn = sa_u_buttons[this.id];
        $('#' + this.id)
            .html(btn.active === 0 ? btn.inactiveHoverText : btn.activeHoverText)
            .removeClass(btn.active === 0 ? 'sa_u_inactive' : 'sa_u_active')
            .addClass(btn.active === 0 ? 'sa_u_active' : 'sa_u_inactive');
        }, function() {
        var btn = sa_u_buttons[this.id];
        $('#' + this.id)
            .html(btn.active === 0 ? btn.inactiveText : btn.activeText)
            .removeClass(btn.active === 0 ? 'sa_u_active' : 'sa_u_inactive')
            .addClass(btn.active === 0 ? 'sa_u_inactive' : 'sa_u_active');
        })
    .click(function() {
        var btn = sa_u_buttons[this.id];
        $('#' + this.id)
            .removeClass(btn.active === 0 ? 'sa_u_inactive' : 'sa_u_active');
        btn.active = (btn.active * -1) + 1;
        $('#' + this.id)
            .html(btn.active === 0 ? btn.inactiveText : btn.activeText)
            .addClass(btn.active === 0 ? 'sa_u_inactive' : 'sa_u_active');
    });

function fireCountdown() {
    var i = 1.5;
    sa_u_j = setInterval(function() {
        sa_u_context.clearRect(0, 0, 20, 20);
        var sa_u_endAngle= i * Math.PI;
        sa_u_context.beginPath();
        sa_u_context.arc(sa_u_x, sa_u_y, sa_u_radius, sa_u_startAngle, sa_u_endAngle, sa_u_counterClockwise);
        sa_u_context.lineWidth = 2;
        sa_u_context.strokeStyle = '#ffffff';
        sa_u_context.stroke();
        
        i = i - 0.01;
        if (i <= -0.5) {
            clearInterval(sa_u_j);

            sa_u_context.clearRect(0, 0, 20, 20);
            sa_u_infobox.slideUp('fast');
        }
    },10);
}

fireCountdown();
sa_u_infobox.slideDown('fast');