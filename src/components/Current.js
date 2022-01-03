function Current() {

    const websocket = new WebSocket("wss://bad-api-assignment.reaktor.com/rps/live");

    websocket.onopen = event => {
        console.log("websocket avattu!");
     };

    websocket.onmessage = function (event) {
        console.log("tässä event.data: " + event.data);
        console.log("tässä JSONparse" + JSON.parse(event.data));
        //console.log("tässä jsonstringify: " + JSON.stringify(event.data));

        /*tässä JSONparse{"type":"GAME_RESULT","gameId":"45516eae8775e35b1c54384d","t":1641208327087,"playerA":{"name":"Aino Koskinen","played":"PAPER"},"playerB":{"name":"Marjatta Virtanen","played":"ROCK"}}*/
    };
    
    websocket.onclose = event => {
        console.log("websocket suljettu!");
        console.log("koodi: " + event.code);
        console.log("syy: " + event.reason);
     };
    
    return (
        <div>
            <h1>Current games here</h1>
        </div>
    );

}

export default Current;