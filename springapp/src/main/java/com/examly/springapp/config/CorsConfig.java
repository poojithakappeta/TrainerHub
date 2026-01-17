package com.examly.springapp.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration config = new CorsConfiguration();

        // ✅ Allowed frontend origins
        config.setAllowedOrigins(List.of(
                "http://localhost:4200",
                "https://soft-chebakia-9ef9ec.netlify.app"
        ));

        // ✅ Allowed HTTP methods
        config.setAllowedMethods(List.of(
                "GET", "POST", "PUT", "DELETE", "OPTIONS"
        ));

        // ✅ Allowed headers
        config.setAllowedHeaders(List.of("*"));

        // ⚠️ Keep this FALSE since you're using JWT (not cookies)
        config.setAllowCredentials(false);

        // Apply CORS to all endpoints
        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
