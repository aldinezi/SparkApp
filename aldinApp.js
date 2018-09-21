var app = angular.module('aldinApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);
var axios = require('axios');

app.controller('mainCtrl', function($scope, dataService, $location) {

    $scope.$on('$routeChangeSuccess', function() {
        if ($location.path().indexOf('phone') > -1) {
            $scope.backBtn = true;

        } else {
            $scope.backBtn = false;
        }
    });

    $scope.rightcl = function(id) {
        window.location.href = "#!/phone/" + id;
    };
    $scope.leftcl = function(index) {
        $scope.phones.splice(index, 1);
    };

    dataService.getData().then(function(response) {
        $scope.phones = response.data.phones;
        $scope.$apply();
    });

});

app.controller('singleCtrl', function($scope, $routeParams) {
    $scope.itemID = $routeParams.id;
    $scope.selectedPhone = $scope.phones.find(function(ph) {
        if (ph.id == $routeParams.id)
            return ph;
    });

});

app.factory('dataService', function() {
    return {
        getData: function() {
            return axios.get('https://api.myjson.com/bins/rz97o')
            .then(function(response) {
                return response;
            });
        }
    };
});

app.config(function($routeProvider) {
    $routeProvider
        .when("/main", {
            templateUrl: "./main.html"
        })
        .when('/phone/:id', {
            templateUrl: './individual.html',
            controller: 'singleCtrl'
        }).otherwise('/main', {
            templateUrl: "./main.html"
        });
});

app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});