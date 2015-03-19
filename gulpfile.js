var gulp = require('gulp');
var paths = require('./gulp/gulp.config.json');
var critical = require('critical');
// var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')();
var htmlreplace = require('gulp-html-replace');


gulp.task('default', ['watch','jade','sass']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.jade, ['jade', 'sass']);
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe($.plumber())
    .pipe($.sass({sourceComments:'normal'}))
    .pipe($.autoprefixer('last 2 version'))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
    .pipe($.size());
});

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe($.jade({
      pretty: true
    }))
    .pipe(gulp.dest(function(file) {
      return file.base; 
    }))
});

// gulp.task('scripts', function () {
//   return gulp.src('src/client/app/**/*.js')
//     .pipe($.jshint())
//     .pipe($.jshint.reporter('jshint-stylish'))
//     .pipe($.size());
// });

// Styles
// gulp.task('styles', function () {
//   return gulp.src('src/client/common/**/*.css')
//     .pipe($.rename({suffix: '.min'}))
//     .pipe($.minifyCss())
//     .pipe(gulp.dest('dist/common/css'))
//     .pipe($.notify({message: 'Styles task complete'}));
// });

gulp.task('styles', function () {
  return gulp.src([
      'src/client/bower_components/pure/pure-min.css',
      'src/client/bower_components/pure/grids-responsive-min.css',
      'src/client/bower_components/components-font-awesome/css/font-awesome.min.css',
      'src/client/common/css/fontface.css',
      'src/client/common/css/layout/sidebar.css',
      'src/client/common/css/layout/mobile/menu.css',
      'src/client/common/css/loading/loading.css',
      'src/client/common/css/buttons.css',
      'src/client/common/css/main.css',
      'src/client/common/css/media-query.css'
    ])
    .pipe($.concat('main.css'))
    .pipe($.rename({suffix: '.min'}))
    .pipe($.minifyCss())
    .pipe(gulp.dest('dist/css'))
    .pipe($.notify({message: 'Styles task complete'}));
});

//Scripts
gulp.task('scripts', function () {
    return gulp.src([ 'src/client/bower_components/angular/angular.min.js',
                      'src/client/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                      'src/client/bower_components/angular-resource/angular-resource.min.js',
                      'src/client/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
                      'src/client/bower_components/ng-underscore/build/ng-underscore.min.js',
                      'src/client/bower_components/angular-animate/angular-animate.min.js',
                      'src/client/app/app.module.js',
                      'src/client/app/core/core.module.js',
                      'src/client/app/core/conekta/conekta.module.js',
                      'src/client/app/admin/admin.module.js',
                      'src/client/app/cart/cart.module.js',
                      'src/client/app/dashboard/dashboard.module.js',
                      'src/client/app/layout/layout.module.js',
                      'src/client/app/storage/storage.module.js',
                      'src/client/app/core/initialize.js',
                      'src/client/app/core/config.js',
                      'src/client/app/core/parse/parse.factory.js',
                      'src/client/app/core/parse/sepomex.factory.js',
                      'src/client/app/core/parse/parse.headers.factory.js',
                      'src/client/app/core/store/store.api.factory.js',
                      'src/client/app/core/user/user.api.factory.js',
                      'src/client/app/core/stats/stats.api.js',
                      'src/client/app/core/coupon/coupon.api.factory.js',
                      'src/client/app/core/sales/sales.api.js',
                      'src/client/app/core/products/products.api.js',
                      'src/client/app/core/shipping/shipping.api.js',
                      'src/client/app/core/publisher/publisher.api.js',
                      'src/client/app/core/serie/serie.api.js',
                      'src/client/app/cart/cart.factory.js',
                      'src/client/app/core/conekta/conekta.factory.js',
                      'src/client/app/cart/checkout/checkout.controller.js',
                      'src/client/app/item/Item.controller.js',
                      'src/client/app/storage/storage.service.js',
                      'src/client/app/layout/shelf.directive.js',
                      'src/client/app/layout/shell.js',
                      'src/client/app/forgot/forgot.controller.js',
                      'src/client/app/recovery/recovery.controller.js',
                      'src/client/app/login/login.controller.js',
                      'src/client/app/payment/payment.controller.js',
                      'src/client/app/wallet/wallet.controller.js',
                      'src/client/app/wallet/coupon/coupon.directive.js',
                      'src/client/app/wallet/coupon/adminCoupon.directive.js',
                      'src/client/app/wallet/money/money.directive.js',
                      'src/client/app/address/address.controller.js',
                      'src/client/app/order/order.controller.js',
                      'src/client/app/order/order.factory.js',
                      'src/client/app/order/orders.controller.js',
                      'src/client/app/profile/profile.controller.js',
                      'src/client/app/profile/profileForm.directive.js',
                      'src/client/app/admin/users/userProfileForm.directive.js',
                      'src/client/app/admin/users/payment/adminPayment.controller.js',
                      'src/client/app/admin/users/address/adminAddress.controller.js',
                      'src/client/app/admin/users/series/adminSeries.controller.js',
                      'src/client/app/account/account.controller.js',
                      'src/client/app/admin/products/productForm.directive.js',
                      'src/client/app/admin/publishers/publisherForm.directive.js',
                      'src/client/app/admin/series/serieForm.directive.js',
                      'src/client/app/admin/sales/sales.controller.js',
                      'src/client/app/admin/subscriptions/subscriptions.controller.js',
                      'src/client/app/admin/orders/orders.controller.js',
                      'src/client/app/admin/preorders/preorders.controller.js',
                      'src/client/app/admin/users/users.controller.js',
                      'src/client/app/admin/users/userProfile.controller.js',
                      'src/client/app/admin/users/user/view.controller.js',
                      'src/client/app/admin/users/wallet/adminWallet.controller.js',
                      'src/client/app/admin/products/products.controller.js',
                      'src/client/app/admin/publishers/publishers.controller.js',
                      'src/client/app/admin/series/series.controller.js',
                      'src/client/app/admin/products/product.controller.js',
                      'src/client/app/admin/publishers/publisher.controller.js',
                      'src/client/app/admin/series/serie.controller.js',
                      'src/client/app/admin/products/newProduct.controller.js',
                      'src/client/app/admin/publishers/newPublisher.controller.js',
                      'src/client/app/admin/series/newSerie.controller.js',
                      'src/client/app/admin/assistent/assistent.controller.js',
                      'src/client/app/admin/assistent/assistentStart.controller.js',
                      'src/client/app/admin/assistent/assistentUser.controller.js',
                      'src/client/app/admin/assistent/assistentUsers.controller.js',
                      'src/client/app/account/cancel.directive.js',
                      'src/client/app/serie/serie.factory.js',
                      'src/client/app/serie/series.controller.js',
                      'src/client/app/serie/serie.controller.js',
                      'src/client/app/address/newAddress.directive.js',
                      'src/client/app/payment/cardForm.directive.js',
                      'src/client/app/payment/validateCard.directive.js',
                      'src/client/app/login/passwordMatch.directive.js',
                      'src/client/app/cart/checkout/items/itemsList.directive.js',
                      'src/client/app/cart/checkout/items/cartItem.directive.js',
                      'src/client/app/login/loginForms.directive.js',
                      'src/client/app/message/message.service.js',
                      'src/client/app/message/message.directive.js',
                      'src/client/app/message/confirm.directive.js',
                      'src/client/app/cart/checkout/wallet/wallet.directive.js',
                      'src/client/app/cart/checkout/shippingAddress/shippingAddress.directive.js',
                      'src/client/app/cart/checkout/paymentMethod/paymentMethod.directive.js',
                      'src/client/app/cart/checkout/placeOrder/placeOrder.directive.js',
                      'src/client/app/cart/checkout/responsePayment/responsePayment.directive.js'
                     ])
        // .pipe($.jshint())
        // .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.concat('main.js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify({mangle:false}))
        .pipe(gulp.dest('dist/js'))
        .pipe($.notify({message: 'Scripts task complete'}));
});

//Images
gulp.task('images', function () {
  return gulp.src('src/client/common/images/*')
    .pipe($.cache($.imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest('dist/common/images'))
    .pipe($.notify({message: 'Images task complete'}));
});

gulp.task('copyfiles', function () {
  gulp.src('src/client/app/**/*.html')
    .pipe(gulp.dest('dist/app'));
  gulp.src('src/client/common/css/fonts/**')
    .pipe(gulp.dest('dist/css/fonts'));
  gulp.src('src/client/bower_components/components-font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('indexhtml', function () {
  gulp.src('src/client/index.html')
      .pipe(htmlreplace({
          'css': 'css/main.min.css',
          'js': 'js/main.min.js'
      }))
      .pipe(gulp.dest('dist/'));
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['clean'], function () {
    gulp.start('styles', 'scripts', 'images','copyfiles','indexhtml');
});




