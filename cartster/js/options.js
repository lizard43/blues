var textOptionCookie = getTextOptionCookie();
var textOptionCheckBox = document.getElementById('textOption');

textOptionCheckBox.checked = textOptionCookie;

if (textOptionCookie) {
    saveTextOptionCookie(true);
    showTextOption(true);
} else {
    saveTextOptionCookie(false);
    showTextOption(false);
}

textOptionCheckBox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        saveTextOptionCookie(true);
        showTextOption(true);
    } else {
        saveTextOptionCookie(false);
        showTextOption(false);
    }
});

// Gets text option cookie, 
// returns false if no cookie found
//
function getTextOptionCookie() {

    var textStr = Cookies.get("text");
    if (textStr === 'true') {
        return true;
    } else {
        return false;
    }
}

// Saves text option cookie
//
function saveTextOptionCookie(text) {

    if (text === true) {
        Cookies.set("text", true, { expires: 1365, path: '' });
    } else {
        Cookies.set("text", false, { expires: 1365, path: '' });

    }
}

function showTextOption(show) {

    if (show) {

        mainTabDashboardContent.classList.add('hidden');
        mainTabPowerContent.classList.add('hidden');
        mainTabMotorContent.classList.add('hidden');

        altTabDashboardContent.classList.remove('hidden');
        altTabPowerContent.classList.remove('hidden');
        altTabMotorContent.classList.remove('hidden');

    } else {

        altTabDashboardContent.classList.add('hidden');
        altTabPowerContent.classList.add('hidden');
        altTabMotorContent.classList.add('hidden');

        mainTabDashboardContent.classList.remove('hidden');
        mainTabPowerContent.classList.remove('hidden');
        mainTabMotorContent.classList.remove('hidden');
    }
}

