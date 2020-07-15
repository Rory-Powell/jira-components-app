package org.rpowell.jira.components.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Controller
public class JiraController {

    private RestTemplate restTemplate;

    private static final Logger LOG = LoggerFactory.getLogger(JiraController.class);

    public JiraController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @RequestMapping("/proxy")
    public ResponseEntity<Object> search(@RequestParam("jql") String jql) {
        LOG.info("GET /proxy");

        HttpHeaders headers = new HttpHeaders();
        // TODO: Add authorization headers
        
        Map<String, Object> request = new HashMap<>();
        request.put("jql", jql);
        request.put("startAt", 0);
        request.put("maxResults", 5000);

        ResponseEntity<Object> response = restTemplate.exchange("https://your-server-here.com/rest/api/2/search",
                                                        HttpMethod.POST,
                                                        new HttpEntity<>(request, headers),
                                                        Object.class);

        LOG.info("success");
        return response;
    }

}
