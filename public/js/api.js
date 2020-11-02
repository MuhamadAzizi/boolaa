const baseUrl = 'https://api.football-data.org/'
const options = {
	headers: {'X-Auth-Token': 'eabf5fb87be8447fbb941b1cfee3b6be'}
}

function status(response) {
	if (response.status !== 200) {
		console.log(`Error: ${response.status}`)
		return Promise.reject(new Error(response.statusText))
	} else {
		return Promise.resolve(response)
	}
}

function json(response) {
	return response.json()
}

function error(error) {
	console.log(`Error: ${error}`)
}

function getStandingsPL() {
	if ('caches' in window) {
		caches.match(`${baseUrl}v2/competitions/2021/standings`)
		.then(response => {
			if(response) {
				response.json()
				.then(data => {
					let standing = ''

					data.standings.forEach(team => {
						if (team.type === 'TOTAL') {
							for (let i = 0; i < team.table.length; ++i) {
								let form = Array.from(team.table[i].form)
								let form_clean = []
								form.forEach(comma => {
									if(comma === ',') {
										return
									} else {
										form_clean.push(comma)
									}
								})
								standing += `
									<tr>
										<td>${team.table[i].position}</td>
										<td><img alt="${team.table[i].team.name}" src="${team.table[i].team.crestUrl}" width="50px"></td>
										<td style="text-align: left;">${team.table[i].team.name}</td>
										<td>${team.table[i].playedGames}</td>
										<td>${team.table[i].won}</td>
										<td>${team.table[i].draw}</td>
										<td>${team.table[i].lost}</td>
										<td>${team.table[i].goalsFor}</td>
										<td>${team.table[i].goalsAgainst}</td>
										<td>${team.table[i].goalDifference}</td>
										<td>${team.table[i].points}</td>
										<td>${form_clean.join(' ')}</td>
									</tr>
								`
							}
						}
					})
					document.getElementById('value').innerHTML = standing
				})
			}
		})
	}

	fetch(`${baseUrl}v2/competitions/2021/standings`, options)
	.then(status)
	.then(json)
	.then(data => {
		let standing = ''
		
		data.standings.forEach(team => {
			if (team.type === 'TOTAL') {
				for (let i = 0; i < team.table.length; ++i) {
					let form = Array.from(team.table[i].form)
					let form_clean = []
					form.forEach(comma => {
						if(comma === ',') {
							return
						} else {
							form_clean.push(comma)
						}
					})
					standing += `
						<tr>
							<td>${team.table[i].position}</td>
							<td><img alt="${team.table[i].team.name}" src="${team.table[i].team.crestUrl}" width="50px"></td>
							<td style="text-align: left;">${team.table[i].team.name}</td>
							<td>${team.table[i].playedGames}</td>
							<td>${team.table[i].won}</td>
							<td>${team.table[i].draw}</td>
							<td>${team.table[i].lost}</td>
							<td>${team.table[i].goalsFor}</td>
							<td>${team.table[i].goalsAgainst}</td>
							<td>${team.table[i].goalDifference}</td>
							<td>${team.table[i].points}</td>
							<td>${form_clean.join(' ')}</td>
						</tr>
					`
				}
			}
		})
		document.getElementById('value').innerHTML = standing
	})
	.catch(error)
}

function getTopScorer() {
	if ('caches' in window) {
		caches.match(`${baseUrl}v2/competitions/2021/scorers`)
		.then(response => {
			if(response) {
				response.json()
				.then(data => {
					let scorers = ''

					data.scorers.forEach((player, i) => {
						scorers += `
							<tr>
								<td>${i + 1}</td>
								<td>${player.team.name}</td>
								<td>${player.player.name}</td>
								<td>${player.numberOfGoals}</td>
							</tr>
						`
					})
					document.getElementById('value').innerHTML = scorers
				})
			}
		})
	}

	fetch(`${baseUrl}v2/competitions/2021/scorers`, options)
	.then(status)
	.then(json)
	.then(data => {
		let scorers = ''

		data.scorers.forEach((player, i) => {
			scorers += `
				<tr>
					<td>${i + 1}</td>
					<td>${player.team.name}</td>
					<td>${player.player.name}</td>
					<td>${player.numberOfGoals}</td>
				</tr>
			`
		})
		document.getElementById('value').innerHTML = scorers
	})
	.catch(error)
}

function getTeam() {
	if('caches' in window) {
		caches.match(`${baseUrl}v2/competitions/2021/teams`)
		.then(response => {
			if(response) {
				response.json()
				.then(data => {
					let teams = ''

					data.teams.forEach((team, i) => {
						teams += `
							<li><a href="./team.html?id=${data.teams[i].id}"><img alt="${data.teams[i].name}" src="${data.teams[i].crestUrl}" width="50px"></a></li>
						`
					})
					document.getElementById('teams').innerHTML = teams
				})
			}
		})
	}

	fetch(`${baseUrl}v2/competitions/2021/teams`, options)
	.then(status)
	.then(json)
	.then(data => {
		let teams = ''

		data.teams.forEach((team, i) => {
			teams += `
				<li><a href="./team.html?id=${data.teams[i].id}"><img alt="${data.teams[i].name}" src="${data.teams[i].crestUrl}" width="50px"></a></li>
			`
		})
		document.getElementById('teams').innerHTML = teams
	})
	.catch(error)
}

function getTeamById() {
	return new Promise(function(resolve, reject) {
		const urlParams = new URLSearchParams(window.location.search)
		const idParam = urlParams.get('id')

		if('caches' in window) {
			caches.match(`${baseUrl}v2/teams/${idParam}`)
			.then(response => {
				if(response) {
					response.json()
					.then(data => {
						let teamInfo = `
							<div class="center scroll">
								<h1>${data.name} (${data.tla})</h1>
								<img alt="${data.name}" src="${data.crestUrl}">
								<table class="highlight striped">
									<tr>
										<th>Venue</th>
										<td>${data.venue}</td>
									</tr>
									<tr>
										<th>Founded</th>
										<td>${data.founded}</td>
									</tr>
									<tr>
										<th>Address</th>
										<td>${data.address}</td>
									</tr>
									<tr>
										<th>Phone</th>
										<td>${data.phone}</td>
									</tr>
									<tr>
										<th>Website</th>
										<td>${data.website}</td>
									</tr>
									<tr>
										<th>Email</th>
										<td>${data.email}</td>
									</tr>
								</table>
								
								<h2>Squad</h2>
								<div id="coach"></div>
								<table>
									<thead>
										<tr>
											<th>Name</th>
											<th>Position</th>
											<th>Nationality</th>
										</tr>
									</thead>
									<tbody id="value">
									</tbody>
								</table>
								<div id="matches" class="row">
								</div>
							</div>
						`
						let squad = ''
						let coach = ''

						data.squad.forEach(player => {
							if (player.role === 'COACH') {
								coach = `
									<h5>Coach : ${player.name}</h5>
								`
							} else {
								squad += `
									<tr>
										<td>${player.name}</td>
										<td>${player.position}</td>
										<td>${player.nationality}</td>
									</tr>
								`
							}
						})
						
						document.getElementById('body-content').innerHTML = teamInfo
						document.getElementById('value').innerHTML = squad
						document.getElementById('coach').innerHTML = coach

						resolve(data)
					})
				}
			})
		}

		fetch(`${baseUrl}v2/teams/${idParam}`, options)
		.then(status)
		.then(json)
		.then(data => {
			let teamInfo = `
				<div class="center scroll">
					<h1>${data.name} (${data.tla})</h1>
					<img alt="${data.name}" src="${data.crestUrl}">
					<table class="highlight">
						<tr>
							<th>Venue</th>
							<td>${data.venue}</td>
						</tr>
						<tr>
							<th>Founded</th>
							<td>${data.founded}</td>
						</tr>
						<tr>
							<th>Address</th>
							<td>${data.address}</td>
						</tr>
						<tr>
							<th>Phone</th>
							<td>${data.phone}</td>
						</tr>
						<tr>
							<th>Website</th>
							<td>${data.website}</td>
						</tr>
						<tr>
							<th>Email</th>
							<td>${data.email}</td>
						</tr>
					</table>
					
					<h2>Squad</h2>
					<div id="coach"></div>
					<table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Position</th>
								<th>Nationality</th>
							</tr>
						</thead>
						<tbody id="value">
						</tbody>
					</table>
					<div id="matches" class="row">
					</div>
				</div>
			`
			let squad = ''
			let coach = ''

			data.squad.forEach(player => {
				if (player.role === 'COACH') {
					coach = `
						<h5>Coach : ${player.name}</h5>
					`
				} else {
					squad += `
						<tr>
							<td>${player.name}</td>
							<td>${player.position}</td>
							<td>${player.nationality}</td>
						</tr>
					`
				}
			})
			
			document.getElementById('body-content').innerHTML = teamInfo
			document.getElementById('value').innerHTML = squad
			document.getElementById('coach').innerHTML = coach

			resolve(data)
		})
	})
}

function getMatch() {
	if('caches' in window) {
		caches.match(`${baseUrl}v2/matches`)
		.then(response => {
			if(response) {
				response.json()
				.then(data => {
					let matches = ''
					let utcDate = ''

					data.matches.forEach(match => {
						if(match.competition.name === 'Premier League') {
							utcDate = new Date(match.utcDate)

							matches += `
								<div class="col s12 m6">
									<div class="card">
										<div class="card-content">
											<span class="card-title">Matchday: ${match.matchday}</span>
											<table class="centered fixed">
												<col width="20px"/>
												<col width="20px"/>
												<col width="20px"/>
												<tr>
													<td><strong>${match.homeTeam.name}</strong></td>
													<td><strong>VS</strong><br/>${utcDate}</td>
													<td><strong>${match.awayTeam.name}</strong></td>
												</tr>
											</table>
										</div>	
									</div>
								</div>
							`
						}
					})
					document.getElementById('matches').innerHTML = matches
				})
			}
		})
	}

	fetch(`${baseUrl}v2/matches`, options)
	.then(status)
	.then(json)
	.then(data => {
		let matches = ''
		let utcDate = ''

		data.matches.forEach(match => {
			if(match.competition.name === 'Premier League') {
				utcDate = new Date(match.utcDate)

				matches += `
					<div class="col s12 m6">
						<div class="card center">
							<div class="card-content">
								<span class="card-title">Matchday: ${match.matchday}</span>
								<table class="centered fixed">
									<col width="20px"/>
									<col width="20px"/>
									<col width="20px"/>
									<tr>
										<td><strong>${match.homeTeam.name}</strong></td>
										<td><strong>VS</strong><br/>${utcDate}</td>
										<td><strong>${match.awayTeam.name}</strong></td>
									</tr>
								</table>
							</div>	
						</div>
					</div>
				`
			}
		})
		document.getElementById('matches').innerHTML = matches
	})
	.catch(error)
}

function getFavoriteTeam() {
	getFavTeam()
	.then(teams => {
		let teamHTML = ''	
		teams.forEach(team => {
			console.log(team)
			teamHTML += `
				<div class="card center" id="team">
					<div style="padding-top: 24px;">
						<img alt="${team.name}" src="${team.crestUrl}" height="266px">
					</div>
					<div class="card-content">
						<span class="card-title">${team.name}</span>
						<span class="card-subtitle">Venue: ${team.venue}</span>
					</div>
					<div class="card-action">
						<a class="waves-effect waves-light black btn" href="./team.html?id=${team.id}&saved=true">Detail</a>
						<button class="btn waves-effect waves-light red" type="submit" name="action" onclick="deleteTeam(${team.id})">
							<i class="material-icons">delete</i>
						</button>	
					</div>
				</div>
			`
		})
		document.getElementById('favorite').innerHTML = teamHTML
	})
}

function getFavTeamById() {
	const urlParams = new URLSearchParams(window.location.search)
	const idParam = urlParams.get('id')

	getById(parseInt(idParam)).then(team => {
		const teamHTML = `
			<div class="center scroll">
				<h1>${team.name} (${team.tla})</h1>
				<img alt="${team.name}" src="${team.crestUrl}">
				<table class="highlight striped">
					<tr>
						<th>Venue</th>
						<td>${team.venue}</td>
					</tr>
					<tr>
						<th>Founded</th>
						<td>${team.founded}</td>
					</tr>
					<tr>
						<th>Address</th>
						<td>${team.address}</td>
					</tr>
					<tr>
						<th>Phone</th>
						<td>${team.phone}</td>
					</tr>
					<tr>
						<th>Website</th>
						<td>${team.website}</td>
					</tr>
					<tr>
						<th>Email</th>
						<td>${team.email}</td>
					</tr>
				</table>
				
				<h2>Squad</h2>
				<div id="coach"></div>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Position</th>
							<th>Nationality</th>
						</tr>
					</thead>
					<tbody id="value">
					</tbody>
				</table>
				<div id="matches" class="row">
				</div>
			</div>
		`	

		let squads = ''
		let coach = ''

		team.squad.forEach(sqList => {
			if (sqList.role === 'COACH') {
				coach = `
					<h5>Coach : ${sqList.name}</h5>
				`
			} else {
				squads += `
					<tr>
						<td>${sqList.name}</td>
						<td>${sqList.position}</td>
						<td>${sqList.nationality}</td>
					</tr>
				`
			}
		})
		
		document.getElementById('body-content').innerHTML = teamHTML
		document.getElementById('value').innerHTML = squads
		document.getElementById('coach').innerHTML = coach
	})
}