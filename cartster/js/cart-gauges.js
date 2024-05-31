window.onresize = recalcGaugeSize;
var grid = document.getElementById('grid');

var gaugeSpeedometer = makeRadialGauge('speedometer-id', 'mph');

gaugeSpeedometer.update({
    maxValue: 55,
    majorTicks: [
        "0",
        "5",
        "10",
        "15",
        "20",
        "25",
        "30",
        "35",
        "40",
        "45",
        "50",
        "55"],
    highlights: [
        {
            "from": 0,
            "to": 25,
            "color": "rgba(50, 200, 50, .66)"
        },
        {
            "from": 25,
            "to": 40,
            "color": "rgba(200, 200, 50, .66)"
        },
        {
            "from": 40,
            "to": 55,
            "color": "rgba(200, 50, 50, .66)"
        }
    ],
    minorTicks: 5,
    colorNumbers: "#FFF"
});
gaugeSpeedometer.draw();

var gaugeRPM = makeRadialGauge('rpm-id', 'x 1000/min');
gaugeRPM.update({
    maxValue: 10,
    colorNumbers: "#FFF",
    majorTicks: [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10"],
    minorTicks: 5,
    highlights: [
        {
            "from": 0,
            "to": 5.5,
            "color": "rgba(50, 200, 50, .66)"
        },
        {
            "from": 5.5,
            "to": 7,
            "color": "rgba(200, 200, 50, .66)"
        },
        {
            "from": 7,
            "to": 10,
            "color": "rgba(200, 50, 50, .66)"
        }
    ]
});
gaugeRPM.draw();

var gaugeBattery = new RadialGauge({
    renderTo: 'battery-id',
    width: 200,
    height: 200,
    units: "Volts",
    minValue: 0,
    startAngle: 90,
    ticksAngle: 180,
    valueBox: false,
    maxValue: 80,
    majorTicks: [
        "0",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80"
    ],
    minorTicks: 2,
    strokeTicks: true,
    highlights: [
        {
            "from": 0,
            "to": 45,
            "color": "rgba(200, 50, 50, .75)"
        }
    ],
    colorPlate: "#000",
    borderShadowWidth: 0,
    borders: false,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    needleCircleOuter: true,
    needleCircleInner: false,
    animationDuration: 1500,
    animationRule: "linear"
}).draw();


function makeRadialGauge(id, title) {

    return new RadialGauge({
        renderTo: id,
        title: title,
        units: "",
        minValue: 0,
        maxValue: 0,
        majorTicks: [
        ],

        width: 100,
        height: 100,

        valueBox: false,
        colorMajorTicks: "white",
        colorMinorTicks: "white",
        strokeTicks: true,
        highlightsWidth: "10",
        colorPlate: "rgba(23, 37, 84, .45)",
        borderShadowWidth: 0,

        borders: true,
        borderInnerWidth: 1,
        borderMiddleWidth: 1,
        borderOuterWidth: 1,
        colorBorderOuter: "#ccc",
        colorBorderOuterEnd: "#ccc",
        colorNeedleShadowDown: "#222",
        borderShadowWidth: 0,

        needleType: "arrow",
        colorNeedle: "red",
        needleWidth: 2,
        needleCircleSize: 7,
        needleCircleOuter: true,
        needleCircleInner: false,
        animationDuration: 500,
        animationRule: "linear"
    }).draw();
}

function recalcGaugeSize() {

    screenSize.innerText = window.innerWidth + "W x " + window.innerHeight + "H"

    var width = window.innerWidth / 3;

    var cols = grid;

    gaugeSpeedometer.update({ "width": width, "height": width });
    gaugeRPM.update({ "width": width, "height": width });

    if (window.innerWidth < 769) {
        RPM.classList.add('hidden');
        speedometer.classList.add('hidden');

    } else {
        RPM.classList.remove('hidden');
        speedometer.classList.remove('hidden');
    }
}

recalcGaugeSize();