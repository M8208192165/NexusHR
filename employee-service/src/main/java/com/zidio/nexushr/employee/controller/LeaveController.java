package com.zidio.nexushr.employee.controller;

import com.zidio.nexushr.employee.entity.Leave;
import com.zidio.nexushr.employee.service.LeaveService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PostMapping("/apply")
    public ResponseEntity<Leave> applyLeave(@RequestBody Leave leave) {
        return ResponseEntity.ok(leaveService.applyLeave(leave));
    }

    @PutMapping("/approve/{leaveId}")
    public ResponseEntity<Leave> approveLeave(@PathVariable Long leaveId) {
        return ResponseEntity.ok(leaveService.approveLeave(leaveId));
    }

    @PutMapping("/reject/{leaveId}")
    public ResponseEntity<Leave> rejectLeave(@PathVariable Long leaveId) {
        return ResponseEntity.ok(leaveService.rejectLeave(leaveId));
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Leave>> getLeavesByEmployee(@PathVariable Long employeeId) {
        return ResponseEntity.ok(leaveService.getLeavesByEmployee(employeeId));
    }

    @GetMapping("/pending")
    public ResponseEntity<List<Leave>> getPendingLeaves() {
        return ResponseEntity.ok(leaveService.getPendingLeaves());
    }
}