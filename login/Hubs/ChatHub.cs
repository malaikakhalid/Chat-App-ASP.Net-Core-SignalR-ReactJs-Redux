using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace login.Hubs
{
    public class ChatHub : Hub
    {
         // Get Connection_Id  out the Hub
        public string GetConnectionId() =>
            Context.ConnectionId;
    }
}
