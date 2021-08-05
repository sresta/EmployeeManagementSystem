using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EmployeeManagementSystem.Models;

namespace EmployeeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeavesController : ControllerBase
    {
        private readonly EMSDbContext _context;

        public LeavesController(EMSDbContext context)
        {
            _context = context;
        }

        // GET: api/Leaves
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leave>>> GetLeaves()
        {
            return await _context.Leaves.Include(i => i.ApplicationUser).ToListAsync();
        }

        // GET: api/Leaves/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Leave>> GetLeave(int id)
        {
            var leave = _context.Leaves.Include(i => i.ApplicationUser).FirstOrDefault(i => i.Id == id);

            if (leave == null)
            {
                return NotFound();
            }

            return leave;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeave(int id, Leave leave)
        {
            if (id != leave.Id)
            {
                return BadRequest();
            }

            _context.Entry(leave).State = EntityState.Modified;

            try
            {
                var result = await _context.SaveChangesAsync();
                return Ok(leave);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LeaveExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }          
        }

        [HttpPost]
        public async Task<ActionResult<Leave>> PostLeave(Leave leave)
        {
            _context.Leaves.Add(leave);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLeave", new { id = leave.Id }, leave);
        }

        private bool LeaveExists(int id)
        {
            return _context.Leaves.Any(e => e.Id == id);
        }

        [HttpGet("EmployeeLeave/{id}")]
        public async Task<IEnumerable<Leave>> EmployeeLeave(string id)
        {
            var l = (from leave in _context.Leaves
                     where leave.UserId == id
                     select new Leave
                     {
                         FromDate = leave.FromDate,
                         ToDate = leave.ToDate,
                         NumberOfDays = leave.NumberOfDays,
                         Reason = leave.Reason,
                         status = leave.status
                     }).ToList();
            return l;
        }
    }
}
