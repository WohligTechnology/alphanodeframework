var imgurl = adminurl + "upload/";

var imgpath = imgurl + "readFile";
var uploadurl = imgurl;

var navigationservice = angular.module('navigationservice', [])

    .factory('NavigationService', function ($http) {
        var navigation = [{
                name: "Users",
                classis: "active",
                sref: "#!/page/viewUser//",
                icon: "phone"
            }, {
                name: "Enquiry",
                classis: "active",
                sref: "#!/page/viewEnquiry//",
                icon: "phone"
            }, {
                name: "Careers",
                classis: "active",
                sref: "#!/page/viewCareers//",
                icon: "phone"
            }, {
                name: "Home Slider",
                classis: "active",
                sref: "#!/page/viewHomeSlider//",
                icon: "phone"
            }, {
                name: "Clients",
                classis: "active",
                sref: "#!/page/viewClients//",
                icon: "phone"
            }, {
                name: "Journey",
                classis: "active",
                sref: "#!/page/viewJourney//",
                icon: "phone"
            }, {
                name: "News",
                classis: "active",
                sref: "#!/page/viewLatestNews//",
                icon: "phone"
            }, {
                name: "Company statistics",
                classis: "active",
                sref: "#!/page/viewProductStatistics//",
                icon: "phone"
            }, {
                name: "AboutUs",
                classis: "active",
                sref: "#!/page/viewAboutUs//",
                icon: "phone"
            },
            // {
            //     name: "Products",
            //     classis: "active",
            //     sref: "#!/page/viewProducts//",
            //     icon: "phone"
            // },
            {
                name: "Products",
                classis: "active",
                sref: "",
                icon: "phone",
                subnav: [

                    {
                        name: "PP/PE BAGS & LINERS",
                        classis: "active",
                        link: "#!/page/viewProducts//",
                    },
                    {
                        name: "POF Shrink Film",
                        classis: "active",
                        link: "#!/page/viewShrinkFilm//",
                    },
                    {
                        name: "PET Bottles",
                        classis: "active",
                        link: "#!/page/viewBottles//",
                    },
                    {
                        name: "Speciality Films",
                        classis: "active",
                        link: "#!/page/viewSpecialityFilms//",
                    },
                    {
                        name: "Collation Shrink Films",
                        classis: "active",
                        link: "#!/page/editCollation//",
                    },
                    {
                        name: "Agricultural Mulch Film",
                        classis: "active",
                        link: "#!/page/editAgricultural//",
                    }
                    // },
                    // {
                    //     name: "DestinationContent",
                    //     classis: "active",
                    //     link: "#!/page/viewDestinationContent//",
                    // }

                ]
            },

        ];

        return {
            getnav: function () {
                return navigation;
            },

            parseAccessToken: function (data, callback) {
                if (data) {
                    $.jStorage.set("accessToken", data);
                    callback();
                }
            },
            removeAccessToken: function (data, callback) {
                $.jStorage.flush();
            },
            profile: function (callback, errorCallback) {
                var data = {
                    accessToken: $.jStorage.get("accessToken")
                };
                $http.post(adminurl + 'user/profile', data).then(function (data) {
                    data = data.data;
                    if (data.value === true) {
                        $.jStorage.set("profile", data.data);
                        callback();
                    } else {
                        errorCallback(data.error);
                    }
                });
            },
            makeactive: function (menuname) {
                for (var i = 0; i < navigation.length; i++) {
                    if (navigation[i].name == menuname) {
                        navigation[i].classis = "active";
                    } else {
                        navigation[i].classis = "";
                    }
                }
                return menuname;
            },

            search: function (url, formData, i, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },
            delete: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);
                });
            },
            countrySave: function (formData, callback) {
                $http.post(adminurl + 'country/save', formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },

            apiCall: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },
            boxCall: function (url, formData, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },



            searchCall: function (url, formData, i, callback) {
                $http.post(adminurl + url, formData).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },

            getOneCountry: function (id, callback) {
                $http.post(adminurl + 'country/getOne', {
                    _id: id
                }).then(function (data) {
                    data = data.data;
                    callback(data);

                });
            },
            getLatLng: function (address, i, callback) {
                $http({
                    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyC62zlixVsjaq4zDaL4cefNCubjCgxkte4",
                    method: 'GET',
                    withCredentials: false,
                }).then(function (data) {
                    data = data.data;
                    callback(data, i);
                });
            },
            uploadExcel: function (form, callback) {
                $http.post(adminurl + form.model + '/import', {
                    file: form.file
                }).then(function (data) {
                    data = data.data;
                    callback(data);

                });

            },

        };
    });