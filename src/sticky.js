/* eslint-env browser */

function configureScroll() {
	const navbarWrapper = document.querySelector('.navbar-wrapper');

	window.addEventListener('scroll', () => {
		if (document.scrollingElement.scrollTop > 0) {
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
