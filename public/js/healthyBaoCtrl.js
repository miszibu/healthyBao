/**
 * Created by zibu on 2016/5/23.
 */
angular.module("app.healthyBaoCtrl", [])

    .controller("pageOneCtrl", function ($scope, defaultService, $http, $state, $q, ionicSuperPopup) {
        /*if (defaultService.getUser() == null || defaultService.getUser().mobile == undefined)
         $state.go("login");*/
        $scope.search = "";
        $scope.listName = defaultService.getListName();
        $scope.shopList = [];
        var promise = defaultService.getShopList();
        promise.then(function (data) {
            $scope.shopList = data;
            console.log(data);
            $state.go("healthBao_1")
        }, function (data) {
            ionicSuperPopup.show("失败", "请重新登陆", "error");
        })
        $scope.chooseShop = function (shop) {
            console.log(shop);
            defaultService.setCurrentShop(shop);
            $state.go("shopDetail");
        };
        $scope.enterShopList = function (item) {
            ionicSuperPopup.show("正在施工", "请等待", "warning");
            console.log(item);
        };
        $scope.goPage = function (index) {
            if (index == 1)
                $state.go("healthBao_1");
            else if (index == 2)
                $state.go("healthBao_2");
            else if (index == 3)
                $state.go("healthBao_3");
            else if (index == 4)
                $state.go("healthBao_4");
        };
    })
    .controller("pageTwoCtrl", function ($scope, defaultService, $http, $state) {
        $scope.orderList=defaultService.searchOrderList();
        var promise = defaultService.searchOrderList();
        promise.then(function (data) {
            for(var i= 0;i<data.length;i++){
                data[i].showTime=data[i].createtime.slice(0,10)+' '+data[i].createtime.slice(11,16);
            }
            $scope.orderList = data;
            console.log(data);
        }, function (data) {
            ionicSuperPopup.show("失败", "请重新登陆", "error");
        });
        if (defaultService.getUser() == null || defaultService.getUser().length < 1)
            $state.go("login");
        $scope.goPage = function (index) {
            if (index == 1)
                $state.go("healthBao_1");
            else if (index == 2)
                $state.go("healthBao_2");
            else if (index == 3)
                $state.go("healthBao_3");
            else if (index == 4)
                $state.go("healthBao_4");
        };
    })
    .controller("pageThreeCtrl", function ($scope, defaultService, $state) {
        if (defaultService.getUser() == null || defaultService.getUser().length < 1)
            $state.go("login");
        $scope.priceList = defaultService.getPriceList();
        console.log($scope.priceList);
        $scope.goPage = function (index) {
            if (index == 1)
                $state.go("healthBao_1");
            else if (index == 2)
                $state.go("healthBao_2");
            else if (index == 3)
                $state.go("healthBao_3");
            else if (index == 4)
                $state.go("healthBao_4");
        };
    })
    .controller("pageFourCtrl", function ($scope, defaultService, $state) {
        if (defaultService.getUser() == null || defaultService.getUser().length < 1)
            $state.go("login");
        $scope.user = defaultService.getUser();
        $scope.goPage = function (index) {
            if (index == 1)
                $state.go("healthBao_1");
            else if (index == 2)
                $state.go("healthBao_2");
            else if (index == 3)
                $state.go("healthBao_3");
            else if (index == 4)
                $state.go("healthBao_4");
        };
        $scope.address = function () {
            $state.go("address");
        }

    })
    .controller("shopListCtrl", function ($scope, defaultService) {
        if (defaultService.getUser() == null || defaultService.getUser().length < 1)
            $state.go("login");
        $scope.title = "默认";
        $scope.returnDefaultPage = function () {
            window.history.go(-1);
        }
        /*defaultService.getCurrentSearchInfo();*/
    })
    .controller("loginCtrl", function ($scope, defaultService, $q, $http, $state, hostip, ionicSuperPopup) {
        $scope.user = {
            tel: "",
            password: ""
        };
        $scope.login = function () {
            if ($scope.user.tel.length != 11) {
                ionicSuperPopup.show("错误的手机号!", "请填写正确的手机号", "warning");
            } else if ($scope.user.password.length < 8) {
                ionicSuperPopup.show("密码过短！", "请填写正确的密码", "warning");
            } else {
                var promise = defaultService.login($scope.user);
                promise.then(function (data) {
                    $("canvas").remove();//移除背景图
                    $state.go("healthBao_1")
                }, function (data) {
                    ionicSuperPopup.show("账号密码错误", "请重新登陆", "error");
                })
            }
        };
        $scope.register = function () {
            $("canvas").remove();//移除背景图
            $state.go("register");
        };
    })
    .controller("registerCtrl", function ($scope, defaultService, $q, $http, $state, hostip, ionicSuperPopup) {
        $scope.user = {
            tel: "",
            username: "",
            password: ""
        };
        $scope.register = function () {
            if ($scope.user.tel.length != 11) {
                ionicSuperPopup.show("错误的手机号!", "请填写正确的手机号", "warning");
            } else if ($scope.user.username == null) {
                ionicSuperPopup.show("用户名不可为空", "请填写用户名", "warning");
            } else if ($scope.user.password.length < 8) {
                ionicSuperPopup.show("密码过短！", "密码长度不可短于8位", "warning");
            } else {
                var promise = defaultService.register($scope.user);
                promise.then(function (data) {
                    $("canvas").remove();//移除背景图
                    $state.go("healthBao_1")
                }, function (data) {
                    ionicSuperPopup.show("注册失败", "请重新注册", "error");
                })
            }
        };
        $scope.login = function () {
            $("canvas").remove();//移除背景图
            $state.go("login");
        }
    })
    .controller("shopDetailCtrl", function ($scope, defaultService, $q, $http, $state, hostip, ionicSuperPopup) {
        $scope.currentShop = defaultService.getCurrentShop();
        $scope.allFoodNum = 0;
        $scope.allFoodMoney = 0;
        $scope.choosedFood = [];
        var promise = defaultService.getFoodList();
        promise.then(function (data) {
            $scope.foodList = data;
            if (data[0].num !=undefined) {
                for (var i = 0; i < data.length; i++) {
                    $scope.allFoodNum += data[i].num;
                    if (data[i].num != 0) {
                        $scope.allFoodMoney += data[i].commodityprice * data[i].num;
                    }
                }
            } else {
                for (var i = 0; i < data.length; i++) {
                    $scope.foodList[i].num = 0;
                }
            }
        }, function (data) {
            ionicSuperPopup.show("错误", "请调试", "error");
        })
        $scope.returnDefaultPage = function () {
            defaultService.setFoodList($scope.foodList);
            $state.go("healthBao_1");
        };
        $scope.plusCurrentNum = function (food) {
            $scope.allFoodNum++;
            $scope.allFoodMoney += food.commodityprice;
            for (var i = 0; i < $scope.foodList.length; i++) {
                if ($scope.foodList[i]._id == food._id)
                    $scope.foodList[i].num++;
            }
            ;
        };
        $scope.minusCurrentNum = function (food) {
            $scope.allFoodNum--;
            $scope.allFoodMoney -= food.commodityprice;
            for (var i = 0; i < $scope.foodList.length; i++) {
                if ($scope.foodList[i]._id == food._id)
                    $scope.foodList[i].num--;
            }
        };
        $scope.goOrderForm = function () {
            if($scope.allFoodNum==0){
                ionicSuperPopup.show("购物车为空","请选中商品","warning");
            }else if($scope.allFoodMoney< $scope.currentShop.sendmoney){
                ionicSuperPopup.show("不足起送价","请重新选则商品","warning");
            }else{
                angular.forEach($scope.foodList, function (food) {
                    if (food.num != 0) {
                        $scope.choosedFood.push(food);
                    }
                });
                defaultService.setOrderedFood($scope.choosedFood);
                defaultService.setFoodList($scope.foodList);
                $state.go("order");
            }
        };
    })
    .controller("orderCtrl", function ($scope, defaultService, $state, ionicSuperPopup) {

        $scope.user = defaultService.getUser();
        $scope.orderedFood = defaultService.getOrderedFood();
        $scope.shop = defaultService.getCurrentShop();
        $scope.money = 0;
        var promise = defaultService.showUserAddress($scope.user);
        promise.then(function (data) {
            $scope.address=data[0];
            $scope.addressFlag=true;
            console.log($scope.address);
        }, function (data) {
            $scope.addressFlag=false;
            ionicSuperPopup.show("出错了!", "您没有创建地址", "error");
        })
        var currentTime = new Date();
        var minutes = (currentTime.getMinutes() + $scope.shop.delivertime) % 60;
        if(minutes<10){
            minutes='0'+minutes;
        }
        var hour = parseInt(((currentTime.getMinutes() + $scope.shop.delivertime) / 60).toFixed(0)) + currentTime.getHours();
        for (var i = 0; i < $scope.orderedFood.length; i++)
            $scope.money += $scope.orderedFood[i].commodityprice * $scope.orderedFood[i].num;
        $scope.money+=$scope.shop.delivermoney;
        $scope.arriveTime = hour + ":" + minutes;

        $scope.goShopDetail = function () {
            $state.go("shopDetail");
        };
        $scope.payMoney = function () {
            if($scope.addressFlag==true){
                var promise = defaultService.payMoney($scope.orderedFood,$scope.money);
                promise.then(function (data) {
                    ionicSuperPopup.show("恭喜您", "下单成功", "success");
                    $state.go("healthBao_1");
                }, function (data) {
                    ionicSuperPopup.show("出错了!", "请先创建默认地址", "error");
                });
            }else{
                ionicSuperPopup.show("出错了!", "请先创建默认地址", "error");
            }
        };
    })
    .controller("addressCtrl", function ($scope, defaultService, $state, ionicSuperPopup) {
        $scope.userAddress = [];
        var promise = defaultService.showUserAddress();
        promise.then(function (data) {
            $scope.userAddress = data;
        }, function (data) {
           /* ionicSuperPopup.show("出错了!", "地址加载失败", "error");*/
        });

        $scope.returnPageFour = function () {
            $state.go("healthBao_4");
        };
        $scope.goAddAddress = function () {
            $state.go("addAddress");
        };


    })
    .controller("addAddressCtrl", function ($scope, defaultService, $state, ionicSuperPopup) {

        $scope.address = {};

        $scope.add = function () {
            console.log($scope.address);
            var promise = defaultService.addUserAddress($scope.address);
            promise.then(function (data) {
                ionicSuperPopup.show("恭喜您!", "地址增加成功", "success");
                $state.go("address");
            }, function (data) {
                ionicSuperPopup.show("出错了!", "地址增加失败", "error");
            })
        }

        $scope.returnAddress = function () {
            $state.go("address");
        };
        $scope.chooseMan= function () {
            $scope.address.sex="男";
        };
        $scope.chooseWomen= function () {
            $scope.address.sex="女";
        }
    })
