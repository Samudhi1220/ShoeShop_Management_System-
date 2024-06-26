const formCloseEmployee = $('.from_close');
  const  btnCancel = $('.cancelBtn');
  const  imgUploader = $('#imgUploader');
  const homeClass = $('.home');

var base64String;


imageUploaderEmployee();
clickTblRow();
getAllEmployeeData()
searchEmployee()


function getAllEmployeeData() {
    performAuthenticatedRequest();
    const accessToken = localStorage.getItem('accessToken');
    $.ajax({
         url: "http://localhost:8080/api/v1/employees",
        method: "GET",
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        success: function (resp) {
            console.log("Success: ", resp);
            $('#tblEmployee tbody').empty();
            for (const employee of resp.data) {
                const row = `<tr>
                         
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + ", " + employee.address.lane + ", " + employee.address.state + ", " + employee.address.city + ", " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                
                                        <td>     
                                         <img src="assets/images/action-btn (1) (1).png" id="showDetails" height="35" width="35"/>
                            </td>
                            </tr>`;
                $('#tblEmployee tbody').append(row);
            }
        },
        error: function (error) {
            console.log("error: ", error);
        }
    })
}


function imageUploaderEmployee() {
    const imgUploader = $('#imgUploaderEmployee');
    const imgViewer = $('#imgViewerEmployee');

    imgUploader.change(function () {

        var file = this.files[0];

        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                imgViewer.attr('src', e.target.result);
                base64String = reader.result.split(',')[1];
            };

            reader.readAsDataURL(file);
        } else {
            imgViewer.attr('src', '#');
        }
    })
}

function setDataToTextField(response) {

    $('#employeeCode').val(response.employeeId);
    $('#employeeName').val(response.employeeName);
    $('#employeeStatus').val(response.employeeStatus);
    $('#employeeBranch').val(response.branch);
    $('#employeeDesignation').val(response.designation);
    $('#employeeDOJ').val(response.joinDate);
    $('#employeeDOB').val(response.employeeDob);
    $('#employeeBuilding').val(response.address.buildNo);
    $('#employeeCity').val(response.address.city);
    $('#employeeLane').val(response.address.lane);
    $('#employeeState').val(response.address.state);
    $('#employeePostalCode').val(response.address.postalCode);
    $('#employeeEmail').val(response.email);
    $('#employeeGuardian').val(response.guardianName);
    $('#employeeContactNumber').val(response.contactNo);
    $('#employeeGuardianContact').val(response.emergencyContact);
    $('#employeeGender').val(response.gender);
    $('#employeeRole').val(response.role);

    console.log(response.role)

    base64String = response.proPic;
    $('#imgViewer').attr('src', 'data:image/jpeg;base64,' + response.proPic)
}

function clickTblRow() {

    $('#tblEmployee').on('click', 'tr', function (event) {


    });

    $('#tblEmployee').on('click', '#showDetails', function (event) {

        $('#mainLabel').text('Employee Details')
        homeClass.addClass('show')
        $('#addbtn').text("Details")
        $("#employeeGender").prop('disabled', true);
        $("#employeeDOB").prop('disabled', true);
        $("#employeeDOJ").prop('disabled', true);
        $("#employeeRole").prop('disabled', true);

        disableTxtField();
        var row = $(this).closest('tr');
        var id = row.find('td:eq(0)').text();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/employees/" + id,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {

                console.log(response);
                setDataToTextField(response)
                getAllEmployeeData();

            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch image:', error);
            }
        });
        console.log(id)
    });


}


function disableTxtField() {
    $('.txt').attr('readonly', "");

}

function enableTxtField() {
    $('.txt').removeAttr('readonly');
}


formCloseEmployee.click(function () {
    homeClass.removeClass('show');
    $('.form-container').css('max-width', '800px')
})
btnCancel.click(function () {
    homeClass.removeClass('show');
    $('.form-container').css('max-width', '800px')

})

imgUploader.change(function () {
    var file = $(this)[0].files[0];
    if (file) {
        // $('#fileValue').text('Selected file: ' + file.name);
        console.log(file.name)
    } else {
        // $('#fileValue').text('No file selected');
    }
});




function searchEmployee() {
    $('#search_employee').keyup(function (event) {
        var idOrName = $(this).val();
        performAuthenticatedRequest();
        const accessToken = localStorage.getItem('accessToken');
        $.ajax({
            url: "http://localhost:8080/api/v1/employees?idOrName=" + idOrName + "&activeStatus=" + true,
            type: "GET",
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            dataType: "json",
            success: function (response) {
                $('#tblEmployee tbody').empty()
                for (const employee of response.data) {
                    const row = `<tr>
                             
                                <td>${employee.employeeId}</td>
                                <td>${employee.employeeName}</td>
                                <td>${employee.address.buildNo + " " + employee.address.lane + " " + employee.address.state + " " + employee.address.city + " " + employee.address.postalCode}</td>
                                <td>${employee.contactNo}</td>
                                <td>${employee.joinDate}</td>
                                <td>${employee.branch}</td>
                                
                            </tr>`;
                    $('#tblEmployee').append(row);
                }
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


    })
}

