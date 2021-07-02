using Project_API.SQLProcedures;
using System.Web.Http;

namespace Project_API.Controllers
{
    public class LoginController : ApiController
    {
        private LoginProcedures loginProcedure = new LoginProcedures();

        [HttpGet]
        public int Get(string role, string user, string password)
        {
            if (role == "manager")
            {
                if (loginProcedure.GetManagerUser(user, password).Rows[0][0].ToString().Equals("1"))
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                if (loginProcedure.GetSellerUser(user, password).Rows[0][0].ToString().Equals("1"))
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
        }
    }
}