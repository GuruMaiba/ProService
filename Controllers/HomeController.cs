using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Web;
using System.Web.Mvc;
using Microsoft.Owin.Security;
using ProService.Models;

namespace ProService.Controllers
{
    public class HomeController : Controller
    {
        // Работа с Owin авторизацией
        private IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;

        private readonly ApplicationDbContext db = new ApplicationDbContext();

        private string SecretKeySurgut => "PS_186";
        private string SecretKeyMoscow => "PS_777";

        // GET: Admin
        [HttpGet]
        public ActionResult Admin()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Admin(string secretKey)
        {
            if (secretKey == SecretKeySurgut || secretKey == SecretKeyMoscow)
            {
                var claim = new ClaimsIdentity("ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
                claim.AddClaim(new Claim("http://schemas.microsoft.com/accesscontrolservice/2010/07/claims/identityprovider",
                    "OWIN Provider", ClaimValueTypes.String));

                if (secretKey == SecretKeyMoscow)
                    claim.AddClaim(new Claim(ClaimsIdentity.DefaultNameClaimType, "Moscow", ClaimValueTypes.String));
                else
                    claim.AddClaim(new Claim(ClaimsIdentity.DefaultNameClaimType, "Surgut", ClaimValueTypes.String));

                AuthenticationManager.SignOut();
                AuthenticationManager.SignIn(new AuthenticationProperties
                {
                    IsPersistent = true
                }, claim);

                if (secretKey == SecretKeySurgut)
                    return RedirectToAction("Price", "Admin");
                else
                    return RedirectToAction("Price", "Admin");
            }
            ViewBag.error = "Кодовый ключ не верен!";
            return View();
        }

        public ActionResult Moscow()
        {
            ViewBag.city = "Moscow";
            return View(db.Devices.Where(d => d.City == "Moscow").ToList());
        }

        public ActionResult Surgut()
        {
            ViewBag.city = "Surgut";
            return View(db.Devices.Where(d => d.City == "Surgut").ToList());
        }

        public void Modal(string Name, string Phone, string AddressEmailDevice, string Text, string Type, string City)
        {
            MailMessage msg = new MailMessage();
            SmtpClient client = new SmtpClient();
            var email = "Proservice.one@mail.ru";
            if (City == "Moscow")
                email = "Proservice.one1@gmail.com";

            if (Type == "Consultation")
                msg.Subject = "Быстрая консультация.";
            else if (Type == "Courer")
                msg.Subject = "Вызов курьера.";
            else if (Type == "Manager")
            {
                msg.Subject = "Написать руководителю.";
                email = "benzin117@gmail.com";
            }
            else if (Type == "Diagnostic")
                msg.Subject = "Бесплатная диагностика";
            else if (Type == "Reviews")
                msg.Subject = "Отзыв";
            else if (Type == "OtherDevice")
                msg.Subject = "Другая модель устройства";
            else if (Type == "CostRepairs")
                msg.Subject = "Узнать стоимость ремонта";
            else if (Type == "SubmitApp")
                msg.Subject = "Оставить заявку";
            else
                msg.Subject = "Я хз что это...";

            msg.Body = $"Имя - {Name}<br />"
                     + $"Телефон - {Phone}<br />";

            if (Type == "Courer")
                msg.Body += $"Адресс - {AddressEmailDevice}<br />Описание проблемы - {Text}";
            else if (Type == "Manager")
                msg.Body += $"Email - {AddressEmailDevice}<br />Текст сообщения - {Text}";
            else if (Type == "OtherDevice")
                msg.Body += $"Устройство - {AddressEmailDevice}<br />Описание - {Text}";
            else if (Type == "Reviews")
                msg.Body = $"Имя - {Name}<br />Ссылка из соц.сетей - {Phone}<br />Отзыв - {Text}";
            else if (Type == "SubmitApp")
                msg.Body += $"Устройство - {AddressEmailDevice}<br />Описание - {Text}";


            msg.From = new MailAddress("info@unk.im", "ProService");
            msg.To.Add(email);
            msg.IsBodyHtml = true;
            client.Host = "smtp.yandex.ru";
            NetworkCredential basicauthenticationinfo = new NetworkCredential("info@unk.im", "348191Zz");
            client.Port = 25;
            client.EnableSsl = true;
            client.UseDefaultCredentials = false;
            client.Credentials = basicauthenticationinfo;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Send(msg);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}