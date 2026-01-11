using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Najiz.CarRental.Data;
using Najiz.CarRental.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Najiz.CarRental.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalsController : ControllerBase
    {
        private readonly CarRentalDbContext _context;

        public RentalsController(CarRentalDbContext context)
        {
            _context = context;
        }

        // GET: api/Rentals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Rental>>> GetRentals()
        {
            return await _context.Rentals
                .Include(r => r.Car)
                .OrderByDescending(r => r.CreatedDate)
                .ToListAsync();
        }

        // GET: api/Rentals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRental(int id)
        {
            var rental = await _context.Rentals
                .Include(r => r.Car)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (rental == null)
            {
                return NotFound();
            }

            return rental;
        }

        // GET: api/Rentals/active
        [HttpGet("active")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetActiveRentals()
        {
            return await _context.Rentals
                .Include(r => r.Car)
                .Where(r => r.Status == "Active")
                .OrderByDescending(r => r.CreatedDate)
                .ToListAsync();
        }

        // PUT: api/Rentals/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRental(int id, Rental rental)
        {
            if (id != rental.Id)
            {
                return BadRequest();
            }

            // Update car availability based on rental status
            var car = await _context.Cars.FindAsync(rental.CarId);
            if (car != null)
            {
                car.IsAvailable = rental.Status != "Active";
            }

            _context.Entry(rental).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RentalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Rentals
        [HttpPost]
        public async Task<ActionResult<Rental>> PostRental(Rental rental)
        {
            // Validate car availability
            var car = await _context.Cars.FindAsync(rental.CarId);
            if (car == null)
            {
                return NotFound("السيارة غير موجودة");
            }

            if (!car.IsAvailable)
            {
                return Conflict("السيارة غير متاحة حالياً");
            }

            // Calculate total cost
            var days = (rental.EndDate - rental.StartDate).Days + 1;
            rental.TotalCost = days * car.DailyRate;
            rental.CreatedDate = DateTime.Now;

            // Mark car as unavailable
            car.IsAvailable = false;

            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRental), new { id = rental.Id }, rental);
        }

        // POST: api/Rentals/5/complete
        [HttpPost("{id}/complete")]
        public async Task<IActionResult> CompleteRental(int id)
        {
            var rental = await _context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }

            if (rental.Status != "Active")
            {
                return BadRequest("العقد غير نشط");
            }

            rental.Status = "Completed";

            // Make car available again
            var car = await _context.Cars.FindAsync(rental.CarId);
            if (car != null)
            {
                car.IsAvailable = true;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Rentals/5/cancel
        [HttpPost("{id}/cancel")]
        public async Task<IActionResult> CancelRental(int id)
        {
            var rental = await _context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }

            if (rental.Status != "Active")
            {
                return BadRequest("العقد غير نشط");
            }

            rental.Status = "Cancelled";

            // Make car available again
            var car = await _context.Cars.FindAsync(rental.CarId);
            if (car != null)
            {
                car.IsAvailable = true;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Rentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await _context.Rentals.FindAsync(id);
            if (rental == null)
            {
                return NotFound();
            }

            // Make car available if rental is active
            if (rental.Status == "Active")
            {
                var car = await _context.Cars.FindAsync(rental.CarId);
                if (car != null)
                {
                    car.IsAvailable = true;
                }
            }

            _context.Rentals.Remove(rental);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RentalExists(int id)
        {
            return _context.Rentals.Any(e => e.Id == id);
        }
    }
}
