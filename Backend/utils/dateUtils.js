// utils/dateUtils.js

function parseDate(dateString) {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
}

function formatDate(date) {
    if (!date) return null;
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

module.exports = { parseDate, formatDate };
