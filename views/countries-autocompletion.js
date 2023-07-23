'use stricts';

document.addEventListener('DOMContentLoaded', function () {
  //const allCountries = function () {};
  const stringCountries = JSON.stringify(allCountries);
  const autocompleteInput = document.getElementById("country");
  const autocomplete = new Awesomplete(autocompleteInput, {
    list: stringCountries,
    minChars: 1,
    autoFirst: true,
  });
});