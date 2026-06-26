package com.zidio.nexushr.payroll.controller;

import com.zidio.nexushr.payroll.entity.Payroll;
import com.zidio.nexushr.payroll.service.PayrollService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payroll")
@CrossOrigin(origins = "http://localhost:5173")
public class PayrollController {

    private final PayrollService payrollService;

    public PayrollController(PayrollService payrollService) {
        this.payrollService = payrollService;
    }

    @PostMapping("/process/{employeeId}")
    public ResponseEntity<Payroll> processPayroll(
            @PathVariable Long employeeId,
            @RequestBody Map<String, Double> body) {
        Double basicSalary = body.get("basicSalary");
        return ResponseEntity.ok(payrollService.processPayroll(employeeId, basicSalary));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayrollByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(payrollService.getPayrollByEmployee(employeeId));
    }

    @PutMapping("/paid/{payrollId}")
    public ResponseEntity<Payroll> markAsPaid(@PathVariable Long payrollId) {
        return ResponseEntity.ok(payrollService.markAsPaid(payrollId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Payroll>> getAllPayrolls() {
        return ResponseEntity.ok(payrollService.getAllPayrolls());
    }
}