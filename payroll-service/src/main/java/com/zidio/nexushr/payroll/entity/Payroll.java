package com.zidio.nexushr.payroll.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "payroll")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Payroll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long employeeId;

    @Column(nullable = false)
    private Double basicSalary;

    private Double houseAllowance;
    private Double transportAllowance;
    private Double medicalAllowance;
    private Double taxDeduction;
    private Double otherDeductions;
    private Double netSalary;

    @Column(nullable = false)
    private LocalDate payrollMonth;

    @Enumerated(EnumType.STRING)
    private PayrollStatus status;

    public enum PayrollStatus {
        DRAFT, PROCESSED, PAID
    }
}