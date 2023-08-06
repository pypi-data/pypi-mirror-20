var odfi = {

	mariana: {

		attributeStack: []
	}
}





$(function() {

	// UI Support
	//-----------------
	console.log("Setting up table");
	$("table").each(function(i,e) {
		$(e).addClass("ui compact table");
	});

	// Highlight Support
	//---------------------
 
	hljs.initHighlightingOnLoad();

	// Sticky Menu Setup
	//------------------------
	$('#nav-sticky').sticky({
	    context: '#page-content'
	  });

	// TOC Conversion
	//---------------------
	console.info("Converting TOC 2");

	
	//$("ul.current").contents().unwrap();
	$("#toc > ul").wrap("<div class='ui vertical menu'/>").contents().unwrap();
	
	
	$('.toctree-l1>a').unwrap().wrap("<div class='item'/>").wrap("<div class='header'/>");


	// Add Animations and SVg manipulations Functions
	//------------------------------
	$.fn.svg = {};
	$.fn.pattr = function(name,value) {

		$(this).each(function (i , target) {

			var attrId = $(target).attr('id')+"."+name;
			var oldValue = odfi.mariana.attributeStack[attrId];
			console.log("pattr "+name+" -> "+value+" , old= "+oldValue+" on "+$(target).attr("id"));
			if (value) {
				odfi.mariana.attributeStack[attrId] = $(target).attr(name);
				$(target).css(name,value);
			} else if (odfi.mariana.attributeStack[attrId] ) {
				$(target).css(name,odfi.mariana.attributeStack[attrId]);
			} else {
				$(target).css(name,"");
			} 

			//$(target).trigger('resize');

		});


		
	
	};

	$.fn.stroke = function(name,width) {

		$(this).each(function (i , target) {
			$(target).pattr("stroke",name);
			$(target).pattr("stroke-width",width);
		});

	};

	$.fn.fadein = function() {
		$(this).animate({opacity: 1.0},500);
	};
	$.fn.fadeout = function() {
		$(this).animate({opacity: 0.0},500);
	};
	$.fn.move = function(dx,dy) {

		dx = dx || 0;
		dy = dy || 0;
		var targetX = parseFloat($(this).attr("x")) + dx;
		var targetY = parseFloat($(this).attr("y")) + dy;

		console.log("Moving: "+targetX+" by "+dx);
		$(this).animate({x: targetX , y: targetY},500);
	};

	$.fn.also = function() {

		var calledOn = this[0];
		console.log("Called with on: "+this[0]);
		
			
		if (arguments) {
			
			var newelements = [];
			newelements.push(calledOn);
			var targetElements= $(arguments).map(function(i,targetLabel) {

				var found = $(calledOn).parent().find("*[id='"+targetLabel+"']:first")[0];
				newelements.push(found);
				console.log("Mapping "+targetLabel+" -> "+found+ ", search on: "+$(calledOn).parent());
				return found;
			});

			///return targetElements;
			return $(newelements);
			//return $(targetElements).push(calledOn);

		} else {
			return this;
		}
	
		/*if (arguments) {
			var calledOn = $(this);
			var targetElements= $(arguments).map(function(i,targetLabel) {

				var found = $(calledOn).parent().find("*[id='"+targetLabel+"']:first");
				console.log("Mapping "+targetLabel+" -> "+found+ ", search on: "+calledOn);
				return found;
			});

			return targetElements;

		} else {
			return this;
		}*/
		return this;
		

		//return targetElements.unshift(this);
	};



	// SVG Setup
	// Trigger onload, set initial displays
	// At the end display pictures
	//----------------------------------------

	$('svg *[onload]').each(function(i,e) {

		//var p = $(e).parent();
		//console.info("SVG Width: "+p.width());
		//$(e).attr("width",""+p.width()+"px");

		console.log("Element has on load: "+e);
		//$(e).trigger("load");

	});

	$('svg').each(function(i,svg) {

		// Trigger On Load
		//----------
		$(svg).find("*[onload]").each(function(i,withOnLoad) {
			$(withOnLoad).trigger("load");
		});

		// Look for animation
		//-------------------
		var topGroup = $(svg).find("g:first");
		var descOfGroup = $(topGroup).find("desc");

		console.log("Desc id: "+$(descOfGroup).attr("id"));
		console.log("Desc of troup: "+$(descOfGroup).text());

		//-- Split at line 
		var allLines = $($(descOfGroup).text().split("\n")).filter(function() { return this.trim().length>0; });

		//-- Set animation if some is defined
		if (allLines.length>0) {


			// Create Animation Stack
			var animations = [];

			// parse line
			allLines.each(function(i,line) {

				line = line.trim();

				console.info("Animation Line: "+line);

				// SNAP Animation
				if (line.startsWith("S:")) {
					var snapLine = line.replace("S:","").trim();
					//console.info("Snap Line: "+snapLine);

					// Take first NAME.
					// Name is a label
					var labelmatch = snapLine.match(/\w+/g);
					if (labelmatch) {
						var targetLabel = labelmatch[0];
						var animationLine = snapLine.replace(targetLabel+".","");
						//console.info("Label: "+targetLabel);

						//-- Search Element matching label inkscape\\:
						//var searchCode = "$(\"*[inkscape\\\\:label='"+targetLabel+"']:first\")";
						//var targetElement = $("*[label='"+targetLabel+"']:first");
						var searchCode = "$(\"*[id='"+targetLabel+"']:first\")";
						var targetElement = $("*[id='"+targetLabel+"']:first");
						if (targetElement) {

							//console.info("Found target SVG Element");

							//-- animations[animations.length] 
							animations.push( function() {

								var finalCode = searchCode+"."+animationLine;
								console.info("Doing Animation Step: "+finalCode);
								eval(finalCode);
								
								//console.info("Element: "+targetElement);
								//$(targetElement).animate({opacity: 0.5},1000);
							});


						} else {
							console.warn("Impossible to find element for label: "+targetLabel);
						}
					} 
					

				}

			});

			// Set mouseclick handler
			$(topGroup).data("animation-map",animations);
			$(topGroup).on("click",function() {

				var func = $(this).data("animation-map").shift();
				if (func) {
					func.apply();
				}
				

			});

		}
		

		// Display Container
		//---------------
		var parent = $(svg).parent();
		parent.css("visibility","visible");

	});
	



	

});