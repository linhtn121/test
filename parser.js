

Parser ={};

var array_message = [];

Parser.parseMessage = function(data) {
  
   var array_dt = data.split('\r\n');
 

   for ( index in array_dt) {
      line = array_dt[index];

      if(line.indexOf(':') != -1)
      {
          hc = line.split(':');
          header = hc[0];
          content = hc[1];
          array_message[header] = content;

          if(header.indexOf('Authenticate') != -1){
              return content.split(',');
          }
      }

  
  }


  return array_message;

    
};

function debugerror(ms)
{
  console.log(ms);
}