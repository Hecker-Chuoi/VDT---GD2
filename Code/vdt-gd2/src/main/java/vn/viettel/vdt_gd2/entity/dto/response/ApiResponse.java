package vn.viettel.vdt_gd2.entity.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse <T>{
    @Builder.Default
    StatusCode code = StatusCode.OK; // Default HTTP status code for OK
    String detail; // Optional detail message for the response
    T result; // The result of the API call, can be any type
}
