package com.hub.controller;


import com.hub.model.PlanType;
import com.hub.model.User;
import com.hub.response.PaymentLinkResponse;
import com.hub.service.UserService;
import com.stripe.Stripe;
import com.stripe.StripeClient;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentLink;
import com.stripe.param.PaymentLinkCreateParams;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


public class PaymentController {

    @Value("${stripe.api.key}")
    private String apiKey;
    @Value("${stripe.secret.key}")
    private String apiSecret;

    @Autowired
    private UserService userService;

//    @PostMapping("/{planType}")
//    public ResponseEntity<PaymentLinkResponse> createPaymentLink(
//            @PathVariable PlanType planType,
//            @RequestHeader("Authorization") String jwt
//            ) throws Exception {
//        User user = userService.findUserProfileByJwt(jwt);
//        int amount = 799*100;
//        if(planType.equals(PlanType.ANNUALLY)){
//            amount=amount*12;
//            amount=(int)(amount*0.7);
//        }
//
//            StripeClient stripe = new StripeClient(apiKey);
//            JSONObject paymentLinkRequest=new JSONObject();
//            paymentLinkRequest.put("amount", amount);
//            paymentLinkRequest.put("currency","INR");
//
//            JSONObject customer = new JSONObject();
//            customer.put("name",user.getFullName());
//            customer.put("email", user.getEmail());
//            paymentLinkRequest.put("customer", customer);
//
//            JSONObject notify=new JSONObject();
//            notify.put("email",true);
//            paymentLinkRequest.put("notify",notify);
//
//            paymentLinkRequest.put("callback_url","http://localhost:5173/upgrade_plan/success?planType"+planType);
//
//            PaymentLink payment=stripe.paymentLinks().create(paymentLinkRequest);
//
//            String paymentLinkId=payment.getId();
//            String paymentLinkUrl=payment.getUrl();
//
//            PaymentLinkResponse res = new PaymentLinkResponse();
//            res.setPayment_link_url(paymentLinkUrl);
//            res.setPayment_link_id(paymentLinkId);
//
//            return new ResponseEntity<>(res, HttpStatus.CREATED);
//
//
//    }
//}
@PostMapping("/{planType}")
public ResponseEntity<PaymentLinkResponse> createPaymentLink(
        @PathVariable PlanType planType,
        @RequestHeader("Authorization") String jwt
) throws Exception {
    User user = userService.findUserProfileByJwt(jwt);

    // Replace these with your actual predefined price IDs from Stripe Dashboard
    String monthlyPriceId = "price_1QAPteSFmZmFFVME6b5d5yaX";
    String annuallyPriceId = "price_1QAQ0ESFmZmFFVMEql451Q02";
    String selectedPriceId = planType.equals(PlanType.ANNUALLY) ? annuallyPriceId : monthlyPriceId;

    Stripe.apiKey = "stripe.api.key"; // Replace with your actual Stripe API key
//    Stripe.apiKey = "apiKey";
    try {
        // Step 1: Create Payment Link using the predefined Price ID
        PaymentLinkCreateParams params = PaymentLinkCreateParams.builder()
                .addLineItem(
                        PaymentLinkCreateParams.LineItem.builder()
                                .setQuantity(1L)
                                .setPrice(selectedPriceId) // Use the predefined price ID
                                .build()
                )
                .setAfterCompletion(
                        PaymentLinkCreateParams.AfterCompletion.builder()
                                .setRedirect(
                                        PaymentLinkCreateParams.AfterCompletion.Redirect.builder()
                                                .setUrl("http://localhost:5173/upgrade_plan/success?planType=" + planType)
                                                .build()
                                )
                                .build()
                )
                .build();

        PaymentLink paymentLink = PaymentLink.create(params);

        PaymentLinkResponse response = new PaymentLinkResponse();
        response.setPayment_link_url(paymentLink.getUrl());
        response.setPayment_link_id(paymentLink.getId());

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    } catch (StripeException e) {
        e.printStackTrace();
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

}
