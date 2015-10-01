var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
//No need to change anything above this line.

function MainController($timeout) {
    var vm = this; //instead of using this when refering to the controller, let's use vm. It will make things easier.
    
    vm.joe = new Guy("Joe",100);
    vm.bob = new Guy("Bob",150);
    vm.bank = 200;
    var _racing = false;
    
       
    
    vm.frogs = [
        {name: "Tom", posX: 36},
        {name: "Dick", posX: 36},
        {name: "Harry", posX: 36}
        ];
    
    vm.start = function(){
        _racing = true;
        _raceManager();
    }
   
    function _checkWinners(){
        vm.frogs.forEach(function(frog){
            if(frog.posX >= 69){
                alert("Race complete");
                _racing = false;
            }
        })
    }
    
    
    function _move(){
        vm.frogs.forEach(function(frog){
            var random = Math.floor(Math.random()*5);
            frog.posX += random;
        });
    };
    
    
    function _raceManager(){
        _checkWinners();
        if(!_racing){
            return;
        }
        _move();
        $timeout(_raceManager, 50);
    }
    
    vm.reset = function(){
        vm.frogs.forEach(function(frog){
            frog.posX = 36;
        })
    };
  
    
    function Guy(name, startingCash) {
        this.name = name;
        this.cash = startingCash;
        this.giveCash = function(amount){
            if (amount <= this.cash && amount > 0) {
                this.cash -= amount;
                return amount;
            } else {
                alert("I don't have enough cash to give you");
                return 0;
            } 
        };
        this.receiveCash = function(amount){
            if (amount > 0) {
                this.cash += amount;
                return amount;
            } else {
                alert("No amount to add!");
                return 0;
            }
        };
    };
    vm.giveMoneyToJoe = function() {
        if (vm.bank >= 10){
            vm.bank -= vm.joe.receiveCash(10);
        } else {
            alert("The bank is out of money.");
        }
    };
    
    vm.receiveMoneyFromBob = function() {
        vm.bank += vm.bob.giveCash(5);
    };
}
