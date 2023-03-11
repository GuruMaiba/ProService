using System.Web;
using System.Web.Optimization;

namespace ProService
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //          ));

            bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
                      "~/Scripts/jquery-3.2.1.min.js",
                      "~/Scripts/slick.min.js",
                      "~/Scripts/flipcounter.js",
                      "~/Scripts/main.js",
                      "~/Scripts/validation.js"));

            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //          "~/Content/main.css"));
        }
    }
}
