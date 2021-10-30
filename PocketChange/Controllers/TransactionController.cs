using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PocketChange.Repositories;
using PocketChange.Models;
using System.Security.Claims;

namespace PocketChange.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _transactionRepo;
        private readonly IBudgetRepository _budgetRepo;
        public TransactionController(ITransactionRepository transactionRepository, IBudgetRepository budgetRepository)
        {
            _transactionRepo = transactionRepository;
            _budgetRepo = budgetRepository;
        }

        [HttpGet("GetByBudget/{budgetId}")]
        public IActionResult Get(int budgetId)
        {
            var transactions = _transactionRepo.GetAll(budgetId);

            if (transactions == null)
            {
                return NotFound();
            }

            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var transaction = _transactionRepo.GetById(id);
            if (transaction == null)
            {
                return NotFound();
            }
            return Ok(transaction);
        }

        [HttpPost]
        public IActionResult Post(Transaction transaction)
        {
            
            _transactionRepo.Add(transaction);
            return CreatedAtAction("GetById", new { id = transaction.Id }, transaction);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Transaction transaction)
        {
            if (id != transaction.Id)
            {
                return BadRequest();
            }
            _transactionRepo.Update(transaction);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _transactionRepo.Delete(id);
            return NoContent();
        }  
    }
}
