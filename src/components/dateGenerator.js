function dataGenerator () {
    const date = new Date
    const date2 = new Date(date.valueOf() - date.getTimezoneOffset() * 60000);
    return date2
}

module.exports = dataGenerator;