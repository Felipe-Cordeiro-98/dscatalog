package com.dscatalog.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API DSCatalog")
                        .version("1.0")
                        .contact(new Contact()
                                .name("Felipe Cordeiro")
                                .email("felipecordeirocruz@gmail.com")
                                .url("https://github.com/Felipe-Cordeiro-98"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apche.org/licenses/LICENSE-2.0")));
    }
}
