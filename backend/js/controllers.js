var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', "jsonservicemod", 'ui.bootstrap', 'ui.select', 'ngAnimate', 'toastr', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'imageupload', 'ngMap', 'toggle-switch', 'cfp.hotkeys', 'ui.sortable'])

    .controller('DashboardCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("dashboard");
        $scope.menutitle = NavigationService.makeactive("Dashboard");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $state.go("page", {
            id: "viewEnquiry"
        });
    })


    .controller('AccessController', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        if ($.jStorage.get("accessToken")) {

        } else {
            $state.go("login");
        }
    })

    .controller('JagzCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $interval) {

        function toColor(num, red) {
            num >>>= 0;
            var b = num & 0xFF,
                g = (num & 0xFF00) >>> 8,
                r = (num & 0xFF0000) >>> 16,
                a = ((num & 0xFF000000) >>> 24) / 255;
            if (red == "red") {
                r = 255;
                b = 0;
                g = 0;
            }
            return "rgba(" + [r, g, b, a].join(",") + ")";
        }

        $scope.circles = _.times(360, function (n) {

            var radius = _.random(0, 10);
            return {
                width: radius,
                height: radius,
                background: toColor(_.random(-12525360, 12525360)),
                top: _.random(0, $(window).height()),
                left: _.random(0, $(window).width())
            };
        });

        function generateCircle() {
            _.each($scope.circles, function (n, index) {
                var radius = _.random(0, 10);
                n.width = radius;
                n.height = radius;
                n.background = toColor(_.random(-12525360, 12525360));
                if (count % 7 === 0 || count % 7 === 5 || count % 7 === 6) {
                    if (count % 7 === 6) {
                        n.background = toColor(_.random(-12525360, 12525360), "red");
                        // n.width = 3;
                        // n.height = 3;
                    }
                    var t = index * Math.PI / 180;
                    var x = (4.0 * Math.pow(Math.sin(t), 3));
                    var y = ((3.0 * Math.cos(t)) - (1.3 * Math.cos(2 * t)) - (0.6 * Math.cos(3 * t)) - (0.2 * Math.cos(4 * t)));
                    n.top = -50 * y + 300;
                    n.left = 50 * x + $(window).width() / 2;
                } else {
                    n.top = _.random(0, $(window).height());
                    n.left = _.random(0, $(window).width());
                }
            });
        }

        var count = 0;

        $interval(function () {
            count++;
            console.log("Version 1.1");
            generateCircle();
        }, 5000);

    })

    .controller('MultipleSelectCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, $filter, toastr) {
        var i = 0;
        $scope.getValues = function (filter, insertFirst) {
            var dataSend = {
                keyword: $scope.search.modelData,
                filter: filter,
                page: 1
            };
            if (dataSend.keyword === null || dataSend.keyword === undefined) {
                dataSend.keyword = "";
            }
            NavigationService[$scope.api]($scope.url, dataSend, ++i, function (data) {
                if (data.value) {
                    $scope.list = data.data.results;
                    if ($scope.search.modelData) {
                        $scope.showCreate = true;
                        _.each($scope.list, function (n) {
                            // if (n.name) {
                            if (_.lowerCase(n.name) == _.lowerCase($scope.search.modelData)) {
                                $scope.showCreate = false;
                                return 0;
                            }
                            // }else{
                            //     if (_.lowerCase(n.officeCode) == _.lowerCase($scope.search.modelData)) {
                            //       $scope.showCreate = false;
                            //       return 0;
                            //   }
                            // }

                        });
                    } else {
                        $scope.showCreate = false;

                    }
                    if (insertFirst) {
                        if ($scope.list[0] && $scope.list[0]._id) {
                            // if ($scope.list[0].name) {
                            $scope.sendData($scope.list[0]._id, $scope.list[0].name);
                            // }else{
                            //   $scope.sendData($scope.list[0]._id, $scope.list[0].officeCode);
                            // }
                        } else {
                            console.log("Making this happen");
                            // $scope.sendData(null, null);
                        }
                    }
                } else {
                    console.log("Making this happen2");
                    $scope.sendData(null, null);
                }


            });
        };

        $scope.$watch('model', function (newVal, oldVal) {
            if (newVal && oldVal === undefined) {
                $scope.getValues({
                    _id: $scope.model
                }, true);
            }
        });


        $scope.$watch('filter', function (newVal, oldVal) {
            var filter = {};
            if ($scope.filter) {
                filter = JSON.parse($scope.filter);
            }
            var dataSend = {
                keyword: $scope.search.modelData,
                filter: filter,
                page: 1
            };

            NavigationService[$scope.api](dataSend, ++i, function (data) {
                if (data.value) {
                    $scope.list = data.data.results;
                    $scope.showCreate = false;

                }
            });
        });


        $scope.search = {
            modelData: ""
        };
        if ($scope.model) {
            $scope.getValues({
                _id: $scope.model
            }, true);
        } else {
            $scope.getValues();
        }





        $scope.listview = false;
        $scope.showCreate = false;
        $scope.typeselect = "";
        $scope.showList = function () {
            $scope.listview = true;
            $scope.searchNew(true);
        };
        $scope.closeList = function () {
            $scope.listview = false;
        };
        $scope.closeListSlow = function () {
            $timeout(function () {
                $scope.closeList();
            }, 500);
        };
        $scope.searchNew = function (dontFlush) {
            if (!dontFlush) {
                $scope.model = "";
            }
            var filter = {};
            if ($scope.filter) {
                filter = JSON.parse($scope.filter);
            }
            $scope.getValues(filter);
        };
        $scope.createNew = function (create) {
            var newCreate = $filter("capitalize")(create);
            var data = {
                name: newCreate
            };
            if ($scope.filter) {
                data = _.assign(data, JSON.parse($scope.filter));
            }
            console.log(data);
            NavigationService[$scope.create](data, function (data) {
                if (data.value) {
                    toastr.success($scope.name + " Created Successfully", "Creation Success");
                    $scope.model = data.data._id;
                    $scope.ngName = data.data.name;
                } else {
                    toastr.error("Error while creating " + $scope.name, "Error");
                }
            });
            $scope.listview = false;
        };
        $scope.sendData = function (val, name) {
            $scope.search.modelData = name;
            $scope.ngName = name;
            $scope.model = val;
            $scope.listview = false;
        };
    })

    .controller('PageJsonCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal) {
        $scope.json = JsonService;
        $scope.template = TemplateService.changecontent("none");
        $scope.menutitle = NavigationService.makeactive("Country List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        JsonService.getJson($stateParams.id, function () {});

        globalfunction.confDel = function (callback) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/conf-delete.html',
                size: 'sm',
                scope: $scope
            });
            $scope.close = function (value) {
                callback(value);
                modalInstance.close("cancel");
            };
        };

        globalfunction.openModal = function (callback) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/modal.html',
                size: 'lg',
                scope: $scope
            });
            $scope.close = function (value) {
                callback(value);
                modalInstance.close("cancel");
            };
        };

        // globalfunction.confDel(function (value) {
        //     console.log(value);
        //     if (value) {
        //         NavigationService.apiCall(id, function (data) {
        //             if (data.value) {
        //                 $scope.showAllCountries();
        //                 toastr.success("Country deleted successfully.", "Country deleted");
        //             } else {
        //                 toastr.error("There was an error while deleting country", "Country deleting error");
        //             }
        //         });
        //     }
        // });

    })

    .controller('ViewCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams) {
        $scope.json = JsonService;
        $scope.template = TemplateService;
        var i = 0;
        if ($stateParams.page && !isNaN(parseInt($stateParams.page))) {
            $scope.currentPage = $stateParams.page;
        } else {
            $scope.currentPage = 1;
        }

        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.changePage = function (page) {
            var goTo = "page";
            if ($scope.search.keyword) {
                goTo = "page";
            }
            $state.go(goTo, {
                id: $stateParams.id,
                page: page,
                keyword: $scope.search.keyword
            });
        };

        $scope.getAllItems = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.search($scope.json.json.apiCall.url, {
                    page: $scope.currentPage,
                    keyword: $scope.search.keyword
                }, ++i,
                function (data, ini) {
                    if (ini == i) {
                        console.log(data);
                        $scope.items = data.data.results;
                        $scope.totalItems = data.data.total;
                        $scope.maxRow = data.data.options.count;
                    }
                });
        };
        JsonService.refreshView = $scope.getAllItems;
        $scope.getAllItems();

    })

    .controller('DetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, toastr) {
        $scope.json = JsonService;
        JsonService.setKeyword($stateParams.keyword);
        $scope.template = TemplateService;
        $scope.data = {};
        console.log("detail controller");
        console.log($scope.json);

        //  START FOR EDIT
        if ($scope.json.json.preApi) {

            NavigationService.apiCall($scope.json.json.preApi.url, {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                $scope.data = data.data;
                $scope.generateField = true;

            });
        } else {
            $scope.generateField = true;
        }
        //  END FOR EDIT

        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };

        $scope.saveData = function (formData) {
            console.log("in edit clicked");

            _.each($scope.json.json.fields, function (n) {
                if (n.type == "tags" && n.dropDownType == "multiple") {
                    console.log(formData[n.tableRef]);
                    $scope.newTags = [];
                    _.each(formData[n.tableRef], function (m) {
                        $scope.newTags.push(m._id);
                    })
                    console.log($scope.newTags);
                    formData[n.tableRef] = $scope.newTags;

                }
            })
            NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
                if (data.value === true) {
                    $scope.json.json.action[0].stateName.json.keyword = "";
                    $scope.json.json.action[0].stateName.json.page = "";
                    $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
                    var messText = "created";
                    if ($scope.json.keyword._id) {
                        messText = "edited";
                    }
                    toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
                } else {
                    var messText = "creating";
                    if ($scope.json.keyword._id) {
                        messText = "editing";
                    }
                    toastr.error("Failed " + messText + " " + $scope.json.json.name);
                }
            });
        };
    })

    .controller('DetailFieldCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal, toastr) {
        if (!$scope.type.type) {
            $scope.type.type = "text";
        }
        $scope.json = JsonService;
        $scope.tags = {};
        $scope.model = [];
        $scope.tagNgModel = {};
        // $scope.boxModel
        $scope.tinymceOptions = {
            selector: 'textarea',
            height: 500,
            theme: 'modern',
            plugins: [
                'advlist autolink lists link image charmap print preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu directionality',
                'emoticons template paste textcolor colorpicker textpattern imagetools '
            ],
            toolbar1: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
            toolbar2: 'print preview media | forecolor backcolor emoticons',
            image_advtab: true,
            readonly: $scope.type.disabled,
            templates: [{
                title: 'Test template 1',
                content: 'Test 1'
            }, {
                title: 'Test template 2',
                content: 'Test 2'
            }],
            content_css: [
                '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
                '//www.tinymce.com/css/codepen.min.css'
            ]
        };
        if ($scope.type.validation) {
            var isRequired = _.findIndex($scope.type.validation, function (n) {
                return n == "required";
            });
            if (isRequired >= 0) {
                $scope.type.required = true;
            }
        }
        $scope.form = {};
        if ($scope.value && $scope.value[$scope.type.tableRef]) {
            $scope.form.model = $scope.value[$scope.type.tableRef];
        }

        $scope.template = "views/field/" + $scope.type.type + ".html";

        // BOX
        if ($scope.type.type == "date") {
            $scope.formData[$scope.type.tableRef] = moment($scope.formData[$scope.type.tableRef]).toDate();
        }
        if ($scope.type.type == "password") {
            $scope.formData[$scope.type.tableRef] = "";
        }
        if ($scope.type.type == "youtube") {
            $scope.youtube = {};

            function getJsonFromUrl(string) {
                var obj = _.split(string, '?');
                var returnval = {};
                if (obj.length >= 2) {
                    obj = _.split(obj[1], '&');
                    _.each(obj, function (n) {
                        var newn = _.split(n, "=");
                        returnval[newn[0]] = newn[1];
                        return;
                    });
                    return returnval;
                }

            }
            $scope.changeYoutubeUrl = function (string) {
                if (string) {
                    $scope.formData[$scope.type.tableRef] = "";
                    var result = getJsonFromUrl(string);
                    console.log(result);
                    if (result && result.v) {
                        $scope.formData[$scope.type.tableRef] = result.v;
                    }
                }

            };
        }
        if ($scope.type.type == "box") {

            if (!_.isArray($scope.formData[$scope.type.tableRef]) && $scope.formData[$scope.type.tableRef] === '') {
                $scope.formData[$scope.type.tableRef] = [];
                $scope.model = [];
            } else {
                if ($scope.formData[$scope.type.tableRef]) {
                    $scope.model = $scope.formData[$scope.type.tableRef];
                }
            }
            $scope.search = {
                text: ""
            };
        }
        $scope.state = "";
        $scope.createBox = function (state) {
            $scope.state = state;
            $scope.model.push({});
            $scope.editBox("Create", $scope.model[$scope.model.length - 1]);
        };
        $scope.editBox = function (state, data) {
            $scope.state = state;
            $scope.data = data;
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/modal.html',
                size: 'lg',
                scope: $scope
            });
            $scope.close = function (value) {
                callback(value);
                modalInstance.close("cancel");
            };
        };
        $scope.deleteBox = function (index, data) {
            console.log(data);
            data.splice(index, 1);
        };

        //  TAGS STATIC AND FROM TABLE
        $scope.refreshTags = function (search) {
            if ($scope.type.url !== "") {
                NavigationService.searchCall($scope.type.url, {
                    keyword: search
                }, 1, function (data1) {
                    $scope.tags[$scope.type.tableRef] = data1.data.results;
                });
            } else {
                $scope.tags[$scope.type.tableRef] = $scope.type.dropDown;
            }
        };
        if ($scope.type.type == "tags") {
            $scope.refreshTags();
        }

        $scope.tagClicked = function (select, index) {
            console.log("tag clicked");
            if ($scope.type.fieldType === "array") {
                $scope.formData[$scope.type.tableRef] = [];
                _.each(select, function (n) {
                    $scope.formData[$scope.type.tableRef].push(n._id);
                });
            } else {
                $scope.formData[$scope.type.tableRef] = select;
            }
        };
    })
    .controller('CustomStatePageJsonCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal) {
        //$scope.json = JsonService;
        $scope.template = TemplateService.changecontent("none");
        $scope.menutitle = NavigationService.makeactive("Country List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        console.log("IN CUSTOM PAGE CTRLLER");
        console.log("CUSTOM JSONSERVICE START get");
        console.log("CUSTOM-------->", $stateParams.id);
        JsonService.getJson($stateParams.id, function () {});

        console.log("CUSTOM JSONSERVICE END get");
        globalfunction.confDel = function (callback) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/conf-delete.html',
                size: 'sm',
                scope: $scope
            });
            $scope.close = function (value) {
                callback(value);
                modalInstance.close("cancel");
            };
        };

        globalfunction.openModal = function (callback) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/modal.html',
                size: 'lg',
                scope: $scope
            });
            $scope.close = function (value) {
                callback(value);
                modalInstance.close("cancel");
            };
        };

        // globalfunction.confDel(function (value) {
        //     console.log(value);
        //     if (value) {
        //         NavigationService.apiCall(id, function (data) {
        //             if (data.value) {
        //                 $scope.showAllCountries();
        //                 toastr.success("Country deleted successfully.", "Country deleted");
        //             } else {
        //                 toastr.error("There was an error while deleting country", "Country deleting error");
        //             }
        //         });
        //     }
        // });

    })

    //products.............

    .controller('ProductsDetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal, toastr) {
        $scope.json = JsonService;
        JsonService.setKeyword($stateParams.keyword);
        $scope.template = TemplateService;
        $scope.data = {};
        $scope.formdata = {};
        console.log("IN PROJECT controller");
        console.log("SCOPE JSON", $scope.json);
        $scope.tableData = {};
        $scope.stateData = {};
        $scope.projectDATA = {};
        $scope.stateName = [];
        $scope.stateIds = [];
        $scope.STATE;

        $scope.projectID = {};


        $scope.findProducts = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("Products/findOneProducts", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                if (data.value) {
                    // var mydata = _.cloneDeep(data.data);
                    // console.log('mydatatttttttttttt',mydata);
                    $scope.projectDATA = data.data;
                    $scope.tableData = data.data;
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                } else {
                    $scope.projectDATA = {};
                    $scope.tableData = {};
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                }
            });

            // NavigationService.apiCall("Products/findOneTestimonial", {
            //     [$scope.json.json.preApi.params]: $scope.json.keyword._id
            // }, function (data) {
            //     if (data.value) {
            //         // var mydata = _.cloneDeep(data.data);
            //         // console.log('mydatatttttttttttt',mydata);
            //         $scope.projectDATA = data.data;
            //         $scope.tableData = data.data;
            //         $scope.generateField = true;
            //         console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
            //     } else {
            //         $scope.projectDATA = {};
            //         $scope.tableData = {};
            //         $scope.generateField = true;
            //         console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
            //     }
            // });
            //$scope.findTestimonial();
        }



        $scope.findProducts();
        // $scope.findState();
        //  START FOR EDIT
        if ($scope.json.json.preApi) {

            NavigationService.apiCall($scope.json.json.preApi.url, {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                $scope.data = data.data;
                $scope.generateField = true;
                console.log("DATA IS FOUND HERE-->", $scope.data);

            });
        } else {
            $scope.generateField = true;
        }


        //  END FOR EDIT

        $scope.editBoxCustomProductsPhotos = function (data) {

            console.log("DATADATA", data);
            $scope.datainfo = data;
            $scope.newinfo = {};
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-products.html',
                size: 'lg',
                scope: $scope,

            });
        };

        //update gallery
        $scope.saveEditGalleryPhotos = function (image1, image2, id, old1, old2) {
            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            var data1 = {};
            data1._id = id;
            data1.photo1 = image1;
            data1.photo2 = image2;
            data1.old = old1;
            data1.old1 = old2;
            $scope.newinfo = {};

            NavigationService.boxCall("Products/updateGalleryPhotos", data1, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success("Gallery" + " " + "updated" + " successfully.");
            })

        };

        $scope.editBoxInstitute = function () {


            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/institute-edit-detail.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };

        $scope.addBoxProductsImage = function (data) {
            console.log("DATADATA", data);

            $scope.projectinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-products.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };


        $scope.saveProductsPhotos = function (value) {
            console.log("DATA", value);
            // console.log("INSIDE SPP");
            NavigationService.boxCall("Products/saveProductsPhotos", value, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(value.name + " Gallery" + " " + "added" + " successfully.");
            })

        };

        $scope.saveEditProductsPhotos = function (value) {
            console.log("DATA", value);
            NavigationService.boxCall("Products/save", value, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProject();
                toastr.success(" Gallery" + " " + "updated" + " successfully.");
            })

        };

        $scope.removeProductsPhotos = function (value, value1, project) {

            var abc = {};

            abc._id = project;
            abc.images = value;
            abc.thumbimages = value1;
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);
            NavigationService.boxCall("Products/removeProductsPhotos", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findProducts();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        $scope.saveData = function (formData) {
            console.log("in save");
            delete formData.testimonial;
            delete formData.gallery;
            console.log("ABC", formData);
            // console.log("PIC",formData.photos[0].photo);
            NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
                if (data.value === true) {
                    $scope.json.json.action[0].stateName.json.keyword = "";
                    $scope.json.json.action[0].stateName.json.page = "";
                    $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
                    var messText = "created";
                    if ($scope.json.keyword._id) {
                        messText = "edited";
                    }
                    toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
                } else {
                    var messText = "creating";
                    if ($scope.json.keyword._id) {
                        messText = "editing";
                    }
                    toastr.error("Failed " + messText + " " + $scope.json.json.name);
                }
            });
        };

        //testimonial

        $scope.findTestimonial = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("Products/findOneTestimonial", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                // var mydata = _.cloneDeep(data.data);
                // console.log('mydatatttttttttttt',mydata);
                $scope.projectDATA = data.data;
                $scope.tableData = data.data;
                $scope.generateField = true;
                console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
            });
        }



        // $scope.findProducts();
        // $scope.findState();
        // //  START FOR EDIT
        // if ($scope.json.json.preApi) {

        //     NavigationService.apiCall($scope.json.json.preApi.url, {
        //         [$scope.json.json.preApi.params]: $scope.json.keyword._id
        //     }, function (data) {
        //         $scope.data = data.data;
        //         $scope.generateField = true;
        //         console.log("DATA IS FOUND HERE-->", $scope.data);

        //     });
        // } else {
        //     $scope.generateField = true;
        // }


        $scope.editBoxCustomTestimonial = function (data) {

            console.log("DATADATA", data);

            $scope.status = ["true", "false"];
            $scope.datainfo = data;
            $scope.newinfo = {
                _id: $scope.json.keyword._id,
                testi_id: data
            };


            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-testimonial.html',
                size: 'lg',
                scope: $scope,

            });
        };

        //testimonial saveedit

        $scope.saveEditTestimonial = function (id, name, cname, city, content, order, status) {
            //console.log("DATA", result);
            newinfo = {};
            newinfo._id = $scope.json.keyword._id,
                newinfo.testi_id = id;
            newinfo.name = name;
            newinfo.cname = cname;
            newinfo.city = city;
            newinfo.content = content;
            newinfo.order = order;
            newinfo.status = status;

            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            // var data1 = {};
            // data1.name = result.name;
            // data1.content = result.content;
            // data1.order = result.order;
            // data1.status = result.status;
            // $scope.newinfo = {};

            NavigationService.boxCall("Products/updateTestimonial", newinfo, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findTestimonial();
                toastr.success(" Testimonial" + " " + "updated" + " successfully.");
            })

        };

        //testimonial all

        // $scope.editBoxInstitute = function () {


        //     var modalInstance = $uibModal.open({
        //         animation: $scope.animationsEnabled,
        //         templateUrl: '/backend/views/modal/institute-edit-detail.html',
        //         size: 'lg',
        //         scope: $scope,
        //         tableData: $scope.tableData
        //     });
        // };

        $scope.addBoxTestimonial = function (data) {
            console.log("DATADATA", data);
            $scope.status = ["true", "false"];
            $scope.newtestimonialinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-testimonial.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };


        $scope.saveTestimonial = function (id, name, cname, city, content, order, status) {
            // console.log("DATA", value);

            console.log("DATA", name);
            console.log("DATA", content);
            console.log("DATA", order);
            console.log("DATA", status);
            testiData = {};
            testiData.name = name;
            testiData.cname = cname;
            testiData.city = city;
            testiData._id = id;
            testiData.content = content;
            testiData.order = order;
            testiData.status = status;

            console.log("INSIDE SPP");
            NavigationService.boxCall("Products/saveTestimonial", testiData, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findTestimonial();
                toastr.success(value.name + " testimonial" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeShrinkTestimonial = function (value, project) {

            var abc = {};
            console.log("value = ", value)
            abc._id = project;
            abc.testid = value
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("ShrinkFilm/removeShrinkTestimonial", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findTestimonial();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        // $scope.saveData = function (formData) {
        //         console.log("in save");
        //         console.log("ABC", formData);
        //         // console.log("PIC",formData.photos[0].photo);
        //         NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
        //                 if (data.value === true) {
        //                     $scope.json.json.action[0].stateName.json.keyword = "";
        //                     $scope.json.json.action[0].stateName.json.page = "";
        //                     $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
        //                     var messText = "created";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "edited";
        //                     }
        //                     toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
        //                 } else {
        //                     var messText = "creating";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "editing";
        //                     }
        //                     toastr.error("Failed " + messText + " " + $scope.json.json.name);
        //                 }

    })

    //shrinkcontroller.......................................................................

    .controller('ShrinkDetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal, toastr) {
        $scope.json = JsonService;
        JsonService.setKeyword($stateParams.keyword);
        $scope.template = TemplateService;
        $scope.data = {};
        $scope.formdata = {};
        console.log("IN PROJECT controller");
        console.log("SCOPE JSON", $scope.json);
        $scope.tableData = {};
        $scope.stateData = {};
        $scope.projectDATA = {};
        $scope.stateName = [];
        $scope.stateIds = [];
        $scope.STATE;

        $scope.projectID = {};


        $scope.findProducts = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("ShrinkFilm/findOneShrink", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                if (data.value) {
                    // var mydata = _.cloneDeep(data.data);
                    // console.log('mydatatttttttttttt',mydata);
                    $scope.projectDATA = data.data;
                    $scope.tableData = data.data;
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                } else {
                    $scope.projectDATA = {};
                    $scope.tableData = {};
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                }
            });
        }



        $scope.findProducts();
        // $scope.findState();
        //  START FOR EDIT
        if ($scope.json.json.preApi) {

            NavigationService.apiCall($scope.json.json.preApi.url, {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                $scope.data = data.data;
                $scope.generateField = true;
                console.log("DATA IS FOUND HERE-->", $scope.data);

            });
        } else {
            $scope.generateField = true;
        }


        //  END FOR EDIT
        $scope.editBoxCustomShrinkPhotos = function (data) {

            console.log("DATADATA", data);
            $scope.datainfo = data;
            $scope.newinfo = {};
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-shrink.html',
                size: 'lg',
                scope: $scope,

            });
        };

        $scope.saveEditShrinkGalleryPhotos = function (image1, image2, id, old1, old2) {
            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            var data1 = {};
            data1._id = id;
            data1.photo1 = image1;
            data1.photo2 = image2;
            data1.old = old1;
            data1.old1 = old2;
            $scope.newinfo = {};

            NavigationService.boxCall("ShrinkFilm/updateShrinkGalleryPhotos", data1, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success("Gallery" + " " + "updated" + " successfully.");
            })

        };

        $scope.addBoxShrinkImage = function (data) {
            console.log("DATADATA", data);

            $scope.projectinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-shrink.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };

        $scope.saveShrinkPhotos = function (value) {
            console.log("DATA", value);
            // console.log("INSIDE SPP");
            NavigationService.boxCall("ShrinkFilm/saveShrinkPhotos", value, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(value.name + " Gallery" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeShrinkPhotos = function (value, value1, project) {

            var abc = {};

            abc._id = project;
            abc.images = value;
            abc.thumbimages = value1;
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("ShrinkFilm/removeShrinkPhotos", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findProducts();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        $scope.saveData = function (formData) {
            console.log("in save");
            delete formData.testimonial;
            delete formData.gallery;
            console.log("ABC", formData);
            // console.log("PIC",formData.photos[0].photo);
            NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
                if (data.value === true) {
                    $scope.json.json.action[0].stateName.json.keyword = "";
                    $scope.json.json.action[0].stateName.json.page = "";
                    $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
                    var messText = "created";
                    if ($scope.json.keyword._id) {
                        messText = "edited";
                    }
                    toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
                } else {
                    var messText = "creating";
                    if ($scope.json.keyword._id) {
                        messText = "editing";
                    }
                    toastr.error("Failed " + messText + " " + $scope.json.json.name);
                }
            });
        };

        //testimonial

        $scope.findTestimonial = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("ShrinkFilm/findOneShrinkTestimonial", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                // var mydata = _.cloneDeep(data.data);
                // console.log('mydatatttttttttttt',mydata);
                $scope.projectDATA = data.data;
                $scope.tableData = data.data;
                $scope.generateField = true;
                console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
            });
        }



        // $scope.findProducts();
        // $scope.findState();
        // //  START FOR EDIT
        // if ($scope.json.json.preApi) {

        //     NavigationService.apiCall($scope.json.json.preApi.url, {
        //         [$scope.json.json.preApi.params]: $scope.json.keyword._id
        //     }, function (data) {
        //         $scope.data = data.data;
        //         $scope.generateField = true;
        //         console.log("DATA IS FOUND HERE-->", $scope.data);

        //     });
        // } else {
        //     $scope.generateField = true;
        // }


        $scope.editBoxCustomShrinkTestimonial = function (data) {

            console.log("DATADATA", data);

            $scope.status = ["true", "false"];
            $scope.datainfo = data;
            $scope.newinfo = {
                _id: $scope.json.keyword._id,
                testi_id: data
            };


            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-shrinktestimonial.html',
                size: 'lg',
                scope: $scope,

            });
        };

        //testimonial saveedit

        $scope.saveEditShrinkTestimonial = function (id, name, cname, city, content, order, status) {
            //console.log("DATA", result);
            newinfo = {};
            newinfo._id = $scope.json.keyword._id,
                newinfo.testi_id = id;
            newinfo.name = name;
            newinfo.cname = cname;
            newinfo.city = city;
            newinfo.content = content;
            newinfo.order = order;
            newinfo.status = status;

            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            // var data1 = {};
            // data1.name = result.name;
            // data1.content = result.content;
            // data1.order = result.order;
            // data1.status = result.status;
            // $scope.newinfo = {};

            NavigationService.boxCall("ShrinkFilm/updateShrinkTestimonial", newinfo, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findTestimonial();
                toastr.success(" Testimonial" + " " + "updated" + " successfully.");
            })

        };

        //testimonial all

        // $scope.editBoxInstitute = function () {


        //     var modalInstance = $uibModal.open({
        //         animation: $scope.animationsEnabled,
        //         templateUrl: '/backend/views/modal/institute-edit-detail.html',
        //         size: 'lg',
        //         scope: $scope,
        //         tableData: $scope.tableData
        //     });
        // };

        $scope.addBoxShrinkTestimonial = function (data) {
            console.log("DATADATA", data);
            $scope.status = ["true", "false"];
            $scope.newtestimonialinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-shrinktestimonial.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };


        $scope.saveShrinkTestimonial = function (id, name, cname, city, content, order, status) {
            // console.log("DATA", value);

            console.log("DATA", name);
            console.log("DATA", content);
            console.log("DATA", order);
            console.log("DATA", status);
            testiData = {};
            testiData.name = name;
            testiData.cname = cname;
            testiData.city = city;
            testiData._id = id;
            testiData.content = content;
            testiData.order = order;
            testiData.status = status;

            console.log("INSIDE SPP");
            NavigationService.boxCall("ShrinkFilm/saveShrinkTestimonial", testiData, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findTestimonial();
                toastr.success(value.name + " testimonial" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeShrinkTestimonial = function (value, project) {

            var abc = {};
            console.log("value = ", value)
            abc._id = project;
            abc.testid = value
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("ShrinkFilm/removeShrinkTestimonial", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findTestimonial();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        // $scope.saveData = function (formData) {
        //         console.log("in save");
        //         console.log("ABC", formData);
        //         // console.log("PIC",formData.photos[0].photo);
        //         NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
        //                 if (data.value === true) {
        //                     $scope.json.json.action[0].stateName.json.keyword = "";
        //                     $scope.json.json.action[0].stateName.json.page = "";
        //                     $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
        //                     var messText = "created";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "edited";
        //                     }
        //                     toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
        //                 } else {
        //                     var messText = "creating";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "editing";
        //                     }
        //                     toastr.error("Failed " + messText + " " + $scope.json.json.name);
        //                 }


    })

    //bottleController..........................................................................

    .controller('BottlesDetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal, toastr) {
        $scope.json = JsonService;
        JsonService.setKeyword($stateParams.keyword);
        $scope.template = TemplateService;
        $scope.data = {};
        $scope.formdata = {};
        console.log("IN PROJECT controller");
        console.log("SCOPE JSON", $scope.json);
        $scope.tableData = {};
        $scope.stateData = {};
        $scope.projectDATA = {};
        $scope.stateName = [];
        $scope.stateIds = [];
        $scope.STATE;

        $scope.projectID = {};


        $scope.findProducts = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("Bottles/findOneBottles", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                if (data.value) {
                    // var mydata = _.cloneDeep(data.data);
                    // console.log('mydatatttttttttttt',mydata);
                    $scope.projectDATA = data.data;
                    $scope.tableData = data.data;
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                } else {
                    $scope.projectDATA = {};
                    $scope.tableData = {};
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                }
            });
        }



        $scope.findProducts();
        // $scope.findState();
        //  START FOR EDIT
        if ($scope.json.json.preApi) {

            NavigationService.apiCall($scope.json.json.preApi.url, {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                $scope.data = data.data;
                $scope.generateField = true;
                console.log("DATA IS FOUND HERE-->", $scope.data);

            });
        } else {
            $scope.generateField = true;
        }


        //  END FOR EDIT
        $scope.editBoxCustomBottlesPhotos = function (data) {

            console.log("DATADATA", data);
            $scope.datainfo = data;
            $scope.newinfo = {};
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-bottles.html',
                size: 'lg',
                scope: $scope,

            });
        };

        $scope.saveEditBottlesGalleryPhotos = function (image1, image2, id, old1, old2) {
            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            var data1 = {};
            data1._id = id;
            data1.photo1 = image1;
            data1.photo2 = image2;
            data1.old = old1;
            data1.old1 = old2;
            $scope.newinfo = {};

            NavigationService.boxCall("Bottles/updateBottlesGalleryPhotos", data1, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success("Gallery" + " " + "updated" + " successfully.");
            })

        };

        $scope.addBoxBottlesImage = function (data) {
            console.log("DATADATA", data);

            $scope.projectinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-bottles.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };

        $scope.saveBottlesPhotos = function (value) {
            console.log("DATA", value);
            // console.log("INSIDE SPP");
            NavigationService.boxCall("Bottles/saveBottlesPhotos", value, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(value.name + " Gallery" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeBottlesPhotos = function (value, value1, project) {

            var abc = {};

            abc._id = project;
            abc.images = value;
            abc.thumbimages = value1;
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("Bottles/removeBottlesPhotos", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findProducts();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        $scope.saveData = function (formData) {
            console.log("in save");
            delete formData.testimonial;
            delete formData.gallery;
            console.log("ABC", formData);
            // console.log("PIC",formData.photos[0].photo);
            NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
                if (data.value === true) {
                    $scope.json.json.action[0].stateName.json.keyword = "";
                    $scope.json.json.action[0].stateName.json.page = "";
                    $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
                    var messText = "created";
                    if ($scope.json.keyword._id) {
                        messText = "edited";
                    }
                    toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
                } else {
                    var messText = "creating";
                    if ($scope.json.keyword._id) {
                        messText = "editing";
                    }
                    toastr.error("Failed " + messText + " " + $scope.json.json.name);
                }
            });
        };

        //testimonial

        $scope.findTestimonial = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("Bottles/findOneBottlesTestimonial", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                // var mydata = _.cloneDeep(data.data);
                // console.log('mydatatttttttttttt',mydata);
                $scope.projectDATA = data.data;
                $scope.tableData = data.data;
                $scope.generateField = true;
                console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
            });
        }



        // $scope.findProducts();
        // $scope.findState();
        // //  START FOR EDIT
        // if ($scope.json.json.preApi) {

        //     NavigationService.apiCall($scope.json.json.preApi.url, {
        //         [$scope.json.json.preApi.params]: $scope.json.keyword._id
        //     }, function (data) {
        //         $scope.data = data.data;
        //         $scope.generateField = true;
        //         console.log("DATA IS FOUND HERE-->", $scope.data);

        //     });
        // } else {
        //     $scope.generateField = true;
        // }


        $scope.editBoxCustomBottlesTestimonial = function (data) {

            console.log("DATADATA", data);

            $scope.status = ["true", "false"];
            $scope.datainfo = data;
            $scope.newinfo = {
                _id: $scope.json.keyword._id,
                testi_id: data
            };


            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-bottlestestimonial.html',
                size: 'lg',
                scope: $scope,

            });
        };

        //testimonial saveedit

        $scope.saveEditBottlesTestimonial = function (id, name, cname, city, content, order, status) {
            //console.log("DATA", result);
            newinfo = {};
            newinfo._id = $scope.json.keyword._id,
                newinfo.testi_id = id;
            newinfo.name = name;
            newinfo.cname = cname;
            newinfo.city = city;
            newinfo.content = content;
            newinfo.order = order;
            newinfo.status = status;

            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            // var data1 = {};
            // data1.name = result.name;
            // data1.content = result.content;
            // data1.order = result.order;
            // data1.status = result.status;
            // $scope.newinfo = {};

            NavigationService.boxCall("Bottles/updateBottlesTestimonial", newinfo, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findTestimonial();
                toastr.success(" Testimonial" + " " + "updated" + " successfully.");
            })

        };

        //testimonial all

        // $scope.editBoxInstitute = function () {


        //     var modalInstance = $uibModal.open({
        //         animation: $scope.animationsEnabled,
        //         templateUrl: '/backend/views/modal/institute-edit-detail.html',
        //         size: 'lg',
        //         scope: $scope,
        //         tableData: $scope.tableData
        //     });
        // };

        $scope.addBoxBottlesTestimonial = function (data) {
            console.log("DATADATA", data);
            $scope.status = ["true", "false"];
            $scope.newtestimonialinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-bottlestestimonial.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };


        $scope.saveBottlesTestimonial = function (id, name, cname, city, content, order, status) {
            // console.log("DATA", value);

            console.log("DATA", name);
            console.log("DATA", content);
            console.log("DATA", order);
            console.log("DATA", status);
            testiData = {};
            testiData.name = name;
            testiData.cname = cname;
            testiData.city = city;
            testiData._id = id;
            testiData.content = content;
            testiData.order = order;
            testiData.status = status;

            console.log("INSIDE SPP");
            NavigationService.boxCall("Bottles/saveBottlesTestimonial", testiData, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findTestimonial();
                toastr.success(value.name + " testimonial" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeBottlesTestimonial = function (value, project) {

            var abc = {};
            console.log("value = ", value)
            abc._id = project;
            abc.testid = value
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("Bottles/removeBottlesTestimonial", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findTestimonial();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        // $scope.saveData = function (formData) {
        //         console.log("in save");
        //         console.log("ABC", formData);
        //         // console.log("PIC",formData.photos[0].photo);
        //         NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
        //                 if (data.value === true) {
        //                     $scope.json.json.action[0].stateName.json.keyword = "";
        //                     $scope.json.json.action[0].stateName.json.page = "";
        //                     $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
        //                     var messText = "created";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "edited";
        //                     }
        //                     toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
        //                 } else {
        //                     var messText = "creating";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "editing";
        //                     }
        //                     toastr.error("Failed " + messText + " " + $scope.json.json.name);
        //                 }


    })

    //Collation............................................................................

    .controller('CollationDetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal, toastr) {
        $scope.json = JsonService;
        JsonService.setKeyword($stateParams.keyword);
        $scope.template = TemplateService;
        $scope.data = {};
        $scope.formdata = {};
        console.log("IN PROJECT controller");
        console.log("SCOPE JSON", $scope.json);
        $scope.tableData = {};
        $scope.stateData = {};
        $scope.projectDATA = {};
        $scope.stateName = [];
        $scope.stateIds = [];
        $scope.STATE;
        $scope.wohlig = "SUCCESS!!!";
        $scope.projectID = {};


        $scope.findProducts = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("Collation/findOneCollationTestimonial", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                if (data.value) {
                    // var mydata = _.cloneDeep(data.data);
                    // console.log('mydatatttttttttttt',mydata);
                    $scope.projectDATA = data.data;
                    $scope.tableData = data.data;
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                } else {
                    $scope.projectDATA = {};
                    $scope.tableData = {};
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                }
            });
        }



        $scope.findProducts();
        // $scope.findState();
        //  START FOR EDIT
        if ($scope.json.json.preApi) {

            NavigationService.apiCall($scope.json.json.preApi.url, {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                $scope.data = data.data;
                $scope.generateField = true;
                console.log("DATA IS FOUND HERE-->", $scope.data);

            });
        } else {
            $scope.generateField = true;
        }


        //  END FOR EDIT
        $scope.editBoxCustomCollationPhotos = function (data) {

            console.log("DATADATA", data);
            $scope.datainfo = data;
            $scope.newinfo = {};
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-collation.html',
                size: 'lg',
                scope: $scope,

            });
        };

        $scope.saveEditCollationGalleryPhotos = function (image1, image2, id, old1, old2) {
            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            var data1 = {};
            data1._id = id;
            data1.photo1 = image1;
            data1.photo2 = image2;
            data1.old = old1;
            data1.old1 = old2;
            $scope.newinfo = {};

            NavigationService.boxCall("Collation/updateCollationGalleryPhotos", data1, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success("Gallery" + " " + "updated" + " successfully.");
            })

        };

        $scope.addBoxCollationImage = function (data) {
            console.log("DATADATA", data);

            $scope.projectinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-collation.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };

        $scope.saveCollationPhotos = function (value) {
            console.log("DATA", value);
            // console.log("INSIDE SPP");
            NavigationService.boxCall("Collation/saveCollationPhotos", value, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(value.name + " Gallery" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeCollationPhotos = function (value, value1, project) {

            var abc = {};

            abc._id = project;
            abc.images = value;
            abc.thumbimages = value1;
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("Collation/removeCollationPhotos", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findProducts();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        $scope.saveData = function (formData) {
            console.log("in save");
            delete formData.testimonial;
            delete formData.gallery;
            console.log("ABC", formData);
            // console.log("PIC",formData.photos[0].photo);
            NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
                if (data.value === true) {
                    $scope.json.json.action[0].stateName.json.keyword = "";
                    $scope.json.json.action[0].stateName.json.page = "";
                    $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
                    var messText = "created";
                    if ($scope.json.keyword._id) {
                        messText = "edited";
                    }
                    toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
                } else {
                    var messText = "creating";
                    if ($scope.json.keyword._id) {
                        messText = "editing";
                    }
                    toastr.error("Failed " + messText + " " + $scope.json.json.name);
                }
            });
        };

        //testimonial

        // $scope.findTestimonial = function () {
        //     console.log('datttttttta1111');
        //     NavigationService.apiCall("Collation/findOneCollationTestimonial", {
        //         [$scope.json.json.preApi.params]: $scope.json.keyword._id
        //     }, function (data) {
        //         // var mydata = _.cloneDeep(data.data);
        //         // console.log('mydatatttttttttttt',mydata);
        //         $scope.projectDATA = data.data;
        //         $scope.tableData = data.data;
        //         $scope.generateField = true;
        //         console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
        //     });
        // }



        // $scope.findProducts();
        // $scope.findState();
        // //  START FOR EDIT
        // if ($scope.json.json.preApi) {

        //     NavigationService.apiCall($scope.json.json.preApi.url, {
        //         [$scope.json.json.preApi.params]: $scope.json.keyword._id
        //     }, function (data) {
        //         $scope.data = data.data;
        //         $scope.generateField = true;
        //         console.log("DATA IS FOUND HERE-->", $scope.data);

        //     });
        // } else {
        //     $scope.generateField = true;
        // }


        $scope.editBoxCustomCollationTestimonial = function (data) {

            console.log("DATADATA", data);

            $scope.status = ["true", "false"];
            $scope.datainfo = data;
            $scope.newinfo = {
                _id: $scope.json.keyword._id,
                testi_id: data
            };


            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-collationtestimonial.html',
                size: 'lg',
                scope: $scope,

            });
        };

        //testimonial saveedit

        $scope.saveEditCollationTestimonial = function (id, name, cname, city, content, order, status) {
            //console.log("DATA", result);
            newinfo = {};
            newinfo._id = $scope.json.keyword._id,
                newinfo.testi_id = id;
            newinfo.name = name;
            newinfo.cname = cname;
            newinfo.city = city;
            newinfo.content = content;
            newinfo.order = order;
            newinfo.status = status;

            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            // var data1 = {};
            // data1.name = result.name;
            // data1.content = result.content;
            // data1.order = result.order;
            // data1.status = result.status;
            // $scope.newinfo = {};

            NavigationService.boxCall("Collation/updateCollationTestimonial", newinfo, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(" Testimonial" + " " + "updated" + " successfully.");
            })

        };

        //testimonial all

        // $scope.editBoxInstitute = function () {


        //     var modalInstance = $uibModal.open({
        //         animation: $scope.animationsEnabled,
        //         templateUrl: '/backend/views/modal/institute-edit-detail.html',
        //         size: 'lg',
        //         scope: $scope,
        //         tableData: $scope.tableData
        //     });
        // };

        $scope.addBoxCollationTestimonial = function (data) {
            console.log("DATADATA", data);
            $scope.status = ["true", "false"];
            $scope.newtestimonialinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-collationtestimonial.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };


        $scope.saveCollationTestimonial = function (id, name, cname, city, content, order, status) {
            // console.log("DATA", value);

            console.log("DATA", name);
            console.log("DATA", content);
            console.log("DATA", order);
            console.log("DATA", status);
            testiData = {};
            testiData.name = name;
            testiData.cname = cname;
            testiData.city = city;
            testiData._id = id;
            testiData.content = content;
            testiData.order = order;
            testiData.status = status;

            console.log("INSIDE SPP");
            NavigationService.boxCall("Collation/saveCollationTestimonial", testiData, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(name + " testimonial" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeCollationTestimonial = function (value, project) {

            var abc = {};
            console.log("value = ", value)
            abc._id = project;
            abc.testid = value
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("Collation/removeCollationTestimonial", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findProducts();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        // $scope.saveData = function (formData) {
        //         console.log("in save");
        //         console.log("ABC", formData);
        //         // console.log("PIC",formData.photos[0].photo);
        //         NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
        //                 if (data.value === true) {
        //                     $scope.json.json.action[0].stateName.json.keyword = "";
        //                     $scope.json.json.action[0].stateName.json.page = "";
        //                     $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
        //                     var messText = "created";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "edited";
        //                     }
        //                     toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
        //                 } else {
        //                     var messText = "creating";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "editing";
        //                     }
        //                     toastr.error("Failed " + messText + " " + $scope.json.json.name);
        //                 }


    })


    //Agricultural.............................................................................

    .controller('AgriculturalDetailCtrl', function ($scope, TemplateService, NavigationService, JsonService, $timeout, $state, $stateParams, $uibModal, toastr) {
        $scope.json = JsonService;
        JsonService.setKeyword($stateParams.keyword);
        $scope.template = TemplateService;
        $scope.data = {};
        $scope.formdata = {};
        console.log("IN PROJECT controller");
        console.log("SCOPE JSON", $scope.json);
        $scope.tableData = {};
        $scope.stateData = {};
        $scope.projectDATA = {};
        $scope.stateName = [];
        $scope.stateIds = [];
        $scope.STATE;
        $scope.wohlig = "SUCCESS!!!";
        $scope.projectID = {};


        $scope.findProducts = function () {
            console.log('datttttttta1111');
            NavigationService.apiCall("Agricultural/findOneAgriculturalTestimonial", {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                if (data.value) {
                    // var mydata = _.cloneDeep(data.data);
                    // console.log('mydatatttttttttttt',mydata);
                    $scope.projectDATA = data.data;
                    $scope.tableData = data.data;
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                } else {
                    $scope.projectDATA = {};
                    $scope.tableData = {};
                    $scope.generateField = true;
                    console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
                }
            });
        }



        $scope.findProducts();
        // $scope.findState();
        //  START FOR EDIT
        if ($scope.json.json.preApi) {

            NavigationService.apiCall($scope.json.json.preApi.url, {
                [$scope.json.json.preApi.params]: $scope.json.keyword._id
            }, function (data) {
                $scope.data = data.data;
                $scope.generateField = true;
                console.log("DATA IS FOUND HERE-->", $scope.data);

            });
        } else {
            $scope.generateField = true;
        }


        //  END FOR EDIT
        $scope.editBoxCustomAgriculturalPhotos = function (data) {

            console.log("DATADATA", data);
            $scope.datainfo = data;
            $scope.newinfo = {};
            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-agricultural.html',
                size: 'lg',
                scope: $scope,

            });
        };

        $scope.saveEditAgriculturalGalleryPhotos = function (image1, image2, id, old1, old2) {
            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            var data1 = {};
            data1._id = id;
            data1.photo1 = image1;
            data1.photo2 = image2;
            data1.old = old1;
            data1.old1 = old2;
            $scope.newinfo = {};

            NavigationService.boxCall("Agricultural/updateAgriculturalGalleryPhotos", data1, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success("Gallery" + " " + "updated" + " successfully.");
            })

        };

        $scope.addBoxAgriculturalImage = function (data) {
            console.log("DATADATA", data);

            $scope.projectinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-agricultural.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };

        $scope.saveAgriculturalPhotos = function (value) {
            console.log("DATA", value);
            // console.log("INSIDE SPP");
            NavigationService.boxCall("Agricultural/saveAgriculturalPhotos", value, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(value.name + " Gallery" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeAgriculturalPhotos = function (value, value1, project) {

            var abc = {};

            abc._id = project;
            abc.images = value;
            abc.thumbimages = value1;
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("Agricultural/removeAgriculturalPhotos", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findProducts();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        $scope.saveData = function (formData) {
            console.log("in save");
            delete formData.testimonial;
            delete formData.gallery;
            console.log("ABC", formData);
            // console.log("PIC",formData.photos[0].photo);
            NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
                if (data.value === true) {
                    $scope.json.json.action[0].stateName.json.keyword = "";
                    $scope.json.json.action[0].stateName.json.page = "";
                    $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
                    var messText = "created";
                    if ($scope.json.keyword._id) {
                        messText = "edited";
                    }
                    toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
                } else {
                    var messText = "creating";
                    if ($scope.json.keyword._id) {
                        messText = "editing";
                    }
                    toastr.error("Failed " + messText + " " + $scope.json.json.name);
                }
            });
        };

        //testimonial

        // $scope.findTestimonial = function () {
        //     console.log('datttttttta1111');
        //     NavigationService.apiCall("Collation/findOneCollationTestimonial", {
        //         [$scope.json.json.preApi.params]: $scope.json.keyword._id
        //     }, function (data) {
        //         // var mydata = _.cloneDeep(data.data);
        //         // console.log('mydatatttttttttttt',mydata);
        //         $scope.projectDATA = data.data;
        //         $scope.tableData = data.data;
        //         $scope.generateField = true;
        //         console.log("TABLEDATA IS FOUND HERE-->", $scope.tableData);
        //     });
        // }



        // $scope.findProducts();
        // $scope.findState();
        // //  START FOR EDIT
        // if ($scope.json.json.preApi) {

        //     NavigationService.apiCall($scope.json.json.preApi.url, {
        //         [$scope.json.json.preApi.params]: $scope.json.keyword._id
        //     }, function (data) {
        //         $scope.data = data.data;
        //         $scope.generateField = true;
        //         console.log("DATA IS FOUND HERE-->", $scope.data);

        //     });
        // } else {
        //     $scope.generateField = true;
        // }


        $scope.editBoxCustomAgriculturalTestimonial = function (data) {

            console.log("DATADATA", data);

            $scope.status = ["true", "false"];
            $scope.datainfo = data;
            $scope.newinfo = {
                _id: $scope.json.keyword._id,
                testi_id: data
            };


            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-edit-agriculturaltestimonial.html',
                size: 'lg',
                scope: $scope,

            });
        };

        //testimonial saveedit

        $scope.saveEditAgriculturalTestimonial = function (id, name, cname, city, content, order, status) {
            //console.log("DATA", result);
            newinfo = {};

            newinfo._id = $scope.json.keyword._id,
                newinfo.testi_id = id;
            newinfo.name = name;
            newinfo.cname = cname;
            newinfo.city = city;
            newinfo.content = content;
            newinfo.order = order;
            newinfo.status = status;

            // console.log("image", image);
            // console.log("id", id);
            // console.log("old", old);

            // var data1 = {};
            // data1.name = result.name;
            // data1.content = result.content;
            // data1.order = result.order;
            // data1.status = result.status;
            // $scope.newinfo = {};

            NavigationService.boxCall("Agricultural/updateAgriculturalTestimonial", newinfo, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(" Testimonial" + " " + "updated" + " successfully.");
            })

        };

        //testimonial all

        // $scope.editBoxInstitute = function () {


        //     var modalInstance = $uibModal.open({
        //         animation: $scope.animationsEnabled,
        //         templateUrl: '/backend/views/modal/institute-edit-detail.html',
        //         size: 'lg',
        //         scope: $scope,
        //         tableData: $scope.tableData
        //     });
        // };

        $scope.addBoxAgriculturalTestimonial = function (data) {
            console.log("DATADATA", data);
            $scope.status = ["true", "false"];
            $scope.newtestimonialinfo = {
                _id: data

            };

            $scope.modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/backend/views/modal/image-add-agriculturaltestimonial.html',
                size: 'lg',
                scope: $scope,
                tableData: $scope.tableData
            });
        };


        $scope.onCancel = function (sendTo) {
            $scope.json.json.action[1].stateName.json.keyword = "";
            $scope.json.json.action[1].stateName.json.page = "";
            $state.go($scope.json.json.action[1].stateName.page, $scope.json.json.action[1].stateName.json);
        };


        $scope.saveAgriculturalTestimonial = function (id, name, cname, city, content, order, status) {
            // console.log("DATA", value);

            console.log("DATA", name);
            console.log("DATA", content);
            console.log("DATA", order);
            console.log("DATA", status);
            testiData = {};
            testiData.name = name;
            testiData.cname = cname;
            testiData.city = city;
            testiData._id = id;
            testiData.content = content;
            testiData.order = order;
            testiData.status = status;

            console.log("INSIDE SPP");
            NavigationService.boxCall("Agricultural/saveAgriculturalTestimonial", testiData, function (data) {
                $scope.projectData = data.data;
                $scope.generateField = true;
                $scope.modalInstance.close();
                $scope.findProducts();
                toastr.success(name + " testimonial" + " " + "added" + " successfully.");
            })

        };

        // $scope.saveEditProductsPhotos = function (value) {
        //     console.log("DATA", value);
        //     NavigationService.boxCall("Products/save", value, function (data) {
        //         $scope.projectData = data.data;
        //         $scope.generateField = true;
        //         $scope.modalInstance.close();
        //         $scope.findProject();
        //         toastr.success(" Gallery" + " " + "updated" + " successfully.");
        //     })

        // };

        $scope.removeAgriculturalTestimonial = function (value, project) {

            var abc = {};
            console.log("value = ", value)
            abc._id = project;
            abc.testid = value
            // abc = value;
            // abc.project=project;
            // console.log("PROJECT ",project);
            console.log("PROJECT IMAGE afdadfdaTA", abc);

            NavigationService.boxCall("Agricultural/removeAgriculturalTestimonial", abc, function (data) {
                $scope.newProjectData = data.data;
                $scope.generateField = true;
                // $state.reload();
                $scope.findProducts();
            })

        };

        $scope.closeBox = function () {
            $scope.modalInstance.close();
            $scope.findProject();
        };


        // $scope.saveData = function (formData) {
        //         console.log("in save");
        //         console.log("ABC", formData);
        //         // console.log("PIC",formData.photos[0].photo);
        //         NavigationService.apiCall($scope.json.json.apiCall.url, formData, function (data) {
        //                 if (data.value === true) {
        //                     $scope.json.json.action[0].stateName.json.keyword = "";
        //                     $scope.json.json.action[0].stateName.json.page = "";
        //                     $state.go($scope.json.json.action[0].stateName.page, $scope.json.json.action[0].stateName.json);
        //                     var messText = "created";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "edited";
        //                     }
        //                     toastr.success($scope.json.json.name + " " + formData.name + " " + messText + " successfully.");
        //                 } else {
        //                     var messText = "creating";
        //                     if ($scope.json.keyword._id) {
        //                         messText = "editing";
        //                     }
        //                     toastr.error("Failed " + messText + " " + $scope.json.json.name);
        //                 }


    })




    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.menutitle = NavigationService.makeactive("Login");
        TemplateService.title = $scope.menutitle;
        $scope.currentHost = window.location.origin;
        if ($stateParams.id) {
            if ($stateParams.id === "AccessNotAvailable") {
                toastr.error("You do not have access for the Backend.");
            } else {
                NavigationService.parseAccessToken($stateParams.id, function () {
                    NavigationService.profile(function () {
                        $state.go("dashboard");
                    }, function () {
                        $state.go("login");
                    });
                });
            }
        } else {
            NavigationService.removeAccessToken();
        }

    })

    .controller('CountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, $stateParams, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("country-list");
        $scope.menutitle = NavigationService.makeactive("Country List");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.currentPage = $stateParams.page;
        var i = 0;
        $scope.search = {
            keyword: ""
        };
        if ($stateParams.keyword) {
            $scope.search.keyword = $stateParams.keyword;
        }
        $scope.showAllCountries = function (keywordChange) {
            $scope.totalItems = undefined;
            if (keywordChange) {
                $scope.currentPage = 1;
            }
            NavigationService.searchCountry({
                page: $scope.currentPage,
                keyword: $scope.search.keyword
            }, ++i, function (data, ini) {
                if (ini == i) {
                    $scope.countries = data.data.results;
                    $scope.totalItems = data.data.total;
                    $scope.maxRow = data.data.options.count;
                }
            });
        };

        $scope.changePage = function (page) {
            var goTo = "country-list";
            if ($scope.search.keyword) {
                goTo = "country-list";
            }
            $state.go(goTo, {
                page: page,
                keyword: $scope.search.keyword
            });
        };
        $scope.showAllCountries();
        $scope.deleteCountry = function (id) {
            globalfunction.confDel(function (value) {
                console.log(value);
                if (value) {
                    NavigationService.deleteCountry(id, function (data) {
                        if (data.value) {
                            $scope.showAllCountries();
                            toastr.success("Country deleted successfully.", "Country deleted");
                        } else {
                            toastr.error("There was an error while deleting country", "Country deleting error");
                        }
                    });
                }
            });
        };
    })

    .controller('CreateCountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("country-detail");
        $scope.menutitle = NavigationService.makeactive("Country");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Country"
        };
        $scope.formData = {};
        $scope.saveCountry = function (formData) {
            console.log($scope.formData);
            NavigationService.countrySave($scope.formData, function (data) {
                if (data.value === true) {
                    $state.go('country-list');
                    toastr.success("Country " + formData.name + " created successfully.", "Country Created");
                } else {
                    toastr.error("Country creation failed.", "Country creation error");
                }
            });
        };

    })

    .controller('CreateAssignmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("assignment-detail");
        $scope.menutitle = NavigationService.makeactive("Assignment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Create Assignment"
        };
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.invoice = [];
        $scope.formData.products = [];
        $scope.formData.LRs = [];
        $scope.formData.vehicleNumber = [];
        $scope.formData.others = [];
        $scope.formData.shareWith = [];
        $scope.modalData = {};
        $scope.modalIndex = "";
        $scope.wholeObj = [];
        $scope.addModels = function (dataArray, data) {
            dataArray.push(data);
        };

        // NavigationService.searchNatureLoss(function(data) {
        //     $scope.natureLoss = data.data.results;
        // });

        $scope.refreshShareWith = function (data, office) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "postedAt": office
            };
            NavigationService.searchEmployee(formdata, 1, function (data) {
                $scope.shareWith = data.data.results;
            });
        };
        $scope.refreshNature = function (data, causeloss) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "_id": causeloss
            };
            NavigationService.getNatureLoss(formdata, 1, function (data) {
                $scope.natureLoss = data.data.results;
            });
        };

        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            if ($scope.modalIndex !== "") {
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                switch ($scope.holdObject) {
                    case "invoice":
                        {
                            var newmod = a.invoiceNumber.split(',');
                            _.each(newmod, function (n) {
                                $scope.newjson.invoiceNumber = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;

                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };


        $scope.submit = function (formData) {
            console.log($scope.formData);
            NavigationService.assignmentSave($scope.formData, function (data) {
                if (data.value === true) {
                    $state.go('assignment-list');
                    toastr.success("Assignment " + formData.name + " created successfully.", "Assignment Created");
                } else {
                    toastr.error("Assignment creation failed.", "Assignment creation error");
                }
            });
        };

    })

    .controller('EditAssignmentCtrl', function ($scope, TemplateService, NavigationService, $timeout, $state, toastr, $stateParams, $uibModal) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("assignment-detail");
        $scope.menutitle = NavigationService.makeactive("Assignment");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Assignment"
        };
        $scope.formData = {};
        $scope.formData.status = true;
        $scope.formData.invoice = [];
        $scope.formData.products = [];
        $scope.formData.LRs = [];
        $scope.formData.vehicleNumber = [];
        $scope.formData.others = [];
        $scope.formData.shareWith = [];
        $scope.modalData = {};
        $scope.modalIndex = "";
        $scope.wholeObj = [];
        $scope.addModels = function (dataArray, data) {
            dataArray.push(data);
        };

        NavigationService.getOneModel("Assignment", $stateParams.id, function (data) {
            $scope.formData = data.data;
            $scope.formData.dateOfIntimation = new Date(data.data.dateOfIntimation);
            $scope.formData.dateOfAppointment = new Date(data.data.dateOfAppointment);
            $scope.formData.country = data.data.city.district.state.zone.country._id;
            $scope.formData.zone = data.data.city.district.state.zone._id;
            $scope.formData.state = data.data.city.district.state._id;
            $scope.formData.district = data.data.city.district._id;
            $scope.formData.city = data.data.city._id;
            $scope.formData.insuredOfficer = data.data.insuredOfficer._id;
            console.log($scope.formData.policyDoc);
            console.log($scope.formData);
        });


        $scope.refreshShareWith = function (data, office) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "postedAt": office
            };
            NavigationService.searchEmployee(formdata, 1, function (data) {
                $scope.shareWith = data.data.results;
            });
        };
        $scope.refreshNature = function (data, causeloss) {
            var formdata = {};
            formdata.search = data;
            formdata.filter = {
                "_id": causeloss
            };
            NavigationService.getNatureLoss(formdata, 1, function (data) {
                $scope.natureLoss = data.data.results;
            });
        };

        $scope.addModal = function (filename, index, holdobj, data, current, wholeObj) {
            if (index !== "") {
                $scope.modalData = data;
                $scope.modalIndex = index;
            } else {
                $scope.modalData = {};
                $scope.modalIndex = "";
            }
            $scope.wholeObj = wholeObj;
            $scope.current = current;
            $scope.holdObject = holdobj;
            var modalInstance = $uibModal.open({
                scope: $scope,
                templateUrl: 'views/modal/' + filename + '.html',
                size: 'lg'
            });
        };

        $scope.addElements = function (moddata) {
            if ($scope.modalIndex !== "") {
                $scope.wholeObj[$scope.modalIndex] = moddata;
            } else {
                $scope.newjson = moddata;
                var a = moddata;
                switch ($scope.holdObject) {
                    case "invoice":
                        {
                            var newmod = a.invoiceNumber.split(',');
                            _.each(newmod, function (n) {
                                $scope.newjson.invoiceNumber = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "products":
                        {
                            var newmod1 = a.item.split(',');
                            _.each(newmod1, function (n) {
                                $scope.newjson.item = n;
                                $scope.wholeObj.push($scope.newjson);
                            });
                        }
                        break;
                    case "LRs":
                        var newmod2 = a.lrNumber.split(',');
                        _.each(newmod2, function (n) {
                            $scope.newjson.lrNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;
                    case "Vehicle":
                        var newmod3 = a.vehicleNumber.split(',');
                        _.each(newmod3, function (n) {
                            $scope.newjson.vehicleNumber = n;
                            $scope.wholeObj.push($scope.newjson);
                        });
                        break;

                    default:
                        {
                            $scope.wholeObj.push($scope.newjson);
                        }

                }

            }
        };

        $scope.deleteElements = function (index, data) {
            data.splice(index, 1);
        };


        $scope.submit = function (formData) {
            console.log($scope.formData);
            NavigationService.assignmentSave($scope.formData, function (data) {
                if (data.value === true) {
                    $state.go('assignment-list');
                    toastr.success("Assignment " + formData.name + " created successfully.", "Assignment Created");
                } else {
                    toastr.error("Assignment creation failed.", "Assignment creation error");
                }
            });
        };

    })

    .controller('EditCountryCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file

        $scope.template = TemplateService.changecontent("country-detail");
        $scope.menutitle = NavigationService.makeactive("Country");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();

        $scope.header = {
            "name": "Edit Country"
        };

        NavigationService.getOneCountry($stateParams.id, function (data) {
            $scope.formData = data.data;
            console.log('$scope.oneCountry', $scope.oneCountry);

        });

        $scope.saveCountry = function (formValid) {
            NavigationService.countryEditSave($scope.formData, function (data) {
                if (data.value === true) {
                    $state.go('country-list');
                    console.log("Check this one");
                    toastr.success("Country " + $scope.formData.name + " edited successfully.", "Country Edited");
                } else {
                    toastr.error("Country edition failed.", "Country editing error");
                }
            });
        };

    })

    .controller('SchemaCreatorCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("schema-creator");
        $scope.menutitle = NavigationService.makeactive("Schema Creator");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.collectionTypes = ["Table View", "Table View Drag and Drop", "Grid View", "Grid View Drag and Drop"];
        $scope.schema = [{
            "schemaType": "Boolean",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "Color",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "Date",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "Email",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "File",
            "Input1": "MB Limit",
            "Input2": ""
        }, {
            "schemaType": "Image",
            "Input1": "pixel x",
            "Input2": "pixel y "
        }, {
            "schemaType": "Location",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "Mobile",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "Multiple Select",
            "Input1": "Enum",
            "Input2": ""
        }, {
            "schemaType": "Multiple Select From Table",
            "Input1": "Collection",
            "Input2": "Field"
        }, {
            "schemaType": "Number",
            "Input1": "min ",
            "Input2": "max"
        }, {
            "schemaType": "Single Select ",
            "Input1": "Enum",
            "Input2": ""
        }, {
            "schemaType": "Single Select From Table",
            "Input1": "Collection",
            "Input2": "Field"
        }, {
            "schemaType": "Telephone",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "Text",
            "Input1": "min length",
            "Input2": "max length"
        }, {
            "schemaType": "TextArea",
            "Input1": "min length",
            "Input2": "max length"
        }, {
            "schemaType": "URL",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "WYSIWYG",
            "Input1": "",
            "Input2": ""
        }, {
            "schemaType": "Youtube",
            "Input1": "",
            "Input2": ""
        }];


        $scope.inputTypes = [{
            value: '',
            name: 'Select type of input'
        }, {
            value: 'Text',
            name: 'Text'
        }, {
            value: 'Date',
            name: 'Date'
        }, {
            value: 'Textarea',
            name: 'Textarea'
        }];

        $scope.formData = {};
        $scope.formData.status = true;

        $scope.formData.forms = [{
            head: '',
            items: [{}, {}]
        }];

        $scope.addHead = function () {
            $scope.formData.forms.push({
                head: $scope.formData.forms.length + 1,
                items: [{}]
            });
        };
        $scope.removeHead = function (index) {
            if ($scope.formData.forms.length > 1) {
                $scope.formData.forms.splice(index, 1);
            } else {
                $scope.formData.forms = [{
                    head: '',
                    items: [{}, {}]
                }];
            }
        };

        $scope.addItem = function (obj) {
            var index = $scope.formData.forms.indexOf(obj);
            $scope.formData.forms[index].items.push({});
        };

        $scope.removeItem = function (obj, indexItem) {
            var indexHead = $scope.formData.forms.indexOf(obj);
            if ($scope.formData.forms[indexHead].items.length > 1) {
                $scope.formData.forms[indexHead].items.splice(indexItem, 1);
            } else {
                $scope.formData.forms[indexHead].items = [{}];
            }
        };

    })

    .controller('ExcelUploadCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("excel-upload");
        $scope.menutitle = NavigationService.makeactive("Excel Upload");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.form = {
            file: null,
            model: $stateParams.model
        };

        $scope.excelUploaded = function () {
            console.log("Excel is uploaded with name " + $scope.form.file);
            NavigationService.uploadExcel($scope.form, function (data) {
                $scope.data = data.data;
            });
        };
    })

    .controller('headerctrl', function ($scope, TemplateService, $uibModal) {
        $scope.template = TemplateService;
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $(window).scrollTop(0);
        });

    })

    .controller('languageCtrl', function ($scope, TemplateService, $translate, $rootScope) {

        $scope.changeLanguage = function () {
            console.log("Language CLicked");

            if (!$.jStorage.get("language")) {
                $translate.use("hi");
                $.jStorage.set("language", "hi");
            } else {
                if ($.jStorage.get("language") == "en") {
                    $translate.use("hi");
                    $.jStorage.set("language", "hi");
                } else {
                    $translate.use("en");
                    $.jStorage.set("language", "en");
                }
            }
            //  $rootScope.$apply();
        };
    });