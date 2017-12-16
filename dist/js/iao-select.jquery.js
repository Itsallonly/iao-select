/*
 Plugin Name: iao select
         Key: iao-select
     Version: 1.0.0
      Author: Prashant Kapoor
     Website: http://www.itsallonly.com
        Repo: https://github.com/Itsallonly/iao-select
      Issues: https://github.com/Itsallonly/iao-select/issues
       Files: iao-select.jquery.js, iao-select.css
  Dependency: Jquery
*/
(function( $ ) {
    $.fn.iaoSelect = function(arr) {
        var opt = $.extend( {
            placeholder: "Select Options",
            multiselect: false,
            value: ""
        }, arr ),
        value, showData, count = 0,
        timeStamp = $.now();
        $(this)
        .attr('iao-select','')
        .addClass('select-'+timeStamp)
        .after('<iao-select-box id="iao-select-'+timeStamp+'"><iao-select><input type="text" name="selectInput" id="search-'+timeStamp+'" placeholder="'+opt.placeholder+'"/><iao-options-count></iao-options-count></iao-select><iao-options-list><iao-options-start></iao-options-start><iao-options-end>No results for matching search</iao-options-end></iao-options-list></iao-select-box>');
        function iaoSelectShowCount(count) {
            $(document).find('#iao-select-'+timeStamp+' iao-options-count').text(count);
        }
        function iaoSetInputValue(value) {
            $(document).find('iao-select input[name="selectInput"]#search-'+timeStamp).val(value)
        }
        $('.select-'+timeStamp+' option').each(function () {
            value = $(this).attr('value'), showData = $(this).text();
            $('#iao-select-'+timeStamp+' iao-options-end').before('<iao-option value="'+value+'">'+showData+'</iao-option>')
            count++
        })
        $(document).on('click', 'iao-option', function () {
           $(document).find('#iao-select-'+timeStamp+' iao-option').removeClass('selected')
           value = $(this).addClass('selected').attr('value')
           showData = $('.select-'+timeStamp+' option[value="'+value+'"]').prop('selected', true).text()
           $('iao-options-list').hide()
           iaoSetInputValue(showData)
        });
        $(document).on('change', 'select[iao-select]', function () {
           $(document).find('#iao-select-'+timeStamp+' iao-option').removeClass('selected')
           value = $(this).val()
           showData = $('#iao-select-'+timeStamp+' iao-option[value="'+value+'"]').addClass('selected').text()
           iaoSetInputValue(showData)
        });

        $(document).on('keyup || click', 'iao-select input[name="selectInput"]', function () {
            $('iao-options-list').show()
            var searchText = $(this).val(), count = 0;
            $('#iao-select-'+timeStamp+' iao-option').each(function() {
                if (($(this).text().search(new RegExp(searchText, "i")) < 0)) {
                    $(this).addClass('iao-hidden');
                } else {
                    $(this).removeClass('iao-hidden');
                    count++;
                    iaoSelectShowCount(count);
                }
            })
        })
        iaoSelectShowCount(count);
        return this;
    };
}( jQuery ));