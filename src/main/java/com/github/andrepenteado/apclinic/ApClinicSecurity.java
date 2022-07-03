package com.github.andrepenteado.apclinic;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.token.grant.client.ClientCredentialsResourceDetails;

@EnableOAuth2Sso
@EnableWebSecurity
public class ApClinicSecurity extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http.authorizeRequests()
            .antMatchers("/login**").permitAll()
            .anyRequest().authenticated()
        .and()
            .cors()
        .and()
            .csrf().disable();
        // @formatter:on
    }

    @Bean
    public ClientCredentialsResourceDetails clientCredentialsResourceDetails(Environment env) {
        ClientCredentialsResourceDetails resource = new ClientCredentialsResourceDetails();
        resource.setAccessTokenUri(env.getProperty("security.oauth2.client.accessTokenUri"));
        resource.setClientId(env.getProperty("security.oauth2.client.clientId"));
        resource.setClientSecret(env.getProperty("security.oauth2.client.clientSecret"));
        return resource;
    }

}
