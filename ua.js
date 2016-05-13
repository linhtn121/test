
function getUA () {
    var ua = {}

    ua.registering = 0;
    ua.outcoming  = 1;
    ua.O_K    = 2;

    ua.status = -1;

    ua.start = function(){
        initTransporter();
    }

    ua.onConnected = function (){
        if(isAutoLogin)
          ua.register();
    }

    ua.onRegistered = function (){

    }

    ua.register = function(){
        ua.status = ua.registering;
        linh_ws.send(ua.getms());
    }

    ua.onReceiveResponse = function (data){

      console.log("onReceiveResponse");
      console.log(data);
      
      if(ua.status === ua.registering){
          processRegister(ua, data);
      }else  if(ua.status === ua.outcoming){
          processOutcoming(ua, data);
      }else  if(ua.status === ua.O_K){
          processIncoming(ua, data);
      }
        
    }

    ua.getms = function(){ 
          return getMsg();
    }

    ua.taget = 0;

    ua.call = function(taget){
          ua.status =  ua.outcoming;
          sdp = null;
          ua.taget = taget; 
          ua.initRTC();
    }

    ua.offerSDP = null;

    ua.initRTC = function(){

     

    // DTLS/SRTP is preferred on chrome
    // to interop with Firefox
    // which supports them by default

      var DtlsSrtpKeyAgreement = {
         DtlsSrtpKeyAgreement: true
      };

      var optional = {
          optional: [DtlsSrtpKeyAgreement]
      };

      // for Chrome:
    var sdpConstraints = {
        optional: [],
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        }
    };
      
      pc = new RTCPeerConnection(iceServers, optional);    

      pc.onicecandidate = function (e) {
               console.log("peer connecttion - on ice candidate");
              console.log(e);

      };

       pc.createOffer(function(offerSDP) {

              console.log("peer connecttion - createOffer ok ");
              console.log(offerSDP.sdp);


              pc.setLocalDescription(offerSDP, function() {
                   console.log("peer connecttion - setLocalDescription ");
                   ua.offerSDP = offerSDP.sdp;
                   linh_ws.send(getMsgInvite(ua.taget));  
              }, onfailure);

              pc.onaddstream = function (obj) {
               
                console.log("onaddstream");
                console.log(obj.stream);

                
                vid = document.getElementById("video");
                //vid.srcObject = obj.stream;
                vid.src =  URL.createObjectURL(obj.stream);
              };

              

              pc.onsignalingstatechange = function(ev) {
                console.log("onsignalingstatechange event detected!");
                console.log(ev);
              };
          
      }, onfailure, sdpConstraints);


       function onfailure(){
            console.log("peer connecttion - onfailure");
       }

    }  

    return ua;
}


