var app = angular.module("myApp", ["ngAnimate", "ngRoute","kaifanlaController","kaifanlaFilter","kaifanlaService"]);

app.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "view/start.html",
      controller: "startCtrl"
    })
    .when("/main", {
      templateUrl: "view/main.html",
      controller: "mainCtrl"
    })
    .when("/detail/:dno", {
      templateUrl: "view/detail.html",
      controller: "detailCtrl"
    })
});