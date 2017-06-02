angular.module('mosesApp', ['ngMaterial'])
	.controller('mainController', function ($scope, $http, $mdDialog) {
		$scope.tickets = [];

		$scope.alterarStatus = function(ticket){
			$mdDialog.show({
				parent: angular.element(document.body),
				templateUrl: './App/templates/change-status.html',
				clickOutsideToClose: true,
				locals: { ticket: ticket },
				controller: function($scope, $http, ticket){
					$scope.titulo = ticket.titulo;
					$scope.changeStatus = function(situacao){
						$mdDialog.hide();
						$http.post('/ticket',{
							id: ticket.id, 
							situacaoTicket: situacao, 
							userId: ticket.userId,
							token: ticket.Token
						});
					}
				}
			})
		}

		$http.get('/ticket').then(function (response) {
			$scope.tickets = response.data;
			console.log($scope.tickets);
		}, function (error) {
			console.log(error);
		})
	});