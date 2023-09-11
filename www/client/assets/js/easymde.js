// npm package: easymde
// github link: https://github.com/Ionaru/easy-markdown-editor

$(function() {
  'use strict';

  /*easymde editor*/
  if ($("#easyMdeExample").length) {
    var easymde = new EasyMDE({
      element: $("#easyMdeExample")[0]
    });
  }

});