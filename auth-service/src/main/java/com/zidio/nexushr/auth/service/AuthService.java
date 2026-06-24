package com.zidio.nexushr.auth.service;

import com.zidio.nexushr.auth.dto.*;
import com.zidio.nexushr.auth.entity.Employee;
import com.zidio.nexushr.auth.entity.Role;
import com.zidio.nexushr.auth.repository.EmployeeRepository;
import com.zidio.nexushr.auth.repository.RoleRepository;
import com.zidio.nexushr.auth.security.JwtUtils;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class AuthService {

    private final EmployeeRepository employeeRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthService(EmployeeRepository employeeRepository,
                       RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder,
                       JwtUtils jwtUtils,
                       AuthenticationManager authenticationManager) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
        this.authenticationManager = authenticationManager;
    }

    public AuthResponse signup(SignupRequest request) {
        if (employeeRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        String roleName = request.getRole() != null ? request.getRole() : "ROLE_EMPLOYEE";
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
        Employee employee = Employee.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Set.of(role))
                .enabled(true)
                .build();
        employeeRepository.save(employee);
        String accessToken = jwtUtils.generateToken(employee.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(employee.getEmail());
        return new AuthResponse(accessToken, refreshToken, employee.getEmail(), roleName);
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()));
        Employee employee = employeeRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));
        String accessToken = jwtUtils.generateToken(employee.getEmail());
        String refreshToken = jwtUtils.generateRefreshToken(employee.getEmail());
        String roleName = employee.getRoles().iterator().next().getName();
        return new AuthResponse(accessToken, refreshToken, employee.getEmail(), roleName);
    }

    public AuthResponse refresh(String refreshToken) {
        if (!jwtUtils.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid refresh token");
        }
        String email = jwtUtils.getEmailFromToken(refreshToken);
        String newAccessToken = jwtUtils.generateToken(email);
        String newRefreshToken = jwtUtils.generateRefreshToken(email);
        Employee employee = employeeRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        String roleName = employee.getRoles().iterator().next().getName();
        return new AuthResponse(newAccessToken, newRefreshToken, email, roleName);
    }
}