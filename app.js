$(document).ready(function() {

	var display = $('#output-display');
	var clearOnNextNumberPress = false;
	var state;
	var value1 = '';
	var value2 = '';
	var curNum = '';
	var curOpr;

	// Erase display & sum when 'AC' is clicked
	$('#clear').click(function() {
		display.html('');
		value1 = '';
		value2 = '';
		curNum = '';
		curOpr;
		oprPress(false);
	});

	// Delete last item from sum when 'C' is clicked
	$('#delete').click(function() {
		curNum = curNum.slice(0, -1);
		display.html(curNum);
	});

	// Add number to sum when number is clicked
	$('.number').click(function() {
		clearIfNewNum();
		curNum += this.value;
		display.html(curNum);
		state = 'num';
		oprPress(true);
	});

	// Add number on display to variables and perform calculation
	$('.opr').click(function() {
		display.html('');
		if (state === 'num') {
			if (value1 == '') {
				value1 = parseFloat(curNum);
				curNum = '';
				display.html(value1);
				curOpr = this.value;
				state === 'op';
				oprPress(false);
				curOpr;
				return;
			}

			if (typeof(value1) === 'number' && value2 == '') {
				calculate();
				curOpr = this.value;
				oprPress(false);
				return;
			}
		}

	});

	// Display sum when equals button is pressed
	$('#equals').click(function() {
		if (state === 'num') {
			if (value1 !== null) {
				calculate();
				oprPress(false);
			}
		}

	});

	// Calculate sum
	function calculate() {
		value2 = parseFloat(curNum);
		curNum = '';
		operation(value1, value2, curOpr);
		display.html(value1);
		value2 = '';
		state === 'op';
		clearOnNextNumberPress == true;
	}

	// Define what each operator does
	function operation(val1, val2, opr) {
		switch (opr) {
			case '+':
				value1 = val1 + val2;
				break;
			case '-':
				value1 = val1 - val2;
				break;
			case 'x':
				value1 = val1 * val2;
				break;
			case '/':
				value1 = val1 / val2;
				break;
		}
	}

	// Clear display when new number is pressed
	function clearIfNewNum() {
		if (clearOnNextNumberPress == true) {
			display.html('');
			clearOnNextNumberPress = false;
		}
	}

	// Disable operator buttons
	function oprPress(x) {
		if (x == false) {
			$('.run').attr('disabled', 'disabled');
		}
		if (x == true) {
			$('.run').removeAttr('disabled');
		}
	}

});
