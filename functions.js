

function processRegister(ua, data){

         if(data.indexOf('401') != -1 && data.indexOf('REGISTER')!=-1)//register
            {

            authenticate = Parser.parseMessage(data);

            nonce = authenticate[1];
        
            nonce = nonce.split('=');

            nonce = nonce[1];

            nonce = nonce.replace("\"", ""); nonce = nonce.replace("\"", "");

            console.log(nonce);
      
            ua.register();

        }else if(data.indexOf('OK')){

        	console.log("register OK!");
        	ua.status = ua.O_K;
        }
}

function processOutcoming(ua, data){

		 if(data.indexOf('SIP/2.0 407') != -1)// call
         {
            authenticate = Parser.parseMessage(data);
      
            nonce = authenticate[1];
        
            nonce = nonce.split('=');

            nonce = nonce[1];

            nonce = nonce.replace("\"", "");

            nonce = nonce.replace("\"", "");

            console.log(nonce);
      
            ua.call(ua.taget);  

         }else 
        if(data.indexOf('200') != -1 && data.indexOf('INVITE') != -1 && sdp === null)// out coming call - get sdp
         {

            console.log('call - get sdp');

            index = data.indexOf('Content-Length:');
            sdp = data.substring(index, data.length);
            sdp = sdp.substring(sdp.indexOf('\n'), sdp.length);

            console.log(sdp);
            //sdp = JSON.parse(sdp);

            //console.log(sdp);

            //offer = new RTCSessionDescription(sdp);
            //pc.setRemoteDescription(offer);

            ok = sdp.substring(sdp.indexOf('v'), sdp.length)

            via = data.substring(data.indexOf('Via'), data.length);
            via = via.substring(via.indexOf(' ') + 1, via.indexOf('\r\n'));

             to = data.substring(data.indexOf('To'), data.length);
            to = to.substring(to.indexOf(' ') + 1, to.indexOf('\r\n'));

             From = data.substring(data.indexOf('From'), data.length);
            From = From.substring(From.indexOf(' ') + 1, From.indexOf('\r\n'));

           

            contact = data.substring(data.indexOf('Contact'), data.length);

            contact = contact.substring(contact.indexOf('<')+1, contact.indexOf('>'));

            pc.setRemoteDescription(new RTCSessionDescription({type: 'answer', sdp: ok}), function(){

              console.log("Remote Description Success")

              linh_ws.send(getMsgACK(ua.taget, contact, via, to, From));
          }, 


              function(){console.log("Remote Description Error")});

         }

}

function processIncoming(ua, data){

	console.log("processIncoming...");

	console.log('incoming.... - get sdp');


   if(data.indexOf('SIP/2.0 407') != -1)// resend ok 
   {
        

        via = data.substring(data.indexOf('Via'), data.length);
        via = via.substring(via.indexOf(' ') + 1, via.indexOf('\r\n'));

        to = data.substring(data.indexOf('To'), data.length);
        to = to.substring(to.indexOf(' ') + 1, to.indexOf('\r\n'));

        From = data.substring(data.indexOf('From'), data.length);
        From = From.substring(From.indexOf(' ') + 1, From.indexOf('\r\n'));

        ua.taget = From.substring(From.indexOf('sip:') + 4, From.indexOf('@'));

        authenticate = Parser.parseMessage(data);
      
            nonce = authenticate[1];
        
            nonce = nonce.split('=');

            nonce = nonce[1];

            nonce = nonce.replace("\"", "");

            nonce = nonce.replace("\"", "");

        console.log(nonce);

        linh_ws.send(getOKInvite2(ua.taget, ua.contact, via, to, From, ua.callID, ua.offerSDP, nonce));

   }else  if(data.indexOf('INVITE') === 0)
   {


        index = data.indexOf('Content-Length:');
            sdp = data.substring(index, data.length);
            sdp = sdp.substring(sdp.indexOf('\n'), sdp.length);

            console.log(sdp);
            //sdp = JSON.parse(sdp);

            //console.log(sdp);

            //offer = new RTCSessionDescription(sdp);
            //pc.setRemoteDescription(offer);

            var ok = sdp.substring(sdp.indexOf('v'), sdp.length)

            via = data.substring(data.indexOf('Via'), data.length);
            via = via.substring(via.indexOf(' ') + 1, via.indexOf('\r\n'));

             to = data.substring(data.indexOf('To'), data.length);
            to = to.substring(to.indexOf(' ') + 1, to.indexOf('\r\n'));

             From = data.substring(data.indexOf('From'), data.length);
            From = From.substring(From.indexOf(' ') + 1, From.indexOf('\r\n'));

            callID = data.substring(data.indexOf('Call-ID'), data.length);
            callID = callID.substring(callID.indexOf(' ') + 1, callID.indexOf('\r\n'));

            ua.callID = callID;
           

            contact = data.substring(data.indexOf('Contact'), data.length);

            ua.contact = contact.substring(contact.indexOf('<')+1, contact.indexOf('>'));



             linh_ws.send(getTrying(via, to, From, callID));
             linh_ws.send(getRinging(via, to, From, callID));


            initRTCWithRemoteSDP(ok, function(sdp_offer){

                ua.offerSDP = sdp_offer;
                linh_ws.send(getOKInvite(ua.taget, ua.contact, via, to, From, ua.callID, sdp_offer));
            });


   }


            
}


function answer(){
     pc.createAnswer(function(answer) {

                console.log("peer connecttion - answer ok ");

                console.log(answer.sdp);

                pc.setLocalDescription(answer, function() {
                    console.log("peer connecttion - setLocalDescription  ok");
                    ua.offerSDP = answer.sdp;
                    linh_ws.send(getOKInvite(ua.taget, ua.contact, via, to, From, ua.callID, answer.sdp));
                }, onfailure);

             }, onfailure, sdpConstraints);


       function onfailure(e){
            console.log("peer connecttion - answer - onfailure");
            console.log(e);
       }

}

function getRTCPeer(){
 
      pc = new RTCPeerConnection(iceServers, optional);    

      pc.onicecandidate = function (e) {
        	console.log("peer connecttion - on ice candidate");
      };

      pc.onaddstream = function (obj) {
               
      	console.log("onaddstream");
        console.log(obj.stream);

        vid = document.getElementById("video");
            vid.src =  URL.createObjectURL(obj.stream);
       };


      pc.onsignalingstatechange = function(ev) {
                console.log("onsignalingstatechange event detected!");
                console.log(ev);
      };

      return pc;
}


function initRTCWithRemoteSDP(sdp, okFn){


	   	pc = getRTCPeer();

	    pc.setRemoteDescription(new RTCSessionDescription({type: 'offer', sdp: sdp}), function(){

              console.log("Remote Description Success");

             /* pc.createAnswer(function(answer) {

		            console.log("peer connecttion - answer ok ");

		            console.log(answer.sdp);

		            pc.setLocalDescription(answer, function() {
		                console.log("peer connecttion - setLocalDescription  ok");
		                okFn(answer.sdp);
		            }, onfailureLocal);

      		   }, onfailureCreateOffer, sdpConstraints);*/
             
          }, remoteDescriptionError);

       

       function onfailureLocal(e){
            console.log("peer connecttion - onfailureLocal");
            console.log(e);
       }

       function onfailureCreateOffer(e){
            console.log("peer connecttion -  onfailureCreateOffer");
            console.log(e);
       }

       function remoteDescriptionError(){
       		console.log("Remote Description Error")
       }


}



