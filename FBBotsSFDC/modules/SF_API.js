"use strict";

var nForceAuth = require('nforce'),
SFclientId = process.env.SF_CONSUMER_KEY,
SFSecret = process.env.SF_CONSUMER_SECRET,
SFusername = process.env.SF_USER,
SFpassword = process.env.SF_PASSWORD
;

var connection = nForceAuth.createConnection({
	clientId: SFclientId,
	clientSecret: SFSecret,
	redirectUri: 'http://localhost:3000/oauth/_callback',
	mode: 'single',
	autoRefresh:true});

connection.authenticate({ username: SFusername, password: SFpassword }, function(err,resp){
	 if (err) {
         console.log("Authentication error - " + err);
     } else {
         console.log('Authentication successful. Cached Token: ' + connection.oauth.access_token);
     }
});

exports.IntialIntract = function(sender){
		var q = "SELECT Id, Name, Title, Account.Name, Phone, MobilePhone, Email, FacebookID__c FROM Contact WHERE FacebookId__c = 'ID10153535497712539'";
	connection.query({query:q}, function(err,resp){
		if(err){
			console.log(err);
		} else if (resp.records && resp.records.length>0){
		resp.records.forEach(function(rec){
			console.log('CONTACT NAME:' + rec.get('Id') + '' + rec.get('Name'));
		});
		}
	});
};

module.exports = connection;
