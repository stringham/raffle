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

Using a Google Form
-------------------

Create a google form that collects the First Name and Last Name, or just the Name of participants (along with whatever other information you want to collect)

Example form: <a href='https://docs.google.com/forms/d/1gDjzSU62lQ9yEmJ8k7BNEM0rly9Tvy_6bNYyTm0iJKw/viewform'>form</a>.

View the responses of the form as a google spreadsheet and go to file->publish to the web. Click the publish button.

Get the spreadsheet key, which is after the /d/ in the url. In the example form the spreadsheet backing the responses has a spreadsheet key of:

	1yCcGRUa6Q4vJN9MCleEozuJvADHMb8AXnHwm3o8ZdQ0
	
Put that key in the query string of the raffle page as the key, for example:

<a href="http://stringham.me/raffle?key=1yCcGRUa6Q4vJN9MCleEozuJvADHMb8AXnHwm3o8ZdQ0">http://stringham.me/raffle?key=1yCcGRUa6Q4vJN9MCleEozuJvADHMb8AXnHwm3o8ZdQ0</a>

Whenever someone submits to the form they will be automatically added to the raffle when the page is loaded. Awesome.
