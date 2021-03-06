# Karma configuration
# http://karma-runner.github.io/0.12/config/configuration-file.html
# Generated on 2014-11-09 using
# generator-karma 0.8.3

module.exports = (config) ->
  config.set
    # base path, that will be used to resolve files and exclude
    basePath: '../'

    # testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine']

    # list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js'
      'bower_components/angular/angular.js'
      'bower_components/angular-mocks/angular-mocks.js'
      'bower_components/angular-animate/angular-animate.js'
      'bower_components/angular-cookies/angular-cookies.js'
      'bower_components/angular-resource/angular-resource.js'
      'bower_components/angular-route/angular-route.js'
      'bower_components/angular-sanitize/angular-sanitize.js'
      'bower_components/angular-touch/angular-touch.js'
      'bower_components/angular-touch/angular-touch.js'
      'bower_components/ui-router/release/angular-ui-router.js'
      'bower_components/bootstrap/dist/js/bootstrap.min.js'
      'bower_components/chosen/chosen.jquery.min.js'
      'bower_components/cryptojslib/rollups/md5.js'
      'bower_components/cryptojslib/components/enc-base64-min.js'
      'bower_components/slimScroll/jquery.slimscroll.min.js'
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
      'bower_components/angular-chosen-localytics/chosen.js'
      'bower_components/ng-file-upload/angular-file-upload.min.js'
      'bower_components/underscore/underscore-min.js'
      'bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js'
      'bower_components/angular-loading-bar/build/loading-bar.min.js'
      'bower_components/autofill-event/src/autofill-event.js'
      'bower_components/AngularJS-Toaster/toaster.js'
      'bower_components/sockjs-client/dist/sockjs.js'
      'bower_components/stomp-websocket/lib/stomp.js'
      'app/scripts/lib/satellizer/satellizer.js'
      'app/scripts/app.coffee'
      'app/scripts/**/*-module.coffee'
      'app/scripts/**/*.coffee'
      'test/spec/**/*.coffee'
    ],

    # list of files / patterns to exclude
    exclude: []

    # web server port
    port: 8080

    # level of logging
    # possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    # Start these browsers, currently available:
    # - Chrome
    # - ChromeCanary
    # - Firefox
    # - Opera
    # - Safari (only Mac)
    # - PhantomJS
    # - IE (only Windows)
    browsers: [
      'PhantomJS'
    ]

    # Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher'
      'karma-jasmine'
      'karma-coffee-preprocessor'
    ]

    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: true

    # Continuous Integration mode
    # if true, it capture browsers, run tests and exit
    singleRun: false

    colors: true

    preprocessors: '**/*.coffee': ['coffee']

    # Uncomment the following lines if you are using grunt's server to run the tests
    # proxies: '/': 'http://localhost:9000/'
    # URL root prevent conflicts with the site root
    # urlRoot: '_karma_'
