import {Router} from "express";
import passport, { Passport } from "passport";

const router = Router();

const auth = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect("/login")
    }
}

router.get("/", auth, (req, res) => {
    const {user} = req;
    const data = {username: user.email};
    res.render("index", data);
});

router.get("/register", (req, res) => {
    if(req.isAuthenticated())
        return res.redirect("/");
    res.render("register");
})

router.post("/register", passport.authenticate("register", {failureRedirect: "/error", failureMessage: true}), (req, res) => {
    res.redirect("/");
});

router.get("/login", (req, res) => {
    if(req.isAuthenticated())
        return res.redirect("/");
    res.render("login");
})

router.post("/login", passport.authenticate("login", {failureRedirect: "/error", failureMessage: true}), (req, res) => {
    res.redirect("/");
});

router.get("/error", (req, res, next) => {
    console.log(req.session.messages)
    res.render("error", {message: req.session.messages[req.session.messages.length - 1]})
})

router.get("/logout", (req, res, next) => {
    const {user} = req;
    req.logout((error) => {
        if(error)
            return next(error);
        let data = {username: user.email};
        res.render("logout", data);

    })
});

export default router;