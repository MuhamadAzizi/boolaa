if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
        .then(() => {
            console.log('Pendaftaran service worker berhasil')
        })
        .catch(() => {
            console.log('Pendaftaran service worker gagal')
        })
        requestPermission()
    })
} else {
    console.log('Browser tidak mendukung service worker')
}


function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return
            }
 
            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    navigator.serviceWorker.getRegistration().then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array('BGpeYpWORSsWvCudJvAbH3YJ4yF4nKCG-isHGIbkLvjhEGGpGb7ctlMVsMxh_Pw66la8FskUbwfaKQJn9dpzD-M')
                        })
                        .then(subscribe => {
                            console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint)
                            console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh'))
                            )))
                            console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth'))
                            )))
                        })
                        .catch(e => {
                            console.error('Tidak dapat melakukan subscribe ', e.message)
                        })
                    })
                }
            })
        })
    }
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/')
    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}