"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.route("/signup").post(authMiddleware_1.validUserSignInput, authController_1.signInUser);
router.route("/login").post(authController_1.loginUser);
router.route("/deleteUser/:id").delete(authController_1.deleteCurrentUser);
router.route("/updatePassword").patch(authController_1.protect, authController_1.updatePassword);
//resendVerificationEmail
router.route("/request-reset").post(authController_1.requestPasswordReset);
router.route("/validate-reset-token").post(authController_1.validateResetToken);
router.route("/reset-password").post(authController_1.resetPassword);
router.route("/verify-email/:token").post(authController_1.verifyEmail);
router.route("/resend-verification").post(authController_1.resendVerificationEmail);
router.get("/mej", authController_1.protectJwtUser, authController_1.getMe);
router.get("/me", authController_1.protect, authController_1.getMe);
///requestPasswordReset, validate-reset-token, resetPassword
{
    /*
  router.route("/google").get(
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );
  
  router
    .route("/google/callback")
    .get(
      passport.authenticate("google", { failureRedirect: "/" }),
      (req, res) => {
        (req as any).token = generateToken({
          id: (req.user as any).id,
          email: (req.user as any).email,
        });
  
        const token = (req as any).token;
        req.user = req.user;
        const cookieOption = {
          expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
  
        res.cookie("token", token, cookieOption);
  
        if (req.user && token) {
          res.redirect("http://localhost:3000");
        } else {
          res.status(400).json({
            message: "Authentication failed",
          });
        }
      }
    );
  */
}
router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
});
// router.route("/facebook").get(
//   passport.authenticate("facebook", {
//     scope: ["email"],
//   })
// );
// router
//   .route("/facebook/callback")
//   .get(
//     passport.authenticate("facebook", { failureRedirect: "/" }),
//     (req, res) => {
//       res.redirect("/dashboard");
//     }
//   );
exports.default = router;
