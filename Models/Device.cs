using System.Collections.Generic;

namespace ProService.Models
{
    public class Device
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string City { get; set; }

        // true - iPhone, false - iPad
        public bool PhoneOrTablet { get; set; }

        public virtual ICollection<Price> Price { get; set; }
    }

    public class Price
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Cost { get; set; }

        public int Position { get; set; }

        public virtual Device Device { get; set; }
    }
}