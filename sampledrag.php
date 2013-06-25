<!DOCTYPE html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><!--  <html class="no-js" lang="en"> --> <!--<![endif]-->
<html>

<head>
	<meta charset="utf-8">

	<title>ChemCollective</title>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-language" content="en" />

	<meta name="description" content= "Online Resources for Teaching and Learning Chemistry" /> 

	<!-- Mobile viewport optimized: j.mp/bplateviewport  -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- favicon.ico -->
	<link rel="icon" href="favicon.png" >

	<script type="text/javascript" src="//code.jquery.com/jquery-1.9.1.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/ui/1.9.2/jquery-ui.js"></script>

	<!--  stylesheet(s) -->

	<!-- eventually, using css compiled from the commented out less file-->
	<!--<link rel="stylesheet" type="text/css" href="assets/css/style.css" /> -->
	
	<!-- less css stylesheet for development -->
    <!--<link rel="stylesheet/less" type="text/css" href="  " />-->
	<link rel="stylesheet" type="text/css" media="screen" href="http://chemcollective.org/assets/common/css/styles.css" /> 
	<link rel="stylesheet" type="text/css" media="print" href="http://chemcollective.org/assets/common/css/print-styles.css"/>
	<link rel="stylesheet" type="text/css" href="style.css"/>

	<!-- All JavaScript at the bottom, except -->
	
	<!-- Modernizr, which enables HTML5 elements & feature detects -->
	<!-- <script src="http://chemcollective.org/assets/common/js/libs/modernizr-1.7.min.js" ></script> -->
	
	<!--css3-mediaqueries-js - http://code.google.com/p/css3-mediaqueries-js/ - Enables media queries in some unsupported browsers-->
	<!-- <script type="text/javascript" src="js/css3-mediaqueries.js"></script> -->

	<!-- <script src="http://chemcollective.org/assets/common/js/atlassian-deployJava.js" ></script>  -->
	<!-- allows draggable functioning -->
	<script type="text/javascript">
		$(window).load(function(){
			$(function () {
				$("#sortable").sortable({
					revert:true
				});

				$("#draggable").draggable({
					connectToSortable: "#sortable",
					helper: "clone",
					revert: "invalid"
				});

				$("ul, li").disableSelection();
			});
		});
	</script>
</head>
<body>

	<div id="header">	
		<!-- block that appears on every page with chem collective logo and 
		 tagline "Online Resources... " -->
		<div id="non-nav-wrapper"> 
		 
			<div id="non-nav">
			
				<div id="logo">
					<!-- text not displayed: background logo image is shown for chemCollective and for sponsors -->
					<a href="home"><img src=http://chemcollective.org/assets/common/images/styling/cclogo.png alt="ChemCollective: Onine Resources for Teaching and Learning Chemistry"></a>
				</div> 
					
				<p id="tagline">Online Resources for Teaching and Learning Chemistry</p>

				<div id="sponsors">
					<a href="about_us/sponsors"><img src=http://chemcollective.org/assets/common/images/styling/sponsor_logos.jpg alt="Sponsored by the National Science Foundation, Carnegie Mellon University, and the Department of Education."></a>
				</div>
			</div>
		</div>

		<!-- top navigation bar for all pages, has About Us, Feedback, Help, and 
		 Get Involved links. About Us and Help both have sub-menus. --> 
		
		<div id="top-nav-wrapper">
			<div id="top-nav"> 

				<ul id="top-nav-menu">
		
				    <li><p class="current_page_link">Home</p></li>

					<li>
						<a href="http://chemcollective.org/about_us/introduction">About</a>						<!--
						<ul>
							<li> <a href = http://chemcollective.org/about_us/introduction > Introduction </a> </li> 
							<li> <a href = http://chemcollective.org/newsarticles/headlines > News </a> </li>
							<li> <a href = http://chemcollective.org/about_us/research > Research </a> </li>
						</ul>
						-->
					</li>

					<li>
						<a href="http://chemcollective.org/teachers/index">Teachers</a>						<!--
						<ul>
							<li><a href = http://chemcollective.org/teachers/getInvolved >Get Involved</a></li> 
							<li><a href = http://chemcollective.org/teachers/teacherGuide > Teacher Guide </a></li>
							<li><a href = http://chemcollective.org/teachers/instructorSites > Instructor Sites </a></li>
						</ul>
						-->
					</li>

					<li> 
						<a href="http://chemcollective.org/help/FAQ">Help</a>						<!--
						<ul>
							<li><a href = http://chemcollective.org/help/FAQ > FAQ </a></li>
							<li><a href = http://chemcollective.org/help/vlabWalkthrough > Virtual Lab Walkthrough </a></li>
							<li><a href = http://chemcollective.org/help/vlabUserGuide > Virtual Lab User Guide </a></li>
						</ul>
						-->
					</li>

					<li> 
						<a href="http://chemcollective.org/comments">Feedback</a>						<!-- feedback does not have a sub-menu -->
					</li>

				</ul>

				<div id="search-box">
					<form method="get" id="searchform" action="http://chemcollective.org/search/">
						<input type="submit" class="submit" id="searchsubmit" value="Search" style="margin-right:1px">
						<input type="text" id="q" name="q" class="field">
					</form>
				</div>					
				
			</div><!-- end top-nav div -->
				
		</div> <!-- end top-nav-wrapper div -->
		
		<div id="message">
			<a href="http://collective.chem.cmu.edu"><p>We've recently updated our site. If you are having problems, you can click here to get to the old site.</p></a>
		</div>
		
	
	</div><!-- end header div -->

	<div id="wrapper">
		<div id="sideBar">
			<ul id="menu">
					<li>
	 				<h5><span>Resources by</span> Topic</h5>
	 				<ul>
						<li>
							<a href="http://chemcollective.org/stoichiometry">Stoichiometry</a>		
						</li>
						<li>
							<a href="http://chemcollective.org/thermo">Thermochemistry</a>		
						</li>
						<li>	
						   <a href="http://chemcollective.org/kinetics">Kinetics</a>		
						</li>
						<li>
						   <a href="http://chemcollective.org/equilib">Equilibrium</a>		
						</li>
						<li>
						   <a href="http://chemcollective.org/acid-base">Acid-Base Chemistry</a>		
						</li>
						<li>
						   <a href="http://chemcollective.org/solubility">Solubility</a>		
						</li>
						<li>
						   <a href="http://chemcollective.org/oxredux">Oxidation/Reduction and Electrochemistry</a>		
						</li>
						<li>
						   <a href="http://chemcollective.org/labtech">Analytical Chemistry/Lab Techniques</a>		
						</li>
						<li>
						   <a href="http://chemcollective.org/physical">Physical Chemistry</a>		
						</li>
						<li> 
						   <a href="http://chemcollective.org/solutions">Properties of Solutions</a>		
						</li>
					</ul>
					</li>
			  	<li>
				 
				 	<h5><span>Resources by </span>Type</h5>
				 	<ul>
						<li>
							<a href="http://chemcollective.org/vlabs">Virtual Labs</a>		
						</li>
						<li> 
							<a href="http://chemcollective.org/autograded">Autograded Problems</a>		
						</li>
						<li> 
						   <a href="http://chemcollective.org/tutorials">Tutorials</a>		
						</li>
						<li> 
						   <a href="http://chemcollective.org/scenario_based">Scenario-Based Activities</a>		
						</li>
						<li> 
						   <a href="http://chemcollective.org/courses">Online Courses</a>		
						</li>
						<!-- not yet on site
						<li> 
						   		</li>
						-->
						<li> 
						   <a href="http://chemcollective.org/cims">Molecular Level Visualizations</a>		
						</li>
						<li>	                             
						   <a href="http://chemcollective.org/sims">Simulations</a>		
						</li>
						<li> 
						   <a href="http://chemcollective.org/tests">Concept Tests</a>		
						</li>		
						<!--   Instructor Guides don't exist yet
						<li> 
						   		</li>
						-->
					</ul>
			  	</li>
			</ul>

		</div>

		<div id="content-wrapper">
			<div id="content">
				<form id="drag" method="get" action="sampledrag.php">
					<div class="question-wrapper">
						<div class="hint">
							<a href='#' class='tooltip'>?<span>Hint hint hint hint hint</span></a>
						</div>

						<p>Based on this data, can you arrange the metals from least reactive to most reactive?</p>

						<ul id="sortable">
							<li class="drag-option" id="drag_01">Zn</li>
							<li class="drag-option" id="drag_02">Cu</li>
							<li class="drag-option" id="drag_03">Sn</li>
							<li class="drag-option" id="drag_04">Mg</li>
							<li class="drag-option" id="drag_05">Ag</li>
						</ul>

						<?php
							$order = $_GET["order"];
						?>

						<p style="position:absolute;left:200px;top:45px;">Least reactive (reacts with no other metal ions)</p>
						<p style="position:absolute;left:200px;top:200px;">Most reactive (reacts with all other metal ions)</p>
					</div>
				</form>

				<div class="results">
					<?php
						if ($order == "drag[]=01&drag[]=02&drag[]=03&drag[]=04&drag[]=05") {
							print "Correct!";
						} else {
							print "Incorrect. The correct order is Zn, Cu, Sn, Mg, Ag.";
						}
					?>
				</div>
			</div>
		</div>

	</div>

	<div id="footer-wrapper"> <!-- for full width background color -->
		<div id="footer">
				
			<a href="help/copyright"><p id="free">The ChemCollective site and its contents are licensed under a Creative Commons Attribution 3.0 NonCommercial-NoDerivs License. </p></a>
			<a href="home/contact" id="contact">Contact Us</a>

		</div>
	</div>
	<!-- JavaScript at the bottom for fast page loading -->
	<!-- Grab Google CDN's jQuery, with a protocol relative URL; fall back to local if necessary -->
	<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js"></script>
	<script>window.jQuery || document.write("<script src='assets/common/js/libs/jquery-1.9.2.min.js'>\x3C/script>")</script>-->

	<!-- load jquery ui libraries-- dependency for star rating plugin -->
	<!-- can also load from google: https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js -->
	<!-- <script type="text/javascript" src="http://chemcollective.org/assets/common/js/libs/jquery.ui.core.min.js"></script>
	<script type="text/javascript" src="http://chemcollective.org/assets/common/js/libs/jquery.ui.widget.min.js"></script> -->

	<!-- Get Google's less.js, local is here but commented out 
	<script type="text/javascript" src="//lesscss.googlecode.com/files/less-1.1.3.min.js">
		less.env = "development";
		less.watch();
	</script>-->
	<!-- <script type="text/javascript" src="assets/common/js/libs/less-1.1.3.min.js"</script> -->
	
	<!-- js plugins should be consolidated -->
	<script type="text/javascript" src="http://chemcollective.org/assets/common/js/galleria/galleria-1.2.4.min.js"></script>
	<script type="text/javascript" src="http://chemcollective.org/assets/common/js/galleria/loadGalleria.js"></script>
	

	<!-- Non-library javascript (should be consolidated into one file -->
	<!-- need link to google jsapi to use google custom search code -->
	<script type="text/javascript" src="//www.google.com/jsapi"></script>
	<script type="text/javascript" src="http://chemcollective.org/assets/common/js/searchBox.js" ></script>
	<script type="text/javascript" src="http://chemcollective.org/assets/modules/search/js/search_results.js" ></script>

	<!-- for collapsing navigation, used on activities list by topic and by type browsing pages -->
	<script type="text/javascript" src="http://chemcollective.org/assets/common/js/menu-collapsed.js" ></script>

	<!-- for star rating boxes on activity info pages; load the js file and call the rating() function -->
	<!-- <script type="text/javascript" src="http://chemcollective.org/assets/common/js/jquery.ui.stars.js"></script> -->
	
	<!-- <script type="text/javascript">
		$(document).ready(
		function(){
			$("#stars-wrapper").stars({
				inputType: "select"
			});
		}
	</script>
	-->
		



	<!--[if lt IE 7 ]>
	<script src="assets/common/js/libs/dd_belatedpng.js"></script>
	<script>DD_belatedPNG.fix("img, .png_bg"); // Fix any <img> or .png_bg bg-images. Also, please read goo.gl/mZiyb </script>
	<![endif]-->


	<!-- mathiasbynens.be/notes/async-analytics-snippet Change UA-XXXXX-X to be your site's ID 
	<script>
	var _gaq=[["_setAccount","UA-15502734-1"],["_trackPageview"]];
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
	g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
	s.parentNode.insertBefore(g,s)}(document,"script"));
	</script>
	-->		
</body>

</html>