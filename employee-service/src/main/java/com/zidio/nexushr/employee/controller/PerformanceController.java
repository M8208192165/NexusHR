package com.zidio.nexushr.employee.controller;

import com.zidio.nexushr.employee.entity.Performance;
import com.zidio.nexushr.employee.service.PerformanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/performance")
public class PerformanceController {

    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }

    @PostMapping("/review")
    public ResponseEntity<Performance> createReview(@RequestBody Performance performance) {
        return ResponseEntity.ok(performanceService.createReview(performance));
    }

    @PutMapping("/submit/{id}")
    public ResponseEntity<Performance> submitReview(@PathVariable Long id) {
        return ResponseEntity.ok(performanceService.submitReview(id));
    }

    @PutMapping("/approve/{id}")
    public ResponseEntity<Performance> approveReview(@PathVariable Long id) {
        return ResponseEntity.ok(performanceService.approveReview(id));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Performance>> getByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(performanceService.getByEmployee(employeeId));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Performance>> getAll() {
        return ResponseEntity.ok(performanceService.getAll());
    }
}