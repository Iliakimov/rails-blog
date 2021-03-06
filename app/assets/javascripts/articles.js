jQuery(function ($) {
    $(document).ready(function(){
        //******************************************************************** СОЗДАНИЕ

        $('.create-article').click( function (event) {
            event.preventDefault();
            var articleData   = $('form#new_article').serialize();
            var articleTitle = $("form#new_article #article_title").val();
            var articleText = $("form#new_article #article_text").val();
            var articleCategory = $("form#new_article #article_category").val();
            if((articleTitle.length > 4)&(articleText.length > 4)) {
                $.ajax({
                    url: '/articles/',
                    type: 'POST',
                    data: articleData,
                    dataType: 'json',
                    success: function (jsondata) {
                        window.location.replace(jsondata.id);
                    },
                    error: function () {
                        console.log('error create')
                    }
                })
            }
            else {
                console.log("create error");
                $('form#new_article #errors').show();
                if (articleTitle.length <= 4) {
                    $('form#new_article #title_error').show()
                }
                else {
                    $('form#new_article #title_error').hide()
                }
                if (articleText.length <= 4) {
                    $('form#new_article #text_error').show()
                }
                else {
                    $('form#new_article #text_error').hide()
                }
            }
        });

        //******************************************************************** УДАЛЕНИЕ

        $('.delete-article-button').click( function (event) {
            event.preventDefault();
            var current_item_tr = $(this).parents('tr')[0];
            // if(confirm("Вы уверены?")){
            $.ajax({
                url: '/articles/'+$(current_item_tr).attr('data-item_id'),
                type: 'DELETE',
                success: function () {
                    $(current_item_tr).remove();
                },
                error: function () {
                    console.log("delete error");
                }
            })
            // }
        })

        //******************************************************************** ИЗМЕНЕНИЕ

        // $('.change-article').click( function (event) {
        //     event.preventDefault();
        //     $('#myModal').modal(options)
        // });

        $('.change-article').click( function () {
            var adress = window.location.href;
            var current_id = adress.slice(adress.search(/articles/)+9);
            $('#article_title').attr('value','');
            $('#article_text').text('');
            $('.new-article').hide();
            $('.edit-article').show();
            $.ajax({
                url: '/articles/'+current_id+'/edit',
                type: 'GET',
                dataType: 'json',
                success: function (jsondata) {
                    var current_form = $('form#edit_article');
                    $(current_form).attr('data-item_id',jsondata.id);
                    $('#article_title').attr('value',jsondata.title);
                    if(jsondata.category_id==null) {
                        $('#article_category_id').val(5);
                    } else {
                        $('#article_category_id').val(jsondata.category_id);
                    };
                    if ((jsondata.text) == (null)) {
                        $('#article_text').text('');
                    } else {
                        $('#article_text').text(jsondata.text);
                    }
                }
            });
        });

        $('.save-changes').click (function (event) {
            event.preventDefault();
            var adress = window.location.href;
            var articleId = adress.slice(adress.search(/articles/)+9);
            var articleData   = $('form#edit_article').serialize();
            var articleTitle = $("form#edit_article #article_title").val();
            var articleText = $("form#edit_article #article_text").val();
            if((articleTitle.length > 4)&(articleText.length > 4)) {
                $.ajax({
                    url: '/articles/' + articleId,
                    type: 'PATCH',
                    data: articleData,
                    success: function () {
                        $('.article .title').text(articleTitle);
                        $('.article .text').text(articleText);
                        $('#myModal').modal('hide');
                    },
                    error: function () {
                        console.log("change error")
                    }
                })
            }
            else {
                console.log("error");
                $('#errors').show();
                if (articleTitle.length <= 4) {
                    $('form#edit_article #title_error').show()
                }
                else {
                    $('form#edit_article #title_error').hide()
                }
                if (articleText.length <= 4) {
                    $('form#edit_article #text_error').show()
                }
                else {
                    $('form#edit_article #text_error').hide()
                }
            }
        });

        $('.undo-change-article').click (function (event) {
            event.preventDefault();
            $('.edit-article').hide();
            $('form#edit_article #article_title').attr('value','');
            $('form#edit_article #article_text').text('');
            $('form#edit_article #article_category').attr('value',"5");
        })


        //******************************************************************** КАТЕГОРИИ
        // $.ajax({
        //     url: '/categories/',
        //     type: 'GET',
        //     dataType: 'json',
        //     success: function (jsondata) {
        //         console.log(jsondata);
        //         console.log(jsondata.length);
        //         console.log(jsondata[1]);
        //         for(i = 0; i < jsondata.length; i++){
        //             num = i+1;
        //             $('#article_category_id').append('<option value='+num+'>'+jsondata[i].name+'</option>>');
        //         }
        //     }
        // });
    });
});

jQuery(document).ready(function($){
    window.onload = function() {
        $('.airSticky').airStickyBlock({
            stopBlock: '.airSticky_stop-block'
        });
    };

    // $('a#go').click( function(event){ // лoвим клик пo ссылки с id="go"
    //     event.preventDefault(); // выключaем стaндaртную рoль элементa
    //     $('#overlay').fadeIn(400, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
    //         function(){ // пoсле выпoлнения предъидущей aнимaции
    //             $('#modal_form')
    //                 .css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
    //                 .animate({opacity: 1, top: '50%'}, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
    //         });
    // });
    // /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    // $('#modal_close, #overlay').click( function(){ // лoвим клик пo крестику или пoдлoжке
    //     $('#modal_form')
    //         .animate({opacity: 0, top: '45%'}, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
    //             function(){ // пoсле aнимaции
    //                 $(this).css('display', 'none'); // делaем ему display: none;
    //                 $('#overlay').fadeOut(400); // скрывaем пoдлoжку
    //             }
    //         );
    // });
});

