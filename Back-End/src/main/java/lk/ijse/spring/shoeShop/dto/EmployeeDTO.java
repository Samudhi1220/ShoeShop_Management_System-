package lk.ijse.spring.shoeShop.dto;

import jakarta.persistence.*;
import lk.ijse.spring.shoeShop.embedded.Address;
import lk.ijse.spring.shoeShop.embedded.Gender;
import lk.ijse.spring.shoeShop.util.Role;

import java.util.Date;


public class EmployeeDTO {

    private String employeeId;
    private String employeeName;
    private String proPic;
    private Gender gender;
    private String employeeStatus;
    private String branch;
    private String designation;
    private Role role;
    private Date employeeDob;
    private Date joinDate;
    private Address address;
    private String contactNo;
    private String email;
    private String guardianName;
    private String emergencyContact;
}
