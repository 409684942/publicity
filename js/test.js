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


function setScreenAnimate (screenCls) {
	var screen = document.querySelector(screenCls);
	var animateElements=screenAnimateElements[screenCls];

	var isSetAnimateClass=false;
	var isAnimateDone=false;

	screen.onclick=function () {
		if (isSetAnimateClass===false) {
			for (var i = 0; i <animateElements.length; i++) {
				var element=document.querySelector(animateElements[i]);
				var baseCls=element.getAttribute('class');
				element.setAttribute('class', baseCls+' '+animateElements[i].substr(1)+'_animate_init');
			}
			isSetAnimateClass=true;
			return;
		}
		if (isAnimateDone===false) {
			for (var i = 0; i <animateElements.length; i++) {
				var element=document.querySelector(animateElements[i]);
				var baseCls=element.getAttribute('class');
				element.setAttribute('class', baseCls.replace('_animate_init','_animate_done'));
			}
			isAnimateDone=true;
			return;
		}
		if (isAnimateDone===true) {
			for (var i = 0; i <animateElements.length; i++) {
				var element=document.querySelector(animateElements[i]);
				var baseCls=element.getAttribute('class');
				element.setAttribute('class', baseCls.replace('_animate_done','_animate_init'));
			}
			isAnimateDone=false;
			return;
		}
	}
}

setScreenAnimate('.screen-1');
setScreenAnimate('.screen-2');
setScreenAnimate('.screen-3');
setScreenAnimate('.screen-4');
setScreenAnimate('.screen-5');