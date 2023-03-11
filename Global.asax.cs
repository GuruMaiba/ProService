using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using ProService.Models;

namespace ProService
{
    public class MvcApplication : System.Web.HttpApplication
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            if (db.Devices.FirstOrDefault(d => d.Name == "4") == null)
            {
                db.Devices.Add(new Device
                {
                    Name = "4",
                    PhoneOrTablet = true
                });
                db.Devices.Add(new Device
                {
                    Name = "5",
                    PhoneOrTablet = true
                });
                db.Devices.Add(new Device
                {
                    Name = "6",
                    PhoneOrTablet = true
                });
                db.SaveChanges();
            }

            db.Dispose();
        }
    }
}
