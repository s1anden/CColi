/*
 * $Id: oa.js,v 1.5 2009/05/29 17:10:10 jar2 Exp $
 */
var benchmarkTracker, overallTracker;
var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
var ga = document.createElement("script");
ga.setAttribute("type","text/javascript");
ga.setAttribute("src",  gaJsHost + "google-analytics.com/ga.js");
document.getElementsByTagName("head")[0].appendChild(ga);
function _gaReady() {
	benchmarkTracker = _gat._getTracker("UA-5145430-1");
	benchmarkTracker._setAllowHash(false);
	benchmarkTracker._setAllowLinker(true);
	benchmarkTracker._trackPageview();
	overallTracker = _gat._getTracker("UA-5033010-1");
	overallTracker._setAllowHash(false);
	overallTracker._setAllowLinker(true);
	overallTracker._trackPageview();
}
if (window.addEventListener) {
	window.addEventListener('load', _gaReady, false);
} else if (window.attachEvent) {
	window.attachEvent('onload', _gaReady);
}
function _trackLink(href) {
	benchmarkTracker._trackPageview(href);
	overallTracker._trackPageview(href);
}
function _transferTo(href) {
	if (href.indexOf("://") > -1 && href.indexOf("://" + document.location.hostname) < 0) {
		benchmarkTracker._link(href);
		return false;
	} else {
		return true;
	}
}