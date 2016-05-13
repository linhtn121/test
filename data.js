var init_ms = function(){

    ms2 = "REGISTER sip:118.69.135.152 SIP/2.0\r\nVia: SIP/2.0/WS 192.0.2.172;branch=z9hG4bK7483045\r\nMax-Forwards: 69\r\nTo: <sip:8668@118.69.135.152>\r\nFrom: <sip:8668@118.69.135.152>;tag=lra568ui9l\r\nCall-ID: qeus547gffbdbmkfemhpkm\r\nCSeq: 3 REGISTER\r\nAuthorization: Digest algorithm=MD5, username=\"8668\", realm=\"118.69.135.152\", nonce=\"57039cc2000049db5d8ea6caa49584964651c4acfbadff6a\", uri=\"sip:118.69.135.152\", response=\"a7d5ed5162cdfe8456182cb36a953c30\"\r\nContact: <sip:7kof7ob4@192.0.2.172;transport=ws>;+sip.ice;reg-id=1;+sip.instance=\"<urn:uuid:6838679e-b612-4449-a220-6d56acf9e60b>\";expires=3600\r\nExpires: 3600\r\nAllow: INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER\r\nSupported: path,gruu,outbound\r\nUser-Agent: JsSIP 0.7.11\r\nContent-Length: 0\r\n\r\n";

    ms3 = "REGISTER sip:127.0.0.1 SIP/2.0\nVia: SIP/2.0/WS 192.0.2.236;branch=z9hG4bK7997476\nMax-Forwards: 69\nTo: <sip:linh@127.0.0.1>\nFrom: <sip:linh@127.0.0.1>;tag=kjf24s0nil\r\nCall-ID: 98fct2nkb37uu2nb2vt143\nCSeq: 2 REGISTER\nContact: <sip:t85nd3rv@192.0.2.236;transport=ws>;+sip.ice;reg-id=1;+sip.instance=\"<urn:uuid:c76d72a7-56bf-450b-8b39-d53805c9d32f>\";expires=3600\nExpires: 3600\nAllow: INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER\nSupported: path,gruu,outbound\nUser-Agent: JsSIP 0.7.11\nContent-Length: 0\r\n\r\n";

    ms1 = "REGISTER sip:118.69.135.152 SIP/2.0\r\nVia: SIP/2.0/WS 192.0.2.199;branch=z9hG4bK3883774\r\nMax-Forwards: 69\r\nTo: <sip:8668@118.69.135.152>\r\nFrom: <sip:8668@118.69.135.152>;tag=umudvin1cm\r\nCall-ID: a70729ukmkn7d0n0ofdii8\r\nCSeq: 2 REGISTER\r\nAuthorization: Digest algorithm=MD5, username=\"8668\", realm=\"118.69.135.152\", nonce=\"57047cc20000016dd588f27508c9dae96aa7b750d68380b5\", uri=\"sip:118.69.135.152\", response=\"8f151138113b413e237548455ef489d\"\r\nContact: <sip:qjkl16po@192.0.2.199;transport=ws>;+sip.ice;reg-id=1;+sip.instance=\"<urn:uuid:0cbc65a6-450a-4ac5-a575-491300ca0ac2>\";expires=3600\r\nExpires: 3600\r\nAllow: INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER\r\nSupported: path,gruu,outbound\r\nUser-Agent: JsSIP 0.7.11\r\nContent-Length: 0\r\n";
}();

var CSeq = 0;

function  getMsg(){
   var msg = '', header, length, idx, 
      supported = [];

    msg += 'REGISTER' + ' ' + 'sip:118.69.135.152' + ' SIP/2.0\r\n';

  headers = [];

  headers['Via'] = ["SIP/2.0/WS 192.0.2.122;branch=6546456z9hG4bK4715447"];
  headers['To'] = ["<sip:8668@118.69.135.152>"];
  headers['From'] = ["<sip:8668@118.69.135.152>;tag=nql888bcv34vo"];
  headers['Max-Forwards'] =0;
  headers['Call-ID'] = ["423434rr39bvp464636htfr5453534563454623p957ckl"];
  headers['Expires'] = [36000];

  headers['Contact'] = ["<sip:3msofkt6@192.0.2.122;transport=ws>;+sip.ice;reg-id=1;+sip.instance=\"<urn:uuid:5116644d-b085-4479-bc99-4faa21e3891bca>\";expires=3600"];
  ua.myContact = "<sip:3msofkt6@lnv1sr7sv9b1.invalid;transport=ws>"

  CSeq ++;
  headers['CSeq'] = [CSeq + " REGISTER"];


    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

    supported.push('path', 'gruu');
    supported.push('outbound');
    // Allow
    msg += 'Allow: '+ "INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER" +'\r\n';
    msg += 'Supported: ' +  supported +'\r\n';
   	msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';

  

	 if(nonce != null){
	 	 da = new DigestAuthentication();

	  	da.authenticate(nonce, "REGISTER");

	  	da = da.toString();

	  	 msg += "Authorization: " + da +'\r\n';

	  	console.log(da);
	}
	     
	  msg += 'Content-Length: 0\r\n\r\n';
 
	 console.log("send: \n" + msg);
    
    return msg;
 
}

var getMsgACK = function(taget, contact, via, to, From){

	var msg = '', header, length, idx, 
	supported = [];

	msg += 'ACK' + ' ' + contact + ' SIP/2.0\r\n';

	  headers = [];

	  headers['Via'] = [via];
	  headers['To'] = [to];
	  headers['From'] = [From];
	  headers['Max-Forwards'] =[70];
	  headers['Call-ID'] = ["423434rr39636htfr5453534563454623p957ckl"];
	 
	  
	  headers['CSeq'] = [CSeq + " ACK"];

    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

    supported.push('outbound');
  	msg += 'Supported: ' +  supported +'\r\n';
   	msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';
     
	msg += 'Content-Length: 0\r\n\r\n';
 
 	console.log("send: \n" + msg);
    
    return msg;
}

var getOKInvite = function(taget, contact, via, to, From, callID,offerSDP){

  var msg = '', header, length, idx, 
  supported = [];

  msg += 'SIP/2.0 200 OK\r\n';

    headers = [];

    headers['Via'] = [via];
    headers['To'] = [to + ";" + toTag];
    headers['From'] = [From];
    headers['Max-Forwards'] =[70];
    headers['Call-ID'] = [callID];

    headers['Contact'] = [ua.myContact];
    
    headers['CSeq'] = [CSeq + " INVITE"];

    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

    supported.push('path', 'gruu');
    supported.push('outbound');

    msg += 'Allow: '+ "INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER" +'\r\n';
    msg += 'Supported: ' +  supported +'\r\n';
    msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';
     
  
    msg += 'Content-Type: application/sdp\r\n';

    msg += 'Content-Length: ' + ua.offerSDP.length + '\r\n\r\n';
    msg += ua.offerSDP;
   
 
  console.log("send getOKInvite1: \n" + msg);
    
    return msg;
}


var getOKInvite2 = function(taget, contact, via, to, From, callID,offerSDP, nonce ){

  var msg = '', header, length, idx, 
  supported = [];

  msg += 'OK' + ' ' + contact + ' SIP/2.0\r\n';

    headers = [];

    headers['Via'] = [via];
    headers['To'] = [to + ";" + toTag];
    headers['From'] = [From];
    headers['Max-Forwards'] =[70];
    headers['Call-ID'] = [callID];
    headers['Contact'] = [ua.myContact];
   

    
    headers['CSeq'] = [CSeq + " INVITE"];

    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

    supported.push('path', 'gruu');
    supported.push('outbound');

    msg += 'Allow: '+ "INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER" +'\r\n';

    msg += 'Supported: ' +  supported +'\r\n';
    msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';

     if(nonce != null){
     da = new DigestAuthentication();

      da.authenticate(nonce, "INVITE");

      da = da.toString();

       msg += "Proxy-Authorization: " + da +'\r\n';

      console.log("getOKInvite2");
      console.log(da);
  }

     
  
    msg += 'Content-Type: application/sdp\r\n';

    msg += 'Content-Length: ' + ua.offerSDP.length + '\r\n\r\n';
    msg += ua.offerSDP;
   
 
    console.log("send: getOKInvite2 \n" + msg);
    
    return msg;

}

var getTrying = function(via, to, From, callID) {
    var msg = '', header, length, idx, 
  supported = [];

  msg += 'SIP/2.0 100 Trying\r\n';

    headers = [];

    headers['Via'] = [via];
    headers['To'] = [to];
    headers['From'] = [From];
    headers['Max-Forwards'] =[70];
    headers['Call-ID'] = [callID];
   
    
    headers['CSeq'] = [CSeq + " INVITE"];

    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

   
    supported.push('outbound');

    msg += 'Supported: ' +  supported +'\r\n';
    msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';

    msg += 'Content-Length: 0\r\n\r\n';
   
    console.log("send: \n" + msg);
    
    return msg;

}

var toTag = "tag=3jj1ultfg11111";

var getRinging = function(via, to, From, callID){
    var msg = '', header, length, idx, 
  supported = [];

  msg += 'SIP/2.0 180 Ringing\r\n';

    headers = [];

    headers['Via'] = [via];
    headers['To'] = [to + ";" + toTag];
    headers['From'] = [From];
    headers['Max-Forwards'] =[70];
    headers['Call-ID'] = [callID];

    headers['Contact'] = [ua.myContact];

    headers['CSeq'] = [CSeq + " INVITE"];

    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

   
    supported.push('outbound');

    msg += 'Supported: ' +  supported +'\r\n';
    msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';

    msg += 'Content-Length: 0\r\n\r\n';
   
    console.log("send: \n" + msg);
    
    return msg;
  
}

var getMsgInvite = function(taget){

	var msg = '', header, length, idx, 
      supported = [];

    msg += 'INVITE' + ' ' + 'sip:' + taget +'@118.69.135.152' + ' SIP/2.0\r\n';

  headers = [];

  headers['Via'] = ["SIP/2.0/WS 192.0.2.122;branch=6546456z9hG4bK4715447"];
  headers['To'] = ["<sip:" + taget +"@118.69.135.152>"];
  headers['From'] = ["<sip:8668@118.69.135.152>;tag=nql888bcv34vo"];
  headers['Max-Forwards'] =0;
  headers['Call-ID'] = ["423434rr39636htfr5453534563454623p957ckl"];
  headers['Expires'] = [36000];

  headers['Contact'] = ["<sip:3msfdskt6@192.0.2.122;transport=ws>;+sip.ice;reg-id=1;+sip.instance=\"<urn:uuid:5116644d-b085-4479-bc9fds1e3891bca>\";expires=3600"];


  CSeq=9
  headers['CSeq'] = [CSeq + " INVITE"];


    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

    supported.push('path', 'gruu');
    supported.push('outbound');
    // Allow
    msg += 'Allow: '+ "INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER" +'\r\n';
    msg += 'Supported: ' +  supported +'\r\n';
   	msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';

  

	 if(nonce != null){
	 	 da = new DigestAuthentication();

	  	da.authenticate(nonce, "INVITE");

	  	da = da.toString();

	  	 msg += "Proxy-Authorization: " + da +'\r\n';

	  	console.log(da);
	}


		msg += 'Content-Type: application/sdp\r\n';
		 
	     if(ua.offerSDP === null){
	  		msg += 'Content-Length: 0\r\n\r\n';   	
	     }
	     else
	     {
	     	msg += 'Content-Length: ' + ua.offerSDP.length + '\r\n\r\n';
	     	msg += ua.offerSDP;
	     }

	  
 
	 console.log("send: \n" + msg);
    
    return msg;
}
var getMsgInvite2 = function(taget){

	var msg = '', header, length, idx, 
      supported = [];

    msg += 'INVITE' + ' ' + 'sip:' + taget +'@118.69.135.152' + ' SIP/2.0\r\n';

  headers = [];

  headers['Via'] = ["SIP/2.0/WS 192.0.2.122;branch=6546dda4715447"];
  headers['To'] = ["<sip:" + taget +"@118.69.135.152>;tag=snf89mp7n1o"];
  headers['From'] = ["<sip:8668@118.69.135.152>;tag=nql88ad34vo"];
  headers['Max-Forwards'] =0;
  headers['Call-ID'] = ["423434rr3963687678454623p957ckl"];
  headers['Expires'] = [36000];

  headers['Contact'] = ["<sip:3msfdskt6@192.0.2.122;transport=ws>;+sip.ice;reg-id=1;+sip.instance=\"<urn:uuid:5116644d-b085-4479-bc9ffsdfe3891bca>\";expires=3600"];


  CSeq ++;
  headers['CSeq'] = [CSeq + " INVITE"];


    for (header in this.headers) {
      length = this.headers[header].length;
      for (idx = 0; idx < length; idx++) {
        msg += header + ': ' + this.headers[header][idx] + '\r\n';
      }
    }

    supported.push('path', 'gruu');
    supported.push('outbound');
    // Allow
    msg += 'Allow: '+ "INVITE,ACK,CANCEL,BYE,UPDATE,MESSAGE,OPTIONS,REFER" +'\r\n';
    msg += 'Supported: ' +  supported +'\r\n';
   	msg += 'User-Agent: ' + "JsSIP linh" +'\r\n';

  

	 if(nonce != null){
	 	 da = new DigestAuthentication();

	  	da.authenticate(nonce, "INVITE");

	  	da = da.toString();

	  	 msg += "Proxy-Authorization: " + da +'\r\n';

	  	console.log(da);
	}


		msg += 'Content-Type: application/sdp\r\n';
		 
	     if(ua.offerSDP === null){
	  		msg += 'Content-Length: 0\r\n\r\n';   	
	     }
	     else
	     {
	     	msg += 'Content-Length: ' + ua.offerSDP.length + '\r\n\r\n';
	     	msg += ua.offerSDP;
	     }

	  
 
	 console.log("send: \n" + msg);
    
    return msg;
}

var url_websocket = "ws://118.69.135.152:7080";
var linh_ws;

var initTransporter = function()
{
	  try {
      //linh_ws = new nativeWebSocket("ws://127.0.0.1:8080", 'sip');
    	linh_ws = new WebSocket(url_websocket,'sip');
    } catch(e) {
        	console.log('error connecting to WebSocket ');
	        console.log(e);
    }

    linh_ws.binaryType = 'arraybuffer';

    
    linh_ws.onopen = function() {
        console.log('linh onopen');
	   //linh_ws.send(getMsg());
  	
   		ua.onConnected ();
    }

    


    linh_ws.onclose = function(e) {
          console.log('linh onclose');
    };

    linh_ws.onmessage = function(e) {
        
        ua.onReceiveResponse(e.data);

    };

    linh_ws.onerror = function(e) {
        console.log('linh onerror');
  	    console.log(e);
    };
};



function send_register(ws)
{
    ws.send(getMsg());
}

function receiveResponse(response)
{
    message = Parser.parseMessage(response.data);
}





function register(){
	send_register();
}