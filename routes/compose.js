var nodemailer = require("nodemailer")
  , fs = require("fs")
  , pathlib = require("path");


/*
 * GET compose page.
 */

exports.index = function(req, res) {
  res.render('compose', { title: 'Tippler: Compose new mail', nav: 'compose' });
};


/*
 * POST compose email
 */

exports.compose = function(req, res) {
  
	//create SES transport
	var transport = nodemailer.createTransport("SES", {
	    AWSAccessKeyID: "AKIAJYZCRKQOMTUOA6HQ",
	    AWSSecretKey: "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"
	});
	
	
	// Message object
	var message = {

	    // sender info
	    from: 'Sentinel <developers@mindhelix.com>',

	    // Comma separated list of recipients
	    to: '"Jinsu Mathew" <jinsu@mindhelix.com>',

	    // Subject of the message
	    subject: 'Sentinel Test Mail', 

	    // plaintext body
	    text: req.body.mailmsg

		// HTML body
	   // html:'<p><b>Hello</b> to myself <img src="cid:note@node"/></p>'+
	     //    '<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@node"/></p>'
	};
	
	//send mail
	transport.sendMail(message, function(error){
	    if(error){
        var res_json = { status: 'EMAIL_NOT_SEND', result: error.message };
        res.status(200).json(res_json);
	    }
    
      var res_json = { status: 'OK' };
      res.status(200).json(res_json);
	});
  
  
  
  
};