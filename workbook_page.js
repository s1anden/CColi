/**
* $Id: workbook_page.js,v 1.248 2010/07/16 20:16:36 clq Exp $
* Copyright (c) 2003-2009 Carnegie Mellon University.
* Reviewed by Carlos Quesada
* Organized to match order of DTD
*/
var AZ = AZ && typeof AZ === "object" ? AZ : {};
/* Mootools setup */
window.addEvent('domready', function () {
  /* Scroll to current */
  (function () {
	  if (document.getElement('body.outlinePage')){return false};
      var p = document.getElementById('md-activitycurrent');
      if (p && typeof p === "object") {
        p = p.getPosition();
        var b = document.getElementById('body').getSize();
        b = p.y - b.y / 2;
        window.scroll(0, b);
      }
  }());

  /**
   * Mouse-over content for an extra.
   */   
/*  AZ.showExtra = function (extra) {
    var o = document.getElementById(extra);
    if (o && typeof o === "object") {
      o.style.display = '';
            
    }
  };
  AZ.hideExtra = function (extra) {
    var o = document.getElementById(extra);
    if (o && typeof o === "object") {
      o.style.display = 'none';
    }
  };
  (function () {
    var extras = $$('.extra, .extra a'),
    i;
    for (i = extras.length -1; i >= 0; i -= 1) {
      extras[i].addEvents({
        mouseover: function (event) {AZ.showExtra(this.id+'float')},
        mouseout: function () {AZ.hideExtra(this.id+'float')},
        blur: function () {AZ.hideExtra(this.id+'float')},
        focus: function () {AZ.showExtra(this.id+'float')}        
      });
    }
  }());*/
  /*
   * Cite
   */
  $$('.ref').addEvent('click', function (e) {
    var refid = $(this.getProperty('href').split('#')[1]);
    var fx = refid.highlight('#e6cb45');
  });
  /* Hide Learning Objectives */
  // encapsulate vars in a function that runs upon being created
  var toggleLObj = function () {
    var lo = document.getElementById('lobjh'),
    h3, a;
    if (lo && typeof lo === "object") {
      h3 = lo.getElementsByTagName('h3').item(0);
      a = document.getElementById('tgllobj');
      if (! a) {
        a = document.createElement('a');
        a.id = 'tgllobj';
        var atxt = document.createTextNode('Hide');
        a.appendChild(atxt);
        h3.insertBefore(a, h3.firstChild);
      }
      a.setAttribute('onclick', 'this.toggle()');
      a.toggle = function () {
        if (lo.style.display !== 'none') {
          lo.parentNode.insertBefore(this, lo);
          lo.style.display = 'none';
          this.setAttribute('class', 'off');
          this.firstChild.data = 'Learning Objectives';
          themeoptions.setVar('lObjectives', 0);
        } else {
          h3.appendChild(this);
          lo.style.display = '';
          this.removeAttribute('class');
          this.firstChild.data = 'Hide';
          themeoptions.setVar('lObjectives', 1);
        }
      }
      return false;
    }
  }
  ();
});

/**
* End of code reviewed by Carlos Quesada
* Below is pre-Azool code
*/

// Global variable for last window handle
var lastWin;

// Global variable, absolute path to images
var images;

/**
* Loads an image in a pop-up window. The window is automatically sized to
* the image.
*
* @param     src     URL of the image to load
*/
function loadImage(src) {
    var imageCache = {};
    // add base HREF to relative URLs for Internet Explorer (5?)
    if (Browser.Engine.trident && (src.indexOf("http://") < 0)) {
        src = getBaseHref() + src;
    }    
    // pre-load image to get size, then open window
    imageCache.lastImg = new Image();
    imageCache.lastImg.onload = function() {
        var options = stdOpt;    
        if (imageCache.lastImg) {
            if (imageCache.lastImg.width) {
                var width = Math.min((imageCache.lastImg.width + 35), 760);
                options += "width=" + width + ",";
            }
            if (imageCache.lastImg.height) {
                var height = Math.min((imageCache.lastImg.height + 35), 475);
                options += "height=" + height;
            }
        }
        var win = window.open(imageCache.lastImg.src, "image", options);       
        if (win && window.focus) {
          win.focus();
        }
    };
    imageCache.lastImg.src = src;
}

/**
* Initializes each graph applet, restoring it to its previous state (encoded
* in hidden form field).
*/
function initGraphs() {
  //	var form = document.forms[0];
  var form = document.getElementsByTagName('form')[0];
  
  for (var i = 0; i < form.elements.length; i++) {
    if (form.elements[i].name.indexOf('graph') == 0) {
      var applet = document.applets[form.elements[i].name];
      var data = form.elements[ 'R' + form.elements[i].name];
      
      if ((applet != null) && (data != null) && (data.value != null)) {
        applet.restore(data.value);
      } else {
        continue;
      }
    } else {
      continue;
    }
  }
}

/**
* Restores the given graph applet to the specified state (encoded as a
* string).
*
* @param     id         id of the graph to restore
* @param     value      saved state data
*/
function restoreGraph(id, value) {
  if ((document.applets.length > 0) && (document.applets[id] != null)) {
    document.applets[id].restore(value);
  }
  
  return false;
}

/**
* Retrieves the base URL from the document if a valid is specified in the
* document. Otherwise, the functions returns an empty string.
*
* @return    base HREF, if specified in document
*/
function getBaseHref() {
  var base = document.all.tags('base');
  
  if (!(base && base.length)) {
    return "";
  } else {
    var href = base[0].href
    return href.substring(0, href.lastIndexOf("/") + 1);
  }
}


/**
* Display mouse-over content for a phrase.
*
* @param     link     link which the mouse is over
* @param     path     path to audio clip, or null
* @param     trans    translation of the phrase, or null
* @param     lang     language of the translation, or null
* @param     explan   explanation of the phrase, or null
*/
function showPhrase(link, path, trans, lang, explan) {
}
/*Temporarily deprecated, broken.*/
/*
function showPhrase(link, path, trans, lang, explan) {
var maxChars = 0;
var div = document.getElementById('_s_p');

if (div != null) {
for (var y = 0, z = div.childNodes.length; y < z; y++) {
div.removeChild(div.childNodes[0]);
}
div.parentNode.removeChild(div);
}

div = document.createElement('div');
div.id = '_s_p';
document.getElementsByTagName("body") [0].appendChild(div);
div.style.visibility = 'hidden';

if (trans != null) {
var transDiv = document.createElement('div');
transDiv.className = 'translate';

if ((path != null) || (explan != null)) {
transDiv.style.borderBottom = '1px solid black';
}

if (lang != null) {
var langSpan = document.createElement('span');
langSpan.className = 'lang';
langSpan.appendChild(document.createTextNode(lang));
transDiv.appendChild(langSpan);
maxChars = lang.length + trans.length;
} else {
maxChars = trans.length;
}

transDiv.appendChild(document.createTextNode(trans));
div.appendChild(transDiv);
}

if (explan != null) {
var explanDiv = document.createElement('div');
explanDiv.className = 'explain';

if (path != null) {
explanDiv.style.borderBottom = '1px solid black';
}

explanDiv.appendChild(document.createTextNode(explan));
div.appendChild(explanDiv);
maxChars = Math.max(maxChars, explan.length);
}

if (path != null) {
var pathDiv = document.createElement('div');
pathDiv.className = 'pronounce';

var iconImg = document.createElement('img');
iconImg.setAttribute('src', images + '/speaker.gif');
iconImg.setAttribute('border', '0');
iconImg.setAttribute('align', 'absmiddle');
pathDiv.appendChild(iconImg);

pathDiv.appendChild(document.createTextNode('Click to Listen'));

div.appendChild(pathDiv);
}

var pos = findPosition(link);
var left = pos[0] + (is_ie ? 38 : 25);
var top = pos[1] + (is_ie ? 38 : 25);
var width = Math.min(Math.max(((maxChars * 8) + 25), 150), 350);

if (window.innerWidth) {
if ((left + width + 15) > window.innerWidth) {
left = (window.innerWidth - width - 25);
}
}
if (document.body.scrollWidth) {
if ((left + width + 15) > document.body.scrollWidth) {
left = (document.body.scrollWidth - width - 25);
}
}

div.className = 'phrase';
div.style.left = left + 'px';
div.style.top = top + 'px';
div.style.width = width + 'px';
div.style.visibility = 'visible';
}
*/

/**
* Hide visible phrase. Stop associated audio clip from playing.
*/
function hidePhrase() {
  var div = document.getElementById('_s_p');
  
  if (div) {
    div.style.visibility = 'hidden';
  }
}

/**
* Finds the X,Y position of the specified object.
*
* @param     obj     object in document
* @return    X,Y coordinates
*/
function findPosition(obj) {
  var posX = 0, posY = 0;
  if (obj.offsetParent) {
    while (obj.offsetParent) {
      posX += obj.offsetLeft;
      posY += obj.offsetTop;
      obj = obj.offsetParent;
    }
  } else {
    posX += obj.x;
    posY += obj.y;
  }
  return[posX, posY];
}

function swapImage(id, img) {
  var imgElem = document.getElementById(id);
  var base = imgElem.src.substring(0, imgElem.src.lastIndexOf("/"));
  imgElem.src = base + "/" + img;
}

/**
* Displays an image, already loaded in the current page, in a pop-up window.
* The window is automatically sized to the image.
*/
function loadImageFromPage(image) {
  var width = Math.min((image.width + 35), 760);
  var height = Math.min((image.height + 35), 475);
  var options = stdOpt + "width=" + width + ",height=" + height;
  var win = window.open(image.src, "image", options);
  if (window.focus) win.focus();
}

/**
* Loads an activity (feedback, etc.) into an iFrame inside the activity frame.
*
*/
function loadActivity(el, props, dest) {
  if ($('i' + dest)) return false//use once
  var myFx = new Fx.Scroll($('body'), {
    wait: false,
    duration: 750,
    offset: {
      'x': 0, 'y': 0
    },
    transition: Fx.Transitions.Quad.easeInOut
  });
  var myy = $(dest).getPosition($('oli-container')).y;
  myFx.start(0, myy);
  $(dest).setStyles('width', '100%');
  //margin:30px -10px 10px;border-width:1px 0;display:block;
  var cell = $(dest).getElement('.iframe');
  cell.setProperty('class', 'loading');
  var myIFrame = new IFrame({
    src: el,
    id: 'i' + dest,
    'class': 'loading',
    styles: {
      width: '100%',
      border: '0'
    },
    frameborder: 0,
    events: {
      load: function () {
        //if(debug) alert('8: ' +this.getScrollSize().y);
        //this.contentWindow.document.body.getElement('#pagetitle').setStyle('display','none');
        cell.setProperty('class', 'loaded');
        this.setProperty('class', 'loaded');
        if (parent.location.protocol == 'https:') {
          var d = util_selectiframe(this);
          d.className = d.className + ' iframe';
          $('i' + dest).setStyle('height', d.scrollHeight);
        }
        myFx.start(0, myy);
      }
    }
  });
  $(dest).setStyle('width', '100%');
  myIFrame.inject(cell);
  return false;
}

function util_selectiframe(i) {
  // IE: i.contentWindow.document.body
  // FF:...
  var d = i.contentWindow || i.contentDocument || i;
  //alert('0: '+i+', '+i.contentWindow+', '+i.contentDocument);
  if (d.document) {
    d = d.document;
    //  alert('1: '+d);
  }
  if (d.getElementById('body')) {
    d = d.getElementById('body');
    //alert('3: '+d+': '+d.className);
  }
  if (d.body) {
    d = d.body;
    //alert('2: '+d+': '+d.className);//getProperty('class'));
  }
  return d;
}

//for Debugging
function showDOM(obj) {
  var s = obj.getElementsByTagName('*');
  var str = '-';
  for (var i = 0; i < s.length; i++)
  str += s[i].nodeName + ' \r ';
}