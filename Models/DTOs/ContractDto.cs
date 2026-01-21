using System;

namespace ContractVerification.Models.DTOs
{
    public class ContractDto
    {
        public int Id { get; set; }
        public string ContractNumber { get; set; }
        public int Type { get; set; }
        public int Status { get; set; }
        public string SellerName { get; set; }
        public string BuyerName { get; set; }
        public string PropertyAddress { get; set; }
        public decimal ContractAmount { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }

    public class ContractCreateDto
    {
        public string ContractNumber { get; set; }
        public int Type { get; set; }
        public string SellerName { get; set; }
        public string BuyerName { get; set; }
        public string PropertyAddress { get; set; }
        public decimal ContractAmount { get; set; }
    }

    public class ContractStatusUpdateDto
    {
        public int ContractId { get; set; }
        public int NewStatus { get; set; }
        public string ChangedBy { get; set; }
        public string Comment { get; set; }
    }

    public class ContractHistoryDto
    {
        public int Id { get; set; }
        public int ContractId { get; set; }
        public int OldStatus { get; set; }
        public int NewStatus { get; set; }
        public string ChangedBy { get; set; }
        public DateTime ChangedAt { get; set; }
        public string Comment { get; set; }
    }

    public class ContractStatisticsDto
    {
        public int TotalContracts { get; set; }
        public int SubmittedContracts { get; set; }
        public int InitialApprovedContracts { get; set; }
        public int ManagerApprovedContracts { get; set; }
        public int FinalApprovedContracts { get; set; }
        public int RejectedContracts { get; set; }
    }
}
