$(function() {
  'use strict'

  if ($(".compose-multiple-select").length) {
    $(".compose-multiple-select").select2();
  }

  /*easymde editor*/
  if ($("#easyMdeEditor").length) {
    var easymde = new EasyMDE({
      element: $("#easyMdeEditor")[0]
    });
  }

});