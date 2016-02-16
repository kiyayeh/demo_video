/**
 * Part of virtualset project.
 *
 * @copyright  Copyright (C) 2015 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

;(function($)
{
    "use strict";

    window.DvsCatalog = window.DvsCatalog || {

        /**
         * Init.
         *
         * @param options
         */
        init: function(options)
        {
            this.options = $.extend({}, options)
        },

        /**
         * Add to Cart.
         *
         * @param button
         * @param id
         */
        addToCart: function(button, id)
        {
            var $button = $(button);
            var self = this;

            if (!id)
            {
                id = $('.format-list input[name=format]:checked').val();

                if (!id)
                {
                    swal(Phoenix.Translator.translate('catalog.cart.please.choice'), '', 'warning');

                    return false;
                }
            }

            $button.attr('disabled', true);

            $.ajax({
                url: this.options.uri.base.full + '/cart/add',
                data: {id: id},
                dataType: 'json',
                success: function(response)
                {
                    swal({
                        title: Phoenix.Translator.translate('catalog.cart.add.success'),
                        text: '',
                        type: 'success'
                    });

                    $button.attr('disabled', false);

                    self.cartNumberOffset(1);
                },
                error: function(error)
                {
                    swal('Error!');

                    $button.attr('disabled', false);
                }
            });

            return true;
        },

        /**
         * Cart number offset.
         *
         * @param offset
         */
        cartNumberOffset: function(offset)
        {
            var num = this.getCartNumber();

            this.setCartNumber(num + offset);
        },

        /**
         * Set cart button number
         *
         * @param num
         */
        setCartNumber: function(num)
        {
            var button = $('#cart-button-number');

            button.text(num);
        },

        /**
         * Get cart button number.
         *
         * @returns {Number}
         */
        getCartNumber: function()
        {
            var button = $('#cart-button-number');

            return parseInt(button.text());
        },

        /**
         * Add to wish list
         *
         * @param button
         * @param id
         * @param wishesRoute
         */
        addToWishList: function(button, id, wishesRoute)
        {
            var $button = $(button);

            if (!id)
            {
                id = $('.format-list input[name=format]:checked').val();

                if (!id)
                {
                    swal(Phoenix.Translator.translate('catalog.wishlist.please.choice'), '', 'warning');

                    return false;
                }
            }

            $button.attr('disabled', true);

            var self = this;

            $.ajax({
                url: this.options.uri.base.full + '/wish/add',
                data: {id: id},
                dataType: 'json',
                success: function(response)
                {
                    // Set sweet alert config
                    swal({
                        title: Phoenix.Translator.translate('catalog.wishlist.add.success'),
                        type: "success",
                        showCancelButton: true,
                        cancelButtonText: 'OK',
                        confirmButtonColor: "#5cb85c",
                        confirmButtonText: "Go to Wish list",
                        closeOnConfirm: false
                    }, function() {
                        window.location = self.options.uri.base.host + wishesRoute;
                    });

                    $button.attr('disabled', false);
                },
                error: function(error)
                {
                    swal('Error!');

                    $button.attr('disabled', false);
                }
            });

            return true;
        },

        /**
         * Remove one item from cart
         *
         * @param element
         * @param phoenix
         */
        removeOneFromCart: function(element, phoenix)
        {
            var $ele = $(element),
                formData = {'format_id': $ele.attr('data-format-id') || ''};

            phoenix.submit(null, formData, null, 'DELETE');
        },

        /**
         * Remove one item from cart
         *
         * @param phoenix
         */
        removeAllFromCart: function(phoenix)
        {
            var formData = {'format_id': 'all'};

            phoenix.submit(null, formData, null, 'DELETE');
        }
    };

})(jQuery);
