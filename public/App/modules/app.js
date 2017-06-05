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

		$scope.titulo = ticket.titulo;
		$scope.changeStatus = function (situacao) {
			$mdDialog.hide();
			var t = { id: ticket.id, situacaoTicket: situacao, userId: ticket.userId, token: ticket.Token };
			$http.post('/ticket', t)
				.then(function (response) {
					carregar();
					$mdDialog.hide();
					$mdDialog.show({
						parent: angular.element(document.body),
						template: '<div style="padding:10px"><h3>' + response.data.message + '</h3></div>',
						clickOutsideToClose: true,
						locals: { ticket: ticket, carregar: $scope.carregar },
						controller: 'statusController'
					})
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