const appliancePowerRatings = {
  
    "Refrigerator": 21.8,
    "television": 21.4,
    "air conditioner": 22.2,
    "computer": 20.5,
    "microwave": 20.9,
    "washing machine": 20.9,
    "dishwasher": 20.9,
    "fan": 20.2,
    "oven": 20.9,
    "blender": 20.3,
    "coffee machine": 20.4,
    "grinder": 20.4,
    "toaster": 20.6,
    "mixer": 20.4,
    "borewell":22.2,
    "cooler":20.8,
    "heater": 20.9,
    "light":20.2,
    "stove": 20.9,
    "charger":20.2,
    "chimney":20.4,
    "fridge":21.8,
    "phone":10.2
};

const electricityRateInr = 4.60;

let applianceInputs = [];

function addAppliance() {
    const applianceName = document.getElementById('appliance-name').value.toLowerCase();
    const numAppliances = document.getElementById('num-appliances').value;
    const usageHours = document.getElementById('usage-hours').value;
   
    if (appliancePowerRatings[applianceName] === undefined) {
        alert('Invalid appliance name');
        return;
    }
   
    applianceInputs.push({
        name: applianceName,
        quantity: numAppliances,
        hours: usageHours
    });
   
    displayAppliances();
    clearForm();
}

function clearForm() {
    document.getElementById('appliance-name').value = '';
    document.getElementById('num-appliances').value = '';
    document.getElementById('usage-hours').value = '';
}

function displayAppliances() {
    const applianceList = document.getElementById('appliance-list');
    applianceList.innerHTML = '';
   
    applianceInputs.forEach((appliance, index) => {
        const div = document.createElement('div');
        div.textContent = `${appliance.quantity} x ${appliance.name} (${appliance.hours} hours/day)`;
        applianceList.appendChild(div);
    });
}

function calculate() {
    let totalEnergyConsumption = {
        day: 0,
        week: 0,
        month: 0,
        year: 0
    };
   
    let totalCost = {
        day: 0,
        week: 0,
        month: 0,
        year: 0
    };
   
    applianceInputs.forEach(appliance => {
        const powerRating = appliancePowerRatings[appliance.name];
        const energyPerDay = powerRating * appliance.quantity * appliance.hours / 1000;
       
        totalEnergyConsumption.day += energyPerDay;
        totalEnergyConsumption.week += energyPerDay * 7;
        totalEnergyConsumption.month += energyPerDay * 30;
        totalEnergyConsumption.year += energyPerDay * 365;
       
        totalCost.day += energyPerDay * electricityRateInr;
        totalCost.week += energyPerDay * electricityRateInr * 7;
        totalCost.month += energyPerDay * electricityRateInr * 30;
        totalCost.year += energyPerDay * electricityRateInr * 365;
    });
   
    displayResults(totalEnergyConsumption, totalCost);
}

function displayResults(energy, cost) {
    document.getElementById('consumption-day').textContent = `Day: ${energy.day.toFixed(2)} kWh`;
    document.getElementById('consumption-week').textContent = `Week: ${energy.week.toFixed(2)} kWh`;
    document.getElementById('consumption-month').textContent = `Month: ${energy.month.toFixed(2)} kWh`;
    document.getElementById('consumption-year').textContent = `Year: ${energy.year.toFixed(2)} kWh`;
   
    document.getElementById('cost-day').textContent = `Day: ₹${cost.day.toFixed(2)}`;
    document.getElementById('cost-week').textContent = `Week: ₹${cost.week.toFixed(2)}`;
    document.getElementById('cost-month').textContent = `Month: ₹${cost.month.toFixed(2)}`;
    document.getElementById('cost-year').textContent = `Year: ₹${cost.year.toFixed(2)}`;
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
   
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
   
    if (username === storedUsername && password === storedPassword) {
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");
    }
}

function signup() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
   
    if (newUsername && newPassword) {
        localStorage.setItem('username', newUsername);
        localStorage.setItem('password', newPassword);
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert("Please enter a valid username and password");
    }
}
