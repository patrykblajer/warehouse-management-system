package dev.patbla.warehousemanagementsystem.exception;

import lombok.Data;
import org.springframework.http.HttpStatus;

import java.util.Map;

@Data
class ApiError {

    private HttpStatus status;
    private String message;
    private Map<String, String> errors;

    public ApiError(HttpStatus status, String message, Map<String, String> errors) {
        this.status = status;
        this.message = message;
        this.errors = errors;
    }
}