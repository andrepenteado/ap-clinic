package com.github.andrepenteado.apclinic;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.security.Principal;

@Component
@Slf4j
public class MDCLogFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        try {
            HttpServletRequest httpReq = (HttpServletRequest)request;
            SecurityContextImpl sci = null;
            if (httpReq.getSession(false) != null) {
                sci = (SecurityContextImpl) (httpReq).getSession(false).getAttribute("SPRING_SECURITY_CONTEXT");
            }
            Authentication userLogin = null;
            if (sci != null) {
                userLogin = sci.getAuthentication();
            }
            if (userLogin != null) {
                MDC.put("USER", userLogin.getName());
                MDC.put("IP", request.getRemoteAddr());
            }
            chain.doFilter(request, response);
        }
        catch (Exception ex) {
            log.error("Erro preenchendo usuário no MDC", ex);
        }
        finally {
            MDC.clear();
        }
    }

    @Override
    public void destroy() {
    }
}
