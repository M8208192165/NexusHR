package com.zidio.nexushr.payroll.service;

import com.zidio.nexushr.payroll.entity.Payroll;
import com.zidio.nexushr.payroll.repository.PayrollRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class PayrollService {

    private final PayrollRepository payrollRepository;

    public PayrollService(PayrollRepository payrollRepository) {
        this.payrollRepository = payrollRepository;
    }

    public Payroll processPayroll(Long employeeId, Double basicSalary) {
        LocalDate currentMonth = LocalDate.now().withDayOfMonth(1);

        // Check if already processed
        payrollRepository.findByEmployeeIdAndPayrollMonth(employeeId, currentMonth)
                .ifPresent(p -> { throw new RuntimeException("Payroll already processed for this month"); });

        // Calculate allowances (standard percentages)
        double houseAllowance = basicSalary * 0.20;
        double transportAllowance = basicSalary * 0.10;
        double medicalAllowance = basicSalary * 0.05;

        // Calculate gross
        double grossSalary = basicSalary + houseAllowance + transportAllowance + medicalAllowance;

        // Calculate tax (10% on gross)
        double taxDeduction = grossSalary * 0.10;

        // Calculate net salary
        double netSalary = grossSalary - taxDeduction;

        Payroll payroll = Payroll.builder()
                .employeeId(employeeId)
                .basicSalary(basicSalary)
                .houseAllowance(houseAllowance)
                .transportAllowance(transportAllowance)
                .medicalAllowance(medicalAllowance)
                .taxDeduction(taxDeduction)
                .otherDeductions(0.0)
                .netSalary(netSalary)
                .payrollMonth(currentMonth)
                .status(Payroll.PayrollStatus.PROCESSED)
                .build();

        return payrollRepository.save(payroll);
    }

    public List<Payroll> getPayrollByEmployee(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }

    public Payroll markAsPaid(Long payrollId) {
        Payroll payroll = payrollRepository.findById(payrollId)
                .orElseThrow(() -> new RuntimeException("Payroll not found"));
        payroll.setStatus(Payroll.PayrollStatus.PAID);
        return payrollRepository.save(payroll);
    }

    public List<Payroll> getAllPayrolls() {
        return payrollRepository.findAll();
    }
}