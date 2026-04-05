/* Calbar attorney search script file */

// Gets today's date
var d = new Date()
var weekday = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
var monthname = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var year = d.getFullYear();
var dateToday = weekday[d.getDay()] + ", " + monthname[d.getMonth()] + " " + d.getDate() + ", " + year;

var hide = false; // Initialize the "Display Status History" toggle icon

function wo(url, height, width) {
    wleft = (screen.width - width) / 2;
    wtop = (screen.height - height) / 2;
    if (wleft < 0) {
        wleft = 0;
    }
    if (wtop < 0) {
        wtop = 0;
    }
    var win = window.open(url, "mywin", "height=" + height + ",width=" + width + ",top=" + wtop + ",left=" + wleft + ",location=no,titlebar=no,toolbar=no,status=no,scrollbars=yes,resizable=yes");
    if (window.focus) { win.focus() }
}

function hide(x) {
    document.getElementById(x).style.display = 'none';
}

function show(x) {
    document.getElementById(x).style.display = 'block';
    document.location.href = "#searchlink";
    document.getElementById('LastName').focus();
}

function showCertified(x) {
    var o = document.getElementById(x);
    if (o != null) {
        document.getElementById(x).style.display = 'block';
        document.location.href = "#legallink";
        document.getElementById('LegalSpecialty').focus();
    }
}

// Clear all the entry fields on the Advanced Search Criteria section
function clearfields() {
    document.getElementById('LastName').value = '';
    document.getElementById('FirstName').value = '';
    document.getElementById('MiddleName').value = '';
    document.getElementById('FirmName').value = '';
    document.getElementById('City').value = '';
    document.getElementById('Zip').value = '';

    document.getElementById('State').selectedIndex = -1;
    document.getElementById('District').selectedIndex = -1;
    document.getElementById('County').selectedIndex = -1;
    document.getElementById('LegalSpecialty').selectedIndex = -1;
    document.getElementById('LanguageSpoken').selectedIndex = -1;
}

function toggle(tableId, tag) {        
    var tbl = document.getElementById(tableId, tag);
    var len = tbl.rows.length;
    var vStyle = (hide) ? "none" : "";
    for (i = 2; i < len; i++) {
        tbl.rows[i].style.display = vStyle;
    }
    if (hide) {
        // DEV
        // tag.innerHTML = "<img src='/Content/images/plus.gif' alt='Display status history' style='border:0' />  Display status history";
        // STAGING & PROD (append /fal/)
        tag.innerHTML = "<img src='/fal/Content/images/plus.gif' alt='Display status history' style='border:0' />  Display status history";
    }
    else {
        // DEV
        // tag.innerHTML = "<img src='/Content/images/minus.gif' alt='Hide status history' style='border:0' />  Hide status history";
        // STAGING & PROD (append /fal/)
        tag.innerHTML = "<img src='/fal/Content/images/minus.gif' alt='Display status history' style='border:0' />  Display status history";
    }
    hide = !hide;
}


$(document).ready(function () {
    // Converts any link of class .popup to open in a popup
    /* disabled when not working after New Design. Causes javascript to halt. Craig W
    jQuery('a.popup').live('click', function() {
    newwindow = window.open($(this).attr('href'), '', 'height=300,width=300');
        if (window.focus) { newwindow.focus() }
        return false;
    });
    */
    //  If the AdvancedSearch view or FindLegalHelp view, expand the advanced criteria section
    if ($('#advanced').length) {
        $('#advanced').show();
    }

    // The <div id="moduleMemberDetail"> exists in Detail.aspx page.  If the page is Detail.aspx, 
    // execute the following code.
    if ($('#moduleMemberDetail').length) {
        // Hide the "Find a Certified Specialist" on the Quicklinks left navigation
        $('#advanced').hide();

        // Retroactively enable mailto: links for the email address, to compensate for the initial obfuscation
        for (var i = 0; i < 20; i++) {
            var emd = document.getElementById('e' + i);
            if (emd != null) {
                var em = emd.innerHTML.replace(/<[\/]*span>/gi, '');
                emd.innerHTML = em;
            }
        }        
    }
});

