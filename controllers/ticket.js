'use strict'
const admin = require("firebase-admin");
const CONFIG = require('../config/config')
const notificationService = require('../service/notification')

const serviceAccount = require('../account.json')

try {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: "https://moses-auth.firebaseio.com"
	})
} catch (e) { console.log(e) }

module.exports = (app) => {

	const userRef = admin.database().ref('Users')

	return {
		getAll: (req, res) => {
			let allTickes = {}
			userRef.once('value', (snapshot) => {
				const data = snapshot.val()
				for (const keyUser in data) {
					if (data[keyUser].Tickets) {
						let tickets = data[keyUser].Tickets
						for (const ticketKey in tickets) {
							tickets[ticketKey].Token = data[keyUser].Token
							allTickes[ticketKey] = tickets[ticketKey]
						}
					}
				}
				res.json(allTickes)
			});
		},
		changeStatus: (req, res) => {
			let ticket = req.body
			userRef.child(ticket.userId)
				.child('Tickets')
				.child(ticket.id)
				.child('situacaoTicket')
				.set(ticket.situacaoTicket)

			notificationService.sendMessage(ticket.token, ticket.id)

			res.end()
		}
	}
}