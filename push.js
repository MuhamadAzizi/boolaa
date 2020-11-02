var webPush = require('web-push')

const vapidKeys = {
    'publicKey': 'BGpeYpWORSsWvCudJvAbH3YJ4yF4nKCG-isHGIbkLvjhEGGpGb7ctlMVsMxh_Pw66la8FskUbwfaKQJn9dpzD-M',
    'privateKey': 'NpRD_sTL76stJtnOGHiTEsASyCH4ZSsErKCDmUJ4-j4'
}

webPush.setVapidDetails(
    'mailto:muhamadazizi188@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubscription = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/e_2N6jB1wsU:APA91bHyKngEtmi-PWpIxEdPADY-mDcYaLHKbXmtnEzo3XS8z2sHwd-k-nqZ_1rxozDDpW0ioc7yMMCK-tiphjNeQa9bqGFkQtZC5q0aNbOfivaSMw_Eq9_rr7Z0X_K4Em9XdmWlUaZM',
    'keys': {
        'p256dh': 'BHO5sCtQ/MxXizCihi+tlV8tNxtiD5SJOhMt8Om65pB8faCts0dGRht7/YXLN44CzMoWbyzKVmFVtsM1dRS6uwM=',
        'auth': '6fcE6gfnTnaxe7qUswNa1A=='
    }
}

const payload = 'Aplikasi dapat menerima push notifikasi'

const options = {
    gcmAPIKey: '226408958564',
    TTL: 60
}

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)