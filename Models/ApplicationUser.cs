
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Models
{
    public class ApplicationUser: IdentityUser
    {
        public string Address{ get; set; }

        public DateTime DateOfJoining{ get; set; }
        public int? DepartmentId { get; set; }
        [ForeignKey("DepartmentId")]
        public Department? Department{ get; set; }
        //public virtual ICollection<Leave> Leaves { get; set; }

    }
}
