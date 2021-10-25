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
                    cmd.CommandText = @"SELECT b.Id, b.Label, b.Total, b.UserId,
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
                            Total = DbUtils.GetDecimal(reader, "Total"),
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

        public Budget GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT b.Id, b.Label, b.Total, b.UserId,
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
                            Total = DbUtils.GetDecimal(reader, "Total"),
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
                        INSERT INTO Budget (Label, Total, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Label, @Total, @UserId)";

                    DbUtils.AddParameter(cmd, "@Label", budget.Label);
                    DbUtils.AddParameter(cmd, "@Total", budget.Total);
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
                               Total = @Total,
                               UserId = @UserId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", budget.Id);
                    DbUtils.AddParameter(cmd, "@Label", budget.Label);
                    DbUtils.AddParameter(cmd, "@Total", budget.Total);
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
