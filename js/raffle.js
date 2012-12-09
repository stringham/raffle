/**
 * Raffle
 * 2012
 * https://github.com/stringham/raffle
 * Copyright Ryan Stringham
 */

var inProgress = false;
var size = 60;
function map(a, f){
	for(var i=0; i<a.length; i++){
		f(a[i], i);
	}
}
function shuffle(array) {
  // var m = array.length, t, i;
  // // While there remain elements to shuffle…
  // while (m) {
  //   // Pick a remaining element…
  //   i = Math.floor(Math.random() * m--);
  //   // And swap it with the current element.
  //   t = array[m];
  //   array[m] = array[i];
  //   array[i] = t;
  // }
  return array;
}

function process(){
	var names = $('.name-text-field').val().split('\n');
	imported = [];
	map(names, function(name){
		if(name.length>0)
			imported.push({'name':name});
	});
	$('.enter-names').hide(500, function(){
		makeTicketsWithPoints();
	});
}

$(document).ready(function(){
	if(imported && imported.length > 0){
		$('.loading').hide();
		makeTicketsWithPoints();
	}
});
var ticketNames;
var ticketPoints;

function elementInViewport(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}

function Ticket(name, points){
	this.name = name;
	if(typeof(points) == "number")
		this.points = points;
	else
		this.points = 1;
	this.dom = $("<div class='ticket'>").text(name);
	this.fixPosition = function(){
		var me = this;
		this.dom.css({
			'position':'absolute',
			'top': me.dom.offset().top,
			'left':me.dom.offset().left,
			'background': colors.length > me.points ? colors[me.points] : "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")" 
		}).click(function(){
			pickName();
		});
	};
	this.decrement = function(length, callback){
		var me = this;
		this.points--;
		if(this.points == 0){
			this.dom.hide('puff', {}, length == 2 ? 1000 : 3000/length, function(){
				callback();
			});
		}
		else{
			$(this.dom).animate({'backgroundColor':colors.length > me.points ? colors[me.points] : "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")"}, length == 2 ? 1000 : 6000/length, function(){
				callback();
			});
		}
	}
}

var tickets = [];

var makeTicketsWithPoints = function(){
	tickets = [];
	$('.ticket').remove();
	map(imported, function(tdata){
		var t = new Ticket(tdata.name, tdata.points);
		if(t.points > 0)
			t.dom.appendTo($('body'));
		tickets.push(t);
	});
	tickets.reverse();
	size = 40;
	$('.ticket').css('font-size', size + 'px');
	while(!elementInViewport(tickets[0].dom.get(0)) && size > 10){
		size--;
		$('.ticket').css('font-size', size + 'px');
	}
	// tickets.reverse();
	setTimeout(function() {
		map(tickets, function(ticket){
			ticket.fixPosition();
		});
		$('body').unbind('click').click(function(){
			pickName();
		});
	}, 500);
}

var getChoices = function(){
	var result = [];
	map(tickets, function(ticket){
		if(ticket.points > 0)
			result.push(ticket)
	});
	return result;
}

$(window).resize(function(){
	if(!inProgress)
		makeTickets(tickets);
});


var pickName = function(){
	inProgress = true;
	$('.ticket').unbind('click');
	$('body').unbind('click');
	
	var choices = getChoices();
	if(choices.length > 1){
		var remove = Math.floor(Math.random()*choices.length);
		choices[remove].decrement(choices.length, function(){
			pickName();
		});
	}
	else{
		choices = $(choices[0].dom);
		var top = choices.css('top');
		var left = choices.css('left');
		var fontsize = choices.css('font-size');
		var width = choices.width();
		choices.click(function(){
			inProgress = false;
			choices.animate({'font-size':fontsize,'top':top,'left':left},'slow');
			$('.ticket').show(500).unbind('click');
			setTimeout(function(){
				makeTicketsWithPoints(ticketNames, ticketPoints);
			}, 700);
		});
		choices.animate({'font-size':3*size +'px','top':(window.innerHeight/5) + 'px','left':(window.innerWidth/2 - width) + 'px'},1500, function(){
			choices.animate({'left':(window.innerWidth/2 - choices.width()/2) + 'px'}, 'slow');
		});
	}
}