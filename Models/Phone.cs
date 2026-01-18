using System;

namespace Najiz.MobilePhoneStore.Models
{
    public class Phone
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public decimal Price { get; set; }
        public string Storage { get; set; }
        public string Ram { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public bool InStock { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
