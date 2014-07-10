var base = "/api/twitter.trackback/";
function start(user) {
  var url = base + user + '/start';
  request = $.ajax({url:url, type:'GET'});
  request.done(function(msg) {
    window.location.href = "/";
  });
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}
function stop(user) {
  var url = base + user + '/stop';
  request = $.ajax({url:url, type:'GET'});
  request.done(function(msg) {
    window.location.href = "/";
  });
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}
function refresh(user) {
  var url = base + user + '/refresh';
  request = $.ajax({url:url, type:'GET'});
  request.done(function(msg) {
    window.location.href = "/";
  });
  request.fail(function(jqXHR, textStatus) {
    alert( "Request failed: " + textStatus );
  });
}