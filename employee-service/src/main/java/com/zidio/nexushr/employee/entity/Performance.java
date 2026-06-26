package com.zidio.nexushr.employee.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "performance")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long employeeId;

    @Column(nullable = false)
    private String reviewerName;

    private String goals;
    private String achievements;
    private String feedback;

    @Column(nullable = false)
    private Integer rating; // 1-5

    @Enumerated(EnumType.STRING)
    private PerformanceStatus status;

    @Column(nullable = false)
    private LocalDate reviewDate;

    public enum PerformanceStatus {
        DRAFT, SUBMITTED, APPROVED
    }
}