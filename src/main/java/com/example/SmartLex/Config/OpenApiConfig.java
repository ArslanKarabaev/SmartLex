package com.example.SmartLex.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                contact = @Contact(
                        name = "Arslan Karabaev",
                        email = "karabaevarslan8@gmail.com"
                ),
                title = "OpenAPI",
                description = "OpenAPI documentation for SmartLex",
                version = "1.0"
        ),
        servers = {
                @Server(
                        description = "Railway",
                        url = "https://smartlex-production.up.railway.app/"
                ),
                @Server(
                        description = "Local ENV",
                        url = "http://localhost:8080"
                )
        }
)
public class OpenApiConfig {
}