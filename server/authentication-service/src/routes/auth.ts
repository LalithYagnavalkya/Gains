import { Router, Request, Response } from "express";
import passport from "passport";
const router = Router();

router.get("/", passport.authenticate("google", ["profile", "email"] as any));

router.get(
  "/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
    failureRedirect: "http://localhost:3000/login/error",
    successRedirect: "http://localhost:3000/login/success",
  })
  //   ,
  //   (req, res) => {
  //     res.send("Thank you for signing in!");
  //   }
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
