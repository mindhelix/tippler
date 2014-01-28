# Tippler

Markdown mailer for your products. When you usually build a product there comes a situation you need to relay on third party mailing solutions like Chipmunk for your mailing campaigns or for your newsletters to be sent out to your subscribers. For our product [Sentinel](http://sentinelsos.com), we didn't want to used any third party solutions to manage our mailing list, we decided to make use of Amazon SES as our mail servers and we needed a simple interface to create content for mails and send it to our subscribers. So we created Tippler.

N.B. [Tippler](http://en.wikipedia.org/wiki/Tippler) is a breed of domestic homing pigeons.  
![Tippler](http://upload.wikimedia.org/wikipedia/en/5/55/Harshannon.jpg)  
Image source: [Wikipedia](http://en.wikipedia.org/wiki/Tippler)


## Basic aim and usage of Tippler

* Create mail content with easy to use markdown syntax. Tippler follows the [Daring Fireball](http://daringfireball.net/projects/markdown/syntax) markdown syntax
* Design email supported HTML and CSS templates with internal styles sheets, Tippler uses the [Swig](http://paularmstrong.github.io/swig/) template engine and [Juice](https://github.com/LearnBoost/juice) for converting internal styles to inline styles which are supported by email clients.
* Markdown will be parsed to HTML by Tippler and the parsed content will be inserted to the email template of your choice, which will be then sent to your users as email content.

## Contribute

Extend Tippler to suit your needs, by default Tippler used Amazon SES to send mails and a preset sender email id and recipient email id. Extend this project as you wish to load automatically your users from your mailing list as recipients and your own choice of mail server instead of Amazon SES. 

### Dependent Node modules:

* [Nodemailer](http://www.nodemailer.com/)
* [Juice](https://github.com/LearnBoost/juice)
* [Swig](http://paularmstrong.github.io/swig/)
* [Markdown-js](https://github.com/evilstreak/markdown-js)

Fork it and extend! Give a pull request when you think you have created some awesomeness.

### Installation

* Clone Tippler ```git clone git@github.com:mindhelix/tippler.git```
* Install dependent node modules ```cd tippler``` and ```npm install```
* Set your AWS Access key and Secret key in ```routes/compose.js``` file at ```line no. 30```
* Run tippler ```node app.js``` 
* The local node server port is set to ```3000``` by default. Change it in the ```app.js``` file if you need to.


N.B.: We know Tippler needs a config file badly, to set the AWS keys, server port, etc. We will try to add ASAP in the next push. Or if you can contribute, we are cool with it! as we have our hands full these days.

- A default email compatible template with internal style is provided: ```templates/email-tpl.html```. Edit this template or add your our templates with different styles to suit your needs. The template is passed to the swig template engine in ```compose.js``` file in ```routes```


\- [@jinmatt](https://github.com/jinmatt)