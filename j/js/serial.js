document.getElementById('connect').addEventListener('click', connect);
document.getElementById('disconnect').addEventListener('click', disconnect);

let port;
let reader;
let output = document.getElementById('output');

async function connect() {
    try {
        port = await navigator.serial.requestPort();
        await port.open({ baudRate: 19200 });

        document.getElementById('connect').disabled = true;
        document.getElementById('disconnect').disabled = false;

        writeRequest();
        readLoop();
    } catch (error) {
        console.error('Error opening the serial port:', error);
    }
}

async function disconnect() {
    if (reader) {
        await reader.cancel();
        reader = null;
    }
    if (port) {
        await port.close();
        port = null;
    }

    document.getElementById('connect').disabled = false;
    document.getElementById('disconnect').disabled = true;
}

async function writeRequest() {
    const writer = port.writable.getWriter();
    const request = new Uint8Array([0x01, 0x02, 0x03, 0x04]);
    await writer.write(request);
    writer.releaseLock();
}

async function readLoop() {
    while (port.readable) {
        reader = port.readable.getReader();
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                if (value) {
                    displayData(value);
                }
            }
        } catch (error) {
            console.error('Error reading from the serial port:', error);
        } finally {
            reader.releaseLock();
        }
    }
}

function displayData(data) {
    const dataArray = Array.from(data);
    const dataString = dataArray.map(byte => byte.toString(16).padStart(2, '0')).join(' ');
    output.textContent += `Received: ${dataString}\n`;
    output.scrollTop = output.scrollHeight;  // Scroll to bottom
}
