(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['audioclip'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"clips-container\">\r\n    <div class=\"clips-icon\">\r\n        <i class=\"profile\">\r\n            <i><img src = \"Logo.png\" height=\"55\" width=\"65\"></i>\r\n            <i>\r\n\r\n              "
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "\r\n\r\n            </i>\r\n        </i>\r\n    </div>\r\n\r\n    <section class=\"sound-clips\">\r\n      \r\n    </section>\r\n\r\n        <div class=\"clips-content\">\r\n            <p class=\"clips-text\">\r\n\r\n                    "
    + alias4(((helper = (helper = helpers.audio || (depth0 != null ? depth0.audio : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"audio","hash":{},"data":data}) : helper)))
    + "\r\n\r\n                <p1 class=\"clips-time\">\r\n\r\n                    3:58\r\n\r\n                </p1>\r\n            </p>\r\n        </div>\r\n    <div class = \"author-comments\">\r\n\r\n      "
    + alias4(((helper = (helper = helpers.comments || (depth0 != null ? depth0.comments : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data}) : helper)))
    + "\r\n\r\n    </div>\r\n</article>\r\n";
},"useData":true});
})();