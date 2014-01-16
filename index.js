var fs = require('fs'),
  JSONStream = require('JSONStream'),
  es = require('event-stream'),
  through = require('through'),
  validUrl = require('valid-url'),
  request = require('request'),
  argv = require('optimist')
    .usage('Converts json array to sql insert statements.')
    .demand(['i', 'o', 't'])
    .describe('i', 'The .json file for conversion ( may be a url pointing to json service ).')
    .describe('o', 'The location to put the sql.')
    .describe('t', 'The table name for the sql.')
    .argv,

  input = argv.i,
  output = argv.o,
  tableName = argv.t,
  ddlParser = require('./jsontoddl')(tableName)


var inputStream = validUrl.isUri(input) ? request(input) : fs.createReadStream(input),
  parser = JSONStream.parse('*'),
  logger = es.mapSync(function(data) {
    console.log('---')
    console.log(data)
    return data
  })

  inputStream
    .pipe(parser)
    .pipe(ddlParser)
  // .pipe(logger)
  .pipe(fs.createWriteStream(output))


    ////////////
    // #!node //
    ////////////