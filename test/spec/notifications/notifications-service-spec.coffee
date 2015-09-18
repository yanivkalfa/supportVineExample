describe 'NotificationService', ->

  beforeEach ->
    angular.mock.module 'supportVine'

  NotificationService = null
  mockNotifications = []
  mockTeamMemberKey = null

  beforeEach inject (_NotificationService_, $rootScope, $httpBackend) ->
    NotificationService = _NotificationService_
    httpBackend = $httpBackend
    httpBackend.when('GET', "#{mockTeamMemberKey}/notifications").respond mockNotifications
    httpBackend.when('POST', '/notifications/#{mockNotification.key}/seen').respond mockNotification
  
  afterEach ->
    httpBackend.verifyNoOutstandingRequest()
    httpBackend.verifyNoOutstandingExpectation()

  it 'should retreive a user\'s notifications', ->
    NotificationService.getNotifications mockTeamMemberKey
    httpBackend.expectGET "#{teamMemberKey}/notifications"

  it 'should mark a notification as seen', ->
    NotificationService.see notificationKey
    httpBackend.expectPOST "/notifications/#{mockNotification.key}/seen"

  it 'should allow to subscribe to a team events ws endpoint', ->
    NotificationService.subscribeTeam teamKey, handler

  it 'should allow to subscribe to a user events ws endpoint', ->
    NotificationService.subscribeUser userKey, handler