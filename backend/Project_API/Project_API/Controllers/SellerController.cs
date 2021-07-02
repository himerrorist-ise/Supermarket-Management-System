using Project_API.Models;
using Project_API.SQLProcedures;
using System.Collections.Generic;
using System.Web.Http;

namespace Project_API.Controllers
{
    public class SellerController : ApiController
    {
        private SellerProcedures sellerProcedure = new SellerProcedures();
        
        [HttpGet]
        public List<SellerTable> Get()
        {
            return sellerProcedure.GetAllSellers();
        }

        [HttpPost]
        public bool Post(SellerTable seller)
        {
            if (sellerProcedure.AddSeller(seller))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPut]
        public bool Put(SellerTable seller)
        {
            if (sellerProcedure.UpdateSeller(seller))
            {
                return true;
            }
            return false;
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            if (sellerProcedure.DeleteSeller(id))
            {
                return true;
            }
            return false;
        }
    }
}