const evaluate = {
    'is': function(a, b) { return a === b },
    'is greater than': function(a, b) { return a > b },
    'is less than': function(a, b) { return a < b },
    'contains': function(a, b) { return a.includes(b) },
    'doesn\'t contain': function(a, b) { return !a.includes(b) },
}

export default evaluate