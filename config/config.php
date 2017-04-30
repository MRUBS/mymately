<?php
return [
    'subject' => [
        'prefix' => 'Reserve Membership'
    ],
    'emails' => [
        'to'   => 'Brandon.greenberg@matelyhealth.com',
        'from' => ''
    ],
    'messages' => [
        'error'   => 'There was an error sending, please try again later.',
        'success' =>  '<div class="cst-success-message">'
					. '<div class="cst-success-img"></div>'
					. '<h1 class="cst-success-heading">Success!</h1>'
					. '<p class="cst-success-para">Add some text here about what will happen next.</p>'
					. '<a href="/index.html" class="btn btn-default cst-success-btn">BACK TO HOME</a>'
					. '</div>',
        'validation' => [
            'emptyfirstname'    => 'Name is required.',
            'emptylastname'    => 'Name is required.',
            'emptyemail'   => 'Email is invalid.'
        ]
    ],
    'fields' => [
        'firstname'     => 'First Name',
        'lastname'     => 'Last Name',
        'email'    => 'Email Address',
        'btn-send' => 'SUBMIT'
    ]
];