//GRAB CURRENT URL FOR FALLBACK ERRORS FOR JSON REQUESTS
var currentURI = window.location.pathname;
var currentURI2 = window.location.search;
var encodedCURI = encodeURIComponent(currentURI+currentURI2);

window.addEvent('domready', function () {

	//GLOBAL VARS
	if(document.getElement('#popup')){}
	else if ($(document.body).hasClass('superactivity')){}
	else if ($(document.body).hasClass('popup')){}
	//else if (document.getElement('body.workbook_page, body.outlinePage, body.search_results, body.assessment')){ 	
	else{
		var listContainer = $('moduleUl');
		var contentDiv = document.getElement("div.content");
		var totalSubCount = listContainer.getElementsByTagName('li').length;
		var countSubLi = totalSubCount / 3;
		var moved = 1;
		var currentPos = 0;
		var menuUp = 0;
		var dataUrlNum = 1;
		var oP = 0;
		var moduleParent = null;
		var startModule = document.getElement('li.current');
		var next = document.getElement('a.next');
		var prev = document.getElement('a.prev');
		var expand = document.getElement('div.expand');
		var lessonHead = document.getElement('div.lessonHead h2');
		var topLvlItems = $('topLvl');
		var dataCollectHd = 0;
		var gallery = $('jsonSubMenu');
		var showingParent = $('moduleUl');
		var toggleOnLastLi = null;
	
	//RUN AND CHECK CURRENT OPACITY 
	var runOpacity = function (e) {
			if (oP > 0) {
				oP = 0;
				$$('.content').fade(1);
			} else {
				oP++
				$$('.content').fade(0.25);
			}

		};

	//CHECK WHICH MODULE TO OPEN THEN RUN APP. FUNCITONS
	var checkModules = function (e) {

			if (moduleParent == null) {
				moduleParent = document.getElement('li.current');
				$$('#moduleUl li').removeClass('current');
			}

			if (document.getElement("b.arrow")) {
				document.getElement("b.arrow").dispose();
			}

			if (moduleParent.hasClass('current')) {

				if ($("subMenuExpand").hasClass('active')) {
					$("subMenuExpand").toggleClass('active');
					$("subMenuExpand").toggle();
					gobacktoCurrentMod();
					checkCurrentModule();
					runOpacity();
				} else {
					$("subMenuExpand").toggleClass('active');
					$("subMenuExpand").toggle();
					checkCurrentModule();
					runOpacity();
				}

			} else {

				if ($("subMenuExpand").hasClass('active')) {
					$("subMenuExpand").toggleClass('active');
					$("subMenuExpand").toggle();
					$$('#moduleUl li').removeClass('current');
					moduleParent.addClass('current');
					checkCurrentModule();
					$("subMenuExpand").toggleClass('active');
					$("subMenuExpand").toggle();
				} else {
					$$('#moduleUl li').removeClass('current');
					moduleParent.addClass('current');
					$("subMenuExpand").toggleClass('active');
					$("subMenuExpand").toggle();
					checkCurrentModule();
					runOpacity();
				}
			}
		};

	//Check for current selected Module and prepend b class arrow
	var checkCurrentModule = function (e) {
				
				//NO ARROW ON OUTLINE PAGES
				if (document.getElement('body.outlinePage')){return false};
				//if (document.getElement('body.search_page')){return false};
				
				if (document.getElement("b.arrow")) {
					document.getElement("b.arrow").dispose();
				}
				//CHECK FOR INTRO PAGES WHEN NO 'li.current' WILL BE GIVEN
				if(listContainer.getElement('li.current')){
					var injectModuleli = listContainer.getElement('li.current');
					var currentArrow = Elements.from('<b class="arrow"></b>');
					currentArrow.inject(injectModuleli, 'top');
				}
		};

	//FUNCTION THAT RETURNS BACK TO CURRENT MODULE
	var gobacktoCurrentMod = function (e) {
			
			if ($("subMenuExpand").hasClass('active')) {
				return false;
				
			};
			if (document.getElement('li.current')) {
				$$('#moduleUl li').removeClass('current');
			
			};
			if (document.getElement("b.arrow")) {
				document.getElement("b.arrow").dispose();
			};
			if (startModule)	{
				var currentArrow = Elements.from('<b class="arrow"></b>');
				currentArrow.inject(startModule, 'top');
				var ModParent = document.getElement("b.arrow").getParent("li");
				ModParent.addClass('current');
			};
				
			//if (document.getElement("b.arrow")) {
				//var currentArrow = Elements.from('<b class="arrow"></b>');
				//currentArrow.inject(startModule, 'top');
				//var ModParent = document.getElement("b.arrow").getParent("li");
				//ModParent.addClass('current');
			//}
		};

	//NAVIGATION ELLIPSIS HELPER
	//SINCE THERE IS A EXTREMELY SPECIFIC WAY THIS NEEDS TO BE IMPLEMENTED
	//WE NEED TO CHAR.COUNT ALL SUB MENU ITEM TEXTS
	//THEN INJECT A TAG FOR THIS IS WORK PROPERLY
	var countNavLength = function (e) {
			var allNavItems = $$('#moduleUl li b span');

			//LOOP
			for (var i = 0; i < allNavItems.length; ++i)
				{
					var liText = allNavItems[i].get('text');
					var liTextLength = liText.length;
					var charLimit = 47;
					
					if (liTextLength > charLimit){
						//console.log('over limit insert ellipsis');
						liText = liText.replace(/(.{47})/g,"$1...<em>");

					};
					
					
					allNavItems[i].set('html', liText);
					//console.log(liText);
				}

	};

	//Check position of current selected module item, then slide
	var checkSecondPos = function (e) {
			var listItem = document.getElement('li.current');
			if(listItem){
				var currentSelected = $('moduleUl').getChildren('li').indexOf(listItem) + 1;
		
				moved = Math.floor((currentSelected + 2) / 3);
				currentPos = -540 * (Math.floor((currentSelected + 2) / 3) - 1);
			
				$('moduleUl').setStyle('left', currentPos);
				}
			else{return false;};
		};

	//DETERMINE POSITION OF MODULE, TO FADE OR DISPLAY NEXT/PREV
	var fadeButtons = function (e) {
			if (countSubLi > 1) {
				next.show();
			} else {
				next.hide();
			}
			if (moved > countSubLi) {
				next.hide();
			}
			if (moved == countSubLi) {
				next.hide();
			}
			if (moved == 1) {
				prev.hide();
			} else {
				prev.show();
			}
		};

	//NEXT BUTTON FUNCTIONALITY 
	next.addEvent('click', function (e) {
		if (lessonHead.hasClass('active')) {
			expand.hide();
			lessonHead.removeClass('active');
		}

		if (moved > countSubLi) {
			return false;
		}
		if (moved == countSubLi) {
			return false;
		} else {
			fadeButtons();
			$("subMenuExpand").removeClass('active');
			$("subMenuExpand").hide();
			gobacktoCurrentMod();
			checkCurrentModule();
			currentPos = -540 * moved;
			moved++
			$('moduleUl').tween('left', currentPos);
			oP++
			runOpacity();

			if (moved > countSubLi - 1) {
				fadeButtons();
			}
			return false;
		}
	});

	//PREV BUTTON FUNCTIONALITY 
	prev.addEvent('click', function (e) {
		if (lessonHead.hasClass('active')) {
			expand.hide();
			lessonHead.removeClass('active');
		}

		if (moved == 1) {
			return false;
		} else {
			$("subMenuExpand").removeClass('active');
			$("subMenuExpand").hide();
			gobacktoCurrentMod();
			checkCurrentModule();
			currentPos = -540 * (moved - 1);
			moved--
			fadeButtons();
			$('moduleUl').tween('left', currentPos + 540);
			oP++
			runOpacity();
			return false;
			if (moved == 0) {
				fadeButtons();
			}
		}
		return false;
	});
	
	//CREATE AND PROCESS, JSON REQUEST FOR TOP LEVEL ELEMENTS :: ON CLICK
	lessonHead.addEvent('click', function (e) {

		dataCollectHd = this.get('id');
		e.stop();

		if ($("subMenuExpand").hasClass('active')) {
			$("subMenuExpand").toggleClass('active');
			$("subMenuExpand").toggle();
			gobacktoCurrentMod();
			oP--
			runOpacity();
			runOpacity();
		}
		lessonHead.toggleClass('active');
		expand.toggle();
		runOpacity();
		var request = new Request.JSON({

			url: '/jcourse/webui/syllabus/siblings.do?context=' + dataCollectHd,
			onRequest: function () {
				topLvlItems.set('text', 'Loading...');
			},

			onSuccess: function (jsonObj) {
				topLvlItems.empty();
				addTopItemsLi(jsonObj);
			},
			onFailure: function () {
				//GRAB ENCODED URL FROM LINE 1+2
				var redirectURI="/jcourse/webui/login/required.do?redirect=" + encodedCURI;
				document.location.href=redirectURI;
			}
 		}).send();
	});
	
	//PROCESS, JSON REQUEST FOR TOP LEVEL ELEMENTS
	var addTopItemsLi = function (titles) {
			titles.each(function (title) {

				if (title.guid == dataCollectHd) {
					var el = new Element('li', { 'class': 'current' })
				} else {
					var el = new Element('li')
				};
				if(title.index){
					href = new Element('a', { 'html': ' :: ' + title.title, 'href': title.href }).inject(el), 
					htmltxt = new Element('span', { 'html': title.label + ' ' + title.index }).inject(href, 'top');
					el.inject(topLvlItems);
					}
				else{
					href = new Element('a', { 'html': title.title, 'href': title.href }).inject(el),
					el.inject(topLvlItems);
					};
			});
		};


	//CALLED WHEN CLICKING OFF A DROP-DOWN OBJECT
	toggleOpenElements = function (e) {
		
		if (lessonHead.hasClass('active')) {
			expand.hide();
			lessonHead.removeClass('active');
			runOpacity();
		}

		if ($("subMenuExpand").hasClass('active')) {
			$("subMenuExpand").toggleClass('active');
			$("subMenuExpand").toggle();
			gobacktoCurrentMod();
			runOpacity();
		}

		
		if ($('wn').hasClass('active')) {
			$('wn').toggle();
			$('wn').toggleClass('active');
			$('moreBtn').toggleClass('active');
		}
	};
	
	
	$(document.body).addEvent('click', function (e) {
		toggleOpenElements();
	});
//	
//	$$('div.module a').addEvent('focus', function (e) {
//		toggleOpenElements();
//	});


	//CREATE AND PROCESS, JSON REQUEST FOR MODULES :: ON CLICK
	$$('div.subNavigation div.module li a').addEvent('click', function (e) {
		dataCollect = this.get('id');
		e.stop();

		if (lessonHead.hasClass('active')) {
			expand.hide();
			lessonHead.removeClass('active');
			runOpacity();
		}

		//CHECK IF ANY ARROWS ARE PRESENT
		if (document.getElement("b.arrow")) {
			document.getElement("b.arrow").dispose();
		}

		moduleParent = this.getParent();
		checkModules();

		var request = new Request.JSON({

			url: '/jcourse/webui/syllabus/subnav.do?context=' + dataCollect,

			onRequest: function () {
				gallery.set('text', 'Loading...');
			},
			onSuccess: function (jsonObj) {
				gallery.empty();
				if (jsonObj.href) {
					//NOT NULL RESPONSE 
					var el = new Element('li'),
						module = new Element('h3').inject(el),
						moduleLink = new Element('a', {
							'href': jsonObj.href
						}).inject(module);
						//Check for Module #
						if(jsonObj.index){
							moduleNum = new Element('span', {
								'html': jsonObj.label + ' ' + jsonObj.index + ' ::',
								'title': jsonObj.label + ' ' + jsonObj.index + ' ' + jsonObj.title
							}).inject(moduleLink)
						}
						moduleTitle = new Element('b', {
							'html': jsonObj.title
						}).inject(moduleLink);
				} else {
					//NULL OR UNDEFINED HREF
					var el = new Element('li'),
						module = new Element('h3').inject(el),
						moduleLink = new Element('a', {
							'title': jsonObj.title,
							'class': 'nL'
						}).inject(module),
						moduleTitle = new Element('b', {
							'html': jsonObj.title,
							'styles': {
								padding: '0px'
							}
						}).inject(moduleLink);
				}
				el.inject(gallery);
				addItemsLiSub(jsonObj.items);
				//PLACE FOCUS
				var placeFocus = gallery.getFirst("li");
				toggleOnLastLi = gallery.getLast("li");
				placeFocus.setFocus();
				//toggleOnLastLi.getFirst("a").set("onblur","linkToggle();");
				//toggleOnLastLi.getFirst("a").set("onclick","linkToggle(a);");
			},
			onFailure: function () {
				//GRAB ENCODED URL FROM LINE 1+2
				var redirectURI="/jcourse/webui/login/required.do?redirect=" + encodedCURI;
				document.location.href=redirectURI;
			},
			onComplete: function () {
				
			}

		}).send();
	});
	
	
	
	//PROCESS, JSON REQUEST FOR MODULE ELEMENTS
	var addItemsLiSub = function (itemsLi) {
		
		//GLOBALS
		var lastPgNum = 0;
		var counter = 0;
		
			//START TO READ EACH LINE IN THE JSON
			itemsLi.each(function (itemLi, depth) { 
				
				//ELEMENT CREATION
				var el = new Element('li');
				var hasPgNumber = itemLi.page;
				var startPg = new Element('span', {'class': 'pgNumbers','html': 'pg ' + hasPgNumber});
				var pgRange = new Element('span', {'class': 'pgNumbers','html': 'pg ' + (lastPgNum+1) + '-' + (lastPgNum+counter)});
				var linkText = new Element('span', {'class': 'pgTitle','html': itemLi.title});
				
				
				//FOR LOOP FUNCTION CALLED WHEN JSON OBJECT CONTAINS .ITEMS (IE: NESTED ELEMENTS)
				function generateList(items) {
					
					var ul = new Element('ul');
					for (var i = 0; i < items.length; ++i)
						{
							var item = items[i];
							lastPgNum = item.page;
							var li = new Element('li').inject(ul);
							
							if (item.items) { li.adopt(new Element('span', {'html' : item.title,'class': 'pgTitle' }));
											  li.adopt(generateList(item.items));
							} else { li.adopt(new Element('a', {'href' : item.href,'title': item.title, 'html' : item.title }));
									 //COUNT EVERYTIME THIS LOOP GET PROCESSED, USED FOR PAGE RANGE 
									 counter++;
							}
						}
					return ul;
				}
				
				//IF OBJ HAS PAGE NUMBER
				if (hasPgNumber) {
					var name = new Element('a', {'class': 'title','href': itemLi.href}).inject(el);
					linkText.inject(name);
					startPg.inject(name);
					lastPgNum = itemLi.page;
				} else {
				//ELSE LOOP THROUGH OUR GENERATE LIST FUCTION
					var name = new Element('a', {'class': 'mPages','href': itemLi.href}).inject(el);
					linkText.inject(name);
					generateList(itemLi.items).inject(el);
					pgRange = new Element('span', {'class': 'pgNumbers','html': 'pg ' + ((lastPgNum-counter)+1) + '-' + (lastPgNum)}).inject(name);
					
					//RESET VAR
					lastPgNum= lastPgNum + counter;
					counter=0;
					
				};
				
			//FINALLY INJECT EVERYTHING BACK INTO OUR CONTAINER ELEMENT
			el.inject(gallery);
			});
		//AT THE END OF THE JSON OBJ, STOP PROCESSING
		};


	//EXPAND SUB MENU
	var slideSubMenu = function (e) {
			$('subMenuExpand').toggle();
			$('subMenuExpand').toggleClass('active');
			return false;
		};

	//MORE BUTTON, TOGGLE DISPLAY
	$('moreBtn').addEvent('click', function (e) {
			//change the state
			this.toggleClass('active');
			$('wn').toggle();
			$('wn').toggleClass('active');
			return false;
	});
	
	$$('.wnTechSupport').addEvent('blur', function (e) {
			//change the state
			$('wn').toggle();
			$('wn').toggleClass('active');
	});
	
	//NUMBER MODULES LI ON PAGE LOAD
	//USED FOR ACCESSABILITY
	var countMli =function (e)	{
		var totalLi = $('moduleUl').getChildren('li').getChildren('a');
		
		var b = 1;
		var c = 10;
		for (var i = 0; i < totalLi.length; ++i)
			{
				var item = totalLi[i];
				item.set({accesskey:b++});
			};
			
		};
		
	$(document.html).addEvent('keydown', function(event) {
	  
	  if (event.key == "right" && event.control){
		  	if (document.getElement('body.outlinePage')){return false};
	  		console.log('right arrow');
			if(document.getElement('div.pagtop a.next')){
				var myElement = document.getElement('div.pagtop a.next');
				document.location.href=myElement.href;
				}
			else{
				alert('You have reached the end of this part of the course.');
				}
		  };
		  
	  if (event.key == "left" && event.control){	
	  		if (document.getElement('body.outlinePage')){return false};
	  		console.log('left arrow');
			if(document.getElement('div.pagtop a.prev')){ 
				var myElement = document.getElement('div.pagtop a.degree1');
				document.location.href=myElement.href;
				}
			else{
				alert('Your currently at the beginning of this part of the course.');
				}
		  };
	
	}); 
	
	
	var sizePagebox = function (e) {
		if(document.getElement('input.paginationInput')){
			var pageForm = document.getElement('input.paginationInput');
			var pageForm2 = document.getElement('input.paginationInput2');
			var pageFormLength = pageForm.textLength;
			if (pageFormLength > 3){
				pageForm.setStyle('width', '2.5em');
				pageForm2.setStyle('width', '2.5em');
				};
		}
		else{return false;};
		};
	
//	AZ.searchQ = (function() {
//		var searchForm = document.getElement('form#searchForm');
//		var requestedQ = document.getElement('input.q');
//		var sectionGUID = document.getElement('input.sectionGUID');
//		var contextGUID = document.getElement('input.contextGUID');
//
//		requestedQ.addEvent('focus', function(e){
//			  toggleOpenElements();
//			  if (this.value == 'search') {
//				 this.value = "";
//			 }else{this.value = requestedQ.value;};
//		});
//			
//		requestedQ.addEvent('blur', function(e){
//			  if (this.value == '') {
//				 this.value = 'search';
//			 };
//		});
//		
//		searchForm.onsubmit = function () {
//				//https://thelsamar2.andrew.cmu.edu/jcourse/search/search.raw ?section=86bc77e480027eab01f4655e6fa38eb1 &q=respiratory &from=86bc7a0680027eab0180d70cef9921b7
//				//https://thelsamar2.andrew.cmu.edu/jcourse/search/search.do  ?section=1f60ef8c80027eab00193d906157a895 &from=1f60f02080027eab0035ae7cc60d36d1 &q=111111111
//				window.location = this.action + '?section=' + sectionGUID.value + '&q=' + requestedQ.value + '&from=' + contextGUID.value; 
//			  return false;
//		};
//	}());
	
	Element.implement({
		setFocus: function(index) {
			this.setAttribute('tabIndex',index || 0);
			this.focus();
		}
	});
	
	//RUN POPULATED FUNCTIONS
		sizePagebox();
		countNavLength();
		checkSecondPos();
		fadeButtons();
		checkCurrentModule();
		countMli();
	  
	  // Z-Index fix for IE7
	  if(Browser.Engine.trident){
			 var zIndexNumber = 1000;
			 $$('.header, .lessonHead, .expand, .subNavigation, .opacity, .content').each(function(el,i){
					 el.setStyle('z-index',zIndexNumber);
					 zIndexNumber -= 10;
			 });
	  };
	
	}//END ELSE IF
	//else{ alert('nothing')}
	
		// Test for placeholder support on Inputs (IE)
		var test = new Element('input'); 

		if(("placeholder" in test)) { return; } 
		// Run if browser DOES NOT support placeholder
		$$('input[placeholder]').each(function(el) { 
			// and create an overtext for them using the value of the placeholder attribute
			new OverText(el, { textOverride: el.get('placeholder') });
		});
		
});