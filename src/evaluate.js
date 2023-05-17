const evaluate = {
    'equal to': function(a, b) { return a == b },
    'greater than': function(a, b) { return a > b },
    'less than': function(a, b) { return a < b },
    'contains': function(a, b) { return a.includes(b) },
    'doesn\'t contain': function(a, b) { return !a.includes(b) },
}

export default evaluate