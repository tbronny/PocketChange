using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using PocketChange.Models;
using PocketChange.Utils;

namespace PocketChange.Repositories
{
    public class BudgetRepository : BaseRepository, IBudgetRepository
    {
        public BudgetRepository(IConfiguration configuration) : base(configuration) { }

        public List<Budget> GetAll(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id, b.Label, b.MonthlyGoal, b.UserId,
                                        u.FirstName, u.LastName, u.FirebaseUserId
                                        FROM Budget b
                                        LEFT JOIN [User] u ON b.UserId = u.id
                                        WHERE u.FirebaseUserId = @FirebaseUserId";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);
                    var reader = cmd.ExecuteReader();
                    var budgets = new List<Budget>();
                    while (reader.Read())
                    {
                        budgets.Add(new Budget()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Label = DbUtils.GetString(reader, "Label"),
                            MonthlyGoal = DbUtils.GetDecimal(reader, "MonthlyGoal"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            },
                        });
                    }
                    reader.Close();
                    return budgets;
                }
            }
        }

        public List<Budget> GetAllByDateRange(int userId, DateTime startDate, DateTime endDate)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT b.Id [BudgetId], b.Label, b.MonthlyGoal, t.Id [transactionId], t.Amount, t.IsExpense, t.[Date], t.Label [transactionLabel], t.Notes
                                        FROM Budget b
                                        LEFT JOIN [Transaction] t ON t.BudgetId = b.Id
                                        LEFT JOIN [User] u ON b.UserId = u.Id
                                        WHERE u.Id = @UserId AND t.[date] >= @startDate AND t.[date] < @endDate";
                    DbUtils.AddParameter(cmd, "@UserId", userId);
                    DbUtils.AddParameter(cmd, "@startDate", startDate);
                    DbUtils.AddParameter(cmd, "@endDate", endDate);
                    var reader = cmd.ExecuteReader();

                    
                    var budgets = new List<Budget>();
                    while (reader.Read())
                    {
                        var budgetId = DbUtils.GetInt(reader, "BudgetId");
                        var existingBudget = budgets.FirstOrDefault(p => p.Id == budgetId);
                        if(existingBudget == null)
                        {
                            existingBudget = new Budget()
                            {
                                Id = budgetId,
                                Label = DbUtils.GetString(reader, "Label"),
                                MonthlyGoal = DbUtils.GetDecimal(reader, "MonthlyGoal"),
                                Transactions = new List<Transaction>()
                            };
                            budgets.Add(existingBudget);
                        }
                        if(DbUtils.IsNotDbNull(reader, "BudgetId"))
                        {
                            existingBudget.Transactions.Add(new Transaction()
                            {
                                Id = DbUtils.GetInt(reader, "transactionId"),
                                Label = DbUtils.GetString(reader, "transactionLabel"),
                                Notes = DbUtils.GetString(reader, "Notes"),
                                Amount = DbUtils.GetDecimal(reader, "Amount"),
                                Date = DbUtils.GetDateTime(reader, "Date"),
                                IsExpense = reader.GetBoolean(reader.GetOrdinal("IsExpense")),
                                BudgetId = budgetId
                            });
                        }
                    }
                    reader.Close();
                    return budgets;
                }
            }
        }

        public Budget GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT b.Id, b.Label, b.MonthlyGoal, b.UserId,
                                        u.FirstName, u.LastName
                                        FROM Budget b
                                        LEFT JOIN [User] u ON b.UserId = u.id
                           WHERE b.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Budget budget = null;
                    if (reader.Read())
                    {
                        budget = new Budget()
                        {
                            Id = id,
                            Label = DbUtils.GetString(reader, "Label"),
                            MonthlyGoal = DbUtils.GetDecimal(reader, "MonthlyGoal"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            User = new User()
                            {
                                Id = DbUtils.GetInt(reader, "UserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName")
                            },
                        };
                    }

                    reader.Close();

                    return budget;
                }
            }
        }

        public void Add(Budget budget)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Budget (Label, MonthlyGoal, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Label, @MonthlyGoal, @UserId)";

                    DbUtils.AddParameter(cmd, "@Label", budget.Label);
                    DbUtils.AddParameter(cmd, "@MonthlyGoal", budget.MonthlyGoal);
                    DbUtils.AddParameter(cmd, "@UserId", budget.UserId);

                    budget.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Budget budget)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Budget
                           SET Label = @Label,
                               MonthlyGoal = @MonthlyGoal,
                               UserId = @UserId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", budget.Id);
                    DbUtils.AddParameter(cmd, "@Label", budget.Label);
                    DbUtils.AddParameter(cmd, "@MonthlyGoal", budget.MonthlyGoal);
                    DbUtils.AddParameter(cmd, "@UserId", budget.UserId);

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
                    cmd.CommandText = "DELETE FROM Budget WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
