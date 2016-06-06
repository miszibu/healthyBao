/**
 * Created by zibu on 2016/5/23.
 */
angular.module("app.healthyBaoService", [])
    .service('defaultService', function ($q,$http,$state,hostip,ionicSuperPopup) {
        var user={};
        var listName = [
            {"id": 0, "name": "美食","image":"../img/meishi.jpg"},
            {"id": 1, "name": "土豪推荐","image":"../img/tuhaotuijian.jpg"},
            {"id": 2, "name": "预定早餐","image":"../img/zaocanzhuansong.jpg"},
            {"id": 3, "name": "蜂鸟专送","image":"../img/zhuansong.jpg"},
            {"id": 4, "name": "超市便利店","image":"../img/bianlidian.jpg"},
            {"id": 5, "name": "饮品甜品","image":"../img/s-food.jpg"},
            {"id": 6, "name": "鲜花蛋糕","image":"../img/f-cake.jpg"},
            {"id": 7, "name": "果蔬生鲜","image":"../img/v-fruit.jpg"}
        ];
        var shopList=[];
        var foodList=[];
        var priceList=[
            {"title":"金色年华iphone6s","description":"唯一不同，处处不同","value":199,"img":"../img/discover-logo-5.jpg"},
            {"title":"妮维雅NIVEA防晒白润...","description":"有效防晒，润白肌肤","value":99,"img":"../img/discover-logo-11.jpg"},
            {"title":"雷朋 时尚中性款太阳镜...","description":"经典，运动，商务，休闲","value":299,"img":"../img/discover-logo-6.jpg"},
            {"title":"蕉下双层baby小雨伞","description":"遮阳防晒防紫外线","value":199,"img":"../img/discover-logo-12.jpg"}
        ];
        var currentShop={};
        var orderedFood=[];
        var address;
        var service = {
            getListName: function () {
                return listName;
            },
            getShopList: function () {
                var deferred = $q.defer();
                $http.post(hostip +'business/businessList').success(function (data) {
                    if (data.code == 0) {
                        shopList=data.returnValue;
                        deferred.resolve(data.returnValue);
                    } else {
                        ionicSuperPopup.show("错误", "请重新登陆", "error");
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            getPriceList: function () {
                return priceList;
            },
            setUser: function (data) {
                user=data;
                console.log(user);
            },
            getUser: function () {
                console.log(user);
                return user;
            },
            setCurrentShop : function (data) {
                currentShop=data;
            },
            setOrderedFood:function(data){
                orderedFood=data;
            },
            getOrderedFood: function () {
                return orderedFood;
            },
            getFoodList: function () {
                if(foodList.length>0  && currentShop._id==foodList[0].businessid){
                    var deferred = $q.defer();
                    deferred.resolve(foodList);
                    return deferred.promise;
                }
                else {
                    var deferred = $q.defer();
                    var param = {business: currentShop._id};
                    $http.post(hostip + 'business/commodityList', param).success(function (data) {
                        if (data.code == 0) {
                            console.log(data.returnValue);
                            foodList = data.returnValue;
                            deferred.resolve(data.returnValue);
                        } else {
                            deferred.reject(data.errorReason);
                        }
                    }).error(function (data) {
                        deferred.reject(data);
                    });
                    return deferred.promise;
                }
            },
            setFoodList: function (data) {
                console.log(data);
                foodList=data;
            },
            getCurrentShop: function () {
                return currentShop;
            },
            login:function(loginUser){
                var deferred = $q.defer();
                var param = {mobile:loginUser.tel,password:loginUser.password};
                $http.post(hostip +'users/login', param).success(function (data) {
                    if (data.code == 0) {
                        user=data.returnValue;;
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            register:function(registerUser){
                var deferred = $q.defer();
                var param = {mobile:registerUser.tel,password:registerUser.password,username:registerUser.username};
                $http.post(hostip +'users/register', param).success(function (data) {
                    if (data.code == 0) {
                        user=data.returnValue;
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            showUserAddress:function(){
                var deferred = $q.defer();
                var param = {user:user};
                $http.post(hostip +'users/showUserAddress',param).success(function (data) {
                    if (data.code == 0) {
                        address=data.returnValue[0];
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            addUserAddress:function(address){
                console.log(user);
                var deferred = $q.defer();
                var param = {user:user,address:address};
                $http.post(hostip +'users/addUserAddress',param).success(function (data) {
                    if (data.code == 0) {
                        console.log(data.returnValue);
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            payMoney: function (orderedFood,money) {
                var deferred = $q.defer();
                var param = {user:user,business:currentShop,commodity:orderedFood,useraddress:address,totalmoney:money};
                console.log(param);
                $http.post(hostip +'order/addOrder',param).success(function (data) {
                    if (data.code == 0) {
                        console.log(data.returnValue);
                        deferred.resolve(data.returnValue);
                    } else {
                        console.log()
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            searchOrderList: function () {
                var deferred = $q.defer();
                var param = {user:user};
                $http.post(hostip +'order/showOrder',param).success(function (data) {
                    if (data.code == 0) {
                        console.log(data.returnValue);
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            },
            deleteOrder: function (order) {
                var deferred = $q.defer();
                var param = {order:order};
                $http.post(hostip +'order/deleteOrder',param).success(function (data) {
                    if (data.code == 0) {
                        console.log(data.returnValue);
                        deferred.resolve(data.returnValue);
                    } else {
                        deferred.reject(data.errorReason);
                    }
                }).error(function (data) {
                    deferred.reject(data);
                });
                return deferred.promise;
            }
        }
        return service;


    })
