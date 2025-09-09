import yargs from 'yargs';
import chalk from 'chalk';
import weatherData from './weatherData.js';

const argv = yargs(process.argv.slice(2)).string(['city']).parse();

// TEMP: check that the argument is being parsed properly
// console.log(argv.city);

function displayWeather(cityData) {
	let lineThick = chalk.bgBlue(' '.repeat(40));
	let lineThin = chalk.blue('-'.repeat(40));

	console.log('\n' + lineThick);
	console.log(lineThin);
	console.log(
		chalk.bold(`WEATHER REPORT FOR ${cityData.location.toUpperCase()}`)
	);
	console.log(lineThin);
	console.log(lineThick);

	console.log(lineThin);
	console.log(chalk.yellow(`Current Temperature: ${cityData.currentTemp}°F`));
	console.log(chalk.yellow.italic.dim(`Feels Like: ${cityData.feelsLike}°F`));
	console.log(
		chalk.green(`High/Low: ${cityData.highTemp}°F / ${cityData.lowTemp}°F`)
	);
	console.log(chalk.cyan(`Conditions: ${cityData.conditions}`));
	console.log(chalk.magenta(`Humidity: ${cityData.humidity}%`));
	console.log(chalk.red(`Wind: ${cityData.wind} MPH`));
	console.log(lineThin);
	console.log(lineThick + '\n');
}

function run() {
	let city = argv.city;
	let cityKey = city.toLowerCase().trim();

	// Get the specific data for the city passed in
	let cityData = weatherData[cityKey];
    
	console.log(chalk.blue(`\nFetching weather data for ${city}...`));
    
	setTimeout(() => {
        if (cityKey in weatherData) {
            // Display formatted info 
			displayWeather(cityData);
		} else {
            // Handling nonexistent city in data
			console.log(chalk.red(`\nSorry, weather data for '${city}' not found.`));
		}
	}, 1000);
}

run();