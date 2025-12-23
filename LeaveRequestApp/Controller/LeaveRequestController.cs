using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Najiz.LeaveRequestApp.Models;

namespace Najiz.LeaveRequestApp.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestController : ControllerBase
    {
        private static List<LeaveRequest> _leaveRequests = new List<LeaveRequest>
        {
            new LeaveRequest { Id = 1, EmployeeName = "Ahmed Ali", LeaveType = "Annual Leave", StartDate = "2025-01-15", EndDate = "2025-01-20", Reason = "Family vacation", Status = "Pending" },
            new LeaveRequest { Id = 2, EmployeeName = "Sara Mohammed", LeaveType = "Sick Leave", StartDate = "2025-01-10", EndDate = "2025-01-12", Reason = "Medical appointment", Status = "Approved" },
            new LeaveRequest { Id = 3, EmployeeName = "Omar Hassan", LeaveType = "Personal Leave", StartDate = "2025-02-01", EndDate = "2025-02-03", Reason = "Personal matters", Status = "Rejected" }
        };

        // GET: api/LeaveRequest
        [HttpGet]
        public ActionResult<IEnumerable<LeaveRequest>> GetLeaveRequests()
        {
            return Ok(_leaveRequests);
        }

        // GET: api/LeaveRequest/5
        [HttpGet("{id}")]
        public ActionResult<LeaveRequest> GetLeaveRequest(int id)
        {
            var leaveRequest = _leaveRequests.FirstOrDefault(lr => lr.Id == id);
            if (leaveRequest == null)
            {
                return NotFound();
            }
            return Ok(leaveRequest);
        }

        // POST: api/LeaveRequest
        [HttpPost]
        public ActionResult<LeaveRequest> CreateLeaveRequest(LeaveRequest leaveRequest)
        {
            leaveRequest.Id = _leaveRequests.Any() ? _leaveRequests.Max(lr => lr.Id) + 1 : 1;
            leaveRequest.Status = "Pending";
            _leaveRequests.Add(leaveRequest);
            return CreatedAtAction(nameof(GetLeaveRequest), new { id = leaveRequest.Id }, leaveRequest);
        }

        // PUT: api/LeaveRequest/5
        [HttpPut("{id}")]
        public IActionResult UpdateLeaveRequest(int id, LeaveRequest leaveRequest)
        {
            var existingRequest = _leaveRequests.FirstOrDefault(lr => lr.Id == id);
            if (existingRequest == null)
            {
                return NotFound();
            }

            existingRequest.EmployeeName = leaveRequest.EmployeeName;
            existingRequest.LeaveType = leaveRequest.LeaveType;
            existingRequest.StartDate = leaveRequest.StartDate;
            existingRequest.EndDate = leaveRequest.EndDate;
            existingRequest.Reason = leaveRequest.Reason;
            existingRequest.Status = leaveRequest.Status;

            return NoContent();
        }

        // PATCH: api/LeaveRequest/5/status
        [HttpPatch("{id}/status")]
        public IActionResult UpdateLeaveRequestStatus(int id, [FromBody] StatusUpdate statusUpdate)
        {
            var existingRequest = _leaveRequests.FirstOrDefault(lr => lr.Id == id);
            if (existingRequest == null)
            {
                return NotFound();
            }

            existingRequest.Status = statusUpdate.Status;
            return NoContent();
        }

        // DELETE: api/LeaveRequest/5
        [HttpDelete("{id}")]
        public IActionResult DeleteLeaveRequest(int id)
        {
            var leaveRequest = _leaveRequests.FirstOrDefault(lr => lr.Id == id);
            if (leaveRequest == null)
            {
                return NotFound();
            }

            _leaveRequests.Remove(leaveRequest);
            return NoContent();
        }
    }

    public class StatusUpdate
    {
        public string Status { get; set; }
    }
}
