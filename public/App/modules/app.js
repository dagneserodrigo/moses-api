angular.module('mosesApp', ['ngMaterial'])
	.controller('mainController', function ($scope, $http, $mdDialog) {

		$scope.tickets = [];

		$scope.carregar = function () {
			$http.get('/ticket').then(function (response) {
				$scope.tickets = response.data;
			}, function (error) {
				console.log(error);
			})
		}

		$scope.alterarStatus = function (ticket) {
			$mdDialog.show({
				parent: angular.element(document.body),
				templateUrl: './App/templates/change-status.html',
				clickOutsideToClose: true,
				locals: { ticket: ticket, carregar: $scope.carregar },
				controller: 'statusController'
			})
		}
		$scope.carregar();

	}).controller('statusController', function ($scope, $http, $mdDialog, ticket, carregar) {
		$scope.resposta = '';

		$scope.titulo = ticket.titulo;
		$scope.changeStatus = function (situacao) {
			if (!$scope.resposta) {
				return;
			}
			$mdDialog.hide();
			var t = { id: ticket.id, situacaoTicket: situacao, userId: ticket.userId, token: ticket.Token, resposta: $scope.resposta };
			$http.post('/ticket', t)
				.then(function (response) {
					carregar();
					$mdDialog.hide();
					console.log(response)
				}, function (error) {
					$mdDialog.hide();
					console.log(error);
				});
			$mdDialog.show({
				parent: angular.element(document.body),
				template: '<md-progress-linear md-mode="indeterminate"></md-progress-linear>'
			})
		}
	});