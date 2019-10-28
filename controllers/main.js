var lineReader = require("line-reader");
var registeredUsers = [];

function sendPage(fileName, res) {
    var html = '';

    // Read the file one line at a time.
    lineReader.eachLine(fileName,
        /**
         * Append each line to string html.
         * Send the contents of html to the client
         * after the last line has been read.
         * @param line the line read from the file.
         * @param last set to true after the last line.
         */
        function(line, last) {
            html += line + '\n';

            if (last) {
                res.send(html);
                return false;
            } else {
                return true;
            }
        });
}
module.exports.index = function(req, res, next)  {  
    res.render('index', { title: 'Authentication Demo' });  
    console.log('Cookies: ', req.cookies);
};
module.exports.get_authentication = function(req, res) {
    res.render('authentication');
};

module.exports.post_authentication = function(req, res) {
    sendPage('sample.html',res);
};
