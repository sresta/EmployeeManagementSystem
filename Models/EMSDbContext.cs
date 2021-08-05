using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Models
{
    public class EMSDbContext: IdentityDbContext<ApplicationUser>
    {
        public EMSDbContext(DbContextOptions<EMSDbContext> options) : base(options) { }

        public DbSet<Department> Departments { get; set; }
        public DbSet<Leave> Leaves { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            SeedDepartment(builder);
        }

        private void SeedDepartment(ModelBuilder builder)
        {
            builder.Entity<Department>().HasData(
                new Department() { Id = 1, DepartmentName = "Development" },
                new Department() { Id = 2, DepartmentName = "Quality Assuarance" },
                new Department() { Id = 3, DepartmentName = "Management" }
            );
        }
    }
}
