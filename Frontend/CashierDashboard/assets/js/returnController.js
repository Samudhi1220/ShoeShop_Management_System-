checkCanBeReturnedOrder();

$('#orderType').on('change', function () {
    $('#itemId').val('')
    $('#itemQtyOrders').val('')

    if ($('#orderType').val() === "One Item") {
        $('.itemId').removeClass('d-none')
        $('.itemQtyOrders').removeClass('d-none')

    } else {
        $('.itemId').addClass('d-none')
        $('.itemQtyOrders').addClass('d-none')

    }
})

function returnFullOrder(id) {
    if ($('#orderType').val() === 'Full Order') {
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/" + id,
            type: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            contentType: "application/json",
            success: function (response) {

                console.log(response.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order has been Returned",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (resp) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });
    } else if ($('#orderType').val() === 'One Item') {
        console.log("else if")
        const itemId = $('#itemId').val();
        const itemQty = $('#itemQtyOrders').val();

        const data = {
            inventory: {
                itemCode: itemId,
            },
            orderNo: {
                orderNo: id,
            },
            itmQTY: itemQty
        }
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/orders/oneItem",
            type: "POST",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {

                console.log(response.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Order has been Returned",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (resp) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: resp.responseJSON.message,
                    footer: '<a href="#"></a>'
                });
            }
        });
    }

}



function checkCanBeReturnedOrder() {
    $('#returnFormBtn').click(function () {

        let id = $('#orderId').val()
        if ($('#orderId').val() !== '') {
            performAuthenticatedRequest();
            const accessToken = localStorage.getItem('accessToken');
            $.ajax({
                url: "http://localhost:8080/api/v1/orders/" + id,
                type: "GET",
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                dataType: "json",
                success: function (response) {
                    if (response.data) {
                        returnFullOrder(id);
                        alert(response.data);
                    } else {
                        alert(response.data);
                    }
                },
                error: function (xhr, status, error) {
                    console.error('Failed to fetch:', error);
                }
            });
        }
    })
}