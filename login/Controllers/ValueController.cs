using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace login.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValueController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
