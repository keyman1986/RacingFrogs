var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
//No need to change anything above this line.

function MainController($timeout) {
    var vm = this; //instead of using this when refering to the controller, let's use vm. It will make things easier.
    
    vm.joe = new Guy("Joe",100);
    vm.bob = new Guy("Bob",150);
    vm.bank = 200;
    var _racing = false;
    var _startingPosX = 345;
    vm.newRacer = "";
    
    vm.addNewRacer = function(racerName){
        var taken = false;
        vm.frogs.forEach(function(x){
            if(x.name === racerName){
                taken = true;
                alert(racerName + " Has already been added!");
            } 
        })
        if (!taken) {
            new Racers(racerName,img);
        }
    };
    
    vm.frogs = [];
    
    
    function Racers(name,img){
        this.name = name;
        this.posX = _startingPosX;
        this.img = img;
        vm.frogs.push(this)
    }
    
    vm.resetRacers = function(){
        vm.frogs = [];
    }
    
    vm.start = function(){
        if(vm.frogs.length > 1){
            _racing = true;
            _raceManager();
        }
        
    }
   
    function _checkWinners(){
        vm.frogs.forEach(function(frog){
            if(frog.posX >= 790){
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
            frog.posX = 345;
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
