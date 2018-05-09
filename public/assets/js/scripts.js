
$(() => {

    // EGG Panel animation
    $('.panel').hover(function(){
            $(this).find('.panel-footer').slideDown(250);
        },function(){
            $(this).find('.panel-footer').slideUp(250); 
        });

    // new egg function
    $('.new-egg-form').on('submit', (evt) => {
        evt.preventDefault();

        var newEgg = {
            name: $('#egg-input').val().trim(),
            devoured: false
        };

        // post new egg
        $.ajax('/api/eggs', {
            type: 'POST',
            data: newEgg
        }).then(() => {
            // reload page to add to column
            location.reload();
        });
    });

    // Devour egg function
    $('.devour').on('click', (evt) => {
        // set id to clicked data-id
        var id = $(evt.currentTarget).data('id');
        // var devoured = $(evt.currentTarget).parent().data('devoured');
        // set devoured to true in obj
        var devouredState = {
            devoured: true
        };

        // update egg as devoured
        $.ajax('/api/eggs/' + id, {
            type: 'PUT',
            data: devouredState
        }).then(() => {
            // reload page to move to devoured column
            location.reload();
        });
    });
});
    