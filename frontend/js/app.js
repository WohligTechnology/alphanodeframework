// JavaScript Document
var firstapp = angular.module('firstapp', [
    'ui.router',
    'phonecatControllers',
    'templateservicemod',
    'navigationservice',
    'pascalprecht.translate',
    'angulartics',
    'angulartics.google.analytics',
    'imageupload'
]);

firstapp.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
    // for http request with session
    $httpProvider.defaults.withCredentials = true;
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "views/template.html",
            controller: 'HomeCtrl'
        })
        .state('aboutus', {
            url: "/aboutus",
            templateUrl: "views/template.html",
            controller: 'AboutUsCtrl'
        })
        .state('events', {
            url: "/events",
            templateUrl: "views/template.html",
            controller: 'EventsCtrl'
        })
        .state('journey', {
            url: "/journey",
            templateUrl: "views/template.html",
            controller: 'JourneyCtrl'
        })
        .state('news-detail', {
            url: "/news-detail/:id",
            templateUrl: "views/template.html",
            controller: 'NewsDetailCtrl'
        })
        .state('certifications', {
            url: "/certifications",
            templateUrl: "views/template.html",
            controller: 'CertificationsCtrl'
        })
        .state('flexible', {
            url: "/flexible",
            templateUrl: "views/template.html",
            controller: 'FlexibleCtrl'
        })
        .state('quality-policy', {
            url: "/quality-policy",
            templateUrl: "views/template.html",
            controller: 'QualityPolicyCtrl'
        })
        .state('contact-us', {
            url: "/contact-us",
            templateUrl: "views/template.html",
            controller: 'ContactCtrl'
        })

        .state('emailcontactus', {
            url: "/contact-us",
            templateUrl: "views/template.html",
            controller: 'ContactCtrl'
        })

        .state('alpha', {
            url: "/alpha",
            templateUrl: "js/mail.js",
            controller: 'ContactCtrl'
        })
        .state('careers', {
            url: "/careers",
            templateUrl: "views/template.html",
            controller: 'CareersCtrl'
        })
        .state('news', {
            url: "/news",
            templateUrl: "views/template.html",
            controller: 'NewsCtrl'
        })
        .state('pet', {
            url: "/pet",
            templateUrl: "views/template.html",
            controller: 'PetBottlesCtrl'
        })
        .state('pof', {
            url: "/pof",
            templateUrl: "views/template.html",
            controller: 'PofShrinkFilmCtrl'
        })
        .state('bags-liners', {
            url: "/bags-liners",
            templateUrl: "views/template.html",
            controller: 'Bags-LinersCtrl'
        })
        .state('speciality-film', {
            url: "/speciality-film",
            templateUrl: "views/template.html",
            controller: 'Speciality-FilmCtrl'
        })
        .state('form', {
            url: "/form",
            templateUrl: "views/template.html",
            controller: 'FormCtrl'
        });
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(isproduction);
});





firstapp.directive('img', function ($compile, $parse) {
    return {
        restrict: 'E',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            if (!attrs.noloading) {
                $element.after("<img src='img/loading.gif' class='loading' />");
                var $loading = $element.next(".loading");
                $element.load(function () {
                    $loading.remove();
                    $(this).addClass("doneLoading");
                });
            } else {
                $($element).addClass("doneLoading");
            }
        }
    };

});

firstapp.directive('aplhaOnly', function() {
   return {
       require: 'ngModel',
       link: function(scope, element, attr, ngModelCtrl) {
           function fromUser(text) {
               var transformedInput = text.replace(/[^a-zA-Z\.\s]/g, '');
               if (transformedInput !== text) {
                   ngModelCtrl.$setViewValue(transformedInput);
                   ngModelCtrl.$render();
               }
               return transformedInput;
           }
           ngModelCtrl.$parsers.push(fromUser);
       }
   };
});
firstapp.directive('onlyDigits', function () {
    return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            var digits;

            function inputValue(val) {
                if (val) {
                    if (attr.type == "tel") {
                        digits = val.replace(/[^0-9\+\\]/g, '');
                    } else {
                        digits = val.replace(/[^0-9\-\\]/g, '');
                    }


                    if (digits !== val) {
                        ctrl.$setViewValue(digits);
                        ctrl.$render();
                    }
                    return parseInt(digits, 10);
                }
                return undefined;
            }
            ctrl.$parsers.push(inputValue);
        }
    };
})
firstapp.directive('fancyboxBox', function($document) {
    return {
        restrict: 'EA',
        replace: false,
        link: function(scope, element, attr) {
            var $element = $(element);
            var target;
            if (attr.rel) {
               target = $("[rel='" + attr.rel + "']");
            } else {
                target = element;
            }

            target.fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                closeBtn: true,

        galleryNavigation: 'keys',
                helpers: {
                    media: {}
                }
            });
        }
    };
});

firstapp.filter('uploadpath', function() {
    return function(input, width, height, style) {
        var other = "";
        if (width && width != "") {
            other += "&width=" + width;
        }
        if (height && height != "") {
            other += "&height=" + height;
        }
        if (style && style != "") {
            other += "&style=" + style;
        }
        if (input) {
            if (input.indexOf('https://') == -1) {
                return imgpath + "?file=" + input + other;
            } else {
                return input;
            }
        }
    };
});
firstapp.directive('imageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});


// firstapp.directive('uploadImage', function ($http, $filter) {
//   console.log("innnnn");
//   return {
//     templateUrl: 'views/directive/uploadFile.html',
//     scope: {
//       model: '=ngModel',
//       callback: '=ngCallback',
//       // mymodel: '=ngModel'
//
//     },
//     link: function ($scope, element, attrs) {
//       $scope.isMultiple = false;
//       $scope.inObject = false;
//       if (attrs.multiple || attrs.multiple === "") {
//         $scope.isMultiple = true;
//         $("#inputImage").attr("multiple", "ADD");
//       }
//       if (attrs.noView || attrs.noView === "") {
//         $scope.noShow = true;
//       }
//       if ($scope.model) {
//         if (_.isArray($scope.model)) {
//           $scope.image = [];
//           _.each($scope.model, function (n) {
//             $scope.image.push({
//               url: $filter("uploadpath")(n)
//             });
//           });
//         } else {
//           $scope.image = {};
//           $scope.image.url = $filter("uploadpath")($scope.model);
//         }
//
//       }
//       $scope.$watch("image", function (newVal, oldVal) {
//         if (newVal && newVal.file) {
//           $scope.upload(newVal);
//         }
//       });
//       if (attrs.inobj || attrs.inobj === "") {
//         $scope.inObject = true;
//       }
//       $scope.clearOld = function () {
//         $scope.model = [];
//       };
//       $scope.upload = function (image) {
//         var Template = this;
//         image.hide = true;
//         var formData = new FormData();
//         formData.append('file', image.file, image.name);
//         $http.post(uploadurl, formData, {
//           headers: {
//             'Content-Type': undefined
//           },
//           transformRequest: angular.identity
//         }).then(function (data) {
//             data=data.data;
//           console.log("success");
//           //  console.log(data);
//           if ($scope.callback) {
//             $scope.model = data.data[0];
//             if (data.value) {
//               $scope.callback(null, data);
//             } else {
//               $scope.callback('Not Uploaded', data);
//             }
//           } else {
//             if ($scope.isMultiple) {
//               if ($scope.inObject) {
//                 $scope.model.push({
//                   "image": data.data[0]
//                 });
//               } else {
//                 $scope.model.push(data.data[0]);
//               }
//             } else {
//               $scope.model = data.data[0];
//             }
//           }
//         });
//
//         //  } else {
//         //    console.log("Unsccessfull");
//         //    //  $scope.mymodel="Please upload only png or jpg image.";
//         //    //  console.log($scope.mymodel);
//         //    $scope.callback('Please upload only png or jpg image.', null);
//
//         //  }
//
//       };
//     }
//   };
// });

firstapp.directive('imageonload', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.bind('load', function () {
                scope.$apply(attrs.imageonload);
            });
        }
    };
});


firstapp.directive('uploadImage', function ($http, $filter, $timeout) {
    return {
        templateUrl: 'views/directive/uploadFile.html',
        scope: {
            model: '=ngModel',
            type: "@type",
            callback: "&ngCallback"
        },
        link: function ($scope, element, attrs) {
            $scope.showImage = function () {
                console.log($scope.image);
            };
            $scope.check = true;
            if (!$scope.type) {
                $scope.type = "image";
            }
            $scope.isMultiple = false;
            $scope.inObject = false;
            if (attrs.multiple || attrs.multiple === "") {
                $scope.isMultiple = true;
                $("#inputImage").attr("multiple", "ADD");
            }
            if (attrs.noView || attrs.noView === "") {
                $scope.noShow = true;
            }
            // if (attrs.required) {
            //     $scope.required = true;
            // } else {
            //     $scope.required = false;
            // }

            $scope.$watch("image", function (newVal, oldVal) {
                console.log(newVal, oldVal);
                isArr = _.isArray(newVal);
                if (!isArr && newVal && newVal.file) {
                    $scope.uploadNow(newVal);
                } else if (isArr && newVal.length > 0 && newVal[0].file) {

                    $timeout(function () {
                        console.log(oldVal, newVal);
                        console.log(newVal.length);
                        _.each(newVal, function (newV, key) {
                            if (newV && newV.file) {
                                $scope.uploadNow(newV);
                            }
                        });
                    }, 100);

                }
            });

            if ($scope.model) {
                if (_.isArray($scope.model)) {
                    $scope.image = [];
                    _.each($scope.model, function (n) {
                        $scope.image.push({
                            url: n
                        });
                    });
                } else {
                    if (_.endsWith($scope.model, ".pdf")) {
                        $scope.type = "pdf";
                    }
                }

            }
            if (attrs.inobj || attrs.inobj === "") {
                $scope.inObject = true;
            }
            $scope.clearOld = function () {
                $scope.model = [];
            };
            $scope.uploadNow = function (image) {
                $scope.uploadStatus = "uploading";
                var file;
                var Template = this;
                image.hide = true;
                var formData = new FormData();
                formData.append('file', image.file, image.name);
                $http.post(uploadurl, formData, {
                    headers: {
                        'Content-Type': undefined
                    },
                    transformRequest: angular.identity
                }).then(function (data) {
                    data=data.data;
                    file=data.data[0];
                    $scope.uploadStatus = "uploaded";
                    if ($scope.isMultiple) {

                        if ($scope.inObject) {
                            $scope.model.push({
                                "image": data[0]
                            });
                        } else {
                            if (!$scope.model) {
                                $scope.clearOld();
                            }
                            $scope.model.push(data[0]);
                        }
                    } else {
                        if (_.endsWith(data, ".pdf")) {
                            $scope.type = "pdf";
                        } else {
                            $scope.type = "img";
                        }
                        $scope.model = file;

                    }
                    $timeout(function () {
                        $scope.callback();
                    }, 100);

                });
            };
        }
    };
});
firstapp.directive('autoHeightfixed', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height() - 20;
            var addHeight = function () {
                $elemecontactnt.css("height", windowHeight);
            };
            addHeight();
        }
    };
});
firstapp.directive('autoHeight', function ($compile, $parse) {
    return {
        restrict: 'EA',
        replace: false,
        link: function ($scope, element, attrs) {
            var $element = $(element);
            var windowHeight = $(window).height();
            $element.css("min-height", windowHeight);
        }
    };
});



firstapp.config(function ($translateProvider) {
    $translateProvider.translations('en', LanguageEnglish);
    $translateProvider.translations('hi', LanguageHindi);
    $translateProvider.preferredLanguage('en');
});

// firstapp.directive("scrolladdclass", function ($window) {
//   return function (scope, element, attrs) {
//     angular.element($window).bind("scroll", function () {
//
//       var prev = 0;
//       var $window = $(window);
//       var nav = $('.footer');
//       var scrollTop = $(window).scrollTop();
//       nav.toggleClass('hidden', scrollTop > prev);
//       prev = scrollTop;
//     });
//   };
// });
