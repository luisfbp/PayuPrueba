/**
 * Created by USER
 */
var xmlresponse = "";
(function(){

    var myApp =  angular.module("GeekStore", []);

    //controllers

    myApp.controller("ProductsController" , ProductsController);

    ProductsController.$inject = ['$scope' , '$http'];
    function ProductsController($scope, $http) {
        $scope.listPurchases = []
        $scope.products = [];
        $scope.rates = [];
        $scope.boughtProducts = [];
        var URL = "/api/matrix";
        $scope.product = "";
        $scope.quantity = 0;
        $scope.value = 0;
        $scope.listProducts = "";
        $scope.quantityError = "";
        $scope.statusCompra = "";
        $scope.rate = {};
        $scope.total = 0;
        $scope.totalOutIva = 0;

        $scope.message = "Usted no ha realizado ninguna compra aún";
        $scope.addProduct =  function(){
          if($scope.quantity > 0) {
            var productValue = getProductValueInCOP($scope.product.currency_id, $scope.product.value);
            var value = productValue * $scope.quantity;
            $scope.products.push(  {product: $scope.product ,quantity: $scope.quantity , value: value });
            $scope.product = "";
            $scope.quantityError = "";
            $scope.quantity = 0;
            $scope.value = 0;
          } else {
            $scope.quantityError = "La cantidad debe ser mayor o igual a 1, Por favor, Ingrese un valor";
          }
        };

        $scope.removeProduct =  function(productName){
            for(var i = 0 ;  i < $scope.products.length; i++){
                if(  $scope.products[i].product.name == productName){
                  $scope.products.splice(i, 1);
                }
            }
        };

        $scope.buyProducts =  function(){
            //TODO
            var URL = "/api/invoice";
            var totalPurchase = getTotalPurchase($scope.products);
            var purchaseWithIVA = totalPurchase * 0.19 + totalPurchase;
            var jsondata =  {products: $scope.products, total: purchaseWithIVA};

            $http.post(URL, jsondata).
            success(function(data, status, headers, config) {
              if (data.affectedRows > 0) {
                $scope.total = purchaseWithIVA;
                $scope.totalOutIva = totalPurchase;
                $scope.boughtProducts = $scope.products;
                $scope.statusCompra = "Compra Realizada Satisfactoriamente";
                getPruchases();
              }
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });
        };
        getPruchases();
        function getPruchases() {
          var URL = "/api/getPurchases";

          $http.post(URL, null).
          success(function(data, status, headers, config) {
              $scope.listPurchases = data;
          }).
          error(function(data, status, headers, config) {
              console.log("Error " + data + " " + status);
              $scope.message = "There was an error creating the matrix";
          });
        }
        /**
        * Method for getting all the products in the database
        */
        var getProducts =  function(){
            var URL = "/api/getProducts";

            $http.post(URL, null).
            success(function(data, status, headers, config) {
                $scope.listProducts = data;
            }).
            error(function(data, status, headers, config) {
                console.log("Error " + data + " " + status);
                $scope.message = "There was an error creating the matrix";
            });
        };
        //Load the products for being shown the first time
        getProducts();
        /**
        * This method call a rest service and get an spesific currency
        * @currency Currency short name
        * @callbackResp Return of the currency value
        */
        function getCurrencyRate(currency, callbackResp) {
          var urlRates = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("'+currency+'")&env=store://datatables.org/alltableswithkeys'

          $http({
            method: 'GET',
            url: urlRates
          }).then(function successCallback(response) {
              xmlresponse = response;
              var firstIndex = response.data.indexOf('<Rate>');
              var secondIndex = response.data.indexOf('</Rate>');
              callbackResp(parseFloat(response.data.slice(firstIndex+6,secondIndex)));
          }, function errorCallback(response) {
              console.log(response);
          });
        }

        getAllRates();
        /**
        * Mothod for getting the rates
        */
        function getAllRates() {
          getCurrencyRate('USDCOP', function(callbackResp) {
            $scope.rates.push( {currency: 'USD', rate: callbackResp} );
          });
          getCurrencyRate('MXNCOP', function(callbackResp) {
            $scope.rates.push( {currency: 'MXN', rate: callbackResp} );
          });
        }
        /**
        * Mothod for calculating a currency value in COP
        */
        function getProductValueInCOP(currency, value){

          for(var i = 0; i < $scope.rates.length; i++)
            if (currency == $scope.rates[i].currency) {
              return value * $scope.rates[i].rate;
            };
          return currency == 'COP' ? value : 0;
        }

        function getTotalPurchase(products){
          var total = 0;
          //console.log(products[0].value);
          for(var i = 0; i < products.length; i++){
            total += parseFloat(products[i].value);
          }
          return total;
        }
        $scope.printInvoice = function() {
          window.print();
        }
    }
})();
