// Italian

jQuery.extend( jQuery.fn.pickadate.defaults, {
    monthsFull: [ 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre' ],
    monthsShort: [ 'gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic' ],
    weekdaysFull: [ 'domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato' ],
    weekdaysShort: [ 'dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab' ],
    today: 'Oggi',
    clear: 'Cancella',
    close: 'Chiudi',
    firstDay: 1,
    format: 'dddd d mmmm yyyy',
    formatSubmit: 'yyyy/mm/dd',
    labelMonthNext: 'Mese successivo',
    labelMonthPrev: 'Mese precedente',
    labelMonthSelect: 'Seleziona un mese',
    labelYearSelect: 'Seleziona un anno'
});

jQuery.extend( jQuery.fn.pickatime.defaults, {
    clear: 'Cancella',
    format: 'HH:i',
    formatSubmit: 'HH:i'
});
