
tabDashboard.onclick = function (event) {
    console.log("tabDashboard");

    delete tabPower.dataset.tabActive;
    delete tabMotor.dataset.tabActive;
    delete tabOptions.dataset.tabActive;
    tabDashboard.dataset.tabActive = 'true';

    tabPowerContent.classList.add('hidden');
    tabMotorContent.classList.add('hidden');
    tabOptionsContent.classList.add('hidden');
    tabDashboardContent.classList.remove('hidden');
};

tabPower.onclick = function (event) {
    console.log("tabPower");

    delete tabMotor.dataset.tabActive;
    delete tabOptions.dataset.tabActive;
    delete tabDashboard.dataset.tabActive;
    tabPower.dataset.tabActive = 'true';

    tabMotorContent.classList.add('hidden');
    tabOptionsContent.classList.add('hidden');
    tabDashboardContent.classList.add('hidden');
    tabPowerContent.classList.remove('hidden');
};

tabMotor.onclick = function (event) {
    console.log("tabMotor");

    delete tabOptions.dataset.tabActive;
    delete tabDashboard.dataset.tabActive;
    delete tabPower.dataset.tabActive;
    tabMotor.dataset.tabActive = 'true';

    tabOptionsContent.classList.add('hidden');
    tabDashboardContent.classList.add('hidden');
    tabPowerContent.classList.add('hidden');
    tabMotorContent.classList.remove('hidden');
};

tabOptions.onclick = function (event) {
    console.log("tabOptions");

    delete tabDashboard.dataset.tabActive;
    delete tabPower.dataset.tabActive;
    delete tabMotor.dataset.tabActive;
    tabOptions.dataset.tabActive = 'true';

    tabDashboardContent.classList.add('hidden');
    tabPowerContent.classList.add('hidden');
    tabMotorContent.classList.add('hidden');
    tabOptionsContent.classList.remove('hidden');
};
