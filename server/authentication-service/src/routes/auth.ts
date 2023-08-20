import { Router, Request, Response, NextFunction } from "express";
import passport from "passport";
const router = Router();

router.get(
  "/auth/google",
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(
      req,
      res,
      next
    );
  }
);

// router.get(
//   "/google/callback",
//   (req: Request, res: Response, next: NextFunction) => {
//     console.log("this is inside callback");
//     passport.authenticate("google", {
//       successRedirect: process.env.GOOGLE_CALLBACK_URL,
//       failureRedirect: "/login/failed",
//     })(req, res, next);
//   }
// );

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.GOOGLE_CALLBACK_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/logout", (req: Request, res: Response) => {
  if (req.user) {
    req.logout({}, (err: any) => {
      if (err)
        return res.status(500).json({ message: "Something went wrong." });
      res.redirect("http://localhost:3000/home");
    });
    res.send("done");
  }
});
export default router;
