$(document).ready(function () {
    $.backstretch('images/step1.jpg')

    $('a.checkbox').click(function (e) {
        e.preventDefault()
        $(this).toggleClass('checked')
        $('[name=' + $(this).attr('id') + ']').val(($(this).hasClass('checked') ? 'true' : 'false'))
    })

    $('a.slider').click(function (e) {
        e.preventDefault()
        $(this).toggleClass('checked')
        $('input', this).val(($(this).hasClass('checked') ? $(this).attr('data-value') : ''))
        var total = 0;
        $.each($('ul.sliders a.slider'), function (index, val) {
            if ($(val).hasClass('checked'))
                total += parseFloat($(val).attr('data-addon-amount'));
        });
        $('#addon-amount-total').html('$' + (total == Math.floor(total) ? total.toFixed(0) : total.toFixed(2)));
    });

    $('.select-monthly-plan input:checkbox').click(function (e) {        
        setMonthlyOptions('theform', e.target);
    });

    $('.select-monthly-plan2 input:checkbox').click(function (e) {
        setMonthlyOptions('theform_m', e.target);
    });

    $('.select-monthly-plan3 input:checkbox').click(function (e) {
        setAddonOptions(e.target);
    });

    $('.select-monthly-plan3 select[name=addon_frequency]').change(function () {
        setPlanOptionsCheckboxes();
    })

    $('.select-joining-option input:checkbox').click(function (e) {
        setJoiningOptions(e.target);
    });

    $('.box .button.monthly-selection-button').click(function (e) {        
        $('form[name=theform] input[name=plan_frequency]').val($(this).attr('data-plan-frequency'));
        $('form[name=theform_m] input[name=plan_frequency]').val($(this).attr('data-plan-frequency'));
    });

    $('.box .button.skip').click(function (e) {        
        $('form[name=theform] input[name=skip_addons]').val('true');        
    });

    $('a.radio').click(function (e) {
        e.preventDefault()
        var rel = $(this).attr('rel')
        if (!rel)
            return false;

        $('a[rel=' + rel + ']').removeClass('checked')
        $(this).toggleClass('checked')
        $('[name=' + $(this).attr('rel') + ']').val(($(this).attr('data-value')))
    })

    $('label.checkbox').click(function (e) {
        //e.preventDefault()
        var id = $(this).attr('for')
        $('#' + id).trigger('click')
    })
   
    $('a.submit').click(function (e) {
        e.preventDefault()
        $(this).parents('form').submit()
    })

    $('ul.sliders a.slider').click(function (e) {
        e.preventDefault()
        if ($(this).hasClass('checked'))
            $(this).parents('li').addClass('checked')
        else
            $(this).parents('li').removeClass('checked')
    });

    $('select').on('change', function (e) {
        this.style.color = "#000";
    });

    $('[data-toggle="popover"]').popover();
    
    setPlanOptionsCheckboxes();    
});

function setPlanOptionsCheckboxes()
{
    $('.select-monthly-plan input:checkbox').each(function (index, value) {        
        setMonthlyOptions('theform', value);       
    });

    $('.select-monthly-plan2 input:checkbox').each(function (index, value) {
        setMonthlyOptions('theform_m', value);
    });

    $('.select-monthly-plan3 input:checkbox').each(function (index, value) {
        setAddonOptions(value);
    });

    $('.select-joining-option input:checkbox').each(function (index, value) {        
        setJoiningOptions(value);
    });
}

function setMonthlyOptions(theform, cb)
{        
    toggleAddonPriceClass(cb);

    var month1 = 0;
    var month2 = 0;
    var month3 = 0;
    var month6 = 0;
   
    if ($(cb).attr('name') == 'plan_type' && $(cb).is(':checked'))
    {
        var elem = 'form[name=' + theform + '] input[name=plan_type][value=' + ($(cb).val() == "DLY" ? "RTL" : "DLY") + ']';
        $(elem).prop('checked', false);
        toggleAddonPriceClass($(elem));
    }

    $.each($('form[name=' + theform + '] input:checked'), function (index, value) {
        month1 += Number($(value).attr('data-plan-price'));
        month2 += Number($(value).attr('data-plan-price') / 2);
        month3 += Number($(value).attr('data-plan-price') / 3);
        month6 += Number($(value).attr('data-plan-price') / 6);        
    });

    month1 += Number($('form[name=' + theform + '] span[data-base-plan-type=1]').attr('data-plan-base-price'));
    month2 += Number($('form[name=' + theform + '] span[data-base-plan-type=2]').attr('data-plan-base-price'));
    month3 += Number($('form[name=' + theform + '] span[data-base-plan-type=3]').attr('data-plan-base-price'));
    month6 += Number($('form[name=' + theform + '] span[data-base-plan-type=6]').attr('data-plan-base-price'));
   
    $('form[name=' + theform + '] span[data-base-plan-type=1]').html(month1.toFixed(2) + '/mo');
    $('form[name=' + theform + '] span[data-base-plan-type=2]').html(month2.toFixed(2) + '/mo');
    $('form[name=' + theform + '] span[data-base-plan-type=3]').html(month3.toFixed(2) + '/mo');
    $('form[name=' + theform + '] span[data-base-plan-type=6]').html(month6.toFixed(2) + '/mo');
}

function setAddonOptions(cb)
{
    toggleAddonPriceClass(cb);

    var total = 0;
    var frequency = Number($('form[name=theform] select[name=addon_frequency]').val());

    $.each($('form[name=theform] input'), function (index, value) {
        var amt = Number($(value).attr('data-addon-price')) / frequency;
        if ($(value).is(':checked')) {
            total += amt;
        }
        $(value).closest('tr').find('td').each(function (column, td) {
            if ($(td).hasClass('addon-price-dim') || $(td).hasClass('addon-price-green')) {
                $(td).html(amt.toFixed(2));
            }
        });

    });

    $('#addon_total').html(total.toFixed(2) + '/mo');
    total += Number($('#total').attr('data-plan-base-price'));
    $('#total').html(total.toFixed(2) + '/mo');
}

function setJoiningOptions(cb)
{
    toggleAddonPriceClass(cb);
    var total = 0;

    if ($(cb).attr('name') == 'plan_type' && $(cb).is(':checked')) {
        var elem = 'form[name=theform] input[name=plan_type][value=' + ($(cb).val() == "DLY" ? "RTL" : "DLY") + ']';
        $(elem).prop('checked', false);
        toggleAddonPriceClass($(elem));
    }

    $.each($('.select-joining-option input:checked'), function (index, value) {
        if ($(value).attr('name') == 'plan_type') {
            total += Number($(value).attr('data-plan-price'));
        }
        else {
            total += Number($(value).attr('data-addon-price'));
        }
    });

    total += Number($('#joining_option').attr('data-plan-base-price'));
    $('#joining_option').html(total.toFixed(2));
}

function toggleAddonPriceClass(cb)
{
    $(cb).closest('tr').find('td').each(function (column, td) {
        if ($(cb).is(':checked') && ($(td).hasClass('addon-price-dim') || $(td).hasClass('addon-price-green')))
        {
            $(td).removeClass('addon-price-dim');
            $(td).addClass('addon-price-green');
        }
        else if ($(td).hasClass('addon-price-dim') || $(td).hasClass('addon-price-green'))
        {
            $(td).removeClass('addon-price-green');
            $(td).addClass('addon-price-dim');
        }
    });
}

function validateMonthlyPlan(theform)
{
    if (!($('form[name=' + theform + '] input[name=plan_type][value=DLY]').is(':checked') || $('form[name=' + theform + '] input[name=plan_type][value=RTL]').is(':checked')))
    {
        $('form[name=' + theform + '] span.join-option-error').show();
        return false;
    }
    else
    {
        return true;
    }
}

function submitBillingAddr()
{
    var ccform_valid = $('#ccform').valid();
    var billing_addr_form_valid = $('#billing_addr_form').valid();
   
    if ($('#consent').hasClass('checked'))
    {
        $('#consenterror').hide();
    }
    else
    {
        $('#consenterror').show(); 
        return;
    }
    
    if (!ccform_valid || !billing_addr_form_valid) return;
  
    if ($('#billing_addr_form').find('input[name=first_name]')) $('#billing_addr_form').find('input[name=first_name]').remove();
    if ($('#billing_addr_form').find('input[name=last_name]')) $('#billing_addr_form').find('input[name=last_name]').remove();
    $('#billing_addr_form').append('<input type="hidden" name="first_name" value="' + $('#first_name').val() + '" />');
    $('#billing_addr_form').append('<input type="hidden" name="last_name" value="' + $('#last_name').val() + '" />');

    $.post('join_now_6.aspx', $('#billing_addr_form').serialize())
      .done(function (data) {     
          var fields = JSON.parse(data);
          for (var key in fields) {
              if (fields.hasOwnProperty(key)) {
                  $('#ccform').append('<input type="hidden" name="' + key.replace(/"/g, '&quot;') + '" value="' + fields[key].replace(/"/g, '&quot;') + '" />');
              }
          }
          
          $('#card_number').val($('#card_number').val().replace(/\s+/g, ''));
          $('#card_number').val($('#card_number').val().replace(/-/g, ''));
          $('#ccform').append('<input type="hidden" name="card_type" value="' + GetCardType($('#card_number').val()) + '" />');
          $('#ccform').append('<input type="hidden" name="card_expiry_date" value="' + $('#card_expiry_month').val() + '-' + $('#card_expiry_year').val() + '" />');
          $('#ccform').submit();
      });
}

function GetCardType(card_number) {
    // Visa
    var re = new RegExp("^4");
    if (card_number.match(re) != null)
        return "001";

    // Mastercard
    re = new RegExp("^5[1-5]");
    if (card_number.match(re) != null)
        return "002";

    // AMEX
    re = new RegExp("^3[47]");
    if (card_number.match(re) != null)
        return "003";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (card_number.match(re) != null)
        return "004";

    // Diners
    re = new RegExp("^36");
    if (card_number.match(re) != null)
        return "005";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (card_number.match(re) != null)
        return "005";

    return "";
}