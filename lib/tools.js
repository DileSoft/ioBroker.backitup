const fs = require('fs');

function getDate(d) {
    d = d || new Date();

    return d.getFullYear() + '_' +
        ('0' + (d.getMonth() + 1)).slice(-2) + '_' +
        ('0' + d.getDate()).slice(-2) + '-' +
        ('0' + d.getHours()).slice(-2) + '_' +
        ('0' + d.getMinutes()).slice(-2) + '_' +
        ('0' + d.getSeconds()).slice(-2);
}

function copyFile(source, target, cb) {
    const rd = fs.createReadStream(source);
    rd.on('error', err => {
        if (cb) {
            cb(err);
            cb = null;
        }
    });

    const wr = fs.createWriteStream(target);
    wr.on('error', err => {
        if (cb) {
            cb(err);
            cb = null;
        }
    });

    wr.on('close', ex => {
        if (cb) {
            cb();
            cb = null;
        }
    });
    rd.pipe(wr);
}

/**
 * looks for iobroker home folder
 *
 * @returns {string}
 */
function getIobDir() {
    const utils = require('@iobroker/adapter-core');
    const path = require('path');
    //const tools = require(utils.controllerDir + '/lib/tools.js');
    let backupDir = path.join(utils.getAbsoluteDefaultDataDir(), 'iobroker.json').replace(/\\/g, '/');
    let parts = backupDir.split('/');
    parts.pop(); // iobroker.json
    parts.pop(); // iobroker-data.json
    return parts.join('/');
}

// function to create a date string                               #
const MONTHS = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    de: ['Januar', 'Februar', 'Maerz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    ru: ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'],
    es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    it: ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'],
    pt: ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'],
    pl: ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
};
const timePattern = {
    en: '%d at %t Hours',
    de: '%d um %t Uhr',
    ru: '%d в %t'
};

function padding0(number) {
    return (number < 10) ? '0' + number : number;
}

function getTimeString(systemLang, date) {
    date = date || new Date();

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    return (timePattern[systemLang] || timePattern.en)
        .replace('%d', padding0(day) + '. ' + (MONTHS[systemLang] || MONTHS.en)[monthIndex] + ' ' + year)
        .replace('%t', padding0(hours) + ':' + padding0(minutes));
}

// Next Backup Time
function getNextTimeString(systemLang, nextdate) {

    let day = nextdate.getDate();
    let monthIndex = nextdate.getMonth();
    let year = nextdate.getFullYear();
    let hours = nextdate.getHours();
    let minutes = nextdate.getMinutes();

    return (timePattern[systemLang] || timePattern.en)
        .replace('%d', padding0(day) + '. ' + (MONTHS[systemLang] || MONTHS.en)[monthIndex] + ' ' + year)
        .replace('%t', padding0(hours) + ':' + padding0(minutes));
}

function _(word, systemLang) {
    const translations = require(`../admin/i18n/${systemLang ? systemLang : 'en'}/translations.json`);

    if (translations[word]) {
        return translations[word];
    } else {
        console.warn('Please translate in translations.json: ' + word);
        return word;
    }
}

function getSize(bytes) {
    if (bytes > 1024 * 1024 * 512) {
        return Math.round(bytes / (1024 * 1024 * 1024) * 10) / 10 + ' GiB';
    } else if (bytes > 1024 * 1024) {
        return Math.round(bytes / (1024 * 1024) * 10) / 10 + ' MiB';
    } else if (bytes > 1024) {
        return Math.round(bytes / (1024) * 10) / 10 + ' KiB';
    } else {
        return bytes + ' bytes';
    }
}

module.exports = {
    getDate,
    getSize,
    copyFile,
    getIobDir,
    getTimeString,
    getNextTimeString,
    _
};