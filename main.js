//------ main.js ------

var ua =  getUA();

ua.start();


/**

function:

1. register - ok
2. call:
    2.1: send INVITE
        2.1.1 get sdp local- ok
    2.2: receive ok
        2.1.1 get sdp remote - ok
        2.1.2 get STREAM     - ok
        2.1.3 send ACK       - ok

3. receive a call
    3.1 get sdp remote
    3.2 send OK.
*/
