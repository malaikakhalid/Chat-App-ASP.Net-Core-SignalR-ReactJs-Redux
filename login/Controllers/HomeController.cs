using login.Database;
using login.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace login.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private AppDbContext _ctx;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public HomeController(AppDbContext ctx, UserManager<User> userManager,
           SignInManager<User> signInManager)
            {
            _ctx = ctx;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [Route("Index")]
        public IActionResult Index()
        {
            var chats = _ctx.Chats
                .Include(x => x.Users)
                //User can join group if not a member
                .Where(x => !x.Users.Any(y => y.UserId == User.FindFirst(ClaimTypes.NameIdentifier).Value))
                .ToList();
            return Ok(chats);
        }


        [HttpPost]
        [Route("CreateMessage")]
        public async Task<IActionResult> CreateMessage([FromBody] Message sendmess)
        {
            var k = User.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            string userId = k.Value;
            var user = await _userManager.FindByIdAsync(userId);

            var Message = new Message
            {
                ChatId = sendmess.ChatId,
                Text = sendmess.Text,
                Name = User.Identity.Name,
                Timestamp = DateTime.Now
            };

            _ctx.Messages.Add(Message);

            await _ctx.SaveChangesAsync();

            return Ok(Message);
        }

        [HttpPost]
        [Route("Room")]
        public async Task<IActionResult> CreateRoom([FromBody] Chat chats)
        {
            var chat = new Chat
            {
                Name = chats.Name,
                Type = ChatType.Room
            };

            chat.Users.Add(new ChatUser
            {
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
                Role = UserRole.Admin
            });
            _ctx.Chats.Add(chat);

            await _ctx.SaveChangesAsync();

            return Ok(chat);
        }

        [HttpGet]
        [Route("Find")]
        public IActionResult Find()
        {
            var claimIdentity = (ClaimsIdentity)this.User.Identity;
            var users =
                _ctx.Users.
                Where(x => x.Id != User.FindFirst(ClaimTypes.NameIdentifier).Value)
                .ToList();
            return Ok(users); 
        }



        [Route("Private")]
        public IActionResult Private()
        {
            var chats = _ctx.Chats
                .Include(x => x.Users)
                .ThenInclude(x => x.User)
                .Where(x => x.Type == ChatType.Private
                && x.Users
                .Any(y => y.UserId == User.FindFirst(ClaimTypes.NameIdentifier).Value))
                .ToList();
            return Ok(chats);
        }

        [HttpGet("{id}")]
        //[Route("Chat")]
        public IActionResult Chat(int id)
        {
            var Chat = _ctx.Chats
                .Include(x => x.Messages)
                .FirstOrDefault(x => x.Id == id);

            return Ok(Chat);
        }

        [HttpPost]
        [Route("PrivateRoom")]
        public async Task<IActionResult> CreatePrivateRoom([FromBody] Chat chats)
        {
            var chat = new Chat
            {
              Name  = chats.Name,
                Type = ChatType.Private
            };

            chat.Users.Add(new ChatUser
            {
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value
            });

            

            _ctx.Chats.Add(chat);
            await _ctx.SaveChangesAsync();
            return Ok(chat);
        }


        //[HttpGet("{id}")]
        [Route("JOIN")]
        public async Task<IActionResult> JoinRoom(int id)
        {
            var chatUser = new ChatUser
            {
                ChatId = id,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
                Role = UserRole.Member
            };

            _ctx.ChatUsers.Add(chatUser);

            await _ctx.SaveChangesAsync();

            return Ok(chatUser);
        }

        [HttpGet]
        [Route("Test")]
        public async Task<string> Test()
        {
            return User.Identity.Name;

        }

        [AllowAnonymous]
        [HttpGet]
        [Route("Message")]
        public async Task<string> Message()
        {
            return "Running...";

        }


        [Route("GroupChat")]
        public async Task<IActionResult> ChatGroup()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var chats = _ctx.ChatUsers
                .Include(x => x.Chat)
                .Where(x => x.UserId == userId
                    && x.Chat.Type == ChatType.Room)
                .Select(x => x.Chat)
                .ToList();

            return Ok(chats);
        }

        [Route("PrivateChat")]
        public async Task<IActionResult> PrivateChat()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var chats = _ctx.ChatUsers
                .Include(x => x.Chat)
                .Where(x => x.UserId == userId
                && x.Chat.Type == ChatType.Private)
                .Select(x => x.Chat)
                .ToList();

            return Ok(chats);
        }





    }
}
