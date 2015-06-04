angular
  .module('angularAddresses', [])

  .filter('objToArr', function () {
    return function (obj) {
      if(obj) {
      return Object.keys(obj).map(function (key) {
        obj[key]._id = key;
        return obj[key]
      });
    }
  }
  })
  .filter('ransomcase', function () {
    return function (string) {
      return string
        .split('')
        .map(function (character, i) {
          return i % 2 ? character.toUpperCase() : character.toLowerCase();
        }).join('')
    }
  })
  .controller('Main', function ($http) {
    var vm = this;

    $http
      .get('https://angularaddress.firebaseio.com/people.json')
      .success(function (data) {
        vm.people = data;
      });

    /*vm.people = [
      {name: 'Ben', twitter: '@ben123', phone: '6151113333'},
      {name: 'Dan', twitter: '@dandan', phone: '6151123333'},
      {name: 'Elsa', twitter: '@letitgo', phone: '6151114333'},
      {name: 'Amanda', twitter: '@princessamanda', phone: '6151113338'},
      {name: 'Charity', twitter: '@nonprofit', phone: '6151113533'}
    ];*/

    vm.newPerson = {};

    vm.addNewAddress = function () {
      $http
        .post('https://angularaddress.firebaseio.com/people.json', vm.newPerson)
        .success(function () {
          vm.people.push(vm.newPerson);
          vm.newPerson = {};
          $('#modal').modal('hide');
        });
    };

    vm.removeAddress = function (id) {
      $http
        .delete('https://angularaddress.firebaseio.com/people/${id}.json')
        .success(function () {
          delete vm.people[id]
        });
    };
  });
