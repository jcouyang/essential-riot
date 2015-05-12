var riot = require('riot');
function routePatterns {
  ('') => riot.mount('#page','todo'),
  ('login') => riot.mount('#page','login'),
  ('items') => riot.mount('#page','todo')
}

riot.route(routePatterns);
