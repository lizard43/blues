if ('bluetooth' in navigator) {

  bleConnect.classList.remove("hidden");

  bleConnect.addEventListener('click', async () => {

    var bleService;

    const connectToDevice = async ({ bleServiceUUID }) => {
      try {

        const device = await navigator.bluetooth.requestDevice({
          filters: [{
            services: [bleServiceUUID]
          }]
        });

        device.addEventListener('gattserverdisconnected', () => {
          logger('gatt server disconnected');
        });

        const bleServer = await device.gatt.connect();
        bleService = await bleServer.getPrimaryService(bleServiceUUID);

      }
      catch (err) {
        console.error(err);
        logger(err);
      }
    };

    const connectToCharacteristic = async ({ bleCharacteristicUUID }) => {
      try {
        const characteristic = await bleService.getCharacteristic(bleCharacteristicUUID);
        return characteristic;
      }
      catch (err) {
        console.error(err);
        logger(err);
      }
    };

    await connectToDevice({
      bleServiceUUID: 'd3073649-235a-4ac9-9aeb-77b94f38f891'
    });

    // CHARACTERISTIC_RT_SPEED_UUID
    connectToCharacteristic({
      bleCharacteristicUUID: 'be127729-d3bd-4327-b43f-f79a2bcc1be8'
    }).then(characteristic => {
      try {
        characteristic.startNotifications().then(() => {
          characteristic.addEventListener('characteristicvaluechanged',
            handleSpeedChanged);
        });
      }
      catch (err) {
        console.error(err);
        logger(err);
      }

    });
  });

} else {
  console.error('ble not supported');
  logger('ble not supported');

  startupInterval = setInterval(startup, 25);

}

function handleSpeedChanged(event) {

  const speedBin = event.target.value;

  var uarr = new Uint8Array(speedBin.buffer, speedBin.byteOffset, speedBin.byteLength);
  var spd = arrayToSpeed(uarr);

  gaugeSpeedometer.value = spd.mph;
  speedometerBig.innerText = Math.trunc(spd.mph);
  altSpeedMPH.innerText = spd.mph;
  altSpeedKMH.innerText = spd.kmh;

  var rpm = spd.rpm;
  gaugeRPM.value = rpm / 1000.0;
  altRPM.innerText = rpm;

  var tgtrpm = spd.tgt;
  altTargetRPM.innerText = tgtrpm;
}

function arrayToSpeed(speedArray) {

  if ((speedArray[0] == 0xAA) && (speedArray[1] == 0xAA)) {

    var crc = crc16(speedArray.slice(0, 10))
    var messageCRC = speedArray[10] + (speedArray[11] << 8);

    if (crc == messageCRC) {

      return {
        'kmh': (speedArray[2] + (speedArray[3] << 8)) / 10.0,
        'mph': (speedArray[4] + (speedArray[5] << 8)) / 10.0,
        'rpm': speedArray[6] + (speedArray[7] << 8),
        'tgt': speedArray[8] + (speedArray[9] << 8),
      }
    } else {
      logger('Bad CRC    : ' + messageCRC);
      logger('   expected: ' + crc);
      return {};
    }

  }
}

var startupInterval;
var startupCounter = 0;
function startup() {

  if (startupCounter >= 100) {
    clearInterval(startupInterval);
    setTimeout(clearSpeed, 2000);
    setTimeout(clearIndicators, 2000);
    setTimeout(clearBattery, 2000);
  }

  startupSpeed();
  startupIndicators();
  startupBattery();

  startupCounter++;
}

function startupSpeed() {

  var kmh = startupCounter * 10;
  var mph = kmh * 0.621371;
  var rpm = startupCounter * 100.0;
  var tgtrpm = (startupCounter * 100.0) + 100.0;

  var speedEvent = buildSpeedEvent(kmh, mph, rpm, tgtrpm);
  handleSpeedChanged(speedEvent);
}

function buildSpeedEvent(kmh, mph, rpm, tgtrpm) {

  var speedEvent = {
    "target":
    {
      "value":
      {
        "buffer": [0xAA, 0xAA,
          (kmh & 0xFF), ((kmh >> 8) & 0xFF),
          (mph & 0xFF), ((mph >> 8) & 0xFF),
          (rpm & 0xFF), ((rpm >> 8) & 0xFF),
          (tgtrpm & 0xFF), ((tgtrpm >> 8) & 0xFF),
          0, 0],
        "byteOffset": 0,
        "length": 12
      }
    }
  };

  var crc = crc16(speedEvent.target.value.buffer.slice(0, 10));
  speedEvent.target.value.buffer[10] = (crc & 0xFF);
  speedEvent.target.value.buffer[11] = ((crc >> 8) & 0xFF);

  return speedEvent;
}

function clearSpeed() {
  var speedEvent = buildSpeedEvent(0, 0, 0, 0);
  handleSpeedChanged(speedEvent);
}

function startupIndicators() {

  if (startupCounter < 20) {
    alarmIndicator.dataset.alarmOne = 'true';
    delete alarmIndicator.dataset.alarmTwo;
    delete alarmIndicator.dataset.alarmThree;

    batteryIndicator.dataset.alarmOne = 'true';
    delete batteryIndicator.dataset.alarmTwo;
    delete batteryIndicator.dataset.alarmThree;

    temperatureIndicator.dataset.alarmOne = 'true';
    delete temperatureIndicator.dataset.alarmTwo;
    delete temperatureIndicator.dataset.alarmThree;
  }

  else if (startupCounter < 40) {
    alarmIndicator.dataset.alarmTwo = 'true';
    delete alarmIndicator.dataset.alarmOne;
    delete alarmIndicator.dataset.alarmThree;

    batteryIndicator.dataset.alarmTwo = 'true';
    delete batteryIndicator.dataset.alarmOne;
    delete batteryIndicator.dataset.alarmThree;

    temperatureIndicator.dataset.alarmTwo = 'true';
    delete temperatureIndicator.dataset.alarmOne;
    delete temperatureIndicator.dataset.alarmThree;
  }

  else if (startupCounter < 60) {
    alarmIndicator.dataset.alarmThree = 'true';
    delete alarmIndicator.dataset.alarmOne;
    delete alarmIndicator.dataset.alarmTwo;

    batteryIndicator.dataset.alarmThree = 'true';
    delete batteryIndicator.dataset.alarmOne;
    delete batteryIndicator.dataset.alarmTwo;

    temperatureIndicator.dataset.alarmThree = 'true';
    delete temperatureIndicator.dataset.alarmOne;
    delete temperatureIndicator.dataset.alarmTwo;

  }

  else if (startupCounter < 70) {
    alarmIndicator.dataset.alarmOne = 'true';
    delete alarmIndicator.dataset.alarmTwo;
    delete alarmIndicator.dataset.alarmThree;

    batteryIndicator.dataset.alarmTwo = 'true';
    delete batteryIndicator.dataset.alarmOne;
    delete batteryIndicator.dataset.alarmThree;

    temperatureIndicator.dataset.alarmOne = 'true';
    delete temperatureIndicator.dataset.alarmTwo;
    delete temperatureIndicator.dataset.alarmThree;
  }

  else if (startupCounter < 80) {
    alarmIndicator.dataset.alarmTwo = 'true';
    delete alarmIndicator.dataset.alarmOne;
    delete alarmIndicator.dataset.alarmThree;

    alarmIndicator.dataset.alarmOne = 'true';
    delete alarmIndicator.dataset.alarmTwo;
    delete alarmIndicator.dataset.alarmThree;

    temperatureIndicator.dataset.alarmThree = 'true';
    delete temperatureIndicator.dataset.alarmOne;
    delete temperatureIndicator.dataset.alarmTwo;
  }

  else if (startupCounter < 90) {
    alarmIndicator.dataset.alarmThree = 'true';
    delete alarmIndicator.dataset.alarmOne;
    delete alarmIndicator.dataset.alarmTwo;

    batteryIndicator.dataset.alarmThree = 'true';
    delete batteryIndicator.dataset.alarmOne;
    delete batteryIndicator.dataset.alarmTwo;

    temperatureIndicator.dataset.alarmTwo = 'true';
    delete temperatureIndicator.dataset.alarmOne;
    delete temperatureIndicator.dataset.alarmThree;
  }

  else {
    alarmIndicator.dataset.alarmOne = 'true';
    delete alarmIndicator.dataset.alarmTwo;
    delete alarmIndicator.dataset.alarmThree;

    batteryIndicator.dataset.alarmOne = 'true';
    delete batteryIndicator.dataset.alarmTwo;
    delete batteryIndicator.dataset.alarmThree;

    temperatureIndicator.dataset.alarmOne = 'true';
    delete temperatureIndicator.dataset.alarmTwo;
    delete temperatureIndicator.dataset.alarmThree;
  }
}

function buildAlarmEvent(code, level, rpm) {

  var alarmEvent = {
    "target":
    {
      "value":
      {
        "buffer": [0xDD, 0xDD,
          code, level,
          0, 0],
        "byteOffset": 0,
        "length": 6
      }
    }
  };

  var crc = crc16(alarmEvent.target.value.buffer.slice(0, 4));
  alarmEvent.target.value.buffer[4] = (crc & 0xFF);
  alarmEvent.target.value.buffer[5] = ((crc >> 8) & 0xFF);

  return alarmEvent;
}

function startupBattery() {

  var current = 0;
  var ksi = 0;
  var udc = 0;
  var capacity = startupCounter;

  var batteryEvent = buildBatteryEvent(current, ksi, udc, capacity);
  handleBatteryChanged(batteryEvent);
}

function buildBatteryEvent(current, ksi, udc, capacity) {

  var batteryEvent = {
    "target":
    {
      "value":
      {
        "buffer": [0xDD, 0xDD,
          (current & 0xFF), ((current >> 8) & 0xFF),
          (ksi & 0xFF), ((ksi >> 8) & 0xFF),
          (udc & 0xFF), ((udc >> 8) & 0xFF),
          (capacity & 0xFF), ((capacity >> 8) & 0xFF),
          0, 0],
        "byteOffset": 0,
        "length": 6
      }
    }
  };

  var crc = crc16(batteryEvent.target.value.buffer.slice(0, 10));
  batteryEvent.target.value.buffer[10] = (crc & 0xFF);
  batteryEvent.target.value.buffer[11] = ((crc >> 8) & 0xFF);

  return batteryEvent;
}

function clearIndicators() {

  delete alarmIndicator.dataset.alarmOne;
  delete alarmIndicator.dataset.alarmTwo;
  delete alarmIndicator.dataset.alarmThree;

  delete batteryIndicator.dataset.alarmOne;
  delete batteryIndicator.dataset.alarmTwo;
  delete batteryIndicator.dataset.alarmThree;

  delete temperatureIndicator.dataset.alarmOne;
  delete temperatureIndicator.dataset.alarmTwo;
  delete temperatureIndicator.dataset.alarmThree;
}

function clearBattery() {
  var batteryEvent = buildBatteryEvent(0, 0, 0, 0);
  handleBatteryChanged(batteryEvent);
}

function handleBatteryChanged(event) {

  const batteryBin = event.target.value;

  var uarr = new Uint8Array(batteryBin.buffer, batteryBin.byteOffset, batteryBin.byteLength);
  var battery = arrayToBattery(uarr);

  gaugeBattery.value = battery.capacity;
}

function arrayToBattery(batteryArray) {

  if ((batteryArray[0] == 0xDD) && (batteryArray[1] == 0xDD)) {

    var crc = crc16(batteryArray.slice(0, 10))
    var messageCRC = batteryArray[10] + (batteryArray[11] << 8);

    if (crc == messageCRC) {

      return {
        'current': (batteryArray[2] + (batteryArray[3] << 8)) / 10.0,
        'ksi': (batteryArray[4] + (batteryArray[5] << 8)) / 10.0,
        'udc': (batteryArray[6] + (batteryArray[7] << 8)) / 10.0,
        'capacity': batteryArray[8] + (batteryArray[9] << 8),
      }
    } else {
      logger('Bad CRC    : ' + messageCRC);
      logger('   expected: ' + crc);
      return {};
    }

  }
}


