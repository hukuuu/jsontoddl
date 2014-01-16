var fs = require('fs'),
  JSONStream = require('JSONStream'),
  es = require('event-stream'),
  through = require('through'),
  ddlParser = require('./jsontoddl')('accounts')


var fileStream = fs.createReadStream(__dirname + '/testFile.json'),
  parser = JSONStream.parse('*'),
  logger = es.mapSync(function (data) {
    console.log('---');
    console.log(data);
    return data
  })

fileStream
  .pipe(parser)
  .pipe(ddlParser)
  .pipe(logger)
  .pipe(fs.createWriteStream(__dirname+'/parsed.txt'))


  ////////////
  // #!node //
  ////////////
