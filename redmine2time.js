if (!($ = window.jQuery)) {
    script = document.createElement( 'script' );
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
    script.onload=releasetheKraken;
    document.body.appendChild(script);
}
else {
    releasetheKraken();
}
function releasetheKraken() {
    // create the element:
    var h2 = $('#content h2').first();
    var $text = h2.text().substring(h2.text().indexOf('#'))+': '+$('#content .subject h3').text();
    var $container = $('<div id="redmine2time"><p id="redmine2time-text">' + $text + '</p></div>');
    var $close = $('<a id="redmine2time-close" href="#">X</a>');
    var $select = $('<select name="task" id="task_selector"><option></option><option>Entwicklung</option><option>Bug Fixing</option><option>Deployment</option><option>Testing</option><option>Kundenkommunikation</option><option>Interne Kommunikation</option><option>Dokumentation</option><option>Konzeption</option><option>Reinzeichnung</option><option>Layout erstellt</option><option>Bühne produziert</option><option>Visual produziert</option><option>Research</option></select>');
    $container.append($close);
    $container.append($select);

    // append it to the body:
    $('body').append($container);

    // style it:
    $container.css({
        zIndex: '99',
        color: 'white',
        fontFamily: 'Helvetica, Arial',
        position: 'fixed',
        top: '20px',
        right: '40%',
        width: '180px',
        minHeight: '70px',
        backgroundColor: '#FE7A15',
        padding: '10px',
        MozBoxShadow: '2px 2px 5px #000000',
        WebkitBoxShadow: '2px 2px 5px black',
        boxShadow: '2px 2px 5px black'
    });

    $close.css({
        color: 'white',
        position: 'absolute',
        bottom: '10px',
        right: '10px',
    });
    $select.css({
        width: '160px'
    });
}

function selectText(element) {
    var doc = document;
    var text = doc.getElementById(element);

    if (doc.body.createTextRange) { // ms
        var range = doc.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) { // moz, opera, webkit
        var selection = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

$('#redmine2time-close').on('click', function(event){
    event.preventDefault();
    $('#redmine2time').remove();
});
$('#redmine2time-text').on('dblclick', function(event){
    console.log("test");
    event.preventDefault();
    selectText('redmine2time-text');
});
$('#task_selector').on('change', function(event){
    event.preventDefault();
    $('#redmine2time-text').html($('#redmine2time-text').html() + '<span><br/> - ' + $(this).val() + '</span>');
});
$('#redmine2time').on('contextmenu', 'span', function(event) {
    $(this).remove();
    return false;
});
