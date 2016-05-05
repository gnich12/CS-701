/**
 * Created by Alvaro on 2/23/2015.
 */
var app= angular.module("mapQuest",[]);

app.controller("mapController",function($scope,$http){
    $scope.dir;
    $scope.from="Boston, MA";
    $scope.to="Cambridge, MA";
    $scope.getDirections=function(){
        var url="http://open.mapquestapi.com/directions/v2/route?key=Fmjtd|luu821u7nd%2Caa%3Do5-942whf&from="+
            encodeURI($scope.from)+"&to="+encodeURI($scope.to);
        $http.get(url).success(function(data,status, headers,config){
                $scope.dir=data.route;
        });
    };
    $scope.$watch('dir', function() {
        $scope.getDirections();
    }, true);

});
