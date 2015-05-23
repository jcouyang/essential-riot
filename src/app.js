let riot = require('riot');
require('primer-css/scss/primer.scss')
require('foundation/scss/foundation/components/_grid.scss')
require('./pages/todo.html');
require('./pages/login.html');
require('./router.sjs');
riot.route('login')
