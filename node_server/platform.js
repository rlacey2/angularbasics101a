// platform.js

// detect the necessary hardware platform that the app is running in to make informed startup decisions.
// expose one object with values

var cfEnv = require('cfenv'); // for environment variables, bluemix only
//var os = require('os');
var cfCore = cfEnv.getAppEnv();
var liveUrl = "xxxxx.eu-gb.mybluemix.net" 
var livePrefix = "xxxxx";
var configuration = {};
 
var configure = function( ) {  

    // detect the platform  localhost vs bluemix vs heroku
	configuration.architecture =  undefined;
	
	configuration.isLocalHost = true;
	configuration.liveSystem = false;  // refers to the live system url
	
//	configuration.hostname =  os.hostname() ;
 
	if (process.env.NODE && process.env.NODE.indexOf("heroku") > -1)
		{		   
			configuration.architecture = "heroku";
		   	configuration.isLocalHost = false;
			configuration.liveSystem = true;  // ALWAYS
			configuration.port =  (process.env.PORT || 5000)
			// host generation  https://gist.github.com/tobius/6381034
			configuration.host =  'heroku generate this?' ;				
		} 
		else
			if (process.env.VCAP_SERVICES) { // exposed by bluemix in the cloud
				configuration.architecture  = "bluemix";
				configuration.absUrl = cfCore.url;
				configuration.isLocalHost = false;
				// may be live system or test system
				if (cfCore.name.indexOf(livePrefix) > -1  ) //  contains livePrefix IF LIVE SYSTEM
					{
						configuration.liveSystem = true;		
					}
				else
					{
						configuration.liveSystem = false; // its localhost or jmbtest || jmbaws which default to test data		
					}
					
				if (process.env.cloud_controller_url.indexOf("bluemix.net") > -1 )
					{ 				
						configuration.port = (process.env.VCAP_APP_PORT || 8080);        // Diego is 8080	
						configuration.host = (process.env.VCAP_APP_HOST || '0.0.0.0');	 // Diego is 0.0.0.0					
					}						
				}
			else // must be localhost
			{
				
				var portNo = (process.argv[2] || 3443); // argv[2] is the first user passed arg, if present is the port number for localhost
				console.log(portNo);					
				configuration.architecture = "localhost";	 
				configuration.port =  portNo || 3443;
				configuration.host =  'localhost' ;
			}
 
	console.log("Platform Running on: " + configuration.architecture + "  Port: " + configuration.port);
 
    return configuration;
} 
 
	var getconfiguration = function( ) {  
		return configuration;
	}
 
    configure();  // run once
 
var platform = { // exposed api on the server 
	 configure : getconfiguration 
     	 
};
 
module.exports = platform;