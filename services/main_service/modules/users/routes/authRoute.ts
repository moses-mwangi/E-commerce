import { Router } from "express";
import { validUserSignInput } from "../middleware/authMiddleware";
import {
  getMe,
  loginUser,
  protect,
  signInUser,
  protectJwtUser,
} from "../controllers/authController";
import passport from "../../../shared/config/passport";
import { generateToken } from "../utils/jwt";

const router: Router = Router();

router.route("/signup").post(validUserSignInput, signInUser);
router.route("/login").post(loginUser);

router.get("/mej", protectJwtUser, getMe);
router.get("/me", protect, getMe);

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

export default router;
