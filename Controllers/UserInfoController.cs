using System;
using System.Collections.Generic;
using System.Linq;
using ContractVerification.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ContractVerification.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInfoController : ControllerBase
    {
        private readonly ILogger<UserInfoController> _logger;

        // Test users for demo
        private static readonly List<UserDto> TestUsers = new List<UserDto>
        {
            new UserDto
            {
                Username = "test",
                FullName = "محمود محمد فهد علي",
                Email = "admin@sigmas.sa",
                IsAdmin = true
            },
            new UserDto
            {
                Username = "test2",
                FullName = "عبدالله محمد مروان محمد",
                Email = "test@sigmas.sa",
                IsAdmin = false
            }
        };

        public UserInfoController(ILogger<UserInfoController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Get current user information
        /// For testing: pass username as query parameter
        /// </summary>
        [HttpGet]
        public ActionResult<UserDto> Get([FromQuery] string username = null)
        {
            try
            {
                // For testing: use query parameter if provided, otherwise default to 'test'
                var requestedUsername = username ?? "test";

                var user = TestUsers.FirstOrDefault(u =>
                    u.Username.Equals(requestedUsername, StringComparison.OrdinalIgnoreCase));

                if (user == null)
                {
                    // Return default test user if not found
                    user = TestUsers.First(u => u.Username == "test");
                }

                _logger.LogInformation($"User info requested for: {requestedUsername}, returned: {user.Username}");

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving user info");
                return StatusCode(500, "An error occurred while retrieving user information");
            }
        }

        /// <summary>
        /// Check if current user is admin
        /// </summary>
        [HttpGet("isAdmin")]
        public ActionResult<bool> IsAdmin([FromQuery] string username = null)
        {
            try
            {
                var requestedUsername = username ?? "test";

                var user = TestUsers.FirstOrDefault(u =>
                    u.Username.Equals(requestedUsername, StringComparison.OrdinalIgnoreCase));

                var isAdmin = user?.IsAdmin ?? false;

                _logger.LogInformation($"Admin check for: {requestedUsername}, result: {isAdmin}");

                return Ok(isAdmin);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking admin status");
                return StatusCode(500, "An error occurred while checking admin status");
            }
        }

        /// <summary>
        /// Get all test users (for development/testing only)
        /// </summary>
        [HttpGet("all")]
        public ActionResult<IEnumerable<UserDto>> GetAllTestUsers()
        {
            try
            {
                return Ok(TestUsers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all users");
                return StatusCode(500, "An error occurred while retrieving users");
            }
        }
    }
}
