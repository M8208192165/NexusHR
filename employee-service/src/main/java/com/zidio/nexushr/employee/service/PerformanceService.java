package com.zidio.nexushr.employee.service;

import com.zidio.nexushr.employee.entity.Performance;
import com.zidio.nexushr.employee.repository.PerformanceRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;


@Service
public class PerformanceService {

    private final PerformanceRepository performanceRepository;

    public PerformanceService(PerformanceRepository performanceRepository) {
        this.performanceRepository = performanceRepository;
    }

    public Performance createReview(Performance performance) {
        performance.setReviewDate(LocalDate.now());
        performance.setStatus(Performance.PerformanceStatus.DRAFT);
        return performanceRepository.save(performance);
    }

    public Performance submitReview(Long id) {
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        performance.setStatus(Performance.PerformanceStatus.SUBMITTED);
        return performanceRepository.save(performance);
    }

    public Performance approveReview(Long id) {
        Performance performance = performanceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));
        performance.setStatus(Performance.PerformanceStatus.APPROVED);
        return performanceRepository.save(performance);
    }

    public List<Performance> getByEmployee(Long employeeId) {
        return performanceRepository.findByEmployeeId(employeeId);
    }

    public List<Performance> getAll() {
        return performanceRepository.findAll();
    }
}