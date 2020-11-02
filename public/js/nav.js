document.addEventListener('DOMContentLoaded', () => {
	const elems = document.querySelector('.sidenav')
	M.Sidenav.init(elems)
	loadNav()

	function loadNav() {
		const xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = function() {
			if ( this.readyState === 4 ) {
				if ( this.status !== 200 ) return

				document.querySelectorAll('.topnav, .sidenav').forEach(element => {
					element.innerHTML = xhttp.responseText
				})

				document.querySelectorAll('.sidenav a, .topnav a').forEach(element => {
					element.addEventListener('click', event => {
						const sidenav = document.querySelector('.sidenav')
						M.Sidenav.getInstance(sidenav).close()

						page = event.target.getAttribute('href').substr(1)
						loadPage(page)
					})
				})
			}
		}
		xhttp.open('GET', 'nav.html', true)
		xhttp.send()
	}

	let page = window.location.hash.substr(1)
	if (page === '') page = 'home'
	loadPage(page)

	function loadPage(page) {
		const xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = function() {
			if ( this.readyState === 4 ) {
				const content = document.querySelector('#body-content')

				if ( page === 'home' ) {
					getTeam()
				} else if ( page === 'competitions') {
					getCompetitions()
				} else if ( page === 'standings' ) {
					getStandingsPL()
				} else if ( page === 'scorer' ) {
					getTopScorer()
				} else if ( page === 'matches') {
					getMatch()
				} else if ( page === 'favorite') {
					getFavoriteTeam()
				}

				if ( this.status === 200 ) {
					content.innerHTML = xhttp.responseText
				} else if ( this.status === 404 ) {
					content.innerHTML = '<p>Halaman tidak ditemukan</p>'
				} else {
					content.innerHTML = '<p>Halaman tidak dapat diakses</p>'
				}
			}
		}
		xhttp.open('GET', 'pages/' + page + '.html', true)
		xhttp.send()
	}
})