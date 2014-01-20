var nodemailer = require("nodemailer")
  , fs = require("fs")
  , pathlib = require("path")
  , juice = require('juice')
  , swig = require('swig')
  , markdown = require('markdown').markdown;


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
  
  var subject = req.body.mailsub
    , htmlMessage = markdown.toHTML(req.body.mailmsg); 
  
  
	//create SES transport
	var transport = nodemailer.createTransport("SES", {
	    AWSAccessKeyID: "Put your AWS Access Key here",
	    AWSSecretKey: "Put your AWS Secret Key here"
	});
  
  // using swig template to insert content
  swig.renderFile("./templates/email-tpl.html", { content: htmlMessage }, function(err, output) {
    
    // juice for converting internal styles to inline styles
    var options = { url: 'filePath' };
    
    juice.juiceContent(output, options, function(err, html) {
    	// Message object
    	var message = {

    	    // sender info / your ses registered sender email id
    	    from: 'John Doe <johndoe@tippler.com>',

    	    // Comma separated list of recipients
    	    to: 'Amy Jane <amyjane@tippler.com>',

    	    // Subject of the message
    	    subject: subject, 

    	    // plaintext body
    	    text: req.body.mailmsg,

    		  // HTML body
    	    html: html
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
      
    });
    
  });
	
};