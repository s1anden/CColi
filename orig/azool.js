/*
* $Id: azool.js,v 1.271.2.7 2010/11/11 18:42:06 clq Exp $
* Copyright (c) 2003-2008 Carnegie Mellon University.
*/
/*
 * Requires: Mootools Core
 * Requires:  Mootools More 1.2.4.1
 */
/**
 * Config 
 */
var AZ = AZ ? AZ : {},
themeoptions,
useAccessibility = true;

AZ.elementInViewport = function (el) {
  var top = el.offsetTop;
  var height = el.offsetHeight;//inaccurate in IE?
  var myOffsetParent = el.offsetParent;
  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
  }
  return (
    top < (window.pageYOffset + window.innerHeight) &&
    (top + height) > window.pageYOffset
  );
};
/**
 * Page Setup
 */
window.addEvent('domready', function () {
    // Move all vars to one declaration at the top 
    var pHeadings = {}, i;
    /*
     * Page Index
     */
    pHeadings = (function () {
      var pi = document.getElementById('pHeadings'),
      pih = document.getElementById('pHeadingsTitle');                                           // heading
      if (pi && typeof pi === "object" && pih && typeof pih === "object") {
        pih.onclick = function (e) {
          if (pi.className === "off") {
            pi.className = '';
            themeoptions.setVar('pHeadings', 1);
          } else {
            pi.className = 'off';
            themeoptions.setVar('pHeadings', 0);
          }
        };
      }
    }());
    /**
    * Class ThemeOptions to get and set cookie values
    *
    * params    array     value of cookie
    * getVar     public method
    * setVar     public method
    */
    function ThemeOptions() {
        var params = null;
        this.getVar = function (name) {
            if (params == null) {
                _readParams();
            }
            return params[name];
        };
        this.setVar = function (name, value) {
            if (params == null) {
                _readParams();
            }        
            params[name] = value;
            _writeParams();
        };
        function _readParams() {
            params = {};
            var cookie = _readCookie("opts");
            if (cookie != null) {
                var pairs = unescape(cookie).split(',');
                for (var j = 0; j < pairs.length; j++) {
                    var pair = pairs[j].split('=');
                    params[pair[0]] = pair[1];
                }
            }
        }
        function _readCookie(name) {
            var cookie = null;
            if (document.cookie && document.cookie.length > 0) {
                var idx = document.cookie.indexOf(name);
                if (idx != - 1) {
                    idx += name.length + 1;
                    var end = document.cookie.indexOf(";", idx);
                    if (end == - 1) {
                        end = document.cookie.length;
                    }
                    cookie = unescape(document.cookie.substring(idx, end));
                }
            }
            return cookie;
        }
        function _writeParams() {
            if (params != null) {
                var value = [];
                for (i in params) {
                    value.push([i, params[i]].join('='));//value += i + '=' + params[i] + '|';
                }
                value = value.join(',');
                _writeCookie("opts", value);
            }
        }
        function _writeCookie(name, value) {
            document.cookie = name + "=" + escape(value) + "; path=/";
        }
    }
    themeoptions = new ThemeOptions();
    
    // Platform / User Agent Detection
    themeoptions.setVar('Browser_Engine_name', Browser.Engine.name);
    themeoptions.setVar('Browser_Platform_name', Browser.Platform.name);
    
    /** 
     * Page Number
     * Uses Mootools for Tips
     */
    AZ.pageNumber = (function() {
      var guids = document.getElementById('pagnumguids'), // caqu: to be deprecated once resolver exists, XML serves pagemax
      //pagnumnew = document.getElementById('pagnumnew'),
      pagnumform = document.getElement('form.pageForm'),
      pagnumnewinput = document.getElement('input.paginationInput'),
      pagnumtip = document.getElement('span.pageTip'),
      pagnummax = parseInt((document.getElement('input.pageMax')||{value:0}).value, 10);
      // Assemble data tossed in HTML
      if (pagnumnewinput && typeof pagnumnewinput === "object") {

        pagnumnewinput.onfocus = function(){
          pagnumtip.style.display = '';
          this.select();
        };
        pagnumnewinput.onblur = function(){
          pagnumtip.style.display = 'none';
        };        
        pagnumform.onsubmit = function () {
          var requestedPageNumber = parseInt(pagnumnewinput.value, 10);

          if (requestedPageNumber > pagnummax) {
            alert('There are only ' + (pagnummax) + ' pages.');
          } else if (requestedPageNumber > 0 ) {
            //window.location = chosenPath + guid;
             window.location = this.action + '&page=' + requestedPageNumber; 
          } else {
            alert('Please enter a valid page number (' + 1 + '-' + (pagnummax) + ')' );
          }
          return false;
        }      
      }
    }());
	
    AZ.pageNumber2 = (function() {
      var guids = document.getElementById('pagnumguids2'), // caqu: to be deprecated once resolver exists, XML serves pagemax
      //pagnumnew = document.getElementById('pagnumnew'),
      pagnumform = document.getElement('form.pageForm2'),
      pagnumnewinput = document.getElement('input.paginationInput2'),
      pagnumtip = document.getElement('span.pageTip2'),
      pagnummax = parseInt((document.getElement('input.pageMax2')||{value:0}).value, 10);
      // Assemble data tossed in HTML
      if (pagnumnewinput && typeof pagnumnewinput === "object") {

        pagnumnewinput.onfocus = function(){
          pagnumtip.style.display = '';
          this.select();
        };
        pagnumnewinput.onblur = function(){
          pagnumtip.style.display = 'none';
        };        
        pagnumform.onsubmit = function () {
          var requestedPageNumber = parseInt(pagnumnewinput.value, 10);

          if (requestedPageNumber > pagnummax) {
            alert('There are only ' + (pagnummax) + ' pages.');
          } else if (requestedPageNumber > 0 ) {
            //window.location = chosenPath + guid;
             window.location = this.action + '&page=' + requestedPageNumber; 
          } else {
            alert('Please enter a valid page number (' + 1 + '-' + (pagnummax) + ')' );
          }
          return false;
        }      
      }
    }());
	
    /*
     * Purpose Type Tooltips 
     */
    (function(){
        var purpsTips = new Tips($$('.purposeType'), {
            title: function (el) {
                var str = el.get('title') || '';
                str.split('    ').join('</strong> ').split('   ').join(' <strong>');
                return str;
            },
            text: '',
            className: 'purpstip'
        });
    }());
    $$('.purpstip').setStyle('left', '-9000px');
	
	
	(function(){
        var purpsTips = new Tips($$('.section-learnbydoing .head'), {
            title: function (el) {
                var str = el.get('title') || 'Practice this Material';
                str.split('    ').join('</strong> ').split('   ').join(' <strong>');
                return str;
            },
            text: '',
            className: 'purpstip'
        });
    }());
    $$('.purpstip').setStyle('left', '-9000px');
	
	(function(){
        var purpsTips = new Tips($$('.section-didigetthis .head'), {
            title: function (el) {
                var str = el.get('title') || 'Check your own understanding of what you just learned.';
                str.split('    ').join('</strong> ').split('   ').join(' <strong>');
                return str;
            },
            text: '',
            className: 'purpstip'
        });
    }());
    $$('.purpstip').setStyle('left', '-9000px');
	
    /*
    * Anti Jam. A trap for double-click to prevent 500 error
    */
    AZ.antiJam = {
        status: false,
        buttons: $$('.oneclick'),
        init: function () {
            for (i = AZ.antiJam.buttons.length - 1; i >= 0; i -= 1) {
                var btn = AZ.antiJam.buttons[i];
                // Overload onclick attr to garantee an order of execution and cross-browsers support.
                btn.onclickBak = btn.onclick; // Preserve @onclick function
                btn.onclick = function () { // Create new function
                    if (AZ.antiJam.status) {
                      return false;          // Refuse duplicate
                    }
                    if (typeof this.onclickBak === 'function') {
                        this.onclickBak();            // Fire @onclick function
                    }
                    if (this.href) {  // Exec href; may need to reparse js: prefix
                        this.target = this.target ? this.target : '_self';
                        window.open(this.href, this.target);//prefix "javascript:" works too
                    }
                    AZ.antiJam.click(); // Disable the button temporarily
                    return false; //addEventListener is executed in random order. Do not use it! If you do, it will break on this line.
                };
            }
        },
        click: function () {
            if (!AZ.antiJam.status) {
                AZ.antiJam.status = true;
                for (i = AZ.antiJam.buttons.length - 1; i >= 0; i -= 1) {
                    AZ.antiJam.buttons[i].disabled = 'disabled';
                    AZ.antiJam.buttons[i].className = AZ.antiJam.buttons[i].
                      className + ' off';
                }
                setTimeout("AZ.antiJam.click();",5000);
            } else {
                AZ.antiJam.status = false;
                for (i = AZ.antiJam.buttons.length - 1; i >= 0; i -= 1) {
                    AZ.antiJam.buttons[i].removeAttribute('disabled');
                    AZ.antiJam.buttons[i].className = AZ.antiJam.buttons[i].
                      className.split(' off').join('');
                }
            }
            return true;
        }
    };
    AZ.antiJam.init();
    /*
    * Styles that CSS alone can't handle 
    */
    var bis = $$('imagewrap'); //mootools to handle IE6 missing document.getElementsByClassName
    for (i = bis.length - 1; i >= 0; i -= 1) {
      var caption = bis[i].getElements('.captionwrap')[0];//mootools to handle IE6
      if (caption && typeof caption === "object") {
        var image = bis[i].getElementsByTagName('img')[0];
        var s = image.width;
        caption.style.minWidth = s+'px'; 
      }
    }    
    /*
    * MathPlayer send all IEs into Quirks Mode, thus max-width
    */ 
    if ( Browser.Engine.trident && navigator && navigator.userAgent && 
         navigator.userAgent.indexOf('MathPlayer') !== -1 ) {
      AZ.calcWidth = function () {
        var ccMaxWidth = 1000,
        cc = document.getElementById('cc'),
        dbcw = document.body.clientWidth;
        margin = dbcw / 2 - ccMaxWidth / 2;
        cc.style.width = dbcw > ccMaxWidth ? ccMaxWidth + 'px' : '';
        cc.style.margin = dbcw > ccMaxWidth ? '0 ' + margin + 'px' : '';
      }
      AZ.calcWidth();
      window.attachEvent('onresize', AZ.calcWidth);
    }      
    /*
     * Menu on top 
     */
    AZ.showMenu = (function() {
      var cc = document.getElementById('cc'),
      sysnav = document.getElementById('sysnav'),
      span = document.createElement('span'),
      txt = document.createTextNode('| '),
      a = document.createElement('a'),
      menu = document.createTextNode('More'),
      wn = document.getElementById('wn'),
      menu_click_event, menu_key_event,
      state;
      if (sysnav && typeof sysnav === 'object') {
        a.id = 'wnMore';
        a.className = 'more';
        a.appendChild(menu);
        span.appendChild(txt);
        span.appendChild(a);
        sysnav.appendChild(span);
        a.href = 'javascript:void(0)';
        a.accessKey = 'M';
        a.title = 'Access Key: M'; 
        menu_key_event = function (e) {
          if (e && e.keyCode === 27 || window && window.event && window.event.keyCode === 27) { // Esc
            AZ.showMenu(a, 0);
          }
        };
        menu_click_event = function (e) {
          AZ.showMenu(a, 0);
        };
        //a.onmouseover = 
        a.onclick = function (evt) {
          if (document.getElementById('wn').parentNode !== span) {
            AZ.showMenu(this, 1);
          } else {
            AZ.showMenu(this, 0);
          }
          if (evt && evt.stopPropagation) {
            evt.stopPropagation();            // W3C no bubble
          }          
          if (window && window.event) {
            window.event.cancelBubble = true; // IE no bubble
          }
        };
        return function (that, p) {
          if (p) {                  // Turn menu on
            that.parentNode.appendChild(wn);          
            wn.getElementsByTagName('a')[0].focus();
            document.onkeydown = menu_key_event;
            document.onclick = menu_click_event;
          } else {
            cc.appendChild(wn);
            document.onkeydown = null;
            document.onclick = null;
          }
        };
      };
    }());
    /*
    * Help
    */    
    (function () {
      var contextHelp = document.getElementById('contextHelp'),
      accessKeyLbls = $$('.accessKey'),
      t, agentAccessKey;
      // Access Key by Browser
      if (Browser.Engine.gecko) { //FF
        agentAccessKey =  Browser.Platform.mac ? 'Ctrl + ' : 'Alt + Shift + ';  
      } else if (Browser.Engine.trident) { //IE
        agentAccessKey = Browser.Platform.mac ? 'Ctrl + Option + ' : 'Alt + ';
      } else if (Browser.Engine.webkit) { //SF, GC
        agentAccessKey = Browser.Platform.mac ? 'Ctrl + Option + ' : 'Alt + ';
      } else if (Browser.Engine.presto) { //OP: http://www.opera.com/browser/tutorials/nomouse/
        agentAccessKey = 'Shift + Esc, then';
      }
      for (i = accessKeyLbls.length - 1; i >= 0; i -= 1) {
        t = document.createTextNode(agentAccessKey);
        accessKeyLbls[i].replaceChild(t, accessKeyLbls[i].firstChild);
        //not implemented
        if (Browser.Engine.trident) { //IE
          // ', then Enter'
        }
      }
    }());
    AZ.showHelp = (function () {
      var helpBtn = document.getElementById('helpBtn'),
      contextHelp = document.getElementById('contextHelp');
      if (helpBtn && typeof helpBtn === "object" && contextHelp && typeof contextHelp === "object") {
        menu_key_event = function (e) {
          if (e && e.keyCode === 27 || window && window.event && window.event.keyCode === 27) { // Esc
            AZ.showHelp(0);
          }
        };
        menu_click_event = function (e) {
          AZ.showHelp(0);
        };
        helpBtn.onclick = function (evt) {
          if (contextHelp.style.display === 'none') {
            AZ.showHelp(1);
          } else {
            AZ.showHelp(0);
          }
          if (evt && evt.stopPropagation) {
            evt.stopPropagation();            // W3C no bubble
          }          
          if (window && window.event) {
            window.event.cancelBubble = true; // IE no bubble
          }
          return false;
        };
        return function (p) {
           if (p) {                  // Turn menu on
             contextHelp.style.display = '';            
             document.onkeydown = menu_key_event;
             document.onclick = menu_click_event;
           } else {
             contextHelp.style.display = 'none';
             document.onkeydown = null;
             document.onclick = null;
           }
        };
      }
    }());
    /*
    * Accessibility 
    */    
    if (useAccessibility){
        $$('button[accesskey!=whatever]').each(function(el, i){
            var ch = (el.getElement(':first-child')) ? el.getElement(':first-child') : el;
            if (ch.innerHTML.indexOf(el.accessKey)+1) {
                ch.innerHTML=ch.innerHTML.replace(el.accessKey, '<u>'+el.accessKey+'</u>');
            }/* else { //add accesskey to label 
                el.innerHTML=el.innerHTML + ' <u>'+el.accessKey+'</u>';                
            }*/
        });
        // Click titles: scrolls page to get title flush with the top of the viewport
        $$('#paginationtop h1, .section h2').each(function(el){
        //$$('#paginationtop h1, h2, h3, h4, h5, h6').each(function(el){
            var span = document.createElement('span'),
            a = el.childNodes,
            b = a.length;
            for (var i = 0; i < b; i+=1) {
              span.appendChild(a[0]);
            }
            el.appendChild(span);
            span.style.cursor = 'pointer';
            span.title = 'Quick scroll up';
            span.onclick = function(){
                this.scrollIntoView();
            }
        });
        /**
        * Extend Input Radio buttons by allowing to unselect
        */
        $$('form').each(function (f) {
            if (!f.chosen && typeof f.chosen !== 'object') {
                f.chosen = {}; //add object to store selected radio
            }
        });
        $$('input[type=radio]').each(function (el) {// grab each radio input
            el.myForm = el.getParent('form');
            
            el.addEvent('click', function () {              // assign onclick
                if (this.myForm.chosen[this.name] === this.id) {// if this one is selected
                    this.checked = false;                    // uncheck it
                    this.myForm.chosen[this.name] = false;
                } else {
                    this.myForm.chosen[this.name] = this.id;       // or store it
                }
            });
        });
        /*
        * Add "top" link at bottom of page
        */
        (function() {          
          var wc = document.getElementById('wc');
          if (wc && typeof wc === "object") {
            if (window && window.scroll) {
              var atop = (function () {
                atop = document.createElement('a'),
                atoptxt = document.createTextNode('^ Top ^');
                atop.appendChild(atoptxt);
                atop.id = 'scrolltotop';
                atop.href = '';
                atop.onclick = function() {
                window.scroll(0,0);
                    return false;
                }
                wc.appendChild(atop);
                return atop;
              }());
            }
          }
        }());
    }
    /* 
    * Restore anchor to internal id due to base 
    */
    (function() {
      var anchors = document.getElementsByTagName('a');
      for (i = anchors.length - 1; i >= 0; i -= 1) {
        if(anchors[i].href && anchors[i].href.substr(0, 1) === '#'){
          anchors[i].onclick = function(){
            var targetId = this.hash.substr(1,this.hash.length);
            var target = document.getElementById(targetId);
            if (target && typeof target === "object") {
              target.scrollIntoView();
            }
            document.location.href = document.location.href.
              split(this.hash).join('') + 
              this.hash; 
            return false;
          };
        }
      }    
    }());
  /* Backwards compatibility with old tutors. */    
  formChanged = false;
	if (document.getElementsByTagName('form').length) {
	  initGraphs();
  }
});
//
window.closeandrefresh = function(openerHref) {
    if (window.opener) {
        window.opener.location.href = window.opener.location.href;
        if (window.opener.progressWindow) window.opener.progressWindow.close()
            window.close();
    } else {
        if (openerHref) {
            window.location = openerHref;
        } else {
            window.close();
        }
    }
}

/*
*
* Play Audio file
*
*/
AZ.playAudio = function (audioFileName, audioText) {
    var audioplayer = document.getElementById('audioplayerid');
    if (audioplayer && audioplayer.id === 'audioplayerid') {
      audioplayer.asFunc(audioFileName, audioText);
    }
}

/* From Bluegreen for Flash Tutors */
var images;     // absolute paths

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
* Initializes each graph applet, restoring it to its previous state (encoded
* in hidden form field).
*/
function initGraphs() {
    //  var form = document.forms[0];
    var form = document.getElementsByTagName('form') [0];
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
* Restores graph applet to a specific state.
*
* @param     id        document ID of the graph applet
* @param     value     state of graph encoded as a string
*/
function restoreGraph(id, value) {
    if ((document.applets.length > 0) && (document.applets[id] != null)) {
        document.applets[id].restore(value);
    }
    return false;
}

/**
* Open Targer in New Windows
*/
var stdOpt = "resizable=1,scrollbars=1,titlebar=1,menubar=1,location=0,toolbar=0,directories=0,status=0,";
function openLgWin(href, name) {
    var w = 1006, 
	h = 475, 
	left = 25, 
	top = 15;
//    if (screen.availWidth) {
//      w = 1000; //Math.min(screen.availWidth - 40, 924);
//      left = (screen.availWidth - w) / 2;             //
//    }
    if (screen.availHeight) {
      if ((navigator.userAgent.indexOf("MSIE") != -1) && (navigator.userAgent.indexOf("opera") == -1)) {
        h = Math.min(screen.availHeight - 65, 768);
      } else {
        h = Math.min(screen.availHeight - 95, 768);
      }
    }
    var opt = stdOpt + "width=" + w + ", height=" + h;
    //if (w < 840 || h < 768) opt += ",left=" + left + ",top=" + top;
    var win = window.open(href, name, opt);
    if (window.focus) win.focus();
    return false;
}
function openMdWin(href, name, w, h) {
  var opt = stdOpt + "left=25,top=15,";
  opt = (!w) ? opt+"width=600," : opt+"width="+w+",";
  opt = (!h) ? opt+"height=400," : opt+"height="+h+",";  
  var win = window.open(href, name, opt);
  if (window.focus) win.focus();
  return false;
}
function openSmWin(href, name) {
  var opt = stdOpt + "width=500,height=300,left=25,top=15";
  var win = window.open(href, name, opt);
  if (window.focus) win.focus();
  return false;
}

/**
* Retrieves the base URL from the document if a valid is specified in the
* document. Otherwise, the functions returns an empty string.
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

/**
* Hide visible phrase. Stop associated audio clip from playing.
*/
function hidePhrase() {
    var div = document.getElementById('_s_p');
    if (div) {
        div.style.visibility = 'hidden';
    }
}

// Finds the X,Y position of the specified object.
function findPosition(obj) {
    var posX = 0, posY = 0;
    if (obj) {
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
    }
    return [posX, posY];
}
function inView(obj, scroll) {
    var y = findPosition(obj) [1] + (scroll ? 0 : obj.clientHeight);
    return y < (getWindowHeight() + getScrollY());
}
function getWindowHeight() {
    if (window.innerHeight) {
        return window.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    } else {
        return document.body.clientHeight;
    }
}
function getScrollY() {
    if (window.scrollY) {
        return window.scrollY;
    } else if (document.documentElement && document.documentElement.scrollTop) {
        return document.documentElement.scrollTop;
    } else {
        return document.body.scrollTop;
    }
}
AZ.resizeInline = function (id, width, height, scroll) {
    var div = document.getElementById('d' + id),
    obj = document.getElementById('o' + id),
    w = parseInt(width, 10),
    h = parseInt(height, 10);
    if (w && typeof w === 'number') {
      div.width = w;
      div.style.width = w + "px";
      obj.width = w;
      obj.style.width = w + "px";
    }
    if (h && typeof h === 'number') {
      obj.height = h;
      obj.style.height = h + "px";
    }
    if (scroll && div && typeof div === "object") {
      AZ.scrollTo("d" + id, scroll);
    }
};
AZ.scrollTo = function (id, scroll) {
    var e = document.getElementById(id);
    if (! inView(e, scroll)) e.scrollIntoView(scroll);
}
function resizeInline(id, width, height, scroll) {
	resize("o" + id, width, height);
	resize("d" + id, width, null);
	if (scroll != null) scrollTo("d" + id, scroll);
}
function resize(id, width, height) {
	var e = document.getElementById(id);
	//FLASH WRITES INLINE WIDTH AND HEIGHT IN SOME CASES FOR FLASH OBJECT
	if (width != null && e.width) e.width = width;
	if (width != null) e.style.width = 770 + "px";
	if (height != null && e.height) e.height = height;
	if (height != null) e.style.height = height + "px";
}
function scrollTo(id, scroll) {
	var e = document.getElementById(id);
	if (!inView(e, scroll)) e.scrollIntoView(scroll);
}
/**
 * (imported from Bluegreen, not tested)
 * Called before the page is unloaded. Notifies the user if his/her answers
 * have not been saved.
 */
function closeWarning() {
	if (formChanged) {
		alert('Warning: Your answers have not been saved. By leaving this page, your changes will be lost. You will be given a chance to cancel the close action and resume work on the quiz after you press the OK button below.');
		return 'Press OK to leave the current page and discard your answers. Press CANCEL to resume your work.';
	}
}

/**
 * (imported from Bluegreen, not tested)
 * Called when the page is unloaded. Notifies the user that his/her answers
 * were not saved (if the form has changed since it was first loaded).
 */
function closeConfirm() {
	if (formChanged) {
		alert('Your answers have NOT been saved.');
	}
}
/**
* Imported form bluegreen page.js
*/
/*
 * $Id: azool.js,v 1.271.2.7 2010/11/11 18:42:06 clq Exp $
 * Copyright (c) 2003-2006 Carnegie Mellon University.
 */
var formChanged = false; // Global variable for status of form
var timeout; // Global variable to count tracking attempts

function displayPopoutHtml(thisId,thisWidth,thisHeight) {
//	var tempPopoutHtml = document.createDocumentFragment();
	var tempPopoutHtml = document.createElement('div');
	tempPopoutHtml = document.getElementById(thisId).cloneNode(true);

	if (thisWidth > 0){
		widthIdx = -1;
		for (var i = 0; i < tempPopoutHtml.childNodes.length; i++) {
			for( var x = 0; x < tempPopoutHtml.childNodes[i].attributes.length; x++ ) {
				if( tempPopoutHtml.childNodes[i].attributes[x].nodeName.toLowerCase() == 'width' ) {
					widthIdx = x;
				}
				if( widthIdx > -1 ){
					tempPopoutHtml.childNodes[i].attributes[widthIdx].nodeValue = thisWidth;
				}
			}
		}
	}

	if (thisHeight > 0){
		HeightIdx = -1;
		for (var i = 0; i < tempPopoutHtml.childNodes.length; i++) {
			for( var x = 0; x < tempPopoutHtml.childNodes[i].attributes.length; x++ ) {
				if( tempPopoutHtml.childNodes[i].attributes[x].nodeName.toLowerCase() == 'height' ) {
					HeightIdx = x;
				}
				if( HeightIdx > -1 ){
					tempPopoutHtml.childNodes[i].attributes[HeightIdx].nodeValue = thisHeight;
				}
			}
		}
	}

	var w = 760, h = 475, left = 25, top = 15;
	if (screen.availWidth) {
		w = Math.min(screen.availWidth - 40, 840);
		left = (screen.availWidth - w) / 2;     //division
	}
	if (screen.availHeight) {
		if (is_ie) {
			h = Math.min(screen.availHeight - 65, 768);
		} else {
			h = Math.min(screen.availHeight - 95, 768);
		}
	}
	var opt = stdOpt + "width=" + w + ", height=" + h + ",left=" + left + ",top=" + top;
	newWin = window.open('', 'thisId', opt);

	newWin.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http:\/\/www.w3.org\/TR\/ xhtml1\/DTD\/xhtml1-transitional.dtd"><html xmlns="http:\/\/www.w3.org\/1999\/xhtml">');
	newWin.document.write('<head><title>Popup<\/title><\/head><body bgcolor="#ffffff"><div id="stickIt"\/>');
	newWin.document.writeln('<\/body> <\/html>');

	newWin.document.getElementById('stickIt').appendChild(tempPopoutHtml);

	return true;
}

// Opens a window describing how to link to the current page.
AZ.linkToPage = function (ctx) {
	var href = "/jcourse/webui/syllabus/link.do?context=" + escape(ctx);
	openMdWin(href, "link");
}

// Email a link to the current workbook page.
function mailLinkToPage(ctx) {
	var href = "http://" + location.hostname;
	href+= "/jcourse/webui/guest/activity.do?context=" + escape(ctx);
	location.href = "mailto:?&body=" + href;
}

// Displays learning objectives in a pop-up window.
function displayObjectives(ctx) {
	var href = "/jcourse/workbook/activity/objectives";
	href += "?context=" + escape(ctx);
	openLgWin(href, "objectives");
}

// Determines whether or not a string represents an integer.
function isInteger(value) {
	return ((value.indexOf('.') == -1) && (!isNaN(parseInt(value))));
}

// Determines whether or not a string represents a number.
function isNumber(value) {
	return (!isNaN(new Number(value)));
}

/**
 * Notification that a form has changed. This method validates the given
 * argument to ensure that it is an integer. If it is not an integer, an
 * alert is displayed and the form field is reset.
 *
 * @param     input     form input field
 * @return    true if the value is an integer, false otherwise
 */
function changeFormInteger(input) {
	formChanged = true;

	if ((input.value != null) && !isInteger(input.value)) {
		alert("Please enter an integer value.");
		input.focus(); 
		input.value = '';
		return false;
	} else {
		return true;
	}
}

/**
 * Notification that a form has changed. This method validates the given
 * argument to ensure that it is a real number. If it is not a real number,
 * an alert is displayed and the form field is reset.
 *
 * @param     input     form input field
 * @return    true if the value is a real number, false otherwise
 */
function changeFormNumber(input) {
	formChanged = true;

	if ((input.value != null) && !isNumber(input.value)) {
		alert("Please enter a real number.");
		input.focus(); input.value = '';
		return false;
	} else {
		return true;
	}
}

// Notification that a form has changed.
function changeForm() {
	formChanged = true;
}

/**
 * Clears the modification flag on the form before it is submitted back to
 * the server. This is done to suppress the warning messages below.
 */
function onFormSubmit() {
	submitGraphs();
	formChanged = false;
}

/**
 * Called before the page is unloaded. Notifies the user if his/her answers
 * have not been saved.
 */
function closeWarning() {
	if (formChanged) {
		alert('Warning: Your answers have not been saved. By leaving this page, your changes will be lost. You will be given a chance to cancel the close action and resume work on the quiz after you press the OK button below.');
		return 'Press OK to leave the current page and discard your answers. Press CANCEL to resume your work.';
	}
}

/**
 * Called when the page is unloaded. Notifies the user that his/her answers
 * were not saved (if the form has changed since it was first loaded).
 */
function closeConfirm() {
	if (formChanged) {
		alert('Your answers have NOT been saved.');
	}
}

/**
 * Extracts response from each graph applets using LiveConnect and prepares
 * the data for submission.
 */
function submitGraphs() {
	var form = document.forms[0];

	for (var i = 0; i < form.elements.length; i++) {
		if (form.elements[i].name.indexOf('graph') == 0) {
			var applet = document.applets[form.elements[i].name];

			if (applet != null) {
				form.elements[i].value = applet.report();
			}
		} else {
			continue;
		}
	}

	return false;
}

var OLIMessenger = new function() {
	var listeners = [], subscriptions = [];
	this.getInstance = function() {
		return this;
	};
	this.sendMessage = function(target, message, source) {
		if (target) {
			var dst = listeners[target];
			if (dst) {
				return dst.receiveMessage(source, message);
			}
		}
		return false;
	};
	this.addListener = function(id, listener) {
		if (id) {
//			var dst = listener ? listener : document.getElementById(id);
			var dst = listener ? listener : document.getElementById("o" + id);
//			if (dst && typeof dst.receiveMessage == "function") {
			if (dst) {
				listeners[id] = dst;
			}
		}
	};
	this.removeListener = function(id) {
		if (id) {
			delete listeners[id];
		}
	};
	this.clearListeners = function() {
		listeners = [];
	};
	this.sendBroadcast = function(channel, message, source) {
		if (channel) {
			if (subscriptions[channel]) {
				for (var id in subscriptions[channel]) {
				  if (subscriptions[channel].hasOwnProperty(id) ) {
					  subscriptions[channel][id].receiveBroadcast(source, channel, message);
					}
				}
			}
		}
	};
	this.subscribe = function(id, channel, listener) {
		if (id && channel) {
//		var dst = listener ? listener : document.getElementById(id);
			var dst = listener ? listener : document.getElementById("o" + id);
//			if (dst && typeof dst.receiveBroadcast == "function") {
			if (dst) {
				if (!subscriptions[channel]) {
					subscriptions[channel] = [];
				}
				subscriptions[channel][id] = dst;
			}
		}
	};
	this.unsubscribe = function(id, channel) {
		if (channel && subscriptions[channel]) {
			delete subscriptions[channel][id];
		}
	};
	this.unsubscribeAll = function(id) {
		for (var channel in subscriptions) {
			unsubscribe(id, channel);
		}
	};
	this.clearSubscriptions = function() {
		subscriptions = [];
	};
};

/* Alternatives (Tabs) */
window.addEvent('domready', function () {
  (function () {
    var alts = $$('.alts'),
    i = 0,
    a = [];
    if (alts.length) {
      for (i = alts.length - 1; i >= 0; i -= 1) {
        a = alts[i].value.split(':'); // a[channel, message]
        
        alts[i].receiveBroadcast = function (source, channel, message) {        
          var altsOn = $$('.'+channel+' .altContentOn'); //getElementsByClassName('currentChoice') 
          for (var i = altsOn.length - 1; i >= 0; i -= 1) {
            altsOn[i].className = altsOn[i].className.split('On').
              join('Off');
          }      
          var altsChosen = $$('.'+channel+' .'+message);
          for (var i = altsChosen.length - 1; i >= 0; i -= 1) {
            altsChosen[i].className = altsChosen[i].className.split('Off').
              join('On');        
            var myFx = new Fx.Tween(altsChosen[i]);
            myFx.start('background-color', '#fff', '#ffc').chain(function(){
          		this.start('background-color', '#ffc', '#fff');
	        });          
          }
          for (i in this.childNodes) {
            if (this.childNodes[i].value === channel+':'+message) {
              this.selectedIndex = this.childNodes[i].index;
            }
          }
          var altTips = $$('.altTip');
          for (i = altTips.length - 1; i >= 0; i -= 1) {
            altTips[i].style.display = 'none';
          }
        };         
        
        OLIMessenger.subscribe(alts[i].id, a[0], alts[i]);
                
        alts[i].addEvent('change', function () {
          var groupValue = this.value.split(':'),
          choices = {}, choicesArr = [],
          choicesStr = themeoptions.getVar('altSelected'),
          i, pair;
          if (groupValue.length > 1) {
            OLIMessenger.sendBroadcast(groupValue[0], groupValue[1], this.id); // (channel, message, source)
            //decode cookie, set value, encode cookie 
            //choices = JSON.decode(choicesArr); // simpler, but cookie separator (,) collides with JSON  
            if (choicesStr) {
              choicesArr = choicesStr.split('|');            
            }
            for (i = 0; i < choicesArr.length ; i++) {
              pair = choicesArr[i].split('":"');
              choices[pair[0].split('"').join('')] = pair[1].split('"').join('');
            }
            choices[groupValue[0]] = groupValue[1];
            choicesArr = [];
            for (var i in choices) {
              choicesArr.push('"' + i + '":"' + choices[i] + '"');
            }
            choicesStr = choicesArr.join('|');           
            themeoptions.setVar('altSelected', choicesStr);
            if (!AZ.elementInViewport(this.parentNode.parentNode)) {
              this.parentNode.parentNode.scrollIntoView(true);
            }
          }
          if (typeof _trackLink === 'function' && AZ.d) {
              _trackLink('/alternatives' +
                '?group=' + groupValue[0] +
                '&choice=' + groupValue[1] +
                '&coursekey=' + AZ.d.courseKey +
                '&page=' + AZ.d.pageNumber +
                '&obj=' + this.id);
          }
        });
        alts[i].addEvent('mouseenter', function () {
            this.style.backgroundColor = '#ff9';
        });
		alts[i].addEvent('focus', function() {
			this.focused = true;
		});
		alts[i].addEvent('blur', function() {
			this.focused = false;
			this.style.backgroundColor = '';
		});
        alts[i].addEvent('mouseleave', function () {
			if (!this.focused) {
				this.style.backgroundColor = '';
			}
        });
      }
    }
  }());
  
  /*
   * Knowledge Forum integration
   */
  /*function util_selectiframe(i) {
      var d = i.contentWindow || i.contentDocument || i;
      if (d.document) {
          d = d.document;
      }
      if (d.getElementById("body")) {
          d = d.getElementById("body");
      }
      if (d.body) {
          d = d.body;
      }
      return d;
  }
  
  try {
      var d = document.getElementById('kfdiv'),
      f = document.getElementById('kfiframe');
      if (f && f.getElementById) {
          var c = util_selectiframe(f).getElementById('kfcanvas');
          if (c && c.scrollWidth) {
              alert(f.onresize);
              f.onresize = function () {
                  alert(0);
              };
              f.width = f.offsetWidth > c.scrollWidth ?
                  '100%' : c.scrollWidth;
          }
      }
  } catch (e) {alert(e)}
  return false
  */  
});


