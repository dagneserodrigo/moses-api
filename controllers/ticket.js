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

let allTickes = {}

module.exports = (app) => {

	return {
		getAll: (req, res) => {
			const userRef = admin.database().ref('Users')

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
			const userRef = admin.database().ref('Users')

			userRef.child(ticket.userId)
				.child('Tickets')
				.child(ticket.id)
				.child('situacaoTicket')
				.set(ticket.situacaoTicket)

			notificationService.sendMessage(ticket.token, ticket.id)
				.then((response) => {
					res.json({ message: "Alterado com sucesso!" })
				})
				.catch((err) => {
					res.json({ message: "Não foi possível alterar o status", error: err })
				})
		}
	}
}