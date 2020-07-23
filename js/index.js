var getElem=function (selector) {
	return document.querySelector(selector);
}
var getAllElem=function (selector) {
	return document.querySelectorAll(selector);
}

var getCls=function (element) {
	return element.getAttribute('class');
}
var setCls=function (element, cls) {
	return element.setAttribute('class', cls);
}

var addCls=function (element, cls) {
	var baseCls=getCls(element);
	if (baseCls.indexOf(cls) === -1) {
		setCls(element, baseCls+' '+cls);
	}
}
var delCls=function (element, cls) {
	var baseCls=getCls(element);
	if (baseCls.indexOf(cls) != -1) {
		setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}
var screenAnimateElements={
	'.screen-1':[
		'.screen-1__heading',
		'.screen-1__subHeading'
	],
	'.screen-2':[
		'.screen-2__heading',
		'.screen-2__subHeading',
		'.screen-2__bgPic-above',
		'.screen-2__bgPic-plane'
	],
	'.screen-3':[
		'.screen-3__heading',
		'.screen-3__subHeading',
		'.screen-3__itemsBox',
		'.screen-3__leftBox'
	],
	'.screen-4':[
		'.screen-4__heading',
		'.screen-4__subHeading',
		'.screen-4__items-1',
		'.screen-4__items-2',
		'.screen-4__items-3',
		'.screen-4__items-4'
	],
	'.screen-5':[
		'.screen-5__heading',
		'.screen-5__subHeading',
		'.screen-5__img'
	]
};

var setScreenAnimateInit=function (screenCls) {
	var screen = document.querySelector(screenCls);
	var animateElements=screenAnimateElements[screenCls];
	for (var i = 0; i <animateElements.length; i++) {
		var element=document.querySelector(animateElements[i]);
		var baseCls=element.getAttribute('class');
		element.setAttribute('class', baseCls+' '+animateElements[i].substr(1)+'_animate_init');
	}
}
var playScreenAnimateDone=function (screenCls) {
	var screen = document.querySelector(screenCls);
	var animateElements=screenAnimateElements[screenCls];
	for (var i = 0; i <animateElements.length; i++) {
		var element=document.querySelector(animateElements[i]);
		var baseCls=element.getAttribute('class');
		element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
	}
}
window.onload = function () {
  for(k in screenAnimateElements){
    if(k == '.screen-1'){
      continue;
    }
    setScreenAnimateInit(k);
  }
}
setTimeout(function(){playScreenAnimateDone('.screen-1');},200);
window.onscroll=function () {
	var top=document.documentElement.scrollTop;
	
	if (top>100) {
		addCls(getElem('.header'), 'header_status_back');
		addCls(getElem('.outline'), 'outline_status_in');
	}else {
		delCls(getElem('.header'), 'header_status_back');
		delCls(getElem('.outline'), 'outline_status_in');
		switchNavItemsActive(0);
	}

	if (top>640*1 - 100){
		playScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
	}
	if (top>640*2 - 100){
		playScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
	}
	if (top>640*3 - 100){
		playScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
	}
	if (top>640*4 - 100){
		playScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
	}

}

var navItems = getAllElem('.header__nav-item');
var outLineItems=getAllElem('.outline__item')

var switchNavItemsActive=function (idx) {
	for (var i = 0; i <navItems.length; i++) {
		delCls( navItems[i],'header__nav-item_status_active');
		navTip.style.left = 0+'px';
	}
	addCls( navItems[idx],'header__nav-item_status_active');
	navTip.style.left = (idx*88)+'px';

	for (var i = 0; i < outLineItems.length; i++) {
		delCls( outLineItems[i],'outline__item_status_active');
	}
	addCls( outLineItems[idx],'outline__item_status_active');
}
var setNavJump=function (i,lib) {
	var item=lib[i];
	item.onclick=function () {
		document.documentElement.scrollTop=i*640;
	}
}
for (var i =0; i<navItems.length; i++) {
	setNavJump(i,navItems);
}
for (var i =0; i<outLineItems.length; i++) {
	setNavJump(i,outLineItems);
}

var navTip=getElem('.header__nav-tip');
var setTip=function (idx, lib) {
	lib[idx].onmouseover=function () {
		navTip.style.left= (idx*88)+'px';
	}

	var activeIdx=0;
	lib[idx].onmouseout=function () {
		for (var i = 0; i <lib.length; i++) {
			if (getCls(lib[i]).indexOf('header__nav-item_status_active') > -1) {
				activeIdx = i;
				break;
			}
		}
		navTip.style.left= (activeIdx*88)+'px';
	}
}

for (var i =0; i<navItems.length; i++) {
	setTip(i,navItems);
}

var backToTop=getElem('.screen-6__btn');
backToTop.onclick=function () {
	document.documentElement.scrollTop=0;
}