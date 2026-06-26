package com.zidio.nexushr.payroll.repository;

import com.zidio.nexushr.payroll.entity.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface PayrollRepository extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmployeeId(Long employeeId);
    Optional<Payroll> findByEmployeeIdAndPayrollMonth(Long employeeId, LocalDate month);
}