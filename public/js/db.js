const dbPromised = idb.open('boolaa', 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains('favorites')) {
        upgradeDb.createObjectStore('favorites', {keyPath: 'id'})
    }
})


function savedTeam({id, name, tla, crestUrl, venue, founded, address, phone, website, email, squad}) {
    dbPromised
    .then(db => {
        const tx = db.transaction('favorites', 'readwrite')
        const store = tx.objectStore('favorites')

        const item = {
            id,
            name,
            tla,
            crestUrl,
            venue,
            founded,
            address,
            phone,
            website,
            email,
            squad
        }
        store.put(item)
        return tx.complete
    })
    .then(() => {
        console.log('Tim berhasil ditambahkan kedalam daftar favorit')
    })
}

function getFavTeam() {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const tx = db.transaction('favorites', 'readonly')
            const store = tx.objectStore('favorites')
            return store.getAll()
        })
        .then(team => {
            resolve(team)
        })
    })
}

function getById(id) {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const tx = db.transaction('favorites', 'readonly')
            const store = tx.objectStore('favorites')
            return store.get(id)
        })
        .then(team => {
            resolve(team)
            console.log(team)
        })
    })
}

function deleteTeam(key) {
    dbPromised.then(db => {
        const tx = db.transaction('favorites', 'readwrite')
        const store = tx.objectStore('favorites')
        store.delete(key)
        alert('Tim berhasil dihapus dari daftar favorit')
        window.location.reload()
        return tx.complete
    })
    .then(() => {
        console.log('Tim telah dihapus didaftar favorit')
    })
}