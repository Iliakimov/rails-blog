// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require jquery.airStickyBlock.min.js
// require turbolinks
//= require_tree .

jQuery(function ($) {
    $(document).ready(function () {
        var adress = window.location.href;
        if (adress.search(/new/) > 0) {
            $('.nav-create').attr('class', 'current');
        } else {
            if (adress.search(/categories/) > 0) {
                $('.nav-categories').attr('class', 'current');
            } else {
                $('.nav-articles').attr('class', 'current');
            }
        }
        $('.active').css('background-color','#b3dcee');
    })
});

