using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using AbelardoAPI.Models;
namespace AbelardoAPI.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly CustomContext _context;

        public UsersController(CustomContext context)
        {
            _context = context;

        }
        
        [HttpGet]
        public ActionResult<List<User>> GetAll()
        {
            return _context.Users.ToList();
        }


        [HttpGet("{id}", Name = "GetUsers")]
        public ActionResult<User> GetById(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public IActionResult Create([FromBody]User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtRoute("GetUsers", new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]User user)
        {
            var item = _context.Users.Find(id);
            if (item == null)
            {
                return NotFound();
            }

            item.Email = user.Email;
            item.Name = user.Name;
            item.Username = user.Username;

            _context.Users.Update(item);
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
