"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentEmailMessage = exports.accountEmailMessage = exports.orderEmailMessage = void 0;
const orderEmailMessage = (order) => {
    return `
    <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 0; background: #f9fafb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #eaeaea;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 25px 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 600;">🎉 Order Received!</h1>
        <p style="opacity: 0.9; margin: 8px 0 0; font-size: 16px;">ORDER-#${order.id}</p>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 30px 20px; background: #ffffff;">
        <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 20px;">
          Hi ${order.User?.name || "Valued Customer"},<br><br>
          Thank you for shopping with Kivamall Global Online Store! We've received your order and it will be processed once payment is confirmed.
        </p>
        
        <!-- Payment Alert -->
        <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <h3 style="margin-top: 0; color: #856404; font-size: 16px; display: flex; align-items: center;">
            <span style="margin-right: 8px;">⚠️</span> Payment Required
          </h3>
          <p style="margin: 8px 0 0; color: #856404; font-size: 15px;">
            Please complete your payment to confirm and process your order.
          </p>
        </div>
        
        <!-- Order Summary -->
        <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #1e293b; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Order Summary</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; width: 40%;">Order Total:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1e293b;">KES ${order.totalPrice}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Payment Status:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: 500; color: #d9534f;">Pending</td>
            </tr>
          </table>
          
          <h3 style="color: #1e293b; font-size: 16px; margin: 20px 0 10px;">Shipping Address</h3>
          <div style="background: #ffffff; border-radius: 6px; padding: 12px; font-size: 14px; line-height: 1.5; border: 1px solid #e2e8f0;">
            <p style="margin: 0;">
              ${order.streetAddress || ""}${order.apartment ? `, ${order.apartment}` : ""}<br>
              ${order.county || ""}, ${order.postcode || ""}<br>
              ${order.country || ""}
            </p>
          </div>
        </div>
        
        <!-- CTA Button -->
        <div style="text-align: center; margin: 30px 0 20px;">
          <a href="${"#"}" style="display: inline-block; padding: 10px 28px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: background-color 0.3s;">
            🔐 Complete Payment Now
          </a>
          <p style="margin: 15px 0 0; font-size: 14px; color: #64748b;">
            Payment link expires in 24 hours
          </p>
        </div>
        
        <!-- Support Info -->
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
          <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 12px;">Need help with your order?</h3>
          <p style="font-size: 14px; color: #64748b; margin: 8px 0;">
            Contact our support team at <a href="mailto:support@kivamall.com" style="color: #2563eb; text-decoration: none;">support@kivamall.com</a> or reply to this email.
          </p>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="padding: 20px; text-align: center; background: #f1f5f9; color: #64748b; font-size: 14px;">
        <p style="margin: 0 0 10px;">Kivamall Global Online Store</p>
        <p style="margin: 0; font-size: 13px;">© ${new Date().getFullYear()} Kivamall. All rights reserved.</p>
      </div>
    </div>
  `;
};
exports.orderEmailMessage = orderEmailMessage;
const accountEmailMessage = (user) => {
    return `
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 0; background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #eaeaea;">
          <!-- Header with Branding -->
          <div style="background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 30px 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">Welcome to ${"KivaMall Global Store"}!</h1>
            <p style="opacity: 0.9; margin: 8px 0 0; font-size: 16px;">Your account is all set up and ready to go</p>
          </div>

          <!-- Main Content -->
          <div style="padding: 30px 20px; background: #ffffff;">
            <p style="font-size: 15px; line-height: 1; color: #4b5563; margin-bottom: 20px;">
              Hi ${user.name || "there"},<br><br>
              Thank you for joining Kivamall Global Online Store! We're excited to have you as part of our community.
            </p>

            <!-- Account Info Card -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h3 style="margin-top: 0; color: #1e293b; font-size: 18px;">Your Account Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #64748b; width: 120px;">Email:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${user.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #64748b;">Joined:</td>
                  <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })}</td>
                </tr>
              </table>
            </div>

            <div style="text-align: center; margin: 25px 0;">
              <div style="display: inline-block; padding: 9px 24px; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); transition: all 0.3s;">
                Email Address Verified successfully
              </div>
            </div>

            <div style="margin-top: 30px;">
              <h3 style="color: #1e293b; font-size: 18px; margin-bottom: 12px;">What's next?</h3>
              <ul style="padding-left: 20px; margin: 0; color: #4b5563; line-height: 1.6;">
                <li>Browse our latest products and collections</li>
                <li>Save items to your wishlist for later</li>
                <li>Enjoy faster checkout with your saved details</li>               
                <li>Now you have access all our features</li>   
              </ul>
            </div>
            <!-- Support Info -->
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 12px;">Need help with your order?</h3>
              <p style="font-size: 14px; color: #64748b; margin: 8px 0;">
                Contact our support team at <a href="mailto:support@kivamall.com" style="color: #2563eb; text-decoration: none;">support@kivamall.com</a> or reply to this email.
              </p>
            </div>
          </div>

          <div style="padding: 20px; text-align: center; background: #f1f5f9; color: #64748b; font-size: 14px;">
            <p style="margin: 0 0 10px;">Kivamall Global Online Store</p>
            <p style="margin: 0; font-size: 13px;">© ${new Date().getFullYear()} Kivamall. All rights reserved.</p>
          </div>
        </div>
      `;
};
exports.accountEmailMessage = accountEmailMessage;
const paymentEmailMessage = (order) => {
    return `
      <div style="background: #f3f3f3; padding: 37px 1px;">
        <div style="font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: auto; padding: 0; background: #f9fafb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #eaeaea;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px 20px; text-align: center; color: white; position: relative;">
            <div style="position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 20px; font-size: 12px; font-weight: 500;">
              Paid • ${new Date(order.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            </div>
            <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 0.5px;">Payment Confirmed!</h1>
            <p style="opacity: 0.9; margin: 8px 0 0; font-size: 16px; font-weight: 400;">
              Order #${order.order?.trackingNumber?.slice(0, 12) || "ORD-XXXXXX"}
            </p>
          </div>

          <!-- Main Content -->
          <div style="padding: 30px 20px; background: #ffffff;">
            <p style="font-size: 16px; line-height: 1.6; color: #4b5563; margin-bottom: 20px;">
              Hi ${order.user?.name || ""},<br><br>
              Thank you for your purchase! We've received your payment of <strong>${order.currency} ${order.amount}</strong> and your order is being processed.
            </p>

            <!-- Order Summary Card -->
            <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0;">
              <h3 style="margin-top: 0; color: #1e293b; font-size: 18px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;">Order Summary</h3>

              ${order.order?.OrderItems.map((item) => `
                <div style="display: flex; margin: 15px 0; align-items: center;">
                  <div style="width: 60px; height: 60px; background: #e2e8f0; border-radius: 4px; margin-right: 15px; overflow: hidden;">
                    ${item.Product.productImages
        ? `<img src="${item.Product.productImages.find((im) => im.isMain === true)?.url}" alt="${item.Product.name}" style="width: 100%; height: 100%; object-fit: cover;">`
        : ""}
                  </div>
                  <div style="flex: 1;">      
                    <p style="margin: 0 0 5px; font-weight: 600; color: #1e293b; font-size: 15px;">${item.Product.name}</p>
                   
                    <p style="margin: 0 0 3px; color: #64748b; font-size: 14px;">Qty: ${item.quantity}</p>
                    <p style="margin: 0; color: #1e293b; font-weight: 500;">${order.currency} ${item.price}</p>

                  </div>
                </div>
              `).join("")}

              <div style="border-top: 1px solid #e2e8f0; margin-top: 15px; padding-top: 15px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #64748b;">Subtotal</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 500; color: #1e293b;">${order.currency} ${order.amount}</td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 8px 0; font-weight: 600; color: #1e293b;">Total</td>
                    <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #1e293b;">${order.currency} ${order.amount}</td>
                  </tr>
                </table>
              </div>
            </div>

            <div style="display: flex; flex-wrap: wrap; gap: 30px; margin: 25px 0; width: 100%;">
              <div style="flex: 1; min-width: 200px;">
                <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 10px;">Shipping Address</h3>
                <div style="background: #f8fafc; border-radius: 6px; padding: 12px; font-size: 14px;">
                  <p style="margin: 0 0 5px; font-weight: 500;">${order.user?.name}</p>
                  <ul style="padding-left: 20px; margin: 0; color: #4b5563; line-height: 1.6;">
                    <li>${order.order?.country}</li>
                    <li>${order.order?.county}</li>
                    <li>${order.order?.city}</li>               
                    <li>${order.order?.streetAddress}</li>   
                    <li>${order.order?.postcode}</li>   
                    <li>${order.order?.apartment}</li>   
                  </ul>
                </div>
              </div>

              <div style="flex: 1; min-width: 200px;">
                <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 10px;">Payment Method</h3>
                <div style="background: #f8fafc; border-radius: 6px; padding: 12px; font-size: 14px;">
                  <p style="margin: 0 0 5px; font-weight: 500;">${order.paymentMethod}</p>
                  <p style="margin: 0; color: #64748b;">Paid on ${new Date(order.createdAt
        ? new Date(order.createdAt).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        : "Unknown date").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })}</p>
                </div>
              </div>
            
                          
            </div>

            <div style="margin-top: 30px;">
              <h3 style="color: #1e293b; font-size: 18px; margin-bottom: 12px;">What happens next?</h3>
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <div style="background: #d1fae5; color: #065f46; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">1</div>
                <div>
                  <p style="margin: 0 0 5px; font-weight: 500; color: #1e293b;">Order Processing</p>
                  <p style="margin: 0; color: #64748b; font-size: 14px;">We're preparing your items for shipment</p>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start; margin-bottom: 15px;">
                <div style="background: #dbeafe; color: #1e40af; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">2</div>
                <div>
                  <p style="margin: 0 0 5px; font-weight: 500; color: #1e293b;">Shipping Update</p>
                  <p style="margin: 0; color: #64748b; font-size: 14px;">You'll receive tracking information once your order ships</p>
                </div>
              </div>
              <div style="display: flex; align-items: flex-start;">
                <div style="background: #ede9fe; color: #5b21b6; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">3</div>
                <div>
                  <p style="margin: 0 0 5px; font-weight: 500; color: #1e293b;">Delivery</p>
                  <p style="margin: 0; color: #64748b; font-size: 14px;">Expected by ${"1-2 business days"}</p>
                </div>
              </div>
            </div>

            <div style="text-align: center; margin: 30px 0 20px;">
              <a href="${"https://I will add it later"}" style="display: inline-block; padding: 9px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                View Your Order
              </a>
              <p style="margin: 10px 0 0; font-size: 14px; color: #64748b;">
                Having questions? <a href="mailto:support@example.com" style="color: #2563eb; text-decoration: none;">Contact us</a>
              </p>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; font-size: 16px; margin-bottom: 12px;">Need help with your order?</h3>
              <p style="font-size: 14px; color: #64748b; margin: 8px 0;">
                Contact our support team at <a href="mailto:support@kivamall.com" style="color: #2563eb; text-decoration: none;">support@kivamall.com</a> or reply to this email.
              </p>
            </div>
          </div>

          <div style="padding: 20px; text-align: center; background: #fff; color: #64748b; font-size: 14px;">
            <p style="margin: 0 0 10px;">Kivamall Global Online Store</p>
            <p style="margin: 0; font-size: 13px;">© ${new Date().getFullYear()} Kivamall. All rights reserved.</p>
          </div>
        </div>
      </div>
      `;
};
exports.paymentEmailMessage = paymentEmailMessage;
