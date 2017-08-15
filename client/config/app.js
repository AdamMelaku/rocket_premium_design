var app = angular.module('myApp', ['ngRoute','ngCookies']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/users_index.html',
		controller: 'UserController as UC'
	})
	.when('/services',{
		templateUrl: 'partials/users_services.html',
		controller: 'UserController as UC'
	})
})
