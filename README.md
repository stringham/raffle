Raffle
======

HTML and Javascript Raffle System

Demo <a href='http://stringham.me/raffle'>here</a>.

How To Use
-----------

In js/names.js you can add a pre-made list of names to be used in the raffle. You do this by defining an array of JSON objects. Each JSON object must contain a name, and can optionally contain points.

	var imported = [
		{
			name: 'Fred',
			points: 3
		},{
			name: 'Ryan',
			points: 2
		},{
			name: 'Sherry'  //no points defaults to 1
		},{
			name: 'Amanda',
			points: 3
		}
	];

Otherwise when you load index.html it will have a text field in which you can enter names separated by new lines.

Once the raffle has been loaded you start it by clicking anywhere on the page!