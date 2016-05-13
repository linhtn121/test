 
 var STUN = {
       urls: 'stun:stun.l.google.com:19302'
  };

    var TURN = {
      urls: 'turn:turn.bistri.com:80',
      credential: 'homeo',
      username: 'homeo'
    };

 iceServers = {
    iceServers: [STUN, TURN]
  };


 var isAutoLogin = true;

 var RTCPeerConnection = window.mozRTCPeerConnection || window.webkitRTCPeerConnection;


var linh_ws, ms1, ms2, ms3, pc;

var sdp = null;

var nonce = null;


var DtlsSrtpKeyAgreement = {
    DtlsSrtpKeyAgreement: true
};

var optional = {
    optional: [DtlsSrtpKeyAgreement]
};
 
var sdpConstraints = {
     optional: [],
     mandatory: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
     }
};
