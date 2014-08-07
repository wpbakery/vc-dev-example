/*!
 * Chart.js
 * http://chartjs.org/
 *
 * Copyright 2013 Nick Downie
 * Released under the MIT license
 * https://github.com/nnnick/Chart.js/blob/master/LICENSE.md
 * Modified by Pavel for only Doughnut char with value label
 */
window.Chart = function (context) {

	var chart = this;

	//Easing functions adapted from Robert Penner's easing equations
	//http://www.robertpenner.com/easing/

	var animationOptions = {
		linear: function (t) {
			return t;
		},
		easeInQuad: function (t) {
			return t * t;
		},
		easeOutQuad: function (t) {
			return -1 * t * (t - 2);
		},
		easeInOutQuad: function (t) {
			if ((t /= 1 / 2) < 1) return 1 / 2 * t * t;
			return -1 / 2 * ((--t) * (t - 2) - 1);
		},
		easeInCubic: function (t) {
			return t * t * t;
		},
		easeOutCubic: function (t) {
			return 1 * ((t = t / 1 - 1) * t * t + 1);
		},
		easeInOutCubic: function (t) {
			if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t;
			return 1 / 2 * ((t -= 2) * t * t + 2);
		},
		easeInQuart: function (t) {
			return t * t * t * t;
		},
		easeOutQuart: function (t) {
			return -1 * ((t = t / 1 - 1) * t * t * t - 1);
		},
		easeInOutQuart: function (t) {
			if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t;
			return -1 / 2 * ((t -= 2) * t * t * t - 2);
		},
		easeInQuint: function (t) {
			return 1 * (t /= 1) * t * t * t * t;
		},
		easeOutQuint: function (t) {
			return 1 * ((t = t / 1 - 1) * t * t * t * t + 1);
		},
		easeInOutQuint: function (t) {
			if ((t /= 1 / 2) < 1) return 1 / 2 * t * t * t * t * t;
			return 1 / 2 * ((t -= 2) * t * t * t * t + 2);
		},
		easeInSine: function (t) {
			return -1 * Math.cos(t / 1 * (Math.PI / 2)) + 1;
		},
		easeOutSine: function (t) {
			return 1 * Math.sin(t / 1 * (Math.PI / 2));
		},
		easeInOutSine: function (t) {
			return -1 / 2 * (Math.cos(Math.PI * t / 1) - 1);
		},
		easeInExpo: function (t) {
			return (t == 0) ? 1 : 1 * Math.pow(2, 10 * (t / 1 - 1));
		},
		easeOutExpo: function (t) {
			return (t == 1) ? 1 : 1 * (-Math.pow(2, -10 * t / 1) + 1);
		},
		easeInOutExpo: function (t) {
			if (t == 0) return 0;
			if (t == 1) return 1;
			if ((t /= 1 / 2) < 1) return 1 / 2 * Math.pow(2, 10 * (t - 1));
			return 1 / 2 * (-Math.pow(2, -10 * --t) + 2);
		},
		easeInCirc: function (t) {
			if (t >= 1) return t;
			return -1 * (Math.sqrt(1 - (t /= 1) * t) - 1);
		},
		easeOutCirc: function (t) {
			return 1 * Math.sqrt(1 - (t = t / 1 - 1) * t);
		},
		easeInOutCirc: function (t) {
			if ((t /= 1 / 2) < 1) return -1 / 2 * (Math.sqrt(1 - t * t) - 1);
			return 1 / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1);
		},
		easeInElastic: function (t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t == 0) return 0;
			if ((t /= 1) == 1) return 1;
			if (!p) p = 1 * .3;
			if (a < Math.abs(1)) {
				a = 1;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(1 / a);
			return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
		},
		easeOutElastic: function (t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t == 0) return 0;
			if ((t /= 1) == 1) return 1;
			if (!p) p = 1 * .3;
			if (a < Math.abs(1)) {
				a = 1;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(1 / a);
			return a * Math.pow(2, -10 * t) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) + 1;
		},
		easeInOutElastic: function (t) {
			var s = 1.70158;
			var p = 0;
			var a = 1;
			if (t == 0) return 0;
			if ((t /= 1 / 2) == 2) return 1;
			if (!p) p = 1 * (.3 * 1.5);
			if (a < Math.abs(1)) {
				a = 1;
				var s = p / 4;
			}
			else var s = p / (2 * Math.PI) * Math.asin(1 / a);
			if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p));
			return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * 1 - s) * (2 * Math.PI) / p) * .5 + 1;
		},
		easeInBack: function (t) {
			var s = 1.70158;
			return 1 * (t /= 1) * t * ((s + 1) * t - s);
		},
		easeOutBack: function (t) {
			var s = 1.70158;
			return 1 * ((t = t / 1 - 1) * t * ((s + 1) * t + s) + 1);
		},
		easeInOutBack: function (t) {
			var s = 1.70158;
			if ((t /= 1 / 2) < 1) return 1 / 2 * (t * t * (((s *= (1.525)) + 1) * t - s));
			return 1 / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2);
		},
		easeInBounce: function (t) {
			return 1 - animationOptions.easeOutBounce(1 - t);
		},
		easeOutBounce: function (t) {
			if ((t /= 1) < (1 / 2.75)) {
				return 1 * (7.5625 * t * t);
			} else if (t < (2 / 2.75)) {
				return 1 * (7.5625 * (t -= (1.5 / 2.75)) * t + .75);
			} else if (t < (2.5 / 2.75)) {
				return 1 * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375);
			} else {
				return 1 * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375);
			}
		},
		easeInOutBounce: function (t) {
			if (t < 1 / 2) return animationOptions.easeInBounce(t * 2) * .5;
			return animationOptions.easeOutBounce(t * 2 - 1) * .5 + 1 * .5;
		}
	};

	//Variables global to the chart
	var width = context.canvas.width;
	var height = context.canvas.height;

	//High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
	if (window.devicePixelRatio) {
		context.canvas.style.width = width + "px";
		context.canvas.style.height = height + "px";
		context.canvas.height = height * window.devicePixelRatio;
		context.canvas.width = width * window.devicePixelRatio;
		context.scale(window.devicePixelRatio, window.devicePixelRatio);
	}

	this.Doughnut = function (data, options) {

		chart.Doughnut.defaults = {
			segmentShowStroke: true,
			segmentStrokeColor: "#fff",
			segmentStrokeWidth: 2,
			percentageInnerCutout: 50,
			animation: true,
			animationSteps: 100,
			animationEasing: "easeOutBounce",
			animateRotate: true,
			animateScale: false,
			onAnimationComplete: null
		};

		var config = (options) ? mergeChartConfig(chart.Doughnut.defaults, options) : chart.Doughnut.defaults;

		return new Doughnut(data, config, context);

	};

	var clear = function (c) {
		c.clearRect(0, 0, width, height);
	};

	var Doughnut = function (data, config, ctx) {
		var segmentTotal = 0;

		//In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
		var doughnutRadius = Min([height / 2, width / 2]) - 5;

		var cutoutRadius = doughnutRadius * (config.percentageInnerCutout / 100);
		//var max=-1;
		for (var i = 0; i < data.length; i++) {
			segmentTotal += data[i].value;
			/*if(data[i].value>max) {
			 max=data[i].value;
			 }*/
		}

		animationLoop(config, null, drawPieSegments, ctx);

		function drawPieSegments(animationDecimal) {
			var cumulativeAngle = -Math.PI / 2,
				scaleAnimation = 1,
				rotateAnimation = 1;
			if (config.animation) {
				if (config.animateScale) {
					scaleAnimation = animationDecimal;
				}
				if (config.animateRotate) {
					rotateAnimation = animationDecimal;
				}
			}
			for (var i = 0; i < data.length; i++) {
				var segmentAngle = rotateAnimation * ((data[i].value / segmentTotal) * (Math.PI * 2));
				ctx.beginPath();
				ctx.arc(width / 2, height / 2, scaleAnimation * doughnutRadius, cumulativeAngle, cumulativeAngle + segmentAngle, false);
				ctx.arc(width / 2, height / 2, scaleAnimation * cutoutRadius, cumulativeAngle + segmentAngle, cumulativeAngle, true);
				ctx.closePath();
				ctx.fillStyle = data[i].color;
				ctx.fill();

				if (config.segmentShowStroke) {
					ctx.lineWidth = config.segmentStrokeWidth;
					ctx.strokeStyle = config.segmentStrokeColor;
					ctx.stroke();
				}
				cumulativeAngle += segmentAngle;
			}

			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.font = '20pt Calibri';
			ctx.fillStyle = '#000';
			//alert(max);
			ctx.fillText(data[0].value, width / 2, height / 2 + 4);
		}

	}

	function calculateOffset(val, calculatedScale, scaleHop) {
		var outerValue = calculatedScale.steps * calculatedScale.stepValue;
		var adjustedValue = val - calculatedScale.graphMin;
		var scalingFactor = CapValue(adjustedValue / outerValue, 1, 0);
		return (scaleHop * calculatedScale.steps) * scalingFactor;
	}

	function animationLoop(config, drawScale, drawData, ctx) {
		var animFrameAmount = (config.animation) ? 1 / CapValue(config.animationSteps, Number.MAX_VALUE, 1) : 1,
			easingFunction = animationOptions[config.animationEasing],
			percentAnimComplete = (config.animation) ? 0 : 1;

		if (typeof drawScale !== "function") drawScale = function () {
		};

		requestAnimFrame(animLoop);

		function animateFrame() {
			var easeAdjustedAnimationPercent = (config.animation) ? CapValue(easingFunction(percentAnimComplete), null, 0) : 1;
			clear(ctx);
			if (config.scaleOverlay) {
				drawData(easeAdjustedAnimationPercent);
				drawScale();
			} else {
				drawScale();
				drawData(easeAdjustedAnimationPercent);
			}
		}

		function animLoop() {
			//We need to check if the animation is incomplete (less than 1), or complete (1).
			percentAnimComplete += animFrameAmount;
			animateFrame();
			//Stop the loop continuing forever
			if (percentAnimComplete <= 1) {
				requestAnimFrame(animLoop);
			}
			else {
				if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
			}

		}

	}

	//Declare global functions to be called within this namespace here.

	// shim layer with setTimeout fallback
	var requestAnimFrame = (function () {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
	})();

	function calculateScale(drawingHeight, maxSteps, minSteps, maxValue, minValue, labelTemplateString) {
		var graphMin, graphMax, graphRange, stepValue, numberOfSteps, valueRange, rangeOrderOfMagnitude, decimalNum;

		valueRange = maxValue - minValue;

		rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

		graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

		graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

		graphRange = graphMax - graphMin;

		stepValue = Math.pow(10, rangeOrderOfMagnitude);

		numberOfSteps = Math.round(graphRange / stepValue);

		//Compare number of steps to the max and min for that size graph, and add in half steps if need be.
		while (numberOfSteps < minSteps || numberOfSteps > maxSteps) {
			if (numberOfSteps < minSteps) {
				stepValue /= 2;
				numberOfSteps = Math.round(graphRange / stepValue);
			}
			else {
				stepValue *= 2;
				numberOfSteps = Math.round(graphRange / stepValue);
			}
		}
		;

		var labels = [];
		populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);

		return {
			steps: numberOfSteps,
			stepValue: stepValue,
			graphMin: graphMin,
			labels: labels

		}

		function calculateOrderOfMagnitude(val) {
			return Math.floor(Math.log(val) / Math.LN10);
		}

	}

	//Populate an array of all the labels by interpolating the string.
	function populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
		if (labelTemplateString) {
			//Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
			for (var i = 1; i < numberOfSteps + 1; i++) {
				labels.push(tmpl(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(getDecimalPlaces(stepValue))}));
			}
		}
	}

	//Max value from array
	function Max(array) {
		return Math.max.apply(Math, array);
	};
	//Min value from array
	function Min(array) {
		return Math.min.apply(Math, array);
	};
	//Default if undefined
	function Default(userDeclared, valueIfFalse) {
		if (!userDeclared) {
			return valueIfFalse;
		} else {
			return userDeclared;
		}
	};
	//Is a number function
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	//Apply cap a value at a high or low number
	function CapValue(valueToCap, maxValue, minValue) {
		if (isNumber(maxValue)) {
			if (valueToCap > maxValue) {
				return maxValue;
			}
		}
		if (isNumber(minValue)) {
			if (valueToCap < minValue) {
				return minValue;
			}
		}
		return valueToCap;
	}

	function getDecimalPlaces(num) {
		var numberOfDecimalPlaces;
		if (num % 1 != 0) {
			return num.toString().split(".")[1].length
		}
		else {
			return 0;
		}

	}

	function mergeChartConfig(defaults, userDefined) {
		var returnObj = {};
		for (var attrname in defaults) {
			returnObj[attrname] = defaults[attrname];
		}
		for (var attrname in userDefined) {
			returnObj[attrname] = userDefined[attrname];
		}
		return returnObj;
	}

	//Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
	var cache = {};

	function tmpl(str, data) {
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] ||
			tmpl(document.getElementById(str).innerHTML) :

			// Generate a reusable function that will serve as a template
			// generator (and which will be cached).
			new Function("obj",
				"var p=[],print=function(){p.push.apply(p,arguments);};" +

					// Introduce the data as local variables using with(){}
				"with(obj){p.push('" +

					// Convert the template into pure JavaScript
				str
					.replace(/[\r\t\n]/g, " ")
					.split("<%").join("\t")
					.replace(/((^|%>)[^\t]*)'/g, "$1\r")
					.replace(/\t=(.*?)%>/g, "',$1,'")
					.split("\t").join("');")
					.split("%>").join("p.push('")
					.split("\r").join("\\'")
				+ "');}return p.join('');");

		// Provide some basic currying to the user
		return data ? fn(data) : fn;
	};
};

function TestElementRender($i) {
	param1 = [
		{
			value: parseInt($i.attr("data-value-first")),
			color: $i.attr("data-value-first-color")
		},
		{
			value: parseInt($i.attr("data-value-second")),
			color: $i.attr("data-value-second-color")
		}
	];
	param2 = {
		animation: $i.attr("data-animation") == "true",
		segmentShowStroke: $i.attr("data-segment-stroke-show") == "true",
		segmentStrokeColor: $i.attr("data-segment-stroke-color"),
		segmentStrokeWidth: $i.attr("data-segment-stroke-width"),
		percentageInnerCutout: $i.attr("data-percentage-inner-cutout")
	};
	new Chart($i.get(0).getContext("2d")).Doughnut(
		param1, param2
	);
}

//Define the global Chart Variable as a class.
/*
 data-value-first="VAL1" data-value-second="VAL2" data-value-first-color="COL1" data-value-second-color="COL2" data-animation="ANIMATION" data-segment-stroke-show="SHOWSTROKE" data-segment-stroke-color="STROKECOLOR" data-segment-stroke-width="STROKEWIDTH" data-percentage-inner-cutout="INNERFILL"*/
(function ($) {
	$(document).ready(function () {
		$(".piechartex").each(function (i, item) {
			$i = $(item);
			TestElementRender($i);
		});
	});
})(jQuery);