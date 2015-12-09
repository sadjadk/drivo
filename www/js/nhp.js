app = angular.module('drivoApp', ['ngRoute']);

deviceId = "";
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    deviceId = device.uuid;
};

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "home.html",
        controller: "homeCtrl"
    });
});// home route

app.config(function($routeProvider) {
    $routeProvider.when("/index", {
        templateUrl: "home.html",
        controller: "homeCtrl"
    });
});// home route

app.config(function($routeProvider) {
    $routeProvider.when("/all-orders", {
        templateUrl: "all-orders.html",
        controller: "allOrdersCtrl"
    });
});// /all orders route

app.config(function($routeProvider) {
    $routeProvider.when("/order-detail", {
        templateUrl: "order-detail.html",
        controller: "orderDetailCtrl"
    });
});// /all orders route

app.controller("homeCtrl", function($scope, $http){
    $http.get("http://192.168.1.20:1202/getDriverOrders?deviceId="+deviceId)
        .success(function(orders){
//        $scope.title    = "My Delivery List";
        $scope.title    = deviceId;
        $scope.orders   = orders;
    });// /get orders
});// homeCtrl

app.controller("allOrdersCtrl", function($scope, $http){
    $http.get("http://192.168.1.20:1202/getDriverOrders?deviceId="+deviceId)
        .success(function(orders){
        $scope.title    = "My All Delivery List";
        $scope.orders   = orders;
    });// /get all orders
});// allOrdersCtrl

app.controller("orderDetailCtrl", function($scope, $http){
    $http.get("http://192.168.1.20:1202/orderDetail?id="+global.getParameterByName("id"))
        .success(function(order){
        $scope.title             = "Order Detail";
        $scope.orderDetail       = order;
        $scope.changeOrderStat   = function(id, status){
            $.get("http://192.168.1.20:1202/driverChangeOrderStat?id="+id+"&status="+status, function(respText, status, xhr){
                if(xhr.status==200){
                    alert("The order status changed successfully.");
                    window.location.reload();
                }
            });
        };
    });// /get orders
});// homeCtrl


/********************
 * Global Functions *
 ********************/

function globalM(){}

globalM.prototype.getParameterByName = function(name){
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location);
    if(results == null)
        return "";
    else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
}// /get parameter by name

var global = new globalM();
