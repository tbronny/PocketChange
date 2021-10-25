using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PocketChange.Repositories;
using PocketChange.Models;

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

        [HttpGet]
        public IActionResult Get(int budgetId)
        {
            var transaction = _transactionRepo.GetAll(budgetId);

            if(transaction == null)
            {
                return NotFound();
            }

            return Ok(transaction);
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
    }
}
