var app = angular.module('racingFrogs', []);
app.controller('MainController', MainController);
//No need to change anything above this line.

function MainController() {
    var vm = this; //instead of using this when refering to the controller, let's use vm. It will make things easier.
    
    vm.joe = new Guy("Joe",100);
    vm.bob = new Guy("Bob",150);
    vm.bank = 200;
    
    vm.frogs = [
        {name: "Tom", posX: 0},
        {name: "Dick", posX: 0},
        {name: "Harry", posX:0}
        ];
    
    vm.race = function(){
        vm.frogs.forEach(function(){
            vm.frogs.posX += 10;
        });
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
