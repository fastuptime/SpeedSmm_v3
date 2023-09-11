
$(function () {
    $('#dataTableExample').DataTable({
        "aLengthMenu": [
            [50, 100, 200, -1],
            [50, 100, 200, "All"]
        ],
        "iDisplayLength": 50,
        language: {
            "url": "//cdn.datatables.net/plug-ins/1.10.25/i18n/Turkish.json"
        }
    });
    
    $('#dataTableExample').each(function () {
        var datatable = $(this);
        // SEARCH - Add the placeholder for Search and Turn this into in-line form control
        var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
        search_input.attr('placeholder', 'Search');
        search_input.removeClass('form-control-sm');
        // LENGTH - Inline-Form control
        var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
        length_sel.removeClass('form-control-sm');
    });
});
