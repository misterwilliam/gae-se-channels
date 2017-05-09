let oReq = new XMLHttpRequest();
oReq.addEventListener("load", (event) => {
  console.log(event.target);
  const response = JSON.parse(event.target.responseText);
  console.log("Got token", response.token);

  let channel = new goog.appengine.Channel(response.token);
  let handler = {
    'onopen': function() {
      console.log('channel open');
      let triggerSend = new XMLHttpRequest();
      triggerSend.open("GET", "/send");
      triggerSend.send();
    },
    'onmessage': function(mesg) { console.log('got ', mesg) },
    'onerror': function() { console.log('get error') },
    'onclose': function() { console.log('get close') },
  };
  channel.open(handler);
});
oReq.open("GET", "/channel");
oReq.send();
