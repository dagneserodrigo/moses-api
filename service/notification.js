const CONFIG = require('../config/config')
const FCM = require('fcm-push')

let fcm = null
try {
	fcm = new FCM(CONFIG.ServerKey)
} catch (e) { console.log(e) }

module.exports = {
	sendMessage: (tokenClient, ticketId) => {
		const message = {
			to: tokenClient,
			collapse_key: 'your_collapse_key',
			data: {
				ticketId: ticketId
			},
			notification: {
				title: 'Ticket alterado',
				body: 'A situação de seu ticket foi alterada'
			}
		}

		fcm.send(message)
			.then(function (response) {
				console.log("Successfully sent with response: ", response)
			})
			.catch(function (err) {
				console.log("Something has gone wrong!")
				console.error(err)
			})
	}
}