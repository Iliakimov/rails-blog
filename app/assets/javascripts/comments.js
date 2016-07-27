jQuery(function ($) {
    $(document).ready(function(){
        $('.destroy-comment-button').click( function (event) {
            event.preventDefault();
            var current_item_div = $(this).parents('div')[0];
            var adress = window.location.href;
            var articleId = adress.slice(adress.search(/articles/)+9);
            $.ajax({
                url: '/articles/'+articleId+'/comments/'+$(current_item_div).attr('data-comment_id'),
                type: 'DELETE',
                success: function () {
                    $(current_item_div).remove();
                },
                error: function () {
                    console.log("delete error");
                }
            })
        });
        
        // $('.open-comment-form-button').click(function (e) {
        //     e.preventDefault();
        //     $(this).hide();
        //     $('.comment-form').show();
        //
        // });

        // $('.hide-comment-form').click(function (e) {
        //     e.preventDefault();
        //     $('.comment-form').hide();
        //     $('.open-comment-form-button').show();
        //     $('#comment_body').text('');
        //     $('#comment_author').val('');
        // })

        // $('.create-comment-button').click( function (event) {
        //     event.preventDefault();
        //     console.log('start create');
        //
        //     var current_item_span = $(this).parents('span')[0];
        //     var adress = window.location.href;
        //     var articleId = adress.slice(adress.search(/articles/)+9);
        //
        //     var commentData   = $('form#new_comment').serialize();
        //     var commentAutor = $("form#new_comment #comment_commenter").val();
        //     var commentText = $("form#new_comment #comment_body").val();
        //     var route = "/articles/"+articleId+"/comments";
        //     if((commentAutor.length > 4)&(commentText.length > 4)) {
        //         $.ajax({
        //             url: "/articles/"+articleId+"/comments",
        //             type: 'POST',
        //             data: commentData,
        //             dataType: 'json',
        //             success: function (jsondata) {
        //                 console.log(jsondata);
        //                 window.location.replace(jsondata.id);
        //             },
        //             error: function () {
        //                 console.log('error create')
        //             }
        //         })
        //     }
        //     else {
        //         console.log("create error");
        //         $('form#new_article #errors').show(300);
        //         if (articleTitle.length <= 4) {
        //             $('form#new_comment #title_error').show(300)
        //         }
        //         else {
        //             $('form#new_comment #title_error').hide(300)
        //         }
        //         if (articleText.length <= 4) {
        //             $('form#new_comment #text_error').show(300)
        //         }
        //         else {
        //             $('form#new_comment #text_error').hide(300)
        //         }
        //     }
        // })
    });
});