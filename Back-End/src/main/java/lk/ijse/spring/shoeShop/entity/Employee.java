package lk.ijse.spring.shoeShop.entity;

import jakarta.persistence.*;
import lk.ijse.spring.shoeShop.embedded.Address;
import lk.ijse.spring.shoeShop.embedded.Gender;
import lk.ijse.spring.shoeShop.util.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Employee {

    @Id
    private String employeeId;
    private String employeeName;
    @Column(columnDefinition = "LONGTEXT")
    private String proPic;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String employeeStatus;
    private String branch;
    private String designation;
    @Enumerated(EnumType.STRING)
    private Role role;
    @Temporal(TemporalType.DATE)
    private Date employeeDob;
    @Temporal(TemporalType.DATE)
    private Date joinDate;
    @Embedded
    private Address address;
    private String contactNo;
    @Column(unique = true)
    private String email;
    private String guardianName;
    private String emergencyContact;

}
