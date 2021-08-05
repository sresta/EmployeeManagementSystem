using EmployeeManagementSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;

        public EmployeeController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> Create(ApplicationUser user)
        {
            ApplicationUser appUser = new ApplicationUser
            {
                UserName = user.UserName,
                Email = user.Email,
                Address = user.Address,
                DateOfJoining = user.DateOfJoining,
                DepartmentId = user.DepartmentId
            };

            IdentityResult result = await userManager.CreateAsync(appUser, "P@ssw0rd");
            if (result.Succeeded)
            {
                var role = await userManager.AddToRoleAsync(appUser, "Employee");
                return Ok(result);
            }
            else
            {
                return BadRequest(new { message = "Cannot create employee." });
            }


        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUser>> GetEmployee(string id)
        {
            var employee = await userManager.FindByIdAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        [HttpGet]
        public async Task<IEnumerable<ApplicationUser>> GetEmployees()
        {
            var users = await userManager.GetUsersInRoleAsync("Employee");
            return users;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(string id, ApplicationUser user)
        {
            ApplicationUser ApUser = await userManager.FindByIdAsync(id);
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Cannot update employee." });
            }
            ApUser.Email = user.Email;
            ApUser.UserName = user.UserName;
            ApUser.DepartmentId = user.DepartmentId;
            ApUser.DateOfJoining = user.DateOfJoining;
            ApUser.Address = user.Address;
            var result = await userManager.UpdateAsync(ApUser);
            if (result.Succeeded)
            {
                return Ok(ApUser);
            }
            else
            {
                return BadRequest(new { message = "Cannot update employee." });
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult> DeleteEmployee(string id)
        {
            if (ModelState.IsValid)
            {

                var user = await userManager.FindByIdAsync(id);
                var rolesForUser = await userManager.GetRolesAsync(user);


                if (rolesForUser.Count() > 0)
                {
                    foreach (var userRole in rolesForUser.ToList())
                    {
                        // item should be the name of the role
                        var result = await userManager.RemoveFromRoleAsync(user, userRole);
                    }
                }

                await userManager.DeleteAsync(user);

                return Ok();
            }
            else
            {
                return View();
            }
        }
    }
}
