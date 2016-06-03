/**
 * Created by muyonghui on 16/5/28.
 */

angular.module("app.routes",[])
    .config(function ($stateProvider,$urlRouterProvider) {

        $stateProvider
            .state('healthBao_1',{
                url: "/healthBao_1",
                templateUrl: "templates/healthBao_1.html",
                controller: 'pageOneCtrl'
            })
            .state('healthBao_2',{
                url: "/healthBao_2",
                templateUrl: "templates/healthBao_2.html",
                controller: 'pageTwoCtrl'
            })
            .state('healthBao_3',{
                url: "/healthBao_3",
                templateUrl: "templates/healthBao_3.html",
                controller: 'pageThreeCtrl'
            })
            .state('healthBao_4',{
                url: "/healthBao_4",
                templateUrl: "templates/healthBao_4.html",
                controller: 'pageFourCtrl'
            })
            .state('login',{
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'loginCtrl'
            })
            .state('register',{
                url: "/register",
                templateUrl: "templates/register.html",
                controller: 'registerCtrl'
            })
            .state('shopDetail',{
                url: "/shopDetail",
                templateUrl: "templates/shopDetail.html",
                controller: 'shopDetailCtrl'
            })
            .state('order',{
                url: "/order",
                templateUrl: "templates/order.html",
                controller: 'orderCtrl'
            })
            .state('address',{
                url: "/address",
                templateUrl: "templates/address.html",
                controller: 'addressCtrl'
            })
            .state('addAddress',{
                url: "/addAddress",
                templateUrl: "templates/addAddress.html",
                controller: 'addAddressCtrl'
            })
            //.state()
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });

