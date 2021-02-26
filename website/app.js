/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b10801ef6949b470e6684d57297e11b2'
// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);


const getWeather = async () => {
    const zipCode = document.getElementById('zip').value;
    const endPoint = `${baseURL}?zip=${zipCode}&appid=${apiKey}`;
    console.log(zipCode);
    console.log(endPoint);

    try{
        const response = await fetch(endPoint);
        
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("jSon response -->", jsonResponse);
            return jsonResponse;
        }

    } catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
    let content = document.getElementById('feelings').value;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temp: data.main.temp,
                date: newDate,
                content: content
            })
        });

        if(response.ok) {
            const jsonResponse = await response.json();
            console.log('postdata -->', jsonResponse);
            return jsonResponse;
        }
       
    } catch (error) {
        console.log('error', error);
    }
};

function performAction(e){
    // const zipCode = document.getElementById('zip').value;
    getWeather().then((temp) => {
        postData('/add', temp);
        updateUI();
    });
}

// GET data
const updateUI = async() => {
    try {
        const response = await fetch('/all');
        if (response.ok) {
            const jsonResponse = await response.json();
            document.getElementById('date').innerHTML = jsonResponse.date;
            document.getElementById('temp').innerHTML = jsonResponse.temp;
            document.getElementById('content').innerHTML = jsonResponse.content;
        }

    } catch (error) {
        console.log('error', error);
    }
}