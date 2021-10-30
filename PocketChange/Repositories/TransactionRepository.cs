using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using PocketChange.Models;
using PocketChange.Utils;

namespace PocketChange.Repositories
{
    public class TransactionRepository : BaseRepository, ITransactionRepository
    {
        public TransactionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Transaction> GetAll(int budgetId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.Id, t.Label [transactionLabel], t.Notes, t.Amount, t.Date, 
                                            t.CategoryId, t.BudgetId, t.IsExpense, c.Name [categoryName], b.Label [budgetLabel]
                                        FROM [Transaction] t
                                        LEFT JOIN Budget b ON t.BudgetId = b.Id
                                        LEFT JOIN Category c ON t.CategoryId = c.Id
                                        WHERE t.BudgetId = @BudgetId";
                    DbUtils.AddParameter(cmd, "@BudgetId", budgetId);
                    var reader = cmd.ExecuteReader();
                    var transactions = new List<Transaction>();
                    while (reader.Read())
                    {
                        transactions.Add(new Transaction()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Label = DbUtils.GetString(reader, "transactionLabel"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            Amount = DbUtils.GetDecimal(reader, "Amount"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            IsExpense = reader.GetBoolean(reader.GetOrdinal("IsExpense")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            BudgetId = DbUtils.GetInt(reader, "BudgetId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "categoryName")
                            },
                            Budget = new Budget()
                            {
                                Id = DbUtils.GetInt(reader, "BudgetId"),
                                Label = DbUtils.GetString(reader, "budgetLabel")
                            },
                        });
                    }
                    reader.Close();
                    return transactions;
                }
            }
        }

        public Transaction GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT t.Id, t.Label [transactionLabel], t.Notes, t.Amount, t.Date, 
                                            t.CategoryId, t.BudgetId, t.IsExpense, c.Name [categoryName], b.Label [budgetLabel]
                                        FROM [Transaction] t
                                        LEFT JOIN Budget b ON t.BudgetId = b.Id
                                        LEFT JOIN Category c ON t.CategoryId = c.Id
                                        WHERE t.Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    var reader = cmd.ExecuteReader();
                    Transaction transaction = null;
                    if (reader.Read())
                    {
                        transaction = new Transaction()
                        {
                            Id = id,
                            Label = DbUtils.GetString(reader, "transactionLabel"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            Amount = DbUtils.GetDecimal(reader, "Amount"),
                            Date = DbUtils.GetDateTime(reader, "Date"),
                            IsExpense = reader.GetBoolean(reader.GetOrdinal("IsExpense")),
                            CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                            BudgetId = DbUtils.GetInt(reader, "BudgetId"),
                            Category = new Category()
                            {
                                Id = DbUtils.GetInt(reader, "CategoryId"),
                                Name = DbUtils.GetString(reader, "categoryName")
                            },
                            Budget = new Budget()
                            {
                                Id = DbUtils.GetInt(reader, "BudgetId"),
                                Label = DbUtils.GetString(reader, "budgetLabel")
                            },
                        };
                    }
                    reader.Close();
                    return transaction;
                }
            }
        }

        public void Add(Transaction transaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO [Transaction] (Label, Notes, Amount, Date, CategoryId, BudgetId, IsExpense)
                        OUTPUT INSERTED.ID
                        VALUES (@Label, @Notes, @Amount, @Date, @CategoryId, @BudgetId, @IsExpense)";

                    DbUtils.AddParameter(cmd, "@Label", transaction.Label);
                    DbUtils.AddParameter(cmd, "@Notes", transaction.Notes);
                    DbUtils.AddParameter(cmd, "@Amount", transaction.Amount);
                    DbUtils.AddParameter(cmd, "@Date", transaction.Date);
                    DbUtils.AddParameter(cmd, "@CategoryId", transaction.CategoryId);
                    DbUtils.AddParameter(cmd, "@BudgetId", transaction.BudgetId);
                    DbUtils.AddParameter(cmd, "@IsExpense", transaction.IsExpense);

                    transaction.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Transaction transaction)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [Transaction]
                            SET Label = @Label,
                                Notes = @Notes,
                                Amount = @Amount,
                                Date = @Date,
                                CategoryId = @CategoryId,
                                BudgetId = @BudgetId,
                                IsExpense = @IsExpense
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", transaction.Id);
                    DbUtils.AddParameter(cmd, "@Label", transaction.Label);
                    DbUtils.AddParameter(cmd, "@Notes", transaction.Notes);
                    DbUtils.AddParameter(cmd, "@Amount", transaction.Amount);
                    DbUtils.AddParameter(cmd, "@Date", transaction.Date);
                    DbUtils.AddParameter(cmd, "@CategoryId", transaction.CategoryId);
                    DbUtils.AddParameter(cmd, "@BudgetId", transaction.BudgetId);
                    DbUtils.AddParameter(cmd, "@IsExpense", transaction.IsExpense);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM [Transaction] WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}
