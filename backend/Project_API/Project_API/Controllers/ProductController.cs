using Project_API.Models;
using Project_API.SQLProcedures;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;

namespace Project_API.Controllers
{
    public class ProductController : ApiController
    {
        private ProductProcedures productProcedure = new ProductProcedures();

        [HttpGet]
        public IEnumerable<ProductTable> Get()
        {
            return productProcedure.GetAllProducts();
        }

        [HttpPost]
        public bool Post(ProductTable product)
        {
            if (productProcedure.AddProduct(product))
            {
                return true;
            }
            return false;
        }

        [HttpPut]
        public bool Put(ProductTable product)
        {
            if (productProcedure.UpdateProduct(product))
            {
                return true;
            }
            return false;
        }

        [HttpDelete]
        public bool Delete(int id)
        {
            if (productProcedure.DeleteProduct(id))
            {
                return true;
            }
            return false;
        }
    }
}