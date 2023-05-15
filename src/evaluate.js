const evaluate = {
    'eq': function(a, b) { return a === b },
    'gt': function(a, b) { return a > b },
    'lt': function(a, b) { return a < b },
    'in': function(a, b) { return a.includes(b) },
    'ni': function(a, b) { return !a.includes(b) },
}

export default evaluate