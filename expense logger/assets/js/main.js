(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    
})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    const addExpenseForm = document.getElementById('addExpenseForm');
    const expenseTableBody = document.querySelector('table tbody');

    // Function to add a new expense
    function addExpense(remark, expenditure, date, amount) {
        const row = document.createElement('tr');

        const expenditureType = expenditure == '1' ? 'Income' : 'Expense';
        const expenditureClass = expenditure == '1' ? 'income-td' : 'expense-td';

        row.innerHTML = `
            <th scope="row">${expenseTableBody.rows.length + 1}</th>
            <td>${remark}</td>
            <td><h6><span class="${expenditureClass}">${expenditureType}</span></h6></td>
            <td>${date}</td>
            <td>${amount}</td>
            <td>
                <button type="button" class="btn btn-secondary me-3 edit-btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit">
                    <i class="bi bi-pen fs-5"></i>
                </button>
                <button type="button" class="btn btn-danger delete-btn" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                    <i class="bi bi-trash fs-5"></i>
                </button>
            </td>
        `;

        expenseTableBody.appendChild(row);

        // Attach delete event listener
        row.querySelector('.delete-btn').addEventListener('click', deleteExpense);
    }

    // Function to delete an expense
    function deleteExpense(event) {
        const row = event.target.closest('tr');
        row.remove();

        // Update row numbers
        updateRowNumbers();
    }

    // Function to update row numbers
    function updateRowNumbers() {
        Array.from(expenseTableBody.rows).forEach((row, index) => {
            row.cells[0].textContent = index + 1;
        });
    }

    // Handle form submission
    addExpenseForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const remark = document.getElementById('remark').value;
        const expenditure = document.getElementById('expenditure').value;
        const date = document.getElementById('date').value;
        const amount = document.getElementById('amount').value;

        if (remark && expenditure && date && amount) {
            addExpense(remark, expenditure, date, amount);

            // Reset form
            addExpenseForm.reset();

            // Close modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
            modal.hide();
        }
    });

    // Attach delete event listeners to existing delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', deleteExpense);
    });
});
