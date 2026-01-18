using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Najiz.MobilePhoneStore.Models;

namespace Najiz.MobilePhoneStore.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonesController : ControllerBase
    {
        // In-memory storage for demo purposes
        // In production, this should be replaced with a database
        private static List<Phone> _phones = new List<Phone>
        {
            new Phone
            {
                Id = 1,
                Brand = "سامسونج",
                Model = "Galaxy S23 Ultra",
                Price = 4999,
                Storage = "256GB",
                Ram = "12GB",
                Color = "أسود فانتوم",
                Description = "أحدث هاتف رائد من سامسونج مع كاميرا 200 ميجابكسل ومعالج Snapdragon 8 Gen 2",
                InStock = true,
                ImageUrl = "",
                CreatedDate = DateTime.Now.AddDays(-10)
            },
            new Phone
            {
                Id = 2,
                Brand = "آبل",
                Model = "iPhone 15 Pro Max",
                Price = 5499,
                Storage = "512GB",
                Ram = "8GB",
                Color = "تيتانيوم أزرق",
                Description = "آيفون 15 برو ماكس مع معالج A17 Pro وكاميرا محسنة وإطار تيتانيوم",
                InStock = true,
                ImageUrl = "",
                CreatedDate = DateTime.Now.AddDays(-5)
            },
            new Phone
            {
                Id = 3,
                Brand = "شاومي",
                Model = "Xiaomi 13 Pro",
                Price = 2999,
                Storage = "256GB",
                Ram = "12GB",
                Color = "أبيض سيراميك",
                Description = "هاتف رائد من شاومي مع شحن سريع 120 واط وكاميرا Leica",
                InStock = false,
                ImageUrl = "",
                CreatedDate = DateTime.Now.AddDays(-15)
            }
        };

        // GET: api/phones
        [HttpGet]
        public ActionResult<IEnumerable<Phone>> GetAllPhones()
        {
            return Ok(_phones.OrderByDescending(p => p.CreatedDate));
        }

        // GET: api/phones/5
        [HttpGet("{id}")]
        public ActionResult<Phone> GetPhone(int id)
        {
            var phone = _phones.FirstOrDefault(p => p.Id == id);
            if (phone == null)
            {
                return NotFound();
            }
            return Ok(phone);
        }

        // POST: api/phones
        [HttpPost]
        public ActionResult<Phone> CreatePhone([FromBody] Phone phone)
        {
            if (phone == null)
            {
                return BadRequest("البيانات غير صحيحة");
            }

            // Generate new ID
            phone.Id = _phones.Any() ? _phones.Max(p => p.Id) + 1 : 1;
            phone.CreatedDate = DateTime.Now;

            _phones.Add(phone);

            return CreatedAtAction(nameof(GetPhone), new { id = phone.Id }, phone);
        }

        // PUT: api/phones/5
        [HttpPut("{id}")]
        public IActionResult UpdatePhone(int id, [FromBody] Phone phone)
        {
            if (phone == null || id != phone.Id)
            {
                return BadRequest("البيانات غير صحيحة");
            }

            var existingPhone = _phones.FirstOrDefault(p => p.Id == id);
            if (existingPhone == null)
            {
                return NotFound();
            }

            // Update properties
            existingPhone.Brand = phone.Brand;
            existingPhone.Model = phone.Model;
            existingPhone.Price = phone.Price;
            existingPhone.Storage = phone.Storage;
            existingPhone.Ram = phone.Ram;
            existingPhone.Color = phone.Color;
            existingPhone.Description = phone.Description;
            existingPhone.InStock = phone.InStock;
            existingPhone.ImageUrl = phone.ImageUrl;

            return NoContent();
        }

        // DELETE: api/phones/5
        [HttpDelete("{id}")]
        public IActionResult DeletePhone(int id)
        {
            var phone = _phones.FirstOrDefault(p => p.Id == id);
            if (phone == null)
            {
                return NotFound();
            }

            _phones.Remove(phone);
            return NoContent();
        }

        // GET: api/phones/search?query=samsung
        [HttpGet("search")]
        public ActionResult<IEnumerable<Phone>> SearchPhones([FromQuery] string query)
        {
            if (string.IsNullOrWhiteSpace(query))
            {
                return Ok(_phones.OrderByDescending(p => p.CreatedDate));
            }

            var results = _phones.Where(p =>
                p.Brand.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                p.Model.Contains(query, StringComparison.OrdinalIgnoreCase) ||
                p.Description.Contains(query, StringComparison.OrdinalIgnoreCase)
            ).OrderByDescending(p => p.CreatedDate);

            return Ok(results);
        }
    }
}
