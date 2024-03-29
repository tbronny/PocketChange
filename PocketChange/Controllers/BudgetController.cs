﻿using System;
using Microsoft.AspNetCore.Mvc;
using PocketChange.Repositories;
using PocketChange.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace PocketChange.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetRepository _budgetRepo;
        private readonly IUserRepository _userRepo;
        public BudgetController(IBudgetRepository budgetRepository, IUserRepository userRepository)
        {
            _userRepo = userRepository;
            _budgetRepo = budgetRepository;
        }

        [HttpGet("GetByMonth")]
        public IActionResult GetByMonth()
        {
            int month = DateTime.Now.Month;
            int year = DateTime.Now.Year;
            var startDate = new DateTime(year, month, 1);
            var endDate = startDate.AddMonths(1);

            var user = GetCurrentUserProfileId();
            if (user == null)
            {
                return NotFound();
            }

            var getByDates = _budgetRepo.GetAllByDateRange(user.Id, startDate, endDate);

            return Ok(getByDates);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var budget = _budgetRepo.GetById(id);
            if (budget == null)
            {
                return NotFound();
            }
            return Ok(budget);
        }

        [HttpPost]
        public IActionResult Post(Budget budget)
        {
            var currentUser = GetCurrentUserProfileId();

            budget.UserId = currentUser.Id;

            _budgetRepo.Add(budget);
            return CreatedAtAction("Get", new { id = budget.Id }, budget);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Budget budget)
        {
            if (id != budget.Id)
            {
                return BadRequest();
            }

            _budgetRepo.Update(budget);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _budgetRepo.Delete(id);
            return NoContent();
        }

        private User GetCurrentUserProfileId()
        {
            var firebaseUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
