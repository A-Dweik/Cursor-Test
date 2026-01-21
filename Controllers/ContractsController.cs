using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ContractVerification.Data;
using ContractVerification.Models;
using ContractVerification.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ContractVerification.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContractsController : ControllerBase
    {
        private readonly ContractDbContext _context;
        private readonly ILogger<ContractsController> _logger;

        public ContractsController(ContractDbContext context, ILogger<ContractsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        /// <summary>
        /// Get all contracts with optional filtering
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContractDto>>> GetContracts(
            [FromQuery] int? type,
            [FromQuery] int? status,
            [FromQuery] string search,
            [FromQuery] string createdBy)
        {
            try
            {
                var query = _context.Contracts.AsQueryable();

                // Filter by createdBy (for regular users)
                if (!string.IsNullOrEmpty(createdBy))
                {
                    query = query.Where(c => c.CreatedBy == createdBy);
                }

                // Filter by type
                if (type.HasValue)
                {
                    query = query.Where(c => (int)c.Type == type.Value);
                }

                // Filter by status
                if (status.HasValue)
                {
                    query = query.Where(c => (int)c.Status == status.Value);
                }

                // Search filter
                if (!string.IsNullOrEmpty(search))
                {
                    var searchLower = search.ToLower();
                    query = query.Where(c =>
                        c.ContractNumber.ToLower().Contains(searchLower) ||
                        c.SellerName.ToLower().Contains(searchLower) ||
                        c.BuyerName.ToLower().Contains(searchLower) ||
                        c.PropertyAddress.ToLower().Contains(searchLower)
                    );
                }

                // Order by date (newest first)
                query = query.OrderByDescending(c => c.CreatedAt);

                var contracts = await query.ToListAsync();

                var contractDtos = contracts.Select(c => new ContractDto
                {
                    Id = c.Id,
                    ContractNumber = c.ContractNumber,
                    Type = (int)c.Type,
                    Status = (int)c.Status,
                    SellerName = c.SellerName,
                    BuyerName = c.BuyerName,
                    PropertyAddress = c.PropertyAddress,
                    ContractAmount = c.ContractAmount,
                    CreatedBy = c.CreatedBy,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt
                }).ToList();

                return Ok(contractDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contracts");
                return StatusCode(500, "An error occurred while retrieving contracts");
            }
        }

        /// <summary>
        /// Get contract by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ContractDto>> GetContractById(int id)
        {
            try
            {
                var contract = await _context.Contracts.FindAsync(id);

                if (contract == null)
                {
                    return NotFound($"Contract with ID {id} not found");
                }

                var contractDto = new ContractDto
                {
                    Id = contract.Id,
                    ContractNumber = contract.ContractNumber,
                    Type = (int)contract.Type,
                    Status = (int)contract.Status,
                    SellerName = contract.SellerName,
                    BuyerName = contract.BuyerName,
                    PropertyAddress = contract.PropertyAddress,
                    ContractAmount = contract.ContractAmount,
                    CreatedBy = contract.CreatedBy,
                    CreatedAt = contract.CreatedAt,
                    UpdatedAt = contract.UpdatedAt
                };

                return Ok(contractDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contract {ContractId}", id);
                return StatusCode(500, "An error occurred while retrieving the contract");
            }
        }

        /// <summary>
        /// Create a new contract
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<ContractDto>> CreateContract([FromBody] ContractCreateDto createDto)
        {
            try
            {
                if (createDto == null)
                {
                    return BadRequest("Contract data is required");
                }

                // Validation
                if (string.IsNullOrWhiteSpace(createDto.ContractNumber))
                {
                    return BadRequest("Contract number is required");
                }

                if (string.IsNullOrWhiteSpace(createDto.SellerName) || createDto.SellerName.Trim().Length < 3)
                {
                    return BadRequest("Seller/Owner name must be at least 3 characters");
                }

                if (string.IsNullOrWhiteSpace(createDto.BuyerName) || createDto.BuyerName.Trim().Length < 3)
                {
                    return BadRequest("Buyer/Tenant name must be at least 3 characters");
                }

                if (string.IsNullOrWhiteSpace(createDto.PropertyAddress) || createDto.PropertyAddress.Trim().Length < 5)
                {
                    return BadRequest("Property address must be at least 5 characters");
                }

                if (createDto.ContractAmount <= 0)
                {
                    return BadRequest("Contract amount must be greater than zero");
                }

                // Check for duplicate contract number
                var existingContract = await _context.Contracts
                    .FirstOrDefaultAsync(c => c.ContractNumber == createDto.ContractNumber);

                if (existingContract != null)
                {
                    return Conflict($"Contract with number {createDto.ContractNumber} already exists");
                }

                // Get username from claims
                var username = User.Identity?.Name ?? "system";

                var contract = new ContractEntity
                {
                    ContractNumber = createDto.ContractNumber,
                    Type = (ContractType)createDto.Type,
                    Status = ContractStatus.Submitted,  // New contracts start as Submitted
                    SellerName = createDto.SellerName.Trim(),
                    BuyerName = createDto.BuyerName.Trim(),
                    PropertyAddress = createDto.PropertyAddress.Trim(),
                    ContractAmount = createDto.ContractAmount,
                    CreatedBy = username,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.Contracts.Add(contract);
                await _context.SaveChangesAsync();

                var contractDto = new ContractDto
                {
                    Id = contract.Id,
                    ContractNumber = contract.ContractNumber,
                    Type = (int)contract.Type,
                    Status = (int)contract.Status,
                    SellerName = contract.SellerName,
                    BuyerName = contract.BuyerName,
                    PropertyAddress = contract.PropertyAddress,
                    ContractAmount = contract.ContractAmount,
                    CreatedBy = contract.CreatedBy,
                    CreatedAt = contract.CreatedAt,
                    UpdatedAt = contract.UpdatedAt
                };

                return CreatedAtAction(nameof(GetContractById), new { id = contract.Id }, contractDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating contract");
                return StatusCode(500, "An error occurred while creating the contract");
            }
        }

        /// <summary>
        /// Update contract status (verify/reject)
        /// </summary>
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateContractStatus(int id, [FromBody] ContractStatusUpdateDto updateDto)
        {
            try
            {
                if (updateDto == null || updateDto.ContractId != id)
                {
                    return BadRequest("Invalid request");
                }

                var contract = await _context.Contracts.FindAsync(id);

                if (contract == null)
                {
                    return NotFound($"Contract with ID {id} not found");
                }

                var oldStatus = contract.Status;
                var newStatus = (ContractStatus)updateDto.NewStatus;

                // Update contract status
                contract.Status = newStatus;
                contract.UpdatedAt = DateTime.UtcNow;

                // Create history entry
                var historyEntry = new ContractHistoryEntity
                {
                    ContractId = id,
                    OldStatus = oldStatus,
                    NewStatus = newStatus,
                    ChangedBy = updateDto.ChangedBy ?? User.Identity?.Name ?? "system",
                    ChangedAt = DateTime.UtcNow,
                    Comment = updateDto.Comment
                };

                _context.ContractHistory.Add(historyEntry);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating contract status for contract {ContractId}", id);
                return StatusCode(500, "An error occurred while updating the contract status");
            }
        }

        /// <summary>
        /// Get contract history
        /// </summary>
        [HttpGet("{id}/history")]
        public async Task<ActionResult<IEnumerable<ContractHistoryDto>>> GetContractHistory(int id)
        {
            try
            {
                var contract = await _context.Contracts.FindAsync(id);

                if (contract == null)
                {
                    return NotFound($"Contract with ID {id} not found");
                }

                var history = await _context.ContractHistory
                    .Where(h => h.ContractId == id)
                    .OrderByDescending(h => h.ChangedAt)
                    .ToListAsync();

                var historyDtos = history.Select(h => new ContractHistoryDto
                {
                    Id = h.Id,
                    ContractId = h.ContractId,
                    OldStatus = (int)h.OldStatus,
                    NewStatus = (int)h.NewStatus,
                    ChangedBy = h.ChangedBy,
                    ChangedAt = h.ChangedAt,
                    Comment = h.Comment
                }).ToList();

                return Ok(historyDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving contract history for contract {ContractId}", id);
                return StatusCode(500, "An error occurred while retrieving contract history");
            }
        }

        /// <summary>
        /// Get statistics
        /// </summary>
        [HttpGet("statistics")]
        public async Task<ActionResult<ContractStatisticsDto>> GetStatistics([FromQuery] string createdBy)
        {
            try
            {
                var query = _context.Contracts.AsQueryable();

                // Filter by user if specified
                if (!string.IsNullOrEmpty(createdBy))
                {
                    query = query.Where(c => c.CreatedBy == createdBy);
                }

                var totalContracts = await query.CountAsync();
                var submittedContracts = await query.CountAsync(c => c.Status == ContractStatus.Submitted);
                var initialApprovedContracts = await query.CountAsync(c => c.Status == ContractStatus.InitialApproved);
                var managerApprovedContracts = await query.CountAsync(c => c.Status == ContractStatus.ManagerApproved);
                var finalApprovedContracts = await query.CountAsync(c => c.Status == ContractStatus.FinalApproved);
                var rejectedContracts = await query.CountAsync(c => c.Status == ContractStatus.Rejected);

                var statistics = new ContractStatisticsDto
                {
                    TotalContracts = totalContracts,
                    SubmittedContracts = submittedContracts,
                    InitialApprovedContracts = initialApprovedContracts,
                    ManagerApprovedContracts = managerApprovedContracts,
                    FinalApprovedContracts = finalApprovedContracts,
                    RejectedContracts = rejectedContracts
                };

                return Ok(statistics);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calculating statistics");
                return StatusCode(500, "An error occurred while calculating statistics");
            }
        }

        /// <summary>
        /// Delete contract (optional - for admin cleanup)
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContract(int id)
        {
            try
            {
                var contract = await _context.Contracts.FindAsync(id);

                if (contract == null)
                {
                    return NotFound($"Contract with ID {id} not found");
                }

                _context.Contracts.Remove(contract);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting contract {ContractId}", id);
                return StatusCode(500, "An error occurred while deleting the contract");
            }
        }
    }
}
