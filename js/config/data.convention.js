const _temperature_fuzzy = [
  "very_cold",
  "cold",
  "slightly_cold",
  "cool",
  "warm",
  "slightly_hot",
  "hot",
  "very_hot",
];

const _humidity_fuzzy = [
  "very_dry",
  "dry",
  "slightly_dry",
  "moderately_dry",
  "humid",
  "wet",
  "very_wet",
];

const _light_fuzzy = [
  "completely_dark",
  "very_dark",
  "dark",
  "dim",
  "faint",
  "medium",
  "bright",
  "very_bright",
];

const _control_fuzzy = [
  "very_slow",
  "moderately_slow",
  "slow",
  "slightly_slow",
  "medium",
  "slightly_fast",
  "fast",
  "moderately_fast",
  "very_fast",
  "extremely_fast",
];

console.log(`Total fuzzy of temperature: ${_temperature_fuzzy.length}`);
console.log(`Total fuzzy of humidity: ${_humidity_fuzzy.length}`);
console.log(`Total fuzzy of light: ${_light_fuzzy.length}`);
console.log(`Total fuzzy of control_levels: ${_control_fuzzy.length}`);

const temperature = {};
_temperature_fuzzy.forEach((code) => {
  temperature[code] = code;
});

const humidity = {};
_humidity_fuzzy.forEach((code) => {
  humidity[code] = code;
});

const light = {};
_light_fuzzy.forEach((code) => {
  light[code] = code;
});

const control_levels = {};
_control_fuzzy.forEach((node) => {
  control_levels[node] = node;
});

module.exports = {
  temperature,
  humidity,
  light,
  control_levels,
};
