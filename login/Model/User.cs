﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace login.Model
{
    public class User : IdentityUser
    {
        public string Fullnam { get; set; }
    }
}
