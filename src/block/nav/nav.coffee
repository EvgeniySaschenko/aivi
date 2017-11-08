nav= document.getElementsByClassName('nav_header')

console.log nav

nav[0].addEventListener 'click', ()=>
	active= nav[0].classList.contains('active')
	if active
		nav[0].classList.remove('active')
	else
		nav[0].classList.add('active')