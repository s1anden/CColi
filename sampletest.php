
<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7 ]> <html class="no-js ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>    <html class="no-js ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>    <html class="no-js ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--> <html class="no-js" lang="en"> <!--<![endif]-->


<head>
	<meta charset="utf-8">

	<!-- makes all relative links to base url -->
	<!-- <base href="http://chemcollective.org/"> <!--[if lte IE 6]></base><![endif]-->

	<title>ChemCollective</title>
	
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="Content-language" content="en" />
	
	<meta name="description" content= "Online Resources for Teaching and Learning Chemistry" /> 
	
	<!-- Mobile viewport optimized: j.mp/bplateviewport  -->
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- favicon.ico -->
	<link rel="icon" href="favicon.png" >


	
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
	
	<!-- and the java script to handle cross-browser embedding for java applets -->
	<!-- http://stackoverflow.com/questions/4272666/embedding-java-applet-into-html-file -->
	<!-- http://download.oracle.com/javase/6/docs/technotes/guides/jweb/deployment_advice.html -->
	<script src="http://java.com/js/deployJava.js"></script>
	<!-- <script src="http://chemcollective.org/assets/common/js/atlassian-deployJava.js" ></script>  -->


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
				<form id="multiple-choice" method="get" action="sampletest.php">
					<h1>Beginning to Code Questions</h1>

					<div class="multiple-choice-wrapper">
						<?php
							$a_status = "unchecked";
							$b_status = "unchecked";
							$c_status = "unchecked";
							$selected_answer = $_GET['samp01'];
							if ($selected_answer == 'A'){
								$a_status = "checked";
							}
							else if ($selected_answer == 'B'){
								$b_status = 'checked';
							}
							else if ($selected_answer == 'C'){
								$c_status = 'checked';
							}
						?>
						<h3 class="question-number">Question 1</h3>
						<div class="question-wrapper">
							<p>The universal gas constant is approximately 0.0821 L atm mol<sup>-1</sup> K<sup>-1</sup>. How many significant figures are given here?</p>
							<div class="multiple-choice-options">
								<ol class="multiple-choice">
									<li>
										<label for="samp01"><input type="radio" name="samp01" value="A" <?PHP print $a_status; ?>
											>  3</label>
									</li>

									<li>
										<label for="samp01"><input type="radio" name="samp01" value="B" <?PHP print $b_status; ?>
											>  4</label>
									</li>

									<li>
										<label for="samp01"><input type="radio" name="samp01" value="C" <?PHP print $c_status; ?>
											>  5</label>
									</li>
								</ol>
							</div>
						</div>

						<div class="results">
							<?php
								if ($selected_answer == "A"){
									print "Correct.";
								}
								else {
									print "Incorrect. The right answer was A.";
								}
							?>
						</div>
					</div>

					<div class="multiple-choice-wrapper">
						<?php
							$a_status = "unchecked";
							$b_status = "unchecked";
							$c_status = "unchecked";
							$d_status = "unchecked";
							$e_status = "unchecked";
							$selected_answer = $_GET['samp01'];
							if ($selected_answer == 'A'){
								$a_status = "checked";
							}
							else if ($selected_answer == 'B'){
								$b_status = 'checked';
							}
							else if ($selected_answer == 'C'){
								$c_status = 'checked';
							}
							else if ($selected_answer == 'D'){
								$d_status = 'checked';
							}
							else if ($selected_answer == 'E'){
								$e_status = 'checked';
							}
						?>
						<h3 class="question-number">Question 2</h3>
						<div class="question-wrapper">
							<p>What is the correct answer (reported to the proper number of significant figures) to the following?</p>
							<p>6.3 * 3.25 = ______________</p>
							<div class="multiple-choice-options">
								<ol class="multiple-choice">
									<li>
										<label for="samp02"><input type="radio" name="samp02" value="A" <?PHP print $a_status; ?>>  20</label>
									</li>

									<li>
										<label for="samp02"><input type="radio" name="samp02" value="B" <?PHP print $b_status; ?>>  20.475</label>
									</li>

									<li>
										<label for="samp02"><input type="radio" name="samp02" value="C" <?PHP print $c_status; ?>>  20.48</label>
									</li>

									<li>
										<label for="samp02"><input type="radio" name="samp02" value="D" <?PHP print $d_status; ?>>  20.5</label>
									</li>

									<li>
										<label for="samp02"><input type="radio" name="samp02" value="E" <?PHP print $e_status; ?>>  21</label>
									</li>
								</ol>
							</div>
						</div>


						<div class="multiple-choice-results">
							<?php
								if ($selected_answer == "A"){
									print "Correct.";
								}
								else {
									print "Incorrect. The right answer was A.";
								}
							?>
						</div>
					</div>

					<div class="multiple-choice-wrapper">
						<?php
							$a_status = "unchecked";
							$b_status = "unchecked";
							$c_status = "unchecked";
							$d_status = "unchecked";
							$e_status = "unchecked";
							$selected_answer = $_GET['samp01'];
							if ($selected_answer == 'A'){
								$a_status = "checked";
							}
							else if ($selected_answer == 'B'){
								$b_status = 'checked';
							}
							else if ($selected_answer == 'C'){
								$c_status = 'checked';
							}
							else if ($selected_answer == 'D'){
								$d_status = 'checked';
							}
						?>
						<h3 class="question-number">Question 3</h3>
						<div class="question-wrapper">
							<p>You add 0.6 ounces of milk to a cup with 8 ounces of coffee. How much liquid is now in the cup, to the correct amount of significant figures?</p>
							<div class="multiple-choice-options">
								<ol class="multiple-choice">
									<li>
										<label for="samp03"><input type="radio" name="samp03" value="A" <?PHP print $a_status; ?>>  9 oz.</label>
									</li>

									<li>
										<label for="samp03"><input type="radio" name="samp03" value="B" <?PHP print $b_status; ?>>  8 oz.</label>
									</li>

									<li>
										<label for="samp03"><input type="radio" name="samp03" value="C" <?PHP print $c_status; ?>>  8.6 oz.</label>
									</li>

									<li>
										<label for="samp03"><input type="radio" name="samp03" value="D" <?PHP print $d_status; ?>>  8.60 oz.</label>
									</li>
								</ol>
							</div>
						</div>

						<div class="multiple-choice-results">
							<?php
								if ($selected_answer == "A"){
									print "Correct.";
								}
								else {
									print "Incorrect. The right answer was A.";
								}
							?>
						</div>
					</div>

					<div class="multiple-choice-wrapper">
						<?php
							$a_status = "unchecked";
							$b_status = "unchecked";
							$c_status = "unchecked";
							$d_status = "unchecked";
							$e_status = "unchecked";
							$selected_answer = $_GET['samp01'];
							if ($selected_answer == 'A'){
								$a_status = "checked";
							}
							else if ($selected_answer == 'B'){
								$b_status = 'checked';
							}
							else if ($selected_answer == 'C'){
								$c_status = 'checked';
							}
							else if ($selected_answer == 'D'){
								$d_status = 'checked';
							}
							else if ($selected_answer == 'E'){
								$e_status = 'checked';
							}
						?>
						<h3 class="question-number">Question 4</h3>
						<div class="question-wrapper">
							<p>A wooden object has a mass of 10.782 g and occupies a volume of 13.72 mL. What is the density of the object determined to an appropriate number of significant figures? (Hint: density = mass / volume)</p>
							<div class="multiple-choice-options">
								<ol class="multiple-choice">
									<li>
										<label for="samp04"><input type="radio" name="samp04" value="A" <?PHP print $a_status; ?>>  8 x 10<sup>-1</sup> g/mL</label>
									</li>

									<li>
										<label for="samp04"><input type="radio" name="samp04" value="B" <?PHP print $b_status; ?>>  7.9 x 10<sup>-1</sup> g/mL</label>
									</li>

									<li>
										<label for="samp04"><input type="radio" name="samp04" value="C" <?PHP print $c_status; ?>>  7.86 x 10<sup>-1</sup> g/mL</label>
									</li>

									<li>
										<label for="samp04"><input type="radio" name="samp04" value="D" <?PHP print $d_status; ?>>  7.859 x 10<sup>-1</sup> g/mL</label>
									</li>

									<li>
										<label for="samp04"><input type="radio" name="samp04" value="E" <?PHP print $e_status; ?>>  7.8586 x 10<sup>-1</sup> g/mL</label>
									</li>
								</ol>
							</div>
						</div>

						<div class="multiple-choice-results">
							<?php
								if ($selected_answer == "D"){
									print "Correct.";
								}
								else {
									print "Incorrect. The right answer was D.";
								}
							?>
						</div>
					</div>

					<div class="multiple-choice-wrapper">
						<?php
							$a_status = "unchecked";
							$b_status = "unchecked";
							$c_status = "unchecked";
							$d_status = "unchecked";
							$e_status = "unchecked";
							$selected_answer = $_GET['samp01'];
							if ($selected_answer == 'A'){
								$a_status = "checked";
							}
							else if ($selected_answer == 'B'){
								$b_status = 'checked';
							}
							else if ($selected_answer == 'C'){
								$c_status = 'checked';
							}
							else if ($selected_answer == 'D'){
								$d_status = 'checked';
							}
							else if ($selected_answer == 'E'){
								$e_status = 'checked';
							}
						?>
						<h3 class="question-number">Question 5</h3>
						<div class="question-wrapper">
							<p>Which of the following has the same number of significant figures as the number 1.00580?</p>
							<div class="multiple-choice-options">
								<ol class="multiple-choice">
									<li>
										<label for="samp05"><input type="radio" name="samp05" <?PHP print $a_status; ?>>  2 x 10<sup>6</sup></label>
									</li>

									<li>
										<label for="samp05"><input type="radio" name="samp05" <?PHP print $b_status; ?>>  199.791</label>
									</li>

									<li>
										<label for="samp05"><input type="radio" name="samp05" <?PHP print $c_status; ?>>  8.66</label>
									</li>

									<li>
										<label for="samp05"><input type="radio" name="samp05" <?PHP print $d_status; ?>>  5.119</label>
									</li>

									<li>
										<label for="samp05"><input type="radio" name="samp05" <?PHP print $e_status; ?>>  100</label>
									</li>
								</ol>
							</div>
						</div>

						<div class="multiple-choice-results">
							<?php
								if ($selected_answer == "B"){
									print "Correct.";
								}
								else {
									print "Incorrect. The right answer was B.";
								}
							?>
						</div>
					</div>

					<input type="submit" value="submit" "onclick=validate();">	
				</form>
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
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.js"></script>
	<script>window.jQuery || document.write("<script src='assets/common/js/libs/jquery-1.5.1.min.js'>\x3C/script>")</script>

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


