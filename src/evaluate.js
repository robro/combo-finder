const evaluate = {
    'equal to': function(a, b) { return a == b },
    'greater than': function(a, b) { return a > b },
    'less than': function(a, b) { return a < b },
    'contains': function(a, b) { return a.includes(b) },
    'doesn\'t contain': function(a, b) { return !a.includes(b) },
    'starts with': function(a, b) { return a.startsWith(b) },
    'ends with': function(a, b) { return a.endsWith(b) },
}

export default evaluate