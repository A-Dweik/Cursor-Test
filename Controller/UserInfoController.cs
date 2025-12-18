using Microsoft.AspNetCore.Mvc;
using Todos.Models;

namespace Todos.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInfoController : ControllerBase
    {
        [HttpGet]
        public ActionResult<UserModel> Get()
        {
            var user = new UserModel
            {
                Username = "john.doe",
                UserId = "123456",
                PreferredUsername = "jdoe",
                Name = "John Doe",
                GivenName = "John",
                SurName = "Doe",
                MiddleName = string.Empty,
                GrandFatherName = string.Empty,
                Email = "john.doe@example.com",
                Gender = "1",
                BirthDateHijri = "1420/05/15",
                BirthDate = "1999-08-21",
                Age = "25",
                NationalityName = "Saudi"
            };

            return Ok(user);
        }
    }
}
