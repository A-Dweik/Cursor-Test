using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Najiz.CarRentalApp.Models;

namespace Najiz.CarRentalApp.Controller
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
            return await _context.Rentals.Include(r => r.Car).ToListAsync();
        }

        // GET: api/Rentals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rental>> GetRental(int id)
        {
            var rental = await _context.Rentals.Include(r => r.Car).FirstOrDefaultAsync(r => r.Id == id);

            if (rental == null)
            {
                return NotFound();
            }

            return rental;
        }

        // GET: api/Rentals/Active
        [HttpGet("Active")]
        public async Task<ActionResult<IEnumerable<Rental>>> GetActiveRentals()
        {
            return await _context.Rentals
                .Include(r => r.Car)
                .Where(r => r.Status == "active")
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
            rental.CreatedAt = DateTime.Now;
            rental.Status = "active";
            
            // Calculate total amount
            var car = await _context.Cars.FindAsync(rental.CarId);
            if (car == null)
            {
                return BadRequest("السيارة غير موجودة");
            }

            if (!car.IsAvailable)
            {
                return BadRequest("السيارة غير متاحة للتأجير");
            }

            var days = (rental.EndDate - rental.StartDate).Days + 1;
            rental.TotalAmount = car.DailyRate * days;

            // Mark car as unavailable
            car.IsAvailable = false;

            _context.Rentals.Add(rental);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRental", new { id = rental.Id }, rental);
        }

        // POST: api/Rentals/5/Complete
        [HttpPost("{id}/Complete")]
        public async Task<IActionResult> CompleteRental(int id)
        {
            var rental = await _context.Rentals.Include(r => r.Car).FirstOrDefaultAsync(r => r.Id == id);
            if (rental == null)
            {
                return NotFound();
            }

            rental.Status = "completed";
            rental.Car.IsAvailable = true;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Rentals/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRental(int id)
        {
            var rental = await _context.Rentals.Include(r => r.Car).FirstOrDefaultAsync(r => r.Id == id);
            if (rental == null)
            {
                return NotFound();
            }

            // Make car available again if rental is deleted
            if (rental.Status == "active")
            {
                rental.Car.IsAvailable = true;
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
