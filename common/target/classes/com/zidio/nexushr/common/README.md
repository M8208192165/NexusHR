# common module

This is where shared code lives: DTOs used across services, custom exceptions,
shared validation annotations, utility classes.

Nothing here yet — add classes as you need to share code between
auth-service / employee-service / payroll-service.

Example structure once you start:
  com.zidio.nexushr.common.dto.ApiResponse
  com.zidio.nexushr.common.exception.ResourceNotFoundException
  com.zidio.nexushr.common.exception.GlobalExceptionHandler
