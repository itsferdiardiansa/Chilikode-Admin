webpackJsonp([1],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

// SCSS
// ------------------------------------------------------------------------

__webpack_require__(16);

// APP
// ------------------------------------------------------------------------

Promise.resolve().then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(2), __webpack_require__(3)]; (function(MainApp, joii) {
	'use strict';

	var App = joii.Class({ extends: MainApp }, {
		init: function() {
			var self = this;

			this.application.controller('login-controller', function($scope, $attrs, $http) {
				$scope.error      = void 0;
				$scope.processing = false;
				$scope.username   = '';
				$scope.password   = '';
				$scope.$form      = $attrs.$$element.find('form');

				$attrs.$$element.on('submit', 'form', function() {
					$scope.error      = void 0;
					$scope.processing = true;

					$scope.tryLogin();
					return false;
				});

				// ------------------------------------------------------------------------
				
				// Try login
				$scope.tryLogin = function() {
					$http.post(self.baseURL + 'login', {'username': $scope.username, 'password': $scope.password})
						 .then(function(res) {
						 	
							// console.log( res );
						 	var redirect = res.data.url || self.baseURL;
						 	window.location = redirect;
						 }, function(err) {
							$scope.error      = 'Invalid Username or Password';
							$scope.processing = false;
						 });
				};

				// Submit button click listener
				$scope.submit = function() {
					$scope.$form.submit();
				}
			});

			// Startup module
			// ------------------------------------------------------------------------
			
			this.application.run();
			angular.bootstrap(document.querySelector("html"), ["keepoApp"]);
		}
	});

	// ------------------------------------------------------------------------
	
	var loginApp = new App;
	loginApp.init();
}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(__webpack_require__.oe);



/***/ }),

/***/ 16:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(11);


/***/ })

},[43]);