describe 'NotificationsChannel', ->

  beforeEach ->
    angular.mock.module 'supportVine'

  NotificationsChannel = null
  rootScope = null
  mockNotification = { message: 'hello World' }

  beforeEach inject (_NotificationsChannel_, $rootScope) ->
    NotificationsChannel = _NotificationsChannel_
    rootScope = $rootScope

  it 'should allow subscribers to subscribe to notifications', (done) ->
    scope = rootScope.$new()
    NotificationsChannel.onNotification scope, (notification) ->
      expect(notification).toEqual mockNotification
      done()
    rootScope.$broadcast NotificationsChannel.MESSAGE_TYPES.NOTIFICATION_MESSAGE, mockNotification
    rootScope.$apply()

  it 'should broadcast notifications events from the $rootScope', ->
    scope = rootScope.$new()
    spyOn(rootScope, '$broadcast').and.callThrough()
    NotificationsChannel.notify mockNotification
    rootScope.$apply()
    expect(rootScope.$broadcast).toHaveBeenCalledWith(NotificationsChannel.MESSAGE_TYPES.NOTIFICATION_MESSAGE, mockNotification)
    
  it 'should deliver notifications to the multiple subscribers', (done) ->
    scope1 = rootScope.$new()
    scope2 = rootScope.$new()
    doneCounter = 0
    doneCount = ()->
      doneCounter++
      doneCounter >= 2
    NotificationsChannel.onNotification scope1, (notification) ->
      expect(notification).toEqual mockNotification
      done() if doneCount()
    NotificationsChannel.onNotification scope2, (notification) ->
      expect(notification).toEqual mockNotification
      done() if doneCount()
    NotificationsChannel.notify mockNotification
    rootScope.$apply()