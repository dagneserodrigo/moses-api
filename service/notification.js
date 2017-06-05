const CONFIG = require('../config/config')
const FCM = require('fcm-push')

var fcm = null
try {
	fcm = new FCM(CONFIG.ServerKey)
} catch (e) { console.log(e) }

module.exports = {
	sendMessage: (tokenClient, ticketId) => {
		const message = {
			to: tokenClient,
			data: {
				ticketId: ticketId
			},
			notification: {
				title: 'Ticket alterado',
				body: 'A situação de seu ticket foi alterada'
			}
		}

		return fcm.send(message)
	}
}