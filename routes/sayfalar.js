const express = require("express");
const router = express.Router();


const userController = require("../controllers/kullanıcılar");
const projectController = require("../controllers/projeler");
const profileController = require("../controllers/profil_controller");
const adminPanelController = require("../controllers/admin_panel");
const fileUploadController = require("../controllers/fileUpload") ;

router.get(["/", "/giris_yap"], (req, res) => {
  res.render("giriş_yap");
});

router.get("/kayit_ol", (req, res) => {
  res.render("kayıt_ol");
});

router.get("/anasayfa", userController.isLoggedIn, (req, res) => {
  try {
    if (req.user) {
      
      console.log(req.user) ; 

      const role = req.user.role;
      const email = req.user.email;
      const user_id = req.user.id;
      res.render("anasayfa", { user: req.user, role, email, user_id });
    } else {
      res.redirect("/giris_yap");
    }
  } catch (error) {
    res.status(404).render("error");
  }
});

router.get(
  "/anasayfa/admin",
  userController.isLoggedIn,
  adminPanelController.getAdminPanelData,
  (req, res) => {}
);

router.post(
  "/anasayfa/admin",
  userController.isLoggedIn,
  adminPanelController.postFromAdminPanel,
  (req, res) => {}
);

router.get(
  "/proje_kutuphanesi",
  userController.isLoggedIn,
  projectController.getAdminApprovedProjects,
  (req, res) => {}
);

router.get(
  "/projeler/:proje_id",
  userController.isLoggedIn,
  projectController.getProjectBlog,
  (req, res) => {}
);

router.get("/projeler", userController.isLoggedIn, (req, res) => {
  res.render("error");
});

router.post(
  "/proje_ekle",
  userController.isLoggedIn,
  fileUploadController.single('project_image'),
  projectController.add_projects_ap,
  (req, res) => {}
);

router.get("/proje_ekle", userController.isLoggedIn, (req, res) => {
  let user_id = req.user.ID;
  res.render("proje_ekle", { user_id });
});

router.get(
  "/profil/:user_id",
  userController.isLoggedIn,
  profileController.getPersonalData,
  (req, res) => {}
);

router.get(
  "/projeleri_ara",
  userController.isLoggedIn,
  projectController.projects_search,
  (req, res) => {}
);

router.get("/sifremi_unuttum", function (req, res) {
  res.render("şifremi_unuttum");
});
router.post(
  "/sifremi_unuttum",
  userController.forgot_password,
  (req, res) => {}
);

router.get("/sifremi_guncelle", (req, res) => {
  const token = req.query.token;
  res.render("şifremi_güncelle", { token: token });
});
router.post("/sifremi_guncelle", userController.update_password, (req, res) => {
  res.render("şifremi_güncelle");
});


module.exports = router;
