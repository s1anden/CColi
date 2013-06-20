/*
*
* Assessment2
* function executed on or after window event domready
*
*/
/**
* Config
*/
var A2 = {
  useAccessibility: true,
  focusedElem: undefined,
  padding: 10
}
/**
* Page Setup
*/
window.addEvent('domready', function () {
  var oliwrap = $('body');
  
  (function () {
    if (themeoptions && 
    parseInt(themeoptions.getVar('a2focusFeedback'))) {
      var q1 = document.getElementById('questions');
      if (q1) {
        q1.scrollIntoView();
      }
      themeoptions.setVar('a2focusFeedback', 0);
    }
  }
  ());
  
//  if (Browser.Engine.name === 'trident') {
//    oliwrap.hideFocus = true;
//  }
  /**
  /* Question type: Ordering
  */
  A2.qn = {
    ordering: {
      domToValue: function (qInput) {
        // convert order mootools' sortable into input value (not 0-based) 
        // using mootools' serialize fn
        var sort_order = qInput.serialize(0, function (li, i) {
          return li.getProperty('class') + '=' + (i + 1);
        });
        return sort_order;
      }
    }
  };
  try {
    (function () {
      // Initial setup for delivery and review modes
      var qOrdering = $$('.ordering-list');
      for (var i = qOrdering.length - 1; i >= 0; i--) {
        var saveinput = qOrdering[i].getParent().getElement('input');
        var items = qOrdering[i].getElements('li');
        var order = saveinput.value; // String format: {@value}={index+1},
        if (order != '') {
          order = order.split(',');
          for (var n = order.length - 1; n >= 0; n--) {
            var re = new RegExp('\=.*$', 'g');
            order[n] = order[n].replace(re, '');//just the values
          };
        }
        if (order.length > 1) {
          var sorteditems = new Array(order.length);//a second array to sort
          for (var j = items.length - 1; j >= 0; j--) {// use order as index
            sorteditems[j] = qOrdering[i].getElement('.' + order[j]);// order not 0-based
          }
          for (var k = sorteditems.length - 1; k >= 0; k--) {
            qOrdering[i].grab(sorteditems[k], 'top');// re-write DOM to match order
          }
        }
      }
      // Setup for Delivery mode only  
      $$('.ordering-list.deliver').each(function (ul, i) {//fn(item, index, obj)
        var question = ul.getParent().getParent().getParent();
        // UL < DIV > INPUT type="hidden" which stores value until submit
        var saveinput = ul.getParent().getElement('input');
        var order = saveinput.value; // String format: {@value}={index+1},
        var items = ul.getElements('li');// create array with each li
        var sb = new Sortables(ul, {// Mootools plugin
          clone: true,
          revert: true,
          onStart: function (li) {
            li.setStyles({
              'background': '#FFE56F', 'border': '1px dashed #CCAA00'
            });
            li.focus();
          },
          onComplete: function (li) {
            li.blur();
            li.setStyles({'background': null, 'border': null});//Webkit
            li.removeAttribute('style');//IE
            saveinput.value = A2.qn.ordering.domToValue(this);
          }
        });
        saveinput.value = A2.qn.ordering.domToValue(sb);

        // Keyboard access
        if (A2.useAccessibility) {
          orderingKeys = new Keyboard({
            events: {
              'up': function (event) {
                event.preventDefault();
                var p = A2.focusedElem.getPrevious();
                if (p != null) {
                  A2.focusedElem.inject(p, 'before').focus();
                  saveOrder(A2.focusedElem);
                }
              },
              'down': function (event) {
                event.preventDefault();
                var n = A2.focusedElem.getNext();
                if (n != null) {
                  A2.focusedElem.inject(n, 'after').focus();
                  saveOrder(A2.focusedElem);
                }
              }
            }
          });
          // turn orderingKeys on and off
          for (var i = items.length - 1; i >= 0; i--) {
            items[i].addEvent('click', function (event) {
              this.focus();
            });
            items[i].addEvent('focus', function (event) {
              A2.focusedElem = this;
              orderingKeys.activate();
            });
            items[i].addEvent('blur', function (event) {
              orderingKeys.deactivate();
            });
          }
        }
        // use new DOM order as index (not 0-based)
        var saveOrder = function (li) {
          var items = li.getParent().getElements('li');
          var sort_order = new Array(items.length);
          for (var i = items.length - 1; i >= 0; i--) {
            sort_order[i] = items[i].className + '=' +(i + 1);
          }
          sort_order = sort_order.join(',');
          var saveinput = li.getParent().getParent().getElement('input');
          saveinput.value = sort_order;
        }
      });
    }());
  } catch (e) {
    if (console && console.log) {
      console.log('A2 Ordering: ' + e);
    }
  } 
  
  /**
  * Question type: Multiple Choice - Select Single
  */
  $$('.multiplechoice.selectsingle').each(function (q, i) {
    // Extra visual aid
    q.getElements('input[type=radio]').each(function (inpt) {
      if (! inpt.disabled) {
        inpt.addEvents({
          'click': function () {
            this.checkedState = (this.getParent().getParent().className.indexOf('checked') >= 0);
            // clean all visual aid
            this.getParent().getParent().getParent().getElements('label').
            each(function (sibling) {
              sibling.getParent().removeClass('checked');
            });
            // display correct visual aid
            if (this.checkedState) {
              this.getParent().getParent().removeClass('checked');
            } else {
              this.getParent().getParent().addClass('checked');
            }
          }
        });
      }
    });
    $$('input[type=text]').each(function (inpt) {
      if (! inpt.disabled) {
        inpt.addEvents({
          'focus': function () {
            this.setStyle('background-color', '#FFE87F');
          },
          'blur': function () {
            this.setStyle('background-color', null);
          }
        });
      }
    });
  });
  
  /**
  * Question type: Multiple Choice - Select Multiple
  */
  $$('.multiplechoice.selectmultiple').each(function (q, i) {
    // Check for user selection
    var valueholder = q.getElement('input[type=hidden]');
    var submittedvalue =[];
    if (valueholder.value != '') {
      submittedvalue = valueholder.value.split(',');
    }
    // Setup user selection
    for (var i = submittedvalue.length - 1; i >= 0; i--) {
      q.getElement('input[type=checkbox][value=' + submittedvalue[i] + ']').setProperty('checked', 'checked');
      q.getElement('input[value=' + submittedvalue[i] + ']').getParent().getParent().addClass('checked');
    }
    // To each checkbox
    q.getElements('input[type=checkbox]').each(function (checkbox, i) {
      if (! checkbox.disabled) {
        // when it changes states
        checkbox.addEvent('change', function (event) {
          // change its parent's style,
          if (this.checked) {
            this.getParent().getParent().addClass('checked');
          } else {
            this.getParent().getParent().removeClass('checked');
          }
          // and go through all its siblings to collect their status.
          var value =[];
          // input < label < li < ol
          var siblings = this.getParent().getParent().getParent().getElements('input[type=checkbox]').each(function (el) {
            if (el.checked) {
              value.push(el.value);
            }
          });
          value = value.join(',');
          // Save that status until submit
          valueholder.value = value;
        });
      }
    });
  });
  
  /*
  * Text Areas: expand as needed
  */
  // add code to expand on demand
  /*
  * Accessibility
  */
  if (A2.useAccessibility) {
    // reserve these many places
    var focusedQ = $('popup');
//    var pageScroll = new Fx.Scroll($('body'), {
//      wait: false,
//      duration: 250,
//      offset: {
//        'x': 0, 'y': 0
//      },
//      transition: Fx.Transitions.Quad.easeInOut
//    });
    var tabindex = $$('a', 'area', 'button', 'input', 'object', 'select', 'textarea', '.ordering-list li', '.a2image_hotspot');
    tabindex.each(function (el) {
      if (! el.attributes.tabindex) {
        el.setAttribute('tabindex', 0)
      }
      if (el.addEvent) {
        el.addEvent('focus', function () {
          var q = this.getParent('.question');
          if (q && q.id != focusedQ.id) {
            q.getFocus();
          }
        });
        el.addEvent('click', function (event) {
          event.stopPropagation();
          // this will prevent the event to bubble up, and fire the parent's click event.
        });
      }
    });
    // To each question
    var qq = $$('.question');
    qq.each(function (q) {
      q.getFocus = function () {
        focusedQ.removeClass('focused');
        focusedQ = this.addClass('focused');
        // Scroll the Q into view
        // find the position of the question and window
        var top = this.getPosition($('popup')).y;
        var bottom = top + this.getSize().y;
        var topEdge = $('popup').getScroll().y;
        var bottomEdge = topEdge + $('popup').getSize().y;
        // if partially hanging off bottom of the window, but not also hangin off the top
        if (bottom > bottomEdge && top > topEdge) {
          this.scrollIntoView(true);
          //pageScroll.start(0, top);
        } else if (top < topEdge && bottom < bottomEdge) {
          // if hanging off top, but not hanging off the bottom
          //align with top only if the question fits in the viewport
          var alignWithTop = bottom - top < bottomEdge - topEdge? true: false;
          this.scrollIntoView(alignWithTop);
        }
        // Detect IE in Quirks Mode due to Math Player plugin
        if (Browser.Engine.name === 'trident' &&
        Browser.Engine.name.search(/MathPlayer/i)) {
          this.hideFocus = true;
        }
      }
      q.addEvent('click', function () {
        if(focusedQ){focusedQ.removeClass('focused');}
		//focusedQ.removeClass('focused');
        focusedQ = this.addClass('focused');
        // Give a tabindex to enable focus, take it away when blur
        this.setAttribute('tabindex', 0);
        this.focus();
      });
      q.addEvent('blur', function () {
        this.removeAttribute('tabindex');
      });
    });
    //
    $$('.question h2').each(function (el) {
      el.addEvent('click', function () {
        this.parentNode.getFocus();
        // give a tabindex to enable focus, take it away when blur
        this.setAttribute('tabindex', 0);
        this.focus();
      });
      el.addEvent('blur', function () {
        this.removeAttribute('tabindex');
      });
    });
    // Assign Tab Index to all that need it.
    var children =[];
    if ($('info') && $('info').getElements('a')) {
      children.concat($('info').getElements('a'));
    }
    var fixedbottomnav = $('fixedbottomnav');
    if (fixedbottomnav) {
      var fixedbottomnavinput = fixedbottomnav.getElements('input');
    }
    if (fixedbottomnavinput) {
      children.concat(fixedbottomnavinput)
    }
    children.each(function (child, j) {
      child.setProperty('tabindex', 1);
    });
    if (fixedbottomnav) {
      var ctrls = fixedbottomnav.getElements('a').concat(fixedbottomnavinput);
      ctrls.each(function (child, j) {
        child.setProperty('tabindex', 0);
      });
    }
    /**
    * Access Keys Description
    * Run once. Store cookie.
    */
    //      var keydesc = oliwrap.grab(new Element('div', {'id': 'keydesc', 'style': 'background:#A3B7B2;position:fixed;top:0;left:0;padding:.5em;font-size:93%'}));
    //      $('keydesc').grab(new Element('h4', {'html':'Access Keys', 'style': 'padding-top:0'}));
    //		$('keydesc').grab(new Element('div', {'html':'Tab = Move to next item'}));
  }
  // Quirks Mode
  if (Browser.Engine.name == 'trident' &&
  Browser.Engine.name.search(/MathPlayer/i)) {
    $$('.hintnav > a').each(function (a) {
      a.addEvents({
        'focus': function (event) {
          this.setStyles({
            'background-color': '#c3ea89', 'color': '#1f662f'
          });
        },
        'blur': function (event) {
          this.setStyles({
            'background-color': null, 'color': 'white'
          });
        }
      });
    });
  }
});

/**
* Functionality
*/
var modified = false;
var submitted = false;

function showElementById(id) {
  if (document.getElementById(id)) {
    document.getElementById(id).style.display = '';
  }
}

function hideElementById(val) {
  if (document.getElementById(val)) document.getElementById(val).style.display = 'none';
}

function focusElementById(val) {
  if (document.getElementById(val)) document.getElementById(val).focus();
}

A2.toggleObj = function (hide, show, focus) {
  hideElementById(hide);
  showElementById(show);
  var f = document.getElementById(focus);
  if (f != null) {
    f.focus();
    f.select();
  }
}

function formChange() {
  modified = true;
}

function closeWarning() {
  if (modified && ! submitted) {
    confirm('Warning: Your answers have not been saved. By closing the quiz window, your changes will be lost. You will be given a chance to cancel the close action and resume work on the quiz after you press the OK button below.');
    return 'Press OK to close the quiz window and discard your answers. Press CANCEL to resume work on the quiz.';
  }
}

function closeConfirm() {
  if (modified && ! submitted) {
    confirm('Your answers have NOT been saved.');
  }
}

function toggleGradingFields(id, dis) {
  document.getElementById("us" + id).disabled = dis;
  document.getElementById("uf" + id).disabled = dis;
}

function submitQuiz(form, action) {
  if (submitted) return false;
  submitted = true;
  form.action.value = action;
  if (action == 'Save') {
    alert('Your answers have been successfully saved.');
  }
  form.submit();
}


function inputNumericOnly(evt) {
  var Event = evt || window.event;
  var key = Event.keyCode || Event.which;
  key = String.fromCharCode(key);
  /*var regex = /[0-9]|\.|\,/; //caqu:this could be improved by allowing number and backspace, enter etc...
  if( !regex.test(key) ) { // !
  Event.returnValue = false;
  Event.preventDefault();
  }*/
  var regex = /[a-zA-Z]/;
  if (regex.test(key)) {
    Event.returnValue = false;
    Event.preventDefault();
  }
}

function isNumeric(x) {
  // I use this function like this: if (isNumeric(myVar)) { }
  // regular expression that validates a value is numeric
  var RegExp = /^( -) ?(\d *)(\.?)(\d *) $/;
  // Note: this WILL allow a number that ends in a decimal: -452.
  // compare the argument to the RegEx
  // the 'match' function returns 0 if the value didn't match
  var result = x.match(RegExp);
  return result;
}

function collectOrdering(a, inputs) {
  elem = document.getElementById(a);
  valStr = "";
  for (i = 0; i < inputs.length; i++) {
    choiceElem = document.getElementById(inputs[i]);
    if (isNumeric(choiceElem.value)) {
      choiceStr = choiceElem.id.substring(a.length + 4) + "=" + choiceElem.value;
      if (valStr == "") {
        valStr = choiceStr;
      } else {
        valStr = valStr + "," + choiceStr;
      }
    }
  }
  alert('collectOrdering: ' + valStr);
  elem.value = valStr;
}

function unpackOrdering(id, inputs) {
  elem = document.getElementById(id);
  valStr = elem.value;
  if (valStr != null) {
    toRestore = valStr.split(",");
    for (i = 0; i < toRestore.length; i++) {
      res = toRestore[i].split("=");
      resVal = res[0];
      resPos = res[1];
      elemToSet = "a2_" + a + "_" + resVal;
      for (j = 0; j < inputs.length; j++) {
        if (inputs[j] == elemToSet) {
          document.getElementById(elemToSet).value = resPos;
        }
      }
    }
  }
}

function assessmentForm(formId, action, message) {
  // set cookie indicating skip to feedback
  if (themeoptions &&
  action.indexOf('/jcourse/assessment2/activity/attempt/savesubmit.do') + 1) {
    themeoptions.setVar('a2focusFeedback', 1);
  }
  var a = (message == null)? true: confirm(message);
  if (a) {
    form = document.getElementById(formId);
    form.action = action;
    form.submit();
  }
}

function a2fromOLIImageMap(evalThis, thisId) {
  document.getElementById(thisId).value = evalThis;
}


/*caqu: reviewed up to here*/
function a2scoreOverrideShow(val) {
  showElementById(val);
}
function a2scoreOverrideHide(val) {
  hideElementById(val);
}
function addAnchor(objArea, iAction) {
  var objAnchor = document.createElement('div');
  objAnchor.onclick = function (event) {
    return increaseArea(event, objArea, iAction);
  };
  objAnchor.onkeypress = function (event) {
    return increaseArea(event, objArea, iAction);
  };
  //	objAnchor.appendChild(document.createTextNode('\u00a0\u00a0'));
  objAnchor.appendChild(document.createTextNode('\u200B'));
  return objAnchor;
}

/*caqu: this may be duplicated functionality*/
function increaseArea(objEvent, objArea, iAction) {
  // Allow keyboard navigation over links
  if (objEvent && objEvent.type == 'keypress')
  if (objEvent.keyCode != 13 && objEvent.keyCode != 32)
  return true;
  
  var iRows = parseInt(objArea.getAttribute('rows'), 10);
  
  if (iAction == 1) {
    if (iRows < 50)
    iRows += 2;
  } else {
    if (iRows > 2)
    iRows -= 2;
  }
  
  objArea.setAttribute('rows', iRows);
  return false;
}

/**
*  Instructor action for Attempt
*/
A2.modAttemptStatus = function (formId, action, warn, annoy) {
  var a = warn? confirm(warn): 0;
  a = a && annoy? confirm(annoy): 0;
  if (a) {
    document.getElementById(formId).action = action;
    document.getElementById(formId).submit();
  }
}

A2.window = function () {
  var win;
  return {
    open: function (that, args) {
      if (win && typeof win === "object" && ! win.closed && that.href) {
        win.close()
      }
      var args = args || 'height=768,width=1024';
      win = window.open(that.href, that.target, args);
      return false;
    }
  }
}
();

/*
* Highlights
*
* Modified: 12/15/2009 12:38
*
* swap        public method
*    elem    parent ID
*    str      Comma separated string with children's unique classes.
*    elem    Comma separated string with target IDs.
*/
A2.highlighter = (function () {
  var lit =[];
  return {
    setLit: function (k) {
      k.style.backgroundColor = '#e6cb45';
      k.style.color = '#000000';
      lit.push(k);
    },
    unsetLit: function () {
      for (var i = lit.length - 1; i >= 0; i--) {
        lit[i].style.backgroundColor = '';
        lit[i].style.color = '';
      }
    },
    swap: function (commasep_ids) {
      try{swapPrfx("", commasep_ids);
		}catch(e){console.log('commasep_ids null')};
    },
    swapPrfx: function (prfx, commasep_ids) {
      this.unsetLit();
      var arr = commasep_ids? commasep_ids.split(','):[];
      for (var i = arr.length - 1; i >= 0; i--) {
        var k = document.getElementById(prfx + arr[i]);
        if (k && typeof k === "object") {
          this.setLit(k);
        }
      }
    },
    swapHint: function (q, commasep_ids) {
      this.unsetLit();
      var arr = commasep_ids? commasep_ids.split(','):[];
      for (var i = arr.length - 1; i >= 0; i--) {
        var k = document.getElementById('o' + q + arr[i]);
        if (k && typeof k === "object") {
          this.setLit(k);
        }
      }
    }
  }
}
());
/*
*
* Hints
*
*/
A2.switchHints = function (hide, show) {
  if (hide) {
    hideElementById(hide);
  }
  if (show) {
    showElementById(show);
    var h = $(show).getElement('.hintnav a');
    if (h) {
      h.focus();
      if (Browser.Engine.name == 'trident') h.hideFocus = true;
    }
  }
}
A2.openHints = function (QNum) {
  $(QNum).getElement('.a2hints').setStyle('float', 'none');
}
A2.closeHints = function (QNum) {
  $(QNum).getElement('.a2hints').setStyle('float', null)
  $(QNum).focus();
}
/* 
 * Timer to prevent idling 
 * Count 2hrs, ask user to click to pop up with login screen.
 */
A2.idle = {
  login: function () {
    window.removeEvent('click', A2.idle.login);
    A2.window.open({
      href: '/jcourse/webui/welcome.do', target: '_blank'
    });
  },
  alert: function () {
    alert('Your session has timed out! ' + 
    'To avoid losing your work, please click anywhere on the page and sign in again.');
    window.addEvent('click', A2.idle.login);
  }
};
setTimeout("A2.idle.alert()", 2*60*60*1000);// 2 hours