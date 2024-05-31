var bleConnect = document.getElementById('bleConnect');

var screenSize = document.getElementById('screenSize');

var tabDashboard = document.getElementById('tabDashboard');
var tabDashboardContent = document.getElementById('tabDashboardContent');
var mainTabDashboardContent = document.getElementById('main-tabDashboardContent');
var altTabDashboardContent = document.getElementById('alt-tabDashboardContent');

var alarmIndicator = document.getElementById('alarmIndicator');
var temperatureIndicator = document.getElementById('temperatureIndicator');
var batteryIndicator = document.getElementById('batteryIndicator');

var RPM = document.getElementById('RPM');
var speedometer = document.getElementById('speedometer');
var speedometerBig = document.getElementById('speedometerBig');

var altSpeedMPH = document.getElementById('altSpeedMPH');
var altSpeedKMH = document.getElementById('altSpeedKMH');
var altRPM = document.getElementById('altRPM');
var altTargetRPM = document.getElementById('altTargetRPM');

var altAlarmIndicator = document.getElementById('altAlarmIndicator');
var altTemperatureIndicator = document.getElementById('altTemperatureIndicator');
var altBatteryIndicator = document.getElementById('altBatteryIndicator');


var tabPower = document.getElementById('tabPower');
var tabPowerContent = document.getElementById('tabPowerContent');
var mainTabPowerContent = document.getElementById('main-tabPowerContent');
var altTabPowerContent = document.getElementById('alt-tabPowerContent');

var tabMotor = document.getElementById('tabMotor');
var tabMotorContent = document.getElementById('tabMotorContent');
var mainTabMotorContent = document.getElementById('main-tabMotorContent');
var altTabMotorContent = document.getElementById('alt-tabMotorContent');

var tabOptions = document.getElementById('tabOptions');
var tabOptionsContent = document.getElementById('tabOptionsContent');

const log = document.getElementById('log');

function logger(msg) {
    log.innerText += msg
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}