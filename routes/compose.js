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
	    AWSAccessKeyID: "AKIAJYZCRKQOMTUOA6HQ",
	    AWSSecretKey: "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"
	});
  
  // using swig template to insert content
  swig.renderFile("./templates/email-tpl.html", { content: htmlMessage }, function(err, output) {
    
    // juice for converting internal styles to inline styles
    var options = { url: 'filePath' };
    
    juice.juiceContent(output, options, function(err, html) {
    	// Message object
    	var message = {

    	    // sender info
    	    from: 'Sentinel <developers@mindhelix.com>',

    	    // Comma separated list of recipients
    	    to: '"Jinsu Mathew" <jinsu@mindhelix.com>',

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



/*
 * swig it up
 */

/*exports.swiging = function(req, res) {
  // some markdown before swig
  var content = markdown.toHTML("Hello *World*!");
  
  swig.renderFile("./templates/emailtpl.html", {  
    name: "John Doe",
    content: content,
    now: new Date()
  }, function(err, output) {
    console.log("\nBefore juice...\n" + output);
    console.log("\nAfter juice...\n");
    // juice it up
    var options = {
      url: 'filePath'
    }
    juice.juiceContent(output, options, function(err, html) {
      console.log(html);
      res.send("See the console for debugging");
    });
  });
  
};*/