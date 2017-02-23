angular.module("kaifanlaController",["ngRoute"])
  .controller("startCtrl", function ($scope, $location, $timeout) {
    $scope.title = "开饭啦";
    $scope.titleImg = "./img/kid-foods.jpg";
    $scope.jump = function (p) {
      $timeout(function () {
        $location.path(p);
      }, 5000);
    }
  })
  .controller("mainCtrl", function ($scope, $http, $window, $document) {
    $scope.dishList = [];
    //监听当页面到最底时,自动加载数据
    $($window).scroll(function () {
      if(!$scope.isNoMore){
        var windowHeight = $($window).height();
        var scrollTop = $($window).scrollTop();
        var documentHeight = $($document).height();
        if((windowHeight + scrollTop) == documentHeight){
          var url1 = "./data/getdish-bypage.php?start="+$scope.dishList.length;
          $scope.isLoadMore = false;
          $scope.isLoading = true;
          $http.get(url1).success(function (data) {
            $scope.isLoading = false;
            $scope.isLoadMore = true;
            //判断是否还有数据可以显示,来改变加载更多的按键
            if(($scope.dishList.length + 1) > 8){
              $scope.isLoadMore = false;
              $scope.isNoMore = true;
              return;
            }
            $scope.dishList = $scope.dishList.concat(data);
          });
        }
        //当没有数据时,按钮不能点击
        if($scope.isNoMore){
          $("#more").attr("disabled","disabled");
        }
      }
    });
    //跳到main页面自动加载数据
    var url = "./data/getdish-bypage.php?start="+$scope.dishList.length;
    $http.get(url).success(function (data) {
      $scope.isLoading = false;
      $scope.isLoadMore = true;
      $scope.dishList = $scope.dishList.concat(data);
    });
    //点击加载更多按钮处理函数
    $scope.more = function () {
      var url1 = "./data/getdish-bypage.php?start="+$scope.dishList.length;
      $scope.isLoadMore = false;
      $scope.isLoading = true;
      $http.get(url1).success(function (data) {
        $scope.isLoading = false;
        $scope.isLoadMore = true;
        //判断是否还有数据可以显示,来改变加载更多的按键
        if(($scope.dishList.length + 1) > 8){
          $scope.isLoadMore = false;
          $scope.isNoMore = true;
          $("#more").attr("disabled","disabled");
          return;
        }
        $scope.dishList = $scope.dishList.concat(data);
      });
    };
    //是否显示"加载更多"
    $scope.isLoadMore = false;
    //是否显示"没有更多数据"
    $scope.isNoMore = false;
    //是否显示"加载中..."
    $scope.isLoading = true;

  })
  .controller("detailCtrl", function ($scope, $routeParams, $http) {
    var url = "./data/getdish-detail.php?dno=" + $routeParams.dno;
    $http.get(url).success(function (data) {
      $scope.dish = data;
    });
  });