package com.zidio.nexushr.employee.repository;

import com.zidio.nexushr.employee.entity.Leave;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRepository extends JpaRepository<Leave, Long> {
    List<Leave> findByEmployeeId(Long employeeId);
    List<Leave> findByStatus(Leave.LeaveStatus status);
}