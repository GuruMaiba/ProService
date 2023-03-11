using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using ProService.Models;

namespace ProService.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext db = new ApplicationDbContext();

        public ActionResult Price()
        {
            var city = User.Identity.Name;
            return View(db.Devices.Where(d => d.City == city).ToList());
        }

        [HttpPost]
        public async Task AddDevice(string Name, string Type)
        {
            if (await db.Devices.FirstOrDefaultAsync(d => d.Name == Name) == null)
            {
                var city = User.Identity.Name;
                db.Devices.Add(new Device
                {
                    Name = Name,
                    City = city,
                    PhoneOrTablet = (Type == "phone") ? true : false
                });
                await db.SaveChangesAsync();
            }
        }
        
        [HttpPost]
        public async Task DeleteDevice(int Id)
        {
            var Device = await db.Devices.FindAsync(Id);
            if (Device != null)
            {
                db.Price.RemoveRange(Device.Price);
                db.Devices.Remove(Device);
                await db.SaveChangesAsync();
            }
        }
        
        [HttpPost]
        public async Task<ActionResult> AddPrice(int Id, string Name, string Cost, string Position)
        {
            var Device = await db.Devices.FindAsync(Id);
            var Prices = await db.Price.Where(p => p.Device.Id == Device.Id).ToListAsync();
            if (Device != null && Name != null && Cost != null)
            {
                var position = 1;

                if ( (Position == null || Position == "") && Prices.Count() > 0 )
                    position = Prices.Last().Position + 1;
                else if ((Position != null && Position != "") && Prices.Count() > 0)
                {
                    position = int.Parse(Position) + 1;
                    if (Prices.Last().Position >= position)
                    {
                        var newPos = position;
                        foreach (var price in Prices.OrderBy(p => p.Position))
                        {
                            if (price.Position == newPos)
                            {
                                ++newPos;
                                price.Position = newPos;
                            }
                        }
                    }
                }

                db.Price.Add(new Price
                {
                    Name = Name,
                    Cost = Cost,
                    Position = position,
                    Device = Device
                });

                await db.SaveChangesAsync();
                return RedirectToAction("Price", "Admin");
            }
            return RedirectToAction("Price", "Admin");
        }
        
        [HttpPost]
        public async Task DeletePrice(int Id)
        {
            var Price = await db.Price.FindAsync(Id);
            var Device = Price.Device;
            if (Price != null)
            {
                db.Price.Remove(Price);
                var Prices = await db.Price.Where(p => p.Device.Id == Device.Id).ToListAsync();

                if (Prices.Count() > 0)
                {
                    var position = Price.Position;
                    Price = Prices.OrderBy(p => p.Position).Last();
                    if (Price.Position > position)
                    {
                        foreach (var price in Prices.OrderBy(p => p.Position))
                        {
                            if (price.Position > position)
                                --price.Position;
                        }
                    }
                }
                
                await db.SaveChangesAsync();
            }
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