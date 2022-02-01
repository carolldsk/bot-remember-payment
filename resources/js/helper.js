const { months } = require('./enum');

const getPayerName = month => {
    let names =  {"January":"Anderson", "February":"Mayara", "March":"Camila", "April":"Carol", "May":"Danilo", "June":"Anderson", "July":"Mayara", "August":"Camila", "September":"Carol", "October":"Danilo", "November":"Anderson", "December":"Mayara"};
    return names[`${month}`];

};

const getCurrentMonth = () => {
    let date   = new Date();
    let monthName = months[date.getMonth()]; // "July" (or current month)

    return monthName;
};

const getCurrentDay = () => {
    let day = new Date().toLocaleDateString("pt-BR", {timeZone: "America/Sao_Paulo"}).split('/',1).toString();
    return parseInt(day)
};


module.exports = { getPayerName, getCurrentMonth, getCurrentDay };