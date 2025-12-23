using System;

namespace Najiz.LeaveRequestApp.Models
{
    public class LeaveRequest
    {
        public int Id { get; set; }
        public string EmployeeName { get; set; }
        public string LeaveType { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Reason { get; set; }
        public string Status { get; set; }
    }
}
