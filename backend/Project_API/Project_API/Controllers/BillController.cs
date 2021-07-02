using Project_API.Models;
using Project_API.SQLProcedures;
using System.Collections.Generic;
using System.Web.Http;

namespace Project_API.Controllers
{
    public class BillController : ApiController
    {
        private BillProcedures billProcedure = new BillProcedures();

        [HttpGet]
        public List<BillTable> Get()
        {
            return billProcedure.GetAllBills();
        }

        [HttpPost]
        public bool Post(BillTable bill)
        {
            if (billProcedure.AddBill(bill))
            {
                return true;
            }
            return false;
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            if (billProcedure.DeleteBill(id))
            {
                return true;
            }
            return false;
        }
    }
}