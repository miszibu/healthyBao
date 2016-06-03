/**
 * Created by muyonghui on 16/5/28.
 */
angular.module('app', ['ngAnimate', 'ui.router', 'app.config', 'app.routes', 'app.healthyBaoCtrl','app.healthyBaoService','cera.ionicSuperPopup'])
    // .constant('hostip', 'http://localhost:3000/')  //方法3定义全局变量
    .constant('hostip', 'http://115.28.106.162:3000/')  //方法3定义全局变量
    //.config(['$routeProvider', function ($routeProvider) {
    //    $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: ''});
    //    $routeProvider.when('/register', {templateUrl: 'partials/register.html', controller: ''});
    //    $routeProvider.otherwise({redirectTo: '/healthyBao_1'});
    //}]);
