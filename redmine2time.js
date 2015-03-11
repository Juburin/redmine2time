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
    var $select = $('<select name="task" id="task_selector"><option value=""></option><option value="Entwicklung">Entwicklung</option><option value="Bug Fixing">Bug Fixing</option><option value="Deployment">Deployment</option><option value="Testing">Testing</option><option value="Kundenkommunikation">Kundenkommunikation</option><option value="Interne Kommunikation">Interne Kommunikation</option><option value="Dokumentation">Dokumentation</option><option value="Reinzeichnung">Reinzeichnung</option><option value="Layout erstellt">Layout erstellt</option><option value="Bühne produziert">Bühne produziert</option><option value="Visual produziert">Visual produziert</option><option value="Research">Research</option></select>');
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