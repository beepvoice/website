/* eslint-env browser */

function isStuck(ele) {
	if (document.scrollingElement.scrollTop <= 10) {
		return false;
	}
	if (document.scrollingElement.scrollTop != ele.offsetTop) {
		return false;
	}
	return true;
}

function configureScroll() {
	const navbarWrapper = document.querySelector('.navbar-wrapper');
	if (!navbarWrapper) {
		setTimeout(tryConfigureScroll, 100);
	}

	window.addEventListener('scroll', () => {
		if (isStuck(navbarWrapper)) {
			if (!navbarWrapper.classList.contains('shadow')) {
				navbarWrapper.classList.add('shadow');
			}
		} else if (navbarWrapper.classList.contains('shadow')) {
			navbarWrapper.classList.remove('shadow');
		}
	}, window.Modernizr.passiveeventlisteners ? { passive: true } : false);
}

function tryConfigureScroll() {
	if (!window.Modernizr) {
		setTimeout(tryConfigureScroll, 100);
	} else {
		configureScroll();
	}
}

tryConfigureScroll();
