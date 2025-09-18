package vn.viettel.vdt_gd2.service;

import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import vn.viettel.vdt_gd2.entity.User;
import vn.viettel.vdt_gd2.entity.dto.request.AuthRequest;
import vn.viettel.vdt_gd2.entity.dto.response.AuthResponse;
import vn.viettel.vdt_gd2.repository.UserRepository;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    UserRepository userRepo;
    PasswordEncoder encoder;

    @NonFinal
    @Value("${jwt.issuer}")
    String issuer;

    @NonFinal
    @Value("${jwt.secret-key}")
    String secretKey;

    @NonFinal
    @Value("${jwt.duration.access-token}")
    int accessTokenDuration;

    @NonFinal
    @Value("${jwt.duration.refresh-token}")
    int refreshTokenDuration;

    public AuthResponse logIn(AuthRequest request){
        var result = userRepo.findByUsername(request.username());
        if(result.isEmpty()){
            return AuthResponse.builder()
                    .isAuthenticated(false)
                    .build();
        }

        User user = result.get();
        if(encoder.matches(request.password(), user.getPassword())) {
            String refreshToken = generateRefreshToken(user);

            return AuthResponse.builder()
                    .isAuthenticated(true)
                    .jwtToken(getToken(user, accessTokenDuration))
                    .build();
        }
//        throw new AppException(StatusCode.UNAUTHENTICATED);
        throw new RuntimeException("");
    }

    private String generateRefreshToken(User user){
        String refreshToken = getToken(user, refreshTokenDuration);
        return refreshToken;
    }

//    public AuthResponse refreshAccessToken(String refreshToken){
//        User user = userService.getCurrentUser();
//        String getCachedRefreshToken = getCachedRefreshToken(user.getId());
//        if(!refreshToken.equals(getCachedRefreshToken))
//            throw new AppException(StatusCode.UNCATEGORIZED);
//
//        String newRefreshToken = generateRefreshToken(user);
//        return AuthResponse.builder()
//                    .userId(user.getId())
//                    .accessToken(getToken(user, accessTokenDuration))
//                    .refreshToken(newRefreshToken)
//                    .build();
//    }

    private String getToken(User user, int duration){
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(String.valueOf(user.getId()))
                .issuer(issuer)
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(duration, ChronoUnit.MINUTES).toEpochMilli()
                ))
        .build();

        Payload payload = new Payload(claimsSet.toJSONObject());
        JWSObject object = new JWSObject(header, payload);

        try{
            object.sign(new MACSigner(secretKey.getBytes()));
            return object.serialize();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
