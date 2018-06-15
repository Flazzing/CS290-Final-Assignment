(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['audioclip'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"clips-container\">\n    <div class=\"clips-icon\">\n        <i class=\"profile\">\n            <i><img src = \"Logo.png\" height=\"55\" width=\"65\"></i>\n            <i>\n\n              "
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "\n\n            </i>\n        </i>\n    </div>\n\n    <section class = \"sound-clips\">\n        <audio controls = \"controls\">\n        <source src = "
    + alias4(((helper = (helper = helpers.clip || (depth0 != null ? depth0.clip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"clip","hash":{},"data":data}) : helper)))
    + " type = \"audio/ogg\">\n      </audio>\n    </section>\n\n        <div class=\"clips-content\">\n            <p class=\"clips-text\">\n                <p1 class=\"clips-time\">\n\n                    3:58\n\n                </p1>\n            </p>\n        </div>\n    <div class = \"author-comments\">\n\n      "
    + alias4(((helper = (helper = helpers.comments || (depth0 != null ? depth0.comments : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data}) : helper)))
    + "\n\n    </div>\n</article>\n";
},"useData":true});
})();