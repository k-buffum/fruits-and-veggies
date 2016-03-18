var app = angular.module('FruitVsVeggie', ['ngFlash']);

app.controller('ListCtrl', ['$scope', 'Flash', function($scope, Flash) {
  $scope.poolList = fruit.concat(vegetables);
  $scope.fruitList = [];
  $scope.veggieList = [];
  $scope.correctGuess = true;
  $scope.fruitClass = [];
  $scope.veggieClass = [];

  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  }

  shuffle($scope.poolList);

  $scope.addFruit = function(fruit, idx) {
    if ($scope.poolList.indexOf(fruit) != -1) {
      $scope.fruitList.push($scope.poolList[idx]);
      $scope.poolList.splice(idx, 1);
      complete();
    } else {
      $scope.veggieClass[idx] = "";
      $scope.poolList.push($scope.veggieList[idx]);
      $scope.veggieList.splice(idx, 1);
      complete();
    }

  }

  $scope.addVeggie = function(veggie, idx) {
    if ($scope.poolList.indexOf(veggie) != -1) {
      $scope.veggieList.push($scope.poolList[idx]);
      $scope.poolList.splice(idx, 1); 
      complete();  
    } else {
      $scope.fruitClass[idx] = "";
      $scope.poolList.push($scope.fruitList[idx]);
      $scope.fruitList.splice(idx, 1);
      complete();
    }
  }

  function complete() {
    if ($scope.poolList.length === 0) {
      fruitGuess = [];
      veggieGuess = [];

      for(var i = 0; i < $scope.fruitList.length; i++) {
        if (fruit.indexOf($scope.fruitList[i]) === -1) {
          $scope.correctGuess = false;
          $scope.fruitClass[i] = "red";
          fruitGuess.push('false');
        } else {
          $scope.correctGuess = true;
          fruitGuess.push('true');
        }
      }

      for(var i = 0; i < $scope.veggieList.length; i++) {
        if (vegetables.indexOf($scope.veggieList[i]) === -1) {
          $scope.correctGuess = false;
          $scope.veggieClass[i] = "red";
          veggieGuess.push('false');
        } else {
          $scope.correctGuess = true;
          veggieGuess.push('true');
        }
      }

      if (fruitGuess.indexOf('false') == -1 && veggieGuess.indexOf('false') == -1) {
        Flash.create('success', 'Yippie, you guessed correctly!')
      } else {
        Flash.create('danger', 'Look over the lists and try again.')
      }
      fruitGuess = [];
      veggieGuess = [];
    }
  }

}])

//debug stuff to show the app is loading and fruit / veggies are available
console.log('App Started');
console.log('Fruit count', fruit.length);
console.log('Veggie count', vegetables.length);