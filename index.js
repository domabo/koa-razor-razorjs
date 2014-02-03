/**
 * Module dependencies.
 */
var razor = require('razor');
var path = require('path');

/**
 * Add a render() method to koa that allows
 * you to render almost any templating engine.
 *
 * Example:
 *
 *   app.use(views('./example', {
 *     html: 'underscore'
 *   }));
 *
 *   // in your route handler
 *   this.body = yield this.render('index');
 *
 * @param {String} path
 * @param {String} ext (optional)
 * @param {Object} opts (optional)
 * @return {Function} middleware
 * @api public
 */

module.exports = function (dir) {
  console.log('add render() method to `this.ctx`');

  // get render function
  

  // middleware
  return function *views(next) {
    renderFn = render(dir);
    this.render = renderFn;
    yield next;
    }
}

/**
 * Determine `render()` function.
 * 
 * @param {String} path
 * @return {Generator} view
 * @api private
 */

function render ( dir) {
    
    return function (view,  model){
       
   var file = path.join(dir, view) + ".js.html";
   
     return function(callback){
         var ctx=this;
         razor.findView(file, function(template){
             if (template == undefined)
             {
                 var err = new Error("Not Found");
                 err.status = 404;
                 err.expose = true;
                callback(err, null);
             } else
                     razor.render(template,model, null, function(html){
                      callback(null, html);
               });
         });
     }
   }
}
