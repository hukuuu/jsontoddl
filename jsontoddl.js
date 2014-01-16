var through = require('through');

function createParser(table) {
  return function(json) {
    var keys = Object.keys(json),
      statement = "insert into " + table + " ( " + keys.join(', ') + " ) values ( ";

    statement += keys.map(function(key) {
      var value = json[key];
      if (typeof value === 'string') return "'" + escape(value) + "'"
      return value
    }).join(', ')
    statement += " );\n"
    this.queue(statement)
  }
}
function escape (str) {
  return str.replace(/'/g,"''");
}

module.exports = function(table) {
  return through(createParser(table), function() {
    return this.queue(null)
  })
}