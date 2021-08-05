﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Models
{
    public class LoggeInUserViewModel
    {
        public string Token { get; set; }
        public string Id{ get; set; }
        public string Address { get; set; }
        public int? DepartmentId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
