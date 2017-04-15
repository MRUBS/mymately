$(document).ready(function () {
    $('form input[name=use_mailing_addr]').click(function (e) {
        setBillingAddr(e);
    });
});

function setBillingAddr(e) {
    if ($(e.target).is(':checked'))
    {
        $(e.target).closest('form').find('input[name=addr_line1]').val(user_mailing_addr_line1);
        $(e.target).closest('form').find('input[name=addr_line2]').val(user_mailing_addr_line2);
        $(e.target).closest('form').find('input[name=city]').val(user_mailing_city);
        $(e.target).closest('form').find('select[name=state]').val(user_mailing_state);
        $(e.target).closest('form').find('input[name=postal_cde]').val(user_mailing_postal_cde);
    }
    else
    {
        $(e.target).closest('form').find('input[name=addr_line1]').val('');
        $(e.target).closest('form').find('input[name=addr_line2]').val('');
        $(e.target).closest('form').find('input[name=city]').val('');
        $(e.target).closest('form').find('select[name=state]').val('');
        $(e.target).closest('form').find('input[name=postal_cde]').val('');
    }
}

function submitBillingAddr(e) {
    var addr_form = $(e.target).closest('form');
    var addr_form_valid = $(addr_form).valid();

    var cc_form = $(e.target).closest('div.billing-update').find('form[name=submit_billing_info]');    
    var cc_form_valid = $(cc_form).valid();

    if (!addr_form_valid || !cc_form_valid) return;
    
    $(addr_form).append('<input type="hidden" name="first_name" value="' + $(cc_form).find('input[name=first_name]').val() + '" />');
    $(addr_form).append('<input type="hidden" name="last_name" value="' + $(cc_form).find('input[name=last_name]').val() + '" />');

    $.post($(addr_form).attr('action'), $(addr_form).serialize())
      .done(function (data) {
          var fields = JSON.parse(data);
          for (var key in fields) {
              if (fields.hasOwnProperty(key)) {
                  $(cc_form).append('<input type="hidden" name="' + key.replace(/"/g, '&quot;') + '" value="' + fields[key].replace(/"/g, '&quot;') + '" />');
              }
          }

          $(cc_form).find('input[name=card_number]').val($(cc_form).find('input[name=card_number]').val().replace(/\s+/g, ''));
          $(cc_form).find('input[name=card_number]').val($(cc_form).find('input[name=card_number]').val().replace(/-/g, ''));
          $(cc_form).append('<input type="hidden" name="card_type" value="' + GetCardType($(cc_form).find('input[name=card_number]').val()) + '" />');
          $(cc_form).append('<input type="hidden" name="card_expiry_date" value="' + $(cc_form).find('select[name=card_expiry_month]').val() + '-' + $(cc_form).find('select[name=card_expiry_year]').val() + '" />');
          $(cc_form).submit();
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
