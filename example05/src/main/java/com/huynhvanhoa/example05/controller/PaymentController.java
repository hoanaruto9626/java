package com.huynhvanhoa.example05.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.huynhvanhoa.example05.service.VNPayService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.ui.Model;

@org.springframework.stereotype.Controller

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    private final VNPayService vnPayService;

    public PaymentController(VNPayService vnPayService) {
        this.vnPayService = vnPayService;
    }

    @PostMapping("/create-payment")
    public String createPayment(@RequestParam int orderId, @RequestParam long amount, @RequestParam String bankCode) throws Exception {
        return vnPayService.createPaymentUrl(orderId, amount, bankCode);
    }
}
