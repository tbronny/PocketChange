using System;
using Microsoft.AspNetCore.Mvc;
using PocketChange.Repositories;
using PocketChange.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace PocketChange.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _catRepo;
        private readonly IUserRepository _userRepo;
        public CategoryController(ICategoryRepository categoryRepository, IUserRepository userRepository)
        {
            _userRepo = userRepository;
            _catRepo = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfileId();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(_catRepo.GetAll(user.FirebaseUserId));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _catRepo.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        [HttpPost]
        public IActionResult Post(Category category)
        {
            var currentUser = GetCurrentUserProfileId();

            category.UserId = currentUser.Id;

            _catRepo.Add(category);
            return CreatedAtAction("Get", new { id = category.Id }, category);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Category category)
        {
            if (id != category.Id)
            {
                return BadRequest();
            }

            _catRepo.Update(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _catRepo.Delete(id);
            return NoContent();
        }

        private User GetCurrentUserProfileId()
        {
            var firebaseUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
