/**
 * Created by Alvaro on 2/17/2015.
 */
var app= angular.module('shoppingCart',[]);

app.controller('CartControler', function($scope) {
    $scope.books = [
        {title: 'Absolute Java',
            qty: 1, price: 114.95},
        {title: 'Pro HTML5',
            qty: 1, price: 27.95},
        {title: 'Head First HTML5',
            qty: 1, price: 27.89}
    ];
    $scope.total;

    $scope.loadData=function(){
        if(window.localStorage.length!=0){
            $scope.books=JSON.parse(window.localStorage.getItem("book"));
        }
    }

    $scope.removeBook = function(index) {
        $scope.books.splice(index, 1);
    }
    $scope.addNew=function(){
        var nbook={title: 'New Book',
            qty: 1, price: 10.99};
        $scope.books.push(nbook);

    }
    $scope.saveSession=function(){
        window.localStorage.setItem("book",JSON.stringify($scope.books));
    }
    $scope.updateTotal = function(val) {
        $scope.total=0;
        for(v in val){
            $scope.total+=val[v].price*val[v].qty;
            console.log($scope.total);
        }

    }

    $scope.$watch('books', function() {
        $scope.updateTotal($scope.books);
    }, true)

});

