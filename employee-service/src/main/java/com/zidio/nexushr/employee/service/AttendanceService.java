package com.zidio.nexushr.employee.service;

import com.zidio.nexushr.employee.entity.Attendance;
import com.zidio.nexushr.employee.repository.AttendanceRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public AttendanceService(AttendanceRepository attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }

    public Attendance checkIn(Long employeeId) {
        LocalDate today = LocalDate.now();
        attendanceRepository.findByEmployeeIdAndAttendanceDate(employeeId, today)
                .ifPresent(a -> { throw new RuntimeException("Already checked in today"); });

        Attendance attendance = Attendance.builder()
                .employeeId(employeeId)
                .attendanceDate(today)
                .checkIn(LocalDateTime.now())
                .status(Attendance.AttendanceStatus.PRESENT)
                .build();
        return attendanceRepository.save(attendance);
    }

    public Attendance checkOut(Long employeeId) {
        Attendance attendance = attendanceRepository
                .findByEmployeeIdAndAttendanceDate(employeeId, LocalDate.now())
                .orElseThrow(() -> new RuntimeException("No check-in found for today"));
        attendance.setCheckOut(LocalDateTime.now());
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendance(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }
}