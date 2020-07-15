package org.rpowell.jira.components.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @Value( "${cdn.url}" )
    private String cdnUrl;

    @Value( "${environment}" )
    private String environment;

    @RequestMapping("/")
    public String index(Model model) {
        model.addAttribute("cdnUrl", cdnUrl);

        if (environment.equals("dev")) {
            return "index-dev";
        } else {
            return "index";
        }
    }

}
