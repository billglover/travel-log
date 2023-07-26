'use stricts';

document.addEventListener('DOMContentLoaded', function () {
  //allCountries defined in about.ejs(html)
  const autocompleteInput = document.getElementById("country");
  const autocomplete = new Awesomplete(autocompleteInput, {
    list: allCountries,
    minChars: 1,
    autoFirst: true,
  });
});